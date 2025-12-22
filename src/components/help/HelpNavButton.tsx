
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import HelpDialog from "@/components/help/HelpDialog";
import { useLocation } from "react-router-dom";
import { useButtonVisibility } from "./RouteVisibility";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import useTranslation from "@/hooks/useTranslation";

const HelpNavButton: React.FC = () => {
  const [showHelpDialog, setShowHelpDialog] = useState(false);
  const location = useLocation();
  const isButtonVisible = useButtonVisibility();
  const { getTranslatedText, isSpanish, isPortuguese } = useTranslation();
  
  // Handle opening the help dialog directly
  const openHelp = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowHelpDialog(true);
  };

  // Don't render if button shouldn't be visible
  if (!isButtonVisible) {
    return null;
  }

  // Get button text from translation
  const helpButtonText = getTranslatedText('getHelp');

  return (
    <>
      <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-50">
        <Button
          onClick={openHelp}
          className="h-14 w-14 rounded-full bg-gradient-to-br from-[#B87333] to-[#E5C5A1] text-white shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
          size="icon"
          aria-label={helpButtonText}
          title={helpButtonText}
        >
          <Avatar className="h-10 w-10 border-2 border-white/30">
            <AvatarImage src="/lovable-uploads/f3c84972-8f58-42d7-b86f-82ff2d823b30.png" alt="Henry" />
            <AvatarFallback className="bg-gradient-to-br from-[#B87333] to-[#E5C5A1] text-white font-semibold">H</AvatarFallback>
          </Avatar>
        </Button>
      </div>
      
      <HelpDialog 
        isOpen={showHelpDialog} 
        onOpenChange={setShowHelpDialog}
      />
    </>
  );
};

export default HelpNavButton;
