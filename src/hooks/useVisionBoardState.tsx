
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export const useVisionBoardState = () => {
  const [selectedQualities, setSelectedQualities] = useState<string[]>([]);
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const { toast } = useToast();

  // Get language preference
  const preferredLanguage = localStorage.getItem('preferredLanguage') || 'English';

  const toggleQuality = (id: string) => {
    setSelectedQualities(prev => 
      prev.includes(id) 
        ? prev.filter(q => q !== id) 
        : [...prev, id]
    );
  };

  const toggleGoal = (id: string) => {
    setSelectedGoals(prev => 
      prev.includes(id) 
        ? prev.filter(g => g !== id) 
        : [...prev, id]
    );
  };

  const handleVisionBoardContinue = (nextScreenSetter: () => void) => {
    if (selectedQualities.length < 2 || selectedGoals.length < 2) {
      const errorMessages = {
        'English': {
          title: "More Selections Needed",
          description: "Please select at least 2 qualities and 2 goals to continue."
        },
        'Español': {
          title: "Se Necesitan Más Selecciones",
          description: "Por favor selecciona al menos 2 cualidades y 2 metas para continuar."
        },
        'Português': {
          title: "Mais Seleções Necessárias",
          description: "Por favor, selecione pelo menos 2 qualidades e 2 objetivos para continuar."
        }
      };
      
      const message = errorMessages[preferredLanguage as keyof typeof errorMessages] || errorMessages['English'];
      
      toast({
        title: message.title,
        description: message.description,
        variant: "destructive"
      });
      return;
    }
    
    const successMessages = {
      'English': {
        title: "Vision Board Created",
        description: "Your personalized mental wellness journey is ready!"
      },
      'Español': {
        title: "Tablero de Visión Creado",
        description: "¡Tu viaje personalizado de bienestar mental está listo!"
      },
      'Português': {
        title: "Quadro de Visão Criado",
        description: "Sua jornada personalizada de bem-estar mental está pronta!"
      }
    };
    
    const message = successMessages[preferredLanguage as keyof typeof successMessages] || successMessages['English'];
    
    toast({
      title: message.title,
      description: message.description,
    });
    
    nextScreenSetter();
  };

  return {
    selectedQualities,
    selectedGoals,
    toggleQuality,
    toggleGoal,
    handleVisionBoardContinue
  };
};

export default useVisionBoardState;
