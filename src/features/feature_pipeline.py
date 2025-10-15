"""
Feature Pipeline Module
This module provides a complete pipeline for processing transaction data
and extracting features for credit scoring.
"""

import pandas as pd
import numpy as np
from typing import Dict, List, Optional, Union
from pathlib import Path


class FeaturePipeline:
    """
    A comprehensive feature engineering pipeline for credit scoring.
    """
    
    def __init__(self, config: Optional[Dict] = None):
        """
        Initialize the feature pipeline.
        
        Args:
            config: Optional configuration dictionary for pipeline parameters
        """
        self.config = config or self._default_config()
        self.feature_names = []
    
    def _default_config(self) -> Dict:
        """Return default configuration for feature engineering."""
        return {
            'date_column': 'Date',
            'time_column': 'Time',
            'amount_column': 'Amount',
            'phone_column': 'Phone Number',
            'transaction_type_column': 'Transaction Type',
            'min_transactions': 5,  # Minimum transactions per customer
            'quantile_thresholds': [0.25, 0.5, 0.75],  # For risk categorization
        }
    
    def load_data(self, data_path: Union[str, Path]) -> pd.DataFrame:
        """
        Load transaction data from CSV file.
        
        Args:
            data_path: Path to the CSV file
            
        Returns:
            DataFrame with loaded data
        """
        try:
            df = pd.read_csv(data_path)
            print(f"Loaded {len(df)} transactions from {data_path}")
            return df
        except Exception as e:
            raise ValueError(f"Failed to load data: {str(e)}")
    
    def validate_data(self, df: pd.DataFrame) -> bool:
        """
        Validate that the DataFrame contains required columns.
        
        Args:
            df: Input DataFrame
            
        Returns:
            bool: True if valid, raises error otherwise
        """
        required_cols = [
            self.config['date_column'],
            self.config['amount_column'],
            self.config['phone_column']
        ]
        
        missing_cols = [col for col in required_cols if col not in df.columns]
        if missing_cols:
            raise ValueError(f"Missing required columns: {missing_cols}")
        
        return True
    
    def clean_data(self, df: pd.DataFrame) -> pd.DataFrame:
        """
        Clean and preprocess raw transaction data.
        
        Args:
            df: Raw transaction DataFrame
            
        Returns:
            Cleaned DataFrame
        """
        df_clean = df.copy()
        
        # Convert Amount to numeric
        df_clean[self.config['amount_column']] = pd.to_numeric(
            df_clean[self.config['amount_column']], 
            errors='coerce'
        )
        
        # Remove rows with missing critical data
        df_clean = df_clean.dropna(subset=[
            self.config['amount_column'],
            self.config['phone_column']
        ])
        
        # Parse dates
        df_clean[self.config['date_column']] = pd.to_datetime(
            df_clean[self.config['date_column']], 
            errors='coerce'
        )
        
        # Parse time if available
        if self.config['time_column'] in df_clean.columns:
            df_clean['Hour'] = pd.to_datetime(
                df_clean[self.config['time_column']], 
                format='%H:%M',
                errors='coerce'
            ).dt.hour
        
        # Remove invalid dates
        df_clean = df_clean.dropna(subset=[self.config['date_column']])
        
        print(f"Cleaned data: {len(df_clean)} valid transactions")
        return df_clean
    
    def engineer_basic_features(self, df: pd.DataFrame) -> pd.DataFrame:
        """
        Engineer basic transaction features.
        
        Args:
            df: Cleaned transaction DataFrame
            
        Returns:
            DataFrame with basic features
        """
        df_feat = df.copy()
        
        # Transaction type indicators
        df_feat['is_deposit'] = (df_feat[self.config['amount_column']] > 0).astype(int)
        df_feat['is_withdrawal'] = (df_feat[self.config['amount_column']] < 0).astype(int)
        df_feat['amount_abs'] = df_feat[self.config['amount_column']].abs()
        
        return df_feat
    
    def engineer_customer_features(self, df: pd.DataFrame) -> pd.DataFrame:
        """
        Engineer customer-level aggregated features.
        
        Args:
            df: DataFrame with basic features
            
        Returns:
            DataFrame with customer-level features
        """
        phone_col = self.config['phone_column']
        amount_col = self.config['amount_column']
        date_col = self.config['date_column']
        
        # Aggregate by customer
        customer_features = df.groupby(phone_col).agg({
            amount_col: ['count', 'sum', 'mean', 'std', 'min', 'max'],
            'is_deposit': 'sum',
            'is_withdrawal': 'sum',
            'amount_abs': ['mean', 'sum']
        })
        
        # Flatten column names
        customer_features.columns = [
            'txn_count', 'net_amount', 'avg_amount', 'amount_std',
            'amount_min', 'amount_max', 'total_deposits', 'total_withdrawals',
            'avg_abs_amount', 'total_abs_amount'
        ]
        
        # Fill NaN std with 0 (for customers with single transaction)
        customer_features['amount_std'] = customer_features['amount_std'].fillna(0)
        
        # Calculate derived features
        customer_features['dwr'] = (
            customer_features['total_deposits'] / 
            (customer_features['total_withdrawals'] + 1e-6)
        )
        
        # Time-based features
        time_features = df.groupby(phone_col).agg({
            date_col: lambda x: (x.max() - x.min()).days
        })
        time_features.columns = ['customer_duration_days']
        
        # Hour features if available
        if 'Hour' in df.columns:
            hour_features = df.groupby(phone_col)['Hour'].agg(['mean', 'std'])
            hour_features.columns = ['hour_mean', 'hour_std']
            hour_features['hour_std'] = hour_features['hour_std'].fillna(0)
            customer_features = customer_features.join(hour_features)
        else:
            customer_features['hour_mean'] = 12.0
            customer_features['hour_std'] = 0.0
        
        # Join time features
        customer_features = customer_features.join(time_features)
        
        # Calculate transaction frequency (txns per day)
        customer_features['txn_frequency'] = (
            customer_features['txn_count'] / 
            (customer_features['customer_duration_days'] + 1)
        )
        
        return customer_features
    
    def select_features(self, df: pd.DataFrame, feature_list: Optional[List[str]] = None) -> pd.DataFrame:
        """
        Select specific features for modeling.
        
        Args:
            df: DataFrame with all features
            feature_list: Optional list of features to select
            
        Returns:
            DataFrame with selected features
        """
        if feature_list is None:
            # Default feature set
            feature_list = [
                'txn_count', 'net_amount', 'avg_amount', 'amount_std',
                'dwr', 'customer_duration_days', 'hour_mean', 'hour_std'
            ]
        
        available_features = [f for f in feature_list if f in df.columns]
        missing_features = set(feature_list) - set(available_features)
        
        if missing_features:
            print(f"Warning: Features not found: {missing_features}")
        
        self.feature_names = available_features
        return df[available_features]
    
    def transform(self, df: pd.DataFrame, feature_list: Optional[List[str]] = None) -> pd.DataFrame:
        """
        Complete feature engineering pipeline.
        
        Args:
            df: Raw transaction DataFrame
            feature_list: Optional list of features to extract
            
        Returns:
            DataFrame with engineered features
        """
        print("Starting feature engineering pipeline...")
        
        # Validate data
        self.validate_data(df)
        
        # Clean data
        df_clean = self.clean_data(df)
        
        # Engineer features
        df_basic = self.engineer_basic_features(df_clean)
        df_customer = self.engineer_customer_features(df_basic)
        
        # Select features
        df_final = self.select_features(df_customer, feature_list)
        
        print(f"Feature engineering complete: {df_final.shape}")
        print(f"Features: {list(df_final.columns)}")
        
        return df_final
    
    def fit_transform(self, data_path: Union[str, Path], 
                     feature_list: Optional[List[str]] = None) -> pd.DataFrame:
        """
        Load data and apply complete feature engineering pipeline.
        
        Args:
            data_path: Path to the CSV file
            feature_list: Optional list of features to extract
            
        Returns:
            DataFrame with engineered features
        """
        df = self.load_data(data_path)
        return self.transform(df, feature_list)


def main():
    
    # Initialize pipeline
    pipeline = FeaturePipeline()
    
    # Process sample data
    try:
        # Example: Load and transform data
        # features_df = pipeline.fit_transform('Data/raw/dataset1.csv')
        
        # For demonstration, create sample data
        sample_data = pd.DataFrame([
            {
                'Date': '2023-01-01',
                'Time': '12:00',
                'Transaction Type': 'MoMo Transaction',
                'Phone Number': '233123456789',
                'Amount': -150.00
            },
            {
                'Date': '2023-01-15',
                'Time': '14:30',
                'Transaction Type': 'MoMo Transaction',
                'Phone Number': '233123456789',
                'Amount': 500.00
            },
        ])
        
        features = pipeline.transform(sample_data)
        print("\n" + "="*50)
        print("EXTRACTED FEATURES")
        print("="*50)
        print(features)
        print("="*50)
        
    except Exception as e:
        print(f"Error: {str(e)}")


if __name__ == "__main__":
    main()

