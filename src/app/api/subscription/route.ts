//handling API routes
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

import { NextRequest, NextResponse } from 'next/server';
import { getServerUser } from '@/lib/auth/auth';
import { getSubscriptionForUser, createSubscription, updateSubscription } from '@/lib/db/subscriptions';
import { subscriptionPlans } from '@/components/subscription/plans';
import Stripe from 'stripe';

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2023-10-16',
});

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    // Get authenticated user
    const user = await getServerUser();
    
    if (!user) {
      return NextResponse.json(
        { success: false, message: 'Authentication required' },
        { status: 401 }
      );
    }
    
    // Get subscription for user
    const subscription = await getSubscriptionForUser(user.id);
    
    return NextResponse.json({
      success: true,
      subscription
    });
  } catch (error) {
    console.error('Get subscription error:', error);
    return NextResponse.json(
      { success: false, message: 'An error occurred while fetching subscription data' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    // Get authenticated user
    const user = await getServerUser();
    
    if (!user) {
      return NextResponse.json(
        { success: false, message: 'Authentication required' },
        { status: 401 }
      );
    }
    
    // Get plan ID from request
    const { planId } = await request.json();
    
    if (!planId) {
      return NextResponse.json(
        { success: false, message: 'Plan ID is required' },
        { status: 400 }
      );
    }
    
    // Find plan by ID
    const plan = subscriptionPlans.find(p => p.id === planId);
    
    if (!plan) {
      return NextResponse.json(
        { success: false, message: 'Invalid plan ID' },
        { status: 400 }
      );
    }
    
    // Get current subscription for user
    const currentSubscription = await getSubscriptionForUser(user.id);
    
    // If plan is free, create subscription without Stripe
    if (plan.price === 0) {
      const now = new Date();
      const nextMonth = new Date(now);
      nextMonth.setMonth(nextMonth.getMonth() + 1);
      
      if (currentSubscription) {
        // Update existing subscription
        const updatedSubscription = await updateSubscription(currentSubscription.id, {
          plan: plan.id,
          status: 'active',
          currentPeriodStart: now.toISOString(),
          currentPeriodEnd: nextMonth.toISOString(),
          stripeCustomerId: null,
          stripeSubscriptionId: null
        });
        
        return NextResponse.json({
          success: true,
          message: 'Subscription updated successfully',
          subscription: updatedSubscription
        });
      } else {
        // Create new subscription
        const newSubscription = await createSubscription({
          userId: user.id,
          plan: plan.id,
          status: 'active',
          currentPeriodStart: now.toISOString(),
          currentPeriodEnd: nextMonth.toISOString()
        });
        
        return NextResponse.json({
          success: true,
          message: 'Subscription created successfully',
          subscription: newSubscription
        });
      }
    }
    
    // For paid plans, create Stripe checkout session
    let customerId = currentSubscription?.stripeCustomerId;
    
    // If no customer ID exists, create a new customer
    if (!customerId) {
      const customer = await stripe.customers.create({
        email: user.email,
        name: user.name,
        metadata: {
          userId: user.id
        }
      });
      
      customerId = customer.id;
    }
    
    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `LeadCloser ${plan.name} Plan`,
              description: plan.description
            },
            unit_amount: plan.price * 100, // Convert to cents
            recurring: {
              interval: 'month'
            }
          },
          quantity: 1
        }
      ],
      mode: 'subscription',
      success_url: `${request.headers.get('origin')}/dashboard?subscription=success`,
      cancel_url: `${request.headers.get('origin')}/pricing?subscription=canceled`,
      metadata: {
        userId: user.id,
        planId: plan.id
      }
    });
    
    return NextResponse.json({
      success: true,
      checkoutUrl: session.url
    });
  } catch (error) {
    console.error('Create subscription error:', error);
    return NextResponse.json(
      { success: false, message: 'An error occurred while creating subscription' },
      { status: 500 }
    );
  }
}
