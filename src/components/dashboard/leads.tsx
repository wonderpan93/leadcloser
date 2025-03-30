import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Lead } from '@/lib/leads/scoring';

interface LeadCardProps {
  lead: Lead;
  onSelect: (lead: Lead) => void;
}

export function LeadCard({ lead, onSelect }: LeadCardProps) {
  // Get initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  // Format score as percentage
  const scorePercentage = lead.score;

  // Determine score color
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 60) return 'bg-emerald-500';
    if (score >= 40) return 'bg-yellow-500';
    if (score >= 20) return 'bg-orange-500';
    return 'bg-red-500';
  };

  return (
    <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => onSelect(lead)}>
      <CardContent className="p-4">
        <div className="flex items-start gap-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src={`https://ui-avatars.com/api/?name=${encodeURIComponent(lead.name)}&background=random`} />
            <AvatarFallback>{getInitials(lead.name)}</AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-1">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-base">{lead.name}</h3>
              <Badge className={`${getScoreColor(scorePercentage)} text-white`}>{scorePercentage}</Badge>
            </div>
            <p className="text-sm text-gray-500">{lead.title || 'No title'}</p>
            <p className="text-sm text-gray-500">{lead.company || 'No company'}</p>
            <div className="pt-2">
              <div className="flex justify-between text-xs text-gray-500 mb-1">
                <span>Lead Score</span>
                <span>{scorePercentage}/100</span>
              </div>
              <Progress value={scorePercentage} className="h-1.5" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

interface LeadListProps {
  leads: Lead[];
  onSelectLead: (lead: Lead) => void;
  isLoading?: boolean;
}

export function LeadList({ leads, onSelectLead, isLoading = false }: LeadListProps) {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, index) => (
          <Card key={index} className="animate-pulse">
            <CardContent className="p-4">
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-full bg-gray-200" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                  <div className="h-3 bg-gray-200 rounded w-1/2" />
                  <div className="h-3 bg-gray-200 rounded w-2/3" />
                  <div className="pt-2">
                    <div className="h-1.5 bg-gray-200 rounded w-full mt-4" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (leads.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No leads found</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {leads.map((lead) => (
        <LeadCard key={lead.id} lead={lead} onSelect={onSelectLead} />
      ))}
    </div>
  );
}

interface LeadDetailProps {
  lead: Lead;
  onClose: () => void;
}

