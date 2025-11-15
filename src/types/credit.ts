export type RiskCategory = 'Excellent' | 'Good' | 'Fair' | 'Poor' | 'Very Poor';

export interface PredictionResult {
  credit_score: number;
  risk_probability: number;
  risk_category: RiskCategory;
  interpretation: string;
}

export interface ApiError {
  error: string;
  message: string;
  status_code?: number;
}

export interface UserProfile {
  id: number;
  user_id: number;
  first_name?: string;
  last_name?: string;
  postal_address?: string;
  mobile?: string;
  employment_status?: string;
  email?: string;
  created_at: string;
  updated_at?: string;
}

export interface UserProfileCreate {
  first_name?: string;
  last_name?: string;
  postal_address?: string;
  mobile?: string;
  employment_status?: string;
  email?: string;
}

export interface UserProfileUpdate {
  first_name?: string;
  last_name?: string;
  postal_address?: string;
  mobile?: string;
  employment_status?: string;
  email?: string;
}

export interface PredictionResponse {
  id: string;
  user_id: string;
  credit_score: number;
  risk_probability: number;
  risk_category: RiskCategory;
  interpretation?: string;
  feature_values?: Record<string, unknown>;
  transaction_count?: number;
  file_name?: string;
  created_at: string;
}

export interface PredictionListResponse {
  predictions: PredictionResponse[];
  total: number;
  limit: number;
  offset: number;
}

export interface ScoreHistoryItem {
  score: number;
  date?: string;
  category: RiskCategory;
  risk_probability: number;
}
