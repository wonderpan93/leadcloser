import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

// Subscription plan interface
export interface SubscriptionPlan {
  id: string;
  name: string;
  description: string;
  price: number;
  features: string[];
  leadLimit: number;
  highlighted?: boolean;
}

// Subscription plans data
export const subscriptionPlans: SubscriptionPlan[] = [
  {
    id: 'free',
    name: 'Free',
    description: 'Basic lead generation for individuals',
    price: 0,
    features: [
      'Generate up to 10 leads per month',
      'Basic lead scoring',
      'Email support',
      'Standard lead cards'
    ],
    leadLimit: 10
  },
  {
    id: 'professional',
    name: 'Professional',
    description: 'Advanced features for solopreneurs',
    price: 29,
    features: [
      'Generate up to 50 leads per month',
      'Advanced lead scoring',
      'Detailed score breakdown',
      'Export leads to CSV',
      'Priority email support',
      'Lead status tracking'
    ],
    leadLimit: 50,
    highlighted: true
  },
  {
    id: 'business',
    name: 'Business',
    description: 'Powerful tools for growing businesses',
    price: 79,
    features: [
      'Generate up to 200 leads per month',
      'Advanced lead scoring',
      'Detailed score breakdown',
      'Export leads to CSV/Excel',
      'Priority email & phone support',
      'Lead status tracking',
      'Team collaboration (up to 3 users)',
      'Custom lead criteria'
    ],
    leadLimit: 200
  }
];

interface PricingCardProps {
  plan: SubscriptionPlan;
  onSelectPlan: (plan: SubscriptionPlan) => void;
  currentPlan?: string;
}

export function PricingCard({ plan, onSelectPlan, currentPlan }: PricingCardProps) {
  const isCurrentPlan = currentPlan === plan.id;
  
  return (
    <Card className={`flex flex-col ${plan.highlighted ? 'border-primary shadow-lg' : ''}`}>
      <CardHeader>
        <CardTitle className="text-xl">{plan.name}</CardTitle>
        <CardDescription>{plan.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <div className="mb-4">
          <span className="text-3xl font-bold">${plan.price}</span>
          <span className="text-muted-foreground">/month</span>
        </div>
        <ul className="space-y-2 mb-6">
          {plan.features.map((feature, index) => (
            <li key={index} className="flex items-center">
              <Check className="h-4 w-4 mr-2 text-green-500" />
              <span className="text-sm">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full" 
          variant={isCurrentPlan ? "outline" : (plan.highlighted ? "default" : "outline")}
          onClick={() => onSelectPlan(plan)}
          disabled={isCurrentPlan}
        >
          {isCurrentPlan ? 'Current Plan' : 'Select Plan'}
        </Button>
      </CardFooter>
    </Card>
  );
}

interface SubscriptionPlansProps {
  currentPlan?: string;
  onSelectPlan: (plan: SubscriptionPlan) => void;
}

export function SubscriptionPlans({ currentPlan, onSelectPlan }: SubscriptionPlansProps) {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold tracking-tight">Subscription Plans</h2>
        <p className="text-muted-foreground mt-2">
          Choose the perfect plan for your lead generation needs
        </p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-3">
        {subscriptionPlans.map((plan) => (
          <PricingCard 
            key={plan.id} 
            plan={plan} 
            onSelectPlan={onSelectPlan}
            currentPlan={currentPlan}
          />
        ))}
      </div>
    </div>
  );
}

interface SubscriptionDetailsProps {
  plan?: SubscriptionPlan;
  expiryDate?: string;
  onChangePlan: () => void;
  onCancelPlan: () => void;
}

export function SubscriptionDetails({ 
  plan, 
  expiryDate = 'Apr 30, 2025', 
  onChangePlan, 
  onCancelPlan 
}: SubscriptionDetailsProps) {
  if (!plan) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center h-40">
          <p>No active subscription</p>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Current Subscription</CardTitle>
        <CardDescription>
          Your subscription details and management options
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Plan</h3>
            <p className="text-lg font-medium">{plan.name}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Price</h3>
            <p className="text-lg font-medium">${plan.price}/month</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Lead Limit</h3>
            <p className="text-lg font-medium">{plan.leadLimit} leads/month</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Renewal Date</h3>
            <p className="text-lg font-medium">{expiryDate}</p>
          </div>
        </div>
        
        <div className="pt-4">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">Features</h3>
          <ul className="space-y-1">
            {plan.features.map((feature, index) => (
              <li key={index} className="flex items-center">
                <Check className="h-4 w-4 mr-2 text-green-500" />
                <span className="text-sm">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={onCancelPlan}>
          Cancel Subscription
        </Button>
        <Button onClick={onChangePlan}>
          Change Plan
        </Button>
      </CardFooter>
    </Card>
  );
}
