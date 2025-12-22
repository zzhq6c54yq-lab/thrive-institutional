import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Flame } from "lucide-react";
import confetti from "canvas-confetti";

interface StreakCelebrationProps {
  streakDays: number;
  onComplete?: () => void;
}

const milestones = [7, 14, 30, 60, 90];

export function StreakCelebration({ streakDays, onComplete }: StreakCelebrationProps) {
  const isMilestone = milestones.includes(streakDays);

  useEffect(() => {
    if (isMilestone) {
      // Trigger confetti celebration
      const duration = 4000;
      const end = Date.now() + duration;
      const colors = ["#FF6B35", "#F7931E", "#FDC500"];

      (function frame() {
        confetti({
          particleCount: 5,
          angle: 60,
          spread: 70,
          origin: { x: 0, y: 0.6 },
          colors: colors,
          shapes: ["circle", "square"],
          scalar: 1.2,
        });
        confetti({
          particleCount: 5,
          angle: 120,
          spread: 70,
          origin: { x: 1, y: 0.6 },
          colors: colors,
          shapes: ["circle", "square"],
          scalar: 1.2,
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      })();

      // Auto-complete after animation
      const timer = setTimeout(() => {
        onComplete?.();
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [isMilestone, onComplete]);

  if (!isMilestone) return null;

  const messages: Record<number, string> = {
    7: "You're on fire! One week strong! 🔥",
    14: "Two weeks of consistency! Amazing! ⚡",
    30: "30 days! You're building real habits! 🌟",
    60: "60 days! This is incredible dedication! 👑",
    90: "90 DAYS! You're a wellness champion! 🏆",
  };

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      transition={{ type: "spring", duration: 0.6 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={onComplete}
    >
      <motion.div
        initial={{ y: 50 }}
        animate={{ y: 0 }}
        className="bg-gradient-to-br from-orange-500 via-red-500 to-pink-500 p-8 rounded-2xl shadow-2xl max-w-md mx-4 text-center"
      >
        {/* Animated Flame Icon */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 10, -10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="inline-block mb-4"
        >
          <Flame className="w-20 h-20 text-white" />
        </motion.div>

        {/* Streak Counter */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
          className="text-8xl font-bold text-white mb-4"
        >
          {streakDays}
        </motion.div>

        <h2 className="text-3xl font-bold text-white mb-3">Day Streak!</h2>

        <p className="text-xl text-white/90 mb-6">{messages[streakDays]}</p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-sm text-white/80"
        >
          Tap anywhere to continue
        </motion.div>
      </motion.div>
    </motion.div>
  );
}