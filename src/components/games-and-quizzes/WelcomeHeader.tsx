
import React from "react";
import { Sparkles } from "lucide-react";

const WelcomeHeader: React.FC = () => {
  return (
    <div className="mb-8 text-center">
      <h1 className="text-4xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-[#9b87f5] via-[#D946EF] to-[#8B5CF6] animate-pulse" style={{animationDuration: '3s'}}>
        Games & Quizzes for Mental Wellness
      </h1>
      <p className="text-lg text-gray-600 max-w-2xl mx-auto">
        Have fun while improving your mental wellbeing with our engaging games and insightful quizzes
      </p>
      <div className="mt-4">
        <div className="inline-block relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-[#9b87f5] to-[#D946EF] rounded-lg blur opacity-30 animate-pulse" style={{animationDuration: '2s'}}></div>
          <Sparkles className="h-8 w-8 text-[#9b87f5] mx-auto animate-bounce" style={{animationDuration: '2s'}} />
        </div>
      </div>
    </div>
  );
};

export default WelcomeHeader;
