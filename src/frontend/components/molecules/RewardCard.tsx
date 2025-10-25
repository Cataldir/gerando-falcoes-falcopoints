'use client';

import Image from 'next/image';
import { Reward } from '@/types/reward';
import { formatPoints } from '@/utilities/formatters';
import { Button } from '@/components/atoms/Button';

interface RewardCardProps {
  reward: Reward;
  onRedeem: (reward: Reward) => void;
  disabled?: boolean;
}

export const RewardCard = ({ reward, onRedeem, disabled }: RewardCardProps) => {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-card transition hover:-translate-y-1 hover:shadow-xl">
      <div className="relative h-44 w-full">
        <Image src={reward.imageUrl} alt={reward.name} fill className="object-cover" />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <header className="flex flex-col gap-1">
          <h3 className="font-button text-lg font-bold text-primary-dark">{reward.name}</h3>
          <p className="text-sm text-slate-600">{reward.description}</p>
        </header>
        <span className="text-sm font-semibold text-accent-green">{formatPoints(reward.pointsRequired)}</span>
        <Button
          type="button"
          disabled={disabled}
          onClick={() => onRedeem(reward)}
          className="mt-auto"
        >
          {disabled ? 'Pontos insuficientes' : 'Resgatar' }
        </Button>
      </div>
    </article>
  );
};
