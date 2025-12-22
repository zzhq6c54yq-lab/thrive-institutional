import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useBuddyMatch } from "@/hooks/useBuddyMatch";

const BuddySection = ({ userId }: { userId?: string }) => {
  const navigate = useNavigate();
  const { currentMatch } = useBuddyMatch(userId);

  if (!currentMatch) return null;

  return (
    <Card className="p-6 glass-card">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <Users className="w-6 h-6 text-primary" />
          <h2 className="text-xl font-bold gradient-heading">Accountability Buddy</h2>
        </div>
      </div>
      <p className="text-muted-foreground mb-4">Stay connected with your buddy</p>
      <Button onClick={() => navigate("/app/buddy-system")} className="w-full">View Dashboard</Button>
    </Card>
  );
};

export default BuddySection;
