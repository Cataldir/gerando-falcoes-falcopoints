import type { Metadata } from 'next';
import { ReactNode } from 'react';
import './globals.css';
import { Sidebar } from '@/components/organisms/Sidebar';

export const metadata: Metadata = {
  title: 'FalcoPoints',
  description: 'Programa de benefícios FalcoPoints'
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <div className="flex min-h-screen w-full bg-slate-100">
          <Sidebar />
          <main className="flex-1 overflow-y-auto px-10 py-8">
            <div className="mx-auto flex max-w-6xl flex-col gap-10">
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}
