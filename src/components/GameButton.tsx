import React from 'react';
import { GAME_BUTTON_COLORS, BORDER_RADIUS, SHADOWS } from '@/config/theme';

interface GameButtonProps {
  optionNumber: 1 | 2 | 3 | 4;
  text?: string;
  isSelected?: boolean;
  isCorrect?: boolean;
  isAnswered?: boolean;
  onClick?: () => void;
}

export const GameButton: React.FC<GameButtonProps> = ({
  optionNumber,
  text,
  isSelected,
  isCorrect,
  isAnswered,
  onClick,
}) => {
  const colors = [GAME_BUTTON_COLORS.option1, GAME_BUTTON_COLORS.option2, GAME_BUTTON_COLORS.option3, GAME_BUTTON_COLORS.option4];
  const color = colors[optionNumber - 1];

  let backgroundColor = color;
  if (isAnswered) {
    backgroundColor = isCorrect ? '#43A047' : '#E53935';
  }

  return (
    <button
      onClick={onClick}
      style={{
        width: '200px',
        height: '200px',
        backgroundColor,
        border: isSelected ? '4px solid white' : 'none',
        borderRadius: BORDER_RADIUS.lg,
        boxShadow: SHADOWS.lg,
        color: 'white',
        fontSize: '24px',
        fontWeight: 700,
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '16px',
        opacity: isAnswered ? 1 : isSelected ? 0.9 : 1,
        transform: isSelected && !isAnswered ? 'scale(1.05)' : 'scale(1)',
      }}
      onMouseEnter={(e) => {
        if (!isAnswered) {
          (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1.08)';
          (e.currentTarget as HTMLButtonElement).style.boxShadow = SHADOWS.xl;
        }
      }}
      onMouseLeave={(e) => {
        if (!isAnswered) {
          (e.currentTarget as HTMLButtonElement).style.transform = isSelected ? 'scale(1.05)' : 'scale(1)';
          (e.currentTarget as HTMLButtonElement).style.boxShadow = SHADOWS.lg;
        }
      }}
    >
      {text}
    </button>
  );
};
