
import React, { useState } from "react";
import Page from "@/components/Page";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Flame, Shield, HeartPulse, Users, AlertCircle, BookOpen, Calendar } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import useTranslation from "@/hooks/useTranslation";
import FirstRespondersDashboard from "@/components/first-responders/FirstRespondersDashboard";
import FirstRespondersResources from "@/components/first-responders/FirstRespondersResources";
import FirstRespondersCommunity from "@/components/first-responders/FirstRespondersCommunity";
import FirstRespondersAssessments from "@/components/first-responders/FirstRespondersAssessments";
import FirstRespondersWorkshops from "@/components/first-responders/FirstRespondersWorkshops";

const FirstRespondersPortal: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const { isSpanish } = useTranslation();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'resources' | 'community' | 'assessments' | 'workshops'>('dashboard');
  
  const handleFeatureClick = (feature: string) => {
    toast({
      title: isSpanish ? "Navegando" : "Navigating", 
      description: isSpanish ? "Accediendo a recursos específicos para primeros respondedores" : "Accessing specific resources for first responders",
      duration: 2000
    });
    
    if (feature === "resources") {
      setActiveTab("resources");
    } else if (feature === "workshops") {
      setActiveTab("workshops");
    } else if (feature === "community-support") {
      setActiveTab("community");
    } else if (feature === "mental-wellness/assessments") {
      setActiveTab("assessments");
    } else {
      navigate(`/app/${feature}`, { 
        state: { 
          fromSpecializedProgram: true,
          preventTutorial: true,
          returnToPortal: "/app/first-responders-portal",
          portalState: {
            activeTab,
            returnToMain: location.state?.returnToMain,
            preventTutorial: location.state?.preventTutorial
          }
        }
      });
    }
  };

  const handleTabChange = (tab: 'dashboard' | 'resources' | 'community' | 'assessments' | 'workshops') => {
    setActiveTab(tab);
  };

  return (
    <Page 
      title={isSpanish ? "Portal de Primeros Respondedores" : "First Responders Portal"} 
      returnToMain={location.state?.returnToMain}
    >
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-red-900/90 to-orange-900/90 p-6 rounded-xl backdrop-blur-md border border-red-500/30 shadow-lg relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
            <div className="p-4 bg-white/10 rounded-full">
              <Flame className="h-10 w-10 text-red-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">
                {isSpanish ? "Recursos para Primeros Respondedores" : "Resources for First Responders"}
              </h2>
              <p className="text-white/80">
                {isSpanish 
                  ? "Recursos especializados de bienestar mental diseñados específicamente para bomberos, paramédicos, EMTs y personal de emergencias."
                  : "Specialized mental wellness resources designed specifically for firefighters, paramedics, EMTs, and emergency personnel."}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-[#0F1319] border border-red-900/30 rounded-lg overflow-hidden shadow-lg">
          <div className="flex overflow-x-auto scrollbar-hide">
            <button
              className={`px-6 py-4 font-medium text-sm flex-shrink-0 border-b-2 ${
                activeTab === 'dashboard' 
                  ? 'border-red-500 text-red-400' 
                  : 'border-transparent text-white/60 hover:text-white'
              }`}
              onClick={() => handleTabChange('dashboard')}
            >
              Dashboard
            </button>
            <button
              className={`px-6 py-4 font-medium text-sm flex-shrink-0 border-b-2 ${
                activeTab === 'resources' 
                  ? 'border-red-500 text-red-400' 
                  : 'border-transparent text-white/60 hover:text-white'
              }`}
              onClick={() => handleTabChange('resources')}
            >
              Resources
            </button>
            <button
              className={`px-6 py-4 font-medium text-sm flex-shrink-0 border-b-2 ${
                activeTab === 'community' 
                  ? 'border-red-500 text-red-400' 
                  : 'border-transparent text-white/60 hover:text-white'
              }`}
              onClick={() => handleTabChange('community')}
            >
              Community
            </button>
            <button
              className={`px-6 py-4 font-medium text-sm flex-shrink-0 border-b-2 ${
                activeTab === 'assessments' 
                  ? 'border-red-500 text-red-400' 
                  : 'border-transparent text-white/60 hover:text-white'
              }`}
              onClick={() => handleTabChange('assessments')}
            >
              Assessments
            </button>
            <button
              className={`px-6 py-4 font-medium text-sm flex-shrink-0 border-b-2 ${
                activeTab === 'workshops' 
                  ? 'border-red-500 text-red-400' 
                  : 'border-transparent text-white/60 hover:text-white'
              }`}
              onClick={() => handleTabChange('workshops')}
            >
              Workshops
            </button>
          </div>
          
          <div className="p-6">
            {activeTab === 'dashboard' && <FirstRespondersDashboard onFeatureClick={handleFeatureClick} />}
            {activeTab === 'resources' && <FirstRespondersResources />}
            {activeTab === 'community' && <FirstRespondersCommunity />}
            {activeTab === 'assessments' && <FirstRespondersAssessments />}
            {activeTab === 'workshops' && <FirstRespondersWorkshops />}
          </div>
        </div>
      </div>
    </Page>
  );
};

export default FirstRespondersPortal;
