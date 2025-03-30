# Deployment Guide for LeadCloser

This guide provides detailed instructions for deploying the LeadCloser application to Vercel.

## Prerequisites

Before you begin, ensure you have:

1. A GitHub, GitLab, or Bitbucket account
2. A Vercel account (sign up at [vercel.com](https://vercel.com))
3. A MongoDB Atlas account (for database)
4. A Stripe account (for payment processing)

## Step 1: Prepare Your Environment Variables

The LeadCloser application requires several environment variables to function properly. Create a `.env.local` file in the root of your project with the following variables:

```
# MongoDB
MONGODB_URI=mongodb+srv://pseth:pdatabase@2025!@clusterp0.1eeiv.mongodb.net/

# Stripe
STRIPE_PUBLISHABLE_KEY=pk_test_51R7kXYPotPgF3lNnwyXMuritQxFb1lqRmnTi1gGDHJXDr9bmFG9CUOhsLeslRUTnTj3JlJjTpl75fLPZ1IoQD62C00fieZJMDR
STRIPE_SECRET_KEY=sk_test_51R7kXYPotPgF3lNnh1UAKnk32RU54bplakXWqhD2brF5qo9z9ZmBMMTpSUBCTSDpiJmjo2CLnipfTvX7nuqwzkk200RuTl5J7L
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret

# NextAuth
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=https://leadcloser.co

# JWT
JWT_SECRET=your_jwt_secret
```

Note: For production, you should generate secure random strings for `NEXTAUTH_SECRET` and `JWT_SECRET`.

## Step 2: Push Your Code to a Git Repository

1. Initialize a Git repository (if not already done):
   ```bash
   git init
   ```

2. Add all files to the repository:
   ```bash
   git add .
   ```

3. Commit the changes:
   ```bash
   git commit -m "Initial commit"
   ```

4. Create a new repository on GitHub, GitLab, or Bitbucket

5. Add the remote repository:
   ```bash
   git remote add origin <your-repository-url>
   ```

6. Push the code to the remote repository:
   ```bash
   git push -u origin main
   ```

## Step 3: Deploy to Vercel

1. Log in to your [Vercel Dashboard](https://vercel.com/dashboard)

2. Click "New Project"

3. Import your Git repository:
   - Select your Git provider (GitHub, GitLab, or Bitbucket)
   - Authorize Vercel to access your repositories if prompted
   - Select the LeadCloser repository

4. Configure the project:
   - Project Name: `leadcloser` (or your preferred name)
   - Framework Preset: Next.js
   - Root Directory: `./` (or the directory containing your Next.js project)

5. Add Environment Variables:
   - Click "Environment Variables"
   - Add all the variables from your `.env.local` file
   - Make sure to update `NEXTAUTH_URL` to match your Vercel deployment URL or custom domain

6. Click "Deploy"

7. Wait for the deployment to complete

## Step 4: Set Up Stripe Webhook

1. Log in to your [Stripe Dashboard](https://dashboard.stripe.com)

2. Navigate to "Developers" > "Webhooks"

3. Click "Add endpoint"

4. Enter your webhook URL:
   ```
   https://your-vercel-domain.vercel.app/api/stripe/webhook
   ```
   or if using a custom domain:
   ```
   https://leadcloser.co/api/stripe/webhook
   ```

5. Select the following events to listen for:
   - `checkout.session.completed`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_succeeded`
   - `invoice.payment_failed`

6. Click "Add endpoint"

7. Reveal the webhook signing secret and update the `STRIPE_WEBHOOK_SECRET` environment variable in your Vercel project settings

## Step 5: Configure MongoDB

1. Log in to your [MongoDB Atlas Dashboard](https://cloud.mongodb.com)

2. Navigate to "Network Access" and add your Vercel deployment IP to the allowed list, or allow access from anywhere (0.0.0.0/0) for simplicity

3. Navigate to "Database Access" and ensure your database user has the appropriate permissions

4. Verify that your `MONGODB_URI` environment variable in Vercel is correct

## Step 6: Connect Custom Domain (Optional)

If you want to use your custom domain (leadcloser.co):

1. In your Vercel dashboard, select your LeadCloser project

2. Navigate to "Settings" > "Domains"

3. Enter your domain: `leadcloser.co`

4. Follow the instructions to configure your DNS settings

For detailed instructions on connecting your GoDaddy domain, refer to the [DOMAIN_CONNECTION.md](DOMAIN_CONNECTION.md) file.

## Step 7: Verify Deployment

1. Visit your deployed application at the Vercel URL or your custom domain

2. Test the following functionality:
   - User registration and login
   - Assessment questionnaire
   - Lead generation and scoring
   - Subscription management
   - Payment processing

## Troubleshooting

### Deployment Failures

If your deployment fails:

1. Check the Vercel deployment logs for specific errors
2. Verify that all environment variables are correctly set
3. Ensure your Next.js application is properly configured for production

### Database Connection Issues

If you encounter database connection problems:

1. Verify your MongoDB connection string
2. Check that your IP address is allowed in MongoDB Atlas Network Access
3. Ensure your database user has the correct permissions

### Stripe Integration Issues

If Stripe payments aren't working:

1. Verify your Stripe API keys
2. Check that the webhook is properly configured
3. Test with Stripe's test cards (e.g., 4242 4242 4242 4242)

## Updating Your Deployment

To update your deployed application:

1. Make changes to your code locally
2. Commit the changes to your Git repository
3. Push to the remote repository
4. Vercel will automatically deploy the updated code

## Monitoring and Logs

1. Use the Vercel dashboard to monitor your application
2. Check deployment logs for errors
3. Set up Vercel Analytics for performance monitoring

## Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment Documentation](https://nextjs.org/docs/deployment)
- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/)
- [Stripe Documentation](https://stripe.com/docs)

For any additional assistance, contact support@leadcloser.co
