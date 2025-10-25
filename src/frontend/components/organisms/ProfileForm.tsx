'use client';

import { ChangeEvent, useEffect, useMemo, useState } from 'react';
import { TextField } from '@/components/atoms/TextField';
import { UserProfile } from '@/types/user';
import { levelBenefits, mockUser } from '@/utilities/mockData';

interface ProfileFormProps {
  user?: UserProfile;
}

type FormState = Pick<UserProfile, 'name' | 'email' | 'cpf' | 'phone'>;

export const ProfileForm = ({ user }: ProfileFormProps) => {
  const initialData = useMemo<FormState>(() => ({
    name: user?.name ?? mockUser.name,
    email: user?.email ?? mockUser.email,
    cpf: user?.cpf ?? mockUser.cpf,
    phone: user?.phone ?? mockUser.phone
  }), [user]);

  const [formData, setFormData] = useState<FormState>(initialData);
  const [status, setStatus] = useState<'idle' | 'saving' | 'saved'>('idle');

  useEffect(() => {
    setFormData(initialData);
  }, [initialData]);

  useEffect(() => {
    if (status !== 'saving') return;
    const timer = setTimeout(() => setStatus('saved'), 600);
    return () => clearTimeout(timer);
  }, [status]);

  const handleChange = (field: keyof FormState) => (event: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev: FormState) => ({ ...prev, [field]: event.target.value }));
    setStatus('saving');
  };

  const benefits = levelBenefits[user?.level ?? mockUser.level];

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[2fr_1fr]">
      <div className="flex flex-col gap-6 rounded-3xl bg-white p-6 shadow-card">
        <header className="flex items-center justify-between">
          <h2 className="font-button text-xl font-bold text-primary-dark">Editar dados</h2>
          <span className={`text-sm font-semibold ${status === 'saving' ? 'text-accent-orange' : 'text-accent-green'}`}>
            {status === 'idle' ? 'Atualizado' : status === 'saving' ? 'Salvando...' : 'Salvo' }
          </span>
        </header>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <TextField label="Nome" value={formData.name} onChange={handleChange('name')} />
          <TextField label="Email" type="email" value={formData.email} onChange={handleChange('email')} />
          <TextField label="CPF" value={formData.cpf} onChange={handleChange('cpf')} />
          <TextField label="Telefone" value={formData.phone} onChange={handleChange('phone')} />
        </div>
      </div>
      <aside className="flex flex-col gap-6">
        <section className="rounded-3xl bg-gradient-to-br from-primary to-primary-dark p-6 text-white shadow-card">
          <h3 className="font-button text-lg font-semibold text-white">Layer atual</h3>
          <span className="mt-2 inline-flex w-fit rounded-full bg-white/20 px-4 py-1 text-sm font-bold uppercase tracking-wide">
            {user?.level ?? mockUser.level}
          </span>
          <ul className="mt-4 flex flex-col gap-2 text-sm">
            {benefits.map((benefit) => (
              <li key={benefit} className="flex items-center gap-2 text-white/90">
                <span className="text-accent-orange">★</span>
                {benefit}
              </li>
            ))}
          </ul>
        </section>
      </aside>
    </div>
  );
};
