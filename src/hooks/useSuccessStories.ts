import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const useSuccessStories = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: stories, isLoading } = useQuery({
    queryKey: ["success-stories"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("success_stories")
        .select("*")
        .eq("is_approved", true)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  const { data: featuredStory } = useQuery({
    queryKey: ["featured-story"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("success_stories")
        .select("*")
        .eq("is_approved", true)
        .eq("featured", true)
        .limit(1)
        .single();

      if (error && error.code !== "PGRST116") throw error;
      return data;
    },
  });

  const submitStory = useMutation({
    mutationFn: async (story: {
      title: string;
      story: string;
      challenge_type: string[];
      is_anonymous: boolean;
      user_id?: string;
    }) => {
      const { error } = await supabase
        .from("success_stories")
        .insert({
          ...story,
          is_approved: false,
          featured: false,
        });

      if (error) throw error;
    },
    onSuccess: () => {
      toast({
        title: "Story Submitted!",
        description: "Thank you for sharing. Your story will be reviewed soon.",
      });
      queryClient.invalidateQueries({ queryKey: ["success-stories"] });
    },
  });

  return {
    stories,
    featuredStory,
    isLoading,
    submitStory,
  };
};
