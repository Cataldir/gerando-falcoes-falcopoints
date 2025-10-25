'use client';

import { ChangeEvent, FormEvent, useState } from 'react';
import { FiCopy } from 'react-icons/fi';
import { PageShell } from '@/components/templates/PageShell';
import { Button } from '@/components/atoms/Button';
import { SelectField } from '@/components/atoms/SelectField';
import { TextField } from '@/components/atoms/TextField';
import { mockUser } from '@/utilities/mockData';
import { generateReferralLink } from '@/utilities/referral';

export default function ContribuaAgoraPage() {
  const [referralLink, setReferralLink] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  type ContributionFormState = { periodicity: string; value: string };
  const [formData, setFormData] = useState<ContributionFormState>({ periodicity: 'mensal', value: '' });

  const handleGenerateLink = () => {
    const link = generateReferralLink(mockUser.username);
    setReferralLink(link);
    setMessage('Link gerado! Compartilhe com amigas(os) para ganhar pontos.');
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!formData.value) {
      setMessage('Informe um valor para contribuir.');
      return;
    }
    setMessage(`Contribuição ${formData.periodicity} salva! Obrigado por impulsionar o FalcoPoints.`);
    setFormData((prev: ContributionFormState) => ({ ...prev, value: '' }));
  };

  const handlePeriodicityChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setFormData((prev: ContributionFormState) => ({ ...prev, periodicity: event.target.value }));
  };

  const handleValueChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev: ContributionFormState) => ({ ...prev, value: event.target.value }));
  };

  const handleCopyLink = async () => {
    if (!referralLink) return;
    try {
      await navigator.clipboard.writeText(referralLink);
      setMessage('Link copiado! Cole onde quiser compartilhar.');
    } catch (error) {
      setMessage('Não foi possível copiar automaticamente. Copie manualmente por favor.');
    }
  };

  return (
    <PageShell
      title="Contribua agora"
      subtitle="Aumente o impacto com doações recorrentes ou pontuais"
      actions={
        <Button variant="secondary" onClick={handleGenerateLink}>
          Gerar link de indicação
        </Button>
      }
    >
      {referralLink ? (
        <div className="flex flex-wrap items-center gap-4 rounded-3xl border border-primary/30 bg-primary/10 p-4 text-sm text-primary-dark">
          <Button type="button" variant="secondary" size="sm" onClick={handleCopyLink} className="flex items-center gap-2">
            <FiCopy aria-hidden className="text-lg" />
            Copiar link
          </Button>
          <div className="min-w-0 flex-1">
            <p className="font-semibold">Seu link personalizado</p>
            <p className="break-all text-xs text-primary-dark/80">{referralLink}</p>
          </div>
        </div>
      ) : null}
      <form onSubmit={handleSubmit} className="flex flex-col gap-6 rounded-3xl bg-white p-6 shadow-card">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <SelectField label="Periodicidade" value={formData.periodicity} onChange={handlePeriodicityChange}>
            <option value="quinzenal">Quinzenal</option>
            <option value="mensal">Mensal</option>
            <option value="unico">Único</option>
          </SelectField>
          <TextField
            label="Valor da contribuição"
            type="number"
            min="10"
            step="10"
            value={formData.value}
            placeholder="Ex: 50"
            onChange={handleValueChange}
            hint="Valores acima de R$ 50 geram pontos em dobro"
          />
        </div>
        <Button type="submit" size="lg" className="self-start">
          Contribua agora
        </Button>
        {message ? <p className="text-sm text-accent-green">{message}</p> : null}
      </form>
    </PageShell>
  );
}
