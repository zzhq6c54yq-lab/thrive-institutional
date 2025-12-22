import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const useSMSSubscription = (userId: string | undefined) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: subscription, isLoading } = useQuery({
    queryKey: ["sms-subscription", userId],
    queryFn: async () => {
      if (!userId) return null;
      
      const { data, error } = await supabase
        .from("sms_subscriptions")
        .select("*")
        .eq("user_id", userId)
        .single();

      if (error && error.code !== "PGRST116") throw error;
      return data;
    },
    enabled: !!userId,
  });

  const createSubscription = useMutation({
    mutationFn: async (data: {
      phone_number: string;
      frequency: string;
      preferred_time: string;
      timezone: string;
    }) => {
      if (!userId) throw new Error("User not authenticated");

      const { error } = await supabase
        .from("sms_subscriptions")
        .insert({
          user_id: userId,
          ...data,
          is_active: true,
        });

      if (error) throw error;
    },
    onSuccess: () => {
      toast({
        title: "SMS Check-ins Activated!",
        description: "You'll receive your first wellness check-in soon.",
      });
      queryClient.invalidateQueries({ queryKey: ["sms-subscription"] });
    },
  });

  const updateSubscription = useMutation({
    mutationFn: async (updates: any) => {
      if (!userId || !subscription) throw new Error("No subscription found");

      const { error } = await supabase
        .from("sms_subscriptions")
        .update(updates)
        .eq("id", subscription.id);

      if (error) throw error;
    },
    onSuccess: () => {
      toast({
        title: "Settings Updated",
        description: "Your SMS check-in preferences have been saved.",
      });
      queryClient.invalidateQueries({ queryKey: ["sms-subscription"] });
    },
  });

  return {
    subscription,
    isLoading,
    createSubscription,
    updateSubscription,
  };
};
