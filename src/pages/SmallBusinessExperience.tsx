import React, { useState, useEffect } from "react";
import Page from "@/components/Page";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { 
  Briefcase, Building, BarChart, Calendar, CopyCheck, Lightbulb, 
  Users, Heart, Shield, DollarSign, HandHeart, ArrowRight, 
  MapPin, Clock, FileText, CalendarDays, AlertTriangle, Compass
} from "lucide-react";

const SmallBusinessExperience: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("resources");
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  const handleResourceClick = (name: string, path: string) => {
    toast({
      title: `Accessing ${name}`,
      description: "Loading your resource...",
      duration: 2000
    });
  };
  
  const businessResources = [
    {
      title: "Entrepreneur Mental Health Guide",
      description: "Strategies for managing stress while building your business",
      icon: Briefcase,
      path: "/business-mental-health",
      category: "wellness"
    },
    {
      title: "Work-Life Balance Workshop",
      description: "Practical tips for balancing business demands and personal life",
      icon: Calendar,
      path: "/work-life-balance",
      category: "lifestyle"
    },
    {
      title: "Business Owner Support Network",
      description: "Connect with other entrepreneurs facing similar challenges",
      icon: Users,
      path: "/owner-support",
      category: "community"
    },
    {
      title: "Financial Stress Management",
      description: "Tools for coping with the financial pressures of running a business",
      icon: DollarSign,
      path: "/financial-stress",
      category: "financial"
    },
    {
      title: "Team Leadership Wellness",
      description: "Supporting your own mental health while leading a team",
      icon: Heart,
      path: "/leadership-wellness",
      category: "leadership"
    },
    {
      title: "Business Crisis Toolkit",
      description: "Mental health strategies for navigating business crises",
      icon: Shield,
      path: "/crisis-toolkit",
      category: "crisis"
    }
  ];

  const upcomingWorkshops = [
    {
      title: "Entrepreneurial Burnout Prevention",
      date: "Oct 15, 2023",
      time: "2:00 PM - 3:30 PM",
      location: "Virtual (Zoom)",
      spots: 25,
      description: "Learn techniques to recognize and prevent burnout while running your business."
    },
    {
      title: "Small Business Owner Mindfulness",
      date: "Oct 18, 2023",
      time: "12:00 PM - 1:00 PM",
      location: "Business Innovation Center",
      spots: 15,
      description: "A lunch-hour introduction to mindfulness practices that fit into a busy entrepreneur's schedule."
    },
    {
      title: "Managing Team Mental Health",
      date: "Oct 22, 2023",
      time: "9:00 AM - 11:00 AM",
      location: "Virtual (Zoom)",
      spots: "Unlimited",
      description: "Strategies for small business owners to support employees' mental wellbeing."
    }
  ];

  const businessServices = [
    {
      title: "Entrepreneur Coaching Program",
      description: "One-on-one mental health coaching specifically for business owners",
      hours: "By appointment",
      contact: "coaching@businesssupport.org",
      location: "Virtual or In-Person"
    },
    {
      title: "Small Business Crisis Line",
      description: "24/7 support for entrepreneurs facing acute mental health challenges",
      hours: "24/7",
      contact: "1-800-BIZ-HELP",
      location: "Phone Service"
    },
    {
      title: "Business Owner Support Groups",
      description: "Facilitated peer groups for sharing challenges and solutions",
      hours: "Various times weekly",
      contact: "groups@businesssupport.org",
      location: "Community Business Center & Virtual"
    }
  ];

  const filteredResources = businessResources.filter(resource => 
    resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    resource.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#1a1a1f] via-[#242432] to-[#272730]">
        <div className="text-center">
          <Briefcase className="h-12 w-12 text-[#F97316] animate-pulse mx-auto mb-4" />
          <p className="text-white text-xl font-medium">Loading business resources...</p>
        </div>
      </div>
    );
  }

  return (
    <Page title="Small Business Mental Health Resources" fullWidth={true}>
      <div className="space-y-8 w-full">
        <div className="bg-gradient-to-r from-[#F97316]/30 to-[#FB923C]/30 p-6 rounded-xl w-full">
          <div className="flex flex-col md:flex-row gap-6 items-center">
            <div className="md:w-2/3">
              <h2 className="text-2xl font-semibold mb-2 text-white">
                Supporting Entrepreneurs' Mental Wellbeing
              </h2>
              <p className="text-white font-medium mb-4">
                Running a small business brings unique challenges to your mental health. We've gathered resources 
                specifically designed for entrepreneurs balancing business demands, team leadership,
                financial pressures, and personal wellbeing.
              </p>
              <Button 
                className="bg-[#F97316] hover:bg-[#F97316]/80 text-white font-medium shadow-lg group transition-all duration-300 hover:translate-x-1"
              >
                Start Your Wellness Journey <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform"/>
              </Button>
            </div>
            <div className="md:w-1/3 flex-shrink-0">
              <div className="p-4 rounded-full bg-[#F97316]/40 inline-flex items-center justify-center">
                <Briefcase className="h-16 w-16 text-white" />
              </div>
            </div>
          </div>
          <div className="mt-4 relative">
            <Input
              type="search"
              placeholder="Search for resources, topics, or concerns..."
              className="w-full bg-white/20 border-white/30 text-white placeholder:text-white/80"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <p className="mt-2 text-sm font-medium text-white">
              Try searching for: stress, balance, leadership, financial, team, crisis
            </p>
          </div>
        </div>

        <div className="w-full mb-8">
          <div className="bg-[#1A1F2C]/80 p-6 rounded-xl border border-[#F97316]/30">
            <h3 className="text-white font-medium mb-6 text-center text-xl">Navigate Business Wellness Resources</h3>
            
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full bg-transparent p-0">
                <TabsTrigger 
                  value="resources" 
                  className="bg-[#1A1F2C] text-white border border-[#F97316]/30 py-5 px-4 flex flex-col items-center gap-3 data-[state=active]:bg-[#F97316] data-[state=active]:border-[#F97316] hover:bg-[#F97316]/20 transition-all duration-200"
                >
                  <FileText className="h-6 w-6" />
                  <span className="font-medium">Resources</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="workshops" 
                  className="bg-[#1A1F2C] text-white border border-[#FB923C]/30 py-5 px-4 flex flex-col items-center gap-3 data-[state=active]:bg-[#FB923C] data-[state=active]:border-[#FB923C] hover:bg-[#FB923C]/20 transition-all duration-200"
                >
                  <CalendarDays className="h-6 w-6" />
                  <span className="font-medium">Workshops</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="services" 
                  className="bg-[#1A1F2C] text-white border border-[#F97316]/30 py-5 px-4 flex flex-col items-center gap-3 data-[state=active]:bg-[#F97316] data-[state=active]:border-[#F97316] hover:bg-[#F97316]/20 transition-all duration-200"
                >
                  <Building className="h-6 w-6" />
                  <span className="font-medium">Support Services</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="crisis" 
                  className="bg-[#1A1F2C] text-white border border-[#F87171]/50 py-5 px-4 flex flex-col items-center gap-3 data-[state=active]:bg-[#F87171] data-[state=active]:border-[#F87171] hover:bg-[#F87171]/20 transition-all duration-200"
                >
                  <AlertTriangle className="h-6 w-6" />
                  <span className="font-medium">Crisis Support</span>
                </TabsTrigger>
              </TabsList>
              
              <div className="mt-8 w-full">
                {activeTab === "resources" && (
                  <TabsContent value="resources" className="mt-0 pt-0">
                    <div className="mb-8 w-full">
                      <h3 className="text-xl font-semibold mb-6 text-white flex items-center gap-2">
                        <FileText className="h-5 w-5 text-[#F97316]" />
                        <span>Business Mental Health Resources</span>
                      </h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
                        {filteredResources.map((resource, index) => (
                          <Card 
                            key={index}
                            className="border-[#F97316]/30 bg-[#1A1F2C]/50 hover:bg-[#1A1F2C]/70 transition-colors cursor-pointer hover:border-[#F97316]/60"
                            onClick={() => handleResourceClick(resource.title, resource.path)}
                          >
                            <CardHeader className="pb-2">
                              <div className="flex justify-between items-start">
                                <div className="p-2 rounded-lg bg-[#F97316]/30">
                                  <resource.icon className="h-5 w-5 text-white" />
                                </div>
                                <span className="text-xs px-2 py-1 rounded-full border border-[#F97316]/30 bg-[#F97316]/20 text-white font-medium">
                                  {resource.category}
                                </span>
                              </div>
                              <CardTitle className="mt-3 text-lg font-medium text-white">{resource.title}</CardTitle>
                              <CardDescription className="text-[#FFDBB0]">{resource.description}</CardDescription>
                            </CardHeader>
                            <CardContent>
                              <Button 
                                variant="outline" 
                                className="w-full bg-[#F97316]/20 hover:bg-[#F97316]/40 border-[#F97316]/50 hover:text-white text-white flex items-center justify-center gap-2 group"
                              >
                                <span>Explore Resource</span>
                                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                              </Button>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                      
                      {filteredResources.length === 0 && (
                        <div className="text-center py-8 w-full">
                          <p className="text-white font-medium">No resources found matching "{searchTerm}". Try a different search term.</p>
                        </div>
                      )}
                    </div>
                  </TabsContent>
                )}
                
                {activeTab === "workshops" && (
                  <TabsContent value="workshops" className="mt-0 pt-0">
                    <div className="bg-[#1A1F2C]/50 border border-[#F97316]/30 rounded-lg p-6 mb-4 w-full">
                      <h3 className="text-lg font-medium mb-4 flex items-center gap-2 text-white">
                        <Calendar className="h-5 w-5 text-[#FB923C]" />
                        <span>Upcoming Business Wellness Workshops</span>
                      </h3>
                      <p className="text-[#FFDBB0] mb-6 font-medium">
                        All workshops are free for small business owners and their employees. Register early to secure your spot.
                      </p>
                      
                      <div className="space-y-6 w-full">
                        {upcomingWorkshops.map((workshop, index) => (
                          <div 
                            key={index} 
                            className="border border-[#F97316]/30 rounded-lg p-4 hover:bg-[#1A1F2C]/70 transition-colors w-full"
                          >
                            <div className="flex flex-col md:flex-row justify-between md:items-center">
                              <div>
                                <h4 className="font-medium text-[#FB923C]">{workshop.title}</h4>
                                <p className="text-white text-sm">{workshop.description}</p>
                                <div className="flex flex-wrap items-center gap-4 mt-2">
                                  <span className="text-xs flex items-center gap-1 text-[#FFDBB0]">
                                    <Calendar className="h-3 w-3" /> {workshop.date}
                                  </span>
                                  <span className="text-xs flex items-center gap-1 text-[#FFDBB0]">
                                    <Clock className="h-3 w-3" /> {workshop.time}
                                  </span>
                                  <span className="text-xs flex items-center gap-1 text-[#FFDBB0]">
                                    <MapPin className="h-3 w-3" /> {workshop.location}
                                  </span>
                                </div>
                              </div>
                              <div className="mt-4 md:mt-0">
                                <Button 
                                  className="bg-[#FB923C] hover:bg-[#FB923C]/80 text-white font-medium shadow-md transition-all duration-300 group"
                                >
                                  <span>Register Now</span>
                                  <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                </Button>
                                <div className="text-xs text-[#FFDBB0] mt-1 text-center">
                                  {typeof workshop.spots === 'number' ? `${workshop.spots} spots left` : workshop.spots}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <Button 
                        className="mt-6 w-full bg-gradient-to-r from-[#FB923C]/80 to-[#F97316]/80 hover:from-[#FB923C] hover:to-[#F97316] text-white font-medium shadow-md transition-all duration-300 border-none"
                      >
                        <span>View All Workshops</span>
                        <CalendarDays className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </TabsContent>
                )}
                
                {activeTab === "services" && (
                  <TabsContent value="services" className="mt-0 pt-0">
                    <div className="bg-[#1A1F2C]/50 border border-[#F97316]/30 rounded-lg p-6 w-full">
                      <h3 className="text-lg font-medium mb-4 flex items-center gap-2 text-white">
                        <MapPin className="h-5 w-5 text-[#F97316]" />
                        <span>Small Business Support Services</span>
                      </h3>
                      <p className="text-[#FFDBB0] mb-6 font-medium">
                        Services designed specifically for entrepreneurs and small business teams.
                      </p>
                      
                      <div className="space-y-6 w-full">
                        {businessServices.map((service, index) => (
                          <div 
                            key={index} 
                            className="border border-[#F97316]/30 rounded-lg p-4 hover:bg-[#1A1F2C]/70 transition-colors w-full"
                          >
                            <h4 className="font-medium text-[#F97316]">{service.title}</h4>
                            <p className="text-white text-sm mt-1">{service.description}</p>
                            <div className="mt-2 grid grid-cols-1 md:grid-cols-3 gap-2 text-sm">
                              <div className="flex items-center gap-1 text-[#FFDBB0]">
                                <Clock className="h-3 w-3" /> 
                                <span>{service.hours}</span>
                              </div>
                              <div className="flex items-center gap-1 text-[#FFDBB0]">
                                <Users className="h-3 w-3" /> 
                                <span>{service.contact}</span>
                              </div>
                              <div className="flex items-center gap-1 text-[#FFDBB0]">
                                <MapPin className="h-3 w-3" /> 
                                <span>{service.location}</span>
                              </div>
                            </div>
                            <div className="mt-3">
                              <Button 
                                className="bg-[#F97316] hover:bg-[#F97316]/80 text-white shadow-md transition-all duration-300 group"
                              >
                                <span>Connect Now</span>
                                <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <Button 
                        className="mt-6 w-full bg-gradient-to-r from-[#F97316]/80 to-[#FB923C]/80 hover:from-[#F97316] hover:to-[#FB923C] text-white font-medium shadow-md transition-all duration-300 border-none"
                      >
                        <span>View All Support Services</span>
                        <Building className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </TabsContent>
                )}
                
                {activeTab === "crisis" && (
                  <TabsContent value="crisis" className="mt-0 pt-0">
                    <div className="bg-[#F87171]/20 border border-[#F87171]/40 rounded-lg p-6 w-full">
                      <h3 className="text-xl font-medium mb-4 text-white">Business Crisis Support</h3>
                      <p className="mb-6 text-white font-medium">
                        If you're experiencing a mental health crisis related to your business or personal life, please use one of these resources:
                      </p>
                      
                      <div className="space-y-6 w-full">
                        <div className="bg-[#F87171]/30 rounded-lg p-4 w-full">
                          <h4 className="font-medium text-white">Entrepreneur Crisis Line (24/7)</h4>
                          <p className="text-2xl font-bold text-white mt-2">1-800-BIZ-HELP</p>
                          
                          <Button 
                            className="mt-3 bg-white text-[#F87171] hover:bg-white/90 font-medium shadow-md transition-all duration-300 group border-none"
                          >
                            <span>Call Now</span>
                            <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                          </Button>
                        </div>
                        
                        <div className="bg-[#1A1F2C]/60 rounded-lg p-4 w-full">
                          <h4 className="font-medium text-white">Business Coach Hotline</h4>
                          <p className="text-white mt-1">Available 9AM-9PM daily for urgent business-related mental health support</p>
                          
                          <Button 
                            className="mt-3 bg-[#F87171]/80 hover:bg-[#F87171] text-white font-medium shadow-md transition-all duration-300 group border-none"
                          >
                            <span>Get Support</span>
                            <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                          </Button>
                        </div>
                        
                        <div className="bg-[#1A1F2C]/60 rounded-lg p-4 w-full">
                          <h4 className="font-medium text-white">National Crisis Resources</h4>
                          <p className="text-white mt-1">General mental health crisis support available 24/7</p>
                          
                          <Button 
                            className="mt-3 bg-[#F87171]/80 hover:bg-[#F87171] text-white font-medium shadow-md transition-all duration-300 group border-none"
                          >
                            <span>Access Crisis Resources</span>
                            <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                          </Button>
                        </div>
                      </div>
                      
                      <div className="mt-6 border-t border-white/20 pt-4 text-white w-full">
                        <p className="font-medium">
                          For non-emergency support, please schedule a session with a business mental health coach
                          or join one of our support groups.
                        </p>
                        
                        <Button 
                          className="mt-4 w-full bg-white/10 hover:bg-white/20 text-white font-medium shadow-md transition-all duration-300 border border-white/30"
                        >
                          <span>Schedule Coaching Session</span>
                          <Calendar className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </TabsContent>
                )}
              </div>
            </Tabs>
          </div>
        </div>

        <div className="mt-10 w-full">
          <h3 className="text-lg font-medium mb-4 flex items-center gap-2 text-white">
            <Compass className="h-5 w-5 text-[#FB923C]" />
            <span>Quick Access</span>
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
            <Button 
              variant="outline" 
              className="border-[#F97316]/40 bg-[#1A1F2C]/50 hover:bg-[#F97316]/30 h-auto py-4 flex flex-col gap-2 text-white transition-all duration-300 hover:scale-105"
            >
              <Briefcase className="h-5 w-5" />
              <span>Business Strategies</span>
              <ArrowRight className="h-4 w-4 mt-1 text-[#F97316]" />
            </Button>
            
            <Button 
              variant="outline" 
              className="border-[#FB923C]/40 bg-[#1A1F2C]/50 hover:bg-[#FB923C]/30 h-auto py-4 flex flex-col gap-2 text-white transition-all duration-300 hover:scale-105"
            >
              <HandHeart className="h-5 w-5" />
              <span>Employee Support</span>
              <ArrowRight className="h-4 w-4 mt-1 text-[#FB923C]" />
            </Button>
            
            <Button 
              variant="outline" 
              className="border-[#F97316]/40 bg-[#1A1F2C]/50 hover:bg-[#F97316]/30 h-auto py-4 flex flex-col gap-2 text-white transition-all duration-300 hover:scale-105"
            >
              <BarChart className="h-5 w-5" />
              <span>Financial Wellness</span>
              <ArrowRight className="h-4 w-4 mt-1 text-[#F97316]" />
            </Button>
            
            <Button 
              variant="outline" 
              className="border-[#FB923C]/40 bg-[#1A1F2C]/50 hover:bg-[#FB923C]/30 h-auto py-4 flex flex-col gap-2 text-white transition-all duration-300 hover:scale-105"
            >
              <Lightbulb className="h-5 w-5" />
              <span>Self-Care Tips</span>
              <ArrowRight className="h-4 w-4 mt-1 text-[#FB923C]" />
            </Button>
          </div>
        </div>
        
        <div className="mt-10 bg-gradient-to-r from-[#F97316]/20 to-[#FB923C]/20 p-6 rounded-xl w-full">
          <h3 className="text-lg font-medium mb-4 flex items-center gap-2 text-white">
            <Users className="h-5 w-5 text-[#F97316]" />
            <span>Entrepreneur Stories</span>
          </h3>
          
          <div className="italic text-[#E0E0E0] font-medium bg-black/40 p-4 rounded-lg border-l-2 border-[#F97316]/50 pl-4">
            "The entrepreneur support group helped me realize I wasn't alone in feeling overwhelmed by my business. 
            Learning how others manage similar challenges gave me practical tools and renewed confidence."
            <div className="mt-2 text-sm text-[#D0D0D0] font-semibold">— Small Business Owner, Retail Sector</div>
          </div>
          
          <Button 
            className="mt-6 bg-[#F97316]/30 hover:bg-[#F97316]/50 text-white font-medium border border-[#F97316]/50 transition-all duration-300 group"
          >
            <span>Share Your Story</span>
            <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </Page>
  );
};

export default SmallBusinessExperience;
