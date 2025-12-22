import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { MessageCircle } from "lucide-react";

const SMSHistory = ({ userId }: { userId?: string }) => {
  const { data: responses } = useQuery({
    queryKey: ["sms-history", userId],
    queryFn: async () => {
      if (!userId) return [];

      const { data: subscription } = await supabase
        .from("sms_subscriptions")
        .select("id")
        .eq("user_id", userId)
        .single();

      if (!subscription) return [];

      const { data } = await supabase
        .from("sms_checkin_responses")
        .select("*")
        .eq("subscription_id", subscription.id)
        .order("sent_at", { ascending: false })
        .limit(10);

      return data || [];
    },
    enabled: !!userId,
  });

  if (!responses || responses.length === 0) {
    return null;
  }

  return (
    <Card className="p-6 glass-card">
      <div className="flex items-center gap-3 mb-6">
        <MessageCircle className="w-5 h-5 text-primary" />
        <h2 className="text-xl font-bold gradient-heading">Recent Check-ins</h2>
      </div>

      <div className="space-y-3">
        {responses.map((response) => (
          <div key={response.id} className="p-4 bg-muted/50 rounded-lg">
            <div className="flex justify-between items-start mb-2">
              <span className="text-sm font-medium">
                {new Date(response.sent_at).toLocaleDateString()}
              </span>
              {response.mood_extracted && (
                <span className="text-lg font-bold text-primary">
                  {response.mood_extracted}/10
                </span>
              )}
            </div>
            {response.user_response && (
              <p className="text-sm text-muted-foreground">
                Your response: {response.user_response}
              </p>
            )}
          </div>
        ))}
      </div>
    </Card>
  );
};

export default SMSHistory;
