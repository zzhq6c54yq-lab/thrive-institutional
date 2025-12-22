import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import { cn } from "@/lib/utils";

interface BadgeCardProps {
  badge: {
    id: string;
    name: string;
    description: string | null;
    icon_name: string | null;
    category: string;
    points_value: number;
  };
  earned?: boolean;
  earnedAt?: string;
  index?: number;
}

export function BadgeCard({ badge, earned = false, earnedAt, index = 0 }: BadgeCardProps) {
  const IconComponent = badge.icon_name && (Icons as any)[badge.icon_name] 
    ? (Icons as any)[badge.icon_name] 
    : Icons.Award;

  const categoryColors: Record<string, string> = {
    streak: "from-orange-500 to-red-500",
    achievement: "from-blue-500 to-purple-500",
    milestone: "from-green-500 to-teal-500",
    community: "from-pink-500 to-rose-500",
    therapy: "from-indigo-500 to-blue-500",
    wellness: "from-emerald-500 to-lime-500",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={earned ? { scale: 1.05 } : {}}
    >
      <Card
        className={cn(
          "relative overflow-hidden transition-all duration-300",
          earned
            ? "shadow-lg hover:shadow-xl border-primary/50"
            : "opacity-60 grayscale hover:grayscale-0 hover:opacity-80"
        )}
      >
        <CardContent className="p-4">
          {/* Category Badge */}
          <div className="flex justify-between items-start mb-3">
            <Badge variant="outline" className="text-xs capitalize">
              {badge.category}
            </Badge>
            {badge.points_value > 0 && (
              <Badge variant="secondary" className="text-xs">
                {badge.points_value} pts
              </Badge>
            )}
          </div>

          {/* Icon */}
          <div
            className={cn(
              "w-16 h-16 mx-auto mb-3 rounded-full flex items-center justify-center",
              "bg-gradient-to-br",
              categoryColors[badge.category] || "from-[#D4A574] to-[#B87333]",
              !earned && "opacity-40"
            )}
          >
            <IconComponent className="w-8 h-8 text-white" />
          </div>

          {/* Name & Description */}
          <h3 className="font-semibold text-center mb-1">{badge.name}</h3>
          <p className="text-xs text-muted-foreground text-center line-clamp-2">
            {badge.description}
          </p>

          {/* Earned Status */}
          {earned && earnedAt && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-3 text-center"
            >
              <p className="text-xs text-green-600 dark:text-green-400 font-medium">
                ✓ Earned {new Date(earnedAt).toLocaleDateString()}
              </p>
            </motion.div>
          )}

          {!earned && (
            <div className="mt-3 text-center">
              <p className="text-xs text-muted-foreground">🔒 Keep going!</p>
            </div>
          )}
        </CardContent>

        {/* Shimmer effect for earned badges */}
        {earned && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{
              repeat: Infinity,
              duration: 3,
              ease: "linear",
              repeatDelay: 5,
            }}
          />
        )}
      </Card>
    </motion.div>
  );
}