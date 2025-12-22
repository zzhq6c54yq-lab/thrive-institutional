import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Users, Calendar, MessageSquare } from "lucide-react";
import { motion } from "framer-motion";

interface Badge {
  label: string;
  value: number;
  icon?: React.ReactNode;
}

interface ResourceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick: () => void;
  buttonText?: string;
  colorTheme?: "rose" | "purple" | "cyan" | "blue" | "amber";
  badges?: Badge[];
  isNew?: boolean;
}

const colorClasses = {
  rose: {
    border: "border-rose-300/50 dark:border-rose-700/50",
    iconBg: "bg-rose-500/10 dark:bg-rose-500/20",
    iconText: "text-rose-600 dark:text-rose-400",
    button: "text-rose-600 hover:text-rose-700 dark:text-rose-400 dark:hover:text-rose-300",
    badge: "bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-300"
  },
  purple: {
    border: "border-purple-300/50 dark:border-purple-700/50",
    iconBg: "bg-purple-500/10 dark:bg-purple-500/20",
    iconText: "text-purple-600 dark:text-purple-400",
    button: "text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300",
    badge: "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300"
  },
  cyan: {
    border: "border-cyan-300/50 dark:border-cyan-700/50",
    iconBg: "bg-cyan-500/10 dark:bg-cyan-500/20",
    iconText: "text-cyan-600 dark:text-cyan-400",
    button: "text-cyan-600 hover:text-cyan-700 dark:text-cyan-400 dark:hover:text-cyan-300",
    badge: "bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300"
  },
  blue: {
    border: "border-blue-300/50 dark:border-blue-700/50",
    iconBg: "bg-blue-500/10 dark:bg-blue-500/20",
    iconText: "text-blue-600 dark:text-blue-400",
    button: "text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300",
    badge: "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
  },
  amber: {
    border: "border-amber-300/50 dark:border-amber-700/50",
    iconBg: "bg-amber-500/10 dark:bg-amber-500/20",
    iconText: "text-amber-600 dark:text-amber-400",
    button: "text-amber-600 hover:text-amber-700 dark:text-amber-400 dark:hover:text-amber-300",
    badge: "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300"
  }
};

const ResourceCard: React.FC<ResourceCardProps> = ({ 
  title, 
  description, 
  icon, 
  onClick,
  buttonText = "Explore",
  colorTheme = "rose",
  badges = [],
  isNew = false
}) => {
  const colors = colorClasses[colorTheme];

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
      className={`relative bg-white/40 dark:bg-gray-800/40 backdrop-blur-md border ${colors.border} rounded-xl p-6 hover:shadow-xl transition-all duration-300 cursor-pointer group`}
      onClick={onClick}
    >
      {isNew && (
        <div className="absolute top-4 right-4">
          <span className={`text-xs font-semibold px-2 py-1 rounded-full ${colors.badge}`}>
            New
          </span>
        </div>
      )}
      
      <div className="flex items-start gap-4">
        <div className={`p-3 rounded-full ${colors.iconBg} ${colors.iconText} transition-transform group-hover:scale-110 duration-300`}>
          {icon}
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-opacity-80 transition-colors">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
            {description}
          </p>
          
          {badges.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {badges.map((badge, index) => (
                <div 
                  key={index}
                  className={`flex items-center gap-1 text-xs px-2 py-1 rounded-full ${colors.badge}`}
                >
                  {badge.icon}
                  <span className="font-medium">{badge.value} {badge.label}</span>
                </div>
              ))}
            </div>
          )}
          
          <Button 
            variant="ghost" 
            size="sm" 
            className={`${colors.button} p-0 h-auto hover:bg-transparent group/btn`}
          >
            {buttonText}
            <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover/btn:translate-x-1" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default ResourceCard;
