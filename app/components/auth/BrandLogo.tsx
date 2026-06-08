import Image from 'next/image';
import Link from 'next/link';

export default function BrandLogo() {
  return (
    <Link
      href="/"
      className="mx-auto flex w-fit max-w-full shrink-0 items-center justify-center gap-0"
      aria-label="xpense.trk home"
    >
      <Image
        src="/xpense-logo.png"
        alt=""
        aria-hidden="true"
        width={1254}
        height={1254}
        priority
        className="pixel-art -mr-3 h-16 w-16 translate-y-0.5 sm:-mr-4 sm:h-20 sm:w-20"
      />
      <span className="text-3xl font-bold leading-none tracking-tight text-[#2D2A32] sm:text-4xl">
        xpense.trk
      </span>
    </Link>
  );
}
