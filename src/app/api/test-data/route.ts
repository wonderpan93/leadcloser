import { NextResponse } from 'next/server';

// Sample test data for the application
const testData = {
  // Sample users
  users: [
    {
      id: 'user_1',
      email: 'demo@leadcloser.co',
      name: 'Demo User',
      password: '$2a$10$XJrOmVqvszPGMC.fkdU4/.6LhQa1Hl5LGJv.Z7YQEKYrWGKPXOzFi', // hashed 'password123'
      plan: 'professional',
      createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days ago
      assessmentCompleted: true
    },
    {
      id: 'user_2',
      email: 'test@leadcloser.co',
      name: 'Test Account',
      password: '$2a$10$XJrOmVqvszPGMC.fkdU4/.6LhQa1Hl5LGJv.Z7YQEKYrWGKPXOzFi', // hashed 'password123'
      plan: 'free',
      createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days ago
      assessmentCompleted: false
    },
    {
      id: 'user_3',
      email: 'business@leadcloser.co',
      name: 'Business Account',
      password: '$2a$10$XJrOmVqvszPGMC.fkdU4/.6LhQa1Hl5LGJv.Z7YQEKYrWGKPXOzFi', // hashed 'password123'
      plan: 'business',
      createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(), // 60 days ago
      assessmentCompleted: true
    }
  ],
  
  // Sample assessment questions
  assessmentQuestions: [
    {
      id: 'q1',
      question: 'What industry does your ideal client work in?',
      type: 'multiple_choice',
      options: [
        'Technology/SaaS',
        'Professional Services',
        'E-commerce/Retail',
        'Healthcare',
        'Finance/Insurance',
        'Education',
        'Manufacturing',
        'Other'
      ]
    },
    {
      id: 'q2',
      question: 'What role does your ideal client have?',
      type: 'multiple_choice',
      options: [
        'C-Suite Executive (CEO, CTO, etc.)',
        'Director/VP Level',
        'Manager/Team Lead',
        'Individual Contributor',
        'Business Owner/Founder',
        'Consultant/Freelancer'
      ]
    },
    {
      id: 'q3',
      question: 'What size company does your ideal client work for?',
      type: 'multiple_choice',
      options: [
        'Solopreneur/Freelancer',
        'Small Business (2-10 employees)',
        'Medium Business (11-50 employees)',
        'Mid-Market (51-500 employees)',
        'Enterprise (500+ employees)'
      ]
    },
    {
      id: 'q4',
      question: 'What is the primary challenge your solution helps with?',
      type: 'multiple_choice',
      options: [
        'Increasing revenue/sales',
        'Reducing costs/improving efficiency',
        'Improving customer experience',
        'Solving technical problems',
        'Compliance/risk management',
        'Team productivity/collaboration',
        'Marketing/lead generation',
        'Other'
      ]
    },
    {
      id: 'q5',
      question: 'What geographic regions are you targeting?',
      type: 'multiple_choice',
      options: [
        'North America only',
        'Europe only',
        'Asia-Pacific only',
        'Global - English speaking',
        'Global - all regions'
      ]
    },
    {
      id: 'q6',
      question: 'What is your ideal client\'s budget range for your solution?',
      type: 'multiple_choice',
      options: [
        'Under $1,000',
        '$1,000 - $5,000',
        '$5,000 - $10,000',
        '$10,000 - $50,000',
        '$50,000+'
      ]
    },
    {
      id: 'q7',
      question: 'How tech-savvy is your ideal client?',
      type: 'multiple_choice',
      options: [
        'Very tech-savvy (early adopter)',
        'Moderately tech-savvy',
        'Average technical knowledge',
        'Limited technical knowledge',
        'Not tech-savvy at all'
      ]
    },
    {
      id: 'q8',
      question: 'What content topics would your ideal client engage with?',
      type: 'multiple_choice',
      options: [
        'Industry trends and news',
        'How-to guides and tutorials',
        'Case studies and success stories',
        'Data and research reports',
        'Thought leadership and opinion pieces',
        'Product/service information'
      ]
    },
    {
      id: 'q9',
      question: 'What is the typical sales cycle length for your solution?',
      type: 'multiple_choice',
      options: [
        'Less than 1 week',
        '1-4 weeks',
        '1-3 months',
        '3-6 months',
        '6+ months'
      ]
    },
    {
      id: 'q10',
      question: 'What is the most important factor in your client\'s decision-making process?',
      type: 'multiple_choice',
      options: [
        'Price/budget',
        'ROI/value',
        'Ease of implementation',
        'Features/capabilities',
        'Support/service',
        'Reputation/trust',
        'Timeline/speed'
      ]
    }
  ],
  
  // Sample assessment results for demo user
  assessmentResults: {
    userId: 'user_1',
    answers: [
      { questionId: 'q1', answer: 'Professional Services' },
      { questionId: 'q2', answer: 'Business Owner/Founder' },
      { questionId: 'q3', answer: 'Small Business (2-10 employees)' },
      { questionId: 'q4', answer: 'Marketing/lead generation' },
      { questionId: 'q5', answer: 'North America only' },
      { questionId: 'q6', answer: '$1,000 - $5,000' },
      { questionId: 'q7', answer: 'Moderately tech-savvy' },
      { questionId: 'q8', answer: 'How-to guides and tutorials' },
      { questionId: 'q9', answer: '1-4 weeks' },
      { questionId: 'q10', answer: 'ROI/value' }
    ],
    idealClientProfile: {
      industry: 'Professional Services',
      role: 'Business Owner/Founder',
      companySize: 'Small Business (2-10 employees)',
      primaryChallenge: 'Marketing/lead generation',
      region: 'North America only',
      budget: '$1,000 - $5,000',
      techSavviness: 'Moderately tech-savvy',
      contentPreferences: 'How-to guides and tutorials',
      salesCycle: '1-4 weeks',
      decisionFactor: 'ROI/value'
    },
    completedAt: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString() // 25 days ago
  },
  
  // Sample leads for demo user
  leads: [
    {
      id: 'lead_1',
      userId: 'user_1',
      name: 'Sarah Johnson',
      title: 'Marketing Director',
      company: 'Bright Ideas Consulting',
      linkedinUrl: 'https://www.linkedin.com/in/sarah-johnson-123456/',
      profilePicture: 'https://randomuser.me/api/portraits/women/1.jpg',
      score: 92,
      scoreBreakdown: {
        engagementLevel: { score: 88, weight: 0.3, description: 'High engagement with similar content' },
        roleRelevance: { score: 95, weight: 0.25, description: 'Direct decision maker for marketing services' },
        connectionProximity: { score: 85, weight: 0.2, description: '12 mutual connections' },
        activityRecency: { score: 98, weight: 0.15, description: 'Active 2 days ago' },
        contentAlignment: { score: 94, weight: 0.1, description: 'Regularly engages with marketing content' }
      },
      status: 'new',
      notes: '',
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString() // 2 days ago
    },
    {
      id: 'lead_2',
      userId: 'user_1',
      name: 'Michael Chen',
      title: 'Founder & CEO',
      company: 'TechStart Solutions',
      linkedinUrl: 'https://www.linkedin.com/in/michael-chen-789012/',
      profilePicture: 'https://randomuser.me/api/portraits/men/2.jpg',
      score: 87,
      scoreBreakdown: {
        engagementLevel: { score: 82, weight: 0.3, description: 'Moderate engagement with similar content' },
        roleRelevance: { score: 98, weight: 0.25, description: 'Founder with direct decision-making authority' },
        connectionProximity: { score: 90, weight: 0.2, description: '8 mutual connections' },
        activityRecency: { score: 75, weight: 0.15, description: 'Active 5 days ago' },
        contentAlignment: { score: 85, weight: 0.1, description: 'Occasionally engages with marketing content' }
      },
      status: 'contacted',
      notes: 'Sent connection request on 3/25',
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString() // 5 days ago
    },
    {
      id: 'lead_3',
      userId: 'user_1',
      name: 'Emily Rodriguez',
      title: 'Business Development Manager',
      company: 'Growth Partners LLC',
      linkedinUrl: 'https://www.linkedin.com/in/emily-rodriguez-345678/',
      profilePicture: 'https://randomuser.me/api/portraits/women/3.jpg',
      score: 84,
      scoreBreakdown: {
        engagementLevel: { score: 78, weight: 0.3, description: 'Moderate engagement with similar content' },
        roleRelevance: { score: 92, weight: 0.25, description: 'Involved in business growth decisions' },
        connectionProximity: { score: 80, weight: 0.2, description: '5 mutual connections' },
        activityRecency: { score: 95, weight: 0.15, description: 'Active 1 day ago' },
        contentAlignment: { score: 75, weight: 0.1, description: 'Sometimes engages with marketing content' }
      },
      status: 'in_conversation',
      notes: 'Discussing potential needs for Q2 campaign',
      createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString() // 10 days ago
    },
    {
      id: 'lead_4',
      userId: 'user_1',
      name: 'David Wilson',
      title: 'Owner',
      company: 'Wilson Financial Services',
      linkedinUrl: 'https://www.linkedin.com/in/david-wilson-901234/',
      profilePicture: 'https://randomuser.me/api/portraits/men/4.jpg',
      score: 79,
      scoreBreakdown: {
        engagementLevel: { score: 72, weight: 0.3, description: 'Occasional engagement with similar content' },
        roleRelevance: { score: 95, weight: 0.25, description: 'Owner with direct decision-making authority' },
        connectionProximity: { score: 65, weight: 0.2, description: '3 mutual connections' },
        activityRecency: { score: 85, weight: 0.15, description: 'Active 3 days ago' },
        contentAlignment: { score: 80, weight: 0.1, description: 'Regularly engages with business content' }
      },
      status: 'qualified',
      notes: 'Interested in services for Q3',
      createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString() // 15 days ago
    },
    {
      id: 'lead_5',
      userId: 'user_1',
      name: 'Jennifer Lee',
      title: 'Marketing Manager',
      company: 'Innovative Retail Group',
      linkedinUrl: 'https://www.linkedin.com/in/jennifer-lee-567890/',
      profilePicture: 'https://randomuser.me/api/portraits/women/5.jpg',
      score: 76,
      scoreBreakdown: {
        engagementLevel: { score: 70, weight: 0.3, description: 'Occasional engagement with similar content' },
        roleRelevance: { score: 85, weight: 0.25, description: 'Influences marketing decisions' },
        connectionProximity: { score: 75, weight: 0.2, description: '4 mutual connections' },
        activityRecency: { score: 80, weight: 0.15, description: 'Active 4 days ago' },
        contentAlignment: { score: 70, weight: 0.1, description: 'Sometimes engages with marketing content' }
      },
      status: 'not_interested',
      notes: 'Currently working with another agency',
      createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString() // 20 days ago
    }
  ],
  
  // Sample subscription plans
  subscriptionPlans: [
    {
      id: 'free',
      name: 'Free',
      price: 0,
      features: [
        'Generate up to 10 leads per month',
        'Basic lead scoring',
        'Email support',
        'Standard lead cards'
      ],
      leadLimit: 10,
      stripePriceId: null
    },
    {
      id: 'professional',
      name: 'Professional',
      price: 29,
      originalPrice: 59,
      discount: '50% OFF',
      features: [
        'Generate up to 50 leads per month',
        'Advanced lead scoring',
        'Detailed score breakdown',
        'Export leads to CSV',
        'Priority email support',
        'Lead status tracking'
      ],
      leadLimit: 50,
      stripePriceId: 'price_1R7kXYPotPgF3lNnabcdefghi'
    },
    {
      id: 'business',
      name: 'Business',
      price: 79,
      originalPrice: 159,
      discount: '50% OFF',
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
      leadLimit: 200,
      stripePriceId: 'price_1R7kXYPotPgF3lNnjklmnopqr'
    }
  ],
  
  // Sample subscription for demo user
  subscriptions: [
    {
      id: 'sub_1',
      userId: 'user_1',
      planId: 'professional',
      status: 'active',
      currentPeriodStart: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(), // 15 days ago
      currentPeriodEnd: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(), // 15 days from now
      cancelAtPeriodEnd: false,
      stripeSubscriptionId: 'sub_1R7kXYPotPgF3lNnstuvwxyz'
    }
  ]
};

