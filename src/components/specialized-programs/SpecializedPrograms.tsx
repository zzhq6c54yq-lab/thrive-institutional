
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import useTranslation from "@/hooks/useTranslation";
import SpecializedProgramsGrid from "@/components/shared/SpecializedProgramsGrid";

const SpecializedPrograms: React.FC = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { isSpanish } = useTranslation();

  const translations = {
    navigating: isSpanish ? "Navegando..." : "Navigating...",
    takingYou: isSpanish ? "Llevándote a la función seleccionada" : "Taking you to your selected feature"
  };

  useEffect(() => {
    const handleLanguageChange = () => {
      // Language change handled silently
    };
    
    window.addEventListener('languageChange', handleLanguageChange);
    return () => {
      window.removeEventListener('languageChange', handleLanguageChange);
    };
  }, []);

  const handleFeatureClick = (path: string) => {
    toast({
      title: translations.navigating,
      description: translations.takingYou,
      duration: 1500,
    });
    
    navigate(path, { 
      state: { 
        fromMainMenu: true,
        preventTutorial: true,
        directToAssessment: true
      }
    });
  };

  return <SpecializedProgramsGrid onProgramClick={handleFeatureClick} />;
};

export default SpecializedPrograms;
