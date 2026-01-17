'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button, Card, Input } from '@/components';
import { COLORS, SPACING } from '@/config/theme';
import { useRouter } from 'next/navigation';
import { MOCK_QUIZZES } from '@/lib/mockData';

interface Question {
  id: string;
  text: string;
  answers: { id: string; text: string; isCorrect: boolean }[];
  timeLimit: number;
}

export default function CreateQuiz() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [showQuestionForm, setShowQuestionForm] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  const handleAddQuestion = () => {
    if (!currentQuestion) return;

    if (!currentQuestion.text.trim()) {
      setErrors(['Savol matni talab qilinadi']);
      return;
    }

    if (currentQuestion.answers.filter(a => a.isCorrect).length === 0) {
      setErrors(['Hech bo\'lmaganda bitta to\'g\'ri javob talab qilinadi']);
      return;
    }

    setQuestions([...questions, currentQuestion]);
    setCurrentQuestion(null);
    setShowQuestionForm(false);
    setErrors([]);
  };

  const handleSaveQuiz = async () => {
    if (!title.trim()) {
      setErrors(['Test nomi talab qilinadi']);
      return;
    }

    if (questions.length === 0) {
      setErrors(['Hech bo\'lmaganda bitta savol talab qilinadi']);
      return;
    }

    try {
      const newQuiz = {
        id: Date.now().toString(),
        title,
        description,
        isPublic: true,
        createdAt: new Date().toISOString(),
        questions,
        userId: 'current-user',
      };

      // Save to localStorage
      const savedQuizzes = localStorage.getItem('quizzes');
      let quizzes = [];
      if (savedQuizzes) {
        try {
          quizzes = JSON.parse(savedQuizzes);
        } catch {
          quizzes = MOCK_QUIZZES;
        }
      } else {
        quizzes = MOCK_QUIZZES;
      }

      quizzes.push(newQuiz);
      localStorage.setItem('quizzes', JSON.stringify(quizzes));

      // Redirect to dashboard
      router.push('/dashboard');
    } catch (error) {
      setErrors(['Test saqlashda xato bo\'ldi']);
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: COLORS.background }}>
      {/* Header */}
      <header style={{ backgroundColor: COLORS.white, borderBottom: `2px solid #e0e0e0`, padding: SPACING.lg }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between' }}>
          <Link href="/dashboard">
            <h1 style={{ fontSize: '24px', fontWeight: 700, color: COLORS.primary, cursor: 'pointer' }}>
              Test O'yini
            </h1>
          </Link>
        </div>
      </header>

      <main style={{ maxWidth: '900px', margin: '0 auto', padding: SPACING.xl }}>
        <h2 style={{ fontSize: '36px', fontWeight: 600, marginBottom: SPACING.lg, color: COLORS.text }}>
          Yangi Test Yaratish
        </h2>

        {/* Test Info Card */}
        <Card style={{ marginBottom: SPACING.xl }}>
          <h3 style={{ fontSize: '20px', fontWeight: 600, marginBottom: SPACING.lg, color: COLORS.text }}>
            Test Ma'lumotlari
          </h3>

          <div style={{ marginBottom: SPACING.lg }}>
            <Input
              label="Test Nomi"
              placeholder="Masalan: Matematika Asoslari"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: SPACING.sm, fontWeight: 600, color: COLORS.text }}>
              Tavsif (ixtiyoriy)
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Test haqida qisqacha ma'lumot..."
              style={{
                width: '100%',
                padding: SPACING.md,
                border: `2px solid #e0e0e0`,
                borderRadius: '8px',
                fontFamily: 'inherit',
                fontSize: '16px',
                minHeight: '100px',
              }}
            />
          </div>
        </Card>

        {/* Questions List */}
        <Card style={{ marginBottom: SPACING.xl }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: SPACING.lg }}>
            <h3 style={{ fontSize: '20px', fontWeight: 600, color: COLORS.text }}>
              Savollar ({questions.length})
            </h3>
            <Button
              variant="primary"
              onClick={() => {
                setCurrentQuestion({
                  id: Date.now().toString(),
                  text: '',
                  answers: [
                    { id: '1', text: '', isCorrect: false },
                    { id: '2', text: '', isCorrect: false },
                    { id: '3', text: '', isCorrect: false },
                    { id: '4', text: '', isCorrect: false },
                  ],
                  timeLimit: 30,
                });
                setShowQuestionForm(true);
              }}
            >
              ➕ Savol Qo'shish
            </Button>
          </div>

          {questions.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: SPACING.md }}>
              {questions.map((q, idx) => (
                <div
                  key={q.id}
                  style={{
                    padding: SPACING.md,
                    backgroundColor: '#f9f9f9',
                    borderRadius: '8px',
                    borderLeft: `4px solid ${COLORS.primary}`,
                  }}
                >
                  <p style={{ fontWeight: 600, marginBottom: SPACING.sm, color: COLORS.text }}>
                    {idx + 1}. {q.text}
                  </p>
                  <p style={{ fontSize: '14px', color: COLORS.textSecondary }}>
                    {q.answers.filter(a => a.isCorrect).length} ta to'g'ri javob
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p style={{ color: COLORS.textSecondary, textAlign: 'center', padding: SPACING.lg }}>
              Savollar yo\'q. Birinchi savol qo\'shing!
            </p>
          )}
        </Card>

        {/* Question Form */}
        {showQuestionForm && currentQuestion && (
          <Card style={{ marginBottom: SPACING.xl, backgroundColor: '#f9f9f9', borderLeft: `4px solid ${COLORS.primary}` }}>
            <h3 style={{ fontSize: '20px', fontWeight: 600, marginBottom: SPACING.lg, color: COLORS.text }}>
              Savol Qo'shish
            </h3>

            <div style={{ marginBottom: SPACING.lg }}>
              <label style={{ display: 'block', marginBottom: SPACING.sm, fontWeight: 600, color: COLORS.text }}>
                Savol Matni
              </label>
              <textarea
                value={currentQuestion.text}
                onChange={(e) => setCurrentQuestion({ ...currentQuestion, text: e.target.value })}
                placeholder="Savol matni..."
                style={{
                  width: '100%',
                  padding: SPACING.md,
                  border: `2px solid #e0e0e0`,
                  borderRadius: '8px',
                  fontFamily: 'inherit',
                  fontSize: '16px',
                  minHeight: '80px',
                }}
              />
            </div>

            <div style={{ marginBottom: SPACING.lg }}>
              <label style={{ display: 'block', marginBottom: SPACING.sm, fontWeight: 600, color: COLORS.text }}>
                Vaqt Chegarasi (soniya)
              </label>
              <input
                type="number"
                value={currentQuestion.timeLimit}
                onChange={(e) => setCurrentQuestion({ ...currentQuestion, timeLimit: parseInt(e.target.value) })}
                min="5"
                max="120"
                style={{
                  width: '100%',
                  padding: SPACING.md,
                  border: `2px solid #e0e0e0`,
                  borderRadius: '8px',
                  fontSize: '16px',
                }}
              />
            </div>

            <div style={{ marginBottom: SPACING.lg }}>
              <h4 style={{ fontWeight: 600, marginBottom: SPACING.md, color: COLORS.text }}>Javoblar</h4>
              {currentQuestion.answers.map((answer, idx) => (
                <div key={answer.id} style={{ marginBottom: SPACING.md, padding: SPACING.md, backgroundColor: COLORS.white, borderRadius: '8px' }}>
                  <div style={{ display: 'flex', gap: SPACING.md, alignItems: 'center' }}>
                    <input
                      type="checkbox"
                      checked={answer.isCorrect}
                      onChange={(e) => {
                        const newAnswers = currentQuestion.answers.map((a, i) =>
                          i === idx ? { ...a, isCorrect: e.target.checked } : a
                        );
                        setCurrentQuestion({ ...currentQuestion, answers: newAnswers });
                      }}
                      style={{ width: '20px', height: '20px', cursor: 'pointer' }}
                    />
                    <input
                      type="text"
                      value={answer.text}
                      onChange={(e) => {
                        const newAnswers = currentQuestion.answers.map((a, i) =>
                          i === idx ? { ...a, text: e.target.value } : a
                        );
                        setCurrentQuestion({ ...currentQuestion, answers: newAnswers });
                      }}
                      placeholder={`Javob ${idx + 1}`}
                      style={{
                        flex: 1,
                        padding: SPACING.sm,
                        border: `1px solid #e0e0e0`,
                        borderRadius: '4px',
                        fontSize: '14px',
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: SPACING.md }}>
              <Button
                variant="outline"
                onClick={() => {
                  setShowQuestionForm(false);
                  setCurrentQuestion(null);
                }}
              >
                Bekor Qilish
              </Button>
              <Button variant="primary" onClick={handleAddQuestion}>
                ✓ Savol Qo'shish
              </Button>
            </div>
          </Card>
        )}

        {/* Errors */}
        {errors.length > 0 && (
          <Card style={{ marginBottom: SPACING.lg, backgroundColor: '#FFEBEE', borderColor: COLORS.error }}>
            {errors.map((error, idx) => (
              <p key={idx} style={{ color: COLORS.error, fontSize: '14px', marginBottom: SPACING.sm }}>
                • {error}
              </p>
            ))}
          </Card>
        )}

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: SPACING.md, justifyContent: 'space-between' }}>
          <Link href="/dashboard">
            <Button variant="outline">Bekor Qilish</Button>
          </Link>
          <Button variant="primary" onClick={handleSaveQuiz} disabled={questions.length === 0}>
            ✓ Testni Saqlash
          </Button>
        </div>
      </main>
    </div>
  );
}
