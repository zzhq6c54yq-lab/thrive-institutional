
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";
import HelpChatDialog from "./HelpChatDialog";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useUser } from "@/contexts/UserContext";

interface HenryIconButtonProps {
  className?: string;
  onClick?: () => void;
}

// This is the floating Help button (still named HenryIconButton for code consistency)
const HenryIconButton: React.FC<HenryIconButtonProps> = ({ 
  className = "",
  onClick
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);
  const { profile } = useUser();
  
  // Check onboarding completion status
  useEffect(() => {
    const localStorageCompleted = localStorage.getItem('hasCompletedOnboarding') === 'true';
    const profileCompleted = profile?.onboarding_completed || false;
    setHasCompletedOnboarding(localStorageCompleted || profileCompleted);
  }, [profile]);
  
  // Get the screen state from the location
  const state = location.state as { screenState?: string } | null;
  const screenState = state?.screenState;
  
  // Check if this is one of the excluded pages
  const isExcludedPage = 
    location.pathname === "/" && 
    (screenState === 'intro' || 
     screenState === 'mood' ||
     screenState === 'register' ||
     screenState === 'subscription' ||
     screenState === 'visionBoard');
   
  // Only show on main dashboard after onboarding completion  
  const isMainDashboard = location.pathname === "/" && screenState === 'main';
  const shouldShowHenryButton = isMainDashboard && hasCompletedOnboarding;
   
  // Don't show during emotional check-in flow or on excluded pages
  const isEmotionalCheckIn = location.pathname === "/" && (
    screenState === 'mood' || 
    screenState === 'moodResponse' || 
    screenState === 'intro' || 
    screenState === 'registration' || 
    screenState === 'subscription'
  );

  // Don't show the help button unless on main dashboard with completed onboarding
  if (!shouldShowHenryButton || isExcludedPage || isEmotionalCheckIn) {
    return null;
  }

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      // Open the help chat dialog instead of navigating
      setIsHelpOpen(true);
    }
  };

  return (
    <>
      <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-50 flex flex-col items-center gap-4">
        <Button
          variant="bronze"
          size="h-icon"
          className={`rounded-full flex items-center justify-center overflow-hidden transition-all duration-300 p-0 shadow-xl hover:shadow-[0_0_25px_rgba(184,115,51,0.6)] ${className}`}
          onClick={handleClick}
          aria-label="Ask for Help"
          title="Ask for Help"
        >
          <div className="h-16 w-16 flex items-center justify-center bg-gradient-to-br from-[#B87333] to-[#E5C5A1]">
            <Avatar className="h-12 w-12 rounded-full border border-[#B87333]/30 shadow-inner">
              <AvatarImage src="/lovable-uploads/f3c84972-8f58-42d7-b86f-82ff2d823b30.png" alt="Henry" />
              <AvatarFallback className="bg-gradient-to-br from-[#B87333] to-[#E5C5A1] text-white">H</AvatarFallback>
            </Avatar>
          </div>
        </Button>
      </div>
      
      <HelpChatDialog isOpen={isHelpOpen} onOpenChange={setIsHelpOpen} />
    </>
  );
};

export default HenryIconButton;
