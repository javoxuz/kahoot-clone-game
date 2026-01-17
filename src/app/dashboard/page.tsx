'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button, Card } from '@/components';
import { COLORS, SPACING } from '@/config/theme';
import { MOCK_QUIZZES } from '@/lib/mockData';
import { Quiz } from '@/types';

export default function Dashboard() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load quizzes from localStorage or use mock data
    const savedQuizzes = localStorage.getItem('quizzes');
    if (savedQuizzes) {
      try {
        setQuizzes(JSON.parse(savedQuizzes));
      } catch {
        setQuizzes(MOCK_QUIZZES);
      }
    } else {
      setQuizzes(MOCK_QUIZZES);
    }
    setLoading(false);
  }, []);

  const handleDeleteQuiz = (quizId: number) => {
    if (confirm('Bu testni o\'chirishni tasdiqlaysizmi?')) {
      const updatedQuizzes = quizzes.filter(q => q.id !== quizId);
      setQuizzes(updatedQuizzes);
      localStorage.setItem('quizzes', JSON.stringify(updatedQuizzes));
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: COLORS.background }}>
      {/* Header */}
      <header
        style={{
          backgroundColor: COLORS.white,
          borderBottom: `2px solid #e0e0e0`,
          padding: `${SPACING.md} ${SPACING.lg}`,
        }}
      >
        <div
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Link href="/">
            <h1 style={{ fontSize: '24px', fontWeight: 700, color: COLORS.primary, cursor: 'pointer' }}>
              Test O'yini
            </h1>
          </Link>
          <div style={{ display: 'flex', gap: SPACING.md }}>
            <Link href="/join-game">
              <Button variant="outline" size="sm">
                O'yinga Qo'shilish
              </Button>
            </Link>
            <Link href="/profile">
              <Button variant="primary" size="sm">
                Profil
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: SPACING.xl }}>
        {/* Dashboard Title */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: SPACING.xl,
          }}
        >
          <h2 style={{ fontSize: '36px', fontWeight: 600, color: COLORS.text }}>Mening Testlarim</h2>
          <Link href="/quiz/create">
            <Button variant="primary" size="lg">
              ➕ Yangi Test
            </Button>
          </Link>
        </div>

        {/* Quiz Grid */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: SPACING.xxxl }}>
            <p style={{ color: COLORS.textSecondary }}>Yuklanmoqda...</p>
          </div>
        ) : quizzes.length > 0 ? (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: SPACING.lg,
            }}
          >
            {quizzes.map((quiz) => (
              <Card key={quiz.id} onClick={() => window.location.href = `/quiz/${quiz.id}`}>
                <div>
                  <h3 style={{ fontSize: '20px', fontWeight: 600, marginBottom: SPACING.sm, color: COLORS.text }}>
                    {quiz.title}
                  </h3>
                  <p style={{ color: COLORS.textSecondary, marginBottom: SPACING.md, fontSize: '14px' }}>
                    {quiz.description || 'Tavsif yo\'q'}
                  </p>

                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginTop: SPACING.md,
                      paddingTop: SPACING.md,
                      borderTop: `1px solid #e0e0e0`,
                    }}
                  >
                    <span style={{ color: COLORS.textSecondary, fontSize: '12px' }}>
                      {new Date(quiz.createdAt).toLocaleDateString('uz-UZ')}
                    </span>
                    <div style={{ display: 'flex', gap: SPACING.sm }}>
                      <Link href={`/game/host/${quiz.id}`}>
                        <Button variant="primary" size="sm">
                          O'yin
                        </Button>
                      </Link>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={(e) => {
                          e.preventDefault();
                          handleDeleteQuiz(quiz.id);
                        }}
                        style={{ color: COLORS.error }}
                      >
                        Ochirish
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <div style={{ textAlign: 'center', padding: SPACING.xl }}>
              <div style={{ fontSize: '48px', marginBottom: SPACING.md }}>📚</div>
              <h3 style={{ fontSize: '20px', fontWeight: 600, marginBottom: SPACING.sm, color: COLORS.text }}>
                Testingiz Yo\'q
              </h3>
              <p style={{ color: COLORS.textSecondary, marginBottom: SPACING.lg }}>
                Birinchi testingizni yaratishni boshlang!
              </p>
              <Link href="/quiz/create">
                <Button variant="primary" size="lg">
                  ➕ Yangi Test Yaratish
                </Button>
              </Link>
            </div>
          </Card>
        )}
      </main>
    </div>
  );
}
