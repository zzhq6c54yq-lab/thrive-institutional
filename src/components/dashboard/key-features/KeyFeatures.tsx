
import React from "react";
import useTranslation from "@/hooks/useTranslation";
import { getFeatures } from "./featuresData";
import { useFeatureNavigation } from "./useFeatureNavigation";
import KeyFeaturesGrid from "./KeyFeaturesGrid";

interface KeyFeaturesProps {
  navigateToFeature?: (path: string) => void;
  selectedQualities?: string[];
  selectedGoals?: string[];
}

const KeyFeatures: React.FC<KeyFeaturesProps> = ({ 
  navigateToFeature,
  selectedQualities = [],
  selectedGoals = []
}) => {
  const { isSpanish } = useTranslation();
  const { handleNavigate: defaultHandleNavigate } = useFeatureNavigation();
  
  // Use provided navigation function or default one
  const handleNavigate = navigateToFeature || defaultHandleNavigate;
  
  // Get features data based on language
  const features = getFeatures(isSpanish);

  return (
    <div className="mt-8">
      <KeyFeaturesGrid
        features={features}
        selectedQualities={selectedQualities}
        selectedGoals={selectedGoals}
        isSpanish={isSpanish}
        handleNavigate={handleNavigate}
      />
    </div>
  );
};

export default KeyFeatures;
