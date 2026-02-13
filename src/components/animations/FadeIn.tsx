import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { fadeIn, fadeInUp, fadeInDown, fadeInLeft, fadeInRight } from '@/lib/animations';

interface FadeInProps {
  children: ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  delay?: number;
  duration?: number;
  className?: string;
}

const variants = {
  up: fadeInUp,
  down: fadeInDown,
  left: fadeInLeft,
  right: fadeInRight,
  none: fadeIn,
};

export function FadeIn({
  children,
  direction = 'up',
  delay = 0,
  duration,
  className,
}: FadeInProps) {
  const variant = variants[direction];
  const defaultTransition = { duration: 0.6 };
  const customTransition = duration
    ? { ...defaultTransition, duration }
    : defaultTransition;

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={variant}
      transition={{ ...customTransition, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
