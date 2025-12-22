import React, { useEffect, useState } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  color: string;
  life: number;
}

interface ParticleSystemProps {
  trigger: boolean;
  x: number;
  y: number;
  color?: string;
}

const ParticleSystem: React.FC<ParticleSystemProps> = ({ 
  trigger, 
  x, 
  y, 
  color = 'primary' 
}) => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    if (trigger) {
      const newParticles: Particle[] = [];
      for (let i = 0; i < 8; i++) {
        newParticles.push({
          id: Date.now() + i,
          x: x + (Math.random() - 0.5) * 50,
          y: y + (Math.random() - 0.5) * 50,
          color,
          life: 1
        });
      }
      setParticles(prev => [...prev, ...newParticles]);
    }
  }, [trigger, x, y, color]);

  useEffect(() => {
    const interval = setInterval(() => {
      setParticles(prev => 
        prev
          .map(particle => ({ ...particle, life: particle.life - 0.02 }))
          .filter(particle => particle.life > 0)
      );
    }, 16);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none">
      {particles.map(particle => (
        <div
          key={particle.id}
          className={`absolute w-2 h-2 bg-${particle.color} rounded-full particle-trail`}
          style={{
            left: particle.x,
            top: particle.y,
            opacity: particle.life,
            transform: `scale(${particle.life})`,
            filter: `hue-rotate(${(1 - particle.life) * 180}deg)`,
          }}
        />
      ))}
    </div>
  );
};

export default ParticleSystem;