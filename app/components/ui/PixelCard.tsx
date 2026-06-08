import type { ReactNode } from 'react';

interface PixelCardProps {
  children: ReactNode;
  className?: string;
}

export default function PixelCard({ children, className }: PixelCardProps) {
  return (
    <div className={`pixel-card p-8 ${className ?? ''}`}>
      {children}
    </div>
  );
}
