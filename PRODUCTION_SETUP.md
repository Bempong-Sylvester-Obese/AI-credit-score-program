# Production Environment Setup Guide

## Firebase Authentication Setup

### Required Environment Variables

For the frontend (Vercel/Netlify/etc.), set these environment variables:

```bash
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_API_BASE_URL=https://your-api-domain.com
```

### Firebase Console Configuration

1. **Authorized Domains**: 
   - Go to Firebase Console → Authentication → Settings → Authorized domains
   - Add your production domain (e.g., `your-app.vercel.app` or your custom domain)
   - This is **critical** for Google auth to work in production

2. **OAuth Consent Screen**:
   - Ensure your Google OAuth consent screen is configured
   - Add your production domain to authorized JavaScript origins
   - Add your production domain to authorized redirect URIs

## Backend API Setup

### Required Environment Variables

For the backend API (Vercel/Heroku/etc.), set these environment variables:

```bash
# CORS Configuration
ALLOWED_ORIGINS=https://your-frontend-domain.com,https://your-app.vercel.app

# Firebase Admin SDK
FIREBASE_CREDENTIALS={"type":"service_account",...}  # JSON string
# OR
FIREBASE_CREDENTIALS_PATH=/path/to/firebase-credentials.json

# Environment
ENVIRONMENT=production
```

### CORS Configuration

The `ALLOWED_ORIGINS` environment variable should contain a comma-separated list of allowed origins:
- Your production frontend domain
- Any staging domains
- Example: `https://your-app.vercel.app,https://staging.your-app.com`

If not set, defaults to localhost only (development mode).

## Common Production Issues

### Google Auth Not Working

1. **Check Authorized Domains**: 
   - Verify your production domain is added in Firebase Console
   - Check browser console for `auth/unauthorized-domain` errors

2. **Check Environment Variables**:
   - Ensure all `VITE_FIREBASE_*` variables are set in your deployment platform
   - Verify `VITE_API_BASE_URL` points to your production API

3. **Check CORS**:
   - Ensure `ALLOWED_ORIGINS` includes your frontend domain
   - Verify the API is accessible from your frontend domain

4. **Check Browser Console**:
   - Look for specific Firebase error codes
   - Common errors:
     - `auth/unauthorized-domain`: Domain not authorized in Firebase
     - `auth/popup-blocked`: Browser blocked the popup
     - `auth/network-request-failed`: Network/CORS issue

### API Not Accessible

1. **Check API Base URL**:
   - Verify `VITE_API_BASE_URL` is set correctly
   - Ensure the API endpoint is publicly accessible

2. **Check CORS Headers**:
   - Verify `ALLOWED_ORIGINS` includes your frontend domain
   - Check browser Network tab for CORS errors

## Testing in Production

1. **Test Authentication Flow**:
   - Try signing in with Google
   - Check browser console for errors
   - Verify user is created in Firebase

2. **Test API Calls**:
   - Verify API calls include Authorization header
   - Check API logs for authentication errors
   - Test protected endpoints

## Troubleshooting

If Google auth still doesn't work after following these steps:

1. Check Firebase Console → Authentication → Users to see if users are being created
2. Check browser console for detailed error messages
3. Verify all environment variables are set correctly
4. Ensure your production domain matches exactly what's in Firebase Console
5. Check that Firebase Admin SDK credentials are valid