export function LeadDetail({ lead, onClose }: LeadDetailProps) {
  // Format score breakdown for display
  const scoreBreakdown = [
    { name: 'Engagement Level', value: lead.scoreBreakdown.engagementLevel, weight: 0.3 },
    { name: 'Role Relevance', value: lead.scoreBreakdown.roleRelevance, weight: 0.25 },
    { name: 'Connection Proximity', value: lead.scoreBreakdown.connectionProximity, weight: 0.2 },
    { name: 'Activity Recency', value: lead.scoreBreakdown.activityRecency, weight: 0.15 },
    { name: 'Content Alignment', value: lead.scoreBreakdown.contentAlignment, weight: 0.1 }
  ];

  // Get color based on score
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-500';
    if (score >= 60) return 'text-emerald-500';
    if (score >= 40) return 'text-yellow-500';
    if (score >= 20) return 'text-orange-500';
    return 'text-red-500';
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="text-xl">{lead.name}</CardTitle>
          <CardDescription>{lead.title} at {lead.company}</CardDescription>
        </div>
        <Button variant="outline" size="sm" onClick={onClose}>
          Close
        </Button>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-medium">Lead Score</h3>
            <p className="text-sm text-gray-500">Overall quality of this lead</p>
          </div>
          <div className={`text-3xl font-bold ${getScoreColor(lead.score)}`}>
            {lead.score}/100
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium mb-4">Score Breakdown</h3>
          <div className="space-y-4">
            {scoreBreakdown.map((item) => (
              <div key={item.name} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span>{item.name} ({Math.round(item.weight * 100)}%)</span>
                  <span className={getScoreColor(item.value)}>{item.value}/100</span>
                </div>
                <Progress value={item.value} className="h-2" />
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="text-lg font-medium mb-2">Contact Information</h3>
            <div className="space-y-2">
              <p className="text-sm">
                <span className="text-gray-500">Industry:</span> {lead.industry || 'Unknown'}
              </p>
              <p className="text-sm">
                <span className="text-gray-500">LinkedIn:</span>{' '}
                {lead.profileUrl ? (
                  <a 
                    href={lead.profileUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    View Profile
                  </a>
                ) : (
                  'Not available'
                )}
              </p>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-2">Lead Status</h3>
            <Badge className="capitalize">{lead.status}</Badge>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium mb-2">Notes</h3>
          <Input 
            placeholder="Add notes about this lead..." 
            defaultValue={lead.notes || ''}
          />
        </div>

        <div className="flex justify-end space-x-2 pt-4">
          <Button variant="outline">Save Notes</Button>
          <Button>Connect on LinkedIn</Button>
        </div>
      </CardContent>
    </Card>
  );
}

interface DashboardLeadsProps {
  initialLeads?: Lead[];
}

export function DashboardLeads({ initialLeads = [] }: DashboardLeadsProps) {
  const [leads, setLeads] = React.useState<Lead[]>(initialLeads);
  const [selectedLead, setSelectedLead] = React.useState<Lead | null>(null);
  const [isLoading, setIsLoading] = React.useState<boolean>(initialLeads.length === 0);
  const [activeTab, setActiveTab] = React.useState<string>('all');

  // Fetch leads on component mount if no initial leads
  React.useEffect(() => {
    if (initialLeads.length === 0) {
      fetchLeads();
    }
  }, [initialLeads]);

  // Fetch leads from API
  const fetchLeads = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/leads');
      const data = await response.json();
      
      if (data.success) {
        setLeads(data.leads);
      }
    } catch (error) {
      console.error('Error fetching leads:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Generate new leads
  const generateLeads = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/leads', {
        method: 'POST'
      });
      const data = await response.json();
      
      if (data.success) {
        setLeads(data.leads);
      }
    } catch (error) {
      console.error('Error generating leads:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Filter leads based on active tab
  const filteredLeads = React.useMemo(() => {
    if (activeTab === 'all') {
      return leads;
    }
    return leads.filter(lead => lead.status === activeTab);
  }, [leads, activeTab]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-1 space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Leads</h2>
          <Button onClick={generateLeads} disabled={isLoading}>
            {isLoading ? 'Loading...' : 'Generate Leads'}
          </Button>
        </div>
        
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="new">New</TabsTrigger>
            <TabsTrigger value="contacted">Contacted</TabsTrigger>
            <TabsTrigger value="meeting">Meeting</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-0">
            <LeadList 
              leads={filteredLeads} 
              onSelectLead={setSelectedLead} 
              isLoading={isLoading} 
            />
          </TabsContent>
          
          <TabsContent value="new" className="mt-0">
            <LeadList 
              leads={filteredLeads} 
              onSelectLead={setSelectedLead} 
              isLoading={isLoading} 
            />
          </TabsContent>
          
          <TabsContent value="contacted" className="mt-0">
            <LeadList 
              leads={filteredLeads} 
              onSelectLead={setSelectedLead} 
              isLoading={isLoading} 
            />
          </TabsContent>
          
          <TabsContent value="meeting" className="mt-0">
            <LeadList 
              leads={filteredLeads} 
              onSelectLead={setSelectedLead} 
              isLoading={isLoading} 
            />
          </TabsContent>
        </Tabs>
      </div>
      
      <div className="md:col-span-2">
        {selectedLead ? (
          <LeadDetail lead={selectedLead} onClose={() => setSelectedLead(null)} />
        ) : (
          <Card className="w-full h-full flex items-center justify-center">
            <CardContent className="text-center p-6">
              <h3 className="text-xl font-medium mb-2">Select a Lead</h3>
              <p className="text-gray-500">
                Click on a lead from the list to view detailed information
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
