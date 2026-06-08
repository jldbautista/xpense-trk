'use client';

import { useState } from 'react';
import Link from 'next/link';
import PixelInput from '../ui/PixelInput';
import PixelButton from '../ui/PixelButton';
import PixelCheckbox from '../ui/PixelCheckbox';
import PixelDivider from '../ui/PixelDivider';
import PasswordInput from './PasswordInput';
import { login } from '@/app/actions/auth';

interface Errors {
  email?: string;
  password?: string;
}

export default function LoginForm() {
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [errors,      setErrors]      = useState<Errors>({});
  const [serverError, setServerError] = useState('');
  const [pending,     setPending]     = useState(false);

  function validate(): boolean {
    const e: Errors = {};
    if (!email.trim()) {
      e.email = 'Email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      e.email = 'Enter a valid email address.';
    }
    if (!password) {
      e.password = 'Password is required.';
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(e: { preventDefault(): void }) {
    e.preventDefault();
    setServerError('');
    if (!validate()) return;
    setPending(true);
    const result = await login({ email, password });
    if (result?.error) {
      setServerError(result.error);
      setPending(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      <PixelInput
        label="Email"
        id="login-email"
        type="email"
        autoComplete="email"
        placeholder="hero@xpense.trk"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={errors.email}
      />

      <PasswordInput
        label="Password"
        id="login-password"
        autoComplete="current-password"
        placeholder="••••••••"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={errors.password}
      />

      <div className="flex items-center justify-between flex-wrap gap-2">
        <PixelCheckbox
          id="login-remember"
          label="Remember me"
          checked={remember}
          onChange={(e) => setRemember(e.target.checked)}
        />
        <a
          href="#"
          className="text-base font-bold text-[#B388FF] hover:text-[#2D2A32] transition-colors"
        >
          Forgot password?
        </a>
      </div>

      <PixelButton type="submit" disabled={pending}>
        {pending ? 'LOGGING IN…' : 'LOG IN'}
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
        Don&apos;t have an account?{' '}
        <Link
          href="/signup"
          className="font-bold text-[#B388FF] hover:text-[#2D2A32] transition-colors"
        >
          Sign up
        </Link>
      </p>
    </form>
  );
}
