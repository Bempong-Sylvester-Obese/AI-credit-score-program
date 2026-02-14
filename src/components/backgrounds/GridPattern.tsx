import { ReactNode } from 'react';

interface GridPatternProps {
  children?: ReactNode;
  className?: string;
  size?: number;
  color?: string;
}

export function GridPattern({
  children,
  className,
  size = 50,
  color = 'rgba(0, 181, 18, 0.1)',
}: GridPatternProps) {
  return (
    <div
      className={`grid-pattern ${className || ''}`}
      style={{
        backgroundImage: `
          linear-gradient(${color} 1px, transparent 1px),
          linear-gradient(90deg, ${color} 1px, transparent 1px)
        `,
        backgroundSize: `${size}px ${size}px`,
      }}
    >
      {children}
    </div>
  );
}
