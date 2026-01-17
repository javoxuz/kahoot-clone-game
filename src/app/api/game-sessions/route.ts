import { NextRequest, NextResponse } from 'next/server';
import { generateGameCode } from '@/lib/utils';
import { ApiResponse, GameSession } from '@/types';

// Mock game sessions storage
const gameSessions: Map<string, GameSession> = new Map();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { quizId } = body;

    if (!quizId) {
      return NextResponse.json<ApiResponse<null>>(
        {
          success: false,
          error: 'Quiz ID talab qilinadi',
        },
        { status: 400 }
      );
    }

    const gameCode = generateGameCode();
    const newSession: GameSession = {
      id: gameSessions.size + 1,
      quizId,
      hostId: 'user-1', // In production, get from session
      gameCode,
      status: 'waiting',
      currentQuestionIndex: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    gameSessions.set(gameCode, newSession);

    return NextResponse.json<ApiResponse<GameSession>>(
      {
        success: true,
        data: newSession,
        message: 'O\'yin sessiyasi yaratildi',
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json<ApiResponse<null>>(
      {
        success: false,
        error: 'O\'yin sessiyasi yaratishda xato',
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const sessions = Array.from(gameSessions.values());

    return NextResponse.json<ApiResponse<GameSession[]>>({
      success: true,
      data: sessions,
    });
  } catch (error) {
    return NextResponse.json<ApiResponse<null>>(
      {
        success: false,
        error: 'Sessiyalarni yuklashda xato',
      },
      { status: 500 }
    );
  }
}
