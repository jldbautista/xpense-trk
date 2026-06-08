import Image from "next/image";

const companions = [
  {
    name: "Mochi",
    image: "/cat-head.png",
    alt: "Gray cat companion",
    blurb: "Mochi is here to cheer on every smart money move.",
    imageScale: "",
  },
  {
    name: "Spud",
    image: "/spud-head.png",
    alt: "Spud companion",
    blurb: "Spud is here to cheer on every smart money move.",
    imageScale: "scale-125",
  },
] as const;

export default function CompanionPreview() {
  return (
    <div
      id="companions"
      className="scroll-mt-4 flex h-full flex-col border-4 border-[#2D2A32] bg-[#B388FF] p-5"
      style={{ boxShadow: "6px 6px 0 #2D2A32" }}
    >
      <p className="mb-1 text-sm font-bold uppercase tracking-[0.2em] text-white/80">Never quest alone</p>
      <h3 className="text-2xl font-bold uppercase text-white">Meet your companion</h3>

      <div className="my-6 flex justify-center gap-6">
        {companions.map((companion) => (
          <div key={companion.name} className="w-28 text-center">
            <div className="overflow-hidden border-4 border-[#2D2A32] bg-[#FFF8E8] p-1 shadow-[3px_3px_0_#2D2A32]">
              <Image
                src={companion.image}
                alt={companion.alt}
                width={1254}
                height={1254}
                className={`pixel-art h-auto w-full ${companion.imageScale}`}
              />
            </div>
            <p className="mt-2 text-xl font-bold uppercase text-white">{companion.name}</p>
          </div>
        ))}
      </div>

      <div className="mt-auto flex items-center gap-3 border-4 border-[#2D2A32] bg-white p-3 shadow-[3px_3px_0_#2D2A32]">
        <Image
          src="/heart.png"
          alt=""
          aria-hidden="true"
          width={1254}
          height={1254}
          className="pixel-art h-8 w-8 shrink-0"
        />
        <p className="text-lg font-bold leading-relaxed text-[#2D2A32]/70">
          Pick the companion that vibes with you!
        </p>
      </div>
    </div>
  );
}
