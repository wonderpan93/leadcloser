# LeadCloser - AI-Powered LinkedIn Lead Generation

LeadCloser is a comprehensive lead generation application that helps solopreneurs and small business owners identify and score high-quality LinkedIn prospects based on engagement, role relevance, connection proximity, and other key factors.

## Features

- **User Authentication**: Secure signup/login functionality with JWT
- **10-Question Assessment**: Personalized questionnaire to identify ideal client profiles
- **AI Lead Scoring Algorithm**: Scores leads from 0-100 based on 5 key criteria:
  - Engagement level (30%)
  - Role relevance (25%)
  - Connection proximity (20%)
  - Activity recency (15%)
  - Content alignment (10%)
- **Interactive Dashboard**: Responsive interface to view and manage lead recommendations
- **Detailed Lead Cards**: Transparent scoring breakdown for each lead
- **Subscription Management**: Three pricing tiers with Stripe integration
- **Responsive Design**: Works on all devices with Ghost.org-inspired animations

## Tech Stack

- **Frontend**: Next.js, React, Tailwind CSS, Framer Motion
- **Backend**: Next.js API Routes (Serverless)
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Payment Processing**: Stripe
- **Deployment**: Vercel

## Project Structure

```
leadcloser/
├── public/               # Static assets
│   ├── images/           # Images including logo
│   └── favicon/          # Favicon files
├── src/
│   ├── app/              # Next.js App Router
│   │   ├── api/          # API routes
│   │   │   ├── auth/     # Authentication endpoints
│   │   │   ├── leads/    # Lead generation endpoints
│   │   │   └── stripe/   # Payment processing endpoints
│   │   ├── assessment/   # Assessment pages
│   │   ├── dashboard/    # Dashboard pages
│   │   └── page.tsx      # Landing page
│   ├── components/       # React components
│   │   ├── auth/         # Authentication components
│   │   ├── assessment/   # Assessment components
│   │   ├── dashboard/    # Dashboard components
│   │   ├── landing/      # Landing page components
│   │   ├── leads/        # Lead card components
│   │   ├── layout/       # Layout components
│   │   └── subscription/ # Subscription components
│   ├── lib/              # Utility functions
│   │   ├── auth/         # Authentication utilities
│   │   ├── db/           # Database utilities
│   │   ├── leads/        # Lead scoring algorithm
│   │   └── assessment/   # Assessment questions and logic
│   └── middleware.ts     # Next.js middleware for auth protection
├── migrations/           # Database migrations
├── scripts/              # Utility scripts
├── DEPLOYMENT.md         # Deployment instructions
├── DOMAIN_CONNECTION.md  # Domain connection instructions
├── README.md             # Project overview
└── package.json          # Dependencies and scripts
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm/pnpm
- MongoDB account
- Stripe account

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/leadcloser.git
   cd leadcloser
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory with the following variables:
   ```
   # MongoDB
   MONGODB_URI=
   
   # Stripe
   STRIPE_PUBLISHABLE_KEY=
   STRIPE_SECRET_KEY=
   
   # JWT
   JWT_SECRET=your_jwt_secret_key
   
   # App URL
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

4. Run the development server:
   ```bash
   pnpm dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed instructions on deploying to Vercel.

## Domain Connection

See [DOMAIN_CONNECTION.md](DOMAIN_CONNECTION.md) for instructions on connecting your leadcloser.co domain.

## Testing

To verify the application functionality, you can use the test data API:

1. Start the development server
2. Visit `/api/test-data` to generate sample data
3. Log in with the test credentials:
   - Email: test@example.com
   - Password: password123

## License

This project is proprietary and confidential.

## Support

For support, please contact support@leadcloser.co
