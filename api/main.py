"""
FastAPI Backend for Credit Score Prediction
Provides REST API endpoints for the ML credit scoring model
"""

from fastapi import FastAPI, File, UploadFile, HTTPException, Depends, Query
from fastapi.middleware.cors import CORSMiddleware
from pathlib import Path
import sys
from contextlib import asynccontextmanager
sys.path.insert(0, str(Path(__file__).parent.parent))
from src.predict import CreditScorePredictor
from src.features.build_features import engineer_features
from api.auth_middleware import get_current_user
from api.services_firestore import (
    get_or_create_user,
    get_user_profile,
    create_or_update_user_profile,
    save_prediction,
    get_user_predictions,
    get_user_score_history
)
from api.schemas import (
    UserProfileCreate,
    UserProfileUpdate,
    UserProfileResponse,
    PredictionResponse,
    PredictionListResponse,
    ScoreHistoryItem
)
import pandas as pd
import io
import uvicorn
from typing import List

sys.path.insert(0, str(Path(__file__).parent.parent))

predictor = None

@asynccontextmanager
async def lifespan(app: FastAPI):
    global predictor
    try:
        predictor = CreditScorePredictor(
            model_path='models/model.pkl',
            scaler_path='models/scaler.pkl',
            features_path='models/features.csv'
        )
        print("Model loaded successfully")
    except Exception as e:
        print(f"Error during startup: {str(e)}")
    
    yield
    
app = FastAPI(
    title="AI Credit Score API",
    description="ML-powered credit score prediction API",
    version="1.0.0",
    lifespan=lifespan
)

from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pathlib import Path
import sys
from src.predict import CreditScorePredictor
from src.features.build_features import engineer_features
import pandas as pd
import io
import uvicorn

sys.path.insert(0, str(Path(__file__).parent.parent))

app = FastAPI(
    title="AI Credit Score API",
    description="ML-powered credit score prediction API",
    version="1.0.0"
)

# Enable CORS for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize predictor on startup
predictor = None

@app.on_event("startup")
async def startup_event():
    global predictor
    try:
        predictor = CreditScorePredictor(
            model_path='models/model.pkl',
            scaler_path='models/scaler.pkl',
            features_path='models/features.csv'
        )
        print("Model loaded successfully")
    except Exception as e:
        print(f"Error loading model: {str(e)}")
        raise

@app.get("/")
async def root():
    return {
        "message": "AI Credit Score API",
        "version": "1.0.0",
        "endpoints": {
            "/health": "Health check",
            "/api/predict": "Credit score prediction (POST)",
            "/api/profile": "User profile management (GET, POST, PUT)",
            "/api/predictions": "Get prediction history (GET)",
            "/api/scores/history": "Get historical credit scores (GET)"
            "/api/predict": "Credit score prediction (POST)"
        }
    }

@app.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "model_loaded": predictor is not None
    }

