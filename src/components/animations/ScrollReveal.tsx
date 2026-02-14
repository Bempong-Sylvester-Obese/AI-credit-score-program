import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { fadeInUp, staggerContainer, staggerItem } from '@/lib/animations';

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  stagger?: boolean;
}

export function ScrollReveal({ children, className, stagger = false }: ScrollRevealProps) {
  const { ref, controls } = useScrollAnimation();

  if (stagger) {
    return (
      <motion.div
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={staggerContainer}
        className={className}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={fadeInUp}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div variants={staggerItem} className={className}>
      {children}
    </motion.div>
  );
}
