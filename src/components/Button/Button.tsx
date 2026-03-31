import type { ButtonHTMLAttributes, PropsWithChildren } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost';
}

export function Button({ children, className = '', variant = 'primary', ...rest }: PropsWithChildren<ButtonProps>) {
  const baseClasses =
    'inline-flex items-center justify-center rounded-2xl px-5 py-2.5 text-sm font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 shadow-sm hover:shadow-md active:scale-[0.97] disabled:opacity-50 disabled:cursor-not-allowed';
  const variants = {
    primary: 'bg-primary text-white hover:bg-teal-700 focus:ring-primary',
    outline: 'border-2 border-primary text-primary hover:bg-primary/10 focus:ring-primary',
    ghost: 'focus:ring-slate-400',
  };

  return (
    <button className={`${baseClasses} ${variants[variant]} ${className}`} {...rest}>
      {children}
    </button>
  );
}
