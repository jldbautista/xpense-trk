const supportItems = [
  "Help Center",
  "Contact Us",
  "Privacy Policy",
  "Terms of Service",
] as const;

export default function SupportList() {
  return (
    <div className="flex flex-col gap-0.5 text-[#2D2A32]">
      <h4 className="mb-0.5 text-[11px] font-bold uppercase tracking-[0.12em]">Support</h4>
      {supportItems.map((item) => (
        <span key={item} className="text-[11px] font-bold">
          {item}
        </span>
      ))}
    </div>
  );
}
