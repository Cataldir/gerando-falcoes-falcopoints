'use client';

import { ReactNode, SelectHTMLAttributes } from 'react';

interface SelectFieldProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  children?: ReactNode;
}

export const SelectField = (props: SelectFieldProps) => {
  const { label, children, ...rest } = props;
  return (
    <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
      <span>{label}</span>
      <select
        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2 shadow-sm transition focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/60"
        {...rest}
      >
        {children}
      </select>
    </label>
  );
};
