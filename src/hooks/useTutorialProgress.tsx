import { useState, useEffect } from 'react';

interface TutorialProgress {
  [featureId: string]: {
    completed: boolean;
    lastViewed: number;
  };
}

export const useTutorialProgress = () => {
  const [progress, setProgress] = useState<TutorialProgress>(() => {
    const saved = localStorage.getItem('tutorialProgress');
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    localStorage.setItem('tutorialProgress', JSON.stringify(progress));
  }, [progress]);

  const markTutorialCompleted = (featureId: string) => {
    setProgress(prev => ({
      ...prev,
      [featureId]: {
        completed: true,
        lastViewed: Date.now()
      }
    }));
  };

  const markTutorialViewed = (featureId: string) => {
    setProgress(prev => ({
      ...prev,
      [featureId]: {
        completed: prev[featureId]?.completed || false,
        lastViewed: Date.now()
      }
    }));
  };

  const isTutorialCompleted = (featureId: string): boolean => {
    return progress[featureId]?.completed || false;
  };

  const resetAllTutorials = () => {
    setProgress({});
    localStorage.removeItem('tutorialProgress');
    localStorage.removeItem('hasSeenQuickStart');
  };

  return {
    markTutorialCompleted,
    markTutorialViewed,
    isTutorialCompleted,
    resetAllTutorials,
    progress
  };
};

export default useTutorialProgress;
