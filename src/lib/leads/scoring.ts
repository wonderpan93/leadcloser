import { User } from '@/lib/auth/auth';

// Lead interface
export interface Lead {
  id: string;
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
  status: LeadStatus;
  createdAt: string;
  updatedAt: string;
}

// Lead status types
export type LeadStatus = 'new' | 'contacted' | 'meeting' | 'proposal' | 'won' | 'lost' | 'archived';

// Score breakdown interface
export interface ScoreBreakdown {
  engagementLevel: number;
  roleRelevance: number;
  connectionProximity: number;
  activityRecency: number;
  contentAlignment: number;
}

// Lead scoring algorithm
export function scoreLeadCandidate(
  candidate: LeadCandidate,
  assessmentAnswers: Record<string, any>,
  user: User
): ScoredLead {
  // Initialize score components
  const scoreBreakdown: ScoreBreakdown = {
    engagementLevel: calculateEngagementScore(candidate, assessmentAnswers),
    roleRelevance: calculateRoleRelevanceScore(candidate, assessmentAnswers),
    connectionProximity: calculateConnectionProximityScore(candidate, user),
    activityRecency: calculateActivityRecencyScore(candidate),
    contentAlignment: calculateContentAlignmentScore(candidate, assessmentAnswers)
  };

  // Calculate total score (weighted average)
  const totalScore = Math.round(
    (scoreBreakdown.engagementLevel * 0.3) +
    (scoreBreakdown.roleRelevance * 0.25) +
    (scoreBreakdown.connectionProximity * 0.2) +
    (scoreBreakdown.activityRecency * 0.15) +
    (scoreBreakdown.contentAlignment * 0.1)
  );

  return {
    ...candidate,
    score: totalScore,
    scoreBreakdown
  };
}

// Calculate engagement level score (30% of total)
function calculateEngagementScore(candidate: LeadCandidate, assessmentAnswers: Record<string, any>): number {
  let score = 0;
  
  // Check if candidate engages with content related to user's industry
  if (candidate.engagementMetrics.postEngagements > 5) {
    score += 20;
  } else if (candidate.engagementMetrics.postEngagements > 0) {
    score += 10;
  }
  
  // Check if candidate creates content
  if (candidate.engagementMetrics.contentCreated > 3) {
    score += 25;
  } else if (candidate.engagementMetrics.contentCreated > 0) {
    score += 15;
  }
  
  // Check if candidate is active in relevant groups
  if (candidate.engagementMetrics.groupActivity > 3) {
    score += 20;
  } else if (candidate.engagementMetrics.groupActivity > 0) {
    score += 10;
  }
  
  // Check if candidate comments on posts
  if (candidate.engagementMetrics.comments > 5) {
    score += 20;
  } else if (candidate.engagementMetrics.comments > 0) {
    score += 10;
  }
  
  // Check if candidate attends industry events
  if (candidate.engagementMetrics.eventAttendance > 0) {
    score += 15;
  }
  
  // Normalize score to 0-100 range
  return Math.min(100, score);
}

