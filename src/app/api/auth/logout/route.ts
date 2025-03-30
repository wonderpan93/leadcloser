import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET(): Promise<NextResponse> {
  const response = NextResponse.json({
    success: true,
    message: 'Logged out successfully'
  });
  
  // Clear the auth cookie
  response.cookies.set({
    name: 'auth-token',
    value: '',
    expires: new Date(0),
    path: '/',
  });
  
  return response;
}
