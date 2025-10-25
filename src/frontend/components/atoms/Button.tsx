import { ButtonHTMLAttributes, PropsWithChildren } from 'react';
import clsx from 'clsx';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'primaryBlue';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

const baseStyles = 'rounded-xl font-semibold font-button transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2';

const sizeClasses: Record<NonNullable<ButtonProps['size']>, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg'
};

const variantClasses: Record<NonNullable<ButtonProps['variant']>, string> = {
  primary: 'bg-button text-white hover:bg-button-hover focus-visible:ring-button',
  secondary: 'border-2 border-button text-button hover:bg-button/10 focus-visible:ring-button',
  ghost: 'bg-transparent text-primary hover:bg-primary/10 focus-visible:ring-primary',
  primaryBlue: 'bg-primary text-white hover:bg-primary-dark focus-visible:ring-primary'
};

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth,
  className,
  ...props
}: PropsWithChildren<ButtonProps>) => {
  return (
    <button
      className={clsx(baseStyles, sizeClasses[size], variantClasses[variant], fullWidth && 'w-full', className)}
      {...props}
    >
      {children}
    </button>
  );
};
