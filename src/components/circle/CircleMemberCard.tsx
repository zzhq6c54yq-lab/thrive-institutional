import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mail, User } from "lucide-react";

const CircleMemberCard = ({ member }: { member: any }) => {
  return (
    <Card className="p-4 glass-card">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <User className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h4 className="font-semibold">{member.name}</h4>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Mail className="w-3 h-3" />
              {member.email}
            </div>
          </div>
        </div>
        <Badge variant={member.invite_status === "accepted" ? "default" : "secondary"}>
          {member.invite_status}
        </Badge>
      </div>
      <div className="text-xs text-muted-foreground">
        {member.relationship} • Can view: {member.can_view_mood ? "Mood" : ""} {member.can_view_progress ? "Progress" : ""}
      </div>
    </Card>
  );
};

export default CircleMemberCard;
