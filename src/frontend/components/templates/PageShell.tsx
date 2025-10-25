"use client";

import { ReactNode, useState } from 'react';
import Image from 'next/image';
import { Modal } from '@/components/organisms/Modal';

interface PageShellProps {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
  children: ReactNode;
}

export const PageShell = ({ title, subtitle, actions, children }: PageShellProps) => {
  const [isCopilotOpen, setIsCopilotOpen] = useState(false);

  return (
    <section className="flex w-full flex-col gap-6">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-black text-primary-dark">{title}</h1>
          {subtitle ? <p className="text-sm text-slate-600">{subtitle}</p> : null}
        </div>
        {actions ? <div className="flex items-center gap-3">{actions}</div> : null}
      </header>
      {children}

      <button
        type="button"
        onClick={() => setIsCopilotOpen(true)}
        className="fixed bottom-6 right-6 z-50 rounded-full bg-primary p-4 text-white shadow-2xl transition hover:bg-primary-dark focus:outline-none focus-visible:ring-4 focus-visible:ring-primary/40"
        aria-label="Abrir assistente Copilot"
      >
        <Image src="/images/copilot.png" alt="" width={36} height={36} className="h-9 w-9" priority />
      </button>

      <Modal open={isCopilotOpen} onClose={() => setIsCopilotOpen(false)} title="Assistente Copilot">
        <div className="h-[70vh] w-full">
          <iframe
            src="https://copilotstudio.microsoft.com/environments/Default-3902f6d9-c402-4e4f-aa94-4717b7444a1c/bots/crbf8_agent/webchat?__version__=2%22"
            style={{ width: '100%', height: '100%' }}
            title="Copilot Webchat"
          />
        </div>
      </Modal>
    </section>
  );
};
