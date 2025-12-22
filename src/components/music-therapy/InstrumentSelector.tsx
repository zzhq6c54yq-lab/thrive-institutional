import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Piano, Music, Guitar, Music2 } from 'lucide-react';

interface InstrumentSelectorProps {
  selectedInstrument: string;
  onInstrumentChange: (instrument: string) => void;
}

const instruments = [
  { id: 'piano', name: 'Piano', icon: Piano, color: 'from-white to-gray-200' },
  { id: 'violin', name: 'Violin', icon: Music2, color: 'from-amber-100 to-amber-200' },
  { id: 'cello', name: 'Cello', icon: Music, color: 'from-orange-100 to-orange-200' },
  { id: 'ukulele', name: 'Ukulele', icon: Guitar, color: 'from-yellow-100 to-yellow-200' }
];

const InstrumentSelector: React.FC<InstrumentSelectorProps> = ({ 
  selectedInstrument, 
  onInstrumentChange 
}) => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 p-4">
      {instruments.map((instrument) => {
        const isSelected = selectedInstrument === instrument.id;
        const Icon = instrument.icon;
        
        return (
          <Card
            key={instrument.id}
            className={`cursor-pointer transition-all duration-300 hover:scale-105 ${
              isSelected 
                ? 'ring-2 ring-primary shadow-lg bg-primary/10' 
                : 'hover:shadow-md bg-white/10'
            }`}
            onClick={() => onInstrumentChange(instrument.id)}
          >
            <CardContent className="p-6 text-center">
              <div className={`w-16 h-16 mx-auto mb-3 rounded-full bg-gradient-to-br ${instrument.color} flex items-center justify-center`}>
                <Icon className={`w-8 h-8 ${isSelected ? 'text-primary' : 'text-gray-600'}`} />
              </div>
              <h3 className={`font-semibold ${isSelected ? 'text-primary' : 'text-foreground'}`}>
                {instrument.name}
              </h3>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default InstrumentSelector;