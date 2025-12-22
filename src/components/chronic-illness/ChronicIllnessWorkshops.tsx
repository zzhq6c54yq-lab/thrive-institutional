
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, Calendar, BookOpen, Video, CheckCircle, Star, BookMarked } from "lucide-react";
import useFeatureActions from "@/hooks/useFeatureActions";

const ChronicIllnessWorkshops: React.FC = () => {
  const { handleActionClick } = useFeatureActions();
  
  const workshops = [
    {
      id: "chronic101",
      title: "Living Well with Chronic Illness",
      description: "An introductory workshop on adapting to life with chronic health conditions",
      instructor: "Dr. Emily Chen",
      duration: "6 weeks",
      sessions: 6,
      participants: 158,
      rating: 4.8,
      tags: ["Beginner", "Foundations", "Self-Management"],
      featured: true,
      completed: false,
      progress: 0
    },
    {
      id: "pain-management",
      title: "Comprehensive Pain Management",
      description: "Learn evidence-based strategies for managing chronic pain",
      instructor: "Dr. Michael Santos",
      duration: "4 weeks",
      sessions: 8,
      participants: 203,
      rating: 4.9,
      tags: ["Intermediate", "Pain", "Techniques"],
      featured: true,
      completed: false,
      progress: 0
    },
    {
      id: "emotional-coping",
      title: "Emotional Resilience Building",
      description: "Develop coping skills for the emotional challenges of chronic illness",
      instructor: "Sarah Johnson, LMHC",
      duration: "6 weeks",
      sessions: 6,
      participants: 142,
      rating: 4.7,
      tags: ["Emotional Health", "Coping", "Mental Wellbeing"],
      featured: false,
      completed: false,
      progress: 30
    },
    {
      id: "caregiver",
      title: "Caregiver Support Workshop",
      description: "Essential strategies for those supporting loved ones with chronic conditions",
      instructor: "Alex Rivera, MSW",
      duration: "4 weeks",
      sessions: 4,
      participants: 89,
      rating: 4.8,
      tags: ["Caregivers", "Support", "Self-Care"],
      featured: false,
      completed: false,
      progress: 0
    },
    {
      id: "nutrition",
      title: "Nutrition for Chronic Conditions",
      description: "Learn how dietary choices can support management of chronic health issues",
      instructor: "Kelly Thompson, RD",
      duration: "3 weeks",
      sessions: 6,
      participants: 176,
      rating: 4.6,
      tags: ["Nutrition", "Diet", "Inflammation"],
      featured: false,
      completed: true,
      progress: 100
    },
    {
      id: "sleep",
      title: "Sleep Management for Chronic Pain",
      description: "Improve sleep quality while managing chronic pain conditions",
      instructor: "Dr. Ramon Vargas",
      duration: "2 weeks",
      sessions: 4,
      participants: 124,
      rating: 4.7,
      tags: ["Sleep", "Pain Management", "Rest"],
      featured: false,
      completed: false,
      progress: 50
    }
  ];

  const handleWorkshopClick = (workshop) => {
    handleActionClick({
      type: "workshop",
      id: workshop.id,
      title: workshop.title,
      path: `/chronic-illness/education`
    });
  };

  // Get featured workshops
  const featuredWorkshops = workshops.filter(workshop => workshop.featured);
  // Get other workshops (not featured)
  const otherWorkshops = workshops.filter(workshop => !workshop.featured);

  return (
    <div className="space-y-8">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-purple-800 dark:text-purple-200">Chronic Illness Workshops</h2>
        <p className="text-purple-700 dark:text-purple-300">
          Structured programs to help you develop skills for managing your health condition.
        </p>
      </div>
      
      {/* Featured Workshops Section */}
      {featuredWorkshops.length > 0 && (
        <div className="mb-10">
          <h3 className="text-xl font-semibold text-purple-700 dark:text-purple-300 mb-4 flex items-center gap-2">
            <Star className="h-5 w-5 text-yellow-500" />
            Featured Workshops
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {featuredWorkshops.map((workshop) => (
              <Card key={workshop.id} className="bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/20 border-purple-200 dark:border-purple-800/30 transition-all hover:shadow-lg">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl text-purple-800 dark:text-purple-200">{workshop.title}</CardTitle>
                      <CardDescription className="mt-2 text-base">{workshop.description}</CardDescription>
                    </div>
                    <Badge className="bg-yellow-500/20 text-yellow-600 dark:text-yellow-400 border-yellow-500/50">
                      Featured
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-4 text-sm">
                      <span className="flex items-center gap-1">
                        <Users className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                        <span>Instructor: <strong>{workshop.instructor}</strong></span>
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                        <span>{workshop.duration} ({workshop.sessions} sessions)</span>
                      </span>
                      <span className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-500" />
                        <span>{workshop.rating}/5 ({workshop.participants} participants)</span>
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {workshop.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="bg-purple-100/50 dark:bg-purple-900/20 text-purple-800 dark:text-purple-200 border-purple-300/50 dark:border-purple-700/50">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                    onClick={() => handleWorkshopClick(workshop)}
                  >
                    <BookOpen className="h-4 w-4 mr-2" />
                    Explore Workshop
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      )}
      
      {/* All Workshops Section */}
      <div>
        <h3 className="text-xl font-semibold text-purple-700 dark:text-purple-300 mb-4 flex items-center gap-2">
          <BookMarked className="h-5 w-5" />
          All Workshops
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {otherWorkshops.map((workshop) => (
            <Card key={workshop.id} className="bg-white dark:bg-gray-800/50 border-purple-200 dark:border-purple-900/50 transition-all hover:shadow-lg overflow-hidden flex flex-col">
              <CardHeader>
                <CardTitle className="text-purple-800 dark:text-purple-200">{workshop.title}</CardTitle>
                <CardDescription className="line-clamp-2">{workshop.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="space-y-4 text-sm">
                  <div className="flex flex-wrap gap-2">
                    <span className="flex items-center gap-1">
                      <Users className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                      <span>{workshop.instructor}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                      <span>{workshop.duration}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span>{workshop.rating}</span>
                    </span>
                  </div>
                  
                  <div className="flex flex-wrap gap-1">
                    {workshop.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="bg-purple-100/50 dark:bg-purple-900/20 text-purple-800 dark:text-purple-200 border-purple-300/50 dark:border-purple-700/50">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  {/* Progress if started or completed */}
                  {workshop.progress > 0 && (
                    <div className="pt-1">
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="text-purple-700/70 dark:text-purple-300/70">Progress:</span>
                        <span className="text-purple-700 dark:text-purple-300">{workshop.progress}% complete</span>
                      </div>
                      <div className="h-1.5 w-full bg-purple-100 dark:bg-purple-900/30 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-purple-600 dark:bg-purple-400" 
                          style={{ width: `${workshop.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter>
                {workshop.completed ? (
                  <Button 
                    variant="outline" 
                    className="w-full border-green-500/50 text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20"
                    onClick={() => handleWorkshopClick(workshop)}
                  >
                    <CheckCircle className="h-4 w-4 mr-2" /> Review Completed Workshop
                  </Button>
                ) : workshop.progress > 0 ? (
                  <Button 
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                    onClick={() => handleWorkshopClick(workshop)}
                  >
                    <Video className="h-4 w-4 mr-2" /> Continue Workshop
                  </Button>
                ) : (
                  <Button 
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                    onClick={() => handleWorkshopClick(workshop)}
                  >
                    <BookOpen className="h-4 w-4 mr-2" /> Start Workshop
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
      
      {/* Upcoming Live Workshops Section */}
      <div className="pt-4">
        <Card className="bg-gradient-to-r from-purple-100 to-purple-200 dark:from-purple-900/40 dark:to-purple-800/30 border-purple-300 dark:border-purple-700/50">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-purple-800 dark:text-purple-200 flex items-center gap-2">
                  <Video className="h-5 w-5" />
                  Live Workshop Sessions
                </h3>
                <p className="text-purple-700 dark:text-purple-300">
                  Join interactive live sessions led by healthcare professionals and chronic illness experts.
                </p>
              </div>
              <Button 
                onClick={() => handleActionClick({
                  type: "join",
                  title: "Live Workshops",
                  path: "/chronic-illness/live-workshops"
                })}
                className="bg-purple-600 hover:bg-purple-700 text-white md:self-center"
              >
                <Calendar className="h-4 w-4 mr-2" />
                View Schedule
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ChronicIllnessWorkshops;
