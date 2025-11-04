import type {
  PredictionResult,
  ApiError,
  UserProfile,
  UserProfileCreate,
  UserProfileUpdate,
  PredictionListResponse,
  ScoreHistoryItem,
} from '@/types/credit';
import { auth } from '@/lib/firebase';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

/**
 * Get authentication token from Firebase
 */
const getAuthToken = async (): Promise<string | null> => {
  const user = auth.currentUser;
  if (!user) {
    return null;
  }
  try {
    return await user.getIdToken();
  } catch (error) {
    console.error('Error getting auth token:', error);
    return null;
  }
};

/**
 * Make authenticated API request
 */
const authenticatedFetch = async (
  url: string,
  options: RequestInit = {}
): Promise<Response> => {
  const token = await getAuthToken();
  const headers: HeadersInit = {
    ...options.headers,
  };

  if (token) {
    (headers as Record<string, string>)['Authorization'] = `Bearer ${token}`;
  }

  return fetch(url, {
    ...options,
    headers,
  });
};

/**
 * Handle API errors
 */
const handleApiError = async (response: Response): Promise<never> => {
  const errorData: ApiError = await response.json().catch(() => ({
    error: 'Unknown error',
    message: `HTTP ${response.status}: ${response.statusText}`,
    status_code: response.status,
  }));

  throw new Error(errorData.message || errorData.error || 'API request failed');
};

/**
 * Predict credit score from uploaded CSV file
 */
export const predictCreditScore = async (file: File): Promise<PredictionResult> => {
  const formData = new FormData();
  formData.append('file', file);

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 30000);

  try {
    const token = await getAuthToken();
    const headers: HeadersInit = {};
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}/api/predict`, {
      method: 'POST',
      headers,
      body: formData,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      await handleApiError(response);
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

/**
 * Create or update user profile
 */
export const createUserProfile = async (
  profileData: UserProfileCreate
): Promise<UserProfile> => {
  const response = await authenticatedFetch(`${API_BASE_URL}/api/profile`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(profileData),
  });

  if (!response.ok) {
    await handleApiError(response);
  }

  return response.json();
};

/**
 * Get user profile
 */
export const getUserProfile = async (): Promise<UserProfile> => {
  const response = await authenticatedFetch(`${API_BASE_URL}/api/profile`);

  if (!response.ok) {
    await handleApiError(response);
  }

  return response.json();
};

/**
 * Update user profile
 */
export const updateUserProfile = async (
  profileData: UserProfileUpdate
): Promise<UserProfile> => {
  const response = await authenticatedFetch(`${API_BASE_URL}/api/profile`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(profileData),
  });

  if (!response.ok) {
    await handleApiError(response);
  }

  return response.json();
};

/**
 * Get user's prediction history
 */
export const getUserPredictions = async (
  limit: number = 10,
  offset: number = 0
): Promise<PredictionListResponse> => {
  const params = new URLSearchParams({
    limit: limit.toString(),
    offset: offset.toString(),
  });

  const response = await authenticatedFetch(
    `${API_BASE_URL}/api/predictions?${params.toString()}`
  );

  if (!response.ok) {
    await handleApiError(response);
  }

  return response.json();
};

/**
 * Get user's historical credit scores
 */
export const getScoreHistory = async (limit: number = 12): Promise<ScoreHistoryItem[]> => {
  const params = new URLSearchParams({
    limit: limit.toString(),
  });

  const response = await authenticatedFetch(
    `${API_BASE_URL}/api/scores/history?${params.toString()}`
  );

  if (!response.ok) {
    await handleApiError(response);
  }

  return response.json();
};

