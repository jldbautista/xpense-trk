import Image from "next/image";
import type { CSSProperties } from "react";

interface PixelImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  decorative?: boolean;
  style?: CSSProperties;
}

export default function PixelImage({
  src,
  alt,
  width,
  height,
  className = "",
  decorative = false,
  style,
}: PixelImageProps) {
  return (
    <Image
      src={src}
      alt={decorative ? "" : alt}
      aria-hidden={decorative ? "true" : undefined}
      width={width}
      height={height}
      className={className}
      style={{ imageRendering: "pixelated", ...style }}
    />
  );
}
