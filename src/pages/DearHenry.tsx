import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Page from '@/components/Page';
import DearHenryHeader from '@/components/dear-henry/DearHenryHeader';
import QuestionSubmission from '@/components/dear-henry/QuestionSubmission';
import CategoryFilter from '@/components/dear-henry/CategoryFilter';
import QAFeed from '@/components/dear-henry/QAFeed';
import MostLovedCarousel from '@/components/dear-henry/MostLovedCarousel';
import HenryBio from '@/components/dear-henry/HenryBio';
import { Button } from '@/components/ui/button';
import { PenLine } from 'lucide-react';
import AIDisclaimer from '@/components/compliance/AIDisclaimer';

const DearHenry: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showSubmissionForm, setShowSubmissionForm] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setShowSubmissionForm(true);
  };

  return (
    <Page title="Dear Henry" showBackButton={true}>
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50 dark:from-gray-900 dark:via-gray-800 dark:to-amber-900">
        <DearHenryHeader />
        
        {/* AI Disclaimer */}
        <div className="max-w-4xl mx-auto px-4 pt-4">
          <AIDisclaimer variant="banner" showCrisisInfo />
        </div>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-4xl mx-auto px-4 py-8"
        >
          <QuestionSubmission 
            isOpen={showSubmissionForm}
            onClose={() => setShowSubmissionForm(false)}
          />
        </motion.section>

        <section className="max-w-6xl mx-auto px-4 py-6">
          <CategoryFilter 
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
        </section>

        <section className="max-w-6xl mx-auto px-4 py-8">
          <h2 className="text-3xl font-serif font-bold text-gray-900 dark:text-white mb-6">
            Recent Advice
          </h2>
          <QAFeed selectedCategory={selectedCategory} />
        </section>

        <section className="max-w-6xl mx-auto px-4 py-12 bg-white dark:bg-gray-800 rounded-2xl my-8 shadow-lg">
          <h2 className="text-3xl font-serif font-bold text-gray-900 dark:text-white mb-8 text-center">
            Most Loved Answers
          </h2>
          <MostLovedCarousel />
        </section>

        <section className="max-w-4xl mx-auto px-4 py-12">
          <HenryBio />
        </section>

        <Button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 rounded-full w-16 h-16 shadow-2xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white z-50"
          size="lg"
        >
          <PenLine className="w-6 h-6" />
        </Button>
      </div>
    </Page>
  );
};

export default DearHenry;
