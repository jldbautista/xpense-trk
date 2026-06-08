import Link from "next/link";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-[#FFF8E8] py-12 sm:py-16 lg:py-20">
      <div className="absolute inset-0 pointer-events-none select-none" aria-hidden="true">
        <Image
          src="/background-clouds-sparkles.png"
          alt=""
          aria-hidden="true"
          fill
          priority
          sizes="100vw"
          className="pixel-art pointer-events-none object-cover opacity-40"
        />
      </div>

      <div className="pixel-container relative">
        <div className="grid items-center gap-12 lg:grid-cols-[0.88fr_1.12fr] lg:gap-10 xl:gap-14">
          <div className="relative z-10">
            <div className="mb-6 inline-block border-4 border-[#2D2A32] bg-[#B388FF] px-4 py-2 shadow-[4px_4px_0_#2D2A32]">
              <span className="text-md font-bold uppercase tracking-[0.18em] text-white">
                Welcome Kitty and Spud Lover!
              </span>
            </div>

            <h1 className="max-w-xl text-[2.25rem] font-bold leading-[1.12] tracking-[-0.035em] sm:text-[3.2rem] lg:text-[3.35rem] xl:text-[3.65rem]">
              Track expenses.
              <br />
              Beat your goals.
              <br />
              <span className="inline-flex items-center gap-2 text-[#B388FF] sm:whitespace-nowrap">
                Level up your money.
                <Image
                  src="/glitter.png"
                  alt=""
                  aria-hidden="true"
                  width={1254}
                  height={1254}
                  className="pixel-art h-22 w-22 shrink-0 sm:h-14 sm:w-14"
                />
              </span>
            </h1>

            <p className="mt-6 max-w-lg text-base font-bold leading-7 text-[#2D2A32]/70 sm:text-xl">
              xpense.trk helps you log expenses, follow your monthly budget, and see how your Pixel Cat companion reacts as your spending changes.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
              <Link
                href="/signup"
                className="pixel-btn bg-[#5BAE4A] px-6 py-3.5 text-xl font-bold uppercase tracking-wide text-white"
              >
                Start Your Adventure
              </Link>
              <a
                href="#features"
                className="pixel-btn bg-white px-6 py-3.5 text-xl font-bold uppercase tracking-wide text-[#2D2A32]"
              >
                See How It Works
              </a>
            </div>

            <div className="mt-7 flex items-center gap-2 text-lg font-bold uppercase tracking-wider text-[#2D2A32]/60 sm:text-lg">
              <Image
                src="/heart.png"
                alt=""
                aria-hidden="true"
                width={1254}
                height={1254}
                className="pixel-art h-10 w-10 shrink-0"
              />
              Made for dreamers, savers, and goal-getters
              <Image
                src="/heart.png"
                alt=""
                aria-hidden="true"
                width={1254}
                height={1254}
                className="pixel-art h-10 w-10 shrink-0"
              />
            </div>
          </div>

          <div className="relative mx-auto flex w-full max-w-[650px] items-center justify-center lg:translate-x-12 lg:-translate-y-4 lg:max-w-[610px] xl:max-w-[650px]">
            <div className="absolute inset-x-[8%] bottom-[8%] top-[10%] border-4 border-[#2D2A32] bg-white shadow-[10px_10px_0_#2D2A32]" />
            <Image
              src="/home-page.png"
              alt="Pixel-art preview of the xpense.trk dashboard showing expense, budget, pixel cat, and quick summary cards"
              width={1448}
              height={1086}
              sizes="(min-width: 1024px) 54vw, 100vw"
              className="pixel-art relative z-10 h-auto w-full object-contain"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
