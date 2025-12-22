
import React from "react";
import { Brain, Briefcase, HeartPulse, Users, Activity, BookOpen } from "lucide-react";
import FeatureCard from "./FeatureCard";

interface ResourcesTabProps {
  handleFeatureClick: (path: string) => void;
}

const ResourcesTab: React.FC<ResourcesTabProps> = ({ handleFeatureClick }) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
    <FeatureCard 
      title="Work-Life Balance"
      description="Strategies for maintaining boundaries between work and personal life"
      icon={Briefcase}
      color="bg-green-600"
      onClick={() => handleFeatureClick("holistic-wellness")}
    />
    <FeatureCard 
      title="Stress Management"
      description="Techniques to identify and reduce workplace stress"
      icon={Brain}
      color="bg-blue-600"
      onClick={() => handleFeatureClick("mental-wellness")}
    />
    <FeatureCard 
      title="Team Wellness"
      description="Building supportive relationships with colleagues"
      icon={Users}
      color="bg-purple-600"
      onClick={() => handleFeatureClick("community-support")}
    />
    <FeatureCard 
      title="Workplace Anxiety"
      description="Tools to manage anxiety and build confidence at work"
      icon={Activity}
      color="bg-pink-600"
      onClick={() => handleFeatureClick("mental-wellness-tools")}
    />
    <FeatureCard 
      title="Physical Health"
      description="Maintaining physical wellbeing to support mental health"
      icon={HeartPulse}
      color="bg-red-600"
      onClick={() => handleFeatureClick("holistic-wellness")}
    />
    <FeatureCard 
      title="Career Development"
      description="Growing professionally while prioritizing mental health"
      icon={BookOpen}
      color="bg-amber-600"
      onClick={() => handleFeatureClick("resource-library")}
    />
  </div>
);

export default ResourcesTab;
