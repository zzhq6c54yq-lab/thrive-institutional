
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import NavigationBar from "@/components/navigation/NavigationBar";
import ChronicIllnessDashboard from "@/components/chronic-illness/ChronicIllnessDashboard";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { BookOpen, Users, Stethoscope, BookMarked, Activity } from "lucide-react";

// Import the components we'll need for each tab
import ChronicIllnessResources from "@/components/chronic-illness/ChronicIllnessResources";
import ChronicIllnessCommunity from "@/components/chronic-illness/ChronicIllnessCommunity";
import ChronicIllnessAssessments from "@/components/chronic-illness/ChronicIllnessAssessments";
import ChronicIllnessWorkshops from "@/components/chronic-illness/ChronicIllnessWorkshops";

const ChronicIllnessPortal: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<string>("dashboard");

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f5ecfd] to-[#e5deff] dark:from-[#4b1b6e] dark:to-[#36205e] text-black dark:text-white">
      <NavigationBar 
        showBackButton={true}
        showHomeButton={true}
        title="Chronic Illness Support"
        portalMode={true}
        portalPath="/chronic-illness-welcome"
      />
      
      <div className="container mx-auto px-4 pt-24 pb-20">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold mb-2 text-purple-800 dark:text-purple-200">Chronic Illness Support Portal</h1>
          <p className="text-lg max-w-3xl mx-auto text-purple-700 dark:text-purple-300">
            Tools and resources to support your mental and emotional wellbeing while managing chronic health conditions.
          </p>
        </div>
        
        <Tabs defaultValue="dashboard" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-5 mb-8 bg-purple-100 dark:bg-purple-900/30 p-1 rounded-lg">
            <TabsTrigger 
              value="dashboard" 
              className="flex items-center gap-2 data-[state=active]:bg-purple-600 data-[state=active]:text-white"
            >
              <Activity className="h-4 w-4" />
              <span className="hidden sm:inline">Dashboard</span>
            </TabsTrigger>
            <TabsTrigger 
              value="resources" 
              className="flex items-center gap-2 data-[state=active]:bg-purple-600 data-[state=active]:text-white"
            >
              <BookOpen className="h-4 w-4" />
              <span className="hidden sm:inline">Resources</span>
            </TabsTrigger>
            <TabsTrigger 
              value="community" 
              className="flex items-center gap-2 data-[state=active]:bg-purple-600 data-[state=active]:text-white"
            >
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline">Community</span>
            </TabsTrigger>
            <TabsTrigger 
              value="assessments" 
              className="flex items-center gap-2 data-[state=active]:bg-purple-600 data-[state=active]:text-white"
            >
              <Stethoscope className="h-4 w-4" />
              <span className="hidden sm:inline">Assessments</span>
            </TabsTrigger>
            <TabsTrigger 
              value="workshops" 
              className="flex items-center gap-2 data-[state=active]:bg-purple-600 data-[state=active]:text-white"
            >
              <BookMarked className="h-4 w-4" />
              <span className="hidden sm:inline">Workshops</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="dashboard">
            <ChronicIllnessDashboard />
          </TabsContent>
          
          <TabsContent value="resources">
            <ChronicIllnessResources />
          </TabsContent>
          
          <TabsContent value="community">
            <ChronicIllnessCommunity />
          </TabsContent>
          
          <TabsContent value="assessments">
            <ChronicIllnessAssessments />
          </TabsContent>
          
          <TabsContent value="workshops">
            <ChronicIllnessWorkshops />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ChronicIllnessPortal;
