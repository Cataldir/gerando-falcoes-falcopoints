'use client';

import Link from 'next/link';
import { useState } from 'react';
import { PageShell } from '@/components/templates/PageShell';
import { StatCard } from '@/components/molecules/StatCard';
import { Button } from '@/components/atoms/Button';
import { CampaignSlider } from '@/components/organisms/CampaignSlider';
import { Modal } from '@/components/organisms/Modal';
import { HistoryList } from '@/components/molecules/HistoryList';
import { campaigns, mockUser, pointsHistory } from '@/utilities/mockData';
import { formatCurrency, formatPoints } from '@/utilities/formatters';

export default function HomePage() {
  const [historyOpen, setHistoryOpen] = useState(false);

  return (
    <PageShell
      title="FalcoPoints"
      subtitle="Acompanhe seus pontos, resgates e campanhas em destaque"
      actions={
        <div className="flex gap-3">
          <Button variant="ghost" onClick={() => setHistoryOpen(true)}>
            Ver histórico
          </Button>
          <Link href="/contribua-agora">
            <Button>Contribua agora</Button>
          </Link>
        </div>
      }
    >
      <section className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <StatCard title="Pontos" value={formatPoints(mockUser.points)} accent="blue" />
        <StatCard title="Total doado" value={formatCurrency(mockUser.totalDonated)} accent="orange" />
        <StatCard title="Pontos resgatados" value={formatPoints(mockUser.totalRedeemed)} accent="green" />
      </section>
      <CampaignSlider campaigns={campaigns} />
      <Modal title="Histórico de Pontos" open={historyOpen} onClose={() => setHistoryOpen(false)}>
        <HistoryList items={pointsHistory} />
      </Modal>
    </PageShell>
  );
}
