import type { ReactNode } from 'react';
import BrandLogo from './BrandLogo';
import AuthScenery from './AuthScenery';

interface AuthLayoutProps {
  children: ReactNode;
  label: string;
  wide?: boolean;
}

export default function AuthLayout({
  children,
  label,
  wide = false,
}: AuthLayoutProps) {
  return (
    <div className="relative min-h-screen bg-[#FFF8E8] text-[#2D2A32]">
      {/* Fixed decorative background — pointer-events-none so it never blocks inputs */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <AuthScenery />
      </div>

      {/* Scrollable page content */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 py-6">
        {/* Purple label chip above card */}
        <div className="pixel-border pixel-shadow relative z-20 -mb-3 bg-[#B388FF] text-white text-sm font-bold px-5 py-1.5 tracking-widest uppercase">
          {label}
        </div>

        {/* Auth card */}
        <div
          className={`pixel-card w-full p-6 pt-8 sm:p-8 sm:pt-10 ${
            wide ? 'max-w-xl' : 'max-w-md'
          }`}
        >
          {/* Brand logo + tagline */}
          <div className="mb-4 flex flex-col items-center text-center">
            <BrandLogo />
            <p className="mt-2 text-base font-bold text-[#2D2A32]/60 sm:text-lg">
              Track expenses like it&apos;s 1998.
            </p>
          </div>

          <div className="mb-6 border-t-4 border-[#2D2A32]" />

          {children}
        </div>
      </div>
    </div>
  );
}
