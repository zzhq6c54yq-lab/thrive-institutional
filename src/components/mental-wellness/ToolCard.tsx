import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface ToolCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  features?: string[];
  estimatedTime?: string;
  difficulty?: "Easy" | "Medium" | "Advanced";
  featured?: boolean;
  onStartClick: () => void;
  onLearnMoreClick?: () => void;
  className?: string;
}

const ToolCard: React.FC<ToolCardProps> = ({
  title,
  description,
  icon,
  features = [],
  estimatedTime,
  difficulty,
  featured = false,
  onStartClick,
  onLearnMoreClick,
  className,
}) => {
  const difficultyColors = {
    Easy: "bg-accent/10 text-accent border-accent/20",
    Medium: "bg-primary/10 text-primary border-primary/20",
    Advanced: "bg-destructive/10 text-destructive border-destructive/20",
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
      className={cn("h-full", className)}
    >
      <Card className={cn(
        "h-full flex flex-col backdrop-blur-sm bg-card/50 border-2 transition-all hover:shadow-xl hover:border-primary/20",
        featured && "border-primary/30 bg-gradient-to-br from-primary/5 to-card/50"
      )}>
        <CardHeader className="space-y-3">
          <div className="flex items-start justify-between gap-3">
            <div className="p-3 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20">
              {icon}
            </div>
            {difficulty && (
              <span className={cn(
                "text-xs px-3 py-1 rounded-full border font-medium",
                difficultyColors[difficulty]
              )}>
                {difficulty}
              </span>
            )}
          </div>
          <CardTitle className="text-xl">{title}</CardTitle>
          <CardDescription className="text-sm leading-relaxed">
            {description}
          </CardDescription>
        </CardHeader>

        {(features.length > 0 || estimatedTime) && (
          <CardContent className="flex-grow space-y-3">
            {estimatedTime && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>{estimatedTime}</span>
              </div>
            )}
            {features.length > 0 && (
              <ul className="space-y-1.5">
                {features.slice(0, 3).map((feature, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <TrendingUp className="h-3.5 w-3.5 mt-0.5 text-primary flex-shrink-0" />
                    <span className="line-clamp-1">{feature}</span>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        )}

        <CardFooter className="flex gap-2 pt-4">
          <Button 
            onClick={onStartClick}
            className="flex-1 bg-primary hover:bg-primary/90 group"
          >
            <span>Start</span>
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
          {onLearnMoreClick && (
            <Button 
              onClick={onLearnMoreClick}
              variant="outline"
              className="border-primary/20 hover:bg-primary/5"
            >
              Learn More
            </Button>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default ToolCard;
