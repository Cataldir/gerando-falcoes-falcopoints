import { PointsHistoryItem } from '@/types/history';
import { formatPoints } from '@/utilities/formatters';

interface HistoryListProps {
  items: PointsHistoryItem[];
}

export const HistoryList = ({ items }: HistoryListProps) => {
  return (
    <ul className="flex flex-col gap-3">
      {items.map((item) => (
        <li
          key={item.id}
          className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700"
        >
          <div className="flex flex-col">
            <span>{item.action}</span>
            <span className="text-xs text-slate-500">{new Date(item.date).toLocaleDateString('pt-BR')}</span>
          </div>
          <span className={item.type === 'earn' ? 'text-accent-green' : 'text-accent-red'}>
            {formatPoints(item.points)}
          </span>
        </li>
      ))}
    </ul>
  );
};
