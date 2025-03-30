import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ArrowRight, Check, Clock, AlertTriangle, User, Briefcase, Calendar, Activity, MessageSquare, ChevronRight, ChevronLeft, Filter, Download, Search } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const fadeInVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } }
};

interface DashboardProps {
  userName: string;
  userEmail: string;
  subscriptionTier: string;
  leadCount: number;
  savedLeadCount: number;
  connectedLeadCount: number;
  onLogout: () => void;
}

export function AnimatedDashboard({
  userName,
  userEmail,
  subscriptionTier,
  leadCount,
  savedLeadCount,
  connectedLeadCount,
  onLogout
}: DashboardProps) {
  const [activeTab, setActiveTab] = React.useState('overview');
  
  // Mock data for charts
  const leadsByDay = [
    { day: 'Mon', count: 5 },
    { day: 'Tue', count: 8 },
    { day: 'Wed', count: 12 },
    { day: 'Thu', count: 7 },
    { day: 'Fri', count: 10 },
    { day: 'Sat', count: 4 },
    { day: 'Sun', count: 3 }
  ];
  
  const leadsByIndustry = [
    { industry: 'Technology', count: 25 },
    { industry: 'Finance', count: 18 },
    { industry: 'Healthcare', count: 15 },
    { industry: 'Education', count: 12 },
    { industry: 'Retail', count: 10 },
    { industry: 'Other', count: 20 }
  ];
  
  // Calculate total leads viewed
  const totalLeadsViewed = leadCount + savedLeadCount + connectedLeadCount;
  
  // Calculate conversion rate
  const conversionRate = totalLeadsViewed > 0 
    ? Math.round((connectedLeadCount / totalLeadsViewed) * 100) 
    : 0;
  
  return (
    <div className="p-6">
      <motion.div
        variants={fadeInVariants}
        initial="hidden"
        animate="visible"
        className="mb-8"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-navy-blue">Dashboard</h1>
            <p className="text-gray-600 mt-1">
              Welcome back, {userName}
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex items-center">
            <Link href="/leads">
              <Button className="bg-gold text-navy-blue-dark hover:bg-gold-dark">
                View Leads
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
        
        {/* Subscription status banner */}
        <Card className="mb-8 border-gold">
          <CardContent className="p-4 flex flex-col md:flex-row md:items-center justify-between">
            <div className="flex items-center">
              <div className="h-12 w-12 rounded-full bg-gold flex items-center justify-center text-navy-blue-dark mr-4">
                <Briefcase className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Current Plan</p>
                <p className="text-xl font-bold text-navy-blue">{subscriptionTier} Tier</p>
              </div>
            </div>
            
            {subscriptionTier === 'Free' && (
              <div className="mt-4 md:mt-0 flex items-center">
                <Clock className="h-5 w-5 text-gold mr-2 animate-pulse" />
                <p className="text-sm text-gray-600 mr-4">
                  <span className="font-medium">Limited Time Offer:</span> 50% off all plans!
                </p>
                <Link href="/pricing">
                  <Button className="bg-gold text-navy-blue-dark hover:bg-gold-dark">
                    Upgrade Now
                  </Button>
                </Link>
              </div>
            )}
            
            {subscriptionTier === 'Professional' && (
              <div className="mt-4 md:mt-0 flex items-center">
                <p className="text-sm text-gray-600 mr-4">
                  <span className="font-medium">Next billing date:</span> April 30, 2025
                </p>
                <Link href="/billing">
                  <Button variant="outline" className="border-navy-blue text-navy-blue hover:bg-navy-blue hover:text-white">
                    Manage Subscription
                  </Button>
                </Link>
              </div>
            )}
            
            {subscriptionTier === 'Business' && (
              <div className="mt-4 md:mt-0 flex items-center">
                <p className="text-sm text-gray-600 mr-4">
                  <span className="font-medium">Team members:</span> 2/3 active
                </p>
                <Link href="/team">
                  <Button variant="outline" className="border-navy-blue text-navy-blue hover:bg-navy-blue hover:text-white mr-2">
                    Manage Team
                  </Button>
                </Link>
                <Link href="/billing">
                  <Button variant="outline" className="border-navy-blue text-navy-blue hover:bg-navy-blue hover:text-white">
                    Manage Subscription
                  </Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>
        
        {/* Dashboard tabs */}
        <div className="flex border-b border-gray-200 mb-6">
          <button
            className={`py-2 px-4 font-medium ${
              activeTab === 'overview'
                ? 'text-navy-blue border-b-2 border-gold'
                : 'text-gray-500 hover:text-navy-blue'
            }`}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button
            className={`py-2 px-4 font-medium ${
              activeTab === 'leads'
                ? 'text-navy-blue border-b-2 border-gold'
                : 'text-gray-500 hover:text-navy-blue'
            }`}
            onClick={() => setActiveTab('leads')}
          >
            Lead Analytics
          </button>
          <button
            className={`py-2 px-4 font-medium ${
              activeTab === 'activity'
                ? 'text-navy-blue border-b-2 border-gold'
                : 'text-gray-500 hover:text-navy-blue'
            }`}
            onClick={() => setActiveTab('activity')}
          >
            Recent Activity
          </button>
        </div>
      </motion.div>
      
      {activeTab === 'overview' && (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Stats cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <motion.div variants={itemVariants}>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-gray-500 font-medium">Available Leads</h3>
                    <div className="h-10 w-10 rounded-full bg-navy-blue bg-opacity-10 flex items-center justify-center text-navy-blue">
                      <User className="h-5 w-5" />
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-navy-blue mb-1">{leadCount}</div>
                  <p className="text-sm text-gray-500">
                    {subscriptionTier === 'Free' ? '10 leads per month' : 
                     subscriptionTier === 'Professional' ? '50 leads per month' : 
                     '200 leads per month'}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-gray-500 font-medium">Saved Leads</h3>
                    <div className="h-10 w-10 rounded-full bg-gold bg-opacity-10 flex items-center justify-center text-gold">
                      <Briefcase className="h-5 w-5" />
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-navy-blue mb-1">{savedLeadCount}</div>
                  <p className="text-sm text-gray-500">
                    {savedLeadCount > 0 ? `${Math.round((savedLeadCount / totalLeadsViewed) * 100)}% save rate` : 'No leads saved yet'}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-gray-500 font-medium">Connected Leads</h3>
                    <div className="h-10 w-10 rounded-full bg-green-500 bg-opacity-10 flex items-center justify-center text-green-500">
                      <MessageSquare className="h-5 w-5" />
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-navy-blue mb-1">{connectedLeadCount}</div>
                  <p className="text-sm text-gray-500">
                    {connectedLeadCount > 0 ? `${Math.round((connectedLeadCount / totalLeadsViewed) * 100)}% connection rate` : 'No connections yet'}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-gray-500 font-medium">Conversion Rate</h3>
                    <div className="h-10 w-10 rounded-full bg-emerald-500 bg-opacity-10 flex items-center justify-center text-emerald-500">
                      <Activity className="h-5 w-5" />
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-navy-blue mb-1">{conversionRate}%</div>
                  <p className="text-sm text-gray-500">
                    {conversionRate > 30 ? 'Above average' : 
                     conversionRate > 0 ? 'Room for improvement' : 
                     'Start connecting with leads'}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
          
          {/* Charts and activity */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <motion.div variants={itemVariants} className="lg:col-span-2">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-medium text-navy-blue">Lead Activity</h3>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" className="text-xs">
                        Weekly
                      </Button>
                      <Button variant="ghost" size="sm" className="text-xs">
                        Monthly
                      </Button>
                    </div>
                  </div>
                  
                  {/* Simple bar chart */}
                  <div className="h-64 flex items-end space-x-4 mb-2">
                    {leadsByDay.map((item, index) => (
                      <div key={index} className="flex-1 flex flex-col items-center">
                        <motion.div 
                          className="w-full bg-gold rounded-t"
                          initial={{ height: 0 }}
                          animate={{ height: `${(item.count / 12) * 100}%` }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                        ></motion.div>
                        <span className="text-xs mt-2 text-gray-500">{item.day}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <Card className="h-full">
                <CardContent className="p-6">
                  <h3 className="font-medium text-navy-blue mb-6">Lead Distribution</h3>
                  
                  {/* Simple pie chart representation */}
                  <div className="space-y-4">
                    {leadsByIndustry.map((item, index) => (
                      <div key={index}>
                        <div className="flex justify-between text-sm mb-1">
                          <span>{item.industry}</span>
                          <span>{Math.round((item.count / 100) * 100)}%</span>
                        </div>
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${(item.count / 25) * 100}%` }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                          <div 
                            className="h-2 rounded"
                            style={{ 
                              backgroundColor: index === 0 ? '#008080' : 
                                              index === 1 ? '#1A365D' : 
                                              index === 2 ? '#FF6B6B' : 
                                              index === 3 ? '#98D8C8' : 
                                              index === 4 ? '#FFD700' : '#6B7280'
                            }}
                          ></div>
                        </motion.div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
          
          {/* Quick actions */}
          <motion.div variants={itemVariants}>
            <Card>
              <CardContent className="p-6">
                <h3 className="font-medium text-navy-blue mb-4">Quick Actions</h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <Link href="/leads">
                    <Button className="w-full bg-gold text-navy-blue-dark hover:bg-gold-dark">
                      View Leads
                    </Button>
                  </Link>
                  <Link href="/assessment">
                    <Button variant="outline" className="w-full border-navy-blue text-navy-blue hover:bg-navy-blue hover:text-white">
                      Update Preferences
                    </Button>
                  </Link>
                  <Link href="/export">
                    <Button variant="outline" className="w-full border-navy-blue text-navy-blue hover:bg-navy-blue hover:text-white">
                      Export Leads
                    </Button>
                  </Link>
                  <Link href="/help">
                    <Button variant="ghost" className="w-full text-gray-500 hover:text-navy-blue">
                      Get Help
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      )}
      
      {activeTab === 'leads' && (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Lead analytics */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <motion.div variants={itemVariants}>
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-medium text-navy-blue mb-4">Lead Quality Distribution</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Excellent (80-100)</span>
                        <span>35%</span>
                      </div>
                      <Progress value={35} className="h-2 bg-gray-200" indicatorClassName="bg-green-500" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Good (60-79)</span>
                        <span>42%</span>
                      </div>
                      <Progress value={42} className="h-2 bg-gray-200" indicatorClassName="bg-emerald-500" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Fair (40-59)</span>
                        <span>15%</span>
                      </div>
                      <Progress value={15} className="h-2 bg-gray-200" indicatorClassName="bg-yellow-500" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Poor (0-39)</span>
                        <span>8%</span>
                      </div>
                      <Progress value={8} className="h-2 bg-gray-200" indicatorClassName="bg-red-500" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-medium text-navy-blue mb-4">Lead Scoring Factors</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Engagement Level (30%)</span>
                        <span>72/100</span>
                      </div>
                      <Progress value={72} className="h-2 bg-gray-200" indicatorClassName="bg-emerald-500" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Role Relevance (25%)</span>
                        <span>85/100</span>
                      </div>
                      <Progress value={85} className="h-2 bg-gray-200" indicatorClassName="bg-green-500" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Connection Proximity (20%)</span>
                        <span>68/100</span>
                      </div>
                      <Progress value={68} className="h-2 bg-gray-200" indicatorClassName="bg-emerald-500" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Activity Recency (15%)</span>
                        <span>91/100</span>
                      </div>
                      <Progress value={91} className="h-2 bg-gray-200" indicatorClassName="bg-green-500" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Content Alignment (10%)</span>
                        <span>77/100</span>
                      </div>
                      <Progress value={77} className="h-2 bg-gray-200" indicatorClassName="bg-emerald-500" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
          
          {/* Lead conversion funnel */}
          <motion.div variants={itemVariants} className="mb-8">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-medium text-navy-blue mb-6">Lead Conversion Funnel</h3>
                <div className="relative h-64">
                  {/* Simple funnel visualization */}
                  <div className="absolute inset-0 flex flex-col items-center">
                    <motion.div 
                      className="w-full h-12 bg-navy-blue rounded-t flex items-center justify-center text-white"
                      initial={{ width: '0%' }}
                      animate={{ width: '100%' }}
                      transition={{ duration: 0.5 }}
                    >
                      <span>Total Leads: 100</span>
                    </motion.div>
                    <motion.div 
                      className="w-4/5 h-12 bg-gold text-navy-blue-dark flex items-center justify-center mt-2"
                      initial={{ width: '0%' }}
                      animate={{ width: '80%' }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                    >
                      <span>Viewed: 80</span>
                    </motion.div>
                    <motion.div 
                      className="w-3/5 h-12 bg-emerald-500 text-white flex items-center justify-center mt-2"
                      initial={{ width: '0%' }}
                      animate={{ width: '60%' }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    >
                      <span>Saved: 60</span>
                    </motion.div>
                    <motion.div 
                      className="w-2/5 h-12 bg-green-600 text-white flex items-center justify-center mt-2"
                      initial={{ width: '0%' }}
                      animate={{ width: '40%' }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                    >
                      <span>Connected: 40</span>
                    </motion.div>
                    <motion.div 
                      className="w-1/5 h-12 bg-green-700 text-white flex items-center justify-center mt-2 rounded-b"
                      initial={{ width: '0%' }}
                      animate={{ width: '20%' }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                    >
                      <span>Converted: 20</span>
                    </motion.div>
                  </div>
                </div>
                <div className="mt-6 text-center">
                  <p className="text-gray-600">Overall conversion rate: <span className="font-bold text-navy-blue">20%</span></p>
                  <p className="text-sm text-gray-500 mt-1">Industry average: 15%</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      )}
      
      {activeTab === 'activity' && (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Recent activity */}
          <motion.div variants={itemVariants} className="mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-medium text-navy-blue">Recent Activity</h3>
                  <Button variant="ghost" size="sm" className="text-xs">
                    View All
                  </Button>
                </div>
                <div className="space-y-6">
                  {[
                    { type: 'connection', name: 'Sarah Johnson', time: '2 hours ago', status: 'accepted' },
                    { type: 'lead', name: 'Michael Chen', time: '4 hours ago', status: 'saved' },
                    { type: 'message', name: 'Aisha Patel', time: '1 day ago', status: 'replied' },
                    { type: 'connection', name: 'David Wilson', time: '2 days ago', status: 'pending' },
                    { type: 'lead', name: 'Emma Thompson', time: '3 days ago', status: 'dismissed' }
                  ].map((activity, index) => (
                    <div key={index} className="flex items-start">
                      <div className={`h-10 w-10 rounded-full flex items-center justify-center mr-4 ${
                        activity.type === 'connection' ? 'bg-navy-blue text-white' :
                        activity.type === 'lead' ? 'bg-gold text-navy-blue-dark' :
                        'bg-emerald-500 text-white'
                      }`}>
                        {activity.type === 'connection' ? <User className="h-5 w-5" /> :
                         activity.type === 'lead' ? <Briefcase className="h-5 w-5" /> :
                         <MessageSquare className="h-5 w-5" />}
                      </div>
                      <div>
                        <p className="font-medium text-navy-blue">
                          {activity.type === 'connection' ? 'Connection request ' :
                           activity.type === 'lead' ? 'Lead ' :
                           'Message '}
                          {activity.status === 'accepted' ? 'accepted' :
                           activity.status === 'saved' ? 'saved' :
                           activity.status === 'replied' ? 'replied to' :
                           activity.status === 'pending' ? 'sent' :
                           'dismissed'}
                        </p>
                        <p className="text-gray-600">{activity.name}</p>
                        <p className="text-sm text-gray-500 mt-1">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      )}
      
      {/* Upgrade prompt for free tier */}
      {subscriptionTier === 'Free' && (
        <motion.div
          variants={fadeInVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.5 }}
          className="mt-8"
        >
          <Card className="border-gold bg-gold bg-opacity-5">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row items-center">
                <div className="mb-4 md:mb-0 md:mr-6">
                  <Clock className="h-12 w-12 text-gold animate-pulse" />
                </div>
                <div className="flex-1 text-center md:text-left mb-4 md:mb-0">
                  <h3 className="text-xl font-bold text-navy-blue mb-2">Unlock Premium Features</h3>
                  <p className="text-gray-600">
                    Upgrade to Professional or Business tier to access advanced lead scoring, 
                    detailed analytics, and up to 200 leads per month.
                  </p>
                </div>
                <div>
                  <Link href="/pricing">
                    <Button className="bg-gold text-navy-blue-dark hover:bg-gold-dark">
                      Upgrade Now
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
}
