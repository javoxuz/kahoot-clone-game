import { NextRequest, NextResponse } from 'next/server';
import { MOCK_QUIZZES, MOCK_QUESTIONS, MOCK_ANSWERS } from '@/lib/mockData';
import { ApiResponse, Quiz } from '@/types';

export async function GET(request: NextRequest) {
  try {
    // In production, this would query from the database using Prisma
    const quizzes = MOCK_QUIZZES;

    return NextResponse.json<ApiResponse<Quiz[]>>({
      success: true,
      data: quizzes,
    });
  } catch (error) {
    return NextResponse.json<ApiResponse<null>>(
      {
        success: false,
        error: 'Testlarni yuklashda xato',
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, description, isPublic } = body;

    if (!title) {
      return NextResponse.json<ApiResponse<null>>(
        {
          success: false,
          error: 'Test nomi talab qilinadi',
        },
        { status: 400 }
      );
    }

    // In production, this would save to the database
    const newQuiz: Quiz = {
      id: MOCK_QUIZZES.length + 1,
      userId: 'user-1', // In production, get from session
      title,
      description,
      isPublic: isPublic ?? true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    return NextResponse.json<ApiResponse<Quiz>>(
      {
        success: true,
        data: newQuiz,
        message: 'Test yaratildi',
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json<ApiResponse<null>>(
      {
        success: false,
        error: 'Test yaratishda xato',
      },
      { status: 500 }
    );
  }
}
