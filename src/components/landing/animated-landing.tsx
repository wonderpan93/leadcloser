import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Check, Clock, AlertTriangle, User, Briefcase, Calendar, Activity, MessageSquare, ChevronRight, ChevronLeft, Filter, Download, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

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

const floatVariants = {
  hidden: { y: 0 },
  visible: { 
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      repeatType: "reverse"
    }
  }
};

const pulseVariants = {
  hidden: { scale: 1 },
  visible: { 
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      repeat: Infinity
    }
  }
};

const slideInLeftVariants = {
  hidden: { x: -100, opacity: 0 },
  visible: { 
    x: 0, 
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15
    }
  }
};

const slideInRightVariants = {
  hidden: { x: 100, opacity: 0 },
  visible: { 
    x: 0, 
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15
    }
  }
};

const staggeredTextVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08
    }
  }
};

const letterVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15
    }
  }
};

export function AnimatedLanding() {
  const [countdown, setCountdown] = React.useState({
    days: 3,
    hours: 12,
    minutes: 45,
    seconds: 0
  });

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        let { days, hours, minutes, seconds } = prev;
        
        if (seconds > 0) {
          seconds -= 1;
        } else {
          seconds = 59;
          if (minutes > 0) {
            minutes -= 1;
          } else {
            minutes = 59;
            if (hours > 0) {
              hours -= 1;
            } else {
              hours = 23;
              if (days > 0) {
                days -= 1;
              }
            }
          }
        }
        
        return { days, hours, minutes, seconds };
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  const StaggeredText = ({ text, className }: { text: string, className?: string }) => (
    <motion.div
      variants={staggeredTextVariants}
      initial="hidden"
      animate="visible"
      className={className}
    >
      {text.split('').map((char, index) => (
        <motion.span key={index} variants={letterVariants}>
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </motion.div>
  );

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="bg-navy-blue text-white py-16 md:py-24 relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-64 h-64 bg-gold opacity-10 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-gold opacity-10 rounded-full translate-x-1/2 translate-y-1/2"></div>
          <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-gold opacity-5 rounded-full"></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <motion.div 
              className="lg:w-1/2 mb-12 lg:mb-0"
              variants={slideInLeftVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div
                variants={staggeredTextVariants}
                initial="hidden"
                animate="visible"
                className="mb-6"
              >
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
                  <span className="text-gold">Find & Connect</span> With Your Ideal LinkedIn Leads
                </h1>
              </motion.div>
              
              <motion.p 
                className="text-xl mb-8 text-gray-200"
                variants={fadeInVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.3 }}
              >
                Stop wasting time on the wrong connections. LeadCloser uses AI to identify and score your highest-value prospects based on engagement, role relevance, and connection proximity.
              </motion.p>
              
              <motion.div
                className="flex flex-col sm:flex-row gap-4"
                variants={fadeInVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.5 }}
              >
                <Link href="/signup">
                  <Button className="bg-gold text-navy-blue-dark hover:bg-gold-dark text-lg px-8 py-6">
                    Start Free Trial
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/assessment">
                  <Button variant="outline" className="border-white text-white hover:bg-white hover:text-navy-blue text-lg px-8 py-6">
                    Take the Assessment
                  </Button>
                </Link>
              </motion.div>
              
              <motion.div
                className="mt-8 flex items-center"
                variants={fadeInVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.7 }}
              >
                <div className="flex -space-x-2 mr-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-8 h-8 rounded-full bg-gray-300 border-2 border-navy-blue flex items-center justify-center text-navy-blue font-bold text-xs">
                      {i}
                    </div>
                  ))}
                </div>
                <p className="text-sm text-gray-200">
                  <span className="font-bold">Join 500+ solopreneurs</span> already finding high-quality leads
                </p>
              </motion.div>
            </motion.div>
            
            <motion.div 
              className="lg:w-1/2 relative"
              variants={slideInRightVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div
                className="bg-white p-6 rounded-lg shadow-xl"
                variants={pulseVariants}
                initial="hidden"
                animate="visible"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full bg-navy-blue flex items-center justify-center text-white mr-4">
                      <User className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-navy-blue">Sarah Johnson</h3>
                      <p className="text-gray-600">Marketing Director</p>
                    </div>
                  </div>
                  <div className="h-14 w-14 rounded-full bg-green-500 flex items-center justify-center text-white font-bold text-xl">
                    92
                  </div>
                </div>
                
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Engagement Level</span>
                    <span className="text-green-500">88/100</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full">
                    <div className="h-2 bg-green-500 rounded-full" style={{ width: '88%' }}></div>
                  </div>
                </div>
                
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Role Relevance</span>
                    <span className="text-green-500">95/100</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full">
                    <div className="h-2 bg-green-500 rounded-full" style={{ width: '95%' }}></div>
                  </div>
                </div>
                
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Connection Proximity</span>
                    <span className="text-green-500">85/100</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full">
                    <div className="h-2 bg-green-500 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                </div>
                
                <div className="flex justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>Active 2 days ago</span>
                  </div>
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-1" />
                    <span>12 mutual connections</span>
                  </div>
                </div>
                
                <Button className="w-full bg-gold text-navy-blue-dark hover:bg-gold-dark">
                  Connect Now
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </motion.div>
              
              <motion.div
                className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-lg"
                variants={floatVariants}
                initial="hidden"
                animate="visible"
              >
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-emerald-500 flex items-center justify-center text-white mr-3">
                    <Check className="h-5 w-5" />
                  </div>
                  <p className="text-sm font-medium text-gray-800">
                    Lead matched with 92% accuracy
                  </p>
                </div>
              </motion.div>
              
              <motion.div
                className="absolute -top-6 -right-6 bg-white p-4 rounded-lg shadow-lg"
                variants={floatVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.5 }}
              >
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-gold flex items-center justify-center text-navy-blue-dark mr-3">
                    <Activity className="h-5 w-5" />
                  </div>
                  <p className="text-sm font-medium text-gray-800">
                    3X higher response rate
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Limited Time Offer Banner */}
      <motion.section 
        className="bg-gold text-navy-blue-dark py-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-center md:justify-between">
            <div className="flex items-center mb-4 md:mb-0">
              <Clock className="h-5 w-5 mr-2 animate-pulse" />
              <p className="font-bold">
                LIMITED TIME OFFER: 50% OFF ALL PLANS
              </p>
            </div>
            <div className="flex items-center">
              <div className="grid grid-cols-4 gap-2 mr-4">
                <div className="bg-navy-blue bg-opacity-10 rounded p-2 text-center">
                  <span className="block text-lg font-bold">{countdown.days}</span>
                  <span className="text-xs">Days</span>
                </div>
                <div className="bg-navy-blue bg-opacity-10 rounded p-2 text-center">
                  <span className="block text-lg font-bold">{countdown.hours}</span>
                  <span className="text-xs">Hours</span>
                </div>
                <div className="bg-navy-blue bg-opacity-10 rounded p-2 text-center">
                  <span className="block text-lg font-bold">{countdown.minutes}</span>
                  <span className="text-xs">Mins</span>
                </div>
                <div className="bg-navy-blue bg-opacity-10 rounded p-2 text-center">
                  <span className="block text-lg font-bold">{countdown.seconds}</span>
                  <span className="text-xs">Secs</span>
                </div>
              </div>
              <Link href="/pricing">
                <Button className="bg-navy-blue text-white hover:bg-navy-blue-dark">
                  Claim Offer
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </motion.section>
      
      {/* Problem Statement Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            variants={fadeInVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-navy-blue mb-4">You Know The Feeling...</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              When you're putting in the work but not seeing the results
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-8"
            >
              <motion.div 
                className="flex items-start"
                variants={itemVariants}
              >
                <div className="flex-shrink-0 h-12 w-12 rounded-full bg-navy-blue bg-opacity-10 flex items-center justify-center text-navy-blue mr-4">
                  <User className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-navy-blue mb-2">Perfect Profile, No Clients</h3>
                  <p className="text-gray-600">
                    You've spent countless hours crafting the perfect LinkedIn profile. You're posting valuable content consistently. Your connection requests are getting accepted.
                  </p>
                </div>
              </motion.div>
              
              <motion.div 
                className="flex items-start"
                variants={itemVariants}
              >
                <div className="flex-shrink-0 h-12 w-12 rounded-full bg-navy-blue bg-opacity-10 flex items-center justify-center text-navy-blue mr-4">
                  <MessageSquare className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-navy-blue mb-2">Connections Not Converting</h3>
                  <p className="text-gray-600">
                    Yet somehow, those connections aren't turning into clients. You watch others in your industry landing big contracts through LinkedIn while you're left wondering what secret ingredient you're missing.
                  </p>
                </div>
              </motion.div>
              
              <motion.div 
                className="flex items-start"
                variants={itemVariants}
              >
                <div className="flex-shrink-0 h-12 w-12 rounded-full bg-navy-blue bg-opacity-10 flex items-center justify-center text-navy-blue mr-4">
                  <Clock className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-navy-blue mb-2">Time Wasted on Wrong People</h3>
                  <p className="text-gray-600">
                    <span className="font-bold">It's not your expertise that's the problem.</span> It's that you're spending your valuable time connecting with the wrong people.
                  </p>
                </div>
              </motion.div>
            </motion.div>
            
            <motion.div
              className="relative"
              variants={fadeInVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <div className="bg-white p-6 rounded-lg shadow-xl relative z-10">
                <div className="border-l-4 border-red-500 pl-4 mb-6">
                  <h3 className="text-xl font-bold text-navy-blue mb-2">The Real Cost</h3>
                  <p className="text-gray-600">
                    Every hour spent on the wrong leads costs you:
                  </p>
                </div>
                
                <div className="space-y-4 mb-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-8 w-8 rounded-full bg-red-500 bg-opacity-10 flex items-center justify-center text-red-500 mr-3">
                      <AlertTriangle className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-gray-700">
                        <span className="font-bold">$250-500</span> in lost potential revenue
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-8 w-8 rounded-full bg-red-500 bg-opacity-10 flex items-center justify-center text-red-500 mr-3">
                      <AlertTriangle className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-gray-700">
                        <span className="font-bold">4-6 hours</span> of wasted follow-up time
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-8 w-8 rounded-full bg-red-500 bg-opacity-10 flex items-center justify-center text-red-500 mr-3">
                      <AlertTriangle className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-gray-700">
                        <span className="font-bold">Opportunity cost</span> of missing ideal clients
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-navy-blue text-white p-4 rounded">
                  <p className="font-bold">
                    For the average solopreneur, this adds up to $10,000+ in lost revenue every month.
                  </p>
                </div>
              </div>
              
              <div className="absolute -top-6 -right-6 bg-gold text-navy-blue-dark p-4 rounded-lg shadow-lg transform rotate-3">
                <p className="font-bold text-lg">Stop the leakage!</p>
              </div>
              
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-lg transform -rotate-3">
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-green-500 flex items-center justify-center text-white mr-3">
                    <Check className="h-5 w-5" />
                  </div>
                  <p className="text-sm font-medium text-gray-800">
                    LeadCloser solves this problem
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Solution Section */}
      <section className="py-16 md:py-24 bg-navy-blue text-white">
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            variants={fadeInVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Introducing <span className="text-gold">LeadCloser</span></h2>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              AI-powered lead scoring that connects you with the right people at the right time
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="bg-white bg-opacity-5 p-6 rounded-lg border border-white border-opacity-10 hover:bg-opacity-10 transition-all"
            >
              <div className="h-16 w-16 rounded-full bg-gold flex items-center justify-center text-navy-blue-dark mb-6">
                <User className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-4">Identify Your Ideal Leads</h3>
              <p className="text-gray-300 mb-6">
                Our 10-question assessment builds your ideal client profile, then our AI finds the perfect matches on LinkedIn.
              </p>
              <ul className="space-y-3">
                {['Role-based targeting', 'Industry specialization', 'Decision-maker focus'].map((item, index) => (
                  <li key={index} className="flex items-center">
                    <Check className="h-5 w-5 text-gold mr-2" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
            
            <motion.div
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white bg-opacity-5 p-6 rounded-lg border border-white border-opacity-10 hover:bg-opacity-10 transition-all"
            >
              <div className="h-16 w-16 rounded-full bg-gold flex items-center justify-center text-navy-blue-dark mb-6">
                <Activity className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-4">Score & Prioritize Prospects</h3>
              <p className="text-gray-300 mb-6">
                Each lead receives a 0-100 score based on 5 key factors that predict their likelihood to convert.
              </p>
              <ul className="space-y-3">
                {['Engagement level (30%)', 'Role relevance (25%)', 'Connection proximity (20%)', 'Activity recency (15%)', 'Content alignment (10%)'].map((item, index) => (
                  <li key={index} className="flex items-center">
                    <Check className="h-5 w-5 text-gold mr-2" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
            
            <motion.div
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="bg-white bg-opacity-5 p-6 rounded-lg border border-white border-opacity-10 hover:bg-opacity-10 transition-all"
            >
              <div className="h-16 w-16 rounded-full bg-gold flex items-center justify-center text-navy-blue-dark mb-6">
                <MessageSquare className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-4">Connect & Convert</h3>
              <p className="text-gray-300 mb-6">
                Connect directly to high-scoring leads with detailed insights that help you craft the perfect outreach message.
              </p>
              <ul className="space-y-3">
                {['One-click LinkedIn connection', 'Personalization insights', 'Conversation starters', 'Follow-up reminders'].map((item, index) => (
                  <li key={index} className="flex items-center">
                    <Check className="h-5 w-5 text-gold mr-2" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            variants={fadeInVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-navy-blue mb-4">How LeadCloser Works</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Three simple steps to transform your LinkedIn lead generation
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <motion.div
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="relative"
            >
              <div className="bg-white p-6 rounded-lg shadow-lg border-t-4 border-gold">
                <div className="absolute -top-6 -left-6 h-12 w-12 rounded-full bg-navy-blue text-white flex items-center justify-center text-xl font-bold">1</div>
                <h3 className="text-xl font-bold text-navy-blue mb-4 mt-6">Complete the Assessment</h3>
                <p className="text-gray-600 mb-6">
                  Answer 10 questions about your ideal client to help our AI understand exactly who you're looking to connect with.
                </p>
                <div className="bg-gray-100 p-4 rounded">
                  <p className="text-sm text-gray-600 italic">
                    "The assessment was quick but thorough. It made me think about my ideal client in ways I hadn't considered before."
                  </p>
                  <p className="text-sm font-bold text-navy-blue mt-2">
                    — Michael S., Marketing Consultant
                  </p>
                </div>
              </div>
              <div className="hidden md:block absolute -right-4 top-1/2 transform -translate-y-1/2 z-10">
                <ArrowRight className="h-8 w-8 text-gold" />
              </div>
            </motion.div>
            
            <motion.div
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="relative"
            >
              <div className="bg-white p-6 rounded-lg shadow-lg border-t-4 border-gold">
                <div className="absolute -top-6 -left-6 h-12 w-12 rounded-full bg-navy-blue text-white flex items-center justify-center text-xl font-bold">2</div>
                <h3 className="text-xl font-bold text-navy-blue mb-4 mt-6">Review Your Lead Matches</h3>
                <p className="text-gray-600 mb-6">
                  Our AI analyzes thousands of potential leads and presents you with the highest-scoring matches, complete with detailed breakdown.
                </p>
                <div className="bg-gray-100 p-4 rounded">
                  <p className="text-sm text-gray-600 italic">
                    "The quality of leads was impressive. I could immediately see why each person was a good match for my business."
                  </p>
                  <p className="text-sm font-bold text-navy-blue mt-2">
                    — Sarah J., Business Coach
                  </p>
                </div>
              </div>
              <div className="hidden md:block absolute -right-4 top-1/2 transform -translate-y-1/2 z-10">
                <ArrowRight className="h-8 w-8 text-gold" />
              </div>
            </motion.div>
            
            <motion.div
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <div className="bg-white p-6 rounded-lg shadow-lg border-t-4 border-gold">
                <div className="absolute -top-6 -left-6 h-12 w-12 rounded-full bg-navy-blue text-white flex items-center justify-center text-xl font-bold">3</div>
                <h3 className="text-xl font-bold text-navy-blue mb-4 mt-6">Connect & Convert</h3>
                <p className="text-gray-600 mb-6">
                  Connect directly to your highest-value prospects with personalized outreach that dramatically increases response rates.
                </p>
                <div className="bg-gray-100 p-4 rounded">
                  <p className="text-sm text-gray-600 italic">
                    "I've closed 3 new clients in the first month using LeadCloser. The ROI has been incredible."
                  </p>
                  <p className="text-sm font-bold text-navy-blue mt-2">
                    — David W., Consultant
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
          
          <motion.div
            className="text-center"
            variants={fadeInVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <Link href="/assessment">
              <Button className="bg-gold text-navy-blue-dark hover:bg-gold-dark text-lg px-8 py-6">
                Start Your Assessment
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
      
      {/* Results Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            variants={fadeInVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-navy-blue mb-4">Real Results from Real Users</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See how solopreneurs and small businesses are transforming their lead generation
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <motion.div
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <Card className="h-full">
                <CardContent className="p-6">
                  <div className="flex items-center mb-6">
                    <div className="h-16 w-16 rounded-full bg-navy-blue flex items-center justify-center text-white text-2xl font-bold mr-4">
                      J
                    </div>
                    <div>
                      <h3 className="font-bold text-navy-blue">James T.</h3>
                      <p className="text-gray-600">Marketing Consultant</p>
                    </div>
                  </div>
                  <div className="mb-6">
                    <div className="flex items-center mb-2">
                      <div className="text-gold mr-2">
                        {Array(5).fill(0).map((_, i) => (
                          <span key={i} className="text-xl">★</span>
                        ))}
                      </div>
                      <span className="text-gray-600">5.0</span>
                    </div>
                    <p className="text-gray-700">
                      "I was spending 10+ hours weekly trying to find good leads on LinkedIn. With LeadCloser, I get better quality leads in minutes, not hours. My connection acceptance rate went from 22% to 68%."
                    </p>
                  </div>
                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between text-sm">
                      <div>
                        <p className="text-gray-500">Connection Rate</p>
                        <p className="font-bold text-navy-blue">68%</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Time Saved</p>
                        <p className="font-bold text-navy-blue">9 hrs/week</p>
                      </div>
                      <div>
                        <p className="text-gray-500">New Clients</p>
                        <p className="font-bold text-navy-blue">4 in 30 days</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Card className="h-full">
                <CardContent className="p-6">
                  <div className="flex items-center mb-6">
                    <div className="h-16 w-16 rounded-full bg-navy-blue flex items-center justify-center text-white text-2xl font-bold mr-4">
                      A
                    </div>
                    <div>
                      <h3 className="font-bold text-navy-blue">Alicia M.</h3>
                      <p className="text-gray-600">Business Coach</p>
                    </div>
                  </div>
                  <div className="mb-6">
                    <div className="flex items-center mb-2">
                      <div className="text-gold mr-2">
                        {Array(5).fill(0).map((_, i) => (
                          <span key={i} className="text-xl">★</span>
                        ))}
                      </div>
                      <span className="text-gray-600">5.0</span>
                    </div>
                    <p className="text-gray-700">
                      "The lead scoring is incredibly accurate. I've closed 3 high-ticket clients in my first month using LeadCloser. The ROI has been over 20X what I paid for the subscription."
                    </p>
                  </div>
                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between text-sm">
                      <div>
                        <p className="text-gray-500">Response Rate</p>
                        <p className="font-bold text-navy-blue">72%</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Time Saved</p>
                        <p className="font-bold text-navy-blue">12 hrs/week</p>
                      </div>
                      <div>
                        <p className="text-gray-500">ROI</p>
                        <p className="font-bold text-navy-blue">20X</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <Card className="h-full">
                <CardContent className="p-6">
                  <div className="flex items-center mb-6">
                    <div className="h-16 w-16 rounded-full bg-navy-blue flex items-center justify-center text-white text-2xl font-bold mr-4">
                      R
                    </div>
                    <div>
                      <h3 className="font-bold text-navy-blue">Ryan K.</h3>
                      <p className="text-gray-600">Freelance Developer</p>
                    </div>
                  </div>
                  <div className="mb-6">
                    <div className="flex items-center mb-2">
                      <div className="text-gold mr-2">
                        {Array(5).fill(0).map((_, i) => (
                          <span key={i} className="text-xl">★</span>
                        ))}
                      </div>
                      <span className="text-gray-600">4.9</span>
                    </div>
                    <p className="text-gray-700">
                      "As a developer, I'm terrible at networking. LeadCloser helped me find exactly the right kind of clients who need my services. I've booked out 3 months in advance thanks to the quality leads."
                    </p>
                  </div>
                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between text-sm">
                      <div>
                        <p className="text-gray-500">Conversion Rate</p>
                        <p className="font-bold text-navy-blue">32%</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Time Saved</p>
                        <p className="font-bold text-navy-blue">8 hrs/week</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Revenue Increase</p>
                        <p className="font-bold text-navy-blue">43%</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
          
          <motion.div
            className="bg-white p-8 rounded-lg shadow-lg border border-gray-200"
            variants={fadeInVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="flex flex-col md:flex-row items-center">
              <div className="mb-6 md:mb-0 md:mr-8">
                <div className="h-20 w-20 rounded-full bg-navy-blue flex items-center justify-center text-white">
                  <Activity className="h-10 w-10" />
                </div>
              </div>
              <div className="text-center md:text-left mb-6 md:mb-0">
                <h3 className="text-2xl font-bold text-navy-blue mb-2">Average Results After 30 Days</h3>
                <p className="text-gray-600">
                  Based on data from 500+ LeadCloser users
                </p>
              </div>
              <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <p className="text-3xl font-bold text-navy-blue">67%</p>
                  <p className="text-sm text-gray-600">Higher Connection Rate</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-navy-blue">10+</p>
                  <p className="text-sm text-gray-600">Hours Saved Weekly</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-navy-blue">3-5</p>
                  <p className="text-sm text-gray-600">New Clients Monthly</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-navy-blue">15X</p>
                  <p className="text-sm text-gray-600">Average ROI</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Pricing Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            variants={fadeInVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-navy-blue mb-4">Simple, Transparent Pricing</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose the plan that fits your business needs
            </p>
            <div className="inline-flex items-center bg-gray-100 rounded-full p-1 mt-6">
              <button className="px-4 py-2 rounded-full bg-navy-blue text-white">
                Monthly
              </button>
              <button className="px-4 py-2 rounded-full text-gray-700">
                Annual (Save 20%)
              </button>
            </div>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <motion.div
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <Card className="h-full border-gray-200 hover:border-navy-blue transition-colors">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-navy-blue mb-2">Free</h3>
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-navy-blue">$0</span>
                    <span className="text-gray-500">/month</span>
                  </div>
                  <p className="text-gray-600 mb-6">
                    Perfect for trying out LeadCloser
                  </p>
                  <ul className="space-y-3 mb-8">
                    {[
                      'Generate up to 10 leads per month',
                      'Basic lead scoring',
                      'Email support',
                      'Standard lead cards'
                    ].map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href="/signup">
                    <Button variant="outline" className="w-full border-navy-blue text-navy-blue hover:bg-navy-blue hover:text-white">
                      Get Started
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Card className="h-full relative border-gold shadow-lg">
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gold text-navy-blue-dark px-4 py-1 rounded-full text-sm font-bold">
                  MOST POPULAR
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-navy-blue mb-2">Professional</h3>
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-navy-blue">$29</span>
                    <span className="text-gray-500">/month</span>
                    <span className="ml-2 line-through text-gray-400">$59</span>
                    <span className="ml-2 bg-green-100 text-green-800 text-xs px-2 py-1 rounded">50% OFF</span>
                  </div>
                  <p className="text-gray-600 mb-6">
                    Ideal for solopreneurs and freelancers
                  </p>
                  <ul className="space-y-3 mb-8">
                    {[
                      'Generate up to 50 leads per month',
                      'Advanced lead scoring',
                      'Detailed score breakdown',
                      'Export leads to CSV',
                      'Priority email support',
                      'Lead status tracking'
                    ].map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href="/signup?plan=professional">
                    <Button className="w-full bg-gold text-navy-blue-dark hover:bg-gold-dark">
                      Get Started
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <Card className="h-full border-gray-200 hover:border-navy-blue transition-colors">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-navy-blue mb-2">Business</h3>
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-navy-blue">$79</span>
                    <span className="text-gray-500">/month</span>
                    <span className="ml-2 line-through text-gray-400">$159</span>
                    <span className="ml-2 bg-green-100 text-green-800 text-xs px-2 py-1 rounded">50% OFF</span>
                  </div>
                  <p className="text-gray-600 mb-6">
                    For small teams and growing businesses
                  </p>
                  <ul className="space-y-3 mb-8">
                    {[
                      'Generate up to 200 leads per month',
                      'Advanced lead scoring',
                      'Detailed score breakdown',
                      'Export leads to CSV/Excel',
                      'Priority email & phone support',
                      'Lead status tracking',
                      'Team collaboration (up to 3 users)',
                      'Custom lead criteria'
                    ].map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href="/signup?plan=business">
                    <Button variant="outline" className="w-full border-navy-blue text-navy-blue hover:bg-navy-blue hover:text-white">
                      Get Started
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          </div>
          
          <motion.div
            className="bg-navy-blue text-white p-8 rounded-lg"
            variants={fadeInVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-6 md:mb-0">
                <h3 className="text-2xl font-bold mb-2">Ready to find your ideal clients?</h3>
                <p className="text-gray-300">
                  Start your free trial today. No credit card required.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/signup">
                  <Button className="bg-gold text-navy-blue-dark hover:bg-gold-dark">
                    Start Free Trial
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/assessment">
                  <Button variant="outline" className="border-white text-white hover:bg-white hover:text-navy-blue">
                    Take the Assessment
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            variants={fadeInVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-navy-blue mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to know about LeadCloser
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <motion.div
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <div className="mb-6">
                <h3 className="text-xl font-bold text-navy-blue mb-2">How does LeadCloser find leads?</h3>
                <p className="text-gray-600">
                  LeadCloser uses your assessment answers to create an ideal client profile, then applies our proprietary algorithm to identify LinkedIn users who match your criteria. We analyze engagement patterns, role relevance, connection proximity, activity recency, and content alignment to score each potential lead.
                </p>
              </div>
            </motion.div>
            
            <motion.div
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <div className="mb-6">
                <h3 className="text-xl font-bold text-navy-blue mb-2">Do I need to connect my LinkedIn account?</h3>
                <p className="text-gray-600">
                  No, LeadCloser doesn't require direct access to your LinkedIn account. We provide you with lead recommendations and detailed profiles, but you'll connect with them directly through LinkedIn's platform using our one-click link.
                </p>
              </div>
            </motion.div>
            
            <motion.div
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="mb-6">
                <h3 className="text-xl font-bold text-navy-blue mb-2">How accurate is the lead scoring?</h3>
                <p className="text-gray-600">
                  Our lead scoring algorithm has been trained on millions of successful B2B connections and has an average accuracy rate of 87%. We continuously refine our algorithm based on user feedback and connection outcomes to improve accuracy over time.
                </p>
              </div>
            </motion.div>
            
            <motion.div
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <div className="mb-6">
                <h3 className="text-xl font-bold text-navy-blue mb-2">Can I cancel my subscription anytime?</h3>
                <p className="text-gray-600">
                  Yes, you can cancel your subscription at any time with no questions asked. There are no long-term contracts or cancellation fees. You'll continue to have access until the end of your current billing period.
                </p>
              </div>
            </motion.div>
            
            <motion.div
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <div className="mb-6">
                <h3 className="text-xl font-bold text-navy-blue mb-2">How many leads can I expect?</h3>
                <p className="text-gray-600">
                  The Free plan provides up to 10 leads per month, Professional up to 50, and Business up to 200. However, we prioritize quality over quantity. You'll receive fewer, higher-quality leads rather than a large number of poor matches.
                </p>
              </div>
            </motion.div>
            
            <motion.div
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              <div className="mb-6">
                <h3 className="text-xl font-bold text-navy-blue mb-2">Is there a guarantee?</h3>
                <p className="text-gray-600">
                  Yes, we offer a 14-day money-back guarantee for all paid plans. If you're not satisfied with the quality of leads or the service for any reason, simply contact our support team for a full refund.
                </p>
              </div>
            </motion.div>
          </div>
          
          <motion.div
            className="text-center mt-12"
            variants={fadeInVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <p className="text-gray-600 mb-4">
              Still have questions? We're here to help.
            </p>
            <Link href="/contact">
              <Button variant="outline" className="border-navy-blue text-navy-blue hover:bg-navy-blue hover:text-white">
                Contact Support
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
      
      {/* Final CTA Section */}
      <section className="py-16 md:py-24 bg-navy-blue text-white">
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center mb-12"
            variants={fadeInVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Stop Wasting Time on the Wrong Leads</h2>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              Join 500+ solopreneurs and small businesses who are finding their ideal clients with LeadCloser
            </p>
          </motion.div>
          
          <motion.div
            className="bg-white bg-opacity-5 p-8 rounded-lg border border-white border-opacity-10 max-w-4xl mx-auto mb-12"
            variants={fadeInVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="flex flex-col md:flex-row items-center">
              <div className="mb-6 md:mb-0 md:mr-8">
                <div className="h-20 w-20 rounded-full bg-gold flex items-center justify-center text-navy-blue-dark">
                  <Clock className="h-10 w-10" />
                </div>
              </div>
              <div className="text-center md:text-left mb-6 md:mb-0 md:mr-8">
                <h3 className="text-2xl font-bold mb-2">Limited Time Offer</h3>
                <p className="text-gray-300">
                  Get 50% off all plans for the first 3 months
                </p>
                <div className="mt-4 grid grid-cols-4 gap-2">
                  <div className="bg-white bg-opacity-10 rounded p-2 text-center">
                    <span className="block text-lg font-bold">{countdown.days}</span>
                    <span className="text-xs">Days</span>
                  </div>
                  <div className="bg-white bg-opacity-10 rounded p-2 text-center">
                    <span className="block text-lg font-bold">{countdown.hours}</span>
                    <span className="text-xs">Hours</span>
                  </div>
                  <div className="bg-white bg-opacity-10 rounded p-2 text-center">
                    <span className="block text-lg font-bold">{countdown.minutes}</span>
                    <span className="text-xs">Mins</span>
                  </div>
                  <div className="bg-white bg-opacity-10 rounded p-2 text-center">
                    <span className="block text-lg font-bold">{countdown.seconds}</span>
                    <span className="text-xs">Secs</span>
                  </div>
                </div>
              </div>
              <div>
                <Link href="/signup">
                  <Button className="bg-gold text-navy-blue-dark hover:bg-gold-dark">
                    Claim Your Discount
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            className="text-center"
            variants={fadeInVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <Link href="/assessment">
              <Button className="bg-white text-navy-blue hover:bg-gray-100 text-lg px-8 py-6">
                Take the Free Assessment
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <p className="mt-4 text-gray-300">
              No credit card required. Start finding your ideal clients today.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
