
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import useTranslation from "@/hooks/useTranslation";

interface ResourceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  onResourceClick: () => void;
  buttonText?: string;
  isLoading?: boolean;
}

const ResourceCard: React.FC<ResourceCardProps> = ({ 
  title, 
  description, 
  icon, 
  onResourceClick,
  buttonText,
  isLoading = false
}) => {
  const { preferredLanguage } = useTranslation();
  
  const defaultButtonTexts = {
    'English': 'Explore Resources',
    'Español': 'Explorar Recursos',
    'Português': 'Explorar Recursos',
    'Filipino': 'Tuklasin ang mga Resources'
  };
  
  const finalButtonText = buttonText || defaultButtonTexts[preferredLanguage as keyof typeof defaultButtonTexts] || defaultButtonTexts['English'];

  const handleButtonClick = (e: React.MouseEvent) => {
    // Prevent default behavior to ensure custom handler is used
    e.preventDefault();
    // Call the provided click handler
    onResourceClick();
  };

  return (
    <div className="bg-[#2A2420]/80 backdrop-blur-sm border border-[#D4AF37]/20 rounded-xl p-6 hover:bg-[#2A2420]/90 hover:border-[#D4AF37]/40 transition-all shadow-md">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-medium text-[#D4AF37]">{title}</h3>
        <div className="p-2 bg-[#D4AF37]/20 rounded-full">
          {icon}
        </div>
      </div>
      <p className="mb-6 text-gray-100 min-h-[80px]">
        {description}
      </p>
      <Button 
        className="w-full bg-[#4A3F36] hover:bg-[#5D4C3B] text-white flex items-center justify-center border border-[#D4AF37]/20"
        onClick={handleButtonClick}
        disabled={isLoading}
      >
        {isLoading ? (
          <span className="flex items-center">
            <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            {preferredLanguage === 'Filipino' ? 'Naglo-load...' : 'Loading...'}
          </span>
        ) : (
          <>
            {finalButtonText}
            <ArrowRight className="ml-2 h-4 w-4" />
          </>
        )}
      </Button>
    </div>
  );
};

export default ResourceCard;
