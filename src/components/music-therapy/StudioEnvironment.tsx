import React from 'react';

interface StudioEnvironmentProps {
  children: React.ReactNode;
}

const StudioEnvironment: React.FC<StudioEnvironmentProps> = ({ children }) => {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-background via-studio-wall to-studio-floor overflow-hidden">
      {/* Animated Background Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-primary/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animation: `float ${3 + Math.random() * 4}s ease-in-out infinite alternate`,
            }}
          />
        ))}
      </div>

      {/* Studio Floor Grid */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-studio-floor to-transparent">
        <div className="absolute inset-0 opacity-20">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" className="text-primary/30"/>
          </svg>
        </div>
      </div>

      {/* Equipment Racks */}
      <div className="absolute left-4 top-1/4 w-16 h-64 glass-morphism holographic-border rounded-lg">
        <div className="p-2 space-y-2">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="h-6 bg-equipment-rack rounded border border-primary/20">
              <div className="h-full bg-gradient-to-r from-primary/20 to-transparent rounded" />
            </div>
          ))}
        </div>
      </div>

      <div className="absolute right-4 top-1/4 w-16 h-64 glass-morphism holographic-border rounded-lg">
        <div className="p-2 space-y-2">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="h-6 bg-equipment-rack rounded border border-secondary/20">
              <div 
                className="h-full bg-gradient-to-r from-secondary/20 to-transparent rounded"
                style={{ 
                  animation: `pulse ${2 + Math.random() * 3}s ease-in-out infinite`,
                  animationDelay: `${Math.random() * 2}s`
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Studio Lighting */}
      <div className="absolute top-8 left-1/4 w-32 h-2 bg-gradient-to-r from-transparent via-accent/50 to-transparent rounded-full blur-sm" />
      <div className="absolute top-8 right-1/4 w-32 h-2 bg-gradient-to-r from-transparent via-accent/50 to-transparent rounded-full blur-sm" />

      {/* Main Content Area */}
      <div className="relative z-10 min-h-screen">
        {children}
      </div>

      {/* Ambient Glow Effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-secondary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-accent/5 rounded-full blur-3xl pointer-events-none" />
    </div>
  );
};

export default StudioEnvironment;