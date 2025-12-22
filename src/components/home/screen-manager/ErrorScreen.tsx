
import React from "react";

interface ErrorScreenProps {
  setScreenState: (state: 'intro' | 'mood' | 'moodResponse' | 'register' | 'subscription' | 'subscriptionAddOns' | 'visionBoard' | 'main') => void;
}

const ErrorScreen: React.FC<ErrorScreenProps> = ({ setScreenState }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#1a1a1f] text-white">
      <h2 className="text-2xl mb-4">Something went wrong</h2>
      <p className="mb-6">We couldn't load the correct screen.</p>
      <button 
        className="bg-[#B87333] hover:bg-[#B87333]/80 px-6 py-3 rounded-md"
        onClick={() => {
          localStorage.removeItem('hasCompletedOnboarding');
          localStorage.removeItem('prevScreenState');
          setScreenState('intro');
        }}
      >
        Restart
      </button>
    </div>
  );
};

export default ErrorScreen;
