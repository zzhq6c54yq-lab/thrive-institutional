
import React, { useState } from "react";
import Page from "@/components/Page";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, BookOpen, Brain, HeartPulse, Users, Coffee, Calendar, FileText, Video, Activity, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import useTranslation from "@/hooks/useTranslation";

const CollegePortal: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isSpanish } = useTranslation();
  const [activeTab, setActiveTab] = useState<'resources' | 'community' | 'assessments' | 'workshops'>('resources');
  
  const handleFeatureClick = (feature: string) => {
    toast({
      title: isSpanish ? "Navegando" : "Navigating", 
      description: isSpanish ? "Accediendo a recursos específicos para estudiantes universitarios" : "Accessing specific resources for college students",
      duration: 2000
    });
    
    navigate(`/app/${feature}`, { 
      state: { 
        fromSpecializedProgram: true, 
        preventTutorial: true 
      }
    });
  };

  const handleTabChange = (tab: 'resources' | 'community' | 'assessments' | 'workshops') => {
    setActiveTab(tab);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'resources':
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <FeatureCard 
              title={isSpanish ? "Manejo del Estrés Académico" : "Academic Stress Management"}
              description={isSpanish 
                ? "Herramientas y técnicas para manejar la presión de exámenes, plazos y carga de trabajo" 
                : "Tools and techniques for managing exam pressure, deadlines, and workload"}
              icon={BookOpen}
              color="bg-purple-600"
              onClick={() => handleFeatureClick("workshops")}
            />
            <FeatureCard
              title={isSpanish ? "Equilibrio de Vida" : "Life Balance"} 
              description={isSpanish 
                ? "Estrategias para equilibrar los estudios, la vida social, el trabajo y el autocuidado" 
                : "Strategies for balancing studies, social life, work, and self-care"}
              icon={Coffee}
              color="bg-indigo-600"
              onClick={() => handleFeatureClick("wellness-challenges")}
            />
            <FeatureCard
              title={isSpanish ? "Bienestar Mental" : "Mental Wellbeing"}
              description={isSpanish 
                ? "Recursos para la ansiedad, depresión y otros desafíos comunes de salud mental" 
                : "Resources for anxiety, depression, and other common mental health challenges"}
              icon={Brain}
              color="bg-pink-600"
              onClick={() => handleFeatureClick("mental-wellness")}
            />
            <FeatureCard
              title={isSpanish ? "Hábitos Saludables" : "Healthy Habits"}
              description={isSpanish 
                ? "Consejos para dormir, nutrición y ejercicio adaptados a la vida universitaria" 
                : "Sleep, nutrition, and exercise tips tailored for college life"}
              icon={HeartPulse}
              color="bg-emerald-600"
              onClick={() => handleFeatureClick("holistic-wellness")}
            />
            <FeatureCard
              title={isSpanish ? "Éxito Académico" : "Academic Success"}
              description={isSpanish 
                ? "Técnicas de estudio, gestión del tiempo y estrategias para mejorar el rendimiento" 
                : "Study techniques, time management, and strategies to improve performance"}
              icon={GraduationCap}
              color="bg-blue-600"
              onClick={() => handleFeatureClick("resource-library")}
            />
            <FeatureCard
              title={isSpanish ? "Manejo del Tiempo" : "Time Management"}
              description={isSpanish 
                ? "Herramientas y técnicas para organizar tu horario y maximizar la productividad" 
                : "Tools and techniques to organize your schedule and maximize productivity"}
              icon={Clock}
              color="bg-amber-600"
              onClick={() => handleFeatureClick("resource-library")}
            />
          </div>
        );
      case 'community':
        return (
          <div className="space-y-6 mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-[#17151F] border-purple-900/30 hover:border-purple-700/50 transition-colors shadow-lg">
                <CardContent className="p-0">
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-purple-900/30 rounded-full">
                        <Users className="h-5 w-5 text-purple-400" />
                      </div>
                      <h3 className="text-xl font-bold text-white">Peer Support Network</h3>
                    </div>
                    <p className="text-white/70 mb-4">
                      Connect with other students facing similar mental health challenges in a supportive environment.
                    </p>
                    <Button 
                      className="w-full bg-purple-700 hover:bg-purple-800 text-white"
                      onClick={() => handleFeatureClick("community-support")}
                    >
                      Join Community
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-[#17151F] border-purple-900/30 hover:border-purple-700/50 transition-colors shadow-lg">
                <CardContent className="p-0">
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-purple-900/30 rounded-full">
                        <Video className="h-5 w-5 text-purple-400" />
                      </div>
                      <h3 className="text-xl font-bold text-white">Study Groups</h3>
                    </div>
                    <p className="text-white/70 mb-4">
                      Join virtual study groups that prioritize mental wellbeing alongside academic success.
                    </p>
                    <Button 
                      className="w-full bg-purple-700 hover:bg-purple-800 text-white"
                      onClick={() => handleFeatureClick("community-support")}
                    >
                      Find Study Groups
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card className="bg-[#17151F] border-purple-900/30 hover:border-purple-700/50 transition-colors shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-purple-900/30 rounded-full">
                    <Calendar className="h-5 w-5 text-purple-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Campus Events</h3>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center bg-purple-900/20 p-4 rounded-lg">
                    <div className="bg-purple-900/20 text-purple-400 p-2 rounded-lg mr-4 text-center min-w-[60px]">
                      <span className="block text-sm">APR</span>
                      <span className="block text-xl font-bold">17</span>
                    </div>
                    <div className="flex-grow">
                      <h4 className="font-medium text-white">Exam Prep & Wellness</h4>
                      <p className="text-sm text-white/70">Virtual | 3:00 PM ET</p>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="border-purple-500 text-purple-300 hover:bg-purple-900/50"
                      onClick={() => handleFeatureClick("workshops")}
                    >
                      Register
                    </Button>
                  </div>
                  
                  <div className="flex items-center bg-purple-900/20 p-4 rounded-lg">
                    <div className="bg-purple-900/20 text-purple-400 p-2 rounded-lg mr-4 text-center min-w-[60px]">
                      <span className="block text-sm">APR</span>
                      <span className="block text-xl font-bold">24</span>
                    </div>
                    <div className="flex-grow">
                      <h4 className="font-medium text-white">Mindfulness for Students</h4>
                      <p className="text-sm text-white/70">Online | 6:00 PM ET</p>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="border-purple-500 text-purple-300 hover:bg-purple-900/50"
                      onClick={() => handleFeatureClick("mindfulness-sleep")}
                    >
                      Register
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );
      case 'assessments':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <Card className="bg-[#17151F] border-purple-900/30 hover:border-purple-700/50 transition-colors shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-purple-900/30 rounded-full">
                    <Activity className="h-5 w-5 text-purple-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Academic Stress Assessment</h3>
                </div>
                <p className="text-white/70 mb-4">
                  Evaluate your current stress levels related to academic demands and get personalized recommendations.
                </p>
                <div className="flex justify-between text-white/50 text-sm mb-4">
                  <span>4 minutes</span>
                  <span>15 questions</span>
                </div>
                <Button 
                  className="w-full bg-purple-700 hover:bg-purple-800 text-white"
                  onClick={() => handleFeatureClick("mental-wellness/assessments")}
                >
                  Begin Assessment
                </Button>
              </CardContent>
            </Card>
            
            <Card className="bg-[#17151F] border-purple-900/30 hover:border-purple-700/50 transition-colors shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-purple-900/30 rounded-full">
                    <Clock className="h-5 w-5 text-purple-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Work-Life Balance</h3>
                </div>
                <p className="text-white/70 mb-4">
                  Assess how well you're balancing your academic, work, social, and personal responsibilities.
                </p>
                <div className="flex justify-between text-white/50 text-sm mb-4">
                  <span>3 minutes</span>
                  <span>12 questions</span>
                </div>
                <Button 
                  className="w-full bg-purple-700 hover:bg-purple-800 text-white"
                  onClick={() => handleFeatureClick("mental-wellness/assessments")}
                >
                  Begin Assessment
                </Button>
              </CardContent>
            </Card>
            
            <Card className="bg-[#17151F] border-purple-900/30 hover:border-purple-700/50 transition-colors shadow-lg col-span-1 md:col-span-2">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-purple-900/30 rounded-full">
                    <FileText className="h-5 w-5 text-purple-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white">All Student Assessments</h3>
                </div>
                <p className="text-white/70 mb-4">
                  View our complete library of mental health assessments tailored for college students.
                </p>
                <Button 
                  className="w-full bg-purple-700 hover:bg-purple-800 text-white"
                  onClick={() => handleFeatureClick("mental-wellness/assessments")}
                >
                  View All Assessments
                </Button>
              </CardContent>
            </Card>
          </div>
        );
      case 'workshops':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <Card className="bg-[#17151F] border-purple-900/30 hover:border-purple-700/50 transition-colors shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-purple-900/30 rounded-full">
                    <Brain className="h-5 w-5 text-purple-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Finals Week Prep</h3>
                </div>
                <p className="text-white/70 mb-4">
                  Learn strategies to manage stress and optimize performance during exam periods.
                </p>
                <div className="mb-4 p-2 bg-purple-900/20 rounded-lg text-sm text-white/70">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-purple-400" />
                    <span>April 17, 2025 - 3:00 PM ET</span>
                  </div>
                </div>
                <Button 
                  className="w-full bg-purple-700 hover:bg-purple-800 text-white"
                  onClick={() => handleFeatureClick("workshops")}
                >
                  Register Now
                </Button>
              </CardContent>
            </Card>
            
            <Card className="bg-[#17151F] border-purple-900/30 hover:border-purple-700/50 transition-colors shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-purple-900/30 rounded-full">
                    <Coffee className="h-5 w-5 text-purple-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Life Balance for Students</h3>
                </div>
                <p className="text-white/70 mb-4">
                  Practical strategies for managing your academic responsibilities while maintaining your wellbeing.
                </p>
                <div className="mb-4 p-2 bg-purple-900/20 rounded-lg text-sm text-white/70">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-purple-400" />
                    <span>April 24, 2025 - 6:00 PM ET</span>
                  </div>
                </div>
                <Button 
                  className="w-full bg-purple-700 hover:bg-purple-800 text-white"
                  onClick={() => handleFeatureClick("workshops")}
                >
                  Register Now
                </Button>
              </CardContent>
            </Card>
            
            <Card className="bg-[#17151F] border-purple-900/30 hover:border-purple-700/50 transition-colors shadow-lg col-span-1 md:col-span-2">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-purple-900/30 rounded-full">
                    <FileText className="h-5 w-5 text-purple-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white">All Student Workshops</h3>
                </div>
                <p className="text-white/70 mb-4">
                  Browse our full catalog of workshops specifically designed for college students.
                </p>
                <Button 
                  className="w-full bg-purple-700 hover:bg-purple-800 text-white"
                  onClick={() => handleFeatureClick("workshops")}
                >
                  View All Workshops
                </Button>
              </CardContent>
            </Card>
          </div>
        );
      default:
        return null;
    }
  };

  const FeatureCard = ({ title, description, icon: Icon, color, onClick }) => (
    <Card 
      onClick={onClick}
      className="bg-[#17151F] border-purple-900/30 hover:border-purple-700/50 transition-colors shadow-lg cursor-pointer hover:shadow-xl"
    >
      <CardContent className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className={`p-2 rounded-full ${color} bg-opacity-20`}>
            <Icon className="h-5 w-5 text-white" />
          </div>
          <h3 className="text-lg font-semibold text-white">{title}</h3>
        </div>
        <p className="text-white/70 text-sm">{description}</p>
      </CardContent>
    </Card>
  );

  return (
    <Page title={isSpanish ? "La Experiencia Universitaria" : "The College Experience"} returnToMain>
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-[#8B5CF6]/30 to-[#6366F1]/30 p-6 rounded-xl backdrop-blur-md border border-purple-500/30 shadow-lg">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="p-4 bg-white/10 rounded-full">
              <GraduationCap className="h-10 w-10 text-[#8B5CF6]" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">
                {isSpanish ? "Bienestar Mental para Estudiantes Universitarios" : "Mental Wellness for College Students"}
              </h2>
              <p className="text-white/80">
                {isSpanish 
                  ? "Recursos especializados para ayudarte a navegar los desafíos únicos de la vida universitaria mientras priorizas tu salud mental y bienestar."
                  : "Specialized resources to help you navigate the unique challenges of college life while prioritizing your mental health and wellbeing."}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-[#12101A] border border-purple-900/30 rounded-lg overflow-hidden shadow-lg">
          <div className="flex overflow-x-auto scrollbar-hide">
            <button
              className={`px-6 py-4 font-medium text-sm flex-shrink-0 border-b-2 ${
                activeTab === 'resources' 
                  ? 'border-purple-500 text-purple-400' 
                  : 'border-transparent text-white/60 hover:text-white'
              }`}
              onClick={() => handleTabChange('resources')}
            >
              Resources
            </button>
            <button
              className={`px-6 py-4 font-medium text-sm flex-shrink-0 border-b-2 ${
                activeTab === 'community' 
                  ? 'border-purple-500 text-purple-400' 
                  : 'border-transparent text-white/60 hover:text-white'
              }`}
              onClick={() => handleTabChange('community')}
            >
              Community
            </button>
            <button
              className={`px-6 py-4 font-medium text-sm flex-shrink-0 border-b-2 ${
                activeTab === 'assessments' 
                  ? 'border-purple-500 text-purple-400' 
                  : 'border-transparent text-white/60 hover:text-white'
              }`}
              onClick={() => handleTabChange('assessments')}
            >
              Assessments
            </button>
            <button
              className={`px-6 py-4 font-medium text-sm flex-shrink-0 border-b-2 ${
                activeTab === 'workshops' 
                  ? 'border-purple-500 text-purple-400' 
                  : 'border-transparent text-white/60 hover:text-white'
              }`}
              onClick={() => handleTabChange('workshops')}
            >
              Workshops
            </button>
          </div>
          
          <div className="p-6">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </Page>
  );
};

export default CollegePortal;
