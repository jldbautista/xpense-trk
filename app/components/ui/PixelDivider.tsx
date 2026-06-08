interface PixelDividerProps {
  label?: string;
}

export default function PixelDivider({ label = 'OR' }: PixelDividerProps) {
  return (
    <div className="flex items-center gap-3 my-2" role="separator">
      <div className="flex-1 border-t-4 border-[#2D2A32]" />
      <span className="text-sm font-bold text-[#2D2A32] tracking-widest">{label}</span>
      <div className="flex-1 border-t-4 border-[#2D2A32]" />
    </div>
  );
}
