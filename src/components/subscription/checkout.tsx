import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { SubscriptionPlan } from '@/components/subscription/plans';
import { useRouter } from 'next/navigation';

// Initialize Stripe with publishable key
let stripePromise: Promise<any> | null = null;

const getStripe = async () => {
  if (!stripePromise) {
    // Fetch publishable key from API
    const response = await fetch('/api/stripe/webhook');
    const { publishableKey } = await response.json();
    stripePromise = loadStripe(publishableKey);
  }
  return stripePromise;
};

interface CheckoutButtonProps {
  plan: SubscriptionPlan;
  disabled?: boolean;
}

export function CheckoutButton({ plan, disabled = false }: CheckoutButtonProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const router = useRouter();

  const handleCheckout = async () => {
    setIsLoading(true);

    try {
      // For free plan, just create subscription directly
      if (plan.price === 0) {
        const response = await fetch('/api/subscription', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ planId: plan.id }),
        });

        const data = await response.json();

        if (data.success) {
          router.push('/dashboard?subscription=success');
        } else {
          throw new Error(data.message || 'Failed to create subscription');
        }
      } else {
        // For paid plans, redirect to Stripe checkout
        const response = await fetch('/api/subscription', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ planId: plan.id }),
        });

        const data = await response.json();

        if (data.checkoutUrl) {
          window.location.href = data.checkoutUrl;
        } else {
          throw new Error('Failed to create checkout session');
        }
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert('An error occurred during checkout. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={handleCheckout}
      disabled={disabled || isLoading}
      className="w-full"
    >
      {isLoading ? 'Processing...' : plan.price === 0 ? 'Start Free Plan' : `Subscribe for $${plan.price}/month`}
    </Button>
  );
}

interface StripeCheckoutProps {
  children: React.ReactNode;
}

export function StripeCheckout({ children }: StripeCheckoutProps) {
  const [stripeLoaded, setStripeLoaded] = React.useState<boolean>(false);
  const [stripeInstance, setStripeInstance] = React.useState<any>(null);

  React.useEffect(() => {
    const loadStripeInstance = async () => {
      const stripe = await getStripe();
      setStripeInstance(stripe);
      setStripeLoaded(true);
    };

    loadStripeInstance();
  }, []);

  if (!stripeLoaded || !stripeInstance) {
    return (
      <div className="flex items-center justify-center p-8">
        <p>Loading payment system...</p>
      </div>
    );
  }

  return (
    <Elements stripe={stripeInstance}>
      {children}
    </Elements>
  );
}

interface SubscriptionSuccessProps {
  planName: string;
  onContinue: () => void;
}

export function SubscriptionSuccess({ planName, onContinue }: SubscriptionSuccessProps) {
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Subscription Successful!</CardTitle>
        <CardDescription className="text-center">
          Thank you for subscribing to the {planName} plan
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-center">
          <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-8 w-8 text-green-600"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>
        <p className="text-center">
          Your subscription has been activated successfully. You now have access to all the features included in the {planName} plan.
        </p>
      </CardContent>
      <CardFooter>
        <Button onClick={onContinue} className="w-full">
          Continue to Dashboard
        </Button>
      </CardFooter>
    </Card>
  );
}

interface SubscriptionCanceledProps {
  onTryAgain: () => void;
}

export function SubscriptionCanceled({ onTryAgain }: SubscriptionCanceledProps) {
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Subscription Canceled</CardTitle>
        <CardDescription className="text-center">
          Your subscription process was canceled
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-center">
          <div className="h-16 w-16 rounded-full bg-yellow-100 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-8 w-8 text-yellow-600"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
        </div>
        <p className="text-center">
          The subscription process was canceled. No charges have been made to your account.
        </p>
      </CardContent>
      <CardFooter>
        <Button onClick={onTryAgain} className="w-full">
          Try Again
        </Button>
      </CardFooter>
    </Card>
  );
}
