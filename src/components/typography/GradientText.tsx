import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface GradientTextProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary';
  className?: string;
}

export function GradientText({ children, variant = 'primary', className }: GradientTextProps) {
  return (
    <span
      className={cn(
        'gradient-text inline-block',
        variant === 'secondary' && 'gradient-text-secondary',
        className
      )}
    >
      {children}
    </span>
  );
}
