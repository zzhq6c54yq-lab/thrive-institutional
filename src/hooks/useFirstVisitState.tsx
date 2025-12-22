
import { useState, useEffect } from "react";

export const useFirstVisitState = (screenState: string) => {
  const [isFirstVisit, setIsFirstVisit] = useState(false);

  // Handle first visit
  useEffect(() => {
    const hasVisited = localStorage.getItem('hasVisitedThriveMT');
    if (!hasVisited && screenState === 'main') {
      setIsFirstVisit(true);
      localStorage.setItem('hasVisitedThriveMT', 'true');
    }
  }, [screenState]);

  return {
    isFirstVisit,
    setIsFirstVisit
  };
};

export default useFirstVisitState;
