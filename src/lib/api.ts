import axios, { AxiosInstance } from 'axios';
import { ApiResponse, CreateQuizRequest, UpdateQuizRequest, JoinGameRequest } from '@/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const quizApi = {
  // Get all quizzes
  getQuizzes: async () => {
    const response = await axiosInstance.get('/quizzes');
    return response.data;
  },

  // Get a single quiz
  getQuiz: async (id: number) => {
    const response = await axiosInstance.get(`/quizzes/${id}`);
    return response.data;
  },

  // Create a new quiz
  createQuiz: async (data: CreateQuizRequest) => {
    const response = await axiosInstance.post('/quizzes', data);
    return response.data;
  },

  // Update a quiz
  updateQuiz: async (id: number, data: UpdateQuizRequest) => {
    const response = await axiosInstance.put(`/quizzes/${id}`, data);
    return response.data;
  },

  // Delete a quiz
  deleteQuiz: async (id: number) => {
    const response = await axiosInstance.delete(`/quizzes/${id}`);
    return response.data;
  },
};

export const gameApi = {
  // Create a new game session
  createGameSession: async (quizId: number) => {
    const response = await axiosInstance.post('/game-sessions', { quizId });
    return response.data;
  },

  // Get game session details
  getGameSession: async (sessionId: number) => {
    const response = await axiosInstance.get(`/game-sessions/${sessionId}`);
    return response.data;
  },

  // Join a game
  joinGame: async (data: JoinGameRequest) => {
    const response = await axiosInstance.post('/game-sessions/join', data);
    return response.data;
  },

  // Submit an answer
  submitAnswer: async (participantId: number, answerId: number, timeTaken: number) => {
    const response = await axiosInstance.post('/participants/answer', {
      participantId,
      answerId,
      timeTaken,
    });
    return response.data;
  },

  // Get leaderboard
  getLeaderboard: async (sessionId: number) => {
    const response = await axiosInstance.get(`/game-sessions/${sessionId}/leaderboard`);
    return response.data;
  },

  // Start game
  startGame: async (sessionId: number) => {
    const response = await axiosInstance.post(`/game-sessions/${sessionId}/start`);
    return response.data;
  },

  // Next question
  nextQuestion: async (sessionId: number) => {
    const response = await axiosInstance.post(`/game-sessions/${sessionId}/next-question`);
    return response.data;
  },

  // End game
  endGame: async (sessionId: number) => {
    const response = await axiosInstance.post(`/game-sessions/${sessionId}/end`);
    return response.data;
  },
};

export const authApi = {
  // Login
  login: async (email: string, password: string) => {
    const response = await axiosInstance.post('/auth/login', { email, password });
    return response.data;
  },

  // Register
  register: async (email: string, name: string, password: string) => {
    const response = await axiosInstance.post('/auth/register', { email, name, password });
    return response.data;
  },

  // Logout
  logout: async () => {
    const response = await axiosInstance.post('/auth/logout');
    return response.data;
  },

  // Get current user
  getCurrentUser: async () => {
    const response = await axiosInstance.get('/auth/me');
    return response.data;
  },
};

export default axiosInstance;
