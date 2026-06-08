import Image from "next/image";
import Link from "next/link";

const navItems = [
  { label: "How It Works", href: "#features" },
  { label: "Companions", href: "#companions" },
  { label: "The Journey", href: "#journey" },
] as const;

export default function TopNavbar() {
  return (
    <header className="relative z-30 border-b-4 border-[#2D2A32] bg-white">
      <div className="pixel-container flex min-h-20 items-center justify-between gap-5 py-3">
        <Link href="/" className="flex shrink-0 items-center gap-0" aria-label="xpense.trk home">
          <Image
            src="/xpense-logo.png"
            alt=""
            aria-hidden="true"
            width={1254}
            height={1254}
            priority
            className="pixel-art -mr-5 translate-y-1 h-24 w-24 sm:-mr-6 sm:h-24 sm:w-24"
          />
          <span className="text-4xl font-bold leading-none tracking-tight sm:text-5xl">xpense.trk</span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Main navigation">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-2xl font-bold uppercase tracking-[0.12em] hover:text-[#5BAE4A]"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2.5 sm:gap-3">
          <Link
            href="/login"
            className="hidden border-4 border-[#2D2A32] bg-[#FFF8E8] px-6 py-3 text-lg font-bold uppercase tracking-wider shadow-[4px_4px_0_#2D2A32] transition-[transform,box-shadow] hover:translate-x-px hover:translate-y-px hover:shadow-[2px_2px_0_#2D2A32] sm:inline-flex"
          >
            Log In
          </Link>
          <Link
            href="/signup"
            className="pixel-btn bg-[#5BAE4A] px-6 py-3 text-lg font-bold uppercase tracking-wider text-[#2D2A32] sm:px-7"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </header>
  );
}
