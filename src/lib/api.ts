import type { PredictionResult, ApiError } from '@/types/credit';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

export const predictCreditScore = async (file: File): Promise<PredictionResult> => {
  const formData = new FormData();
  formData.append('file', file);

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 30000);

  try {
    const response = await fetch(`${API_BASE_URL}/api/predict`, {
      method: 'POST',
      body: formData,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorData: ApiError = await response.json().catch(() => ({
        error: 'Unknown error',
        message: `HTTP ${response.status}: ${response.statusText}`,
        status_code: response.status,
      }));

      throw new Error(errorData.message || errorData.error || 'Failed to predict credit score');
    }

    const data: PredictionResult = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        throw new Error('Request timeout - please try again');
      }
      throw error;
    }
    throw new Error('An unexpected error occurred');
  }
};

