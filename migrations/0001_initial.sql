CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  passwordHash TEXT NOT NULL,
  role TEXT NOT NULL,
  createdAt TEXT NOT NULL,
  updatedAt TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS assessments (
  id TEXT PRIMARY KEY,
  userId TEXT NOT NULL,
  completed BOOLEAN NOT NULL DEFAULT false,
  answers TEXT NOT NULL,
  createdAt TEXT NOT NULL,
  updatedAt TEXT NOT NULL,
  FOREIGN KEY (userId) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS leads (
  id TEXT PRIMARY KEY,
  userId TEXT NOT NULL,
  linkedinId TEXT,
  name TEXT NOT NULL,
  title TEXT,
  company TEXT,
  industry TEXT,
  score INTEGER NOT NULL,
  scoreBreakdown TEXT NOT NULL,
  engagementLevel INTEGER NOT NULL,
  roleRelevance INTEGER NOT NULL,
  connectionProximity INTEGER NOT NULL,
  activityRecency INTEGER NOT NULL,
  contentAlignment INTEGER NOT NULL,
  profileUrl TEXT,
  notes TEXT,
  status TEXT NOT NULL DEFAULT 'new',
  createdAt TEXT NOT NULL,
  updatedAt TEXT NOT NULL,
  FOREIGN KEY (userId) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS subscriptions (
  id TEXT PRIMARY KEY,
  userId TEXT NOT NULL,
  plan TEXT NOT NULL,
  status TEXT NOT NULL,
  currentPeriodStart TEXT NOT NULL,
  currentPeriodEnd TEXT NOT NULL,
  stripeCustomerId TEXT,
  stripeSubscriptionId TEXT,
  createdAt TEXT NOT NULL,
  updatedAt TEXT NOT NULL,
  FOREIGN KEY (userId) REFERENCES users(id)
);
