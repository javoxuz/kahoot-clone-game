'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Button, Card } from '@/components';
import { COLORS, SPACING, GAME_BUTTON_COLORS } from '@/config/theme';
import { generateGameCode } from '@/lib/utils';
import { MOCK_QUIZZES } from '@/lib/mockData';
import { Quiz } from '@/types';

export default function HostGame() {
  const params = useParams();
  const quizId = params.quizId as string;
  const [gameCode, setGameCode] = useState('');
  const [gameStatus, setGameStatus] = useState<'waiting' | 'active' | 'finished'>('waiting');
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [participants, setParticipants] = useState<{ id: string; nickname: string; score: number }[]>([]);

  useEffect(() => {
    const code = generateGameCode();
    setGameCode(code);
    
    // Load quiz from localStorage or mock data
    const savedQuizzes = localStorage.getItem('quizzes');
    let quizzes = MOCK_QUIZZES;
    if (savedQuizzes) {
      try {
        quizzes = JSON.parse(savedQuizzes);
      } catch {
        quizzes = MOCK_QUIZZES;
      }
    }
    
    const foundQuiz = quizzes.find(q => String(q.id) === quizId);
    setQuiz(foundQuiz || null);

    // Create game session in localStorage
    if (foundQuiz) {
      const gameSession = {
        code,
        quizId,
        hostId: 'current-user',
        status: 'waiting',
        participants: [],
        createdAt: new Date().toISOString(),
      };
      localStorage.setItem(`game_${code}`, JSON.stringify(gameSession));
    }

    // Poll for new participants
    const interval = setInterval(() => {
      const gameSession = localStorage.getItem(`game_${code}`);
      if (gameSession) {
        const session = JSON.parse(gameSession);
        setParticipants(session.participants || []);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [quizId]);

  const handleStartGame = () => {
    setGameStatus('active');
  };

  const handleEndGame = () => {
    setGameStatus('finished');
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: COLORS.background, padding: SPACING.lg }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* Header with Back Button */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: SPACING.xl }}>
          <Link href="/dashboard">
            <Button variant="outline" size="sm">← Orqaga</Button>
          </Link>
        </div>

        {!quiz ? (
          <Card style={{ textAlign: 'center', padding: SPACING.xxxl }}>
            <div style={{ fontSize: '48px', marginBottom: SPACING.lg }}>404</div>
            <h2 style={{ fontSize: '24px', fontWeight: 600, marginBottom: SPACING.lg }}>Test Topilmadi</h2>
            <p style={{ color: COLORS.textSecondary, marginBottom: SPACING.xl }}>Kechirasiz, bu test mavjud emas.</p>
            <Link href="/dashboard">
              <Button variant="primary">Dashboard'ga Qaytish</Button>
            </Link>
          </Card>
        ) : (
          <>
            <div style={{ marginBottom: SPACING.xxxl, textAlign: 'center' }}>
              <h1 style={{ fontSize: '36px', fontWeight: 600, color: COLORS.text, marginBottom: SPACING.md }}>
                O'yin Xonasi
              </h1>
              <p style={{ color: COLORS.textSecondary, fontSize: '18px' }}>
                {quiz?.title || 'Test'}
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: SPACING.xl }}>
          {/* Game Code Panel */}
          <Card>
            <div style={{ textAlign: 'center' }}>
              <p style={{ color: COLORS.textSecondary, marginBottom: SPACING.sm, fontSize: '14px' }}>
                O'yin Kodi
              </p>
              <div
                style={{
                  fontSize: '48px',
                  fontWeight: 700,
                  color: COLORS.primary,
                  marginBottom: SPACING.lg,
                  padding: SPACING.lg,
                  backgroundColor: '#E3F2FD',
                  borderRadius: '12px',
                  letterSpacing: '4px',
                }}
              >
                {gameCode}
              </div>

              <div style={{ marginBottom: SPACING.lg }}>
                <p style={{ fontSize: '14px', color: COLORS.textSecondary, marginBottom: SPACING.sm }}>
                  Status: <span style={{ fontWeight: 700, color: COLORS.text }}>{gameStatus.toUpperCase()}</span>
                </p>
              </div>

              {gameStatus === 'waiting' && (
                <Button
                  variant="success"
                  size="lg"
                  onClick={handleStartGame}
                  style={{ width: '100%' }}
                >
                  🎮 O'yinni Boshlash
                </Button>
              )}

              {gameStatus === 'active' && (
                <Button
                  variant="error"
                  size="lg"
                  onClick={handleEndGame}
                  style={{ width: '100%' }}
                >
                  🛑 O'yinni Tugatish
                </Button>
              )}
            </div>
          </Card>

          {/* Participants Panel */}
          <div>
            <Card>
              <h2 style={{ fontSize: '24px', fontWeight: 600, marginBottom: SPACING.lg, color: COLORS.text }}>
                Ishtirokchilar ({participants.length})
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: SPACING.md }}>
                {participants.map((p, idx) => {
                  const colors = [GAME_BUTTON_COLORS.option1, GAME_BUTTON_COLORS.option2, GAME_BUTTON_COLORS.option3, GAME_BUTTON_COLORS.option4];
                  const color = colors[idx % colors.length];
                  return (
                    <div
                      key={p.id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: SPACING.md,
                        backgroundColor: idx < 3 ? `${color}20` : '#f5f5f5',
                        borderRadius: '8px',
                        borderLeft: `4px solid ${color}`,
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: SPACING.md }}>
                        <div
                          style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            backgroundColor: color,
                            color: COLORS.white,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: 700,
                          }}
                        >
                          {idx + 1}
                        </div>
                        <span style={{ fontWeight: 600, color: COLORS.text }}>{p.nickname}</span>
                      </div>
                      <span style={{ fontWeight: 700, color, fontSize: '18px' }}>
                        {p.score.toLocaleString('uz-UZ')} ball
                      </span>
                    </div>
                  );
                })}
              </div>
            </Card>
          </div>
          </div>
          </>
        )}
      </div>
    </div>
  );
}
