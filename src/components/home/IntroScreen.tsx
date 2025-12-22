import React from "react";
import CinematicIntro from "./CinematicIntro";

interface IntroScreenProps {
  onContinue: () => void;
  onSkipToMain?: () => void;
}

const IntroScreen: React.FC<IntroScreenProps> = ({ onContinue, onSkipToMain }) => {
  return <CinematicIntro onContinue={onContinue} onSkipToMain={onSkipToMain} />;
};

export default IntroScreen;
