import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

interface AnimatedProgressBarProps {
  currentStep: number;
  totalSteps: number;
  stepLabels: string[];
}

export const AnimatedProgressBar = ({ currentStep, totalSteps, stepLabels }: AnimatedProgressBarProps) => {
  return (
    <div className="mb-8">
      {/* Progress Bar */}
      <div className="relative flex items-center justify-between mb-3">
        {/* Background line */}
        <div className="absolute top-5 left-0 right-0 h-0.5 bg-muted" />
        
        {/* Animated progress line */}
        <motion.div 
          className="absolute top-5 left-0 h-0.5 bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--primary-glow))]"
          initial={{ width: "0%" }}
          animate={{ 
            width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` 
          }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        />
        
        {/* Step indicators */}
        {Array.from({ length: totalSteps }).map((_, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < currentStep;
          const isCurrent = stepNumber === currentStep;
          
          return (
            <div key={stepNumber} className="relative z-10 flex flex-col items-center">
              <motion.div
                initial={false}
                animate={{
                  scale: isCurrent ? 1.1 : 1,
                  backgroundColor: isCompleted || isCurrent 
                    ? "hsl(var(--primary))" 
                    : "hsl(var(--muted))"
                }}
                transition={{ duration: 0.3 }}
                className="w-10 h-10 rounded-full flex items-center justify-center border-2 border-background shadow-lg"
              >
                {isCompleted ? (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3, type: "spring" }}
                  >
                    <CheckCircle className="h-5 w-5 text-white" />
                  </motion.div>
                ) : (
                  <span className={`text-sm font-medium ${
                    isCurrent ? "text-white" : "text-muted-foreground"
                  }`}>
                    {stepNumber}
                  </span>
                )}
              </motion.div>
              
              {/* Pulsing dot for current step */}
              {isCurrent && (
                <motion.div
                  className="absolute top-0 w-10 h-10 rounded-full bg-[hsl(var(--primary))]"
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.5, 0, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              )}
            </div>
          );
        })}
      </div>
      
      {/* Step labels */}
      <div className="flex items-center justify-between px-1">
        {stepLabels.map((label, index) => (
          <motion.span
            key={index}
            initial={false}
            animate={{
              opacity: index + 1 === currentStep ? 1 : 0.5,
              fontWeight: index + 1 === currentStep ? 600 : 400,
            }}
            className="text-xs text-center max-w-[80px]"
          >
            {label}
          </motion.span>
        ))}
      </div>
    </div>
  );
};
