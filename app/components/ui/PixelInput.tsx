import type { InputHTMLAttributes } from 'react';

interface PixelInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  error?: string;
}

export default function PixelInput({
  label,
  id,
  error,
  className,
  ...props
}: PixelInputProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-base font-bold text-[#2D2A32]">
        {label}
      </label>
      <input
        id={id}
        className={`pixel-input ${error ? 'pixel-input--error' : ''} ${className ?? ''}`}
        {...props}
      />
      {error && (
        <span className="text-sm font-bold text-[#E76F51]" role="alert">
          {error}
        </span>
      )}
    </div>
  );
}
