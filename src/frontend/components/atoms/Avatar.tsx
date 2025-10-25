import Image from 'next/image';

interface AvatarProps {
  src: string;
  alt: string;
  size?: number;
  glowColor?: string;
}

export const Avatar = ({ src, alt, size = 64, glowColor }: AvatarProps) => {
  const glowStyle = glowColor
    ? {
        boxShadow: `0 0 0 4px #ffffff, 0 0 0 12px ${glowColor}33, 0 18px 40px ${glowColor}55`,
        backgroundColor: `${glowColor}26`
      }
    : undefined;

  return (
    <div
      className="relative flex h-fit w-fit items-center justify-center overflow-hidden rounded-3xl shadow-card"
      style={glowStyle}
    >
      <Image src={src} alt={alt} width={size} height={size} className="rounded-2xl object-cover" />
    </div>
  );
};
