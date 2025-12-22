import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageCircle, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useCommunityGroups } from "@/hooks/useCommunityGroups";
import { useUser } from "@/contexts/UserContext";

export function CommunityGroupsSection() {
  const { user } = useUser();
  const { groups, memberships, isLoading } = useCommunityGroups(user?.id);
  const navigate = useNavigate();

  if (isLoading) return null;

  const myGroups = memberships?.filter(m => m.group) || [];
  const hasGroups = myGroups.length > 0;
  const topGroups = groups?.slice(0, 3) || [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7 }}
    >
      <Card className="bg-gradient-to-br from-purple-500/5 to-pink-500/5 border-purple-500/30">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <MessageCircle className="w-6 h-6 text-purple-500" />
              Community Groups
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/app/community")}
              className="gap-1"
            >
              Browse All
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {hasGroups ? (
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground mb-3">
                Your active communities ({myGroups.length})
              </p>
              {myGroups.slice(0, 2).map((membership: any) => (
                <div
                  key={membership.id}
                  className="flex items-center gap-3 p-3 bg-background/50 rounded-lg hover:bg-background/70 transition-colors cursor-pointer"
                  onClick={() => navigate("/app/community")}
                >
                  <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
                    <MessageCircle className="w-5 h-5 text-purple-500" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sm">{membership.group.name}</p>
                    <p className="text-xs text-muted-foreground">{membership.group.member_count} members</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground mb-3">
                Join communities of people who understand what you're going through.
              </p>
              {topGroups.map((group: any) => (
                <div
                  key={group.id}
                  className="flex items-center gap-3 p-3 bg-background/50 rounded-lg hover:bg-background/70 transition-colors cursor-pointer"
                  onClick={() => navigate("/app/community")}
                >
                  <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
                    <MessageCircle className="w-5 h-5 text-purple-500" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sm">{group.name}</p>
                    <p className="text-xs text-muted-foreground">{group.member_count} members</p>
                  </div>
                </div>
              ))}
              <Button 
                onClick={() => navigate("/app/community")}
                variant="outline"
                size="sm"
                className="w-full"
              >
                Explore All Groups
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
