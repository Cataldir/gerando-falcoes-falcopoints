'use client';

import { Avatar } from '@/components/atoms/Avatar';
import { PageShell } from '@/components/templates/PageShell';
import { ProfileForm } from '@/components/organisms/ProfileForm';
import { badges, levelColors, mockUser } from '@/utilities/mockData';
import { BadgeCard } from '@/components/molecules/BadgeCard';
import { useState } from 'react';
import { Badge } from '@/types/badge';
import { Modal } from '@/components/organisms/Modal';

export default function PerfilPage() {
  const [selectedBadge, setSelectedBadge] = useState<Badge | null>(null);

  return (
    <PageShell
      title="Perfil do doador"
      subtitle="Atualize suas informações e acompanhe suas camadas de impacto"
    >
      <section className="flex flex-col gap-6 rounded-3xl bg-white p-6 shadow-card">
        <div className="flex flex-wrap items-center gap-6">
          <Avatar
            src={mockUser.avatarUrl}
            alt={mockUser.name}
            size={120}
            glowColor={levelColors[mockUser.level]}
          />
          <div className="flex flex-col gap-1">
            <span className="text-sm font-semibold text-slate-500">Perfil</span>
            <h2 className="text-2xl font-bold text-primary-dark">{mockUser.name}</h2>
            <span className="text-sm text-accent-orange">@{mockUser.username}</span>
          </div>
        </div>
          <ProfileForm user={mockUser} />
        <div className="flex flex-col gap-2">
          <span className="text-sm font-semibold text-slate-600">Badges recentes</span>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {badges.map((badge) => (
              <BadgeCard
                key={badge.id}
                badge={badge}
                unlocked={mockUser.points >= badge.threshold}
                onClick={setSelectedBadge}
              />
            ))}
          </div>
        </div>
      </section>
      <Modal
        open={Boolean(selectedBadge)}
        onClose={() => setSelectedBadge(null)}
        title={selectedBadge ? selectedBadge.name : 'Badge FalcoPoints'}
        primaryAction={
          selectedBadge
            ? {
                label: 'Compartilhar no LinkedIn',
                onClick: () => setSelectedBadge(null)
              }
            : undefined
        }
      >
        {selectedBadge ? (
          <div className="flex flex-col gap-4 text-sm">
            <p>{selectedBadge.description}</p>
            <p className="text-slate-600">
              Compartilhe seu progresso nas redes sociais. Você pode copiar esta mensagem:
            </p>
            <div className="rounded-2xl bg-slate-100 p-4 text-xs text-slate-700">
              <p>
                {`Sou ${mockUser.name}, nível ${selectedBadge.name} no FalcoPoints! Já conquistei ${mockUser.points} pontos apoiando campanhas que transformam a favela. Vem voar junto comigo?`}
              </p>
            </div>
          </div>
        ) : null}
      </Modal>
    </PageShell>
  );
}
