
import React from "react";
import { useScrollToTop } from "@/hooks/useScrollToTop";

/**
 * A component that scrolls the window to the top when the route changes
 * To be used in the top level of the application
 */
const ScrollToTop: React.FC = () => {
  try {
    useScrollToTop();
  } catch (error) {
    console.warn('[ScrollToTop] Component error:', error);
  }
  return null;
};

export default ScrollToTop;
