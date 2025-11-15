import { createContext } from 'react';
import { User } from 'firebase/auth';

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signOutUser: () => Promise<void>;
}

// Only the context is defined here — no components
export const AuthContext = createContext<AuthContextType | undefined>(undefined);
