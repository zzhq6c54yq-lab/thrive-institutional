
import React from "react";
import { Activity, Clock, FileText } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface AssessmentsTabProps {
  handleFeatureClick: (path: string) => void;
}

const AssessmentsTab: React.FC<AssessmentsTabProps> = ({ handleFeatureClick }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
    <Card className="bg-[#101820] border-green-900/30 hover:border-green-700/50 transition-colors shadow-lg">
      <CardContent className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-green-900/30 rounded-full">
            <Activity className="h-5 w-5 text-green-400" />
          </div>
          <h3 className="text-xl font-bold text-white">Workplace Stress Assessment</h3>
        </div>
        <p className="text-white/70 mb-4">
          Evaluate your current stress levels related to your workplace and get personalized recommendations.
        </p>
        <div className="flex justify-between text-white/50 text-sm mb-4">
          <span>4 minutes</span>
          <span>15 questions</span>
        </div>
        <Button 
          className="w-full bg-green-700 hover:bg-green-800 text-white"
          onClick={() => handleFeatureClick("mental-wellness/assessments/workplace-stress")}
        >
          Begin Assessment
        </Button>
      </CardContent>
    </Card>
    
    <Card className="bg-[#101820] border-green-900/30 hover:border-green-700/50 transition-colors shadow-lg">
      <CardContent className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-green-900/30 rounded-full">
            <Clock className="h-5 w-5 text-green-400" />
          </div>
          <h3 className="text-xl font-bold text-white">Work-Life Balance</h3>
        </div>
        <p className="text-white/70 mb-4">
          Assess how well you're balancing work responsibilities with personal life and wellbeing.
        </p>
        <div className="flex justify-between text-white/50 text-sm mb-4">
          <span>3 minutes</span>
          <span>12 questions</span>
        </div>
        <Button 
          className="w-full bg-green-700 hover:bg-green-800 text-white"
          onClick={() => handleFeatureClick("mental-wellness/assessments/work-life-balance")}
        >
          Begin Assessment
        </Button>
      </CardContent>
    </Card>
    
    <Card className="bg-[#101820] border-green-900/30 hover:border-green-700/50 transition-colors shadow-lg col-span-1 md:col-span-2">
      <CardContent className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-green-900/30 rounded-full">
            <FileText className="h-5 w-5 text-green-400" />
          </div>
          <h3 className="text-xl font-bold text-white">All Employee Assessments</h3>
        </div>
        <p className="text-white/70 mb-4">
          View our complete library of mental health assessments tailored for employees.
        </p>
        <Button 
          className="w-full bg-green-700 hover:bg-green-800 text-white"
          onClick={() => handleFeatureClick("mental-wellness/assessments")}
        >
          View All Assessments
        </Button>
      </CardContent>
    </Card>
  </div>
);

export default AssessmentsTab;