// Calculate role relevance score (25% of total)
function calculateRoleRelevanceScore(candidate: LeadCandidate, assessmentAnswers: Record<string, any>): number {
  let score = 0;
  
  // Check if candidate's job title matches target titles from assessment
  const targetTitles = assessmentAnswers.decision_maker || [];
  if (Array.isArray(targetTitles) && targetTitles.length > 0) {
    const candidateTitle = candidate.title?.toLowerCase() || '';
    
    // Direct match with selected titles
    if (targetTitles.some(title => 
      candidateTitle.includes(title) || 
      (title === 'ceo' && (candidateTitle.includes('chief executive') || candidateTitle.includes('founder') || candidateTitle.includes('owner'))) ||
      (title === 'cto' && (candidateTitle.includes('chief technical') || candidateTitle.includes('technical director'))) ||
      (title === 'cfo' && (candidateTitle.includes('chief financial') || candidateTitle.includes('finance director'))) ||
      (title === 'cmo' && (candidateTitle.includes('chief marketing') || candidateTitle.includes('marketing director'))) ||
      (title === 'coo' && (candidateTitle.includes('chief operating') || candidateTitle.includes('operations director'))) ||
      (title === 'vp' && (candidateTitle.includes('vice president') || candidateTitle.includes('vp') || candidateTitle.includes('senior vice'))) ||
      (title === 'director' && (candidateTitle.includes('director') || candidateTitle.includes('head of'))) ||
      (title === 'manager' && (candidateTitle.includes('manager') || candidateTitle.includes('lead'))) ||
      (title === 'consultant' && (candidateTitle.includes('consultant') || candidateTitle.includes('specialist')))
    )) {
      score += 50;
    }
    // Partial match
    else if (targetTitles.some(title => 
      candidateTitle.includes(title.substring(0, 3))
    )) {
      score += 25;
    }
  }
  
  // Check if candidate's industry matches target industry from assessment
  const targetIndustry = assessmentAnswers.industry || '';
  if (targetIndustry && candidate.industry) {
    if (candidate.industry.toLowerCase() === targetIndustry.toLowerCase()) {
      score += 30;
    }
  }
  
  // Check if candidate's company size matches target company size from assessment
  const targetCompanySize = assessmentAnswers.company_size || '';
  if (targetCompanySize && candidate.companySize) {
    if (candidate.companySize === targetCompanySize) {
      score += 20;
    }
  }
  
  // Normalize score to 0-100 range
  return Math.min(100, score);
}

// Calculate connection proximity score (20% of total)
function calculateConnectionProximityScore(candidate: LeadCandidate, user: User): number {
  let score = 0;
  
  // Check connection degree
  switch (candidate.connectionDegree) {
    case 1:
      // 1st-degree connection (directly connected)
      score += 70;
      break;
    case 2:
      // 2nd-degree connection (connected to user's connection)
      score += 50;
      break;
    case 3:
      // 3rd-degree connection
      score += 30;
      break;
    default:
      // Out of network
      score += 10;
      break;
  }
  
  // Check mutual connections
  if (candidate.mutualConnections > 10) {
    score += 30;
  } else if (candidate.mutualConnections > 5) {
    score += 20;
  } else if (candidate.mutualConnections > 0) {
    score += 10;
  }
  
  // Normalize score to 0-100 range
  return Math.min(100, score);
}

// Calculate activity recency score (15% of total)
function calculateActivityRecencyScore(candidate: LeadCandidate): number {
  let score = 0;
  
  // Check last activity date
  const now = new Date();
  const lastActivity = new Date(candidate.lastActivityDate);
  const daysSinceLastActivity = Math.floor((now.getTime() - lastActivity.getTime()) / (1000 * 60 * 60 * 24));
  
  if (daysSinceLastActivity < 7) {
    // Active in the last week
    score += 100;
  } else if (daysSinceLastActivity < 30) {
    // Active in the last month
    score += 75;
  } else if (daysSinceLastActivity < 90) {
    // Active in the last 3 months
    score += 50;
  } else if (daysSinceLastActivity < 180) {
    // Active in the last 6 months
    score += 25;
  } else {
    // Inactive for more than 6 months
    score += 10;
  }
  
  // Check profile updates
  if (candidate.profileUpdatedRecently) {
    score += 20;
  }
  
  // Check job changes
  if (candidate.recentJobChange) {
    score += 30;
  }
  
  // Normalize score to 0-100 range
  return Math.min(100, score);
}

// Calculate content alignment score (10% of total)
function calculateContentAlignmentScore(candidate: LeadCandidate, assessmentAnswers: Record<string, any>): number {
  let score = 0;
  
  // Check if candidate's interests align with target interests from assessment
  const targetInterests = assessmentAnswers.interests || [];
  if (Array.isArray(targetInterests) && targetInterests.length > 0 && candidate.interests) {
    const matchingInterests = targetInterests.filter(interest => 
      candidate.interests.some(candidateInterest => 
        candidateInterest.toLowerCase().includes(interest.toLowerCase())
      )
    );
    
    // Score based on percentage of matching interests
    const matchPercentage = (matchingInterests.length / targetInterests.length) * 100;
    score += Math.min(80, matchPercentage);
  }
  
  // Check if candidate has mentioned pain points that align with user's solution
  const targetPainPoints = assessmentAnswers.pain_points || [];
  if (Array.isArray(targetPainPoints) && targetPainPoints.length > 0 && candidate.mentionedTopics) {
    const matchingPainPoints = targetPainPoints.filter(painPoint => 
      candidate.mentionedTopics.some(topic => 
        topic.toLowerCase().includes(painPoint.toLowerCase())
      )
    );
    
    // Add score for each matching pain point
    score += matchingPainPoints.length * 20;
  }
  
  // Normalize score to 0-100 range
  return Math.min(100, score);
}

