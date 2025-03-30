import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ArrowRight, Check, Clock, AlertTriangle, User, Briefcase, Calendar, Activity, MessageSquare } from 'lucide-react';
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

interface Lead {
  id: string;
  name: string;
  title: string;
  company: string;
  profileUrl: string;
  profileImage: string;
  score: number;
  scoreBreakdown: {
    engagement: number;
    roleRelevance: number;
    connectionProximity: number;
    activityRecency: number;
    contentAlignment: number;
  };
  lastActivity: string;
  commonConnections: number;
  tags: string[];
}

interface LeadCardProps {
  lead: Lead;
  onConnect: (leadId: string) => void;
  onSave: (leadId: string) => void;
  onDismiss: (leadId: string) => void;
}

export function AnimatedLeadCard({ lead, onConnect, onSave, onDismiss }: LeadCardProps) {
  // Get color based on score
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-500';
    if (score >= 60) return 'text-emerald-500';
    if (score >= 40) return 'text-yellow-500';
    if (score >= 20) return 'text-orange-500';
    return 'text-red-500';
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 60) return 'bg-emerald-500';
    if (score >= 40) return 'bg-yellow-500';
    if (score >= 20) return 'bg-orange-500';
    return 'bg-red-500';
  };

  return (
    <motion.div
      variants={itemVariants}
      className="h-full"
    >
      <Card className="h-full hover:shadow-lg transition-shadow border-t-4 border-gold">
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center">
              <div className="relative h-16 w-16 rounded-full overflow-hidden mr-4 border-2 border-navy-blue">
                {lead.profileImage ? (
                  <Image 
                    src={lead.profileImage} 
                    alt={lead.name} 
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="h-full w-full bg-navy-blue flex items-center justify-center text-white text-xl font-bold">
                    {lead.name.charAt(0)}
                  </div>
                )}
              </div>
              <div>
                <h3 className="text-xl font-bold text-navy-blue">{lead.name}</h3>
                <p className="text-gray-600">{lead.title}</p>
                <p className="text-gray-500 text-sm">{lead.company}</p>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <div className={`h-14 w-14 rounded-full ${getScoreBgColor(lead.score)} flex items-center justify-center text-white font-bold text-xl`}>
                {lead.score}
              </div>
              <span className="text-xs mt-1 font-medium">Lead Score</span>
            </div>
          </div>
          
          <div className="mb-6">
            <h4 className="text-sm font-medium text-gray-500 mb-2">Score Breakdown</h4>
            <div className="space-y-2">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="flex items-center">
                    <Activity className="h-3 w-3 mr-1" /> Engagement Level
                  </span>
                  <span className={getScoreColor(lead.scoreBreakdown.engagement)}>
                    {lead.scoreBreakdown.engagement}/100
                  </span>
                </div>
                <Progress value={lead.scoreBreakdown.engagement} className="h-1.5 bg-gray-200" indicatorClassName={getScoreBgColor(lead.scoreBreakdown.engagement)} />
              </div>
              
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="flex items-center">
                    <Briefcase className="h-3 w-3 mr-1" /> Role Relevance
                  </span>
                  <span className={getScoreColor(lead.scoreBreakdown.roleRelevance)}>
                    {lead.scoreBreakdown.roleRelevance}/100
                  </span>
                </div>
                <Progress value={lead.scoreBreakdown.roleRelevance} className="h-1.5 bg-gray-200" indicatorClassName={getScoreBgColor(lead.scoreBreakdown.roleRelevance)} />
              </div>
              
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="flex items-center">
                    <User className="h-3 w-3 mr-1" /> Connection Proximity
                  </span>
                  <span className={getScoreColor(lead.scoreBreakdown.connectionProximity)}>
                    {lead.scoreBreakdown.connectionProximity}/100
                  </span>
                </div>
                <Progress value={lead.scoreBreakdown.connectionProximity} className="h-1.5 bg-gray-200" indicatorClassName={getScoreBgColor(lead.scoreBreakdown.connectionProximity)} />
              </div>
              
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="flex items-center">
                    <Calendar className="h-3 w-3 mr-1" /> Activity Recency
                  </span>
                  <span className={getScoreColor(lead.scoreBreakdown.activityRecency)}>
                    {lead.scoreBreakdown.activityRecency}/100
                  </span>
                </div>
                <Progress value={lead.scoreBreakdown.activityRecency} className="h-1.5 bg-gray-200" indicatorClassName={getScoreBgColor(lead.scoreBreakdown.activityRecency)} />
              </div>
              
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="flex items-center">
                    <MessageSquare className="h-3 w-3 mr-1" /> Content Alignment
                  </span>
                  <span className={getScoreColor(lead.scoreBreakdown.contentAlignment)}>
                    {lead.scoreBreakdown.contentAlignment}/100
                  </span>
                </div>
                <Progress value={lead.scoreBreakdown.contentAlignment} className="h-1.5 bg-gray-200" indicatorClassName={getScoreBgColor(lead.scoreBreakdown.contentAlignment)} />
              </div>
            </div>
          </div>
          
          <div className="flex justify-between text-sm text-gray-500 mb-4">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              <span>Last active: {lead.lastActivity}</span>
            </div>
            <div className="flex items-center">
              <User className="h-4 w-4 mr-1" />
              <span>{lead.commonConnections} mutual connections</span>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2 mb-6">
            {lead.tags.map((tag, index) => (
              <span key={index} className="px-2 py-1 bg-navy-blue bg-opacity-10 text-navy-blue rounded-full text-xs">
                {tag}
              </span>
            ))}
          </div>
          
          <div className="flex space-x-2">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex-1"
            >
              <Button 
                className="w-full bg-gold text-navy-blue-dark hover:bg-gold-dark"
                onClick={() => onConnect(lead.id)}
              >
                Connect
                <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </motion.div>
            <Button 
              variant="outline" 
              className="border-navy-blue text-navy-blue hover:bg-navy-blue hover:text-white"
              onClick={() => onSave(lead.id)}
            >
              Save
            </Button>
            <Button 
              variant="ghost" 
              className="text-gray-500 hover:text-gray-700"
              onClick={() => onDismiss(lead.id)}
            >
              Dismiss
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

interface LeadListProps {
  leads: Lead[];
  onConnect: (leadId: string) => void;
  onSave: (leadId: string) => void;
  onDismiss: (leadId: string) => void;
}

export function AnimatedLeadList({ leads, onConnect, onSave, onDismiss }: LeadListProps) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {leads.map((lead) => (
        <AnimatedLeadCard
          key={lead.id}
          lead={lead}
          onConnect={onConnect}
          onSave={onSave}
          onDismiss={onDismiss}
        />
      ))}
    </motion.div>
  );
}

