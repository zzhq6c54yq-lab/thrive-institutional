import React from 'react';

interface FullPianoProps {
  activeNotes: Set<string>;
  onNotePress: (note: string, isKeyDown: boolean) => void;
}

const FullPiano: React.FC<FullPianoProps> = ({ activeNotes, onNotePress }) => {
  // Generate 61 keys (5 octaves) starting from C2 to C7
  const generateKeys = () => {
    const keys = [];
    const noteNames = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    
    for (let octave = 2; octave <= 6; octave++) {
      for (let i = 0; i < noteNames.length; i++) {
        if (octave === 6 && i > 0) break; // Stop at C7
        keys.push({
          note: `${noteNames[i]}${octave}`,
          isBlack: noteNames[i].includes('#'),
          noteName: noteNames[i]
        });
      }
    }
    return keys;
  };

  const allKeys = generateKeys();
  const whiteKeys = allKeys.filter(key => !key.isBlack);
  const blackKeys = allKeys.filter(key => key.isBlack);

  return (
    <div className="relative w-full overflow-x-auto">
      <div className="min-w-[1400px] mx-auto">
        {/* Futuristic Piano with Holographic Effects */}
        <div className="glass-morphism holographic-border rounded-2xl p-8 shadow-2xl neon-glow">
          <div className="relative h-80">
            {/* White keys with quantum effects */}
            <div className="flex h-full gap-1">
              {whiteKeys.map((key, index) => {
                const isActive = activeNotes.has(key.note);
                
                return (
                  <button
                    key={key.note}
                    className={`flex-1 min-w-[24px] h-full rounded-b-2xl border-2 transition-all duration-200 transform-gpu group ${
                      isActive 
                        ? 'bg-gradient-to-b from-primary/70 to-primary/90 border-primary scale-95 key-press neon-glow' 
                        : 'bg-gradient-to-b from-white/90 to-white/70 border-white/30 hover:from-white/95 hover:to-white/80 hover:border-primary/30 shadow-lg'
                    }`}
                    onMouseDown={() => onNotePress(key.note, true)}
                    onMouseUp={() => onNotePress(key.note, false)}
                    onMouseLeave={() => onNotePress(key.note, false)}
                    onTouchStart={(e) => {
                      e.preventDefault();
                      onNotePress(key.note, true);
                    }}
                    onTouchEnd={(e) => {
                      e.preventDefault();
                      onNotePress(key.note, false);
                    }}
                  >
                    {/* Holographic highlight effect */}
                    <div className={`absolute inset-0 bg-gradient-to-t from-transparent to-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-b-2xl ${isActive ? 'opacity-100' : ''}`} />
                    
                    {/* Note label with futuristic styling */}
                    <span className={`block mt-auto mb-6 text-sm font-bold transition-all duration-200 ${
                      isActive ? 'text-white text-glow' : 'text-gray-800 group-hover:text-primary'
                    }`}>
                      {key.noteName}
                    </span>

                    {/* Active note pulse indicator */}
                    {isActive && (
                      <div className="absolute inset-x-2 bottom-2 h-2 bg-primary rounded-full animate-pulse shadow-lg" />
                    )}
                  </button>
                );
              })}
            </div>
            
            {/* Quantum black keys with energy effects */}
            <div className="absolute top-0 left-0 right-0 flex h-48">
              {whiteKeys.map((whiteKey, index) => {
                // Find if there's a black key after this white key
                const blackKey = blackKeys.find(bk => {
                  const whiteNote = whiteKey.note.replace(/\d/, '');
                  const blackNote = bk.note.replace(/\d/, '').replace('#', '');
                  const octave = whiteKey.note.match(/\d/)?.[0];
                  return blackNote === whiteNote && bk.note.includes(octave || '');
                });
                
                return (
                  <div key={whiteKey.note} className="flex-1 min-w-[24px] relative">
                    {blackKey && (
                      <button
                        className={`absolute right-0 transform translate-x-1/2 w-4 h-full rounded-b-xl border transition-all duration-200 group ${
                          activeNotes.has(blackKey.note)
                            ? 'bg-gradient-to-b from-primary/80 to-primary/95 border-primary shadow-2xl scale-95 key-press neon-glow' 
                            : 'bg-gradient-to-b from-card-foreground/90 to-card-foreground/95 border-white/20 hover:from-card-foreground/95 hover:to-card-foreground/100 hover:border-secondary/40 shadow-xl'
                        }`}
                        onMouseDown={() => onNotePress(blackKey.note, true)}
                        onMouseUp={() => onNotePress(blackKey.note, false)}
                        onMouseLeave={() => onNotePress(blackKey.note, false)}
                        onTouchStart={(e) => {
                          e.preventDefault();
                          onNotePress(blackKey.note, true);
                        }}
                        onTouchEnd={(e) => {
                          e.preventDefault();
                          onNotePress(blackKey.note, false);
                        }}
                      >
                        {/* Holographic edge highlight */}
                        <div className={`absolute inset-0 bg-gradient-to-t from-transparent to-secondary/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-b-xl ${activeNotes.has(blackKey.note) ? 'opacity-100' : ''}`} />
                        
                        {/* Enhanced note label */}
                        <span className={`block mt-auto mb-6 text-xs font-bold transition-all duration-200 ${
                          activeNotes.has(blackKey.note) ? 'text-white text-glow' : 'text-white/80 group-hover:text-secondary'
                        }`}>
                          {blackKey.noteName.replace('#', '♯')}
                        </span>

                        {/* Active indicator for black keys */}
                        {activeNotes.has(blackKey.note) && (
                          <div className="absolute inset-x-1 bottom-1 h-1 bg-secondary rounded-full animate-pulse" />
                        )}
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
          
          {/* Quantum Piano Brand with Holographic Effects */}
          <div className="text-center mt-6">
            <div className="text-primary font-bold text-2xl tracking-wider logo-glow">QUANTUM KEYS</div>
            <div className="text-muted-foreground text-sm tracking-wide">NEURAL INTERFACE PIANO</div>
          </div>
        </div>
        
        {/* Futuristic Piano Legs and Quantum Pedals */}
        <div className="flex justify-between items-end px-16 relative mt-4">
          <div className="w-8 h-16 bg-gradient-to-b from-card to-equipment-rack rounded-b-2xl holographic-border shadow-lg"></div>
          <div className="flex space-x-6 absolute bottom-0 left-1/2 transform -translate-x-1/2">
            <div className="w-12 h-6 bg-gradient-to-t from-accent to-accent/50 rounded-full neon-glow animate-pulse shadow-xl"></div>
            <div className="w-12 h-6 bg-gradient-to-t from-secondary to-secondary/50 rounded-full neon-glow animate-pulse shadow-xl" style={{ animationDelay: '0.5s' }}></div>
            <div className="w-12 h-6 bg-gradient-to-t from-primary to-primary/50 rounded-full neon-glow animate-pulse shadow-xl" style={{ animationDelay: '1s' }}></div>
          </div>
          <div className="w-8 h-16 bg-gradient-to-b from-card to-equipment-rack rounded-b-2xl holographic-border shadow-lg"></div>
        </div>
      </div>
    </div>
  );
};

export default FullPiano;