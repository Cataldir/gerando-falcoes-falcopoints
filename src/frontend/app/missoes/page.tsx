'use client';

import { useState } from 'react';
import Link from 'next/link';
import { PageShell } from '@/components/templates/PageShell';
import { badges, missions, mockUser } from '@/utilities/mockData';
import { Mission } from '@/types/mission';
import { Badge } from '@/types/badge';
import { BadgeCard } from '@/components/molecules/BadgeCard';
import { Modal } from '@/components/organisms/Modal';
import { Button } from '@/components/atoms/Button';
import { getFacebookShareLink, getLinkedInShareLink } from '@/utilities/share';
import { FiFacebook, FiLinkedin } from 'react-icons/fi';

export default function MissoesPage() {
  const [selectedBadge, setSelectedBadge] = useState<Badge | null>(null);
  const [selectedBadgeMissions, setSelectedBadgeMissions] = useState<Mission[]>([]);
  const [selectedMission, setSelectedMission] = useState<Mission | null>(null);

  const missionsPerGroup = Math.max(Math.ceil(missions.length / badges.length), 1);
  const missionsByBadge = badges.map((_, index) =>
    missions.slice(index * missionsPerGroup, index * missionsPerGroup + missionsPerGroup)
  );

  const achievedBadges = badges.filter((badge) => mockUser.points >= badge.threshold);

  const handleBadgeSelect = (badge: Badge, badgeIndex: number) => {
    setSelectedBadge(badge);
    setSelectedBadgeMissions(missionsByBadge[badgeIndex] ?? []);
  };

  const closeBadgeModal = () => {
    setSelectedBadge(null);
    setSelectedBadgeMissions([]);
  };

  const handleMissionFromBadge = (mission: Mission) => {
    closeBadgeModal();
    setSelectedMission(mission);
  };

  const shareMessage = selectedBadge
    ? `Já conquistei a badge ${selectedBadge.name} no FalcoPoints apoiando campanhas sociais! Vem comigo: https://gerandofalcoes.portaldoadoor.org`
    : '';

  return (
    <PageShell
      title="Missões e conquistas"
      subtitle="Complete missões, desbloqueie badges e compartilhe o seu impacto"
      actions={
        <Link href="/catalogo-de-premios">
          <Button variant="secondary">Ver catálogo de prêmios</Button>
        </Link>
      }
    >
      <section className="flex flex-col gap-6">
        <div className="grid gap-6 lg:grid-cols-2">
          {badges.map((badge, index) => {
            const missionGroup = missionsByBadge[index] ?? [];
            const unlocked = mockUser.points >= badge.threshold;

            return (
              <div
                key={badge.id}
                className="rounded-3xl bg-gradient-to-br from-primary via-primary/90 to-accent-orange/85 p-[1px] shadow-card"
              >
                <div className="flex flex-col gap-4 rounded-[calc(1.5rem-1px)] bg-white p-6">
                  <BadgeCard badge={badge} unlocked={unlocked} onClick={() => handleBadgeSelect(badge, index)} />
                  <div className="flex items-center justify-between rounded-2xl bg-slate-100 px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    <span>{missionGroup.length ? `${missionGroup.length} missão(ões) relacionadas` : 'Missões em breve'}</span>
                    <button
                      type="button"
                      onClick={() => handleBadgeSelect(badge, index)}
                      className="rounded-full bg-primary/10 px-3 py-1 text-primary transition hover:bg-primary/20"
                    >
                      Ver detalhes
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
      <Modal
        open={Boolean(selectedBadge)}
        onClose={closeBadgeModal}
        title={selectedBadge ? selectedBadge.name : 'Detalhes da badge'}
      >
        {selectedBadge
          ? (() => {
              const Icon = selectedBadge.icon;
              return (
                <div className="flex flex-col gap-5 text-sm text-slate-700">
                  <div className="flex items-center gap-4">
                    <span
                      className="flex h-14 w-14 items-center justify-center rounded-full border-4 bg-white"
                      style={{
                        borderColor: selectedBadge.color,
                        backgroundColor: `${selectedBadge.color}1A`,
                        color: selectedBadge.color
                      }}
                    >
                      <Icon size={28} />
                    </span>
                    <div className="flex flex-col gap-1">
                      <p className="font-semibold text-slate-900">
                        Necessário acumular {selectedBadge.threshold} pontos
                      </p>
                      <p>{selectedBadge.description}</p>
                    </div>
                  </div>

                  {selectedBadgeMissions.length ? (
                    <div className="flex flex-col gap-3">
                      <p className="font-semibold text-slate-900">Missões que ajudam a conquistar</p>
                      <ul className="flex flex-col gap-2">
                        {selectedBadgeMissions.map((mission) => (
                          <li
                            key={mission.id}
                            className="flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-slate-100 px-4 py-3"
                          >
                            <div>
                              <p className="font-semibold text-slate-800">{mission.title}</p>
                              <span className="text-xs text-slate-500">+{mission.points} pts</span>
                            </div>
                            <Button
                              type="button"
                              variant="ghost"
                              className="text-primary hover:bg-primary/10 focus-visible:ring-primary"
                              onClick={() => handleMissionFromBadge(mission)}
                            >
                              Ver detalhes
                            </Button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}

                  <div className="flex flex-col gap-3 rounded-2xl bg-slate-100 p-4 text-xs sm:text-sm">
                    <p className="text-slate-600">
                      Compartilhe seu progresso nas redes sociais e inspire mais pessoas a voarem com você.
                    </p>
                    <div className="flex gap-3">
                      <Button
                        type="button"
                        variant="primaryBlue"
                        onClick={() => window.open(getFacebookShareLink(shareMessage), '_blank')}
                        className="flex items-center justify-center gap-2"
                      >
                        <span>Compartilhar no</span>
                        <FiFacebook className="h-5 w-5" aria-hidden="true" />
                      </Button>
                      <Button
                        type="button"
                        variant="primaryBlue"
                        className="flex items-center justify-center gap-2"
                        onClick={() => window.open(getLinkedInShareLink(shareMessage), '_blank')}
                      >
                        <span>Compartilhar no</span>
                        <FiLinkedin className="h-5 w-5" aria-hidden="true" />
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })()
          : null}
      </Modal>
      <Modal
        open={Boolean(selectedMission)}
        onClose={() => setSelectedMission(null)}
        title={selectedMission ? selectedMission.title : 'Missão FalcoPoints'}
        primaryAction={
          selectedMission
            ? {
                label: selectedMission.achieved ? 'Missão concluída' : 'Marcar como concluída',
                onClick: () => setSelectedMission(null)
              }
            : undefined
        }
      >
        {selectedMission ? (
          <div className="flex flex-col gap-3 text-sm text-slate-700">
            <p>{selectedMission.description}</p>
            <p className="font-semibold text-accent-orange">Recompensa: +{selectedMission.points} pontos</p>
            <p className="text-slate-500">
              Complete esta missão e acompanhe seu progresso no painel inicial. Missões concluídas são validadas em
              até 24h.
            </p>
          </div>
        ) : null}
      </Modal>
    </PageShell>
  );
}
