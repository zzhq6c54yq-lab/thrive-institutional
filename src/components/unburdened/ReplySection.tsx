import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface Reply {
  id: string;
  content: string;
  created_at: string;
  hearts: number;
}

interface ReplySectionProps {
  replies: Reply[];
  whisperId: string;
  onReply: (text: string) => void;
}

export default function ReplySection({ replies, onReply }: ReplySectionProps) {
  const [replyText, setReplyText] = useState("");
  const maxChars = 300;

  const handleSubmit = () => {
    if (!replyText.trim() || replyText.length > maxChars) return;
    onReply(replyText.trim());
    setReplyText("");
  };

  return (
    <div className="mt-3 ml-4 space-y-2">
      {/* Existing Replies */}
      {replies.map((reply) => (
        <div
          key={reply.id}
          className="p-3 rounded-lg bg-muted/50 text-sm"
        >
          <p className="text-foreground/90">{reply.content}</p>
          <div className="text-xs text-muted-foreground mt-1">
            {formatDistanceToNow(new Date(reply.created_at), { addSuffix: true })}
          </div>
        </div>
      ))}

      {/* Reply Input */}
      <div className="space-y-2">
        <div className="relative">
          <Textarea
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder="Write a supportive reply..."
            className="pr-20 min-h-[60px] resize-none bg-background/50"
            maxLength={maxChars}
          />
          <div className="absolute bottom-2 left-3 text-xs text-muted-foreground">
            {replyText.length}/{maxChars}
          </div>
        </div>
        <Button
          onClick={handleSubmit}
          disabled={!replyText.trim() || replyText.length > maxChars}
          size="sm"
          className="gap-2"
        >
          <Send className="w-3 h-3" />
          Send
        </Button>
      </div>
    </div>
  );
}
