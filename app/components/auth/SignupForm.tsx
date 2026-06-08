'use client';

import { useState } from 'react';
import Image from 'next/image';
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

const companions = [
  { name: 'Mochi', image: '/cat-head.png', alt: 'Gray cat companion', imageScale: '' },
  { name: 'Spud', image: '/spud-head.png', alt: 'Spud companion', imageScale: 'scale-125' },
] as const;

export default function SignupForm() {
  const [displayName,     setDisplayName]     = useState('');
  const [email,           setEmail]           = useState('');
  const [password,        setPassword]        = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors,          setErrors]          = useState<Errors>({});
  const [serverError,     setServerError]     = useState('');
  const [pending,         setPending]         = useState(false);
  const [companion,       setCompanion]       = useState<typeof companions[number]['name']>('Mochi');

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

      <div>
        <p className="mb-2 text-sm font-bold uppercase tracking-[0.15em] text-[#2D2A32]/70">
          Pick your companion
        </p>
        <div className="flex justify-center gap-4">
          {companions.map((c) => {
            const selected = companion === c.name;
            return (
              <button
                key={c.name}
                type="button"
                onClick={() => setCompanion(c.name)}
                aria-pressed={selected}
                className={`w-24 text-center transition-transform ${selected ? 'scale-105' : ''}`}
              >
                <div
                  className={`overflow-hidden border-4 bg-[#FFF8E8] p-1 shadow-[3px_3px_0_#2D2A32] ${
                    selected ? 'border-[#5BAE4A] bg-[#5BAE4A]/20' : 'border-[#2D2A32]'
                  }`}
                >
                  <Image
                    src={c.image}
                    alt={c.alt}
                    width={1254}
                    height={1254}
                    loading="eager"
                    className={`pixel-art h-auto w-full ${c.imageScale}`}
                  />
                </div>
                <p className={`mt-1 text-base font-bold uppercase ${selected ? 'text-[#5BAE4A]' : 'text-[#2D2A32]/70'}`}>
                  {c.name}
                </p>
              </button>
            );
          })}
        </div>
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
