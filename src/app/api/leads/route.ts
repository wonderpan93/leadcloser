//handling API routes
export { dynamic, runtime } from '../route.config.js';

import { NextRequest, NextResponse } from 'next/server';
import { getServerUser } from '@/lib/auth/auth';
import { getLatestAssessmentForUser } from '@/lib/db/assessments';
import { getLeadsForUser, saveLead } from '@/lib/db/leads';
import { generateMockLeadCandidates, scoreLeadCandidate } from '@/lib/leads/scoring';

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
    
    // Get query parameters
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '20', 10);
    const offset = parseInt(searchParams.get('offset') || '0', 10);
    
    // Get leads for user
    const leads = await getLeadsForUser(user.id, limit, offset);
    
    return NextResponse.json({
      success: true,
      leads
    });
  } catch (error) {
    console.error('Get leads error:', error);
    return NextResponse.json(
      { success: false, message: 'An error occurred while fetching leads' },
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
    
    // Get latest assessment for user
    const assessment = await getLatestAssessmentForUser(user.id);
    
    if (!assessment || !assessment.completed) {
      return NextResponse.json(
        { success: false, message: 'Please complete the assessment first' },
        { status: 400 }
      );
    }
    
    // Parse assessment answers
    const assessmentAnswers = JSON.parse(assessment.answers);
    
    // Generate mock lead candidates
    // In a real implementation, this would fetch data from LinkedIn API
    const leadCandidates = generateMockLeadCandidates(20, assessmentAnswers);
    
    // Score lead candidates
    const scoredLeads = leadCandidates.map(candidate => 
      scoreLeadCandidate(candidate, assessmentAnswers, user)
    );
    
    // Sort leads by score (highest first)
    scoredLeads.sort((a, b) => b.score - a.score);
    
    // Save leads to database
    const savedLeads = await Promise.all(
      scoredLeads.map(lead => 
        saveLead({
          userId: user.id,
          linkedinId: lead.linkedinId,
          name: lead.name,
          title: lead.title,
          company: lead.company,
          industry: lead.industry,
          score: lead.score,
          scoreBreakdown: lead.scoreBreakdown,
          profileUrl: lead.profileUrl,
          status: 'new'
        })
      )
    );
    
    return NextResponse.json({
      success: true,
      message: 'Leads generated successfully',
      leads: savedLeads
    });
  } catch (error) {
    console.error('Generate leads error:', error);
    return NextResponse.json(
      { success: false, message: 'An error occurred while generating leads' },
      { status: 500 }
    );
  }
}
