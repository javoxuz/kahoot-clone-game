'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { GameButton, Card, Button } from '@/components';
import { COLORS, SPACING } from '@/config/theme';
import { MOCK_QUESTIONS, MOCK_ANSWERS, MOCK_QUIZZES } from '@/lib/mockData';
import { Question, Answer, Quiz } from '@/types';

export default function ParticipantGame({
  params,
  searchParams,
}: {
  params: { gameCode: string };
  searchParams: { nickname?: string };
}) {
  const gameCode = params.gameCode;
  const nickname = searchParams.nickname || 'O\'yinchi';

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(30);
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameStatus, setGameStatus] = useState<'waiting' | 'active' | 'finished'>('waiting');
  const [participants, setParticipants] = useState<any[]>([]);

  useEffect(() => {
    // Load game session and quiz
    const gameSession = localStorage.getItem(`game_${gameCode}`);
    if (!gameSession) {
      console.log('Game session not found');
      return;
    }

    const session = JSON.parse(gameSession);
    
    // Get quiz
    const savedQuizzes = localStorage.getItem('quizzes');
    let quizzes = MOCK_QUIZZES;
    if (savedQuizzes) {
      try {
        quizzes = JSON.parse(savedQuizzes);
      } catch {
        quizzes = MOCK_QUIZZES;
      }
    }

    const foundQuiz = quizzes.find((q: Quiz) => q.id === session.quizId);
    if (foundQuiz) {
      setQuiz(foundQuiz);
      setGameStarted(true);
    }

    // Register participant
    const participant = {
      id: Date.now().toString(),
      nickname,
      score: 0,
    };
    
    session.participants = session.participants || [];
    if (!session.participants.find((p: any) => p.nickname === nickname)) {
      session.participants.push(participant);
      localStorage.setItem(`game_${gameCode}`, JSON.stringify(session));
    }
  }, [gameCode, nickname]);

  useEffect(() => {
    if (!quiz || !gameStarted) return;
    
    const questions = (quiz as any).questions || [];
    if (questions.length > currentQuestionIndex) {
      const question = questions[currentQuestionIndex];
      setCurrentQuestion(question);
      const questionAnswers = question.answers || [];
      setAnswers(questionAnswers);
      setSelectedAnswer(null);
      setIsAnswered(false);
      setTimeRemaining(question.timeLimit || 30);
    }
  }, [currentQuestionIndex, quiz, gameStarted]);

  useEffect(() => {
    if (timeRemaining <= 0 && !isAnswered) {
      handleTimeUp();
      return;
    }

    const timer = setTimeout(() => {
      setTimeRemaining(prev => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeRemaining, isAnswered]);

  useEffect(() => {
    if (isAnswered) {
      const gameSession = localStorage.getItem(`game_${gameCode}`);
      if (gameSession) {
        const session = JSON.parse(gameSession);
        setParticipants((session.participants || []).sort((a: any, b: any) => (b.score || 0) - (a.score || 0)));
      }
    }
  }, [isAnswered, gameCode]);

  useEffect(() => {
    // Poll for game status changes
    const statusInterval = setInterval(() => {
      const gameSession = localStorage.getItem(`game_${gameCode}`);
      if (gameSession) {
        const session = JSON.parse(gameSession);
        setGameStatus(session.status || 'waiting');
        if (session.status === 'active' && !gameStarted) {
          setGameStarted(true);
        }
        if (session.status === 'finished') {
          // Game finished, redirect to results
          if (currentQuestionIndex >= ((quiz as any)?.questions || []).length - 1) {
            window.location.href = '/results';
          }
        }
      }
    }, 500);

    return () => clearInterval(statusInterval);
  }, [gameCode, quiz, currentQuestionIndex, gameStarted]);

  const handleAnswerClick = (answerId: number) => {
    if (!isAnswered) {
      setSelectedAnswer(answerId);
    }
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return;

    const answer = answers.find(a => a.id === selectedAnswer);
    if (answer?.isCorrect) {
      const points = 100 + Math.max(0, timeRemaining * 10);
      setScore(score + points);

      // Update score in game session
      const gameSession = localStorage.getItem(`game_${gameCode}`);
      if (gameSession) {
        const session = JSON.parse(gameSession);
        const participantIndex = session.participants.findIndex((p: any) => p.nickname === nickname);
        if (participantIndex !== -1) {
          session.participants[participantIndex].score = (session.participants[participantIndex].score || 0) + points;
          localStorage.setItem(`game_${gameCode}`, JSON.stringify(session));
          // Load updated participants
          setParticipants(session.participants || []);
        }
      }
    }

    setIsAnswered(true);
  };

  const handleTimeUp = () => {
    setIsAnswered(true);
  };

  const handleNextQuestion = () => {
    const questions = (quiz as any)?.questions || [];
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Game finished - redirect to results
      window.location.href = '/results';
    }
  };

  if (!gameStarted) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: COLORS.background, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Card style={{ textAlign: 'center', padding: SPACING.xxxl, maxWidth: '400px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 600, marginBottom: SPACING.lg }}>O'yin Kutilmoqda...</h2>
          <p style={{ color: COLORS.textSecondary, marginBottom: SPACING.lg }}>Host o'yinni boshlashini kutib turing.</p>
          <Link href="/dashboard">
            <Button variant="outline">Chiqish</Button>
          </Link>
        </Card>
      </div>
    );
  }

  if (!currentQuestion) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: COLORS.background, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Card style={{ textAlign: 'center', padding: SPACING.xxxl }}>
          <h2 style={{ fontSize: '24px', fontWeight: 600, marginBottom: SPACING.lg }}>O'yin Tugadi</h2>
          <p style={{ fontSize: '18px', fontWeight: 700, marginBottom: SPACING.lg }}>Sizning Ballangiz: {score}</p>
          <Link href="/results">
            <Button variant="primary">Natijalari Ko'rish</Button>
          </Link>
        </Card>
      </div>
    );
  }

  const questions = (quiz as any)?.questions || [];
  const allAnswers = Array.isArray(answers) ? answers : [];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: COLORS.primary, color: COLORS.white }}>
      {/* Top Bar */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: SPACING.lg,
          borderBottom: `2px solid rgba(255, 255, 255, 0.2)`,
        }}
      >
        <div>
          <p style={{ fontSize: '14px', opacity: 0.9 }}>Foydalanuvchi</p>
          <p style={{ fontWeight: 700, fontSize: '18px' }}>{nickname}</p>
        </div>

        <div>
          <p style={{ fontSize: '14px', opacity: 0.9 }}>Ball</p>
          <p style={{ fontWeight: 700, fontSize: '24px' }}>{score}</p>
        </div>

        <div
          style={{
            fontSize: '32px',
            fontWeight: 700,
            padding: `${SPACING.md} ${SPACING.lg}`,
            backgroundColor: timeRemaining <= 5 ? '#E53935' : 'rgba(255, 255, 255, 0.2)',
            borderRadius: '8px',
          }}
        >
          {Math.ceil(timeRemaining)}s
        </div>
      </div>

      {/* Question */}
      <div style={{ padding: SPACING.xxxl }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center', marginBottom: SPACING.xxxl }}>
          <p style={{ fontSize: '18px', opacity: 0.9, marginBottom: SPACING.lg }}>
            Savol {currentQuestionIndex + 1} / {MOCK_QUESTIONS.length}
          </p>
          <h2 style={{ fontSize: '36px', fontWeight: 700, lineHeight: 1.4 }}>
            {currentQuestion.questionText}
          </h2>
        </div>

        {/* Answer Options */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: SPACING.xl,
            maxWidth: '600px',
            margin: '0 auto',
          }}
        >
          {allAnswers.map((answer: any, idx: number) => (
            <GameButton
              key={answer.id}
              optionNumber={(idx + 1) as 1 | 2 | 3 | 4}
              text={answer.text || answer.answerText}
              isSelected={selectedAnswer === answer.id}
              isAnswered={isAnswered}
              isCorrect={answer.isCorrect && selectedAnswer === answer.id}
              onClick={() => handleAnswerClick(answer.id)}
            />
          ))}
        </div>

        {/* Controls */}
        {!isAnswered && (
          <div style={{ textAlign: 'center', marginTop: SPACING.xxxl }}>
            <button
              onClick={handleSubmitAnswer}
              disabled={selectedAnswer === null}
              style={{
                padding: `${SPACING.md} ${SPACING.lg}`,
                fontSize: '18px',
                fontWeight: 700,
                backgroundColor: selectedAnswer !== null ? '#FFA000' : 'rgba(255, 255, 255, 0.2)',
                color: COLORS.white,
                border: 'none',
                borderRadius: '8px',
                cursor: selectedAnswer !== null ? 'pointer' : 'not-allowed',
                opacity: selectedAnswer !== null ? 1 : 0.5,
              }}
            >
              Javob Yuborish
            </button>
          </div>
        )}

        {/* Leaderboard after answer */}
        {isAnswered && (
          <div style={{ marginTop: SPACING.xxxl, maxWidth: '500px', margin: '0 auto' }}>
            <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: SPACING.lg, textAlign: 'center' }}>
              Reytingi
            </h3>
            <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', borderRadius: '12px', overflow: 'hidden' }}>
              {participants.map((p: any, idx: number) => (
                <div
                  key={p.id || idx}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: SPACING.md,
                    borderBottom: idx < participants.length - 1 ? '1px solid rgba(255, 255, 255, 0.1)' : 'none',
                    backgroundColor: p.nickname === nickname ? 'rgba(255, 160, 0, 0.3)' : 'transparent',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: SPACING.md }}>
                    <span style={{ fontSize: '18px', fontWeight: 700, minWidth: '30px' }}>
                      {idx === 0 ? '🥇' : idx === 1 ? '🥈' : idx === 2 ? '🥉' : `${idx + 1}.`}
                    </span>
                    <span style={{ fontSize: '16px', fontWeight: 600 }}>{p.nickname}</span>
                  </div>
                  <span style={{ fontSize: '18px', fontWeight: 700 }}>{p.score || 0}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {isAnswered && currentQuestionIndex < MOCK_QUESTIONS.length - 1 && (
          <div style={{ textAlign: 'center', marginTop: SPACING.xxxl }}>
            <button
              onClick={handleNextQuestion}
              style={{
                padding: `${SPACING.md} ${SPACING.lg}`,
                fontSize: '18px',
                fontWeight: 700,
                backgroundColor: '#FFA000',
                color: COLORS.white,
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
              }}
            >
              Keyingi Savol ➜
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
