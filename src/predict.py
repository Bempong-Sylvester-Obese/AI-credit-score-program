"""
Credit Score Prediction Module
This module provides inference functionality for the trained credit scoring model.
"""
import pandas as pd
import numpy as np
import joblib
import os
from pathlib import Path

class CreditScorePredictor:
    def __init__(self, model_path='models/model.pkl', scaler_path='models/scaler.pkl', features_path='models/features.csv'):
        """
        Initialize the predictor with trained model artifacts.
        
        Args:
            model_path: Path to the trained model pickle file
            scaler_path: Path to the fitted scaler pickle file
            features_path: Path to the features CSV file
        """
        self.model_path = Path(model_path)
        self.scaler_path = Path(scaler_path)
        self.features_path = Path(features_path)
        
        self._load_artifacts()
    
    def _load_artifacts(self):
        try:
            if not self.model_path.exists():
                raise FileNotFoundError(f"Model file not found at {self.model_path}")
            if not self.scaler_path.exists():
                raise FileNotFoundError(f"Scaler file not found at {self.scaler_path}")
            if not self.features_path.exists():
                raise FileNotFoundError(f"Features file not found at {self.features_path}")
            
            self.model = joblib.load(self.model_path)
            self.scaler = joblib.load(self.scaler_path)
            
            features_df = pd.read_csv(self.features_path, header=None)
            self.features = features_df.iloc[:, 0].tolist()
            
            print(f"Model artifacts loaded successfully")
            print(f"Using {len(self.features)} features: {self.features}")
            
        except Exception as e:
            raise ValueError(f"Failed to load model artifacts: {str(e)}")
    
    def predict_risk_score(self, transaction_data):
        """
        Predict credit risk score for given transaction data.
        
        Args:
            transaction_data: DataFrame with transaction features or dict with feature values
            
        Returns:
            float: Risk probability score (0-1)
        """
        try:
            if isinstance(transaction_data, dict):
                transaction_data = pd.DataFrame([transaction_data])
            
            # Ensure all required features are present
            missing_features = set(self.features) - set(transaction_data.columns)
            if missing_features:
                raise ValueError(f"Missing required features: {missing_features}")
            
            # Select and order features
            X = transaction_data[self.features]
            
            # Scale features
            X_scaled = self.scaler.transform(X)
            
            # Predict probability
            risk_prob = self.model.predict_proba(X_scaled)[:, 1]
            
            return float(risk_prob[0])
            
        except Exception as e:
            raise ValueError(f"Prediction failed: {str(e)}")
    
    def predict_credit_score(self, risk_probability):
        """
        Convert risk probability to a credit score (300-850 scale).
        
        Args:
            risk_probability: Risk probability from model (0-1)
            
        Returns:
            int: Credit score on 300-850 scale
        """
        # Invert probability (lower risk = higher score)
        creditworthiness = 1 - risk_probability
        
        # Scale to 300-850 range
        score = 300 + (creditworthiness * 550)
        
        return int(round(score))
    
    def get_risk_category(self, score):
        """
        Categorize credit score into risk levels.
        
        Args:
            score: Credit score (300-850)
            
        Returns:
            str: Risk category
        """
        if score >= 750:
            return "Excellent"
        elif score >= 700:
            return "Good"
        elif score >= 650:
            return "Fair"
        elif score >= 600:
            return "Poor"
        else:
            return "Very Poor"
    
    def predict_full_assessment(self, transaction_data):
        """
        Generate a complete credit assessment with score and category.
        
        Args:
            transaction_data: DataFrame or dict with transaction features
            
        Returns:
            dict: Complete assessment with risk_probability, credit_score, and category
        """
        risk_prob = self.predict_risk_score(transaction_data)
        credit_score = self.predict_credit_score(risk_prob)
        category = self.get_risk_category(credit_score)
        
        return {
            'risk_probability': risk_prob,
            'credit_score': credit_score,
            'risk_category': category,
            'interpretation': f"Credit score of {credit_score} indicates {category} creditworthiness"
        }


def main():
    
    # Initialize predictor
    try:
        predictor = CreditScorePredictor()
        
        # Example transaction data
        sample_data = {
            'txn_count': 45,
            'net_amount': 5000.0,
            'avg_amount': 250.0,
            'amount_std': 150.0,
            'dwr': 1.5,
            'customer_duration_days': 180,
            'hour_mean': 14.5,
            'hour_std': 3.2
        }
        
        # Get prediction
        assessment = predictor.predict_full_assessment(sample_data)
        
        print("\n" + "="*50)
        print("CREDIT SCORE ASSESSMENT")
        print("="*50)
        print(f"Risk Probability: {assessment['risk_probability']:.2%}")
        print(f"Credit Score: {assessment['credit_score']}")
        print(f"Category: {assessment['risk_category']}")
        print(f"\n{assessment['interpretation']}")
        print("="*50)
        
    except Exception as e:
        print(f"Error: {str(e)}")


if __name__ == "__main__":
    main()