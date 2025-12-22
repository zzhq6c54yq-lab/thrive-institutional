
import React from "react";
import { Button } from "@/components/ui/button";
import { Sparkle, Zap, Smile, Frown, Search, Sun } from "lucide-react";

/**
 * Quick action buttons for Henry chat.
 */
export interface QuickActionsProps {
  onAction: (action: string) => void;
  className?: string;
}

// Example quick actions (feel free to customize!)
const ACTIONS = [
  {
    label: "Reframe Thought",
    value: "Help me reframe this thought.",
    icon: <Sparkle className="w-4 h-4 mr-2" />
  },
  {
    label: "Breathing Exercise",
    value: "Can you guide me through a breathing exercise?",
    icon: <Sun className="w-4 h-4 mr-2" />
  },
  {
    label: "Grounding Technique",
    value: "Teach me a grounding technique.",
    icon: <Zap className="w-4 h-4 mr-2" />
  },
  {
    label: "Mood Check-In",
    value: "Let's do a mood check-in.",
    icon: <Smile className="w-4 h-4 mr-2" />
  },
  {
    label: "I'm feeling anxious",
    value: "I'm feeling anxious.",
    icon: <Frown className="w-4 h-4 mr-2" />
  },
  {
    label: "Show me coping tools",
    value: "Can you show me more coping tools?",
    icon: <Search className="w-4 h-4 mr-2" />
  },
];

const QuickActions: React.FC<QuickActionsProps> = ({ onAction, className }) => (
  <div className={`flex flex-wrap gap-2 ${className || ""}`}>
    {ACTIONS.map((action, idx) => (
      <Button
        key={action.value}
        variant="outline"
        className="rounded-full px-3 py-1 flex items-center border-2 border-[#B87333] text-[#B87333] hover:bg-[#B87333]/10 transition"
        onClick={() => onAction(action.value)}
        tabIndex={0}
        aria-label={action.label}
      >
        {action.icon}
        <span className="text-xs font-semibold">{action.label}</span>
      </Button>
    ))}
  </div>
);

export default QuickActions;
