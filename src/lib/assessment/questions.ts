// Assessment question types
export type QuestionType = 'text' | 'select' | 'multiselect' | 'range' | 'radio';

// Assessment question interface
export interface AssessmentQuestion {
  id: string;
  type: QuestionType;
  question: string;
  description?: string;
  options?: { value: string; label: string }[];
  min?: number;
  max?: number;
  minLabel?: string;
  maxLabel?: string;
}

// Assessment questions array
export const assessmentQuestions: AssessmentQuestion[] = [
  {
    id: 'industry',
    type: 'select',
    question: 'What industry does your ideal client work in?',
    description: 'Select the primary industry where your target clients operate.',
    options: [
      { value: 'technology', label: 'Technology & Software' },
      { value: 'finance', label: 'Finance & Banking' },
      { value: 'healthcare', label: 'Healthcare & Medical' },
      { value: 'education', label: 'Education & Training' },
      { value: 'manufacturing', label: 'Manufacturing & Industrial' },
      { value: 'retail', label: 'Retail & E-commerce' },
      { value: 'marketing', label: 'Marketing & Advertising' },
      { value: 'consulting', label: 'Consulting & Professional Services' },
      { value: 'real_estate', label: 'Real Estate & Construction' },
      { value: 'nonprofit', label: 'Nonprofit & NGO' },
      { value: 'other', label: 'Other' }
    ]
  },
  {
    id: 'company_size',
    type: 'radio',
    question: 'What size company does your ideal client work for?',
    description: 'Select the employee count range that best describes your target clients.',
    options: [
      { value: 'solo', label: 'Solo (1 employee)' },
      { value: 'micro', label: 'Micro (2-10 employees)' },
      { value: 'small', label: 'Small (11-50 employees)' },
      { value: 'medium', label: 'Medium (51-200 employees)' },
      { value: 'large', label: 'Large (201-1000 employees)' },
      { value: 'enterprise', label: 'Enterprise (1000+ employees)' }
    ]
  },
  {
    id: 'decision_maker',
    type: 'multiselect',
    question: 'What job titles do your ideal clients typically have?',
    description: 'Select all the job titles or positions that describe your target decision-makers.',
    options: [
      { value: 'ceo', label: 'CEO / Founder / Owner' },
      { value: 'cto', label: 'CTO / Technical Director' },
      { value: 'cfo', label: 'CFO / Finance Director' },
      { value: 'cmo', label: 'CMO / Marketing Director' },
      { value: 'coo', label: 'COO / Operations Director' },
      { value: 'vp', label: 'VP / Senior Vice President' },
      { value: 'director', label: 'Director / Department Head' },
      { value: 'manager', label: 'Manager / Team Lead' },
      { value: 'consultant', label: 'Consultant / Specialist' },
      { value: 'other', label: 'Other' }
    ]
  },
  {
    id: 'pain_points',
    type: 'multiselect',
    question: 'What are the top pain points your solution addresses?',
    description: 'Select the key challenges or problems that your product/service solves.',
    options: [
      { value: 'time', label: 'Lack of time / Inefficiency' },
      { value: 'cost', label: 'High costs / Budget constraints' },
      { value: 'quality', label: 'Quality issues / Inconsistency' },
      { value: 'growth', label: 'Slow growth / Customer acquisition' },
      { value: 'retention', label: 'Customer retention / Churn' },
      { value: 'competition', label: 'Competitive pressure' },
      { value: 'technology', label: 'Technology adoption / Digital transformation' },
      { value: 'talent', label: 'Talent acquisition / Skills gap' },
      { value: 'compliance', label: 'Regulatory compliance / Legal issues' },
      { value: 'other', label: 'Other' }
    ]
  },
  {
    id: 'budget',
    type: 'range',
    question: 'What is the typical budget range for your services?',
    description: 'Drag the slider to indicate the price range your ideal clients are willing to pay.',
    min: 1,
    max: 5,
    minLabel: 'Under $1,000',
    maxLabel: '$50,000+'
  },
  {
    id: 'buying_cycle',
    type: 'radio',
    question: 'How long is your typical sales cycle?',
    description: 'Select the timeframe that best represents your average time from lead to close.',
    options: [
      { value: 'immediate', label: 'Immediate (1-7 days)' },
      { value: 'short', label: 'Short (1-4 weeks)' },
      { value: 'medium', label: 'Medium (1-3 months)' },
      { value: 'long', label: 'Long (3-6 months)' },
      { value: 'very_long', label: 'Very long (6+ months)' }
    ]
  },
  {
    id: 'geography',
    type: 'select',
    question: 'Where are your ideal clients located?',
    description: 'Select the primary geographic region where your target clients are based.',
    options: [
      { value: 'local', label: 'Local (within my city/region)' },
      { value: 'national', label: 'National (within my country)' },
      { value: 'north_america', label: 'North America' },
      { value: 'europe', label: 'Europe' },
      { value: 'asia_pacific', label: 'Asia-Pacific' },
      { value: 'global', label: 'Global (worldwide)' }
    ]
  },
  {
    id: 'interests',
    type: 'multiselect',
    question: 'What topics or interests are relevant to your ideal clients?',
    description: 'Select the topics your ideal clients are likely to engage with on LinkedIn.',
    options: [
      { value: 'innovation', label: 'Innovation & Technology Trends' },
      { value: 'leadership', label: 'Leadership & Management' },
      { value: 'marketing', label: 'Marketing & Sales Strategies' },
      { value: 'productivity', label: 'Productivity & Efficiency' },
      { value: 'finance', label: 'Finance & Investment' },
      { value: 'sustainability', label: 'Sustainability & Social Impact' },
      { value: 'industry_news', label: 'Industry News & Updates' },
      { value: 'professional_development', label: 'Professional Development' },
      { value: 'entrepreneurship', label: 'Entrepreneurship & Startups' },
      { value: 'other', label: 'Other' }
    ]
  },
  {
    id: 'engagement_signals',
    type: 'multiselect',
    question: 'What engagement signals indicate a high-quality lead?',
    description: 'Select the LinkedIn activities that suggest someone might be interested in your offering.',
    options: [
      { value: 'post_engagement', label: 'Engages with posts in your industry' },
      { value: 'content_creation', label: 'Creates content related to your solution area' },
      { value: 'group_activity', label: 'Active in relevant LinkedIn groups' },
      { value: 'job_changes', label: 'Recent job changes or promotions' },
      { value: 'company_growth', label: 'Works at a company in growth phase' },
      { value: 'connection_network', label: 'Connected to your existing clients' },
      { value: 'event_attendance', label: 'Attends industry events or webinars' },
      { value: 'profile_updates', label: 'Frequently updates professional profile' },
      { value: 'comment_quality', label: 'Leaves thoughtful comments on content' },
      { value: 'other', label: 'Other' }
    ]
  },
  {
    id: 'objections',
    type: 'multiselect',
    question: 'What are the common objections you face from prospects?',
    description: 'Select the typical reasons prospects give for not moving forward.',
    options: [
      { value: 'price', label: 'Price / Too expensive' },
      { value: 'timing', label: 'Timing / Not right now' },
      { value: 'need', label: 'No perceived need / "We're fine as is"' },
      { value: 'competition', label: 'Using a competitor / Alternative solution' },
      { value: 'approval', label: 'Need approval from others' },
      { value: 'risk', label: 'Perceived risk / Uncertainty' },
      { value: 'roi', label: 'Unclear ROI / Value proposition' },
      { value: 'implementation', label: 'Implementation concerns / Complexity' },
      { value: 'trust', label: 'Trust / Credibility concerns' },
      { value: 'other', label: 'Other' }
    ]
  }
];

// Function to get default answers
export function getDefaultAnswers(): Record<string, any> {
  return assessmentQuestions.reduce((acc, question) => {
    if (question.type === 'multiselect') {
      acc[question.id] = [];
    } else if (question.type === 'range') {
      acc[question.id] = Math.floor((question.min || 1) + (question.max || 5)) / 2;
    } else {
      acc[question.id] = '';
    }
    return acc;
  }, {} as Record<string, any>);
}
