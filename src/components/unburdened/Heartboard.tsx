import { AnimatePresence } from "framer-motion";
import type { SortBy, WhisperWithHearts } from "@/hooks/useUnburden";
import WhisperPost from "./WhisperPost";
import EmptyState from "./EmptyState";
import { Button } from "@/components/ui/button";

interface HeartboardProps {
  posts: WhisperWithHearts[];
  sortBy: SortBy;
  onSortChange: (sort: SortBy) => void;
  onHeart: (whisperId: string) => void;
  onReply: (whisperId: string, text: string) => void;
  userHearts: Set<string>;
  loading: boolean;
}

const SORT_LABELS: Record<SortBy, string> = {
  newest: "Newest",
  hearts: "Most Hearts",
  replies: "Most Replies",
};

export default function Heartboard({
  posts,
  sortBy,
  onSortChange,
  onHeart,
  onReply,
  userHearts,
  loading,
}: HeartboardProps) {
  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="p-4 rounded-2xl bg-card border border-border animate-pulse">
            <div className="flex gap-3">
              <div className="w-12 h-12 rounded-full bg-muted" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-muted rounded w-3/4" />
                <div className="h-4 bg-muted rounded w-1/2" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Sort Tabs */}
      <div className="flex gap-2 border-b border-border pb-2">
        {(Object.keys(SORT_LABELS) as SortBy[]).map((sort) => (
          <Button
            key={sort}
            variant={sortBy === sort ? "default" : "ghost"}
            size="sm"
            onClick={() => onSortChange(sort)}
          >
            {SORT_LABELS[sort]}
          </Button>
        ))}
      </div>

      {/* Posts */}
      {posts.length === 0 ? (
        <EmptyState />
      ) : (
        <AnimatePresence mode="popLayout">
          {posts.map((post) => (
            <WhisperPost
              key={post.id}
              post={post}
              isHearted={userHearts.has(post.id)}
              onHeart={() => onHeart(post.id)}
              onReply={(text) => onReply(post.id, text)}
            />
          ))}
        </AnimatePresence>
      )}

      {/* Footer Stats */}
      {posts.length > 0 && (
        <div className="mt-8 pt-4 border-t border-border text-sm text-muted-foreground flex justify-between">
          <span>Community: {posts.length} shares</span>
          <span>Total Hearts: {posts.reduce((s, p) => s + p.hearts, 0)}</span>
        </div>
      )}
    </div>
  );
}
