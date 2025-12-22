import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';

const DearHenryHeader: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative overflow-hidden bg-gradient-to-br from-amber-600 via-orange-500 to-amber-700 text-white"
    >
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-48 h-48 bg-white rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-6xl mx-auto px-4 py-16 md:py-24">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Heart className="w-8 h-8 fill-white" />
            <h1 className="text-5xl md:text-7xl font-serif font-bold tracking-tight">
              Dear Henry
            </h1>
            <Sparkles className="w-8 h-8" />
          </div>
          
          <p className="text-xl md:text-2xl font-light max-w-2xl mx-auto leading-relaxed">
            Your compassionate mental health columnist, here to provide guidance,
            support, and hope through life's challenges.
          </p>

          <div className="mt-8 flex items-center justify-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <span>Anonymous Questions</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <span>Compassionate Guidance</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <span>Community Support</span>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default DearHenryHeader;
