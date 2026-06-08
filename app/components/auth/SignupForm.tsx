'use client';

import { useState } from 'react';
import Link from 'next/link';
import PixelInput from '../ui/PixelInput';
import PixelButton from '../ui/PixelButton';
import PixelDivider from '../ui/PixelDivider';
import PasswordInput from './PasswordInput';
import { signup } from '@/app/actions/auth';

interface Errors {
  displayName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

export default function SignupForm() {
  const [displayName,     setDisplayName]     = useState('');
  const [email,           setEmail]           = useState('');
  const [password,        setPassword]        = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors,          setErrors]          = useState<Errors>({});
  const [serverError,     setServerError]     = useState('');
  const [pending,         setPending]         = useState(false);

  function validate(): boolean {
    const e: Errors = {};
    if (!displayName.trim()) {
      e.displayName = 'Display name is required.';
    }
    if (!email.trim()) {
      e.email = 'Email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      e.email = 'Enter a valid email address.';
    }
    if (!password) {
      e.password = 'Password is required.';
    } else if (password.length < 8) {
      e.password = 'Password must be at least 8 characters.';
    }
    if (!confirmPassword) {
      e.confirmPassword = 'Please confirm your password.';
    } else if (password !== confirmPassword) {
      e.confirmPassword = 'Passwords do not match.';
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(e: { preventDefault(): void }) {
    e.preventDefault();
    setServerError('');
    if (!validate()) return;
    setPending(true);
    const result = await signup({ displayName, email, password });
    if (result?.error) {
      setServerError(result.error);
      setPending(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      {/* Two-column grid on sm+ screens, single column on mobile */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <PixelInput
          label="Display Name"
          id="signup-name"
          type="text"
          autoComplete="name"
          placeholder="HeroPlayer99"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          error={errors.displayName}
        />
        <PixelInput
          label="Email"
          id="signup-email"
          type="email"
          autoComplete="email"
          placeholder="hero@xpense.trk"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={errors.email}
        />
        <PasswordInput
          label="Password"
          id="signup-password"
          autoComplete="new-password"
          placeholder="Min. 8 characters"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={errors.password}
        />
        <PasswordInput
          label="Confirm Password"
          id="signup-confirm"
          autoComplete="new-password"
          placeholder="Repeat password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          error={errors.confirmPassword}
        />
      </div>

      <PixelButton type="submit" disabled={pending}>
        {pending ? 'CREATING…' : 'CREATE ACCOUNT'}
      </PixelButton>

      {serverError && (
        <div
          className="border-4 border-[#E76F51] bg-[#E76F51]/10 px-4 py-3 text-base font-bold text-[#E76F51] text-center"
          role="alert"
        >
          {serverError}
        </div>
      )}

      <PixelDivider />

      <p className="text-center text-sm text-[#2D2A32]/70 sm:text-base">
        Already have an account?{' '}
        <Link
          href="/login"
          className="font-bold text-[#B388FF] hover:text-[#2D2A32] transition-colors"
        >
          Log in
        </Link>
      </p>
    </form>
  );
}
