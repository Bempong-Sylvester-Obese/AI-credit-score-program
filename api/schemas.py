from pydantic import BaseModel, EmailStr, Field
from typing import Optional, List
from datetime import datetime


class UserProfileCreate(BaseModel):
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    postal_address: Optional[str] = None
    mobile: Optional[str] = None
    employment_status: Optional[str] = None
    email: Optional[EmailStr] = None


class UserProfileUpdate(BaseModel):
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    postal_address: Optional[str] = None
    mobile: Optional[str] = None
    employment_status: Optional[str] = None
    email: Optional[EmailStr] = None


class UserProfileResponse(BaseModel):
    id: Optional[str] = None
    user_id: Optional[str] = None
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    postal_address: Optional[str] = None
    mobile: Optional[str] = None
    employment_status: Optional[str] = None
    email: Optional[str] = None
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True


class PredictionAssessment(BaseModel):
    """Lightweight model for immediate prediction assessment (no id/user_id/created_at)"""
    credit_score: int
    risk_probability: float
    risk_category: str
    interpretation: Optional[str] = None


class PredictionResponse(BaseModel):
    id: str
    user_id: str
    credit_score: int
    risk_probability: float
    risk_category: str
    interpretation: Optional[str] = None
    feature_values: Optional[dict] = None
    transaction_count: Optional[int] = None
    file_name: Optional[str] = None
    created_at: Optional[datetime] = None

    class Config:
        from_attributes = True


class ScoreHistoryItem(BaseModel):
    score: int
    date: Optional[str] = None
    category: str
    risk_probability: float


class PredictionListResponse(BaseModel):
    predictions: List[PredictionResponse]
    total: int
    limit: int
    offset: int
    count: int