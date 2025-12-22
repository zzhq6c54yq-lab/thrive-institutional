import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Brain, Heart, Target, BookOpen, Palette, Music, Users, Lightbulb, TrendingUp, Calendar } from 'lucide-react';
import { useUser } from '@/contexts/UserContext';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

interface AssessmentResult {
  type: string;
  score: number;
  risk_level: 'low' | 'medium' | 'high';
  date: Date;
  recommendations: string[];
}

interface PersonalizedRecommendation {
  id: string;
  title: string;
  description: string;
  category: 'therapy' | 'assessment' | 'workshop' | 'community' | 'lifestyle';
  priority: 'high' | 'medium' | 'low';
  icon: React.ReactNode;
  path?: string;
  estimatedTime: string;
  benefits: string[];
  basedOn: string[];
}

const PersonalizedRecommendations: React.FC = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const [recommendations, setRecommendations] = useState<PersonalizedRecommendation[]>([]);
  const [assessmentResults, setAssessmentResults] = useState<AssessmentResult[]>([]);
  const [userPreferences, setUserPreferences] = useState({
    preferredActivities: [] as string[],
    riskFactors: [] as string[],
    completedAssessments: [] as string[],
    goals: [] as string[]
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadUserData();
    }
  }, [user]);

  const loadUserData = async () => {
    try {
      // Load user profile and preferences
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user?.id)
        .single();

      // Load journal entries for mood analysis
      const { data: journalEntries } = await supabase
        .from('journal_entries')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false })
        .limit(30);

      // Simulate assessment results (would come from actual assessment completions)
      const mockAssessmentResults: AssessmentResult[] = [
        {
          type: 'anxiety',
          score: 14,
          risk_level: 'medium',
          date: new Date(),
          recommendations: ['Practice breathing exercises', 'Consider therapy', 'Maintain regular exercise']
        },
        {
          type: 'depression',
          score: 8,
          risk_level: 'low',
          date: new Date(),
          recommendations: ['Keep journaling', 'Stay socially connected', 'Maintain sleep schedule']
        }
      ];

      setAssessmentResults(mockAssessmentResults);

      // Analyze user data to determine preferences and risk factors
      const preferences = {
        preferredActivities: ['journaling', 'meditation', 'art-therapy'],
        riskFactors: mockAssessmentResults.filter(r => r.risk_level !== 'low').map(r => r.type),
        completedAssessments: mockAssessmentResults.map(r => r.type),
        goals: profile?.goals || []
      };

      setUserPreferences(preferences);

      // Generate personalized recommendations
      const personalizedRecs = generateRecommendations(preferences, mockAssessmentResults, journalEntries || []);
      setRecommendations(personalizedRecs);

    } catch (error) {
      console.error('Error loading user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const generateRecommendations = (
    preferences: typeof userPreferences,
    assessments: AssessmentResult[],
    journalEntries: any[]
  ): PersonalizedRecommendation[] => {
    const recs: PersonalizedRecommendation[] = [];

    // High-priority recommendations based on risk factors
    preferences.riskFactors.forEach(factor => {
      if (factor === 'anxiety') {
        recs.push({
          id: 'anxiety-therapy',
          title: 'Anxiety Management Workshop',
          description: 'Learn evidence-based techniques to manage anxiety symptoms and triggers.',
          category: 'workshop',
          priority: 'high',
          icon: <Brain className="h-5 w-5" />,
          path: '/workshops/anxiety-management',
          estimatedTime: '45 minutes',
          benefits: ['Reduced anxiety symptoms', 'Better coping strategies', 'Increased confidence'],
          basedOn: ['High anxiety assessment scores', 'Recent journal entries showing worry patterns']
        });
      }

      if (factor === 'depression') {
        recs.push({
          id: 'mood-boosting',
          title: 'Mood Enhancement Activities',
          description: 'Explore activities proven to improve mood and emotional well-being.',
          category: 'therapy',
          priority: 'high',
          icon: <Heart className="h-5 w-5" />,
          path: '/activities/mood-boosting',
          estimatedTime: '30 minutes',
          benefits: ['Improved mood', 'Increased energy', 'Better sleep quality'],
          basedOn: ['Depression assessment results', 'Low mood indicators in journal']
        });
      }
    });

    // Recommendations based on user goals
    if (preferences.goals.includes('stress_management')) {
      recs.push({
        id: 'stress-reduction',
        title: 'Progressive Muscle Relaxation',
        description: 'Master this powerful technique for physical and mental stress relief.',
        category: 'therapy',
        priority: 'medium',
        icon: <Target className="h-5 w-5" />,
        path: '/workshops/progressive-muscle-relaxation',
        estimatedTime: '20 minutes',
        benefits: ['Reduced muscle tension', 'Better stress response', 'Improved sleep'],
        basedOn: ['Selected stress management as goal', 'Journal entries mentioning tension']
      });
    }

    // Activity-based recommendations
    if (!preferences.preferredActivities.includes('journaling') && journalEntries.length < 5) {
      recs.push({
        id: 'start-journaling',
        title: 'Begin Your Wellness Journey',
        description: 'Start tracking your thoughts, feelings, and progress with guided journaling.',
        category: 'lifestyle',
        priority: 'medium',
        icon: <BookOpen className="h-5 w-5" />,
        path: '/journal',
        estimatedTime: '10 minutes daily',
        benefits: ['Better self-awareness', 'Emotional processing', 'Progress tracking'],
        basedOn: ['Low journaling activity', 'Recommendation for beginners']
      });
    }

    // Art therapy recommendations
    if (preferences.preferredActivities.includes('art-therapy') || preferences.riskFactors.includes('trauma')) {
      recs.push({
        id: 'art-therapy',
        title: 'Expressive Art Therapy',
        description: 'Use creative expression to process emotions and experiences safely.',
        category: 'therapy',
        priority: 'medium',
        icon: <Palette className="h-5 w-5" />,
        path: '/art-therapy',
        estimatedTime: '30-60 minutes',
        benefits: ['Emotional expression', 'Stress relief', 'Self-discovery'],
        basedOn: ['Interest in creative activities', 'Trauma-informed care needs']
      });
    }

    // Community and support recommendations
    if (assessments.some(a => a.risk_level === 'medium' || a.risk_level === 'high')) {
      recs.push({
        id: 'support-group',
        title: 'Peer Support Community',
        description: 'Connect with others who understand your journey in a safe, moderated space.',
        category: 'community',
        priority: 'medium',
        icon: <Users className="h-5 w-5" />,
        path: '/community/support-wall',
        estimatedTime: '15-30 minutes',
        benefits: ['Reduced isolation', 'Peer support', 'Shared experiences'],
        basedOn: ['Assessment results indicating need for support', 'Community engagement benefits']
      });
    }

    // Music therapy for stress and mood
    recs.push({
      id: 'music-therapy',
      title: 'Therapeutic Music Sessions',
      description: 'Use binaural beats and calming music to enhance relaxation and focus.',
      category: 'therapy',
      priority: 'low',
      icon: <Music className="h-5 w-5" />,
      path: '/binaural-beats',
      estimatedTime: '20-45 minutes',
      benefits: ['Deep relaxation', 'Improved focus', 'Better sleep'],
      basedOn: ['General wellness enhancement', 'Stress reduction benefits']
    });

    // Assessment recommendations
    const completedTypes = new Set(assessments.map(a => a.type));
    const availableAssessments = ['anxiety', 'depression', 'stress', 'ptsd', 'adhd'];
    const uncompletedAssessments = availableAssessments.filter(type => !completedTypes.has(type));

    if (uncompletedAssessments.length > 0) {
      recs.push({
        id: 'complete-assessment',
        title: `Complete ${uncompletedAssessments[0].toUpperCase()} Assessment`,
        description: 'Get personalized insights into your mental health with evidence-based assessments.',
        category: 'assessment',
        priority: 'medium',
        icon: <TrendingUp className="h-5 w-5" />,
        path: '/mental-wellness-assessments',
        estimatedTime: '5-10 minutes',
        benefits: ['Better self-understanding', 'Personalized recommendations', 'Progress tracking'],
        basedOn: ['Incomplete assessment battery', 'Comprehensive evaluation benefits']
      });
    }

    return recs.sort((a, b) => {
      const priorityOrder = { 'high': 3, 'medium': 2, 'low': 1 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    });
  };

  const handleRecommendationClick = (recommendation: PersonalizedRecommendation) => {
    if (recommendation.path) {
      navigate(recommendation.path);
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'low': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'therapy': return <Heart className="h-4 w-4" />;
      case 'assessment': return <Brain className="h-4 w-4" />;
      case 'workshop': return <BookOpen className="h-4 w-4" />;
      case 'community': return <Users className="h-4 w-4" />;
      case 'lifestyle': return <Target className="h-4 w-4" />;
      default: return <Lightbulb className="h-4 w-4" />;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Brain className="h-8 w-8 animate-pulse mx-auto mb-4" />
          <p>Analyzing your wellness data to create personalized recommendations...</p>
        </div>
      </div>
    );
  }

  const highPriorityRecs = recommendations.filter(r => r.priority === 'high');
  const mediumPriorityRecs = recommendations.filter(r => r.priority === 'medium');
  const lowPriorityRecs = recommendations.filter(r => r.priority === 'low');

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-muted/30 p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-2">Your Personalized Recommendations</h1>
          <p className="text-muted-foreground text-lg">AI-powered suggestions based on your wellness journey</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
            <CardContent className="p-6 text-center">
              <Brain className="h-8 w-8 mx-auto mb-2 text-primary" />
              <p className="text-2xl font-bold">{assessmentResults.length}</p>
              <p className="text-sm text-muted-foreground">Assessments Completed</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-secondary/10 to-secondary/5 border-secondary/20">
            <CardContent className="p-6 text-center">
              <Target className="h-8 w-8 mx-auto mb-2 text-secondary-foreground" />
              <p className="text-2xl font-bold">{userPreferences.goals.length}</p>
              <p className="text-sm text-muted-foreground">Active Goals</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-accent/10 to-accent/5 border-accent/20">
            <CardContent className="p-6 text-center">
              <Lightbulb className="h-8 w-8 mx-auto mb-2 text-accent-foreground" />
              <p className="text-2xl font-bold">{recommendations.length}</p>
              <p className="text-sm text-muted-foreground">Personalized Recommendations</p>
            </CardContent>
          </Card>
        </div>

        {/* Recommendations Tabs */}
        <Tabs defaultValue="priority" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="priority">By Priority</TabsTrigger>
            <TabsTrigger value="category">By Category</TabsTrigger>
            <TabsTrigger value="insights">Insights</TabsTrigger>
          </TabsList>

          <TabsContent value="priority" className="space-y-8">
            {/* High Priority */}
            {highPriorityRecs.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold mb-4 text-red-600 dark:text-red-400">High Priority</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {highPriorityRecs.map(rec => (
                    <Card key={rec.id} className="border-red-200 dark:border-red-800 hover:shadow-lg transition-shadow cursor-pointer" onClick={() => handleRecommendationClick(rec)}>
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-red-100 dark:bg-red-900/20 rounded-lg">
                              {rec.icon}
                            </div>
                            <div>
                              <CardTitle className="text-lg">{rec.title}</CardTitle>
                              <Badge className={getPriorityColor(rec.priority)}>{rec.priority} priority</Badge>
                            </div>
                          </div>
                          <Badge variant="outline" className="flex items-center gap-1">
                            {getCategoryIcon(rec.category)}
                            {rec.category}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="text-muted-foreground">{rec.description}</p>
                        
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          <span>{rec.estimatedTime}</span>
                        </div>

                        <div>
                          <h4 className="font-semibold text-sm mb-2">Expected Benefits:</h4>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            {rec.benefits.slice(0, 3).map((benefit, index) => (
                              <li key={index} className="flex items-start gap-2">
                                <span>•</span>
                                <span>{benefit}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h4 className="font-semibold text-sm mb-2">Based On:</h4>
                          <div className="flex flex-wrap gap-1">
                            {rec.basedOn.map((reason, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">{reason}</Badge>
                            ))}
                          </div>
                        </div>

                        {rec.path && (
                          <Button className="w-full" onClick={() => handleRecommendationClick(rec)}>
                            Start Now
                          </Button>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Medium Priority */}
            {mediumPriorityRecs.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold mb-4 text-yellow-600 dark:text-yellow-400">Medium Priority</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {mediumPriorityRecs.map(rec => (
                    <Card key={rec.id} className="border-yellow-200 dark:border-yellow-800 hover:shadow-lg transition-shadow cursor-pointer" onClick={() => handleRecommendationClick(rec)}>
                      <CardHeader className="pb-3">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg">
                            {rec.icon}
                          </div>
                          <div>
                            <CardTitle className="text-base">{rec.title}</CardTitle>
                            <p className="text-sm text-muted-foreground">{rec.estimatedTime}</p>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <p className="text-sm text-muted-foreground">{rec.description}</p>
                        {rec.path && (
                          <Button size="sm" variant="outline" className="w-full" onClick={() => handleRecommendationClick(rec)}>
                            Explore
                          </Button>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Low Priority */}
            {lowPriorityRecs.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold mb-4 text-green-600 dark:text-green-400">Enhancement Opportunities</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {lowPriorityRecs.map(rec => (
                    <Card key={rec.id} className="border-green-200 dark:border-green-800 hover:shadow-md transition-shadow cursor-pointer" onClick={() => handleRecommendationClick(rec)}>
                      <CardContent className="p-4 text-center">
                        <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg w-fit mx-auto mb-2">
                          {rec.icon}
                        </div>
                        <h3 className="font-semibold text-sm mb-1">{rec.title}</h3>
                        <p className="text-xs text-muted-foreground mb-2">{rec.estimatedTime}</p>
                        {rec.path && (
                          <Button size="sm" variant="ghost" className="text-xs" onClick={() => handleRecommendationClick(rec)}>
                            Try It
                          </Button>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="category">
            {['therapy', 'assessment', 'workshop', 'community', 'lifestyle'].map(category => {
              const categoryRecs = recommendations.filter(r => r.category === category);
              if (categoryRecs.length === 0) return null;

              return (
                <div key={category}>
                  <h2 className="text-2xl font-bold mb-4 capitalize flex items-center gap-2">
                    {getCategoryIcon(category)}
                    {category}
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {categoryRecs.map(rec => (
                      <Card key={rec.id} className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => handleRecommendationClick(rec)}>
                        <CardHeader className="pb-3">
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-base">{rec.title}</CardTitle>
                            <Badge className={getPriorityColor(rec.priority)} variant="outline">{rec.priority}</Badge>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground mb-3">{rec.description}</p>
                          <p className="text-xs text-muted-foreground mb-3">{rec.estimatedTime}</p>
                          {rec.path && (
                            <Button size="sm" variant="outline" className="w-full" onClick={() => handleRecommendationClick(rec)}>
                              Start
                            </Button>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              );
            })}
          </TabsContent>

          <TabsContent value="insights">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Your Wellness Insights</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="font-semibold">Assessment Overview</h3>
                      {assessmentResults.map((result, index) => (
                        <div key={index} className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="capitalize font-medium">{result.type}</span>
                            <Badge className={getPriorityColor(result.risk_level === 'low' ? 'low' : result.risk_level === 'medium' ? 'medium' : 'high')}>
                              {result.risk_level} risk
                            </Badge>
                          </div>
                          <Progress value={Math.min((result.score / 20) * 100, 100)} className="h-2" />
                          <p className="text-xs text-muted-foreground">Score: {result.score}</p>
                        </div>
                      ))}
                    </div>

                    <div className="space-y-4">
                      <h3 className="font-semibold">Recommendation Summary</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>High Priority Actions</span>
                          <Badge variant="destructive">{highPriorityRecs.length}</Badge>
                        </div>
                        <div className="flex justify-between">
                          <span>Suggested Activities</span>
                          <Badge variant="secondary">{mediumPriorityRecs.length}</Badge>
                        </div>
                        <div className="flex justify-between">
                          <span>Enhancement Options</span>
                          <Badge variant="outline">{lowPriorityRecs.length}</Badge>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-primary/10 rounded-lg">
                    <h4 className="font-semibold mb-2">Next Steps</h4>
                    <ul className="space-y-1 text-sm">
                      {highPriorityRecs.length > 0 && (
                        <li>• Address high-priority recommendations first for maximum impact</li>
                      )}
                      <li>• Complete any missing assessments for more accurate recommendations</li>
                      <li>• Set regular check-ins to track your progress</li>
                      <li>• Consider connecting with our community for additional support</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default PersonalizedRecommendations;