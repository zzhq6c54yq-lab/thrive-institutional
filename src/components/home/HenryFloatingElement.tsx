
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { X } from "lucide-react";

interface HenryFloatingElementProps {
  showHenry: boolean;
  onHenryToggle: () => void;
}

const HenryFloatingElement: React.FC<HenryFloatingElementProps> = ({
  showHenry,
  onHenryToggle
}) => {
  return (
    <AnimatePresence>
      {showHenry && (
        <motion.div
          initial={{ opacity: 0, scale: 0, x: 100, y: 100 }}
          animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
          exit={{ opacity: 0, scale: 0, x: 100, y: 100 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="fixed bottom-6 right-6 z-50"
        >
          <div className="relative bg-gradient-to-br from-[#B87333] to-[#E5C5A1] p-4 rounded-full shadow-2xl">
            <button
              onClick={onHenryToggle}
              className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 transition-colors duration-200"
              aria-label="Close Henry"
            >
              <X className="h-4 w-4" />
            </button>
            
            <Avatar className="h-16 w-16 border-4 border-white/30">
              <AvatarImage src="/lovable-uploads/f3c84972-8f58-42d7-b86f-82ff2d823b30.png" alt="Henry" />
              <AvatarFallback className="bg-gradient-to-br from-[#B87333] to-[#E5C5A1] text-white font-semibold text-xl">H</AvatarFallback>
            </Avatar>
            
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="absolute -top-16 -left-8 bg-white text-gray-800 px-3 py-2 rounded-lg shadow-lg text-sm whitespace-nowrap"
            >
              Hi! I'm Henry, your companion
              <div className="absolute top-full left-8 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white"></div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default HenryFloatingElement;
