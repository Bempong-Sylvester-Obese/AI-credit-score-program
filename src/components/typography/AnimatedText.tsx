import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { textReveal } from '@/lib/animations';

interface AnimatedTextProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function AnimatedText({ children, className, delay = 0 }: AnimatedTextProps) {
  return (
    <motion.span
      initial="hidden"
      animate="visible"
      variants={textReveal}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.span>
  );
}
