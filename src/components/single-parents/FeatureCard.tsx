import React from "react";
import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  onClick: () => void;
}

const colorMap: Record<string, { bg: string; text: string }> = {
  'bg-rose-500': { bg: 'bg-rose-500/10 group-hover:bg-rose-500/20', text: 'text-rose-500' },
  'bg-purple-500': { bg: 'bg-purple-500/10 group-hover:bg-purple-500/20', text: 'text-purple-500' },
  'bg-blue-500': { bg: 'bg-blue-500/10 group-hover:bg-blue-500/20', text: 'text-blue-500' },
  'bg-green-500': { bg: 'bg-green-500/10 group-hover:bg-green-500/20', text: 'text-green-500' },
  'bg-amber-500': { bg: 'bg-amber-500/10 group-hover:bg-amber-500/20', text: 'text-amber-500' },
  'bg-pink-500': { bg: 'bg-pink-500/10 group-hover:bg-pink-500/20', text: 'text-pink-500' },
};

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, icon: Icon, color, onClick }) => {
  const colors = colorMap[color] || colorMap['bg-rose-500'];
  
  return (
    <Card
      className="p-6 cursor-pointer transition-all hover:scale-105 hover:shadow-lg group bg-card"
      onClick={onClick}
      onKeyDown={(e) => e.key === 'Enter' && onClick()}
      tabIndex={0}
      role="button"
    >
      <div className="flex items-start gap-4">
        <div className={`p-3 rounded-lg ${colors.bg} transition-all`}>
          <Icon className={`w-6 h-6 ${colors.text}`} />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-rose-600 transition-colors">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground">
            {description}
          </p>
        </div>
      </div>
    </Card>
  );
};

export default FeatureCard;