// Lead candidate interface (input to scoring algorithm)
export interface LeadCandidate {
  linkedinId?: string;
  name: string;
  title?: string;
  company?: string;
  industry?: string;
  companySize?: string;
  connectionDegree: number;
  mutualConnections: number;
  lastActivityDate: string;
  profileUpdatedRecently: boolean;
  recentJobChange: boolean;
  interests?: string[];
  mentionedTopics?: string[];
  engagementMetrics: {
    postEngagements: number;
    contentCreated: number;
    groupActivity: number;
    comments: number;
    eventAttendance: number;
  };
  profileUrl?: string;
}

// Scored lead interface (output from scoring algorithm)
export interface ScoredLead extends LeadCandidate {
  score: number;
  scoreBreakdown: ScoreBreakdown;
}

// Mock function to generate lead candidates for testing
export function generateMockLeadCandidates(count: number, assessmentAnswers: Record<string, any>): LeadCandidate[] {
  const candidates: LeadCandidate[] = [];
  
  const industries = ['Technology', 'Finance', 'Healthcare', 'Education', 'Manufacturing', 'Retail', 'Marketing', 'Consulting', 'Real Estate', 'Nonprofit'];
  const titles = ['CEO', 'CTO', 'CFO', 'CMO', 'COO', 'VP of Sales', 'Director of Marketing', 'Product Manager', 'Consultant', 'Founder'];
  const companies = ['Acme Inc', 'TechCorp', 'Global Solutions', 'Innovative Systems', 'Strategic Partners', 'NextGen Technologies', 'Premier Services', 'Elite Consulting', 'Visionary Group', 'Apex Solutions'];
  const companySizes = ['solo', 'micro', 'small', 'medium', 'large', 'enterprise'];
  const interests = ['Innovation', 'Leadership', 'Marketing', 'Productivity', 'Finance', 'Sustainability', 'Industry News', 'Professional Development', 'Entrepreneurship'];
  const topics = ['Time Management', 'Cost Reduction', 'Quality Improvement', 'Growth Strategies', 'Customer Retention', 'Competitive Analysis', 'Digital Transformation', 'Talent Acquisition', 'Regulatory Compliance'];
  
  for (let i = 0; i < count; i++) {
    const randomDate = new Date();
    randomDate.setDate(randomDate.getDate() - Math.floor(Math.random() * 180)); // Random date in last 6 months
    
    candidates.push({
      linkedinId: `linkedin-${i}`,
      name: `Lead Candidate ${i + 1}`,
      title: titles[Math.floor(Math.random() * titles.length)],
      company: companies[Math.floor(Math.random() * companies.length)],
      industry: industries[Math.floor(Math.random() * industries.length)],
      companySize: companySizes[Math.floor(Math.random() * companySizes.length)],
      connectionDegree: Math.floor(Math.random() * 3) + 1,
      mutualConnections: Math.floor(Math.random() * 20),
      lastActivityDate: randomDate.toISOString(),
      profileUpdatedRecently: Math.random() > 0.5,
      recentJobChange: Math.random() > 0.7,
      interests: Array.from({ length: Math.floor(Math.random() * 5) + 1 }, () => interests[Math.floor(Math.random() * interests.length)]),
      mentionedTopics: Array.from({ length: Math.floor(Math.random() * 3) + 1 }, () => topics[Math.floor(Math.random() * topics.length)]),
      engagementMetrics: {
        postEngagements: Math.floor(Math.random() * 10),
        contentCreated: Math.floor(Math.random() * 5),
        groupActivity: Math.floor(Math.random() * 5),
        comments: Math.floor(Math.random() * 10),
        eventAttendance: Math.floor(Math.random() * 3)
      },
      profileUrl: `https://linkedin.com/in/lead-candidate-${i + 1}`
    });
  }
  
  return candidates;
}
