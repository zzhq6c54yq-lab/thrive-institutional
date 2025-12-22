import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatDistanceToNow } from "date-fns";
import type { Mood, WhisperWithHearts } from "@/hooks/useUnburden";
import ReplySection from "./ReplySection";

const MOOD_COLORS: Record<Mood, string> = {
  calm: "bg-gradient-to-br from-blue-300 to-blue-500",
  sad: "bg-gradient-to-br from-indigo-300 to-indigo-500",
  angry: "bg-gradient-to-br from-rose-300 to-rose-500",
  anxious: "bg-gradient-to-br from-amber-300 to-amber-500",
  hopeful: "bg-gradient-to-br from-emerald-300 to-emerald-500",
};

interface WhisperPostProps {
  post: WhisperWithHearts;
  isHearted: boolean;
  onHeart: () => void;
  onReply: (text: string) => void;
}

export default function WhisperPost({ post, isHearted, onHeart, onReply }: WhisperPostProps) {
  const [showReplies, setShowReplies] = useState(false);

  const avatarColor = post.mood ? MOOD_COLORS[post.mood] : "bg-gradient-to-br from-gray-300 to-gray-500";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="p-4 rounded-2xl bg-card border border-border"
    >
      <div className="flex gap-3">
        <div className={`w-12 h-12 rounded-full ${avatarColor} flex-shrink-0 shadow-md`} />
        
        <div className="flex-1 min-w-0">
          <p className="text-foreground/90 break-words">{post.content}</p>
          <div className="text-xs text-muted-foreground mt-1">
            {formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}
          </div>

          <div className="mt-3 flex items-center gap-2 flex-wrap">
            <Button
              variant="ghost"
              size="sm"
              onClick={onHeart}
              className={`gap-1 h-8 ${isHearted ? "text-pink-500" : ""}`}
            >
              <Heart className={`w-4 h-4 ${isHearted ? "fill-current" : ""}`} />
              <span>{post.hearts || 0}</span>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowReplies(!showReplies)}
              className="gap-1 h-8"
            >
              <MessageCircle className="w-4 h-4" />
              <span>{post.reply_count || 0}</span>
            </Button>
          </div>

          <AnimatePresence>
            {showReplies && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <ReplySection
                  replies={post.replies || []}
                  whisperId={post.id}
                  onReply={onReply}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
