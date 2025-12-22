
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface PortalBackButtonProps {
  returnPath: string;
  onClick?: () => void; // Optional onClick prop
}

const PortalBackButton: React.FC<PortalBackButtonProps> = ({ returnPath, onClick }) => {
  const navigate = useNavigate();
  
  const handleBackNavigation = () => {
    // If onClick is provided, call it first
    if (onClick) {
      onClick();
      return;
    }
    
    // Ensure path has /app prefix for app routes
    let targetPath = returnPath;
    if (!returnPath.startsWith('/app') && !returnPath.startsWith('/home') && !returnPath.startsWith('/therapy') && 
        !returnPath.startsWith('/coaching') && !returnPath.startsWith('/pricing') && returnPath !== '/') {
      targetPath = `/app${returnPath.startsWith('/') ? returnPath : `/${returnPath}`}`;
    }
    
    // Otherwise use default navigation behavior
    navigate(targetPath, { 
      state: { 
        stayInPortal: true,
        preventTutorial: true
      } 
    });
  };
  
  return (
    <Button
      variant="ghost" 
      size="sm" 
      className="gap-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
      onClick={handleBackNavigation}
    >
      <ArrowLeft className="h-4 w-4" />
      <span>Back</span>
    </Button>
  );
};

export default PortalBackButton;
