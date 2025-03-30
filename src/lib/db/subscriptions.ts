import { D1Database } from '@cloudflare/workers-types';

export interface Subscription {
  id: string;
  userId: string;
  plan: string;
  status: 'active' | 'canceled' | 'past_due' | 'trialing' | 'incomplete';
  currentPeriodStart: string;
  currentPeriodEnd: string;
  stripeCustomerId?: string | null;
  stripeSubscriptionId?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateSubscriptionParams {
  userId: string;
  plan: string;
  status: 'active' | 'canceled' | 'past_due' | 'trialing' | 'incomplete';
  currentPeriodStart: string;
  currentPeriodEnd: string;
  stripeCustomerId?: string;
  stripeSubscriptionId?: string;
}

// Create subscription
export async function createSubscription(subscriptionData: CreateSubscriptionParams): Promise<Subscription> {
  const { env } = process as any;
  const db: D1Database = env.DB;
  
  const id = crypto.randomUUID();
  const now = new Date().toISOString();
  
  try {
    await db
      .prepare(
        `INSERT INTO subscriptions (
          id, userId, plan, status, currentPeriodStart, currentPeriodEnd,
          stripeCustomerId, stripeSubscriptionId, createdAt, updatedAt
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
      )
      .bind(
        id,
        subscriptionData.userId,
        subscriptionData.plan,
        subscriptionData.status,
        subscriptionData.currentPeriodStart,
        subscriptionData.currentPeriodEnd,
        subscriptionData.stripeCustomerId || null,
        subscriptionData.stripeSubscriptionId || null,
        now,
        now
      )
      .run();
    
    const subscription = await getSubscriptionById(id);
    
    if (!subscription) {
      throw new Error('Failed to create subscription');
    }
    
    return subscription;
  } catch (error) {
    console.error('Error creating subscription:', error);
    throw error;
  }
}

// Get subscription by ID
export async function getSubscriptionById(id: string): Promise<Subscription | null> {
  const { env } = process as any;
  const db: D1Database = env.DB;
  
  try {
    const subscription = await db
      .prepare('SELECT * FROM subscriptions WHERE id = ?')
      .bind(id)
      .first();
    
    return subscription || null;
  } catch (error) {
    console.error('Error getting subscription by ID:', error);
    return null;
  }
}

// Get subscription for user
export async function getSubscriptionForUser(userId: string): Promise<Subscription | null> {
  const { env } = process as any;
  const db: D1Database = env.DB;
  
  try {
    const subscription = await db
      .prepare('SELECT * FROM subscriptions WHERE userId = ? ORDER BY createdAt DESC LIMIT 1')
      .bind(userId)
      .first();
    
    return subscription || null;
  } catch (error) {
    console.error('Error getting subscription for user:', error);
    return null;
  }
}

// Update subscription
export async function updateSubscription(id: string, subscriptionData: Partial<Omit<Subscription, 'id' | 'userId' | 'createdAt' | 'updatedAt'>>): Promise<Subscription | null> {
  const { env } = process as any;
  const db: D1Database = env.DB;
  
  const now = new Date().toISOString();
  const updates: string[] = [];
  const values: any[] = [];
  
  Object.entries(subscriptionData).forEach(([key, value]) => {
    if (value !== undefined) {
      updates.push(`${key} = ?`);
      values.push(value);
    }
  });
  
  if (updates.length === 0) {
    return await getSubscriptionById(id);
  }
  
  updates.push('updatedAt = ?');
  values.push(now);
  values.push(id);
  
  try {
    await db
      .prepare(`UPDATE subscriptions SET ${updates.join(', ')} WHERE id = ?`)
      .bind(...values)
      .run();
    
    return await getSubscriptionById(id);
  } catch (error) {
    console.error('Error updating subscription:', error);
    return null;
  }
}

// Cancel subscription
export async function cancelSubscription(id: string): Promise<Subscription | null> {
  return await updateSubscription(id, { status: 'canceled' });
}

// Delete subscription
export async function deleteSubscription(id: string): Promise<boolean> {
  const { env } = process as any;
  const db: D1Database = env.DB;
  
  try {
    const result = await db
      .prepare('DELETE FROM subscriptions WHERE id = ?')
      .bind(id)
      .run();
    
    return result.success;
  } catch (error) {
    console.error('Error deleting subscription:', error);
    return false;
  }
}
