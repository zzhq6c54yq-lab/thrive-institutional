
import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface HenryHeaderProps {
  onClose: () => void;
}

const HenryHeader: React.FC<HenryHeaderProps> = ({ onClose }) => {
  return (
    <div className="flex items-center justify-between border-b border-[#B87333]/30 pb-2">
      <div className="flex items-center gap-2">
        <Avatar className="h-10 w-10 border-2 border-[#B87333]/50">
          <AvatarImage src="/lovable-uploads/f3c84972-8f58-42d7-b86f-82ff2d823b30.png" alt="Henry" />
          <AvatarFallback className="bg-[#B87333]/20 text-[#B87333]">H</AvatarFallback>
        </Avatar>
        <div>
          <h3 className="text-sm font-medium text-white">Henry</h3>
          <p className="text-xs text-white/70">Your mental health companion</p>
        </div>
      </div>
      <Button 
        className="h-8 w-8 rounded-full bg-transparent hover:bg-white/10"
        variant="ghost"
        size="icon"
        onClick={onClose}
      >
        <X className="h-4 w-4 text-white/70" />
      </Button>
    </div>
  );
};

export default HenryHeader;
