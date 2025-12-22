import React, { useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import confetti from "canvas-confetti";

interface BadgeEarnedModalProps {
  open: boolean;
  onClose: () => void;
  badge: {
    name: string;
    description: string | null;
    icon_name: string | null;
    category: string;
    points_value: number;
  };
}

export function BadgeEarnedModal({ open, onClose, badge }: BadgeEarnedModalProps) {
  const IconComponent = badge.icon_name && (Icons as any)[badge.icon_name]
    ? (Icons as any)[badge.icon_name]
    : Icons.Award;

  useEffect(() => {
    if (open) {
      // Trigger confetti
      const duration = 3000;
      const end = Date.now() + duration;

      const colors = ["#D4A574", "#B87333", "#E8D4C0", "#D4AF37"];

      (function frame() {
        confetti({
          particleCount: 3,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: colors,
        });
        confetti({
          particleCount: 3,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: colors,
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      })();
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", duration: 0.6 }}
          className="text-center py-8"
        >
          {/* Animated Badge Icon */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", duration: 0.8, delay: 0.2 }}
            className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-[#D4A574] to-[#B87333] flex items-center justify-center shadow-2xl"
          >
            <IconComponent className="w-12 h-12 text-white" />
          </motion.div>

          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-3xl font-bold mb-2 bg-gradient-to-r from-[#E8D4C0] via-[#D4A574] to-[#B87333] bg-clip-text text-transparent"
          >
            Badge Earned!
          </motion.h2>

          {/* Badge Name */}
          <motion.h3
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-2xl font-semibold mb-3"
          >
            {badge.name}
          </motion.h3>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-muted-foreground mb-4"
          >
            {badge.description}
          </motion.p>

          {/* Points */}
          {badge.points_value > 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7 }}
              className="inline-block bg-gradient-to-r from-[#D4AF37] to-[#B8941F] text-white px-6 py-2 rounded-full mb-6 font-bold"
            >
              +{badge.points_value} Points
            </motion.div>
          )}

          {/* Close Button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <Button onClick={onClose} size="lg" className="mt-4">
              Awesome!
            </Button>
          </motion.div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}