//handling API routes
export { dynamic, runtime } from '../route.config.js';

import { NextRequest, NextResponse } from 'next/server';
import { connectToMongoDB, getCollections } from '@/lib/db/mongodb';

// Health check endpoint for Vercel deployment
export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    // Connect to MongoDB
    await connectToMongoDB();
    
    // Get collections to verify database connection
    const collections = await getCollections();
    
    return NextResponse.json({
      success: true,
      message: 'LeadCloser API is running',
      status: 'healthy',
      environment: process.env.NODE_ENV || 'development',
      timestamp: new Date().toISOString(),
      database: {
        connected: true,
        collections: Object.keys(collections)
      }
    });
  } catch (error) {
    console.error('Health check error:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'API is running but database connection failed',
        status: 'unhealthy',
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}
