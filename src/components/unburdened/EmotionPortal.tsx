import { useState } from "react";
import { motion } from "framer-motion";
import { Mic } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import type { Mood } from "@/hooks/useUnburden";

const MOOD_GRADIENTS: Record<Mood, string> = {
  calm: "from-blue-200 to-blue-400",
  sad: "from-indigo-200 to-indigo-400",
  angry: "from-rose-200 to-rose-400",
  anxious: "from-yellow-200 to-amber-400",
  hopeful: "from-green-200 to-green-400",
};

const MOOD_LABELS: Record<Mood, string> = {
  calm: "Calm",
  sad: "Sad",
  angry: "Angry",
  anxious: "Anxious",
  hopeful: "Hopeful",
};

interface EmotionPortalProps {
  onSubmit: (text: string, mood: Mood, shareAnonymously: boolean) => Promise<void>;
}

export default function EmotionPortal({ onSubmit }: EmotionPortalProps) {
  const [text, setText] = useState("");
  const [mood, setMood] = useState<Mood>("sad");
  const [shareAnonymously, setShareAnonymously] = useState(true);
  const [loading, setLoading] = useState(false);

  const charCount = text.length;
  const maxChars = 500;
  const minChars = 10;
  const isValid = charCount >= minChars && charCount <= maxChars;

  const handleSubmit = async () => {
    if (!isValid) return;
    setLoading(true);
    try {
      await onSubmit(text.trim(), mood, shareAnonymously);
      setText("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`p-6 rounded-2xl bg-gradient-to-r ${MOOD_GRADIENTS[mood]} bg-opacity-10 backdrop-blur-sm border border-white/10`}
    >
      <h2 className="text-lg font-semibold mb-2">What do you need to get off your chest today?</h2>

      <div className="relative">
        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Speak or write freely — your words will be kept anonymous..."
          className="min-h-[120px] bg-white/5 border-white/10 placeholder:text-muted-foreground resize-none"
          maxLength={maxChars}
        />
        <div className="absolute bottom-3 left-3 text-xs text-muted-foreground">
          {charCount}/{maxChars}
          {charCount < minChars && ` (${minChars - charCount} more needed)`}
        </div>
        <Button
          onClick={handleSubmit}
          disabled={!isValid || loading}
          className="absolute right-3 bottom-3 gap-2"
          size="sm"
        >
          <Mic className="w-4 h-4" />
          {loading ? "Posting..." : "Unburden"}
        </Button>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="flex gap-2 flex-wrap">
          {(Object.keys(MOOD_LABELS) as Mood[]).map((m) => (
            <button
              key={m}
              onClick={() => setMood(m)}
              className={`px-3 py-1 rounded-full text-sm transition ${
                mood === m
                  ? "ring-2 ring-primary bg-primary/20"
                  : "bg-white/5 hover:bg-white/10"
              }`}
            >
              {MOOD_LABELS[m]}
            </button>
          ))}
        </div>
        
        <label className="flex items-center gap-2 text-sm cursor-pointer">
          <input
            type="checkbox"
            checked={shareAnonymously}
            onChange={(e) => setShareAnonymously(e.target.checked)}
            className="w-4 h-4 rounded"
          />
          <span>Share anonymously</span>
        </label>
      </div>

      <p className="mt-4 text-xs text-muted-foreground">
        Tip: Speak for 30–60 seconds or write freely. Posts are anonymized — no personal data is shown.
      </p>
    </motion.div>
  );
}
