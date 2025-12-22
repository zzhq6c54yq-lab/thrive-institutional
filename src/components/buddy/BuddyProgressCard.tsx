import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { TrendingUp, Target, Calendar } from "lucide-react";

interface BuddyProgressCardProps {
  matchId: string;
  userId?: string;
  buddyId?: string;
}

const BuddyProgressCard = ({ userId, buddyId }: BuddyProgressCardProps) => {
  const { data: myProgress } = useQuery({
    queryKey: ["buddy-progress", userId],
    queryFn: async () => {
      if (!userId) return null;
      const { data } = await supabase
        .from("daily_check_ins")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false })
        .limit(7);
      return data;
    },
    enabled: !!userId,
  });

  const { data: buddyProgress } = useQuery({
    queryKey: ["buddy-progress", buddyId],
    queryFn: async () => {
      if (!buddyId) return null;
      const { data } = await supabase
        .from("daily_check_ins")
        .select("*")
        .eq("user_id", buddyId)
        .order("created_at", { ascending: false })
        .limit(7);
      return data;
    },
    enabled: !!buddyId,
  });

  const myStreak = myProgress?.length || 0;
  const buddyStreak = buddyProgress?.length || 0;

  return (
    <div className="space-y-4">
      <Card className="p-6 glass-card">
        <div className="flex items-center gap-3 mb-4">
          <Calendar className="w-5 h-5 text-primary" />
          <h3 className="font-semibold">Your Progress</h3>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Check-in Streak</span>
            <span className="font-semibold">{myStreak} days</span>
          </div>
          <div className="w-full bg-muted h-2 rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all"
              style={{ width: `${Math.min((myStreak / 7) * 100, 100)}%` }}
            />
          </div>
        </div>
      </Card>

      <Card className="p-6 glass-card">
        <div className="flex items-center gap-3 mb-4">
          <TrendingUp className="w-5 h-5 text-secondary" />
          <h3 className="font-semibold">Buddy's Progress</h3>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Check-in Streak</span>
            <span className="font-semibold">{buddyStreak} days</span>
          </div>
          <div className="w-full bg-muted h-2 rounded-full overflow-hidden">
            <div
              className="h-full bg-secondary transition-all"
              style={{ width: `${Math.min((buddyStreak / 7) * 100, 100)}%` }}
            />
          </div>
        </div>
      </Card>

      <Card className="p-6 glass-card bg-gradient-to-br from-primary/10 to-secondary/10">
        <div className="flex items-center gap-3 mb-2">
          <Target className="w-5 h-5 text-primary" />
          <h3 className="font-semibold">Joint Challenge</h3>
        </div>
        <p className="text-sm text-muted-foreground mb-3">
          Both check in for 7 days straight
        </p>
        <div className="w-full bg-muted h-2 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-primary to-secondary transition-all"
            style={{ width: `${Math.min((Math.min(myStreak, buddyStreak) / 7) * 100, 100)}%` }}
          />
        </div>
        <p className="text-xs text-muted-foreground mt-2 text-center">
          {Math.min(myStreak, buddyStreak)} / 7 days
        </p>
      </Card>
    </div>
  );
};

export default BuddyProgressCard;
