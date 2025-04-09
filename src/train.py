import joblib
from sklearn.ensemble import RandomForestClassifier
from src.features.build_features import engineer_features

def train_model(data_path: str, output_path: str):
    # Load & preprocess
    df = engineer_features(pd.read_csv(data_path))
    
    # Define features/target
    X = df[['dwr', 'txn_frequency', 'avg_deposit']]
    y = df['credit_risk']  # 0=Good, 1=Bad
    
    # Train
    model = RandomForestClassifier(n_estimators=100)
    model.fit(X, y)
    
    # Save
    joblib.dump(model, f"{output_path}/model.joblib")
    print(f"Model saved to {output_path}")

if __name__ == "__main__":
    train_model(
        data_path="data/raw/transactions.csv",
        output_path="models/trained_models"
    )