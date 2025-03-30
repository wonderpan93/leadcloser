import { D1Database } from '@cloudflare/workers-types';
import { User } from '@/lib/auth/auth';

export interface UserRecord extends Omit<User, 'id'> {
  id: string;
  passwordHash: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateUserParams {
  email: string;
  name: string;
  passwordHash: string;
  role: 'user' | 'admin';
}

// Get user by email
export async function getUserByEmail(email: string): Promise<UserRecord | null> {
  const { env } = process as any;
  const db: D1Database = env.DB;
  
  try {
    const user = await db
      .prepare('SELECT * FROM users WHERE email = ?')
      .bind(email)
      .first();
    
    return user || null;
  } catch (error) {
    console.error('Error getting user by email:', error);
    return null;
  }
}

// Get user by ID
export async function getUserById(id: string): Promise<UserRecord | null> {
  const { env } = process as any;
  const db: D1Database = env.DB;
  
  try {
    const user = await db
      .prepare('SELECT * FROM users WHERE id = ?')
      .bind(id)
      .first();
    
    return user || null;
  } catch (error) {
    console.error('Error getting user by ID:', error);
    return null;
  }
}

// Create new user
export async function createUser(userData: CreateUserParams): Promise<UserRecord> {
  const { env } = process as any;
  const db: D1Database = env.DB;
  
  const id = crypto.randomUUID();
  const now = new Date().toISOString();
  
  try {
    await db
      .prepare(
        'INSERT INTO users (id, email, name, passwordHash, role, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?)'
      )
      .bind(id, userData.email, userData.name, userData.passwordHash, userData.role, now, now)
      .run();
    
    const user = await getUserById(id);
    
    if (!user) {
      throw new Error('Failed to create user');
    }
    
    return user;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
}

// Update user
export async function updateUser(id: string, userData: Partial<Omit<UserRecord, 'id' | 'createdAt' | 'updatedAt'>>): Promise<UserRecord | null> {
  const { env } = process as any;
  const db: D1Database = env.DB;
  
  const now = new Date().toISOString();
  const updates: string[] = [];
  const values: any[] = [];
  
  Object.entries(userData).forEach(([key, value]) => {
    if (value !== undefined) {
      updates.push(`${key} = ?`);
      values.push(value);
    }
  });
  
  if (updates.length === 0) {
    return await getUserById(id);
  }
  
  updates.push('updatedAt = ?');
  values.push(now);
  values.push(id);
  
  try {
    await db
      .prepare(`UPDATE users SET ${updates.join(', ')} WHERE id = ?`)
      .bind(...values)
      .run();
    
    return await getUserById(id);
  } catch (error) {
    console.error('Error updating user:', error);
    return null;
  }
}

// Delete user
export async function deleteUser(id: string): Promise<boolean> {
  const { env } = process as any;
  const db: D1Database = env.DB;
  
  try {
    const result = await db
      .prepare('DELETE FROM users WHERE id = ?')
      .bind(id)
      .run();
    
    return result.success;
  } catch (error) {
    console.error('Error deleting user:', error);
    return false;
  }
}
