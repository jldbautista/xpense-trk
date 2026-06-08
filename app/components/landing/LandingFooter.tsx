import Image from "next/image";
import Link from "next/link";
import FooterCTA from "./FooterCTA";
import SupportList from "./SupportList";

const footerNav = [
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#features" },
  { label: "Companions", href: "#companions" },
  { label: "Log In", href: "/login" },
  { label: "Sign Up", href: "/signup" },
] as const;

export default function LandingFooter() {
  return (
    <footer id="journey" className="scroll-mt-4 border-t-4 border-[#2D2A32]">
      <div className="relative min-h-[360px] overflow-hidden bg-[#8DB9F2] md:min-h-[280px] xl:min-h-[190px]">
        <Image
          src="/footer.png?v=2026-06-06"
          alt=""
          aria-hidden="true"
          fill
          sizes="100vw"
          loading="eager"
          unoptimized
          className="pixel-art pointer-events-none translate-y-5 scale-100 select-none object-cover object-bottom md:translate-y-7 md:scale-105 xl:translate-y-9"
        />

        <div className="pixel-container relative z-10 py-2 md:py-3 xl:py-1.5">
          <div className="flex flex-col items-center gap-6 md:-mt-3 sm:flex-row sm:items-start sm:justify-center sm:gap-16 xl:py-6">
            <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start sm:gap-6">
              <div className="border-l-2 border-[#2D2A32]/10 pl-2.5 text-center text-[#2D2A32] sm:text-left">
                <h2 className="mb-1 text-lg font-bold">xpense.trk</h2>
                <nav className="flex flex-col gap-0.5" aria-label="Footer navigation">
                  {footerNav.map((item) => (
                    <Link key={`${item.href}-${item.label}`} href={item.href} className="text-base font-bold hover:text-white">
                      {item.label}
                    </Link>
                  ))}
                </nav>
              </div>

              <div className="border-l-2 border-[#2D2A32]/10 pl-2.5">
                <SupportList />
              </div>
            </div>

            <FooterCTA />
          </div>
        </div>
      </div>

      <div className="border-t-4 border-[#16141A] bg-[#2D2A32] py-1.5 text-[#FFF8E8]">
        <div className="pixel-container flex items-center justify-center gap-1.5">
          <Image
            src="/glitter.png"
            alt=""
            aria-hidden="true"
            width={1254}
            height={1254}
            className="pixel-art h-3.5 w-3.5"
          />
          <p className="text-center text-[10px] font-bold tracking-wider sm:text-[11px]">
            © 2026 xpense.trk • Track expenses like it&apos;s 1998.
          </p>
          <Image
            src="/glitter.png"
            alt=""
            aria-hidden="true"
            width={1254}
            height={1254}
            className="pixel-art h-3.5 w-3.5"
          />
        </div>
      </div>
    </footer>
  );
}
