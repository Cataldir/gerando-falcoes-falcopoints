'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Avatar } from '@/components/atoms/Avatar';
import { levelColors, mockUser } from '@/utilities/mockData';

const NAV_ITEMS = [
  { label: 'Programa', href: '/' },
  { label: 'Contribua Agora', href: '/contribua-agora' },
  { label: 'Missões', href: '/missoes' },
  { label: 'Catálogo de prêmios', href: '/catalogo-de-premios' },
  { label: 'Perfil', href: '/perfil' }
];

export const Sidebar = () => {
  const pathname = usePathname();

  return (
  <aside className="flex w-72 flex-col gap-8 bg-[radial-gradient(circle_at_top_left,_rgba(145,86,222,0.35),_transparent_55%),_radial-gradient(circle_at_bottom_right,_rgba(103,45,184,0.45),_transparent_55%),_linear-gradient(to_bottom,_#6d31a2,_#4b1d85)] px-8 pb-8 text-white shadow-card">
      <div className="flex flex-col items-center gap-3 text-center">
        <Image src="/images/logo.png" alt="FalcoPoints" width={224} height={224} priority className="w-full pb-10 pt-5" />
        <Avatar src={mockUser.avatarUrl} alt={mockUser.name} size={92} glowColor={levelColors[mockUser.level]} />
        <div className="flex flex-col gap-1">
          <span className="text-lg font-bold pt-5">{mockUser.name}</span>
          <Link href="/perfil" className="text-sm text-white hover:underline">
            @{mockUser.username}
          </Link>
        </div>
      </div>
      <nav className="flex flex-1 flex-col gap-2">
        {NAV_ITEMS.map((item) => {
          const active = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition ${
                active ? 'bg-white/20 text-white shadow-lg' : 'text-white/80 hover:bg-white/10'
              }`}
            >
              <span className="h-3 w-3 rounded-full bg-accent-orange" />
              {item.label}
            </Link>
          );
        })}
      </nav>
      <footer className="text-xs text-white/70">
        FalcoPoints © {new Date().getFullYear()}
      </footer>
    </aside>
  );
};
