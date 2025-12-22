
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * A hook that scrolls the window to the top when the route changes
 */
export const useScrollToTop = () => {
  const location = useLocation();
  
  useEffect(() => {
    try {
      window.scrollTo({
        top: 0,
        behavior: 'instant'
      });
    } catch (error) {
      console.warn('[useScrollToTop] Error scrolling to top:', error);
      // Fallback scroll method
      window.scrollTo(0, 0);
    }
  }, [location.pathname]);
};

export default useScrollToTop;
