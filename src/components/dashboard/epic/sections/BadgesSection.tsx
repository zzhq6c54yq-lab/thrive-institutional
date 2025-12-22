import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trophy, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useUserBadges } from "@/hooks/useUserBadges";
import { useUser } from "@/contexts/UserContext";
import { BadgeCard } from "@/components/gamification/BadgeCard";
import { Skeleton } from "@/components/ui/skeleton";

export function BadgesSection() {
  const { user } = useUser();
  const { data: badgesData, isLoading } = useUserBadges(user?.id);
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-40" />
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-48" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!badgesData || badgesData.earnedCount === 0) return null;

  const { earnedBadges, totalPoints, earnedCount, totalCount } = badgesData;

  // Show 3 most recent badges
  const recentBadges = [...earnedBadges]
    .sort((a, b) => new Date(b.earned_at).getTime() - new Date(a.earned_at).getTime())
    .slice(0, 3);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <Card className="bg-gradient-to-br from-[#D4A574]/5 to-[#B87333]/5 border-[#D4A574]/30">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Trophy className="w-6 h-6 text-[#D4AF37]" />
              Your Achievements
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/app/badges")}
              className="gap-1"
            >
              View All
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="text-center p-3 bg-background/50 rounded-lg">
              <div className="text-2xl font-bold bg-gradient-to-r from-[#E8D4C0] via-[#D4A574] to-[#B87333] bg-clip-text text-transparent">
                {totalPoints}
              </div>
              <div className="text-xs text-muted-foreground">Points</div>
            </div>
            <div className="text-center p-3 bg-background/50 rounded-lg">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                {earnedCount}
              </div>
              <div className="text-xs text-muted-foreground">Earned</div>
            </div>
            <div className="text-center p-3 bg-background/50 rounded-lg">
              <div className="text-2xl font-bold text-muted-foreground">
                {Math.round((earnedCount / totalCount) * 100)}%
              </div>
              <div className="text-xs text-muted-foreground">Complete</div>
            </div>
          </div>

          {/* Recent Badges */}
          <div>
            <h4 className="text-sm font-medium mb-3">Recent Achievements</h4>
            <div className="grid grid-cols-3 gap-3">
              {recentBadges.map((earnedBadge: any, index) => (
                <BadgeCard
                  key={earnedBadge.id}
                  badge={earnedBadge.badge}
                  earned={true}
                  earnedAt={earnedBadge.earned_at}
                  index={index}
                />
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}