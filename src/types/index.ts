// Application Types
export interface Quiz {
  id: number;
  userId: string;
  title: string;
  description?: string;
  isPublic: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Question {
  id: number;
  quizId: number;
  questionText: string;
  questionType: 'multiple_choice' | 'true_false';
  timeLimit: number;
  points: number;
  orderIndex: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Answer {
  id: number;
  questionId: number;
  answerText: string;
  isCorrect: boolean;
  orderIndex: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface GameSession {
  id: number;
  quizId: number;
  hostId: string;
  gameCode: string;
  status: 'waiting' | 'active' | 'finished';
  currentQuestionIndex: number;
  startedAt?: Date;
  finishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface Participant {
  id: number;
  gameSessionId: number;
  userId?: string;
  nickname: string;
  totalScore: number;
  joinedAt: Date;
  updatedAt: Date;
}

export interface ParticipantAnswer {
  id: number;
  participantId: number;
  questionId: number;
  answerId?: number;
  isCorrect: boolean;
  timeTaken: number;
  pointsEarned: number;
  answeredAt: Date;
}

export interface User {
  id: string;
  email: string;
  name?: string;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface CreateQuizRequest {
  title: string;
  description?: string;
  isPublic?: boolean;
}

export interface UpdateQuizRequest {
  title?: string;
  description?: string;
  isPublic?: boolean;
}

export interface CreateQuestionRequest {
  questionText: string;
  questionType: 'multiple_choice' | 'true_false';
  timeLimit?: number;
  points?: number;
  answers: CreateAnswerRequest[];
}

export interface CreateAnswerRequest {
  answerText: string;
  isCorrect: boolean;
}

export interface JoinGameRequest {
  gameCode: string;
  nickname: string;
  userId?: string;
}

export interface SubmitAnswerRequest {
  participantId: number;
  questionId: number;
  answerId: number;
  timeTaken: number;
}

// Game State Types
export interface GameState {
  gameSessionId: number;
  participantId: number;
  currentQuestion?: Question & { answers: Answer[] };
  participants: (Participant & { rank?: number })[];
  status: 'waiting' | 'active' | 'finished';
  timeRemaining?: number;
}

export interface LeaderboardEntry {
  rank: number;
  nickname: string;
  totalScore: number;
  correctAnswers: number;
  totalQuestions: number;
}
