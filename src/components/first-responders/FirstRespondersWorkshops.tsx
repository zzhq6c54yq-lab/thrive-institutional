
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Users, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const FirstRespondersWorkshops: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const workshops = [
    {
      title: "Critical Incident Stress Debriefing",
      description: "Learn evidence-based techniques for processing traumatic events and supporting your team.",
      date: "May 20, 2025",
      time: "7:00 PM ET",
      duration: "90 minutes",
      instructor: "Dr. Sarah Martinez, Licensed Clinical Psychologist",
      spots: 12
    },
    {
      title: "Building Resilience in Emergency Services",
      description: "Develop practical resilience skills to maintain mental wellness in high-stress environments.",
      date: "May 27, 2025",
      time: "6:30 PM ET",
      duration: "120 minutes",
      instructor: "Captain Mike Thompson, 20+ years Fire Service",
      spots: 18
    },
    {
      title: "Sleep Optimization for Shift Workers",
      description: "Master strategies for quality sleep despite irregular schedules and night shifts.",
      date: "June 3, 2025",
      time: "8:00 PM ET",
      duration: "60 minutes",
      instructor: "Dr. Emily Chen, Sleep Medicine Specialist",
      spots: 25
    },
    {
      title: "Family Communication During Crisis",
      description: "Tools for maintaining healthy family relationships while managing the demands of emergency service work.",
      date: "June 10, 2025",
      time: "7:30 PM ET",
      duration: "90 minutes",
      instructor: "Lisa Rodriguez, LMFT specializing in First Responder Families",
      spots: 15
    }
  ];

  const handleRegister = (title: string) => {
    toast({
      title: "Registration Successful",
      description: `You've registered for ${title}`,
      duration: 2000
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">First Responder Workshops</h2>
        <p className="text-white/70">
          Live virtual workshops led by experts who specialize in first responder mental health and wellness.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {workshops.map((workshop, index) => (
          <Card key={index} className="bg-[#141921] border-red-900/30 hover:border-red-700/50 transition-colors">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold text-white mb-3">{workshop.title}</h3>
              <p className="text-white/70 mb-4 text-sm">{workshop.description}</p>
              
              <div className="space-y-2 mb-4 text-sm">
                <div className="flex items-center text-white/60">
                  <Calendar className="h-4 w-4 mr-2 text-red-400" />
                  <span>{workshop.date} at {workshop.time}</span>
                </div>
                <div className="flex items-center text-white/60">
                  <Clock className="h-4 w-4 mr-2 text-red-400" />
                  <span>{workshop.duration}</span>
                </div>
                <div className="flex items-center text-white/60">
                  <Users className="h-4 w-4 mr-2 text-red-400" />
                  <span>{workshop.spots} spots remaining</span>
                </div>
              </div>

              <div className="p-3 bg-red-900/20 rounded-lg mb-4">
                <p className="text-white text-sm">
                  <span className="font-medium">Instructor:</span> {workshop.instructor}
                </p>
              </div>

              <Button 
                className="w-full bg-red-700 hover:bg-red-800 text-white"
                onClick={() => handleRegister(workshop.title)}
              >
                Register for Workshop
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FirstRespondersWorkshops;
