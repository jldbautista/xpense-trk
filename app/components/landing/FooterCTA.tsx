import Link from "next/link";

export default function FooterCTA() {
  return (
    <div className="border-4 border-[#2D2A32] bg-[#FFF8E8] p-3 shadow-[4px_4px_0_#2D2A32]">
      <h3 className="mb-1.5 text-md font-bold uppercase text-[#2D2A32]">Ready to level up?</h3>
      <p className="mb-2 text-md font-bold leading-snug text-[#2D2A32]/75">
        Join towards building strong money habits.
      </p>
      <Link
        href="/signup"
        className="pixel-btn flex w-full items-center justify-center bg-[#5BAE4A] px-3 py-1.5 text-md font-bold uppercase tracking-wide text-white"
      >
        Get started - it&apos;s free
      </Link>
    </div>
  );
}
