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

