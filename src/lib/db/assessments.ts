import { D1Database } from '@cloudflare/workers-types';

export interface Assessment {
  id: string;
  userId: string;
  completed: boolean;
  answers: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateAssessmentParams {
  userId: string;
  answers: string;
  completed: boolean;
}

// Save assessment to database
export async function saveAssessment(assessmentData: CreateAssessmentParams): Promise<Assessment> {
  const { env } = process as any;
  const db: D1Database = env.DB;
  
  const id = crypto.randomUUID();
  const now = new Date().toISOString();
  
  try {
    await db
      .prepare(
        'INSERT INTO assessments (id, userId, answers, completed, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?)'
      )
      .bind(id, assessmentData.userId, assessmentData.answers, assessmentData.completed ? 1 : 0, now, now)
      .run();
    
    const assessment = await getAssessmentById(id);
    
    if (!assessment) {
      throw new Error('Failed to create assessment');
    }
    
    return assessment;
  } catch (error) {
    console.error('Error creating assessment:', error);
    throw error;
  }
}

// Get assessment by ID
export async function getAssessmentById(id: string): Promise<Assessment | null> {
  const { env } = process as any;
  const db: D1Database = env.DB;
  
  try {
    const assessment = await db
      .prepare('SELECT * FROM assessments WHERE id = ?')
      .bind(id)
      .first();
    
    return assessment ? {
      ...assessment,
      completed: Boolean(assessment.completed)
    } : null;
  } catch (error) {
    console.error('Error getting assessment by ID:', error);
    return null;
  }
}

// Get latest assessment for user
export async function getLatestAssessmentForUser(userId: string): Promise<Assessment | null> {
  const { env } = process as any;
  const db: D1Database = env.DB;
  
  try {
    const assessment = await db
      .prepare('SELECT * FROM assessments WHERE userId = ? ORDER BY createdAt DESC LIMIT 1')
      .bind(userId)
      .first();
    
    return assessment ? {
      ...assessment,
      completed: Boolean(assessment.completed)
    } : null;
  } catch (error) {
    console.error('Error getting latest assessment for user:', error);
    return null;
  }
}

// Update assessment
export async function updateAssessment(id: string, assessmentData: Partial<Omit<Assessment, 'id' | 'userId' | 'createdAt' | 'updatedAt'>>): Promise<Assessment | null> {
  const { env } = process as any;
  const db: D1Database = env.DB;
  
  const now = new Date().toISOString();
  const updates: string[] = [];
  const values: any[] = [];
  
  Object.entries(assessmentData).forEach(([key, value]) => {
    if (value !== undefined) {
      updates.push(`${key} = ?`);
      if (key === 'completed') {
        values.push(value ? 1 : 0);
      } else {
        values.push(value);
      }
    }
  });
  
  if (updates.length === 0) {
    return await getAssessmentById(id);
  }
  
  updates.push('updatedAt = ?');
  values.push(now);
  values.push(id);
  
  try {
    await db
      .prepare(`UPDATE assessments SET ${updates.join(', ')} WHERE id = ?`)
      .bind(...values)
      .run();
    
    return await getAssessmentById(id);
  } catch (error) {
    console.error('Error updating assessment:', error);
    return null;
  }
}

// Delete assessment
export async function deleteAssessment(id: string): Promise<boolean> {
  const { env } = process as any;
  const db: D1Database = env.DB;
  
  try {
    const result = await db
      .prepare('DELETE FROM assessments WHERE id = ?')
      .bind(id)
      .run();
    
    return result.success;
  } catch (error) {
    console.error('Error deleting assessment:', error);
    return false;
  }
}
