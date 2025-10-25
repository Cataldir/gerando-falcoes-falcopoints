'use client';

import { useState } from 'react';
import { PageShell } from '@/components/templates/PageShell';
import { RewardCard } from '@/components/molecules/RewardCard';
import { Modal } from '@/components/organisms/Modal';
import { rewards, mockUser } from '@/utilities/mockData';
import { Reward } from '@/types/reward';
import { formatPoints } from '@/utilities/formatters';

export default function CatalogoDePremiosPage() {
  const [selectedReward, setSelectedReward] = useState<Reward | null>(null);

  const handleRedeemClick = (reward: Reward) => {
    setSelectedReward(reward);
  };

  const handleConfirmRedeem = () => {
    setSelectedReward(null);
  };

  return (
    <PageShell
      title="Catálogo de prêmios"
      subtitle="Transforme seus pontos em experiências e itens exclusivos"
    >
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {rewards.map((reward) => (
          <RewardCard
            key={reward.id}
            reward={reward}
            onRedeem={handleRedeemClick}
            disabled={reward.pointsRequired > mockUser.points}
          />
        ))}
      </div>
      <Modal
        open={Boolean(selectedReward)}
        onClose={() => setSelectedReward(null)}
        title={selectedReward ? `Resgatar ${selectedReward.name}` : 'Resgatar prêmio'}
        primaryAction={
          selectedReward
            ? {
                label: 'Confirmar resgate',
                onClick: handleConfirmRedeem,
                disabled: selectedReward.pointsRequired > mockUser.points
              }
            : undefined
        }
      >
        {selectedReward ? (
          <div className="flex flex-col gap-4 text-sm">
            <p>{selectedReward.description}</p>
            <div className="rounded-2xl bg-slate-100 p-4">
              <div className="flex justify-between font-semibold">
                <span>Pontos necessários</span>
                <span>{formatPoints(selectedReward.pointsRequired)}</span>
              </div>
              <div className="mt-2 flex justify-between text-sm text-slate-600">
                <span>Seu saldo atual</span>
                <span>{formatPoints(mockUser.points)}</span>
              </div>
              <div className="mt-2 flex justify-between text-sm text-accent-green">
                <span>Pontos após resgate</span>
                <span>{formatPoints(mockUser.points - selectedReward.pointsRequired)}</span>
              </div>
            </div>
          </div>
        ) : null}
      </Modal>
    </PageShell>
  );
}
