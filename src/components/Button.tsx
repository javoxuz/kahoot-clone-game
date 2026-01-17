import React from 'react';
import { COLORS, BORDER_RADIUS, SHADOWS, SPACING } from '@/config/theme';
import clsx from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'success' | 'error' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', className, children, ...props }, ref) => {
    const baseStyles = 'font-semibold rounded transition-all duration-300 hover:shadow-lg active:scale-95 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed';

    const variantStyles: { [key: string]: string } = {
      primary: `bg-[${COLORS.primary}] text-white hover:shadow-lg`,
      secondary: `bg-[${COLORS.secondary}] text-white hover:shadow-lg`,
      success: `bg-[${COLORS.success}] text-white hover:shadow-lg`,
      error: `bg-[${COLORS.error}] text-white hover:shadow-lg`,
      outline: `border-2 border-[${COLORS.primary}] text-[${COLORS.primary}] bg-transparent hover:bg-[${COLORS.primary}] hover:text-white`,
    };

    const sizeStyles: { [key: string]: string } = {
      sm: 'px-3 py-2 text-sm',
      md: 'px-4 py-2.5 text-base',
      lg: 'px-6 py-3 text-lg',
    };

    return (
      <button
        ref={ref}
        className={clsx(baseStyles, variantStyles[variant], sizeStyles[size], className)}
        style={{
          backgroundColor: variant === 'primary' ? COLORS.primary : 
                          variant === 'secondary' ? COLORS.secondary :
                          variant === 'success' ? COLORS.success :
                          variant === 'error' ? COLORS.error :
                          'transparent',
          color: variant === 'outline' ? COLORS.primary : 'white',
          borderRadius: BORDER_RADIUS.md,
          borderWidth: variant === 'outline' ? 2 : 0,
          borderColor: variant === 'outline' ? COLORS.primary : undefined,
        }}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
