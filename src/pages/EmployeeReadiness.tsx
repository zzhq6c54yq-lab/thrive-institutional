
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Page from "@/components/Page";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

// Import the new component pieces
import EmployeeBanner from "@/components/employee/EmployeeBanner";
import TabNavigation from "@/components/employee/TabNavigation";
import ResourcesTab from "@/components/employee/ResourcesTab";
import AssessmentsTab from "@/components/employee/AssessmentsTab";
import WorkshopsTab from "@/components/employee/WorkshopsTab";

const EmployeeReadiness: React.FC = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<'resources' | 'assessments' | 'workshops'>('resources');
  
  // Set active tab based on URL params if they exist
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const tab = searchParams.get('tab');
    if (tab === 'assessments' || tab === 'workshops' || tab === 'resources') {
      setActiveTab(tab);
    }
  }, [location.search]);
  
  const handleTabChange = (tab: 'resources' | 'assessments' | 'workshops') => {
    setActiveTab(tab);
  };

  const handleFeatureClick = (path: string) => {
    toast({
      title: "Navigating",
      description: "Accessing specific resources for employees",
      duration: 2000
    });
    
    // Add directToAssessment flag for assessment-related paths
    const isAssessmentPath = path.includes('assessment') || path === 'mental-wellness';
    
    navigate(`/${path}`, { 
      state: { 
        fromEmployeePortal: true, 
        preventTutorial: true,
        directToAssessment: isAssessmentPath,
        startAssessment: isAssessmentPath
      }
    });
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'resources':
        return <ResourcesTab handleFeatureClick={handleFeatureClick} />;
      case 'assessments':
        return <AssessmentsTab handleFeatureClick={handleFeatureClick} />;
      case 'workshops':
        return <WorkshopsTab handleFeatureClick={handleFeatureClick} />;
      default:
        return null;
    }
  };

  return (
    <Page title="Employee Wellness Portal" returnToMain>
      <div className="space-y-6">
        <EmployeeBanner />

        <div className="bg-[#0B1218] border border-green-900/30 rounded-lg overflow-hidden shadow-lg">
          <TabNavigation activeTab={activeTab} onTabChange={handleTabChange} />
          
          <div className="p-6">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </Page>
  );
};

export default EmployeeReadiness;
