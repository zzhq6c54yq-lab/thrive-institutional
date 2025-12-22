
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
  'bg-green-500': 'bg-green-500/20',
  'bg-blue-500': 'bg-blue-500/20',
  'bg-purple-500': 'bg-purple-500/20',
  'bg-amber-500': 'bg-amber-500/20',
};

const FeatureCard: React.FC<FeatureCardProps> = ({ 
  title, 
  description, 
  icon: Icon, 
  color, 
  onClick 
}) => {
  const bgColor = colorMap[color] || colorMap['bg-green-500'];
  
  return (
    <Card 
      onClick={onClick}
      className="bg-[#101820] border-green-900/30 hover:border-green-700/50 transition-colors shadow-lg cursor-pointer hover:shadow-xl"
    >
      <CardContent className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className={`p-2 rounded-full ${bgColor}`}>
            <Icon className="h-5 w-5 text-white" />
          </div>
          <h3 className="text-lg font-semibold text-white">{title}</h3>
        </div>
        <p className="text-white/70 text-sm">{description}</p>
      </CardContent>
    </Card>
  );
};

export default FeatureCard;
