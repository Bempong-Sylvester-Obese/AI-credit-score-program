import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface AnimatedGradientProps {
  children?: ReactNode;
  className?: string;
}

export function AnimatedGradient({ children, className }: AnimatedGradientProps) {
  return (
    <div
      className={`animated-gradient ${className || ''}`}
      style={{
        background: 'linear-gradient(270deg, #00B512, #29ad8d, #E2FF54, #00B512)',
        backgroundSize: '400% 400%',
      }}
    >
      {children}
    </div>
  );
}