interface LeadDashboardProps {
  leads: Lead[];
  onConnect: (leadId: string) => void;
  onSave: (leadId: string) => void;
  onDismiss: (leadId: string) => void;
  onRefresh: () => void;
  isLoading: boolean;
  totalLeads: number;
  remainingLeads: number;
  subscriptionTier: string;
}

export function AnimatedLeadDashboard({
  leads,
  onConnect,
  onSave,
  onDismiss,
  onRefresh,
  isLoading,
  totalLeads,
  remainingLeads,
  subscriptionTier
}: LeadDashboardProps) {
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
            <h1 className="text-3xl font-bold text-navy-blue">Your Lead Recommendations</h1>
            <p className="text-gray-600 mt-1">
              Showing {leads.length} high-quality leads tailored to your business
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex items-center">
            <Button 
              variant="outline" 
              className="mr-2 border-navy-blue text-navy-blue hover:bg-navy-blue hover:text-white"
              onClick={onRefresh}
              disabled={isLoading}
            >
              {isLoading ? 'Refreshing...' : 'Refresh Leads'}
            </Button>
            <Link href="/assessment">
              <Button className="bg-gold text-navy-blue-dark hover:bg-gold-dark">
                Update Preferences
              </Button>
            </Link>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardContent className="p-4 flex items-center">
              <div className="h-12 w-12 rounded-full bg-navy-blue flex items-center justify-center text-white mr-4">
                <User className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Leads</p>
                <p className="text-2xl font-bold text-navy-blue">{totalLeads}</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 flex items-center">
              <div className="h-12 w-12 rounded-full bg-gold flex items-center justify-center text-navy-blue-dark mr-4">
                <Calendar className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Remaining This Month</p>
                <p className="text-2xl font-bold text-navy-blue">{remainingLeads}</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 flex items-center">
              <div className="h-12 w-12 rounded-full bg-emerald-500 flex items-center justify-center text-white mr-4">
                <Briefcase className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Subscription Tier</p>
                <p className="text-2xl font-bold text-navy-blue">{subscriptionTier}</p>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Urgency element */}
        {subscriptionTier === 'Free' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mb-8 p-4 border border-gold bg-gold bg-opacity-5 rounded-lg flex items-center"
          >
            <AlertTriangle className="h-5 w-5 text-gold mr-2" />
            <div>
              <p className="font-medium text-navy-blue">Upgrade to see more high-quality leads!</p>
              <p className="text-sm text-gray-600">
                You're using {totalLeads - remainingLeads} of {totalLeads} leads on the Free plan. 
                <Link href="/pricing" className="text-gold font-medium ml-1">
                  Upgrade now for 50% off launch pricing!
                </Link>
              </p>
            </div>
          </motion.div>
        )}
      </motion.div>
      
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gold"></div>
        </div>
      ) : leads.length > 0 ? (
        <AnimatedLeadList
          leads={leads}
          onConnect={onConnect}
          onSave={onSave}
          onDismiss={onDismiss}
        />
      ) : (
        <div className="text-center py-12">
          <h3 className="text-xl font-bold text-navy-blue mb-2">No leads found</h3>
          <p className="text-gray-600 mb-6">
            We couldn't find any leads matching your criteria. Try updating your preferences.
          </p>
          <Link href="/assessment">
            <Button className="bg-gold text-navy-blue-dark hover:bg-gold-dark">
              Update Preferences
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}
