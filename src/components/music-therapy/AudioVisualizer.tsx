import React, { useEffect, useRef, useState } from 'react';

interface AudioVisualizerProps {
  isPlaying: boolean;
  activeNotes: Set<string>;
  className?: string;
}

const AudioVisualizer: React.FC<AudioVisualizerProps> = ({ 
  isPlaying, 
  activeNotes, 
  className = "" 
}) => {
  const [bars, setBars] = useState<number[]>(Array(32).fill(0));
  const animationRef = useRef<number>();

  useEffect(() => {
    const animate = () => {
      if (isPlaying || activeNotes.size > 0) {
        setBars(prev => prev.map(() => {
          const intensity = activeNotes.size > 0 ? 0.5 + Math.random() * 0.5 : Math.random() * 0.3;
          return Math.random() * intensity;
        }));
      } else {
        setBars(prev => prev.map(bar => bar * 0.95));
      }
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPlaying, activeNotes.size]);

  return (
    <div className={`flex items-end justify-center gap-1 h-16 ${className}`}>
      {bars.map((height, index) => (
        <div
          key={index}
          className="bg-gradient-to-t from-primary via-secondary to-accent rounded-t-sm transition-all duration-75"
          style={{
            height: `${Math.max(2, height * 100)}%`,
            width: '3px',
            opacity: height > 0.1 ? 0.8 : 0.3,
            boxShadow: height > 0.5 ? `0 0 10px hsl(var(--primary) / 0.5)` : 'none',
          }}
        />
      ))}
    </div>
  );
};

export default AudioVisualizer;