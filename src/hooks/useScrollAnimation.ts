import { useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import { useAnimation, AnimationControls } from 'framer-motion';

interface UseScrollAnimationOptions {
  threshold?: number;
  triggerOnce?: boolean;
  delay?: number;
}

/**
 * Hook for scroll-triggered animations
 * Returns animation controls and ref to attach to element
 */
export function useScrollAnimation(
  options: UseScrollAnimationOptions = {}
): {
  ref: (node?: Element | null) => void;
  controls: AnimationControls;
  inView: boolean;
} {
  const { threshold = 0.1, triggerOnce = true, delay = 0 } = options;
  const controls = useAnimation();
  const { ref, inView } = useInView({
    threshold,
    triggerOnce,
  });

  useEffect(() => {
    if (inView) {
      const timer = setTimeout(() => {
        controls.start('visible');
      }, delay);
      return () => clearTimeout(timer);
    } else if (!triggerOnce) {
      controls.start('hidden');
    }
  }, [controls, inView, delay, triggerOnce]);

  return { ref, controls, inView };
}
