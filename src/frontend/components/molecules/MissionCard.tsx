'use client';

import { Mission } from '@/types/mission';

interface MissionCardProps {
  mission: Mission;
  onClick: (mission: Mission) => void;
}

export const MissionCard = ({ mission, onClick }: MissionCardProps) => {
  return (
    <button
      type="button"
      onClick={() => onClick(mission)}
      className={`flex h-40 flex-col justify-between rounded-3xl border-2 px-6 py-5 text-left shadow-lg transition hover:-translate-y-1 hover:shadow-xl ${
        mission.achieved ? 'border-accent-green bg-white text-primary-dark' : 'border-primary/40 bg-primary/5 text-primary-dark'
      }`}
    >
      <span className="text-2xl">◆</span>
      <div className="flex flex-col gap-1">
        <h3 className="font-button text-base font-bold text-primary-dark">{mission.title}</h3>
        <p className="text-sm text-slate-600">{mission.description}</p>
        <span className="text-xs font-semibold text-accent-orange">+{mission.points} pts</span>
      </div>
    </button>
  );
};
