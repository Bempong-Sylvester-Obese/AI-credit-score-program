# Firebase App Check & API Key Security

This document describes how to secure your Firebase configuration for production deployment. While Firebase API keys are designed to be public (security is enforced via Security Rules), you should restrict them to limit abuse.

## 1. Enable Firebase App Check

Firebase App Check helps protect your backend resources from abuse by ensuring requests come from your authentic app.

### Steps

1. **Open Firebase Console**
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Select your project (e.g., `ai-credit-scoring`)

2. **Navigate to App Check**
   - In the left sidebar, click **Build** → **App Check**
   - Click **Get started** if you haven't enabled App Check yet

3. **Register your web app**
   - Click **Register** next to your web app
   - Choose **reCAPTCHA Enterprise** as the provider (recommended for web)
   - Follow the prompts to create a reCAPTCHA Enterprise key in Google Cloud Console
   - Enable **Enforce** for **Authentication** and any other Firebase services you use

4. **Add App Check to your app**
   - Install the App Check package:
     ```bash
     npm install firebase
     ```
   - In `src/lib/firebase.ts`, add after initializing the app:
     ```typescript
     import { initializeAppCheck, ReCaptchaEnterpriseProvider } from 'firebase/app-check';

     if (app) {
       initializeAppCheck(app, {
         provider: new ReCaptchaEnterpriseProvider(import.meta.env.VITE_RECAPTCHA_SITE_KEY),
         isTokenAutoRefreshEnabled: true,
       });
     }
     ```
   - Add `VITE_RECAPTCHA_SITE_KEY` to your `.env` (from reCAPTCHA Enterprise key)

5. **Test in debug mode**
   - For local development, use the debug token from Firebase Console → App Check → Manage debug tokens
   - Add `?debug=true` to your URL or set a debug token in the browser console

## 2. Restrict the API Key in Google Cloud Console

Restricting the API key limits where it can be used and which APIs it can access.

### Steps

1. **Open Google Cloud Console**
   - Go to [APIs & Credentials](https://console.cloud.google.com/apis/credentials)
   - Select the same project as your Firebase project

2. **Locate your API key**
   - Under **API keys**, find the key used by your Firebase web app
   - (The key is in `VITE_FIREBASE_API_KEY` in your `.env`)

3. **Edit the key**
   - Click the key name to edit
   - Under **Application restrictions**:
     - Select **HTTP referrers (web sites)**
     - Add your production domain(s), e.g.:
       - `https://yourdomain.com/*`
       - `https://*.yourdomain.com/*`
     - For local development, add:
       - `http://localhost:*`
       - `http://127.0.0.1:*`

4. **API restrictions**
   - Under **API restrictions**, select **Restrict key**
   - Add only the APIs you need:
     - **Firebase Authentication API** (Identity Toolkit API)
     - Any other Firebase services you use (e.g., Firestore, Storage)

5. **Save** the changes

## 3. Configure Authorized Domains in Firebase

1. **Open Firebase Console**
   - Go to **Authentication** → **Settings** → **Authorized domains**

2. **Review domains**
   - Ensure only your production domain and `localhost` are listed
   - Remove any unused or test domains

## 4. Rotate Exposed Keys

If your Firebase API key or credentials have been committed to version control or otherwise exposed:

1. **Create a new API key** in Google Cloud Console
2. **Update** your `.env` and `.env.example` (with placeholder) with the new key
3. **Redeploy** your application
4. **Delete** the old API key after confirming the new one works

## 5. Environment Variables Checklist

Never commit real credentials. Use `.env.example` as a template:

```env
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abc123
# Optional, for App Check:
# VITE_RECAPTCHA_SITE_KEY=your_recaptcha_site_key
```

Ensure `.env`, `.env.local`, `.env.production`, and other env files are in `.gitignore`.
