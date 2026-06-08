import TopNavbar from "./components/landing/TopNavbar";
import HeroSection from "./components/landing/HeroSection";
import FeatureStrip from "./components/landing/FeatureStrip";
import CompanionPreview from "./components/landing/CompanionPreview";
import LandingFooter from "./components/landing/LandingFooter";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#FFF8E8] text-[#2D2A32]">
      <TopNavbar />
      <main>
        <HeroSection />

        <section id="features" className="scroll-mt-4 border-y-4 border-[#2D2A32] bg-[#F7C948] py-9 sm:py-11">
          <div className="pixel-container">
            <div className="mb-7 flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
              <div>
                <p className="mb-2 text-2xl font-bold uppercase tracking-[0.22em] text-[#A04E37]">
                  Your spending goals
                </p>
                <h2 className="text-2xl font-bold uppercase sm:text-3xl">Spend with purpose.</h2>
              </div>
              <p className="max-w-sm text-lg font-bold leading-relaxed text-[#2D2A32]/70">
                Know where your money goes, stay close to your budget, and save with your pixel companion!
              </p>
            </div>

            <div className="grid items-stretch gap-6 lg:grid-cols-[minmax(0,1fr)_340px] xl:grid-cols-[minmax(0,1fr)_360px]">
              <FeatureStrip />
              <CompanionPreview />
            </div>
          </div>
        </section>
      </main>

      <LandingFooter />
    </div>
  );
}
