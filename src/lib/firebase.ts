import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, Auth } from 'firebase/auth';
import { logger } from '@/lib/logger';

/*
 * SECURITY: Firebase App Check & API Key Restrictions
 *
 * Before deploying to production, complete these steps:
 *
 * 1. Enable Firebase App Check in the Firebase Console:
 *    - Go to Firebase Console > App Check
 *    - Register your web app with reCAPTCHA Enterprise
 *    - Enforce App Check on Auth and any other Firebase services you use
 *    - Install firebase/app-check and call initializeAppCheck(app, { provider, isTokenAutoRefreshEnabled: true })
 *
 * 2. Restrict the API key in Google Cloud Console:
 *    - Go to https://console.cloud.google.com/apis/credentials
 *    - Click on the API key used by this project
 *    - Under "Application restrictions", select "HTTP referrers"
 *    - Add your production domain(s) (e.g., https://yourdomain.com/*)
 *    - Under "API restrictions", restrict to only: Firebase Auth API, Identity Toolkit API
 *
 * 3. Configure authorized domains in Firebase Console:
 *    - Go to Firebase Console > Authentication > Settings > Authorized domains
 *    - Ensure only your production domain and localhost are listed
 */

// Validate required environment variables
const requiredEnvVars = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Check for missing environment variables
const missingVars = Object.entries(requiredEnvVars)
  .filter(([, value]) => !value)
  .map(([key]) => key);

const hasValidConfig = missingVars.length === 0;

if (!hasValidConfig) {
  logger.error(
    `Missing required Firebase environment variables: ${missingVars.join(', ')}. Auth features will be disabled.`
  );
}

// Initialize Firebase only when config is valid
let app: FirebaseApp | null = null;
let auth: Auth | null = null;
let googleProvider: GoogleAuthProvider | null = null;
let firebaseReady = false;

if (hasValidConfig) {
  try {
    const firebaseConfig = {
      apiKey: requiredEnvVars.apiKey,
      authDomain: requiredEnvVars.authDomain,
      projectId: requiredEnvVars.projectId,
      storageBucket: requiredEnvVars.storageBucket,
      messagingSenderId: requiredEnvVars.messagingSenderId,
      appId: requiredEnvVars.appId,
    };

    const existingApps = getApps();
    if (existingApps.length > 0) {
      app = existingApps[0] as FirebaseApp;
    } else {
      app = initializeApp(firebaseConfig);
    }

    auth = getAuth(app);

    if (import.meta.env.PROD) {
      auth.settings.appVerificationDisabledForTesting = false;
    }

    googleProvider = new GoogleAuthProvider();
    googleProvider.setCustomParameters({
      prompt: 'select_account',
    });

    if (import.meta.env.PROD && !auth.app.options.authDomain) {
      logger.warn('Firebase authDomain may not be properly configured for production');
    }

    firebaseReady = true;
  } catch (error) {
    logger.error('Firebase initialization failed:', error);
    app = null;
    auth = null;
    googleProvider = null;
  }
}

export const isFirebaseReady = firebaseReady;

export { auth, googleProvider };

export default app;