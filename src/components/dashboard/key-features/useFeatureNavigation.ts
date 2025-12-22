
import { useNavigate, useLocation } from "react-router-dom";

export const useFeatureNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const handleNavigate = (path: string) => {
    // Map old paths to new working paths (all with /app prefix)
    const pathMapping: Record<string, string> = {
      "/mental-wellness": "/app/mental-wellness-tools",
      "/games-and-quizzes": "/app/games-and-quizzes",
      "/small-business-portal": "/app/small-business-welcome",
      "/employee-dashboard": "/app/employee-welcome",
      "/cancer-support": "/app/cancer-support-welcome",
      "/career-coaching": "/app/career-coaching",
      "/meditation-studio": "/app/meditation-studio",
      "/aa-sponsor": "/app/my-sponsor",
      "/real-time-therapy": "/app/real-time-therapy",
      "/holistic-wellness": "/app/holistic-wellness",
      "/community-support": "/app/community-support",
      "/binaural-beats": "/app/binaural-beats",
      "/journaling": "/app/journaling",
      "/mindfulness-sleep": "/app/mindfulness-sleep",
      "/video-diary": "/app/video-diary",
      "/resource-library": "/app/resource-library",
      "/wellness-challenges": "/app/wellness-challenges",
      "/workshops": "/app/workshops",
      "/progress-reports": "/app/progress-reports",
      "/family-resources": "/app/family-resources",
      "/alternative-therapies": "/app/alternative-therapies",
      "/virtual-meetings": "/app/virtual-meetings",
      "/sleep-tracker": "/app/sleep-tracker"
    };

    // Get the mapped path or use the original path with /app prefix if not already prefixed
    let finalPath = pathMapping[path] || path;
    if (!finalPath.startsWith('/app') && !finalPath.startsWith('/home') && !finalPath.startsWith('/therapy')) {
      finalPath = `/app${finalPath.startsWith('/') ? finalPath : '/' + finalPath}`;
    }

    
    // Add directToAssessment flag for assessment-related features
    const isAssessmentRelated = 
      finalPath === "/mental-wellness-tools" || 
      finalPath === "/games-and-quizzes" ||
      finalPath.includes("assessment");
      
    // Special handling for small business paths
    const isSmallBusiness = finalPath === "/small-business-welcome";
    const isEmployee = finalPath === "/employee-welcome";
    
    // Get the current screen state for proper return navigation
    const currentState = location.state || {};
    const currentScreenState = currentState.screenState || 'main';
    
    // Store the current path to enable proper back navigation
    const currentPath = location.pathname;
    
    if (isAssessmentRelated) {
      navigate(finalPath, {
        state: {
          ...currentState,
          preventTutorial: true,
          directToAssessment: true,
          activeTab: "assessments",
          startAssessment: true,
          fromMainMenu: true,
          returnToMain: true,
          previousPath: currentPath
        }
      });
    } else if (isSmallBusiness) {
      // Navigate to selection screen instead
      navigate("/app/small-business-selection", {
        state: {
          ...currentState,
          preventTutorial: true,
          fromMainMenu: true,
          returnToMain: true,
          previousPath: currentPath
        }
      });
    } else if (isEmployee) {
      // Direct to employee welcome path
      navigate("/app/employee-welcome", {
        state: {
          ...currentState,
          preventTutorial: true,
          fromMainMenu: true,
          returnToMain: true,
          previousPath: currentPath
        }
      });
    } else {
      // For non-assessment features
      navigate(finalPath, { 
        state: { 
          ...currentState,
          fromMainMenu: true,
          screenState: currentScreenState,
          preventTutorial: true,
          returnToMain: true,
          previousPath: currentPath
        } 
      });
    }
  };

  return { handleNavigate };
};
