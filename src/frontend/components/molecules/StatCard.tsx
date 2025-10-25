import { ReactNode } from 'react';

interface StatCardProps {
  title: string;
  value: string;
  icon?: ReactNode;
  accent?: 'orange' | 'green' | 'red' | 'blue';
}

const accentMap: Record<NonNullable<StatCardProps['accent']>, string> = {
  blue: 'bg-primary/10 text-primary-dark',
  orange: 'bg-accent-orange/10 text-accent-orange',
  green: 'bg-accent-green/10 text-accent-green',
  red: 'bg-accent-red/10 text-accent-red'
};

export const StatCard = ({ title, value, icon, accent = 'blue' }: StatCardProps) => {
  return (
    <article className="flex flex-1 min-w-[180px] flex-col gap-3 rounded-2xl bg-white p-4 shadow-card">
      <header className="flex items-center justify-between">
  <h3 className="font-button text-sm font-semibold text-slate-600">{title}</h3>
        {icon ? <span className={`flex h-10 w-10 items-center justify-center rounded-full ${accentMap[accent]}`}>{icon}</span> : null}
      </header>
      <strong className="text-2xl font-bold text-slate-900">{value}</strong>
    </article>
  );
};
