import type { InputHTMLAttributes, ReactNode } from 'react';

interface PixelCheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: ReactNode;
  id: string;
}

export default function PixelCheckbox({
  label,
  id,
  className,
  ...props
}: PixelCheckboxProps) {
  return (
    <label
      htmlFor={id}
      className={`flex items-center gap-2 cursor-pointer ${className ?? ''}`}
    >
      <input type="checkbox" id={id} className="pixel-checkbox" {...props} />
      <span className="text-base font-bold text-[#2D2A32]">{label}</span>
    </label>
  );
}
