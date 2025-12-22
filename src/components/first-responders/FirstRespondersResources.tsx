
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download, BookOpen, Shield, HeartPulse } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const FirstRespondersResources: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const resources = [
    {
      title: "Critical Incident Stress Management Guide",
      description: "Comprehensive guide for managing stress after critical incidents and traumatic calls.",
      icon: Shield,
      action: "download"
    },
    {
      title: "Shift Wellness Toolkit",
      description: "Practical strategies for maintaining mental and physical wellness during long shifts.",
      icon: HeartPulse,
      action: "download"
    },
    {
      title: "Peer Support Network Directory",
      description: "Connect with trained peer support specialists who understand first responder challenges.",
      icon: BookOpen,
      action: "view"
    },
    {
      title: "Family Support Resources",
      description: "Resources to help family members understand and support first responders.",
      icon: FileText,
      action: "download"
    }
  ];

  const handleAction = (title: string, action: string) => {
    if (action === "download") {
      toast({
        title: "Starting Download",
        description: `Downloading ${title}...`,
        duration: 2000
      });
    } else {
      toast({
        title: "Opening Resource",
        description: `Accessing ${title}...`,
        duration: 2000
      });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">First Responder Resources</h2>
        <p className="text-white/70">
          Evidence-based resources and practical tools designed specifically for emergency service personnel.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {resources.map((resource, index) => {
          const Icon = resource.icon;
          return (
            <Card key={index} className="bg-[#141921] border-red-900/30 hover:border-red-700/50 transition-colors">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-red-900/20 rounded-lg flex-shrink-0">
                    <Icon className="h-6 w-6 text-red-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-white mb-2">{resource.title}</h3>
                    <p className="text-white/70 text-sm mb-4">{resource.description}</p>
                    <Button
                      className="w-full bg-red-700 hover:bg-red-800 text-white"
                      onClick={() => handleAction(resource.title, resource.action)}
                    >
                      {resource.action === "download" ? (
                        <>
                          <Download className="h-4 w-4 mr-2" />
                          Download Resource
                        </>
                      ) : (
                        <>
                          <BookOpen className="h-4 w-4 mr-2" />
                          View Resource
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default FirstRespondersResources;
