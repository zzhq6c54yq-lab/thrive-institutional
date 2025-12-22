
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Siren, ShieldAlert, Users, Calendar, Star, ChevronRight, Brain, AlertCircle, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import ThriveButton from "@/components/navigation/ThriveButton";

interface FirstRespondersDashboardProps {
  onFeatureClick: (feature: string) => void;
}

const FirstRespondersDashboard: React.FC<FirstRespondersDashboardProps> = ({ onFeatureClick }) => {
  const { toast } = useToast();

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-lg border border-red-900/30 bg-gradient-to-r from-red-950 to-red-900 p-6">
        <div className="relative z-10">
          <h2 className="text-3xl font-bold text-white mb-2">Welcome, First Responder</h2>
          <p className="text-red-200 mb-6 max-w-3xl">
            Access specialized mental health resources and support designed for emergency service professionals.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button 
              className="bg-red-700 hover:bg-red-800 text-white" 
              onClick={() => onFeatureClick("resources")}
            >
              Explore Resources
            </Button>
            <Button 
              variant="outline" 
              className="border-red-500 text-red-300 hover:bg-red-900/50" 
              onClick={() => onFeatureClick("crisis-support")}
            >
              Get Immediate Help
            </Button>
          </div>
        </div>
      </div>
      
      {/* Featured Programs */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-white">Featured Programs</h2>
          <Button 
            variant="link" 
            className="text-red-400" 
            onClick={() => onFeatureClick("resources")}
          >
            View All <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-[#141921] border-red-900/30 hover:border-red-700/50 transition-colors">
            <CardHeader>
              <div className="flex items-center gap-2 text-red-400">
                <Brain className="h-5 w-5" />
                <CardTitle className="text-white">Stress Management</CardTitle>
              </div>
              <CardDescription className="text-white/60">Tools for managing high-stress situations</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-white/70">
                Learn effective techniques for managing stress during and after emergency situations.
              </p>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full bg-red-700 hover:bg-red-800 text-white"
                onClick={() => onFeatureClick("stress-management")}
              >
                Learn More
              </Button>
            </CardFooter>
          </Card>
          
          <Card className="bg-[#141921] border-red-900/30 hover:border-red-700/50 transition-colors">
            <CardHeader>
              <div className="flex items-center gap-2 text-red-400">
                <Users className="h-5 w-5" />
                <CardTitle className="text-white">Peer Support</CardTitle>
              </div>
              <CardDescription className="text-white/60">Connect with fellow first responders</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-white/70">
                Join our peer support network to share experiences and find understanding among colleagues.
              </p>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full bg-red-700 hover:bg-red-800 text-white"
                onClick={() => onFeatureClick("community-support")}
              >
                Connect Now
              </Button>
            </CardFooter>
          </Card>
          
          <Card className="bg-[#141921] border-red-900/30 hover:border-red-700/50 transition-colors">
            <CardHeader>
              <div className="flex items-center gap-2 text-red-400">
                <ShieldAlert className="h-5 w-5" />
                <CardTitle className="text-white">Critical Incident Support</CardTitle>
              </div>
              <CardDescription className="text-white/60">Post-incident mental health resources</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-white/70">
                Access specialized support and resources for processing critical incidents.
              </p>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full bg-red-700 hover:bg-red-800 text-white"
                onClick={() => onFeatureClick("crisis-support")}
              >
                Access Support
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>

      {/* Quick Access Resources */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-4">Quick Access Resources</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="bg-[#141921] border-red-900/30 flex items-center p-4">
            <div className="p-2 rounded-full bg-red-900/30 mr-4">
              <AlertCircle className="h-6 w-6 text-red-400" />
            </div>
            <div className="flex-grow">
              <h3 className="font-medium text-white">Crisis Hotline</h3>
              <p className="text-sm text-white/70">24/7 support for emergency personnel</p>
            </div>
            <Button 
              size="sm" 
              className="bg-red-700 hover:bg-red-800 text-white"
              onClick={() => onFeatureClick("crisis-support")}
            >
              Call Now
            </Button>
          </Card>
          
          <Card className="bg-[#141921] border-red-900/30 flex items-center p-4">
            <div className="p-2 rounded-full bg-red-900/30 mr-4">
              <FileText className="h-6 w-6 text-red-400" />
            </div>
            <div className="flex-grow">
              <h3 className="font-medium text-white">Department Resources Guide</h3>
              <p className="text-sm text-white/70">Downloadable resources for your station</p>
            </div>
            <Button 
              size="sm" 
              className="bg-red-700 hover:bg-red-800 text-white"
              onClick={() => onFeatureClick("resources")}
            >
              Download
            </Button>
          </Card>
        </div>
      </div>
      
      {/* Upcoming Events */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-4">Upcoming Events</h2>
        <div className="space-y-3">
          <Card className="bg-[#141921] border-red-900/30">
            <CardContent className="p-4 flex items-center">
              <div className="bg-red-900/20 text-red-400 p-3 rounded-lg mr-4 text-center min-w-[60px]">
                <span className="block text-sm">APR</span>
                <span className="block text-xl font-bold">30</span>
              </div>
              <div className="flex-grow">
                <h3 className="font-medium text-white">First Responder Mental Health Workshop</h3>
                <p className="text-sm text-white/70">Virtual | 3:00 PM ET</p>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                className="border-red-500 text-red-300 hover:bg-red-900/50"
                onClick={() => onFeatureClick("workshops")}
              >
                Register
              </Button>
            </CardContent>
          </Card>
          
          <Card className="bg-[#141921] border-red-900/30">
            <CardContent className="p-4 flex items-center">
              <div className="bg-red-900/20 text-red-400 p-3 rounded-lg mr-4 text-center min-w-[60px]">
                <span className="block text-sm">MAY</span>
                <span className="block text-xl font-bold">04</span>
              </div>
              <div className="flex-grow">
                <h3 className="font-medium text-white">Peer Support Network Meeting</h3>
                <p className="text-sm text-white/70">Online | 7:30 PM ET</p>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                className="border-red-500 text-red-300 hover:bg-red-900/50"
                onClick={() => onFeatureClick("community-support")}
              >
                Join Group
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default FirstRespondersDashboard;
