'use client';

import { Badge } from '@/types/badge';

interface BadgeCardProps {
  badge: Badge;
  unlocked: boolean;
  onClick: (badge: Badge) => void;
}

export const BadgeCard = ({ badge, unlocked, onClick }: BadgeCardProps) => {
  const Icon = badge.icon;
  const iconBorderColor = unlocked ? badge.color : 'rgba(255, 255, 255, 0.45)';
  const iconBackground = unlocked ? `${badge.color}1A` : 'rgba(255, 255, 255, 0.18)';
  const iconColor = unlocked ? badge.color : 'rgba(255, 255, 255, 0.18)';

  return (
    <button
      type="button"
      onClick={() => onClick(badge)}
      className={`group flex min-h-[220px] w-full flex-col items-center justify-center gap-4 rounded-3xl px-8 py-6 text-center transition hover:-translate-y-1 hover:shadow-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
        unlocked
          ? 'bg-white text-primary-dark shadow-card focus-visible:ring-primary'
          : 'border border-black/40 bg-black/10 text-black focus-visible:ring-black/70'
      }`}
    >
      <span
        className="flex h-20 w-20 items-center justify-center rounded-full border-4 bg-white/20 text-4xl transition group-hover:scale-105"
        style={
          {
            borderColor: iconBorderColor,
            backgroundColor: iconBackground,
            color: iconColor
          }
        }
      >
        <Icon size={36} />
      </span>
      <span className="font-button text-lg font-semibold leading-tight">{badge.name}</span>
      <span className={`text-xs font-semibold uppercase tracking-wide ${unlocked ? 'text-accent-green' : 'text-black/50'}`}>
        {unlocked ? 'Badge desbloqueada' : 'Clique para saber mais'}
      </span>
    </button>
  );
};
