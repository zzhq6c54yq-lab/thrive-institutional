import React, { useRef, useEffect, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ChevronUp, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  text: string;
  isUser: boolean;
  timestamp?: Date;
}

interface MessageListProps {
  messages: Message[];
  className?: string;
  style?: React.CSSProperties;
  showTypingIndicator?: boolean;
}

const MessageList: React.FC<MessageListProps> = ({ 
  messages,
  className,
  style,
  showTypingIndicator = false
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const [canScrollUp, setCanScrollUp] = useState(false);
  const [canScrollDown, setCanScrollDown] = useState(false);

  // Check scroll position and update arrow visibility
  const checkScrollPosition = () => {
    const scrollElement = scrollAreaRef.current?.querySelector('[data-radix-scroll-area-viewport]');
    if (scrollElement) {
      const { scrollTop, scrollHeight, clientHeight } = scrollElement;
      setCanScrollUp(scrollTop > 20);
      setCanScrollDown(scrollTop < scrollHeight - clientHeight - 20);
    }
  };

  // Auto-scroll to bottom whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    setTimeout(checkScrollPosition, 200); // Check after scroll animation
  }, [messages, showTypingIndicator]);

  // Check scroll position on mount and scroll events
  useEffect(() => {
    const scrollElement = scrollAreaRef.current?.querySelector('[data-radix-scroll-area-viewport]');
    if (scrollElement) {
      scrollElement.addEventListener('scroll', checkScrollPosition);
      checkScrollPosition(); // Initial check
      return () => scrollElement.removeEventListener('scroll', checkScrollPosition);
    }
  }, []);

  const scrollToTop = () => {
    const scrollElement = scrollAreaRef.current?.querySelector('[data-radix-scroll-area-viewport]');
    scrollElement?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="relative h-full">
      <ScrollArea 
        ref={scrollAreaRef}
        className={cn("flex-1 pr-4 h-full overflow-y-auto", className)} 
        style={style}
      >
        <div className="space-y-4 py-1">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.isUser
                    ? "bg-[#B87333] text-white"
                    : "bg-gray-700 text-white"
                }`}
              >
                {/* Only show Henry's avatar and name for non-user messages */}
                {!message.isUser && (
                  <div className="flex items-center mb-1">
                    <Avatar className="h-6 w-6 mr-2">
                      <AvatarImage src="/lovable-uploads/f3c84972-8f58-42d7-b86f-82ff2d823b30.png" alt="Henry" />
                      <AvatarFallback className="bg-gradient-to-br from-[#B87333] to-[#E5C5A1] text-white text-xs">H</AvatarFallback>
                    </Avatar>
                    <span className="text-xs text-white/70">Henry</span>
                  </div>
                )}
                <p className="text-sm">{message.text}</p>
                {message.timestamp && (
                  <span className="text-xs opacity-70 mt-1 block text-right">
                    {message.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                )}
              </div>
            </div>
          ))}
          
          {/* Typing indicator */}
          {showTypingIndicator && (
            <div className="flex justify-start">
              <div className="max-w-[80%] rounded-lg p-3 bg-gray-700">
                <div className="flex items-center mb-1">
                  <Avatar className="h-6 w-6 mr-2">
                    <AvatarImage src="/lovable-uploads/f3c84972-8f58-42d7-b86f-82ff2d823b30.png" alt="Henry" />
                    <AvatarFallback className="bg-gradient-to-br from-[#B87333] to-[#E5C5A1] text-white text-xs">H</AvatarFallback>
                  </Avatar>
                  <span className="text-xs text-white/70">Henry</span>
                </div>
                <div className="flex space-x-1 items-center h-5">
                  <div className="w-2 h-2 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: "0ms" }}></div>
                  <div className="w-2 h-2 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: "300ms" }}></div>
                  <div className="w-2 h-2 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: "600ms" }}></div>
                </div>
              </div>
            </div>
          )}
          
          {/* Invisible element to scroll to */}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      {/* Sliding Up Arrow */}
      <div className={`absolute top-2 right-2 transition-all duration-300 ${
        canScrollUp 
          ? 'transform translate-y-0 opacity-100' 
          : 'transform -translate-y-8 opacity-0 pointer-events-none'
      }`}>
        <Button
          size="sm"
          variant="secondary"
          className="h-8 w-8 p-0 bg-black/70 hover:bg-black/90 border border-[#B87333]/30 backdrop-blur-sm"
          onClick={scrollToTop}
        >
          <ChevronUp className="h-4 w-4 text-[#B87333]" />
        </Button>
      </div>

      {/* Sliding Down Arrow */}
      <div className={`absolute bottom-2 right-2 transition-all duration-300 ${
        canScrollDown 
          ? 'transform translate-y-0 opacity-100' 
          : 'transform translate-y-8 opacity-0 pointer-events-none'
      }`}>
        <Button
          size="sm"
          variant="secondary"
          className="h-8 w-8 p-0 bg-black/70 hover:bg-black/90 border border-[#B87333]/30 backdrop-blur-sm"
          onClick={scrollToBottom}
        >
          <ChevronDown className="h-4 w-4 text-[#B87333]" />
        </Button>
      </div>
    </div>
  );
};

export default MessageList;