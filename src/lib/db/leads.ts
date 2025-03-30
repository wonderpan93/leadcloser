import { D1Database } from '@cloudflare/workers-types';
import { Lead, ScoreBreakdown, LeadStatus } from '@/lib/leads/scoring';

export interface CreateLeadParams {
  userId: string;
  linkedinId?: string;
  name: string;
  title?: string;
  company?: string;
  industry?: string;
  score: number;
  scoreBreakdown: ScoreBreakdown;
  profileUrl?: string;
  notes?: string;
  status?: LeadStatus;
}

// Save lead to database
export async function saveLead(leadData: CreateLeadParams): Promise<Lead> {
  const { env } = process as any;
  const db: D1Database = env.DB;
  
  const id = crypto.randomUUID();
  const now = new Date().toISOString();
  const status = leadData.status || 'new';
  
  try {
    await db
      .prepare(
        `INSERT INTO leads (
          id, userId, linkedinId, name, title, company, industry, 
          score, scoreBreakdown, engagementLevel, roleRelevance, 
          connectionProximity, activityRecency, contentAlignment,
          profileUrl, notes, status, createdAt, updatedAt
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
      )
      .bind(
        id, 
        leadData.userId, 
        leadData.linkedinId || null, 
        leadData.name,
        leadData.title || null,
        leadData.company || null,
        leadData.industry || null,
        leadData.score,
        JSON.stringify(leadData.scoreBreakdown),
        leadData.scoreBreakdown.engagementLevel,
        leadData.scoreBreakdown.roleRelevance,
        leadData.scoreBreakdown.connectionProximity,
        leadData.scoreBreakdown.activityRecency,
        leadData.scoreBreakdown.contentAlignment,
        leadData.profileUrl || null,
        leadData.notes || null,
        status,
        now,
        now
      )
      .run();
    
    const lead = await getLeadById(id);
    
    if (!lead) {
      throw new Error('Failed to create lead');
    }
    
    return lead;
  } catch (error) {
    console.error('Error creating lead:', error);
    throw error;
  }
}

// Get lead by ID
export async function getLeadById(id: string): Promise<Lead | null> {
  const { env } = process as any;
  const db: D1Database = env.DB;
  
  try {
    const lead = await db
      .prepare('SELECT * FROM leads WHERE id = ?')
      .bind(id)
      .first();
    
    if (!lead) {
      return null;
    }
    
    return {
      ...lead,
      scoreBreakdown: JSON.parse(lead.scoreBreakdown)
    };
  } catch (error) {
    console.error('Error getting lead by ID:', error);
    return null;
  }
}

// Get leads for user
export async function getLeadsForUser(userId: string, limit = 50, offset = 0): Promise<Lead[]> {
  const { env } = process as any;
  const db: D1Database = env.DB;
  
  try {
    const leads = await db
      .prepare('SELECT * FROM leads WHERE userId = ? ORDER BY score DESC LIMIT ? OFFSET ?')
      .bind(userId, limit, offset)
      .all();
    
    return leads.results.map(lead => ({
      ...lead,
      scoreBreakdown: JSON.parse(lead.scoreBreakdown)
    }));
  } catch (error) {
    console.error('Error getting leads for user:', error);
    return [];
  }
}

// Update lead
export async function updateLead(id: string, leadData: Partial<Omit<Lead, 'id' | 'userId' | 'createdAt' | 'updatedAt'>>): Promise<Lead | null> {
  const { env } = process as any;
  const db: D1Database = env.DB;
  
  const now = new Date().toISOString();
  const updates: string[] = [];
  const values: any[] = [];
  
  Object.entries(leadData).forEach(([key, value]) => {
    if (value !== undefined) {
      if (key === 'scoreBreakdown') {
        updates.push(`scoreBreakdown = ?`);
        values.push(JSON.stringify(value));
        
        // Also update individual score components
        updates.push(`engagementLevel = ?`);
        values.push(value.engagementLevel);
        
        updates.push(`roleRelevance = ?`);
        values.push(value.roleRelevance);
        
        updates.push(`connectionProximity = ?`);
        values.push(value.connectionProximity);
        
        updates.push(`activityRecency = ?`);
        values.push(value.activityRecency);
        
        updates.push(`contentAlignment = ?`);
        values.push(value.contentAlignment);
      } else {
        updates.push(`${key} = ?`);
        values.push(value);
      }
    }
  });
  
  if (updates.length === 0) {
    return await getLeadById(id);
  }
  
  updates.push('updatedAt = ?');
  values.push(now);
  values.push(id);
  
  try {
    await db
      .prepare(`UPDATE leads SET ${updates.join(', ')} WHERE id = ?`)
      .bind(...values)
      .run();
    
    return await getLeadById(id);
  } catch (error) {
    console.error('Error updating lead:', error);
    return null;
  }
}

// Delete lead
export async function deleteLead(id: string): Promise<boolean> {
  const { env } = process as any;
  const db: D1Database = env.DB;
  
  try {
    const result = await db
      .prepare('DELETE FROM leads WHERE id = ?')
      .bind(id)
      .run();
    
    return result.success;
  } catch (error) {
    console.error('Error deleting lead:', error);
    return false;
  }
}

// Get lead count for user
export async function getLeadCountForUser(userId: string): Promise<number> {
  const { env } = process as any;
  const db: D1Database = env.DB;
  
  try {
    const result = await db
      .prepare('SELECT COUNT(*) as count FROM leads WHERE userId = ?')
      .bind(userId)
      .first();
    
    return result?.count || 0;
  } catch (error) {
    console.error('Error getting lead count for user:', error);
    return 0;
  }
}

// Get leads by status for user
export async function getLeadsByStatusForUser(userId: string, status: LeadStatus, limit = 50, offset = 0): Promise<Lead[]> {
  const { env } = process as any;
  const db: D1Database = env.DB;
  
  try {
    const leads = await db
      .prepare('SELECT * FROM leads WHERE userId = ? AND status = ? ORDER BY score DESC LIMIT ? OFFSET ?')
      .bind(userId, status, limit, offset)
      .all();
    
    return leads.results.map(lead => ({
      ...lead,
      scoreBreakdown: JSON.parse(lead.scoreBreakdown)
    }));
  } catch (error) {
    console.error('Error getting leads by status for user:', error);
    return [];
  }
}
