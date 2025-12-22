import React from 'react';
import { Info, AlertTriangle, Phone } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AIDisclaimerProps {
  variant?: 'inline' | 'banner' | 'subtle';
  className?: string;
  showCrisisInfo?: boolean;
}

const AIDisclaimer: React.FC<AIDisclaimerProps> = ({ 
  variant = 'inline', 
  className,
  showCrisisInfo = false 
}) => {
  if (variant === 'subtle') {
    return (
      <p className={cn("text-xs text-muted-foreground/70 text-center", className)}>
        <Info className="inline-block w-3 h-3 mr-1" />
        Henry is an AI companion for emotional support, not a licensed therapist.
      </p>
    );
  }

  if (variant === 'banner') {
    return (
      <div className={cn(
        "bg-amber-500/10 border border-amber-500/30 rounded-lg p-4",
        className
      )}>
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
          <div className="space-y-2">
            <p className="text-sm text-foreground/90">
              <strong>Important:</strong> Henry is an AI companion designed to offer supportive guidance and emotional support. 
              He is not a licensed therapist and does not diagnose, treat, or replace professional mental health care.
            </p>
            {showCrisisInfo && (
              <p className="text-sm text-foreground/80 flex items-center gap-2">
                <Phone className="w-4 h-4" />
                If you're experiencing a mental health crisis, please contact 988 (Suicide & Crisis Lifeline) or seek immediate professional help.
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Default inline variant
  return (
    <div className={cn(
      "bg-muted/50 border border-border/50 rounded-lg p-3",
      className
    )}>
      <div className="flex items-start gap-2">
        <Info className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Henry is an AI companion for emotional support. He is not a licensed therapist and cannot diagnose or treat mental health conditions. 
            For professional care, please consult a licensed mental health provider.
          </p>
          {showCrisisInfo && (
            <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
              <Phone className="w-3 h-3" />
              Crisis? Call 988 or text HOME to 741741
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIDisclaimer;
