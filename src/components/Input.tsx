import React from 'react';
import { COLORS, BORDER_RADIUS, SPACING } from '@/config/theme';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = '', ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label
            style={{
              display: 'block',
              marginBottom: SPACING.sm,
              fontSize: '14px',
              fontWeight: 600,
              color: COLORS.text,
            }}
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={className}
          style={{
            width: '100%',
            padding: `${SPACING.md} 0`,
            borderBottom: `2px solid #e0e0e0`,
            fontSize: '16px',
            outline: 'none',
            transition: 'border-color 0.3s ease',
            backgroundColor: 'transparent',
            color: COLORS.text,
          }}
          onFocus={(e) => {
            (e.target as HTMLInputElement).style.borderBottomColor = COLORS.primary;
          }}
          onBlur={(e) => {
            (e.target as HTMLInputElement).style.borderBottomColor = error ? COLORS.error : '#e0e0e0';
          }}
          {...props}
        />
        {error && (
          <p
            style={{
              marginTop: SPACING.sm,
              fontSize: '12px',
              color: COLORS.error,
            }}
          >
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
