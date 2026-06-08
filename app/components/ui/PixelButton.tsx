import type { ButtonHTMLAttributes, ReactNode } from 'react';

interface PixelButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost';
  children: ReactNode;
}

export default function PixelButton({
  variant = 'primary',
  children,
  className,
  ...props
}: PixelButtonProps) {
  const bg =
    variant === 'primary'
      ? 'bg-[#5BAE4A] text-white'
      : 'bg-[#FFF8E8] text-[#2D2A32]';

  return (
    <button
      className={`pixel-btn w-full py-3.5 text-lg font-bold ${bg} ${className ?? ''}`}
      {...props}
    >
      {children}
    </button>
  );
}
