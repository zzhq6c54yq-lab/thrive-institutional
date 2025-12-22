
import React from "react";
import { Card, CardContent } from "@/components/ui/card";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ElementType;
  color: string;
  onClick: () => void;
}

const colorMap: Record<string, string> = {
  'bg-rose-500': 'bg-rose-500/20 dark:bg-rose-500/30',
  'bg-purple-500': 'bg-purple-500/20 dark:bg-purple-500/30',
  'bg-blue-500': 'bg-blue-500/20 dark:bg-blue-500/30',
  'bg-green-500': 'bg-green-500/20 dark:bg-green-500/30',
  'bg-amber-500': 'bg-amber-500/20 dark:bg-amber-500/30',
};

const FeatureCard: React.FC<FeatureCardProps> = ({ 
  title, 
  description, 
  icon: Icon, 
  color, 
  onClick 
}) => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onClick();
  };

  const bgColor = colorMap[color] || colorMap['bg-rose-500'];
  
  return (
    <Card 
      onClick={handleClick}
      className="bg-white dark:bg-[#1A1616] border-rose-200/30 dark:border-rose-900/30 
              hover:border-rose-300/50 dark:hover:border-rose-700/50 transition-colors 
              shadow-md cursor-pointer hover:shadow-lg transform hover:-translate-y-1 
              transition-transform duration-200"
    >
      <CardContent className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className={`p-2 rounded-full ${bgColor}`}>
            <Icon className="h-5 w-5 text-gray-800 dark:text-white" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{title}</h3>
        </div>
        <p className="text-gray-600 dark:text-white/70 text-sm">{description}</p>
      </CardContent>
    </Card>
  );
};

export default FeatureCard;
