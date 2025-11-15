import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import joblib
import os
import sys
from pathlib import Path
from sklearn.model_selection import train_test_split, GridSearchCV
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report, roc_auc_score
from sklearn.preprocessing import StandardScaler
import argparse
from src.features.build_features import engineer_features

sys.path.insert(0, str(Path(__file__).parent.parent))

class CreditScorer:
    def __init__(self, model_path='models/model.pkl', scaler_path='models/scaler.pkl'):
        try:
            self.model = joblib.load(model_path)
            self.scaler = joblib.load(scaler_path)
            features_df = pd.read_csv('models/features.csv', header=None)
            self.features = features_df.iloc[:, 0].tolist()
        except Exception as e:
            raise ValueError(f"Failed to load model artifacts: {str(e)}")
    
    def predict(self, raw_data):
        try:
            processed_data = engineer_features(raw_data)
            available_features = [f for f in self.features if f in processed_data.columns]
            
            if len(available_features) != len(self.features):
                missing = set(self.features) - set(processed_data.columns)
                print(f"Warning: Missing features {missing} - using available features")
                
            scaled_data = self.scaler.transform(processed_data[available_features])
            return float(self.model.predict_proba(scaled_data)[0, 1])
            
        except Exception as e:
            raise ValueError(f"Prediction failed: {str(e)}")

def plot_feature_importance(model, features, output_dir):
    importance = pd.DataFrame({
        'Feature': features,
        'Importance': model.feature_importances_
    }).sort_values('Importance', ascending=False)
    
    plt.figure(figsize=(10, 6))
    plt.barh(importance['Feature'], importance['Importance'])
    plt.title('Credit Risk Feature Importance')
    plt.tight_layout()
    plt.savefig(f'{output_dir}/feature_importance.png')
    plt.close()

def train_model(data_path, output_dir="models"):
    try:
        # 1. Load and preprocess data
        print("🛠️ Engineering features...")
        raw_data = pd.read_csv(data_path)
        processed_data = engineer_features(raw_data)
        
        # 2. Define features and target
        features = [
            'txn_count', 'net_amount', 'avg_amount', 'amount_std',
            'dwr', 'customer_duration_days', 
            'hour_mean', 'hour_std'
        ]
        
        # Create target variable (high risk = bottom 20% of net_amount)
        processed_data['high_risk'] = (
            processed_data['net_amount'] < processed_data['net_amount'].quantile(0.2)
        ).astype(int)
        
        # 3. Train-test split and scaling
        X_train, X_test, y_train, y_test = train_test_split(
            processed_data[features], 
            processed_data['high_risk'],
            test_size=0.2,
            random_state=42
        )
        scaler = StandardScaler()
        X_train_scaled = scaler.fit_transform(X_train)
        X_test_scaled = scaler.transform(X_test)
        
        # 4. Hyperparameter tuning
        print("Tuning hyperparameters...")
        param_grid = {
            'n_estimators': [100, 150, 200],
            'max_depth': [5, 10, 15],
            'min_samples_leaf': [1, 2, 4]
        }
        
        grid_search = GridSearchCV(
            estimator=RandomForestClassifier(class_weight='balanced', random_state=42),
            param_grid=param_grid,
            cv=5,
            scoring='roc_auc',
            n_jobs=-1
        )
        grid_search.fit(X_train_scaled, y_train)
        best_model = grid_search.best_estimator_
        
        # 5. Evaluation
        y_pred = best_model.predict(X_test_scaled)
        y_proba = best_model.predict_proba(X_test_scaled)[:, 1]
        
        print("\nBest Parameters:", grid_search.best_params_)
        print("\nClassification Report:")
        print(classification_report(y_test, y_pred))
        print(f"AUC-ROC: {roc_auc_score(y_test, y_proba):.2f}")
        
        # 6. Save artifacts
        os.makedirs(output_dir, exist_ok=True)
        joblib.dump(best_model, f"{output_dir}/model.pkl")
        joblib.dump(scaler, f"{output_dir}/scaler.pkl")
        pd.Series(features).to_csv(f"{output_dir}/features.csv", index=False, header=False)
        
        # 7. Visualizations
        plot_feature_importance(best_model, features, output_dir)
        
        print(f"\nModel and artifacts saved to {output_dir}/")
        return CreditScorer(
            model_path=f"{output_dir}/model.pkl",
            scaler_path=f"{output_dir}/scaler.pkl"
        )
        
    except Exception as e:
        print(f"Training failed: {str(e)}")
        raise

if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--data", default="data/raw/dataset1.csv", help="Path to input CSV")
    parser.add_argument("--output", default="models", help="Output directory for models")
    args = parser.parse_args()
    
    try:
        scorer = train_model(args.data, args.output)
        
        # Test inference
        test_sample = pd.DataFrame([{
            'Date': '2023-01-01',
            'Time': '12:00',
            'Transaction Type': 'MoMo Transaction',
            'Phone Number': '233123456789',
            'Amount': -500.00
        }])
        print(f"\nTest prediction: {scorer.predict(test_sample):.2f}")
        
    except Exception as e:
        print(f"Fatal error: {str(e)}")