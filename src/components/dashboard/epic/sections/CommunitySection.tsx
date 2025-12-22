import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CommunitySection = () => {
  const navigate = useNavigate();

  return (
    <Card className="p-6 glass-card">
      <div className="flex items-center gap-3 mb-4">
        <Users className="w-6 h-6 text-primary" />
        <h2 className="text-xl font-bold gradient-heading">Community Groups</h2>
      </div>
      <p className="text-muted-foreground mb-4">Join supportive communities</p>
      <Button onClick={() => navigate("/app/community-groups")} className="w-full">Explore Groups</Button>
    </Card>
  );
};

export default CommunitySection;
