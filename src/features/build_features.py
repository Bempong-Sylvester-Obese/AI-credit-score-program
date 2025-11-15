import pandas as pd
import numpy as np

def engineer_features(raw_df):
    """
    Transforms raw transaction data into credit score features
    Args:
        raw_df: DataFrame containing transaction data with columns:
                ['Date', 'Time', 'Transaction Type', 'Amount', ...]
    Returns:
        DataFrame with engineered features
    """
    # Convert Amount to numeric
    raw_df['Amount'] = pd.to_numeric(raw_df['Amount'])
    
    # 1. Create deposit/withdrawal flags
    raw_df['is_deposit'] = np.where(raw_df['Amount'] > 0, 1, 0)
    raw_df['is_withdrawal'] = np.where(raw_df['Amount'] < 0, 1, 0)
    
    # 2. Group by customer to calculate metrics
    customer_features = raw_df.groupby('Phone Number').agg({
        'Amount': ['count', 'sum', 'mean', 'std'],
        'is_deposit': 'sum',
        'is_withdrawal': 'sum'
    })
    
    # Flatten multi-index columns
    customer_features.columns = [
        'txn_count', 'net_amount', 'avg_amount', 'amount_std',
        'total_deposits', 'total_withdrawals'
    ]
    
    # 3. Calculate financial ratios
    customer_features['dwr'] = (
        customer_features['total_deposits'] / 
        (customer_features['total_withdrawals'] + 1e-6)
    )
    
    # 4. Time-based features
    raw_df['Date'] = pd.to_datetime(raw_df['Date'])
    
    # Parse Time column to extract hour
    if 'Time' in raw_df.columns:
        try:
            # Handle both HH:MM format and full datetime strings
            raw_df['Hour'] = pd.to_datetime(raw_df['Time'], format='%H:%M', errors='coerce').dt.hour
            # Fallback for any remaining NaN values
            raw_df['Hour'] = raw_df['Hour'].fillna(12.0)
        except (ValueError, TypeError):
            # If parsing fails, set default hour
            raw_df['Hour'] = 12.0
    else:
        raw_df['Hour'] = 12.0
    
    time_features = raw_df.groupby('Phone Number').agg({
        'Date': lambda x: (x.max() - x.min()).days,
        'Hour': ['mean', 'std']
    })
    time_features.columns = ['customer_duration_days', 'hour_mean', 'hour_std']
    
    # Fill NaN std values for customers with single transaction
    time_features['hour_std'] = time_features['hour_std'].fillna(0.0)
    
    # Combine all features
    features_df = customer_features.join(time_features)
    return raw_df.merge(features_df, on='Phone Number', how='left')

# Test case
if __name__ == "__main__":
    test_data = pd.DataFrame([{
        'Date': '01-Jan-23',
        'Time': '12:00',
        'Transaction Type': 'MoMo Transaction',
        'Phone Number': '233123456789',
        'Amount': '150.00'
    }])
    print(engineer_features(test_data).columns)