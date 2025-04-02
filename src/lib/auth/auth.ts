import { jwtVerify, SignJWT } from 'jose';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { hash, verify } from '@node-rs/bcrypt';

// Secret key for JWT signing and verification
const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'leadcloser-default-secret-key-change-in-production'
);

// User interface
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'admin';
}

// Authentication result interface
export interface AuthResult {
  success: boolean;
  message: string;
  user?: User;
  token?: string;
}

// Updated password functions
export async function hashPassword(password: string): Promise<string> {
  return await hash(password, 10);
}

export async function comparePasswords(password: string, hash: string): Promise<boolean> {
  return await verify(password, hash);
}

// Create JWT token
export async function createToken(user: User): Promise<string> {
  const token = await new SignJWT({ 
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(JWT_SECRET);
  
  return token;
}

// Verify JWT token
export async function verifyToken(token: string): Promise<User | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload as unknown as User;
  } catch (error) {
    return null;
  }
}

// Set authentication cookie
export function setAuthCookie(response: NextResponse, token: string): void {
  response.cookies.set({
    name: 'auth-token',
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: '/',
  });
}

// Get current user from request
export async function getCurrentUser(request: NextRequest): Promise<User | null> {
  const token = request.cookies.get('auth-token')?.value;
  
  if (!token) {
    return null;
  }
  
  return await verifyToken(token);
}

// Get current user from server component
export async function getServerUser(): Promise<User | null> {
  const cookieStore = cookies();
  const token = cookieStore.get('auth-token')?.value;
  
  if (!token) {
    return null;
  }
  
  return await verifyToken(token);
}

// Middleware to protect routes
export async function authMiddleware(request: NextRequest): Promise<NextResponse | null> {
  const user = await getCurrentUser(request);
  
  if (!user) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  
  return null;
}

// Middleware to protect admin routes
export async function adminMiddleware(request: NextRequest): Promise<NextResponse | null> {
  const user = await getCurrentUser(request);
  
  if (!user || user.role !== 'admin') {
    return NextResponse.redirect(new URL('/', request.url));
  }
  
  return null;
}
