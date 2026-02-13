import { useEffect, useState, ReactNode } from 'react';
import { User, signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';
import { auth, googleProvider, isFirebaseReady } from '@/lib/firebase';
import { AuthContext, AuthContextType } from './AuthContext';

const AUTH_LOADING_TIMEOUT_MS = 3000;

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(isFirebaseReady);

  const signInWithGoogle = async () => {
    if (!auth || !googleProvider) {
      throw new Error(
        'Authentication is not available. Please configure Firebase environment variables.'
      );
    }
    try {
      const result = await signInWithPopup(auth, googleProvider);
      if (!result.user) {
        throw new Error('Authentication failed: No user returned');
      }
    } catch (error: unknown) {
      console.error('Error signing in with Google:', error);

      let errorMessage = 'Failed to sign in with Google';

      if (error && typeof error === 'object' && 'code' in error) {
        const firebaseError = error as { code: string; message?: string };
        if (firebaseError.code === 'auth/popup-closed-by-user') {
          errorMessage = 'Sign-in popup was closed. Please try again.';
        } else if (firebaseError.code === 'auth/popup-blocked') {
          errorMessage = 'Popup was blocked by your browser. Please allow popups for this site.';
        } else if (firebaseError.code === 'auth/unauthorized-domain') {
          errorMessage = 'This domain is not authorized for Firebase authentication. Please contact support.';
        } else if (firebaseError.code === 'auth/network-request-failed') {
          errorMessage = 'Network error. Please check your internet connection and try again.';
        } else if (firebaseError.message) {
          errorMessage = firebaseError.message;
        }
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }

      throw new Error(errorMessage);
    }
  };

  const signOutUser = async () => {
    if (!auth) {
      throw new Error('Authentication is not available.');
    }
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  };

  useEffect(() => {
    if (!isFirebaseReady || !auth) {
      setLoading(false);
      return;
    }

    const timeoutId = setTimeout(() => {
      setLoading(false);
    }, AUTH_LOADING_TIMEOUT_MS);

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => {
      clearTimeout(timeoutId);
      unsubscribe();
    };
  }, []);

  if (loading) return <div>Loading authentication...</div>;

  const value: AuthContextType = {
    user,
    loading,
    signInWithGoogle,
    signOutUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
