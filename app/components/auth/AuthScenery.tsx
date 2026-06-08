import Image from 'next/image';

export default function AuthScenery() {
  return (
    <Image
      src="/background-clouds-sparkles.png"
      alt=""
      fill
      priority
      sizes="100vw"
      aria-hidden="true"
      className="pixel-art object-cover object-center"
    />
  );
}
