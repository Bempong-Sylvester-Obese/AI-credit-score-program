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

if (missingVars.length > 0) {
  const errorMessage = `Missing required Firebase environment variables: ${missingVars.join(', ')}`;
  console.error(errorMessage);
  if (import.meta.env.PROD) {
    throw new Error(errorMessage);
  }
}

// Firebase configuration
const firebaseConfig = {
  apiKey: requiredEnvVars.apiKey,
  authDomain: requiredEnvVars.authDomain,
  projectId: requiredEnvVars.projectId,
  storageBucket: requiredEnvVars.storageBucket,
  messagingSenderId: requiredEnvVars.messagingSenderId,
  appId: requiredEnvVars.appId,
};

// Initialize Firebase (avoid duplicate initialization)
let app: FirebaseApp;
const existingApps = getApps();
if (existingApps.length > 0) {
  app = existingApps[0];
} else {
  app = initializeApp(firebaseConfig);
}

// Initialize Firebase Authentication and get reference to the service
export const auth: Auth = getAuth(app);

// Configure auth settings for production
if (import.meta.env.PROD) {
  // Ensure proper domain configuration
  auth.settings.appVerificationDisabledForTesting = false;
}

// Initialize Google Auth Provider
export const googleProvider = new GoogleAuthProvider();

// Set additional scopes and parameters
googleProvider.setCustomParameters({
  prompt: 'select_account',
});

// Add error handling for auth domain issues
if (import.meta.env.PROD && !auth.app.options.authDomain) {
  console.warn('Warning: Firebase authDomain may not be properly configured for production');
}

export default app;