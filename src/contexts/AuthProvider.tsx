import { useEffect, useState, ReactNode } from 'react';
import { User, signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';
import { auth, googleProvider } from '@/lib/firebase';
import { AuthContext, AuthContextType } from './AuthContext';

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      // Verify the user was successfully authenticated
      if (!result.user) {
        throw new Error('Authentication failed: No user returned');
      }
      // User state will be updated via onAuthStateChanged
    } catch (error: unknown) {
      console.error('Error signing in with Google:', error);
      
      // Provide more helpful error messages
      let errorMessage = 'Failed to sign in with Google';
      
      // Type guard for Firebase errors (they have a 'code' property)
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
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
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
