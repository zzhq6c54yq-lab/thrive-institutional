import React, { useState, useEffect } from 'react';

interface DrumKitProps {
  onDrumHit: (drumType: string) => void;
}

const DrumKit: React.FC<DrumKitProps> = ({ onDrumHit }) => {
  const [activeDrums, setActiveDrums] = useState<Set<string>>(new Set());

  const hitDrum = (drumType: string) => {
    onDrumHit(drumType);
    setActiveDrums(prev => new Set(prev).add(drumType));
    
    // Remove active state after animation
    setTimeout(() => {
      setActiveDrums(prev => {
        const newSet = new Set(prev);
        newSet.delete(drumType);
        return newSet;
      });
    }, 150);
  };

  const drums = [
    { id: 'kick', name: 'Kick', position: 'bottom-4 left-1/2 transform -translate-x-1/2', size: 'w-24 h-24', color: 'from-gray-800 to-gray-900' },
    { id: 'snare', name: 'Snare', position: 'bottom-16 left-1/3 transform -translate-x-1/2', size: 'w-16 h-16', color: 'from-gray-600 to-gray-700' },
    { id: 'hihat', name: 'Hi-Hat', position: 'top-8 left-1/4', size: 'w-12 h-12', color: 'from-yellow-400 to-yellow-600' },
    { id: 'crash', name: 'Crash', position: 'top-4 right-1/4', size: 'w-16 h-16', color: 'from-yellow-400 to-yellow-600' },
    { id: 'tom1', name: 'Tom 1', position: 'top-12 left-1/2 transform -translate-x-1/2', size: 'w-14 h-14', color: 'from-red-600 to-red-700' },
    { id: 'tom2', name: 'Tom 2', position: 'top-20 right-1/3', size: 'w-14 h-14', color: 'from-red-600 to-red-700' },
  ];

  return (
    <div className="relative w-full max-w-6xl mx-auto h-96 glass-morphism holographic-border rounded-2xl overflow-hidden shadow-2xl">
      {/* Quantum Studio Environment */}
      <div className="absolute inset-0 bg-gradient-to-br from-studio-wall via-background to-studio-floor"></div>
      
      {/* Stage Lighting Effects */}
      <div className="absolute top-0 left-1/4 w-32 h-2 bg-gradient-to-r from-transparent via-accent/50 to-transparent blur-sm"></div>
      <div className="absolute top-0 right-1/4 w-32 h-2 bg-gradient-to-r from-transparent via-secondary/50 to-transparent blur-sm"></div>
      
      {/* Holographic Floor Grid */}
      <div className="absolute bottom-0 w-full h-20 bg-gradient-to-t from-studio-floor to-transparent">
        <div className="absolute inset-0 opacity-20">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="drumGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#drumGrid)" className="text-primary/30"/>
          </svg>
        </div>
      </div>
      
      {/* Enhanced Drum Kit Setup */}
      {drums.map((drum) => {
        const isActive = activeDrums.has(drum.id);
        
        return (
          <button
            key={drum.id}
            className={`absolute ${drum.position} ${drum.size} rounded-full cursor-pointer transition-all duration-200 transform-gpu group ${
              isActive ? 'scale-90 drum-hit neon-glow' : 'hover:scale-105 shadow-xl holographic-border'
            } bg-gradient-to-br ${drum.color} border-2 border-white/30`}
            onMouseDown={() => hitDrum(drum.id)}
            onTouchStart={(e) => {
              e.preventDefault();
              hitDrum(drum.id);
            }}
          >
            {/* Holographic drum surface with quantum effects */}
            <div className={`absolute inset-2 rounded-full bg-gradient-to-br from-white/30 via-transparent to-primary/20 transition-all duration-200 ${
              isActive ? 'opacity-100 animate-pulse' : 'opacity-60 group-hover:opacity-80'
            }`}></div>
            
            {/* Multi-layer impact effects */}
            {isActive && (
              <>
                <div className="absolute inset-0 rounded-full bg-white/40 animate-ping"></div>
                <div className="absolute inset-1 rounded-full bg-primary/60 animate-pulse"></div>
                <div className="absolute inset-2 rounded-full bg-secondary/40 animate-ping" style={{ animationDelay: '0.1s' }}></div>
              </>
            )}
            
            {/* Enhanced drum rim with holographic effect */}
            <div className="absolute inset-0 border-2 border-white/30 rounded-full group-hover:border-primary/50 transition-colors duration-200"></div>
            
            {/* Futuristic drum label with neon effect */}
            <span className={`absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-sm font-bold transition-all duration-200 ${
              isActive ? 'text-white text-glow' : 'text-foreground group-hover:text-primary'
            }`}>
              {drum.name}
            </span>
            
            {/* Hit energy indicator */}
            {isActive && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-6 h-2 bg-accent rounded-full animate-pulse"></div>
            )}
          </button>
        );
      })}
      
      {/* Quantum Drumsticks with Energy Effects */}
      <div className="absolute bottom-6 right-8 flex space-x-3">
        <div className="w-2 h-20 bg-gradient-to-t from-accent to-accent/50 rounded-full transform rotate-12 neon-glow"></div>
        <div className="w-2 h-20 bg-gradient-to-t from-accent to-accent/50 rounded-full transform -rotate-12 neon-glow"></div>
      </div>

      {/* Floating energy particles */}
      <div className="absolute top-4 left-4 w-2 h-2 bg-primary rounded-full animate-ping"></div>
      <div className="absolute top-8 right-12 w-1 h-1 bg-secondary rounded-full animate-pulse"></div>
      <div className="absolute bottom-12 left-8 w-1.5 h-1.5 bg-accent rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
    </div>
  );
};

export default DrumKit;