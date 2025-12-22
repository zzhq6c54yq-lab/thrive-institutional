
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ThriveHeader from "@/components/dashboard/ThriveHeader";
import DashboardContent from "@/components/dashboard/DashboardContent";
import InfoButtons from "@/components/dashboard/InfoButtons";
import ExploreAddOns from "@/components/dashboard/ExploreAddOns";
import HenryFloatingElement from "@/components/home/HenryFloatingElement";
import { useToast } from "@/hooks/use-toast";
import useTranslation from "@/hooks/useTranslation";

interface MainDashboardProps {
  userName: string;
  showHenry: boolean;
  onHenryToggle: () => void;
  selectedQualities: string[];
  selectedGoals: string[];
  navigateToFeature: (path: string) => void;
  markTutorialCompleted?: () => void;
}

const MainDashboard: React.FC<MainDashboardProps> = ({
  userName,
  showHenry,
  onHenryToggle,
  selectedQualities,
  selectedGoals,
  navigateToFeature,
  markTutorialCompleted
}) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isSpanish } = useTranslation();

  const handleWorkshopClick = (workshopId: string, workshopTitle: string) => {
    toast({
      title: isSpanish ? "Navegando al taller..." : "Navigating to workshop...",
      description: workshopTitle,
      duration: 1500,
    });
    navigate(`/app/workshop/${workshopId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900">
      <ThriveHeader 
        userName={userName}
        showHenry={showHenry}
        onHenryToggle={onHenryToggle}
      />
      
      <InfoButtons />
      
      <ExploreAddOns />
      
      <DashboardContent
        selectedQualities={selectedQualities}
        selectedGoals={selectedGoals}
        navigateToFeature={navigateToFeature}
        navigate={navigate}
        onWorkshopClick={handleWorkshopClick}
      />
      
      <HenryFloatingElement 
        showHenry={showHenry}
        onHenryToggle={onHenryToggle}
      />
    </div>
  );
};

export default MainDashboard;
