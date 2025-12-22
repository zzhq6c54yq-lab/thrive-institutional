import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft, Smile, Meh, Frown, HeartCrack, Angry, Brain, RefreshCw } from "lucide-react";
import { motion } from "framer-motion";
import useTranslation from "@/hooks/useTranslation";
import { getRandomPrompt, saveUsedPrompt, getUsedPrompts, PositivePrompt } from "@/data/positivePrompts";

interface MoodResponseProps {
  selectedMood: 'happy' | 'ok' | 'neutral' | 'down' | 'sad' | 'overwhelmed' | null;
  onContinue: () => void;
  onPrevious: () => void;
}

const MoodResponse: React.FC<MoodResponseProps> = ({ selectedMood, onContinue, onPrevious }) => {
  const [currentPrompt, setCurrentPrompt] = useState<PositivePrompt | null>(null);
  const { isSpanish } = useTranslation();
  
  const translations = {
    continue: isSpanish ? "Continuar" : "Continue",
    previous: isSpanish ? "Anterior" : "Previous",
    newPrompt: isSpanish ? "Nuevo Mensaje" : "Get New Message"
  };

  // Initialize with first prompt for the selected mood
  useEffect(() => {
    if (selectedMood) {
      loadNewPrompt();
    }
  }, [selectedMood]);

  const loadNewPrompt = () => {
    if (!selectedMood) return;
    
    const usedPrompts = getUsedPrompts(selectedMood);
    const newPrompt = getRandomPrompt(selectedMood, usedPrompts);
    
    if (newPrompt) {
      setCurrentPrompt(newPrompt);
      saveUsedPrompt(selectedMood, newPrompt.id);
    }
  };

  const handleNewPrompt = () => {
    loadNewPrompt();
  };

  const getMoodTitle = () => {
    switch (selectedMood) {
      case 'happy':
        return isSpanish ? 'Tu Día Tiene Potencial Ilimitado' : 'Your Day Has Unlimited Potential';
      case 'ok':
        return isSpanish ? 'Encontrando Equilibrio en Este Momento' : 'Finding Balance in This Moment';
      case 'neutral':
        return isSpanish ? 'Cada Momento es un Nuevo Comienzo' : 'Every Moment is a Fresh Start';
      case 'down':
        return isSpanish ? 'Eres Más Fuerte de lo que Crees' : 'You Are Stronger Than You Know';
      case 'sad':
        return isSpanish ? 'Recordatorios Gentiles para tu Corazón' : 'Gentle Reminders for Your Heart';
      case 'overwhelmed':
        return isSpanish ? 'Paso a Paso' : 'One Step at a Time';
      default:
        return isSpanish ? 'Tu Viaje Continúa' : 'Your Journey Continues';
    }
  };

  const getMoodIcon = () => {
    switch (selectedMood) {
      case 'happy':
        return <Smile className="w-12 h-12 text-white" />;
      case 'ok':
        return <Brain className="w-12 h-12 text-white" />;
      case 'neutral':
        return <Meh className="w-12 h-12 text-white" />;
      case 'down':
        return <HeartCrack className="w-12 h-12 text-white" />;
      case 'sad':
        return <Frown className="w-12 h-12 text-white" />;
      case 'overwhelmed':
        return <Angry className="w-12 h-12 text-white" />;
      default:
        return <Smile className="w-12 h-12 text-white" />;
    }
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1a2e] to-[#16213e] text-white overflow-hidden flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-8 relative">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-2xl w-full mx-auto bg-gradient-to-br from-[#21213f]/90 to-[#2a294f]/90 backdrop-blur-lg rounded-2xl overflow-hidden shadow-xl border border-white/10"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-[#B87333]/20 via-transparent to-[#B87333]/20 opacity-50"></div>
            <div className="px-6 py-6 flex flex-col items-center relative z-10">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#B87333] to-[#E5C5A1] p-1 flex items-center justify-center mb-5">
                <div className="w-full h-full rounded-full bg-[#21213f]/90 flex items-center justify-center">
                  {getMoodIcon()}
                </div>
              </div>
              <h1 className="text-3xl md:text-4xl font-light mb-2 text-transparent bg-clip-text bg-gradient-to-r from-[#B87333] to-[#E5C5A1]">
                {getMoodTitle()}
              </h1>
            </div>
          </div>
          
          <div className="bg-black/20 backdrop-blur-md border-t border-white/10 p-6">
            {currentPrompt && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="bg-gradient-to-br from-[#21213f]/80 to-[#2a294f]/80 backdrop-blur-sm p-6 rounded-xl border border-[#B87333]/30"
              >
                <p className="text-lg text-white/95 leading-relaxed font-light text-center">
                  <span className="text-[#E5C5A1]">"</span>
                  <span className="text-white">
                    {isSpanish ? currentPrompt.spanish : currentPrompt.english}
                  </span>
                  <span className="text-[#E5C5A1]">"</span>
                </p>
              </motion.div>
            )}
          </div>
          
          <div className="bg-[#1a1a2e]/80 backdrop-blur-md border-t border-white/5 px-6 py-4 flex justify-between items-center">
            <Button
              variant="outline"
              className="bg-white/5 hover:bg-white/10 border-white/10 text-white"
              onClick={onPrevious}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              {translations.previous}
            </Button>

            <Button
              variant="outline"
              className="bg-[#B87333]/10 hover:bg-[#B87333]/20 border-[#B87333]/30 text-[#B87333] hover:text-[#E5C5A1]"
              onClick={handleNewPrompt}
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              {translations.newPrompt}
            </Button>
            
            <Button
              className="bg-gradient-to-r from-[#B87333] to-[#E5C5A1] hover:from-[#A56625] hover:to-[#D4B48F] text-white group"
              onClick={onContinue}
            >
              {translations.continue}
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default MoodResponse;
