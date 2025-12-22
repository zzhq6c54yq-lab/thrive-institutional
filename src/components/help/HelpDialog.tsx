
import React, { useState, useEffect, useRef } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import MessageList from "@/components/shared/MessageList"; 
import MessageInput from "./MessageInput";
import { useHenryMessageProcessor } from "./HenryMessageProcessor";
import { X, Info, MessageCircle } from "lucide-react";

interface HelpDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const HelpDialog: React.FC<HelpDialogProps> = ({ isOpen, onOpenChange }) => {
  const [messages, setMessages] = useState<Array<{ text: string; isUser: boolean; timestamp?: Date }>>([
    { 
      text: "Hi there! I'm Henry, your digital mental health companion. How can I support you today?", 
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [messageInputHeight, setMessageInputHeight] = useState(40);
  const dialogContentRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Reset messages when dialog opens
    if (isOpen) {
      setMessages([{ 
        text: "Hi there! I'm Henry, your digital mental health companion. How can I support you today?",
        isUser: false,
        timestamp: new Date()
      }]);
    }
  }, [isOpen]);
  
  const addNewMessage = (message: { text: string; isUser: boolean }) => {
    setMessages(prev => [...prev, {
      ...message,
      timestamp: new Date()
    }]);
  };
  
  const { handleSendMessage, processing, emergencyMode } = useHenryMessageProcessor(addNewMessage);

  // Update the dialog content height when message input height changes
  useEffect(() => {
    if (dialogContentRef.current) {
      dialogContentRef.current.style.setProperty('--message-area-height', `${340 - messageInputHeight}px`);
    }
  }, [messageInputHeight]);

  const handleInputResize = (height: number) => {
    setMessageInputHeight(Math.min(100, height)); // Cap at 100px
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent 
        className="sm:max-w-md w-[350px] md:w-[400px] bg-black/85 backdrop-blur-md border border-[#B87333]/50 p-3 max-h-[80vh] overflow-hidden"
        ref={dialogContentRef}
        style={{ '--message-area-height': '300px' } as React.CSSProperties}
      >
        <div className="absolute right-2 top-2 z-10">
          <Button 
            className="p-1 h-6 w-6 rounded-full bg-transparent hover:bg-white/10 text-white/70 hover:text-white"
            variant="ghost"
            size="icon"
            onClick={() => onOpenChange(false)}
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
        
        <DialogHeader className="text-center">
          <div className="flex justify-center mb-2">
            <div className="relative h-16 w-16 rounded-full overflow-hidden flex items-center justify-center bg-gradient-to-r from-[#B87333] to-[#E5C5A1] shadow-lg">
              <img 
                src="/lovable-uploads/f3c84972-8f58-42d7-b86f-82ff2d823b30.png" 
                alt="Henry" 
                className="h-full w-full object-cover object-center"
              />
              {emergencyMode && (
                <div className="absolute inset-0 rounded-full border-2 border-red-600 animate-pulse"></div>
              )}
            </div>
          </div>
          <DialogTitle className={`text-lg ${emergencyMode ? "text-red-400" : "text-white"}`}>
            {emergencyMode ? "Emergency Support Mode" : "Need Help?"}
          </DialogTitle>
          <DialogDescription className={emergencyMode ? "text-red-300" : "text-gray-300"}>
            {emergencyMode 
              ? "Connecting you with a human counselor..." 
              : "Chat with Henry, your mental health companion"
            }
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex flex-col h-full overflow-hidden">
          <MessageList 
            messages={messages} 
            className="flex-grow" 
            style={{ height: 'var(--message-area-height)' }}
            showTypingIndicator={processing}
          />
          
          <div className="mt-2">
            <MessageInput 
              onSendMessage={handleSendMessage} 
              isProcessing={processing} 
              isEmergencyMode={emergencyMode}
              onResize={handleInputResize}
            />
          </div>
        </div>
        
        <div className="mt-4 flex justify-center">
          <Button
            className={`${
              emergencyMode 
                ? "bg-gradient-to-br from-red-700 to-red-500 hover:from-red-800 hover:to-red-600" 
                : "bg-gradient-to-r from-[#B87333] to-[#E5C5A1] hover:from-[#A76323] hover:to-[#D4B491]"
            } text-white w-1/2`}
            onClick={() => onOpenChange(false)}
          >
            Got it
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default HelpDialog;
