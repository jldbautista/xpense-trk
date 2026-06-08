'use client';

import { useState } from 'react';
import type { InputHTMLAttributes } from 'react';

interface PasswordInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: string;
  id: string;
  error?: string;
}

export default function PasswordInput({
  label,
  id,
  error,
  className,
  ...props
}: PasswordInputProps) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-base font-bold text-[#2D2A32]">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type={visible ? 'text' : 'password'}
          className={`pixel-input pr-16 ${error ? 'pixel-input--error' : ''} ${className ?? ''}`}
          {...props}
        />
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          aria-label={visible ? 'Hide password' : 'Show password'}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-bold text-[#B388FF] hover:text-[#2D2A32] px-1 py-0.5 transition-colors cursor-pointer"
        >
          {visible ? 'HIDE' : 'SHOW'}
        </button>
      </div>
      {error && (
        <span className="text-sm font-bold text-[#E76F51]" role="alert">
          {error}
        </span>
      )}
    </div>
  );
}
