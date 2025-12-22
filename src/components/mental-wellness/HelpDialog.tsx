
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X, Send } from "lucide-react";
import MessageList from "@/components/shared/MessageList";
import useTranslation from "@/hooks/useTranslation";

interface HelpDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const HelpDialog: React.FC<HelpDialogProps> = ({ isOpen, onClose }) => {
  const { getTranslatedText, preferredLanguage } = useTranslation();
  
  const [helpMessages, setHelpMessages] = useState<{ text: string; isUser: boolean }[]>([
    { text: getTranslatedText('howCanIHelp'), isUser: false }
  ]);
  const [currentMessage, setCurrentMessage] = useState<string>("");

  if (!isOpen) return null;

  const addHelpMessage = (text: string, isUser: boolean) => {
    setHelpMessages(prev => [...prev, { text, isUser }]);
  };

  const handleSendMessage = () => {
    if (!currentMessage.trim()) return;
    
    addHelpMessage(currentMessage, true);
    setCurrentMessage("");
    
    // Simulate response based on keywords
    setTimeout(() => {
      let response = "";
      const lowerMsg = currentMessage.toLowerCase();
      
      // Translations for responses based on the current language
      const responses = {
        meditation: {
          'English': "Our meditation tools include guided sessions, breathing exercises, and mindfulness practices. You can access them in the Mindfulness & Meditation category.",
          'Español': "Nuestras herramientas de meditación incluyen sesiones guiadas, ejercicios de respiración y prácticas de atención plena. Puedes acceder a ellas en la categoría de Mindfulness y Meditación.",
          'Português': "Nossas ferramentas de meditação incluem sessões guiadas, exercícios de respiração e práticas de atenção plena. Você pode acessá-las na categoria Mindfulness e Meditação."
        },
        anxiety: {
          'English': "For anxiety relief, I recommend checking out our breathing exercises, journaling tools, and guided relaxation sessions in the Anxiety Relief category.",
          'Español': "Para aliviar la ansiedad, recomiendo consultar nuestros ejercicios de respiración, herramientas de diario y sesiones de relajación guiada en la categoría Alivio de la Ansiedad.",
          'Português': "Para alívio da ansiedade, recomendo conferir nossos exercícios de respiração, ferramentas de diário e sessões de relaxamento guiado na categoria Alívio da Ansiedade."
        },
        sleep: {
          'English': "To improve your sleep, explore our sleep sounds, bedtime routines, and relaxation exercises in the Better Sleep category.",
          'Español': "Para mejorar tu sueño, explora nuestros sonidos para dormir, rutinas para antes de acostarte y ejercicios de relajación en la categoría Mejor Sueño.",
          'Português': "Para melhorar seu sono, explore nossos sons para dormir, rotinas para hora de dormir e exercícios de relaxamento na categoria Sono Melhor."
        },
        game: {
          'English': "You might enjoy our interactive icing game! It's a fun way to practice mindfulness through a creative activity. Click on 'Fun Zone' to try it out.",
          'Español': "¡Podrías disfrutar de nuestro juego interactivo de decoración! Es una forma divertida de practicar la atención plena a través de una actividad creativa. Haz clic en 'Zona de Diversión' para probarlo.",
          'Português': "Você pode gostar do nosso jogo interativo de decoração! É uma maneira divertida de praticar atenção plena através de uma atividade criativa. Clique em 'Zona de Diversão' para experimentá-lo."
        },
        default: {
          'English': "I'd be happy to help you find the right mental wellness tools. You can browse by category or tell me more specifically what you're looking for.",
          'Español': "Estaré encantado de ayudarte a encontrar las herramientas de bienestar mental adecuadas. Puedes navegar por categoría o decirme más específicamente lo que estás buscando.",
          'Português': "Ficarei feliz em ajudá-lo a encontrar as ferramentas certas de bem-estar mental. Você pode navegar por categoria ou me dizer mais especificamente o que está procurando."
        }
      };
      
      if (lowerMsg.includes("meditation") || lowerMsg.includes("mindful") || 
          lowerMsg.includes("meditación") || lowerMsg.includes("meditacao")) {
        response = responses.meditation[preferredLanguage as keyof typeof responses.meditation] || responses.meditation['English'];
      } else if (lowerMsg.includes("anxiety") || lowerMsg.includes("stress") || 
                lowerMsg.includes("ansiedad") || lowerMsg.includes("ansiedade")) {
        response = responses.anxiety[preferredLanguage as keyof typeof responses.anxiety] || responses.anxiety['English'];
      } else if (lowerMsg.includes("sleep") || lowerMsg.includes("dormir") || 
                lowerMsg.includes("sueño") || lowerMsg.includes("sono")) {
        response = responses.sleep[preferredLanguage as keyof typeof responses.sleep] || responses.sleep['English'];
      } else if (lowerMsg.includes("game") || lowerMsg.includes("fun") || 
                lowerMsg.includes("juego") || lowerMsg.includes("jogo")) {
        response = responses.game[preferredLanguage as keyof typeof responses.game] || responses.game['English'];
      } else {
        response = responses.default[preferredLanguage as keyof typeof responses.default] || responses.default['English'];
      }
      
      addHelpMessage(response, false);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
        <div className="bg-[#221F26] p-4 flex justify-between items-center">
          <div className="flex items-center">
            <div className="h-8 w-8 rounded-full overflow-hidden flex items-center justify-center mr-2 border border-[#B87333]/30">
              <img 
                src="/lovable-uploads/f3c84972-8f58-42d7-b86f-82ff2d823b30.png" 
                alt="Henry" 
                className="h-full w-full object-cover"
              />
            </div>
            <h3 className="text-white font-medium">{getTranslatedText('chatWithHenry')}</h3>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onClose}
            className="text-white/70 hover:text-white hover:bg-white/10"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        <div className="p-4 h-80">
          <MessageList 
            messages={helpMessages.map(m => ({
              text: m.text,
              isUser: m.isUser,
              timestamp: new Date()
            }))}
            className="h-64"
          />
          <div className="flex mt-4">
            <Input
              placeholder={
                preferredLanguage === 'Español' 
                  ? "Pregunta sobre herramientas de bienestar mental..." 
                  : preferredLanguage === 'Português'
                  ? "Pergunte sobre ferramentas de bem-estar mental..."
                  : "Ask about mental wellness tools..."
              }
              value={currentMessage}
              onChange={(e) => setCurrentMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              className="flex-1 mr-2"
            />
            <Button 
              onClick={handleSendMessage}
              disabled={!currentMessage.trim()}
              className="bg-[#B87333] hover:bg-[#B87333]/90"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpDialog;
