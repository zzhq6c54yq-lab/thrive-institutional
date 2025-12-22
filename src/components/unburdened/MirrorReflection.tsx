import { motion } from "framer-motion";
import { Sparkles, Heart, Wind } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Mood } from "@/hooks/useUnburden";

const MOOD_GRADIENTS: Record<Mood, string> = {
  calm: "from-blue-200 to-blue-400",
  sad: "from-indigo-200 to-indigo-400",
  angry: "from-rose-200 to-rose-400",
  anxious: "from-yellow-200 to-amber-400",
  hopeful: "from-green-200 to-green-400",
};

interface MirrorReflectionProps {
  text: string;
  mood: Mood;
  reflection: string;
  loading?: boolean;
  onContinue: () => void;
}

export default function MirrorReflection({
  text,
  mood,
  reflection,
  loading,
  onContinue,
}: MirrorReflectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      {/* User's Post */}
      <div className={`p-6 rounded-2xl bg-gradient-to-r ${MOOD_GRADIENTS[mood]} bg-opacity-10 backdrop-blur-sm border border-white/10`}>
        <h2 className="font-semibold text-lg mb-2">Your Words Are Safe</h2>
        <p className="text-foreground/90">{text}</p>
      </div>

      {/* MirrorAI Reflection */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="p-6 rounded-2xl bg-card border border-border"
      >
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
            <Sparkles className="w-5 h-5 text-primary" />
          </div>
          <div className="flex-1">
            <div className="text-sm text-muted-foreground font-medium mb-2">MirrorAI Reflection</div>
            {loading ? (
              <div className="space-y-2">
                <div className="h-4 bg-muted rounded animate-pulse" />
                <div className="h-4 bg-muted rounded animate-pulse w-5/6" />
                <div className="h-4 bg-muted rounded animate-pulse w-4/6" />
              </div>
            ) : (
              <p className="text-base text-foreground leading-relaxed">{reflection}</p>
            )}
          </div>
        </div>

        {!loading && (
          <div className="mt-4 flex flex-wrap gap-2">
            <Button
              variant="default"
              size="sm"
              onClick={onContinue}
              className="gap-2"
            >
              <Heart className="w-4 h-4" />
              See Community
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="gap-2"
              onClick={() => {
                // TODO: Implement breathing exercise modal
                alert("Breathing exercise: Inhale for 4, hold for 4, exhale for 6. Repeat 3 times.");
              }}
            >
              <Wind className="w-4 h-4" />
              Guided Breath
            </Button>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
