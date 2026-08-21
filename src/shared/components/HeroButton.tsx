import React from 'react';
import { soundService } from '../../core/services/soundService';

interface HeroButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  children: React.ReactNode;
}

export const HeroButton: React.FC<HeroButtonProps> = ({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className = '',
  onClick,
  children,
  ...props
}) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    soundService.playClickSound();
    if (onClick) onClick(e);
  };
  const baseClasses = 'inline-flex items-center justify-center font-heading font-bold rounded-xl transition-all duration-200 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]';

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-xs gap-1.5',
    md: 'px-5 py-2.5 text-sm gap-2',
    lg: 'px-6 py-3.5 text-base gap-2.5'
  };

  const variantClasses = {
    primary: 'bg-gradient-to-r from-[#00E5FF] to-[#00B0FF] text-slate-950 hover:shadow-[0_0_20px_rgba(0,229,255,0.4)] border border-[#00E5FF]/40',
    secondary: 'bg-[#121826] text-slate-100 border border-slate-700/60 hover:border-[#00E5FF]/50 hover:bg-[#1a2337]',
    accent: 'bg-gradient-to-r from-[#FF2A54] to-[#E60039] text-white hover:shadow-[0_0_20px_rgba(255,42,84,0.4)] border border-[#FF2A54]/40',
    danger: 'bg-red-500/10 text-red-400 border border-red-500/30 hover:bg-red-500/20',
    ghost: 'bg-transparent text-slate-300 hover:text-white hover:bg-white/5'
  };

  const widthClass = fullWidth ? 'w-full' : '';

  return (
    <button
      onClick={handleClick}
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${widthClass} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
