import { useRef, useCallback } from 'react';

const DEBOUNCE_MS = 500;

/**
 * Prevents double-clicks and rapid form submissions.
 * Returns a guard function that returns false if called again within DEBOUNCE_MS.
 */
export function useSubmitGuard() {
  const lastSubmitRef = useRef<number>(0);
  const isSubmittingRef = useRef(false);

  const guard = useCallback((): boolean => {
    const now = Date.now();
    if (isSubmittingRef.current) return false;
    if (now - lastSubmitRef.current < DEBOUNCE_MS) return false;
    lastSubmitRef.current = now;
    isSubmittingRef.current = true;
    return true;
  }, []);

  const release = useCallback(() => {
    isSubmittingRef.current = false;
  }, []);

  return { guard, release };
}
