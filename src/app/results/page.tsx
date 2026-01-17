'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { COLORS, SPACING, GAME_BUTTON_COLORS } from '@/config/theme';
import { Button } from '@/components';

interface LeaderboardEntry {
  rank: number;
  nickname: string;
  score: number;
  correctAnswers: number;
  totalQuestions: number;
}

export default function Results({
  searchParams,
}: {
  searchParams: { sessionId?: string };
}) {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([
    { rank: 1, nickname: 'Champion Player', score: 2500, correctAnswers: 10, totalQuestions: 10 },
    { rank: 2, nickname: 'Second Place', score: 2100, correctAnswers: 9, totalQuestions: 10 },
    { rank: 3, nickname: 'Third Place', score: 1800, correctAnswers: 8, totalQuestions: 10 },
    { rank: 4, nickname: 'Player 4', score: 1400, correctAnswers: 7, totalQuestions: 10 },
    { rank: 5, nickname: 'Player 5', score: 900, correctAnswers: 5, totalQuestions: 10 },
  ]);

  const getMedalEmoji = (rank: number) => {
    switch (rank) {
      case 1:
        return '🥇';
      case 2:
        return '🥈';
      case 3:
        return '🥉';
      default:
        return `#${rank}`;
    }
  };

  const getBackgroundColor = (rank: number) => {
    switch (rank) {
      case 1:
        return GAME_BUTTON_COLORS.option4; // Gold
      case 2:
        return '#C0C0C0'; // Silver
      case 3:
        return '#CD7F32'; // Bronze
      default:
        return COLORS.white;
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: COLORS.background }}>
      {/* Podium Section */}
      <section
        style={{
          backgroundColor: COLORS.primary,
          color: COLORS.white,
          padding: `${SPACING.xxxl} ${SPACING.lg}`,
          textAlign: 'center',
        }}
      >
        <h1 style={{ fontSize: '48px', fontWeight: 700, marginBottom: SPACING.lg }}>🏆 Natijalar</h1>

        {/* Podium */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-end',
            gap: SPACING.lg,
            maxWidth: '500px',
            margin: '0 auto',
            marginBottom: SPACING.xxxl,
            marginTop: SPACING.xxxl,
          }}
        >
          {/* Second Place */}
          {leaderboard[1] && (
            <div
              style={{
                flex: 1,
                backgroundColor: '#C0C0C0',
                padding: SPACING.lg,
                borderRadius: '12px',
                minHeight: '200px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
              }}
            >
              <p style={{ fontSize: '32px', marginBottom: SPACING.sm }}>🥈</p>
              <p style={{ fontWeight: 700, marginBottom: SPACING.sm, color: COLORS.white }}>
                {leaderboard[1].nickname}
              </p>
              <p style={{ fontSize: '24px', fontWeight: 700, color: COLORS.white }}>
                {leaderboard[1].score}
              </p>
            </div>
          )}

          {/* First Place */}
          {leaderboard[0] && (
            <div
              style={{
                flex: 1,
                backgroundColor: GAME_BUTTON_COLORS.option4,
                padding: SPACING.lg,
                borderRadius: '12px',
                minHeight: '280px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
              }}
            >
              <p style={{ fontSize: '48px', marginBottom: SPACING.sm }}>🥇</p>
              <p style={{ fontWeight: 700, marginBottom: SPACING.sm, color: COLORS.text }}>
                {leaderboard[0].nickname}
              </p>
              <p style={{ fontSize: '28px', fontWeight: 700, color: COLORS.text }}>
                {leaderboard[0].score}
              </p>
            </div>
          )}

          {/* Third Place */}
          {leaderboard[2] && (
            <div
              style={{
                flex: 1,
                backgroundColor: '#CD7F32',
                padding: SPACING.lg,
                borderRadius: '12px',
                minHeight: '160px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
              }}
            >
              <p style={{ fontSize: '32px', marginBottom: SPACING.sm }}>🥉</p>
              <p style={{ fontWeight: 700, marginBottom: SPACING.sm, color: COLORS.white }}>
                {leaderboard[2].nickname}
              </p>
              <p style={{ fontSize: '24px', fontWeight: 700, color: COLORS.white }}>
                {leaderboard[2].score}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Full Leaderboard */}
      <section style={{ maxWidth: '900px', margin: '0 auto', padding: SPACING.xl }}>
        <h2 style={{ fontSize: '28px', fontWeight: 600, marginBottom: SPACING.lg, color: COLORS.text }}>
          Yozuv Taxtasi
        </h2>

        <div style={{ backgroundColor: COLORS.white, borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
          {leaderboard.map((entry, idx) => (
            <div
              key={entry.rank}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: SPACING.lg,
                borderBottom: idx < leaderboard.length - 1 ? '1px solid #e0e0e0' : 'none',
                backgroundColor: idx < 3 ? `${getBackgroundColor(entry.rank)}15` : COLORS.white,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: SPACING.lg }}>
                <div
                  style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    backgroundColor: getBackgroundColor(entry.rank),
                    color: entry.rank === 1 ? COLORS.text : COLORS.white,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    fontSize: '24px',
                  }}
                >
                  {getMedalEmoji(entry.rank)}
                </div>
                <div>
                  <p style={{ fontWeight: 700, fontSize: '16px', color: COLORS.text, marginBottom: SPACING.xs }}>
                    {entry.nickname}
                  </p>
                  <p style={{ fontSize: '12px', color: COLORS.textSecondary }}>
                    {entry.correctAnswers}/{entry.totalQuestions} to'g'ri
                  </p>
                </div>
              </div>
              <p style={{ fontWeight: 700, fontSize: '24px', color: COLORS.primary }}>
                {entry.score}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Action Buttons */}
      <section style={{ textAlign: 'center', padding: `${SPACING.xxl} ${SPACING.lg}` }}>
        <div style={{ display: 'flex', gap: SPACING.md, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/dashboard">
            <Button variant="primary" size="lg">
              Dashboard
            </Button>
          </Link>
          <Link href="/">
            <Button variant="outline" size="lg">
              Bosh Sahifa
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
