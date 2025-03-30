import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ArrowRight, Check, Clock, AlertTriangle } from 'lucide-react';
import Image from 'next/image';

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

interface Question {
  id: string;
  question: string;
  options: string[];
}

interface AssessmentProps {
  questions: Question[];
  currentQuestionIndex: number;
  answers: Record<string, string>;
  onAnswer: (questionId: string, answer: string) => void;
  onNext: () => void;
  onPrevious: () => void;
  onSubmit: () => void;
}

export function AnimatedAssessment({
  questions,
  currentQuestionIndex,
  answers,
  onAnswer,
  onNext,
  onPrevious,
  onSubmit
}: AssessmentProps) {
  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const isFirstQuestion = currentQuestionIndex === 0;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg"
    >
      <div className="flex items-center justify-center mb-8">
        <div className="h-12 w-12 relative mr-2">
          <Image 
            src="/images/LeadCloserLogo.jpg" 
            alt="LeadCloser Logo" 
            fill
            className="object-contain rounded-full"
          />
        </div>
        <h1 className="text-2xl font-bold text-navy-blue">LeadCloser Assessment</h1>
      </div>
      
      <div className="mb-8">
        <div className="flex justify-between text-sm text-gray-500 mb-2">
          <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
          <span>{Math.round(progress)}% Complete</span>
        </div>
        <Progress value={progress} className="h-2 bg-gray-200" indicatorClassName="bg-gold" />
      </div>

      <motion.div
        key={currentQuestion.id}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3 }}
      >
        <h2 className="text-2xl font-bold mb-6 text-navy-blue">{currentQuestion.question}</h2>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-4 mb-8"
        >
          {currentQuestion.options.map((option, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card
                className={`cursor-pointer transition-all ${
                  answers[currentQuestion.id] === option
                    ? 'border-gold bg-gold bg-opacity-10'
                    : 'hover:border-gray-300'
                }`}
                onClick={() => onAnswer(currentQuestion.id, option)}
              >
                <CardContent className="p-4 flex items-center justify-between">
                  <span className="text-navy-blue">{option}</span>
                  {answers[currentQuestion.id] === option && (
                    <Check className="h-5 w-5 text-gold" />
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Urgency element */}
        {isLastQuestion && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mb-8 p-4 border border-gold bg-gold bg-opacity-5 rounded-lg flex items-center"
          >
            <Clock className="h-5 w-5 text-gold mr-2 animate-pulse" />
            <div>
              <p className="font-medium text-navy-blue">Limited Time Offer</p>
              <p className="text-sm text-gray-600">Complete your assessment now to unlock 50% off our launch pricing!</p>
            </div>
          </motion.div>
        )}

        <div className="flex justify-between mt-8">
          <Button
            variant="outline"
            onClick={onPrevious}
            disabled={isFirstQuestion}
            className="border-navy-blue text-navy-blue hover:bg-navy-blue hover:text-white"
          >
            Previous
          </Button>
          
          {isLastQuestion ? (
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                onClick={onSubmit}
                disabled={!answers[currentQuestion.id]}
                className="bg-gold text-navy-blue-dark hover:bg-gold-dark"
              >
                Submit Assessment
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
          ) : (
            <Button 
              onClick={onNext}
              disabled={!answers[currentQuestion.id]}
              className="bg-navy-blue text-white hover:bg-navy-blue-light"
            >
              Next Question
            </Button>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

interface ResultsProps {
  score: number;
  breakdown: {
    category: string;
    score: number;
    weight: number;
    description: string;
  }[];
  onContinue: () => void;
}

export function AnimatedResults({ score, breakdown, onContinue }: ResultsProps) {
  // Get color based on score
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-500';
    if (score >= 60) return 'text-emerald-500';
    if (score >= 40) return 'text-yellow-500';
    if (score >= 20) return 'text-orange-500';
    return 'text-red-500';
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg"
    >
      <div className="flex items-center justify-center mb-8">
        <div className="h-12 w-12 relative mr-2">
          <Image 
            src="/images/LeadCloserLogo.jpg" 
            alt="LeadCloser Logo" 
            fill
            className="object-contain rounded-full"
          />
        </div>
        <h1 className="text-2xl font-bold text-navy-blue">Your Results</h1>
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <h2 className="text-3xl font-bold mb-2 text-navy-blue">Your AI Opportunity Score</h2>
        <p className="text-gray-500 mb-6">
          Based on your assessment, here's how ready your business is for AI implementation
        </p>
        <div className={`text-6xl font-bold ${getScoreColor(score)} mb-2`}>
          {score}/100
        </div>
        <p className="text-gray-500">
          {score >= 80
            ? "Excellent! You're ready for advanced AI implementation."
            : score >= 60
            ? "Good! You have strong potential for AI implementation."
            : score >= 40
            ? "Fair. There are several areas where AI can help your business."
            : "You have significant opportunities to improve with AI."}
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-6 mb-8"
      >
        <h3 className="text-xl font-bold text-navy-blue mb-2">Detailed Breakdown</h3>
        
        {breakdown.map((item, index) => (
          <motion.div 
            key={index} 
            variants={itemVariants}
            className="space-y-2"
          >
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-medium text-navy-blue">{item.category}</h4>
                <p className="text-sm text-gray-500">{item.description}</p>
              </div>
              <span className={`font-bold ${getScoreColor(item.score)}`}>
                {item.score}/100
              </span>
            </div>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 0.5, delay: 0.3 + (index * 0.1) }}
            >
              <Progress value={item.score} className="h-2 bg-gray-200" indicatorClassName={`${item.score >= 80 ? 'bg-green-500' : item.score >= 60 ? 'bg-emerald-500' : item.score >= 40 ? 'bg-yellow-500' : item.score >= 20 ? 'bg-orange-500' : 'bg-red-500'}`} />
            </motion.div>
          </motion.div>
        ))}
      </motion.div>

      {/* Urgency element */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="mb-8 p-4 border border-gold bg-gold bg-opacity-5 rounded-lg flex items-center"
      >
        <AlertTriangle className="h-5 w-5 text-gold mr-2" />
        <div>
          <p className="font-medium text-navy-blue">Limited Time Opportunity</p>
          <p className="text-sm text-gray-600">
            Only <span className="font-bold text-error">7 spots</span> remaining at our special launch pricing. 
            Secure your spot now before prices increase!
          </p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.7 }}
        className="text-center"
      >
        <p className="text-gray-700 mb-6">
          Ready to see the high-quality leads we've identified for your business?
        </p>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button 
            size="lg" 
            onClick={onContinue}
            className="bg-gold text-navy-blue-dark hover:bg-gold-dark"
          >
            View My Leads
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </motion.div>
        <p className="mt-4 text-sm text-gray-500">
          No credit card required to start your 14-day free trial
        </p>
      </motion.div>
    </motion.div>
  );
}
