import { create } from 'zustand';
import { User, GameSession, Participant, Quiz } from '@/types';

interface AuthStore {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  setUser: (user: User | null) => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isLoading: false,
  login: async (email: string, password: string) => {
    set({ isLoading: true });
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      if (response.ok) {
        const data = await response.json();
        set({ user: data.user });
      }
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      set({ isLoading: false });
    }
  },
  logout: () => set({ user: null }),
  setUser: (user) => set({ user }),
}));

interface GameStore {
  gameSession: GameSession | null;
  participants: Participant[];
  currentParticipant: Participant | null;
  setGameSession: (session: GameSession) => void;
  setParticipants: (participants: Participant[]) => void;
  setCurrentParticipant: (participant: Participant) => void;
  clearGame: () => void;
}

export const useGameStore = create<GameStore>((set) => ({
  gameSession: null,
  participants: [],
  currentParticipant: null,
  setGameSession: (session) => set({ gameSession: session }),
  setParticipants: (participants) => set({ participants }),
  setCurrentParticipant: (participant) => set({ currentParticipant: participant }),
  clearGame: () => set({ gameSession: null, participants: [], currentParticipant: null }),
}));

interface QuizStore {
  quizzes: Quiz[];
  currentQuiz: Quiz | null;
  setQuizzes: (quizzes: Quiz[]) => void;
  setCurrentQuiz: (quiz: Quiz | null) => void;
  addQuiz: (quiz: Quiz) => void;
}

export const useQuizStore = create<QuizStore>((set) => ({
  quizzes: [],
  currentQuiz: null,
  setQuizzes: (quizzes) => set({ quizzes }),
  setCurrentQuiz: (quiz) => set({ currentQuiz: quiz }),
  addQuiz: (quiz) => set((state) => ({ quizzes: [...state.quizzes, quiz] })),
}));
