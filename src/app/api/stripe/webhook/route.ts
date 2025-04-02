
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { getServerUser } from '@/lib/auth/auth';
import { getSubscriptionForUser, updateSubscription } from '@/lib/db/mongodb';

// Initialize Stripe with the provided secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2023-10-16',
});

// Webhook handler for Stripe events
export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const payload = await request.text();
    const signature = request.headers.get('stripe-signature') || '';
    
    // Verify webhook signature
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || '';
    let event;
    
    try {
      event = stripe.webhooks.constructEvent(payload, signature, webhookSecret);
    } catch (err) {
      console.error('Webhook signature verification failed:', err);
      return NextResponse.json(
        { success: false, message: 'Webhook signature verification failed' },
        { status: 400 }
      );
    }
    
    // Handle different event types
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        
        // Extract user ID and plan ID from metadata
        const userId = session.metadata?.userId;
        const planId = session.metadata?.planId;
        
        if (!userId || !planId) {
          console.error('Missing metadata in checkout session:', session.id);
          return NextResponse.json(
            { success: false, message: 'Missing metadata in checkout session' },
            { status: 400 }
          );
        }
        
        // Get subscription details from Stripe
        const stripeSubscriptionId = session.subscription as string;
        const subscription = await stripe.subscriptions.retrieve(stripeSubscriptionId);
        
        // Get current period dates
        const currentPeriodStart = new Date(subscription.current_period_start * 1000).toISOString();
        const currentPeriodEnd = new Date(subscription.current_period_end * 1000).toISOString();
        
        // Get existing subscription for user
        const existingSubscription = await getSubscriptionForUser(userId);
        
        if (existingSubscription) {
          // Update existing subscription
          await updateSubscription(existingSubscription.id, {
            plan: planId,
            status: 'active',
            currentPeriodStart,
            currentPeriodEnd,
            stripeCustomerId: session.customer as string,
            stripeSubscriptionId
          });
        } else {
          // Create new subscription (handled by the subscription API route)
          // This is just a fallback in case the subscription wasn't created
          await fetch(`${request.headers.get('origin')}/api/subscription`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              userId,
              planId,
              stripeCustomerId: session.customer,
              stripeSubscriptionId,
              currentPeriodStart,
              currentPeriodEnd
            }),
          });
        }
        
        break;
      }
      
      case 'invoice.payment_succeeded': {
        const invoice = event.data.object as Stripe.Invoice;
        const subscriptionId = invoice.subscription as string;
        
        if (subscriptionId) {
          // Get subscription details from Stripe
          const subscription = await stripe.subscriptions.retrieve(subscriptionId);
          
          // Find user subscription by Stripe subscription ID
          const { subscriptions } = await import('@/lib/db/mongodb');
          const userSubscription = await subscriptions.findOne({ stripeSubscriptionId: subscriptionId });
          
          if (userSubscription) {
            // Update subscription period
            await updateSubscription(userSubscription.id, {
              currentPeriodStart: new Date(subscription.current_period_start * 1000).toISOString(),
              currentPeriodEnd: new Date(subscription.current_period_end * 1000).toISOString(),
              status: 'active'
            });
          }
        }
        
        break;
      }
      
      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription;
        
        // Find user subscription by Stripe subscription ID
        const { subscriptions } = await import('@/lib/db/mongodb');
        const userSubscription = await subscriptions.findOne({ stripeSubscriptionId: subscription.id });
        
        if (userSubscription) {
          // Update subscription status
          await updateSubscription(userSubscription.id, {
            status: subscription.status,
            currentPeriodStart: new Date(subscription.current_period_start * 1000).toISOString(),
            currentPeriodEnd: new Date(subscription.current_period_end * 1000).toISOString()
          });
        }
        
        break;
      }
      
      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        
        // Find user subscription by Stripe subscription ID
        const { subscriptions } = await import('@/lib/db/mongodb');
        const userSubscription = await subscriptions.findOne({ stripeSubscriptionId: subscription.id });
        
        if (userSubscription) {
          // Update subscription status to canceled
          await updateSubscription(userSubscription.id, {
            status: 'canceled'
          });
        }
        
        break;
      }
    }
    
    return NextResponse.json({ success: true, received: true });
  } catch (error) {
    console.error('Stripe webhook error:', error);
    return NextResponse.json(
      { success: false, message: 'Webhook error' },
      { status: 500 }
    );
  }
}

// Get Stripe configuration
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
    
    return NextResponse.json({
      success: true,
      publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
    });
  } catch (error) {
    console.error('Get Stripe config error:', error);
    return NextResponse.json(
      { success: false, message: 'An error occurred while fetching Stripe configuration' },
      { status: 500 }
    );
  }
}
