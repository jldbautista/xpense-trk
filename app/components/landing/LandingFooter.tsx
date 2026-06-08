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
          <div className="grid gap-1.5 md:grid-cols-2 xl:block">
            <div className="ml-3 mt-16 md:ml-8 md:mt-20 xl:ml-12 xl:mt-10">
              <div className="relative max-w-[190px] border-4 border-[#2D2A32] bg-[#B388FF] px-2.5 py-1 shadow-[3px_3px_0_#2D2A32]">
                <p className="pr-4 text-[10px] font-bold leading-snug text-[#2D2A32]">
                  Great things happen
                  <br />
                  to prepared adventurers.
                </p>
                <Image
                  src="/glitter.png"
                  alt=""
                  aria-hidden="true"
                  width={1254}
                  height={1254}
                  className="pixel-art absolute bottom-1 right-1 h-3.5 w-3.5"
                />
                <span
                  className="absolute -left-3 top-1/2 h-4 w-4 -translate-y-1/2 rotate-45 border-b-4 border-l-4 border-[#2D2A32] bg-[#B388FF]"
                  aria-hidden="true"
                />
              </div>
            </div>

            <div className="border-l-2 border-[#2D2A32]/10 pl-2.5 text-[#2D2A32] xl:absolute xl:left-1/2 xl:top-10 xl:w-28 xl:-translate-x-[320px]">
              <h2 className="mb-1 text-xs font-bold">xpense.trk</h2>
              <nav className="flex flex-col gap-0.5" aria-label="Footer navigation">
                {footerNav.map((item) => (
                  <Link key={`${item.href}-${item.label}`} href={item.href} className="text-[11px] font-bold hover:text-white">
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>

            <div className="border-l-2 border-[#2D2A32]/10 pl-2.5 xl:absolute xl:left-1/2 xl:top-10 xl:w-36 xl:-translate-x-[180px]">
              <SupportList />
            </div>

            <div className="xl:absolute xl:left-1/2 xl:top-2 xl:w-[310px] xl:translate-x-[0px]">
              <FooterCTA />
            </div>
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
