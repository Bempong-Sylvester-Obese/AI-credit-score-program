from fastapi import HTTPException, Depends, Header
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from typing import Optional
import firebase_admin
from firebase_admin import auth, credentials
import os
import json

_firebase_initialized = False

try:
    try:
        firebase_admin.get_app()
        _firebase_initialized = True
    except ValueError:
        firebase_creds_json = os.getenv("FIREBASE_CREDENTIALS")
        if firebase_creds_json:
            cred_dict = json.loads(firebase_creds_json)
            cred = credentials.Certificate(cred_dict)
            firebase_admin.initialize_app(cred)
            _firebase_initialized = True
        else:
            configured_path = os.getenv("FIREBASE_CREDENTIALS_PATH")
            candidate_paths = [
                configured_path,
                "firebase-credentials.json",
                "firebasecredentials.json",
            ]
            for cred_path in [p for p in candidate_paths if p]:
                if os.path.exists(cred_path):
                    cred = credentials.Certificate(cred_path)
                    firebase_admin.initialize_app(cred)
                    _firebase_initialized = True
                    break
            else:
                # For development, allow initialization without credentials
                # In production, this should be required
                print("Warning: Firebase credentials not found. Authentication will be disabled.")
                print("Set FIREBASE_CREDENTIALS or FIREBASE_CREDENTIALS_PATH environment variables.")
except Exception as e:
    print(f"Warning: Firebase Admin initialization failed: {e}")
    print("Authentication will be disabled. Set FIREBASE_CREDENTIALS or FIREBASE_CREDENTIALS_PATH environment variables.")

security = HTTPBearer()

async def verify_firebase_token(
    credentials: HTTPAuthorizationCredentials = Depends(security)
) -> dict:
    """
    Verify Firebase ID token and return decoded token.
    
    Args:
        credentials: HTTP Bearer token credentials
        
    Returns:
        Decoded Firebase token containing user information
        
    Raises:
        HTTPException: If token is invalid or missing
    """
    if not _firebase_initialized:
        raise HTTPException(
            status_code=503,
            detail="Firebase authentication is not configured"
        )
    
    token = credentials.credentials
    
    try:
        decoded_token = auth.verify_id_token(token)
        return decoded_token
    except auth.InvalidIdTokenError:
        raise HTTPException(
            status_code=401,
            detail="Invalid authentication token"
        )
    except auth.ExpiredIdTokenError:
        raise HTTPException(
            status_code=401,
            detail="Authentication token has expired"
        )
    except Exception as e:
        raise HTTPException(
            status_code=401,
            detail=f"Authentication error: {str(e)}"
        )


def get_current_user(
    token_data: dict = Depends(verify_firebase_token)
) -> dict:
    """
    Get current user from verified token.
    
    Args:
        token_data: Decoded Firebase token
        
    Returns:
        User information dictionary with uid and email
    """
    return {
        "uid": token_data.get("uid"),
        "email": token_data.get("email"),
        "firebase_claims": token_data
    }


async def get_optional_user(
    authorization: Optional[str] = Header(None)
) -> Optional[dict]:
    """
    Optional authentication - returns user if token is present, None otherwise.
    Useful for endpoints that work with or without authentication.
    
    Args:
        authorization: Optional Authorization header
        
    Returns:
        User information if authenticated, None otherwise
    """
    if not authorization or not authorization.startswith("Bearer "):
        return None
    
    try:
        token = authorization.split("Bearer ")[1]
        decoded_token = auth.verify_id_token(token)
        return {
            "uid": decoded_token.get("uid"),
            "email": decoded_token.get("email"),
            "firebase_claims": decoded_token
        }
    except Exception:
        return None