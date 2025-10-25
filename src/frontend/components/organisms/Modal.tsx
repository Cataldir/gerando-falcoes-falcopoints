'use client';

import { ReactNode, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Button } from '@/components/atoms/Button';

interface ModalProps {
  open: boolean;
  title: string;
  children: ReactNode;
  onClose: () => void;
  primaryAction?: {
    label: string;
    onClick: () => void;
    disabled?: boolean;
  };
}

export const Modal = ({ open, title, children, onClose, primaryAction }: ModalProps) => {
  useEffect(() => {
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = original;
    };
  }, [open]);

  if (!open) return null;

  const portal = createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 px-4 py-8">
      <div className="flex max-w-xl flex-col gap-6 rounded-3xl bg-white p-6 shadow-2xl">
        <header className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-primary-dark">{title}</h2>
          </div>
          <Button variant="ghost" onClick={onClose} aria-label="Fechar modal">
            ✕
          </Button>
        </header>
        <div className="max-h-[60vh] overflow-y-auto pr-2 text-slate-700">{children}</div>
        {primaryAction ? (
          <div className="flex justify-end gap-3">
            <Button variant="ghost" onClick={onClose}>
              Cancelar
            </Button>
            <Button onClick={primaryAction.onClick} disabled={primaryAction.disabled}>
              {primaryAction.label}
            </Button>
          </div>
        ) : null}
      </div>
    </div>,
    document.body
  );

  // Casting ensures compatibility across React type versions while still returning the portal element.
  return portal as unknown as JSX.Element;
};
