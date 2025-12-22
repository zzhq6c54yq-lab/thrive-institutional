import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface WorkshopSlide {
  title: string;
  description: string;
  exercises?: Array<{
    title: string;
    instructions: string;
    prompts: string[];
  }>;
}

interface WorkshopSlideViewerProps {
  slide: WorkshopSlide;
  currentSentenceIndex: number;
  sentences: string[];
}

const WorkshopSlideViewer: React.FC<WorkshopSlideViewerProps> = ({
  slide,
  currentSentenceIndex,
  sentences,
}) => {
  return (
    <div className="relative w-full h-full min-h-[400px] bg-gradient-to-br from-primary/5 via-background to-primary/10 rounded-lg overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="p-8 md:p-12 h-full flex flex-col justify-center"
        >
          {/* Section Title */}
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="text-3xl md:text-4xl font-bold mb-6 text-foreground"
            style={{
              textShadow: '0 2px 10px rgba(212, 175, 55, 0.2)',
            }}
          >
            {slide.title}
          </motion.h2>

          {/* Description with sentence highlighting */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-lg md:text-xl text-muted-foreground space-y-4 max-w-3xl"
          >
            {sentences.map((sentence, index) => (
              <span
                key={index}
                className={`inline transition-all duration-300 ${
                  index === currentSentenceIndex
                    ? 'text-primary font-medium bg-primary/10 px-1 rounded'
                    : 'text-muted-foreground'
                }`}
              >
                {sentence}.{' '}
              </span>
            ))}
          </motion.div>

          {/* Exercises (if any) */}
          {slide.exercises && slide.exercises.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-8 space-y-4"
            >
              {slide.exercises.map((exercise, idx) => (
                <div
                  key={idx}
                  className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-6"
                >
                  <h3 className="text-xl font-semibold mb-3 text-foreground">
                    Exercise: {exercise.title}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {exercise.instructions}
                  </p>
                  <ul className="space-y-2">
                    {exercise.prompts.map((prompt, pIdx) => (
                      <li
                        key={pIdx}
                        className="text-sm text-muted-foreground flex items-start gap-2"
                      >
                        <span className="text-primary">•</span>
                        {prompt}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
    </div>
  );
};

export default WorkshopSlideViewer;
