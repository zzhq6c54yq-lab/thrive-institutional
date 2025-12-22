// Mapping configuration for tool categories to their corresponding pages
export const toolCategoryRoutes: Record<string, string> = {
  // Main wellness tools
  "breathing": "/mental-wellness-tools/breathing",
  "reframing": "/mental-wellness-tools/reframing",
  "meditation": "/mental-wellness-tools/meditation",
  "mood-boost": "/mental-wellness-tools/mood-boost",
  "sleep": "/mental-wellness-tools/sleep",
  "goals": "/mental-wellness-tools/goals",
  "exercise": "/mental-wellness-tools/exercise",
  "therapy-support": "/mental-wellness-tools/therapy-support",
  
  // Alternative mappings
  "breathing-exercises": "/mental-wellness-tools/breathing",
  "thought-reframing": "/mental-wellness-tools/reframing",
  "guided-meditation": "/mental-wellness-tools/meditation",
  "mood-boosters": "/mental-wellness-tools/mood-boost",
  "sleep-improvement": "/mental-wellness-tools/sleep",
  "goal-setting": "/mental-wellness-tools/goals",
  "mind-body-exercise": "/mental-wellness-tools/exercise",
  "between-session-support": "/mental-wellness-tools/therapy-support",
};

// Helper function to get route from tool title
export const getToolRoute = (toolTitle: string): string => {
  const normalizedTitle = toolTitle.toLowerCase().replace(/\s+/g, "-");
  
  // Check direct match
  if (toolCategoryRoutes[normalizedTitle]) {
    return toolCategoryRoutes[normalizedTitle];
  }
  
  // Check partial matches
  for (const [key, route] of Object.entries(toolCategoryRoutes)) {
    if (normalizedTitle.includes(key) || key.includes(normalizedTitle)) {
      return route;
    }
  }
  
  // Default fallback
  return "/mental-wellness-tools";
};
