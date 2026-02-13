import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, Auth } from 'firebase/auth';

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
  console.error(
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
      console.warn('Warning: Firebase authDomain may not be properly configured for production');
    }

    firebaseReady = true;
  } catch (error) {
    console.error('Firebase initialization failed:', error);
    app = null;
    auth = null;
    googleProvider = null;
  }
}

export const isFirebaseReady = firebaseReady;

export { auth, googleProvider };

export default app;