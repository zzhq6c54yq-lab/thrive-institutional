import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, ChevronRight, Baby, Briefcase, Home, HeartCrack } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useLifeTransitions } from "@/hooks/useLifeTransitions";
import { useUser } from "@/contexts/UserContext";

const iconMap: Record<string, any> = {
  divorce: HeartCrack,
  'job-loss': Briefcase,
  'new-baby': Baby,
  moving: Home,
  default: Heart,
};

export function LifeTransitionsSection() {
  const { user } = useUser();
  const { programs, enrollments, isLoading } = useLifeTransitions(user?.id);
  const navigate = useNavigate();

  if (isLoading || !programs || programs.length === 0) return null;

  const myPrograms = enrollments?.filter(e => e.program) || [];
  const hasEnrollments = myPrograms.length > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
    >
      <Card className="bg-gradient-to-br from-emerald-500/5 to-teal-500/5 border-emerald-500/30">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Heart className="w-6 h-6 text-emerald-500" />
              Life Transitions Support
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/app/life-transitions")}
              className="gap-1"
            >
              {hasEnrollments ? "View Progress" : "Explore Programs"}
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {hasEnrollments ? (
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground mb-4">
                Continue your guided journey through these major life events.
              </p>
              {myPrograms.slice(0, 2).map((enrollment: any) => {
                const Icon = iconMap[enrollment.program.slug] || iconMap.default;
                return (
                  <div
                    key={enrollment.id}
                    className="flex items-center gap-3 p-3 bg-background/50 rounded-lg hover:bg-background/70 transition-colors cursor-pointer"
                    onClick={() => navigate("/app/life-transitions")}
                  >
                    <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-emerald-500" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-sm">{enrollment.program.name}</p>
                      <p className="text-xs text-muted-foreground">Week {enrollment.current_week || 1} of {enrollment.program.duration_weeks}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-6">
              <p className="text-sm text-muted-foreground mb-4">
                Going through a big life change? Get structured support and resources for major transitions like divorce, job loss, moving, and more.
              </p>
              <Button 
                onClick={() => navigate("/app/life-transitions")}
                className="bg-emerald-500 hover:bg-emerald-600 text-white"
              >
                Explore Transition Programs
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
