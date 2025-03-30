import { NextRequest, NextResponse } from 'next/server';
import { getServerUser } from '@/lib/auth/auth';
import { MongoClient, ObjectId } from 'mongodb';

// MongoDB connection string
const uri = "mongodb+srv://pseth:pdatabase@2025!@clusterp0.1eeiv.mongodb.net/";
const client = new MongoClient(uri);

// Connect to MongoDB
async function connectToMongoDB() {
  try {
    await client.connect();
    return client.db('leadcloser');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
}

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
    
    // Connect to MongoDB
    const db = await connectToMongoDB();
    const usersCollection = db.collection('users');
    
    // Check if user exists in MongoDB
    const mongoUser = await usersCollection.findOne({ email: user.email });
    
    if (!mongoUser) {
      // Create user in MongoDB if not exists
      await usersCollection.insertOne({
        _id: new ObjectId(),
        email: user.email,
        name: user.name,
        role: user.role,
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }
    
    return NextResponse.json({
      success: true,
      message: 'MongoDB connection successful',
      connected: true
    });
  } catch (error) {
    console.error('MongoDB test error:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to connect to MongoDB',
        error: error instanceof Error ? error.message : 'Unknown error',
        connected: false
      },
      { status: 500 }
    );
  } finally {
    // Close MongoDB connection
    await client.close();
  }
}
