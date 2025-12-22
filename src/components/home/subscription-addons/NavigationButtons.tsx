
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface NavigationButtonsProps {
  getTranslatedText: (key: string) => string | undefined;
  onPrevious: () => void;
  onContinue: () => void;
  onSkip: () => void;
}

const NavigationButtons: React.FC<NavigationButtonsProps> = ({
  getTranslatedText,
  onPrevious,
  onContinue,
  onSkip
}) => {
  return (
    <div className="flex flex-wrap justify-center space-x-4 gap-3 mt-8">
      <Button 
        variant="outline"
        className="border-[#B87333]/50 text-[#B87333] hover:bg-[#B87333]/10 flex items-center gap-2"
        onClick={onPrevious}
      >
        <ArrowLeft className="h-4 w-4" />
        {getTranslatedText('previous')}
      </Button>
      <Button 
        className="bg-gradient-to-r from-[#B87333] to-[#E5C5A1] hover:from-[#A56625] hover:to-[#D4B48F] text-white flex items-center gap-2"
        onClick={onContinue}
      >
        {getTranslatedText('continue')}
        <ArrowRight className="h-4 w-4" />
      </Button>
      <Button 
        variant="ghost"
        className="text-white/80 hover:text-white hover:bg-white/10"
        onClick={onSkip}
      >
        {getTranslatedText('skipForNow')}
      </Button>
    </div>
  );
};

export default NavigationButtons;
