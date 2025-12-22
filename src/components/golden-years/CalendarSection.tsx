
import React from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import useTranslation from "@/hooks/useTranslation";

interface CalendarSectionProps {
  onEventClick: (event: string) => void;
  onViewAllClick: () => void;
}

const CalendarSection: React.FC<CalendarSectionProps> = ({ onEventClick, onViewAllClick }) => {
  const { getTranslatedText } = useTranslation();
  
  // Event data with translations
  const events = [
    {
      id: "event1",
      titleKey: "virtualWorkshop",
      dateKey: "workshopDate",
      descriptionKey: "workshopDescription"
    },
    {
      id: "event2",
      titleKey: "memorySharingCircle",
      dateKey: "circleDate",
      descriptionKey: "circleDescription"
    }
  ];
  
  // Translations
  const eventTranslations = {
    virtualWorkshop: {
      'English': 'Virtual Wellness Workshop',
      'Español': 'Taller Virtual de Bienestar',
      'Português': 'Workshop Virtual de Bem-Estar'
    },
    workshopDate: {
      'English': 'June 20, 2025 • 2:00 PM',
      'Español': '20 de Junio, 2025 • 2:00 PM',
      'Português': '20 de Junho, 2025 • 14:00'
    },
    workshopDescription: {
      'English': 'Learn gentle exercises you can do at home to maintain mobility.',
      'Español': 'Aprenda ejercicios suaves que puede hacer en casa para mantener la movilidad.',
      'Português': 'Aprenda exercícios suaves que você pode fazer em casa para manter a mobilidade.'
    },
    memorySharingCircle: {
      'English': 'Memory Sharing Circle',
      'Español': 'Círculo de Compartir Memorias',
      'Português': 'Círculo de Compartilhamento de Memórias'
    },
    circleDate: {
      'English': 'June 25, 2025 • 3:30 PM',
      'Español': '25 de Junio, 2025 • 3:30 PM',
      'Português': '25 de Junho, 2025 • 15:30'
    },
    circleDescription: {
      'English': 'Join our virtual circle to share stories from your past with peers.',
      'Español': 'Únase a nuestro círculo virtual para compartir historias de su pasado con compañeros.',
      'Português': 'Junte-se ao nosso círculo virtual para compartilhar histórias do seu passado com colegas.'
    }
  };

  // Helper function to get translated event text
  const getEventText = (key: string, language: string) => {
    return eventTranslations[key as keyof typeof eventTranslations]?.[language as keyof (typeof eventTranslations)[keyof typeof eventTranslations]] || key;
  };

  const { preferredLanguage } = useTranslation();

  return (
    <div className="bg-amber-800/30 backdrop-blur-md border border-amber-200/30 rounded-xl p-6 mb-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-medium flex items-center">
          <Calendar className="mr-2 h-6 w-6 text-amber-300" />
          {getTranslatedText('upcomingEvents')}
        </h2>
        <Button 
          variant="outline" 
          className="border-amber-400 text-amber-100 hover:bg-amber-700/50"
          onClick={onViewAllClick}
        >
          {getTranslatedText('viewAllEvents')}
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {events.map(event => (
          <div 
            key={event.id}
            className="bg-amber-700/30 p-4 rounded-lg cursor-pointer hover:bg-amber-700/40 transition"
            onClick={() => onEventClick(getEventText(event.titleKey, 'English'))}
          >
            <p className="text-amber-200 text-sm">
              {getEventText(event.dateKey, preferredLanguage)}
            </p>
            <h4 className="font-medium mb-1">
              {getEventText(event.titleKey, preferredLanguage)}
            </h4>
            <p className="text-sm text-amber-100">
              {getEventText(event.descriptionKey, preferredLanguage)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalendarSection;
