
import React from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface PersonalizedSectionProps {
  selectedQualities: string[];
  onGetRecommendations: () => void;
}

const PersonalizedSection: React.FC<PersonalizedSectionProps> = ({ 
  selectedQualities, 
  onGetRecommendations 
}) => {
  return (
    <div className="mb-10 bg-gradient-to-r from-[#F1F0FB] to-[#F8E8DD] rounded-xl p-8 text-center relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-20 z-0"></div>
      <div className="relative z-10">
        <h2 className="text-3xl font-light mb-4">Your Personalized Wellness Journey</h2>
        <p className="text-lg text-muted-foreground mb-6 max-w-3xl mx-auto">
          Based on your vision board selections, we can recommend tools that align with your goals and desired qualities.
        </p>
        <Button 
          className="bg-[#B87333] hover:bg-[#B87333]/90 px-8 hero-button"
          onClick={onGetRecommendations}
        >
          Get Personalized Recommendations
        </Button>
        
        {selectedQualities.length > 0 && (
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            <span className="text-sm text-gray-600 mr-2">Based on your qualities:</span>
            {selectedQualities.map((quality, i) => (
              <span key={i} className="inline-block px-2 py-1 bg-[#B87333]/10 text-[#B87333] text-xs rounded-full">
                {quality}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PersonalizedSection;
