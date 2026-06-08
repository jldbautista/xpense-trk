import Image from "next/image";

const features = [
  {
    icon: "/trophy.png",
    alt: "Trophy icon",
    heading: "TRACK",
    desc: "Log expenses quickly and keep every purchase in one place.",
    color: "#E76F51",
  },
  {
    icon: "/piggy-bank.png",
    alt: "Piggy bank icon",
    heading: "BUDGET",
    desc: "Set a monthly spending limit and see how much room is left.",
    color: "#5D9CEC",
  },
  {
    icon: "/star.png",
    alt: "Gold star icon",
    heading: "CHECK IN",
    desc: "Watch your Pixel Cat mood change as your budget gets used.",
    color: "#B388FF",
  },
  {
    icon: "/fire.png",
    alt: "Fire icon",
    heading: "REVIEW",
    desc: "Scan your totals, transactions, and top category at a glance.",
    color: "#5BAE4A",
  },
] as const;

export default function FeatureStrip() {
  return (
    <div className="pixel-card h-full p-5 sm:p-6">
      <div className="grid h-full gap-0 sm:grid-cols-2 xl:grid-cols-4">
        {features.map(({ icon, alt, heading, desc, color }, index) => (
          <div
            key={heading}
            className={`flex flex-col items-start px-2 py-5 first:pt-1 last:pb-1 sm:px-5 sm:first:pt-5 sm:last:pb-5 ${
              index > 0 ? "border-t-4 border-[#2D2A32] sm:border-t-0" : ""
            } ${index % 2 === 1 ? "sm:border-l-4" : ""} ${
              index > 1 ? "xl:border-l-4 xl:border-t-0" : ""
            }`}
          >
            <div
              className="mb-4 flex h-20 w-20 items-center justify-center border-4 border-[#2D2A32] shadow-[4px_4px_0_#2D2A32]"
              style={{ backgroundColor: color }}
            >
              <Image src={icon} alt={alt} width={1254} height={1254} className="pixel-art h-16 w-16" />
            </div>
            <h3 className="mb-2 text-2xl font-bold tracking-wide text-[#2D2A32]">{heading}</h3>
            <p className="text-lg font-bold leading-relaxed text-[#2D2A32]/65">{desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
