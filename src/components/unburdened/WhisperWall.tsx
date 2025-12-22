import { AnimatePresence, motion } from "framer-motion";
import { useUnburden } from "@/hooks/useUnburden";
import EmotionPortal from "./EmotionPortal";
import MirrorReflection from "./MirrorReflection";
import Heartboard from "./Heartboard";
import { Button } from "@/components/ui/button";

export default function WhisperWall() {
  const {
    view,
    setView,
    posts,
    submitUnburden,
    reflection,
    reflectionLoading,
    lastPost,
    sortBy,
    setSortBy,
    toggleHeart,
    addReply,
    userHearts,
    loading,
  } = useUnburden();

  const fadeAnimation = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.3 },
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Navigation Tabs */}
      <nav className="flex gap-2 p-2 bg-white/5 backdrop-blur-sm rounded-xl border border-rose-500/20">
        <Button
          variant={view === "portal" ? "default" : "ghost"}
          size="sm"
          onClick={() => setView("portal")}
          className={view === "portal" ? "bg-gradient-to-r from-rose-500 to-pink-500 text-white font-semibold shadow-lg" : "text-gray-300 hover:text-white hover:bg-white/10"}
        >
          Let it Out
        </Button>
        <Button
          variant={view === "heartboard" ? "default" : "ghost"}
          size="sm"
          onClick={() => setView("heartboard")}
          className={view === "heartboard" ? "bg-gradient-to-r from-rose-500 to-pink-500 text-white font-semibold shadow-lg" : "text-gray-300 hover:text-white hover:bg-white/10"}
        >
          Heartboard
        </Button>
        {reflection && (
          <Button
            variant={view === "reflection" ? "default" : "ghost"}
            size="sm"
            onClick={() => setView("reflection")}
            className={view === "reflection" ? "bg-gradient-to-r from-rose-500 to-pink-500 text-white font-semibold shadow-lg" : "text-gray-300 hover:text-white hover:bg-white/10"}
          >
            Reflection
          </Button>
        )}
      </nav>

      {/* View Content */}
      <AnimatePresence mode="wait">
        {view === "portal" && (
          <motion.div key="portal" {...fadeAnimation}>
            <EmotionPortal onSubmit={submitUnburden} />
          </motion.div>
        )}

        {view === "reflection" && lastPost && (
          <motion.div key="reflection" {...fadeAnimation}>
            <MirrorReflection
              text={lastPost.content}
              mood={lastPost.mood || "sad"}
              reflection={reflection || ""}
              loading={reflectionLoading}
              onContinue={() => setView("heartboard")}
            />
          </motion.div>
        )}

        {view === "heartboard" && (
          <motion.div key="heartboard" {...fadeAnimation}>
            <Heartboard
              posts={posts}
              sortBy={sortBy}
              onSortChange={setSortBy}
              onHeart={toggleHeart}
              onReply={addReply}
              userHearts={userHearts}
              loading={loading}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
