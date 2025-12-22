
import React from "react";
import { Brain, Zap, Calendar, FileText } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface WorkshopsTabProps {
  handleFeatureClick: (path: string) => void;
}

const WorkshopsTab: React.FC<WorkshopsTabProps> = ({ handleFeatureClick }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
    <Card className="bg-[#101820] border-green-900/30 hover:border-green-700/50 transition-colors shadow-lg">
      <CardContent className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-green-900/30 rounded-full">
            <Brain className="h-5 w-5 text-green-400" />
          </div>
          <h3 className="text-xl font-bold text-white">Mindfulness at Work</h3>
        </div>
        <p className="text-white/70 mb-4">
          Learn practical mindfulness techniques you can use throughout your workday.
        </p>
        <div className="mb-4 p-2 bg-green-900/20 rounded-lg text-sm text-white/70">
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-2 text-green-400" />
            <span>April 18, 2025 - 1:00 PM ET</span>
          </div>
        </div>
        <Button 
          className="w-full bg-green-700 hover:bg-green-800 text-white"
          onClick={() => handleFeatureClick("workshops")}
        >
          Register Now
        </Button>
      </CardContent>
    </Card>
    
    <Card className="bg-[#101820] border-green-900/30 hover:border-green-700/50 transition-colors shadow-lg">
      <CardContent className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-green-900/30 rounded-full">
            <Zap className="h-5 w-5 text-green-400" />
          </div>
          <h3 className="text-xl font-bold text-white">Burnout Prevention</h3>
        </div>
        <p className="text-white/70 mb-4">
          Identify early signs of burnout and develop preventive strategies.
        </p>
        <div className="mb-4 p-2 bg-green-900/20 rounded-lg text-sm text-white/70">
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-2 text-green-400" />
            <span>April 25, 2025 - 3:00 PM ET</span>
          </div>
        </div>
        <Button 
          className="w-full bg-green-700 hover:bg-green-800 text-white"
          onClick={() => handleFeatureClick("workshops")}
        >
          Register Now
        </Button>
      </CardContent>
    </Card>
    
    <Card className="bg-[#101820] border-green-900/30 hover:border-green-700/50 transition-colors shadow-lg col-span-1 md:col-span-2">
      <CardContent className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-green-900/30 rounded-full">
            <FileText className="h-5 w-5 text-green-400" />
          </div>
          <h3 className="text-xl font-bold text-white">All Employee Workshops</h3>
        </div>
        <p className="text-white/70 mb-4">
          Browse our full catalog of workshops specifically designed for workplace wellness.
        </p>
        <Button 
          className="w-full bg-green-700 hover:bg-green-800 text-white"
          onClick={() => handleFeatureClick("workshops")}
        >
          View All Workshops
        </Button>
      </CardContent>
    </Card>
  </div>
);

export default WorkshopsTab;
