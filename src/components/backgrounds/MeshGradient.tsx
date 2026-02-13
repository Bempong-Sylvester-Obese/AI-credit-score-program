import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface MeshGradientProps {
  children?: ReactNode;
  className?: string;
}

export function MeshGradient({ children, className }: MeshGradientProps) {
  return (
    <div
      className={`relative overflow-hidden ${className || ''}`}
      style={{
        background: `
          radial-gradient(at 0% 0%, rgba(0, 181, 18, 0.15) 0px, transparent 50%),
          radial-gradient(at 100% 0%, rgba(226, 255, 84, 0.15) 0px, transparent 50%),
          radial-gradient(at 100% 100%, rgba(0, 16, 39, 0.15) 0px, transparent 50%),
          radial-gradient(at 0% 100%, rgba(2, 53, 67, 0.15) 0px, transparent 50%)
        `,
      }}
    >
      {children}
    </div>
  );
}
