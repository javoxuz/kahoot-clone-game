import { NextRequest, NextResponse } from 'next/server';
import { ApiResponse, User } from '@/types';
import { MOCK_USERS } from '@/lib/mockData';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json<ApiResponse<null>>(
        {
          success: false,
          error: 'Email va parol talab qilinadi',
        },
        { status: 400 }
      );
    }

    // In production, this would validate against database with hashed passwords
    const user = MOCK_USERS.find(u => u.email === email);

    if (!user || password !== 'password') {
      return NextResponse.json<ApiResponse<null>>(
        {
          success: false,
          error: 'Email yoki parol noto\'g\'ri',
        },
        { status: 401 }
      );
    }

    // In production, generate JWT token
    const token = `token_${user.id}_${Date.now()}`;

    const response = NextResponse.json<ApiResponse<{ user: User; token: string }>>(
      {
        success: true,
        data: { user, token },
        message: 'Muvaffaqiyatli kirildi',
      },
      { status: 200 }
    );

    // Set token in cookie
    response.cookies.set('authToken', token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });

    return response;
  } catch (error) {
    return NextResponse.json<ApiResponse<null>>(
      {
        success: false,
        error: 'Kirish jarayonida xato',
      },
      { status: 500 }
    );
  }
}
