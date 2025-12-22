import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CelebrationConfettiProps {
  trigger: boolean;
  message?: string;
  onComplete?: () => void;
}

const CelebrationConfetti: React.FC<CelebrationConfettiProps> = ({ 
  trigger, 
  message = "Amazing! 🎉",
  onComplete 
}) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (trigger) {
      setShow(true);
      const timer = setTimeout(() => {
        setShow(false);
        onComplete?.();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [trigger, onComplete]);

  if (!show) return null;

  // Generate confetti particles
  const confetti = Array.from({ length: 50 }).map((_, i) => ({
    id: i,
    x: Math.random() * window.innerWidth,
    y: -20,
    rotation: Math.random() * 360,
    color: ['#D4AF37', '#E5C5A1', '#B8941F', '#FFD700', '#FFA500'][Math.floor(Math.random() * 5)],
    size: Math.random() * 10 + 5,
  }));

  return (
    <AnimatePresence>
      <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
        {/* Confetti particles */}
        {confetti.map((particle) => (
          <motion.div
            key={particle.id}
            initial={{
              x: particle.x,
              y: particle.y,
              rotate: particle.rotation,
              opacity: 1,
            }}
            animate={{
              y: window.innerHeight + 100,
              rotate: particle.rotation + 720,
              opacity: 0,
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              ease: "easeIn",
            }}
            style={{
              position: 'absolute',
              width: particle.size,
              height: particle.size,
              backgroundColor: particle.color,
              borderRadius: Math.random() > 0.5 ? '50%' : '0%',
            }}
          />
        ))}

        {/* Celebration message */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-auto"
        >
          <div className="bg-gradient-to-r from-[#D4AF37] via-[#FFD700] to-[#D4AF37] text-white text-2xl md:text-4xl font-bold px-12 py-6 rounded-2xl shadow-2xl">
            {message}
          </div>
        </motion.div>

        {/* Radial glow effect */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.3, scale: 2 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#D4AF37] rounded-full blur-3xl"
        />
      </div>
    </AnimatePresence>
  );
};

export default CelebrationConfetti;
