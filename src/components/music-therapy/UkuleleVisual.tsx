import React from 'react';

interface UkuleleVisualProps {
  activeNotes: Set<string>;
  activeChords: Set<string>;
  onNotePress: (note: string, isKeyDown: boolean) => void;
  octave: number;
  ukuleleStrum: boolean;
}

const UkuleleVisual: React.FC<UkuleleVisualProps> = ({ 
  activeNotes, 
  activeChords, 
  onNotePress, 
  octave,
  ukuleleStrum 
}) => {
  const strings = [
    { name: 'A', note: `A${octave}`, color: 'border-red-400' },
    { name: 'E', note: `E${octave}`, color: 'border-yellow-400' },
    { name: 'C', note: `C${octave}`, color: 'border-blue-400' },
    { name: 'G', note: `G${octave}`, color: 'border-green-400' }
  ];

  const frets = Array.from({ length: 5 }, (_, i) => i);

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      {/* Ukulele body */}
      <div className="relative bg-gradient-to-br from-yellow-200 via-yellow-300 to-amber-300 rounded-full p-8 shadow-2xl" style={{ aspectRatio: '4/3' }}>
        {/* Sound hole */}
        <div className="absolute left-1/2 top-1/2 w-16 h-16 bg-gray-800 rounded-full transform -translate-x-1/2 -translate-y-1/2 shadow-inner">
          <div className="absolute inset-2 border-2 border-yellow-600 rounded-full"></div>
        </div>
        
        {/* Bridge */}
        <div className="absolute left-1/2 bottom-8 w-12 h-2 bg-amber-700 rounded transform -translate-x-1/2"></div>
        
        {/* Fretboard */}
        <div className="absolute right-0 top-1/2 w-64 h-24 bg-gradient-to-r from-amber-600 to-amber-700 rounded-r-lg transform translate-x-48 -translate-y-1/2">
          {/* Frets */}
          <div className="flex h-full">
            {frets.map((fret) => (
              <div key={fret} className="flex-1 border-r border-amber-800 relative">
                {fret > 0 && (
                  <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gray-300"></div>
                )}
                {/* Fret markers */}
                {(fret === 3 || fret === 5) && (
                  <div className="absolute left-1/2 top-1/2 w-2 h-2 bg-white rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
                )}
              </div>
            ))}
          </div>
          
          {/* Strings on fretboard */}
          <div className="absolute inset-0 flex flex-col justify-between py-2">
            {strings.map((string, stringIndex) => {
              const isActive = activeNotes.has(string.note);
              
              return (
                <div key={string.name} className="flex w-full">
                  {frets.map((fret) => {
                    const fretNote = `${string.name}${octave + Math.floor(fret / 2)}`;
                    const isFretActive = activeNotes.has(fretNote);
                    
                    return (
                      <button
                        key={`${string.name}-${fret}`}
                        className={`flex-1 h-2 border-t border-b ${string.color} transition-all duration-200 ${
                          isFretActive 
                            ? 'bg-primary/60 animate-pulse transform scale-110' 
                            : 'bg-white/20 hover:bg-white/40'
                        }`}
                        onMouseDown={() => onNotePress(fretNote, true)}
                        onMouseUp={() => onNotePress(fretNote, false)}
                        onMouseLeave={() => onNotePress(fretNote, false)}
                        onTouchStart={() => onNotePress(fretNote, true)}
                        onTouchEnd={() => onNotePress(fretNote, false)}
                      >
                        <span className="sr-only">{string.name} string, fret {fret}</span>
                      </button>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
        
        {/* Open strings area */}
        <div className="absolute right-8 top-1/2 flex flex-col justify-between h-24 transform -translate-y-1/2">
          {strings.map((string) => {
            const isActive = activeNotes.has(string.note);
            
            return (
              <button
                key={string.name}
                className={`w-32 h-2 border-2 rounded-full transition-all duration-200 ${
                  string.color
                } ${
                  isActive 
                    ? 'bg-primary/40 animate-pulse transform scale-110' 
                    : 'bg-white/20 hover:bg-white/40'
                }`}
                onMouseDown={() => onNotePress(string.note, true)}
                onMouseUp={() => onNotePress(string.note, false)}
                onMouseLeave={() => onNotePress(string.note, false)}
                onTouchStart={() => onNotePress(string.note, true)}
                onTouchEnd={() => onNotePress(string.note, false)}
              >
                <span className="sr-only">{string.name} open string</span>
              </button>
            );
          })}
        </div>
        
        {/* String labels */}
        <div className="absolute right-0 top-1/2 transform translate-x-6 -translate-y-1/2 flex flex-col justify-between h-24">
          {strings.map((string) => (
            <span key={string.name} className="text-sm font-bold text-foreground">
              {string.name}
            </span>
          ))}
        </div>
      </div>
      
      {/* Head */}
      <div className="mt-4 w-16 h-12 bg-gradient-to-b from-amber-600 to-amber-700 mx-auto rounded-t-lg">
        {/* Tuning pegs */}
        <div className="grid grid-cols-2 gap-1 p-2">
          {[1, 2, 3, 4].map((peg) => (
            <div key={peg} className="w-2 h-2 bg-gray-800 rounded-full"></div>
          ))}
        </div>
      </div>
      
      {/* Strum indicator */}
      {ukuleleStrum && activeChords.size > 0 && (
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
          <div className="w-8 h-32 bg-primary/20 rounded-lg animate-pulse"></div>
        </div>
      )}
    </div>
  );
};

export default UkuleleVisual;