import { NextRequest, NextResponse } from 'next/server';
import { comparePasswords, createToken, setAuthCookie, AuthResult } from '@/lib/auth/auth';
import { getUserByEmail } from '@/lib/db/users';

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const { email, password } = await request.json();

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Get user from database
    const user = await getUserByEmail(email);

    // Check if user exists
    if (!user) {
      return NextResponse.json(
        { success: false, message: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Verify password
    const isPasswordValid = await comparePasswords(password, user.passwordHash);

    if (!isPasswordValid) {
      return NextResponse.json(
        { success: false, message: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Create token
    const token = await createToken({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role
    });

    // Create response
    const response = NextResponse.json({
      success: true,
      message: 'Login successful',
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role
      }
    });

    // Set auth cookie
    setAuthCookie(response, token);

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { success: false, message: 'An error occurred during login' },
      { status: 500 }
    );
  }
}
