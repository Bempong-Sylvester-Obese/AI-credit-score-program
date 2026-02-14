import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface BlobAnimationProps {
  children?: ReactNode;
  className?: string;
  size?: number;
  color?: string;
}

export function BlobAnimation({
  children,
  className,
  size = 400,
  color = 'rgba(0, 181, 18, 0.1)',
}: BlobAnimationProps) {
  return (
    <motion.div
      className={`blob-animation absolute rounded-full blur-3xl gpu-accelerated ${className || ''}`}
      style={{
        width: size,
        height: size,
        background: color,
      }}
      animate={{
        x: [0, 100, -100, 0],
        y: [0, -100, 100, 0],
        scale: [1, 1.2, 0.8, 1],
      }}
      transition={{
        duration: 20,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      {children}
    </motion.div>
  );
}
