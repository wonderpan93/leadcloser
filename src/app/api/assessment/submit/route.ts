export const runtime = 'nodejs';

import { NextRequest, NextResponse } from 'next/server';
import { getServerUser } from '@/lib/auth/auth';
import { saveAssessment } from '@/lib/db/assessments';

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
    
    // Get assessment answers from request
    const { answers } = await request.json();
    
    if (!answers) {
      return NextResponse.json(
        { success: false, message: 'Assessment answers are required' },
        { status: 400 }
      );
    }
    
    // Save assessment to database
    const assessment = await saveAssessment({
      userId: user.id,
      answers: JSON.stringify(answers),
      completed: true
    });
    
    // Generate initial leads based on assessment
    // This will be implemented in the lead scoring algorithm step
    
    return NextResponse.json({
      success: true,
      message: 'Assessment submitted successfully',
      assessmentId: assessment.id
    });
  } catch (error) {
    console.error('Assessment submission error:', error);
    return NextResponse.json(
      { success: false, message: 'An error occurred while submitting the assessment' },
      { status: 500 }
    );
  }
}
