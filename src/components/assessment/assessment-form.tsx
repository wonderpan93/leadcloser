import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { AssessmentQuestion, assessmentQuestions, getDefaultAnswers } from '@/lib/assessment/questions';
import { useRouter } from 'next/navigation';

// Create a dynamic schema based on question types
const createAssessmentSchema = () => {
  const shape: Record<string, any> = {};
  
  assessmentQuestions.forEach((question) => {
    if (question.type === 'text') {
      shape[question.id] = z.string().min(1, { message: 'This field is required' });
    } else if (question.type === 'select') {
      shape[question.id] = z.string().min(1, { message: 'Please select an option' });
    } else if (question.type === 'radio') {
      shape[question.id] = z.string().min(1, { message: 'Please select an option' });
    } else if (question.type === 'multiselect') {
      shape[question.id] = z.array(z.string()).min(1, { message: 'Please select at least one option' });
    } else if (question.type === 'range') {
      shape[question.id] = z.number().min(question.min || 1).max(question.max || 5);
    }
  });
  
  return z.object(shape);
};

export function AssessmentForm() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = React.useState(0);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  
  const schema = createAssessmentSchema();
  type AssessmentFormValues = z.infer<typeof schema>;
  
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<AssessmentFormValues>({
    resolver: zodResolver(schema),
    defaultValues: getDefaultAnswers(),
  });
  
  const totalSteps = assessmentQuestions.length;
  const progress = ((currentStep + 1) / totalSteps) * 100;
  const currentQuestion = assessmentQuestions[currentStep];
  
  const nextStep = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    }
  };
  
  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  const onSubmit = async (data: AssessmentFormValues) => {
    setIsSubmitting(true);
    setError(null);
    
    try {
      const response = await fetch('/api/assessment/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ answers: data }),
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.message || 'Failed to submit assessment');
      }
      
      // Redirect to dashboard with leads
      router.push('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while submitting your assessment');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const renderQuestionField = (question: AssessmentQuestion) => {
    switch (question.type) {
      case 'text':
        return (
          <div className="space-y-2">
            <Input
              id={question.id}
              placeholder="Type your answer here"
              {...register(question.id)}
            />
            {errors[question.id] && (
              <p className="text-sm text-red-500">{errors[question.id]?.message as string}</p>
            )}
          </div>
        );
        
      case 'select':
        return (
          <div className="space-y-2">
            <Controller
              name={question.id}
              control={control}
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select an option" />
                  </SelectTrigger>
                  <SelectContent>
                    {question.options?.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors[question.id] && (
              <p className="text-sm text-red-500">{errors[question.id]?.message as string}</p>
            )}
          </div>
        );
        
      case 'radio':
        return (
          <div className="space-y-2">
            <Controller
              name={question.id}
              control={control}
              render={({ field }) => (
                <RadioGroup
                  onValueChange={field.onChange}
                  value={field.value}
                  className="space-y-2"
                >
                  {question.options?.map((option) => (
                    <div key={option.value} className="flex items-center space-x-2">
                      <RadioGroupItem value={option.value} id={`${question.id}-${option.value}`} />
                      <Label htmlFor={`${question.id}-${option.value}`}>{option.label}</Label>
                    </div>
                  ))}
                </RadioGroup>
              )}
            />
            {errors[question.id] && (
              <p className="text-sm text-red-500">{errors[question.id]?.message as string}</p>
            )}
          </div>
        );
        
      case 'multiselect':
        return (
          <div className="space-y-3">
            <Controller
              name={question.id}
              control={control}
              render={({ field }) => (
                <div className="space-y-2">
                  {question.options?.map((option) => (
                    <div key={option.value} className="flex items-center space-x-2">
                      <Checkbox
                        id={`${question.id}-${option.value}`}
                        checked={field.value.includes(option.value)}
                        onCheckedChange={(checked) => {
                          const updatedValue = checked
                            ? [...field.value, option.value]
                            : field.value.filter((value: string) => value !== option.value);
                          field.onChange(updatedValue);
                        }}
                      />
                      <Label htmlFor={`${question.id}-${option.value}`}>{option.label}</Label>
                    </div>
                  ))}
                </div>
              )}
            />
            {errors[question.id] && (
              <p className="text-sm text-red-500">{errors[question.id]?.message as string}</p>
            )}
          </div>
        );
        
      case 'range':
        return (
          <div className="space-y-6">
            <Controller
              name={question.id}
              control={control}
              render={({ field }) => (
                <div className="space-y-6">
                  <Slider
                    min={question.min || 1}
                    max={question.max || 5}
                    step={1}
                    value={[field.value]}
                    onValueChange={(value) => field.onChange(value[0])}
                  />
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>{question.minLabel || question.min}</span>
                    <span>{question.maxLabel || question.max}</span>
                  </div>
                </div>
              )}
            />
            {errors[question.id] && (
              <p className="text-sm text-red-500">{errors[question.id]?.message as string}</p>
            )}
          </div>
        );
        
      default:
        return null;
    }
  };
  
  return (
    <div className="w-full max-w-3xl mx-auto">
      <Card className="w-full">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-2xl font-bold">Ideal Client Assessment</CardTitle>
              <CardDescription>
                Question {currentStep + 1} of {totalSteps}
              </CardDescription>
            </div>
            <div className="text-sm text-gray-500">
              {Math.round(progress)}% Complete
            </div>
          </div>
          <Progress value={progress} className="h-2" />
        </CardHeader>
        <CardContent>
          <form id="assessment-form" onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">{currentQuestion.question}</h3>
              {currentQuestion.description && (
                <p className="text-sm text-gray-500">{currentQuestion.description}</p>
              )}
              {renderQuestionField(currentQuestion)}
            </div>
            {error && (
              <div className="p-3 bg-red-50 text-red-500 rounded-md text-sm">
                {error}
              </div>
            )}
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            type="button"
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 0 || isSubmitting}
          >
            Previous
          </Button>
          {currentStep < totalSteps - 1 ? (
            <Button type="button" onClick={nextStep} disabled={isSubmitting}>
              Next
            </Button>
          ) : (
            <Button
              type="submit"
              form="assessment-form"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Find My Ideal Leads'}
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
