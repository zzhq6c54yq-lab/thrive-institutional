import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export type Mood = "calm" | "sad" | "angry" | "anxious" | "hopeful";
export type SortBy = "newest" | "hearts" | "replies";
export type View = "portal" | "reflection" | "heartboard";

export interface WhisperWithHearts {
  id: string;
  content: string;
  mood: Mood | null;
  created_at: string;
  hearts: number;
  reply_count: number;
  user_id: string | null;
  replies: Array<{
    id: string;
    content: string;
    created_at: string;
    hearts: number;
  }>;
}

export function useUnburden() {
  const [view, setView] = useState<View>("portal");
  const [posts, setPosts] = useState<WhisperWithHearts[]>([]);
  const [loading, setLoading] = useState(false);
  const [sortBy, setSortBy] = useState<SortBy>("newest");
  const [userHearts, setUserHearts] = useState<Set<string>>(new Set());
  const [reflection, setReflection] = useState<string | null>(null);
  const [reflectionLoading, setReflectionLoading] = useState(false);
  const [lastPost, setLastPost] = useState<WhisperWithHearts | null>(null);
  const { toast } = useToast();

  // Fetch posts with hearts and replies
  const fetchPosts = useCallback(async () => {
    try {
      const { data: whispers, error } = await supabase
        .from("whispers")
        .select(`
          id,
          content,
          mood,
          created_at,
          hearts,
          reply_count,
          user_id,
          replies(id, content, created_at, hearts)
        `)
        .order("created_at", { ascending: false });

      if (error) throw error;

      setPosts((whispers as any[]) || []);

      // Fetch user's hearts
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: hearts } = await supabase
          .from("whisper_hearts")
          .select("whisper_id")
          .eq("user_id", user.id);

        if (hearts) {
          setUserHearts(new Set(hearts.map(h => h.whisper_id)));
        }
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
      toast({
        title: "Error loading posts",
        description: "Please try refreshing the page",
        variant: "destructive",
      });
    }
  }, [toast]);

  // Initial fetch
  useEffect(() => {
    setLoading(true);
    fetchPosts().finally(() => setLoading(false));
  }, [fetchPosts]);

  // Real-time subscriptions
  useEffect(() => {
    const channel = supabase
      .channel("unburdened-realtime")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "whispers" },
        () => fetchPosts()
      )
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "replies" },
        () => fetchPosts()
      )
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "whisper_hearts" },
        () => fetchPosts()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchPosts]);

  // Sort posts
  const sortedPosts = [...posts].sort((a, b) => {
    if (sortBy === "newest") {
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    } else if (sortBy === "hearts") {
      return b.hearts - a.hearts;
    } else {
      return b.reply_count - a.reply_count;
    }
  });

  // Submit new unburden post
  const submitUnburden = async (text: string, mood: Mood, shareAnonymously: boolean) => {
    try {
      setLoading(true);

      const { data: { user } } = await supabase.auth.getUser();
      
      // Create post
      const { data: whisper, error } = await supabase
        .from("whispers")
        .insert([{ 
          content: text, 
          mood,
          user_id: shareAnonymously ? null : user?.id || null
        }])
        .select()
        .single();

      if (error) throw error;

      setLastPost({
        ...whisper,
        replies: []
      } as WhisperWithHearts);

      // Generate AI reflection
      setReflectionLoading(true);
      const { data: reflectionData, error: reflectionError } = await supabase.functions.invoke(
        "unburden-reflect",
        { body: { text, mood } }
      );

      if (reflectionError) {
        console.error("Reflection error:", reflectionError);
        setReflection("Thank you for sharing. Your courage in expressing yourself is a powerful step forward.");
      } else {
        setReflection(reflectionData.reflection);
      }

      setReflectionLoading(false);
      setView("reflection");
      
      toast({
        title: "Post shared",
        description: shareAnonymously ? "Your post is completely anonymous" : "Your post has been shared",
      });

      await fetchPosts();
    } catch (error) {
      console.error("Error submitting unburden:", error);
      toast({
        title: "Error posting",
        description: "Please try again",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Toggle heart on a whisper
  const toggleHeart = async (whisperId: string) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in to react to posts",
        variant: "destructive",
      });
      return;
    }

    const hasHearted = userHearts.has(whisperId);

    // Optimistic update
    setPosts(prev =>
      prev.map(p =>
        p.id === whisperId
          ? { ...p, hearts: p.hearts + (hasHearted ? -1 : 1) }
          : p
      )
    );

    setUserHearts(prev => {
      const next = new Set(prev);
      if (hasHearted) {
        next.delete(whisperId);
      } else {
        next.add(whisperId);
      }
      return next;
    });

    try {
      if (hasHearted) {
        const { error } = await supabase
          .from("whisper_hearts")
          .delete()
          .eq("whisper_id", whisperId)
          .eq("user_id", user.id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("whisper_hearts")
          .insert([{ whisper_id: whisperId, user_id: user.id }]);

        if (error) throw error;
      }
    } catch (error) {
      console.error("Error toggling heart:", error);
      // Revert optimistic update
      setPosts(prev =>
        prev.map(p =>
          p.id === whisperId
            ? { ...p, hearts: p.hearts + (hasHearted ? 1 : -1) }
            : p
        )
      );
      setUserHearts(prev => {
        const next = new Set(prev);
        if (hasHearted) {
          next.add(whisperId);
        } else {
          next.delete(whisperId);
        }
        return next;
      });
      
      toast({
        title: "Error",
        description: "Failed to update heart",
        variant: "destructive",
      });
    }
  };

  // Add reply to a whisper
  const addReply = async (whisperId: string, text: string) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in to reply",
        variant: "destructive",
      });
      return;
    }

    try {
      const { error } = await supabase
        .from("replies")
        .insert([{ whisper_id: whisperId, content: text }]);

      if (error) throw error;

      toast({
        title: "Reply posted",
        description: "Your supportive message has been shared",
      });

      await fetchPosts();
    } catch (error) {
      console.error("Error adding reply:", error);
      toast({
        title: "Error posting reply",
        description: "Please try again",
        variant: "destructive",
      });
    }
  };

  return {
    view,
    setView,
    posts: sortedPosts,
    loading,
    sortBy,
    setSortBy,
    userHearts,
    reflection,
    reflectionLoading,
    lastPost,
    submitUnburden,
    toggleHeart,
    addReply,
  };
}
