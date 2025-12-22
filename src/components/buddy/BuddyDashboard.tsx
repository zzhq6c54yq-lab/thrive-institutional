import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import BuddyChat from "./BuddyChat";
import BuddyProgressCard from "./BuddyProgressCard";
import { useBuddyMatch } from "@/hooks/useBuddyMatch";

interface BuddyDashboardProps {
  match: any;
  userId?: string;
}

const BuddyDashboard = ({ match, userId }: BuddyDashboardProps) => {
  const { getBuddyProfile } = useBuddyMatch(userId);
  const buddy = getBuddyProfile() as any;

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <Card className="p-6 glass-card">
          <div className="flex items-center gap-4">
            <Avatar className="w-16 h-16">
              <AvatarImage src={buddy?.avatar_url} />
              <AvatarFallback>{buddy?.display_name?.[0] || "B"}</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl font-bold gradient-heading">
                Your Accountability Buddy: {buddy?.display_name || "Your Buddy"}
              </h1>
              <p className="text-muted-foreground">
                Supporting each other since {new Date(match.matched_at).toLocaleDateString()}
              </p>
            </div>
          </div>
        </Card>

        {/* Progress & Chat Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Progress Cards */}
          <div className="lg:col-span-1 space-y-4">
            <BuddyProgressCard matchId={match.id} userId={userId} buddyId={buddy?.id} />
          </div>

          {/* Chat */}
          <div className="lg:col-span-2">
            <BuddyChat matchId={match.id} userId={userId} buddyName={buddy?.display_name} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuddyDashboard;
