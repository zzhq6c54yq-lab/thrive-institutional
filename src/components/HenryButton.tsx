
import React from "react";
import { MessageSquare, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface HenryButtonProps {
  onClick?: () => void;
  isFloating?: boolean;
  className?: string;
}

const HenryButton: React.FC<HenryButtonProps> = ({ 
  onClick, 
  isFloating = false, 
  className = "" 
}) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      setIsOpen(true);
    }
  };

  const buttonContent = (
    <Button
      onClick={handleClick}
      variant="henry"
      size={isFloating ? "icon" : "sm"}
      className={`
        ${isFloating 
          ? "fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full shadow-2xl" 
          : ""
        }
        ${className}
      `}
      aria-label="Chat with Henry, your AI assistant"
    >
      <MessageSquare className={isFloating ? "h-6 w-6" : "h-4 w-4"} />
      {!isFloating && <span className="ml-2">Henry</span>}
    </Button>
  );

  if (onClick) {
    return buttonContent;
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {buttonContent}
      </DialogTrigger>
      <DialogContent size="sm">
        <DialogHeader>
          <DialogTitle>Chat with Henry</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-[#B87333]/10 to-[#E5C5A1]/10 p-4 rounded-lg">
            <p className="text-sm text-gray-600 mb-3">
              👋 Hi! I'm Henry, your AI wellness companion. I'm here to help you navigate your mental health journey.
            </p>
            <p className="text-xs text-gray-500">
              How can I assist you today?
            </p>
          </div>
          
          <div className="flex flex-col gap-2">
            <Button variant="outline" size="sm" className="justify-start">
              💬 Start a conversation
            </Button>
            <Button variant="outline" size="sm" className="justify-start">
              📋 Get personalized recommendations
            </Button>
            <Button variant="outline" size="sm" className="justify-start">
              <Target className="w-4 h-4 text-[#D4AF37] mr-2" />
              Set wellness goals
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default HenryButton;
