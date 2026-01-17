'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button, Card } from '@/components';
import { COLORS, SPACING } from '@/config/theme';
import { MOCK_QUIZZES } from '@/lib/mockData';
import { Quiz } from '@/types';
import { useParams } from 'next/navigation';

export default function QuizDetail() {
  const params = useParams();
  const quizId = params.id as string;
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
    setLoading(false);
  }, [quizId]);

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: COLORS.background, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p>Yuklanmoqda...</p>
      </div>
    );
  }

  if (!quiz) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: COLORS.background }}>
        <header style={{ backgroundColor: COLORS.white, borderBottom: `2px solid #e0e0e0`, padding: SPACING.lg }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <Link href="/dashboard">
              <h1 style={{ fontSize: '24px', fontWeight: 700, color: COLORS.primary, cursor: 'pointer' }}>
                Test O'yini
              </h1>
            </Link>
          </div>
        </header>

        <main style={{ maxWidth: '900px', margin: '0 auto', padding: SPACING.xl, textAlign: 'center' }}>
          <div style={{ fontSize: '48px', marginBottom: SPACING.lg }}>404</div>
          <h2 style={{ fontSize: '24px', fontWeight: 600, marginBottom: SPACING.lg }}>Test Topilmadi</h2>
          <p style={{ color: COLORS.textSecondary, marginBottom: SPACING.xl }}>Kechirasiz, bu test mavjud emas.</p>
          <Link href="/dashboard">
            <Button variant="primary">Dashboard'ga Qaytish</Button>
          </Link>
        </main>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: COLORS.background }}>
      <header style={{ backgroundColor: COLORS.white, borderBottom: `2px solid #e0e0e0`, padding: SPACING.lg }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link href="/dashboard">
            <h1 style={{ fontSize: '24px', fontWeight: 700, color: COLORS.primary, cursor: 'pointer' }}>
              Test O'yini
            </h1>
          </Link>
        </div>
      </header>

      <main style={{ maxWidth: '900px', margin: '0 auto', padding: SPACING.xl }}>
        <Card>
          <h1 style={{ fontSize: '32px', fontWeight: 700, marginBottom: SPACING.md, color: COLORS.text }}>
            {quiz.title}
          </h1>
          <p style={{ fontSize: '16px', color: COLORS.textSecondary, marginBottom: SPACING.xl }}>
            {quiz.description || 'Tavsif yo\'q'}
          </p>

          <div style={{ backgroundColor: '#f9f9f9', padding: SPACING.lg, borderRadius: '8px', marginBottom: SPACING.xl }}>
            <p style={{ marginBottom: SPACING.sm }}>
              <strong>Savollar soni:</strong> {(quiz as any).questions?.length || 0}
            </p>
            <p style={{ marginBottom: SPACING.sm }}>
              <strong>Yaratilgan:</strong> {new Date(quiz.createdAt).toLocaleDateString('uz-UZ')}
            </p>
            <p>
              <strong>Status:</strong> {quiz.isPublic ? 'Ochiq' : 'Yopiq'}
            </p>
          </div>

          <div style={{ display: 'flex', gap: SPACING.md }}>
            <Link href="/dashboard">
              <Button variant="outline">Orqaga</Button>
            </Link>
            <Link href={`/game/host/${quiz.id}`}>
              <Button variant="primary">O'yin Boshlash</Button>
            </Link>
          </div>
        </Card>
      </main>
    </div>
  );
}
