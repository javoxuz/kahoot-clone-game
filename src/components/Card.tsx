import React, { CSSProperties } from 'react';
import { COLORS, BORDER_RADIUS, SHADOWS, SPACING } from '@/config/theme';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  style?: CSSProperties;
}

export const Card: React.FC<CardProps> = ({ children, className = '', onClick, style = {} }) => {
  return (
    <div
      onClick={onClick}
      className={`${className}`}
      style={{
        backgroundColor: COLORS.white,
        border: `2px solid #e0e0e0`,
        borderRadius: BORDER_RADIUS.lg,
        boxShadow: SHADOWS.md,
        padding: SPACING.lg,
        transition: 'all 0.3s ease',
        cursor: onClick ? 'pointer' : 'default',
        ...style,
      }}
      onMouseEnter={(e) => {
        if (onClick) {
          (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-8px)';
          (e.currentTarget as HTMLDivElement).style.boxShadow = SHADOWS.xl;
        }
      }}
      onMouseLeave={(e) => {
        if (onClick) {
          (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
          (e.currentTarget as HTMLDivElement).style.boxShadow = SHADOWS.md;
        }
      }}
    >
      {children}
    </div>
  );
};
