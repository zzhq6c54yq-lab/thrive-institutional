
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, CheckCircle, AlertTriangle, Clipboard, Brain, Heart, Activity, BarChart2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import useFeatureActions from "@/hooks/useFeatureActions";

const ChronicIllnessAssessments: React.FC = () => {
  const { handleActionClick } = useFeatureActions();
  
  const assessments = [
    {
      id: "a1",
      title: "Chronic Pain Impact Assessment",
      description: "Evaluate how chronic pain affects your daily functioning and quality of life",
      icon: Activity,
      time: "10-15 minutes",
      questions: 42,
      urgency: "recommended",
      category: "pain"
    },
    {
      id: "a2",
      title: "Mood & Emotion Tracking",
      description: "Monitor how your chronic condition affects your emotional wellbeing",
      icon: Brain,
      time: "5-7 minutes",
      questions: 20,
      urgency: "high",
      category: "emotional"
    },
    {
      id: "a3",
      title: "Fatigue & Energy Assessment",
      description: "Evaluate your energy levels and fatigue patterns",
      icon: Activity,
      time: "8-10 minutes",
      questions: 25,
      urgency: "medium",
      category: "fatigue"
    },
    {
      id: "a4",
      title: "Medication Impact Evaluation",
      description: "Track how your medications affect your symptoms and side effects",
      icon: Heart,
      time: "10-12 minutes",
      questions: 30,
      urgency: "recommended",
      category: "medication"
    },
    {
      id: "needs",
      title: "Support Needs Assessment",
      description: "Identify areas where you need additional support or resources",
      icon: Clipboard,
      time: "15 minutes",
      questions: 45,
      urgency: "medium",
      category: "support"
    },
    {
      id: "a6",
      title: "Depression Screening (PHQ-9)",
      description: "Standard screening tool for symptoms of depression",
      icon: Brain,
      time: "3-5 minutes",
      questions: 9,
      urgency: "high",
      category: "clinical"
    }
  ];

  const getUrgencyLabel = (urgency) => {
    switch(urgency) {
      case 'high': 
        return (
          <div className="flex items-center gap-1.5 text-red-400">
            <AlertTriangle className="h-4 w-4" />
            <span>High Priority</span>
          </div>
        );
      case 'medium': 
        return (
          <div className="flex items-center gap-1.5 text-amber-400">
            <Clock className="h-4 w-4" />
            <span>Recommended</span>
          </div>
        );
      case 'recommended':
      default:
        return (
          <div className="flex items-center gap-1.5 text-blue-400">
            <CheckCircle className="h-4 w-4" />
            <span>Beneficial</span>
          </div>
        );
    }
  };
  
  const getUserProgress = (assessmentId) => {
    // In a real app, this would come from user data
    const completedAssessments = ["a2", "a4"];
    const partialAssessments = {
      "a1": 75,
      "a3": 30,
    };
    
    if (completedAssessments.includes(assessmentId)) {
      return {
        completed: true,
        progress: 100
      };
    }
    
    if (assessmentId in partialAssessments) {
      return {
        completed: false,
        progress: partialAssessments[assessmentId]
      };
    }
    
    return {
      completed: false,
      progress: 0
    };
  };

  const handleAssessmentClick = (assessment) => {
    const progress = getUserProgress(assessment.id);
    
    handleActionClick({
      type: "assessment",
      id: assessment.id,
      title: assessment.title,
      path: `/chronic-illness/assess-${assessment.id}`
    });
  };

  return (
    <div className="space-y-8">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-purple-800 dark:text-purple-200">Chronic Illness Assessments</h2>
        <p className="text-purple-700 dark:text-purple-300">
          Tools to help you understand and track your symptoms, emotional health, and quality of life.
        </p>
      </div>
      
      {/* Information Card */}
      <Card className="bg-gradient-to-r from-purple-100 to-purple-200 dark:from-purple-900/40 dark:to-purple-800/30 border-purple-300 dark:border-purple-700/50">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="p-2 rounded-full bg-purple-600/30 mt-1">
              <BarChart2 className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-purple-800 dark:text-purple-200 mb-2">Track Your Progress</h3>
              <p className="text-purple-700 dark:text-purple-300 mb-3">
                These assessments help you monitor changes in your condition over time. Regular tracking 
                can reveal patterns and help you manage your symptoms more effectively. Your results are 
                completely confidential and are only used to provide personalized recommendations.
              </p>
              <Button variant="link" className="text-purple-600 p-0">Learn more about assessment benefits</Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Assessments Grid */}
      <div>
        <h3 className="text-xl font-semibold text-purple-700 dark:text-purple-300 mb-4">Available Assessments</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {assessments.map((assessment) => {
            const progress = getUserProgress(assessment.id);
            
            return (
              <Card key={assessment.id} className="bg-white dark:bg-gray-800/50 border-purple-200 dark:border-purple-900/50 transition-all hover:shadow-lg overflow-hidden flex flex-col">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 rounded-full bg-purple-100 dark:bg-purple-900/30">
                      <assessment.icon className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <CardTitle className="text-purple-800 dark:text-purple-200">{assessment.title}</CardTitle>
                  </div>
                  <CardDescription className="line-clamp-2">{assessment.description}</CardDescription>
                </CardHeader>
                
                <CardContent className="flex-grow">
                  <div className="space-y-4 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-purple-700/70 dark:text-purple-300/70">Time to complete:</span>
                      <span className="text-purple-700 dark:text-purple-300">{assessment.time}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-purple-700/70 dark:text-purple-300/70">Questions:</span>
                      <span className="text-purple-700 dark:text-purple-300">{assessment.questions}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-purple-700/70 dark:text-purple-300/70">Priority:</span>
                      {getUrgencyLabel(assessment.urgency)}
                    </div>
                    
                    {/* Progress if started */}
                    {progress.progress > 0 && (
                      <div className="pt-2">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-purple-700/70 dark:text-purple-300/70">Your progress:</span>
                          <span className="text-purple-600 dark:text-purple-400">{progress.progress}%</span>
                        </div>
                        <Progress value={progress.progress} className="h-2 bg-purple-100 dark:bg-purple-900/30" />
                      </div>
                    )}
                  </div>
                </CardContent>
                
                <CardFooter>
                  {progress.completed ? (
                    <Button 
                      variant="outline" 
                      className="w-full border-green-500/50 text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20"
                      onClick={() => handleAssessmentClick(assessment)}
                    >
                      <CheckCircle className="h-4 w-4 mr-2" /> View Results
                    </Button>
                  ) : progress.progress > 0 ? (
                    <Button 
                      className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                      onClick={() => handleAssessmentClick(assessment)}
                    >
                      Continue Assessment
                    </Button>
                  ) : (
                    <Button 
                      className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                      onClick={() => handleAssessmentClick(assessment)}
                    >
                      Start Assessment
                    </Button>
                  )}
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ChronicIllnessAssessments;