// API route handler
export async function GET() {
  return NextResponse.json({
    success: true,
    message: 'Test data retrieved successfully',
    data: testData
  });
}

// This route is for testing purposes only and should be removed in production
export async function POST(request) {
  try {
    const body = await request.json();
    const { type, id } = body;
    
    if (!type || !id) {
      return NextResponse.json({
        success: false,
        message: 'Missing required parameters'
      }, { status: 400 });
    }
    
    // Return specific test data based on type and id
    if (type === 'user' && id) {
      const user = testData.users.find(u => u.id === id);
      if (!user) {
        return NextResponse.json({
          success: false,
          message: 'User not found'
        }, { status: 404 });
      }
      return NextResponse.json({
        success: true,
        message: 'User retrieved successfully',
        data: user
      });
    }
    
    if (type === 'leads' && id) {
      const userLeads = testData.leads.filter(l => l.userId === id);
      return NextResponse.json({
        success: true,
        message: 'Leads retrieved successfully',
        data: userLeads
      });
    }
    
    if (type === 'assessment' && id) {
      if (id === 'questions') {
        return NextResponse.json({
          success: true,
          message: 'Assessment questions retrieved successfully',
          data: testData.assessmentQuestions
        });
      }
      
      const userAssessment = testData.assessmentResults.userId === id ? testData.assessmentResults : null;
      if (!userAssessment) {
        return NextResponse.json({
          success: false,
          message: 'Assessment not found'
        }, { status: 404 });
      }
      return NextResponse.json({
        success: true,
        message: 'Assessment retrieved successfully',
        data: userAssessment
      });
    }
    
    if (type === 'subscription' && id) {
      const userSubscription = testData.subscriptions.find(s => s.userId === id);
      if (!userSubscription) {
        return NextResponse.json({
          success: false,
          message: 'Subscription not found'
        }, { status: 404 });
      }
      return NextResponse.json({
        success: true,
        message: 'Subscription retrieved successfully',
        data: userSubscription
      });
    }
    
    if (type === 'plans') {
      return NextResponse.json({
        success: true,
        message: 'Subscription plans retrieved successfully',
        data: testData.subscriptionPlans
      });
    }
    
    return NextResponse.json({
      success: false,
      message: 'Invalid type or id'
    }, { status: 400 });
    
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: 'Error processing request',
      error: error.message
    }, { status: 500 });
  }
}
