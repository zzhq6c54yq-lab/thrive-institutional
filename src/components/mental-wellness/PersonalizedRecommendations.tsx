
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { toolCategories } from "@/data/toolCategories";

interface PersonalizedRecommendationsProps {
  showPersonalized: boolean;
  recommendations: string[];
  selectedQualities: string[];
  onToolSelect: (toolTitle: string) => void;
}

const PersonalizedRecommendations: React.FC<PersonalizedRecommendationsProps> = ({
  showPersonalized,
  recommendations,
  selectedQualities,
  onToolSelect
}) => {
  if (!showPersonalized) return null;
  
  return (
    <motion.div 
      className="mb-10 bg-[#F1F0FB] rounded-xl p-8 relative overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#B87333]/10 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-[#9b87f5]/10 to-transparent rounded-full blur-3xl"></div>
      
      <h2 className="text-3xl font-light mb-6 text-center bg-gradient-to-r from-[#B87333] to-[#9b87f5] bg-clip-text text-transparent">
        Your Personalized Recommendations
      </h2>
      <p className="text-lg mb-8 text-center">
        Based on your vision board selections, we recommend these tools for your wellness journey:
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {recommendations.map((toolTitle, index) => {
          const tool = toolCategories.find(t => t.title === toolTitle);
          if (!tool) return null;
          
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.03 }}
            >
              <Card className="feature-card border-[#B87333]/30 bg-white/80 hover:shadow-md transition-all h-full flex flex-col">
                <CardHeader className="pb-2">
                  <div className="rounded-full bg-[#B87333]/10 w-10 h-10 flex items-center justify-center mb-3">
                    <tool.icon className="h-5 w-5 text-[#B87333]" />
                  </div>
                  <CardTitle className="text-xl">{tool.title}</CardTitle>
                  <CardDescription className="text-gray-600">{tool.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <ul className="space-y-1 text-sm text-gray-600">
                    {tool.features.slice(0, 2).map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-1">
                        <Zap className="h-3 w-3 mt-1 text-[#B87333]" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter className="pt-0">
                  <Button 
                    className="w-full bg-[#B87333] hover:bg-[#B87333]/90 text-sm hero-button"
                    onClick={() => onToolSelect(tool.title)}
                  >
                    {tool.cta}
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default PersonalizedRecommendations;
