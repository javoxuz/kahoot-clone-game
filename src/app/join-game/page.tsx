'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button, Input, Card } from '@/components';
import { COLORS, SPACING } from '@/config/theme';
import { useRouter } from 'next/navigation';

export default function JoinGame() {
  const router = useRouter();
  const [gameCode, setGameCode] = useState('');
  const [nickname, setNickname] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleJoin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!gameCode.trim()) {
      setError('O\'yin kodini kiriting');
      return;
    }

    if (!nickname.trim()) {
      setError('Taxallus kiriting');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Navigate to game
      router.push(`/game/participant/${gameCode}?nickname=${nickname}`);
    } catch (err) {
      setError('Xato bo\'ldi. Iltimos qayta urinib ko\'ring.');
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: COLORS.background }}>
      {/* Header */}
      <header style={{ backgroundColor: COLORS.primary, color: COLORS.white, padding: SPACING.lg }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <Link href="/">
            <h1 style={{ fontSize: '24px', fontWeight: 700, cursor: 'pointer', color: COLORS.white }}>
              Test O'yini
            </h1>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main
        style={{
          maxWidth: '500px',
          margin: '0 auto',
          padding: `${SPACING.xxxl} ${SPACING.lg}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: 'calc(100vh - 80px)',
        }}
      >
        <Card style={{ width: '100%' }}>
          <div style={{ textAlign: 'center', marginBottom: SPACING.xl }}>
            <div style={{ fontSize: '64px', marginBottom: SPACING.md }}>🎮</div>
            <h2 style={{ fontSize: '28px', fontWeight: 600, color: COLORS.text }}>O'yinga Qo'shilish</h2>
            <p style={{ color: COLORS.textSecondary, marginTop: SPACING.sm }}>
              O\'yin kodini kiriting va raqobatda qatnashni boshlang!
            </p>
          </div>

          <form onSubmit={handleJoin}>
            <div style={{ marginBottom: SPACING.lg }}>
              <Input
                label="O'yin Kodi"
                placeholder="6 raqamli kod"
                value={gameCode}
                onChange={(e) => setGameCode(e.target.value.toUpperCase())}
                maxLength={6}
                error={error && !gameCode ? error : ''}
              />
            </div>

            <div style={{ marginBottom: SPACING.lg }}>
              <Input
                label="Taxallus"
                placeholder="O'zingizning nomingiz"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                error={error && !nickname ? error : ''}
              />
            </div>

            {error && (
              <div
                style={{
                  backgroundColor: '#FFEBEE',
                  borderLeft: `4px solid ${COLORS.error}`,
                  padding: SPACING.md,
                  marginBottom: SPACING.lg,
                  borderRadius: '4px',
                }}
              >
                <p style={{ color: COLORS.error, fontSize: '14px' }}>{error}</p>
              </div>
            )}

            <Button
              type="submit"
              variant="primary"
              size="lg"
              style={{ width: '100%' }}
              disabled={loading}
            >
              {loading ? 'Qo\'shilmoqda...' : 'O\'yinga Qo\'shilish'}
            </Button>

            <p style={{ textAlign: 'center', color: COLORS.textSecondary, marginTop: SPACING.lg, fontSize: '14px' }}>
              Test yaratmoqchimiz?{' '}
              <Link href="/dashboard">
                <span style={{ color: COLORS.primary, fontWeight: 600, cursor: 'pointer' }}>
                  Dashboard ga o\'ting
                </span>
              </Link>
            </p>
          </form>
        </Card>
      </main>
    </div>
  );
}
