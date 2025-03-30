import { MongoClient, Db, Collection } from 'mongodb';

// MongoDB connection string
const uri = "mongodb+srv://pseth:pdatabase@2025!@clusterp0.1eeiv.mongodb.net/";
let client: MongoClient | null = null;
let db: Db | null = null;

// Connect to MongoDB
export async function connectToMongoDB(): Promise<Db> {
  if (db) return db;
  
  try {
    client = new MongoClient(uri);
    await client.connect();
    db = client.db('leadcloser');
    console.log('Connected to MongoDB');
    return db;
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
}

// Get MongoDB collections
export async function getCollections() {
  const database = await connectToMongoDB();
  
  return {
    users: database.collection('users'),
    leads: database.collection('leads'),
    assessments: database.collection('assessments'),
    subscriptions: database.collection('subscriptions')
  };
}

// Close MongoDB connection
export async function closeMongoDB() {
  if (client) {
    await client.close();
    client = null;
    db = null;
    console.log('MongoDB connection closed');
  }
}

// Convert D1 database functions to use MongoDB
// These functions will replace the D1 database functions in the application

// Users collection functions
export async function getUserByEmail(email: string) {
  const { users } = await getCollections();
  return await users.findOne({ email });
}

export async function getUserById(id: string) {
  const { users } = await getCollections();
  return await users.findOne({ _id: id });
}

export async function createUser(userData: any) {
  const { users } = await getCollections();
  const now = new Date();
  
  const result = await users.insertOne({
    ...userData,
    createdAt: now,
    updatedAt: now
  });
  
  return {
    id: result.insertedId.toString(),
    ...userData,
    createdAt: now.toISOString(),
    updatedAt: now.toISOString()
  };
}

export async function updateUser(id: string, userData: any) {
  const { users } = await getCollections();
  const now = new Date();
  
  await users.updateOne(
    { _id: id },
    { 
      $set: {
        ...userData,
        updatedAt: now
      }
    }
  );
  
  return await getUserById(id);
}

// Leads collection functions
export async function getLeadsForUser(userId: string, limit = 50, offset = 0) {
  const { leads } = await getCollections();
  
  return await leads
    .find({ userId })
    .sort({ score: -1 })
    .skip(offset)
    .limit(limit)
    .toArray();
}

export async function getLeadById(id: string) {
  const { leads } = await getCollections();
  return await leads.findOne({ _id: id });
}

export async function saveLead(leadData: any) {
  const { leads } = await getCollections();
  const now = new Date();
  
  const result = await leads.insertOne({
    ...leadData,
    createdAt: now,
    updatedAt: now
  });
  
  return {
    id: result.insertedId.toString(),
    ...leadData,
    createdAt: now.toISOString(),
    updatedAt: now.toISOString()
  };
}

export async function updateLead(id: string, leadData: any) {
  const { leads } = await getCollections();
  const now = new Date();
  
  await leads.updateOne(
    { _id: id },
    { 
      $set: {
        ...leadData,
        updatedAt: now
      }
    }
  );
  
  return await getLeadById(id);
}

// Assessments collection functions
export async function getLatestAssessmentForUser(userId: string) {
  const { assessments } = await getCollections();
  
  return await assessments
    .find({ userId })
    .sort({ createdAt: -1 })
    .limit(1)
    .next();
}

export async function saveAssessment(assessmentData: any) {
  const { assessments } = await getCollections();
  const now = new Date();
  
  const result = await assessments.insertOne({
    ...assessmentData,
    createdAt: now,
    updatedAt: now
  });
  
  return {
    id: result.insertedId.toString(),
    ...assessmentData,
    createdAt: now.toISOString(),
    updatedAt: now.toISOString()
  };
}

// Subscriptions collection functions
export async function getSubscriptionForUser(userId: string) {
  const { subscriptions } = await getCollections();
  
  return await subscriptions
    .find({ userId, status: 'active' })
    .sort({ createdAt: -1 })
    .limit(1)
    .next();
}

export async function createSubscription(subscriptionData: any) {
  const { subscriptions } = await getCollections();
  const now = new Date();
  
  const result = await subscriptions.insertOne({
    ...subscriptionData,
    createdAt: now,
    updatedAt: now
  });
  
  return {
    id: result.insertedId.toString(),
    ...subscriptionData,
    createdAt: now.toISOString(),
    updatedAt: now.toISOString()
  };
}

export async function updateSubscription(id: string, subscriptionData: any) {
  const { subscriptions } = await getCollections();
  const now = new Date();
  
  await subscriptions.updateOne(
    { _id: id },
    { 
      $set: {
        ...subscriptionData,
        updatedAt: now
      }
    }
  );
  
  return await subscriptions.findOne({ _id: id });
}
