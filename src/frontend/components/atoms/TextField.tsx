'use client';

import { InputHTMLAttributes, FC } from 'react';
import clsx from 'clsx';

export interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  hint?: string;
}

export const TextField = (props: TextFieldProps) => {
  const { label, hint, className, ...rest } = props;
  return (
    <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
      <span>{label}</span>
      <input
        className={clsx(
          'w-full rounded-xl border border-slate-200 bg-white px-4 py-2 shadow-sm transition focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/60',
          className
        )}
        {...rest}
      />
      {hint ? <span className="text-xs font-normal text-slate-500">{hint}</span> : null}
    </label>
  );
};
