import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, ChevronRight, UserPlus } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useSupportCircle } from "@/hooks/useSupportCircle";
import { useUser } from "@/contexts/UserContext";

export function SupportCircleSection() {
  const { user } = useUser();
  const { members, isLoading } = useSupportCircle(user?.id);
  const navigate = useNavigate();

  if (isLoading) return null;

  const memberCount = members?.length || 0;
  const hasMembers = memberCount > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
    >
      <Card className="bg-gradient-to-br from-blue-500/5 to-indigo-500/5 border-blue-500/30">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Users className="w-6 h-6 text-blue-500" />
              My Support Circle
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/app/support-circle")}
              className="gap-1"
            >
              {hasMembers ? "Manage" : "Set Up"}
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {hasMembers ? (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  {members.slice(0, 3).map((member: any, idx) => (
                    <div
                      key={member.id}
                      className="w-10 h-10 rounded-full bg-blue-500/20 border-2 border-background flex items-center justify-center"
                    >
                      <span className="text-sm font-medium text-blue-500">
                        {member.member_name?.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  ))}
                  {memberCount > 3 && (
                    <div className="w-10 h-10 rounded-full bg-blue-500/20 border-2 border-background flex items-center justify-center">
                      <span className="text-xs font-medium text-blue-500">+{memberCount - 3}</span>
                    </div>
                  )}
                </div>
                <div>
                  <p className="text-sm font-medium">{memberCount} {memberCount === 1 ? 'member' : 'members'}</p>
                  <p className="text-xs text-muted-foreground">Supporting your journey</p>
                </div>
              </div>
              <Button 
                onClick={() => navigate("/app/support-circle")}
                variant="outline"
                size="sm"
                className="w-full gap-2"
              >
                <UserPlus className="w-4 h-4" />
                Invite More Supporters
              </Button>
            </div>
          ) : (
            <div className="text-center py-4">
              <p className="text-sm text-muted-foreground mb-4">
                Invite family members and caregivers to support your journey. Share what you choose with privacy controls.
              </p>
              <Button 
                onClick={() => navigate("/app/support-circle")}
                className="bg-blue-500 hover:bg-blue-600 text-white gap-2"
              >
                <Users className="w-4 h-4" />
                Create Support Circle
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