@app.post("/api/predict")
async def predict(
    file: UploadFile = File(...),
    current_user: dict = Depends(get_current_user)
):
async def predict(file: UploadFile = File(...)):
    """
    Predict credit score from uploaded transaction CSV file
    
    Args:
        file: CSV file containing transaction data
        current_user: Authenticated user from Firebase token
        
    Returns:
        JSON with credit_score, risk_probability, risk_category, and interpretation
    """
    if predictor is None:
        raise HTTPException(status_code=503, detail="Model not loaded")
    
    # Validate file type
    if not file.filename.endswith('.csv'):
        raise HTTPException(status_code=400, detail="File must be a CSV file")
    
    try:
        # Read uploaded file
        contents = await file.read()
        
        df = pd.read_csv(io.StringIO(contents.decode('utf-8')))
        
        # Validate required columns
        required_columns = ['Date', 'Time', 'Transaction Type', 'Phone Number', 'Amount']
        missing_columns = [col for col in required_columns if col not in df.columns]
        if missing_columns:
            raise HTTPException(
                status_code=400,
                detail=f"Missing required columns: {missing_columns}"
            )
        
        # Engineer features
        processed_data = engineer_features(df)
        
        # Extract features for first customer
        customer_id = df['Phone Number'].iloc[0] if len(df) > 0 else None
        if customer_id is None:
            raise HTTPException(status_code=400, detail="No valid customer data found")
        
        # Get customer features
        customer_row = processed_data[processed_data['Phone Number'] == customer_id].iloc[0]
        
        # Prepare feature dict for prediction
        feature_dict = {
            'txn_count': customer_row['txn_count'],
            'net_amount': customer_row['net_amount'],
            'avg_amount': customer_row['avg_amount'],
            'amount_std': customer_row['amount_std'],
            'dwr': customer_row['dwr'],
            'customer_duration_days': customer_row['customer_duration_days'],
            'hour_mean': customer_row['hour_mean'],
            'hour_std': customer_row['hour_std']
        }
        
        # Get prediction
        assessment = predictor.predict_full_assessment(feature_dict)
        
        # Get or create user (Firestore)
        get_or_create_user(current_user["uid"], current_user.get("email"))
        
        # Save prediction to Firestore
        save_prediction(
            uid=current_user["uid"],
            assessment=assessment,
            feature_values=feature_dict,
            transaction_count=len(df),
            file_name=file.filename
        )
        
        return assessment
        
    except HTTPException:
        raise
    except pd.errors.EmptyDataError:
        raise HTTPException(status_code=400, detail="Empty CSV file")
    except pd.errors.ParserError:
        raise HTTPException(status_code=400, detail="Invalid CSV format")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction error: {str(e)}")

# User Profile Endpoints

@app.post("/api/profile", response_model=UserProfileResponse)
async def create_profile(
    profile_data: UserProfileCreate,
    current_user: dict = Depends(get_current_user)
):
    """
    Create or update user profile
    
    Args:
        profile_data: User profile data
        current_user: Authenticated user from Firebase token
        
    Returns:
        User profile response
    """
    get_or_create_user(current_user["uid"], current_user.get("email"))
    profile = create_or_update_user_profile(current_user["uid"], profile_data.model_dump())
    # Map to response model shape
    return profile

@app.get("/api/profile", response_model=UserProfileResponse)
async def get_profile(
    current_user: dict = Depends(get_current_user)
):
    """
    Get user profile
    
    Args:
        current_user: Authenticated user from Firebase token
        
    Returns:
        User profile response
    """
    profile = get_user_profile(current_user["uid"]) 
    
    if not profile:
        raise HTTPException(status_code=404, detail="Profile not found")
    
    return profile

@app.put("/api/profile", response_model=UserProfileResponse)
async def update_profile(
    profile_data: UserProfileUpdate,
    current_user: dict = Depends(get_current_user)
):
    """
    Update user profile
    
    Args:
        profile_data: User profile update data
        current_user: Authenticated user from Firebase token
        
    Returns:
        Updated user profile response
    """
    profile = create_or_update_user_profile(current_user["uid"], profile_data.model_dump())
    return profile

# Historical Data Endpoints

@app.get("/api/predictions", response_model=PredictionListResponse)
async def get_predictions(
    current_user: dict = Depends(get_current_user),
    limit: int = Query(10, ge=1, le=100),
    offset: int = Query(0, ge=0)
):
    """
    Get user's prediction history
    
    Args:
        current_user: Authenticated user from Firebase token
        limit: Maximum number of results (1-100)
        offset: Offset for pagination
        
    Returns:
        List of predictions with pagination info
    """
    predictions = get_user_predictions(current_user["uid"], limit=limit, offset=offset)
    
    return {
        "predictions": predictions,
        "total": len(predictions),
        "limit": limit,
        "offset": offset
    }

@app.get("/api/scores/history", response_model=List[ScoreHistoryItem])
async def get_score_history(
    current_user: dict = Depends(get_current_user),
    limit: int = Query(12, ge=1, le=100)
):
    """
    Get user's historical credit scores
    
    Args:
        current_user: Authenticated user from Firebase token
        limit: Maximum number of results (1-100)
        
    Returns:
        List of historical scores with dates and categories
    """
    history = get_user_score_history(current_user["uid"], limit=limit)
    
    return history

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)

