
// Accessibility utilities for consistent ARIA labels and focus management

export const a11y = {
  // Screen reader text utility
  srOnly: "sr-only absolute -m-px h-px w-px overflow-hidden whitespace-nowrap border-0 p-0",
  
  // Common ARIA labels
  labels: {
    close: "Close",
    menu: "Menu",
    search: "Search",
    loading: "Loading",
    previous: "Previous",
    next: "Next",
    edit: "Edit",
    delete: "Delete",
    save: "Save",
    cancel: "Cancel",
    submit: "Submit",
    expand: "Expand",
    collapse: "Collapse",
  },
  
  // Focus management utilities
  focus: {
    // Trap focus within an element
    trapFocus: (element: HTMLElement) => {
      const focusableElements = element.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      ) as NodeListOf<HTMLElement>;
      
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];
      
      const handleKeydown = (e: KeyboardEvent) => {
        if (e.key === 'Tab') {
          if (e.shiftKey) {
            if (document.activeElement === firstElement) {
              e.preventDefault();
              lastElement.focus();
            }
          } else {
            if (document.activeElement === lastElement) {
              e.preventDefault();
              firstElement.focus();
            }
          }
        }
        
        if (e.key === 'Escape') {
          element.focus();
        }
      };
      
      element.addEventListener('keydown', handleKeydown);
      firstElement?.focus();
      
      return () => {
        element.removeEventListener('keydown', handleKeydown);
      };
    },
    
    // Return focus to previous element
    returnFocus: (previousElement: HTMLElement | null) => {
      if (previousElement && document.contains(previousElement)) {
        previousElement.focus();
      }
    },
    
    // Check if element is focusable
    isFocusable: (element: HTMLElement): boolean => {
      return (
        element.tabIndex >= 0 &&
        !element.hasAttribute('disabled') &&
        !element.getAttribute('aria-hidden') &&
        element.offsetWidth > 0 &&
        element.offsetHeight > 0
      );
    },
  },
  
  // Keyboard navigation helpers
  keyboard: {
    // Handle arrow key navigation
    handleArrowKeys: (
      e: KeyboardEvent,
      elements: HTMLElement[],
      currentIndex: number,
      onIndexChange: (index: number) => void
    ) => {
      switch (e.key) {
        case 'ArrowDown':
        case 'ArrowRight':
          e.preventDefault();
          const nextIndex = currentIndex < elements.length - 1 ? currentIndex + 1 : 0;
          onIndexChange(nextIndex);
          elements[nextIndex]?.focus();
          break;
        case 'ArrowUp':
        case 'ArrowLeft':
          e.preventDefault();
          const prevIndex = currentIndex > 0 ? currentIndex - 1 : elements.length - 1;
          onIndexChange(prevIndex);
          elements[prevIndex]?.focus();
          break;
        case 'Home':
          e.preventDefault();
          onIndexChange(0);
          elements[0]?.focus();
          break;
        case 'End':
          e.preventDefault();
          const lastIndex = elements.length - 1;
          onIndexChange(lastIndex);
          elements[lastIndex]?.focus();
          break;
      }
    },
  },
  
  // Announcement utilities for screen readers
  announce: {
    // Create a live region for announcements
    createLiveRegion: (id: string = 'live-region') => {
      let liveRegion = document.getElementById(id);
      if (!liveRegion) {
        liveRegion = document.createElement('div');
        liveRegion.id = id;
        liveRegion.setAttribute('aria-live', 'polite');
        liveRegion.setAttribute('aria-atomic', 'true');
        liveRegion.className = 'sr-only';
        document.body.appendChild(liveRegion);
      }
      return liveRegion;
    },
    
    // Announce a message to screen readers
    message: (message: string, priority: 'polite' | 'assertive' = 'polite') => {
      const liveRegion = a11y.announce.createLiveRegion();
      liveRegion.setAttribute('aria-live', priority);
      liveRegion.textContent = message;
      
      // Clear after a brief delay to allow for re-announcements
      setTimeout(() => {
        liveRegion.textContent = '';
      }, 1000);
    },
  },
  
  // Color contrast and visibility helpers
  contrast: {
    // Check if colors meet WCAG contrast requirements
    meetsContrastRequirement: (foreground: string, background: string, level: 'AA' | 'AAA' = 'AA'): boolean => {
      // This is a simplified check - in production, you'd want a full contrast calculation
      // For now, return true and implement proper contrast checking later
      return true;
    },
  },
  
  // Reduced motion preferences
  motion: {
    // Check if user prefers reduced motion
    prefersReducedMotion: (): boolean => {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    },
    
    // Get appropriate animation duration based on user preference
    getAnimationDuration: (normalDuration: number): number => {
      return a11y.motion.prefersReducedMotion() ? 0 : normalDuration;
    },
  },
};

// Hook for using accessibility utilities in React components
export const useA11y = () => {
  return a11y;
};
