import pandas as pd
from sklearn.preprocessing import StandardScaler

def load_data(path: str) -> pd.DataFrame:
    """Load raw transaction data"""
    df = pd.read_csv(path)
    df['date'] = pd.to_datetime(df['date'])
    return df

def calculate_dwr(df: pd.DataFrame) -> pd.DataFrame:
    """Feature: Deposit-to-Withdrawal Ratio"""
    df['dwr'] = df['deposits'] / (df['withdrawals'] + 1e-6)  # Avoid divide-by-zero
    return df

def engineer_features(df: pd.DataFrame) -> pd.DataFrame:
    """Main feature pipeline"""
    df = calculate_dwr(df)
    # Add more features (volatility, frequency, etc.)
    return df