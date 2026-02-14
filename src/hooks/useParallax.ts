import { useEffect, useState } from 'react';

interface UseParallaxOptions {
  speed?: number;
  offset?: number;
}

/**
 * Hook for parallax scrolling effect
 * Returns transform value based on scroll position
 */
export function useParallax(options: UseParallaxOptions = {}): number {
  const { speed = 0.5, offset = 0 } = options;
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setOffsetY(scrollY * speed + offset);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed, offset]);

  return offsetY;
}
