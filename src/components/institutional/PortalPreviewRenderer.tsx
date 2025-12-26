import React, { Suspense, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Loader2, Monitor, Smartphone } from "lucide-react";

// Lazy load all portal components
const DoDWelcome = React.lazy(() => import("@/pages/DoDWelcome"));
const DoDPortal = React.lazy(() => import("@/pages/DoDPortal"));
const CollegeWelcome = React.lazy(() => import("@/pages/CollegeWelcome"));
const CollegePortal = React.lazy(() => import("@/pages/CollegePortal"));
const SmallBusinessWelcome = React.lazy(() => import("@/pages/SmallBusinessWelcome"));
const SmallBusinessPortal = React.lazy(() => import("@/pages/SmallBusinessPortal"));
const FirstRespondersWelcome = React.lazy(() => import("@/pages/FirstRespondersWelcome"));
const FirstRespondersPortal = React.lazy(() => import("@/pages/FirstRespondersPortal"));
const HospitalityWelcome = React.lazy(() => import("@/pages/HospitalityWelcome"));
const HospitalityPortal = React.lazy(() => import("@/pages/HospitalityPortal"));
const TransportWelcome = React.lazy(() => import("@/pages/TransportWelcome"));
const TransportPortal = React.lazy(() => import("@/pages/TransportPortal"));
const EducatorsWelcome = React.lazy(() => import("@/pages/EducatorsWelcome"));
const EducatorsPortal = React.lazy(() => import("@/pages/EducatorsPortal"));
const LawEnforcementWelcome = React.lazy(() => import("@/pages/LawEnforcementWelcome"));
const LawEnforcementPortal = React.lazy(() => import("@/pages/LawEnforcementPortal"));
const CancerSupportWelcome = React.lazy(() => import("@/pages/CancerSupportWelcome"));
const CancerSupportPortal = React.lazy(() => import("@/pages/CancerSupportPortal"));
const SingleParentsWelcome = React.lazy(() => import("@/pages/SingleParentsWelcome"));
const SingleParentsPortal = React.lazy(() => import("@/pages/SingleParentsPortal"));
const GoldenYearsWelcome = React.lazy(() => import("@/pages/GoldenYearsWelcome"));
const GoldenYearsPortal = React.lazy(() => import("@/pages/GoldenYearsPortal"));
const ChronicIllnessWelcome = React.lazy(() => import("@/pages/ChronicIllnessWelcome"));
const ChronicIllnessPortal = React.lazy(() => import("@/pages/ChronicIllnessPortal"));
const AdolescentWelcome = React.lazy(() => import("@/pages/AdolescentWelcome"));
const AdolescentPortal = React.lazy(() => import("@/pages/AdolescentPortal"));

// Map population IDs to their components
const portalComponentMap: Record<string, {
  welcome: React.LazyExoticComponent<React.FC<{ initialState?: 'welcome' | 'what-to-expect' }>>;
  portal: React.LazyExoticComponent<React.FC<any>>;
}> = {
  "military-veterans": { welcome: DoDWelcome, portal: DoDPortal },
  "college-experience": { welcome: CollegeWelcome, portal: CollegePortal },
  "small-business": { welcome: SmallBusinessWelcome, portal: SmallBusinessPortal },
  "first-responders": { welcome: FirstRespondersWelcome, portal: FirstRespondersPortal },
  "hospitality": { welcome: HospitalityWelcome, portal: HospitalityPortal },
  "transport": { welcome: TransportWelcome, portal: TransportPortal },
  "educators": { welcome: EducatorsWelcome, portal: EducatorsPortal },
  "law-enforcement": { welcome: LawEnforcementWelcome, portal: LawEnforcementPortal },
  "cancer-support": { welcome: CancerSupportWelcome, portal: CancerSupportPortal },
  "single-parents": { welcome: SingleParentsWelcome, portal: SingleParentsPortal },
  "golden-years": { welcome: GoldenYearsWelcome, portal: GoldenYearsPortal },
  "chronic-illness": { welcome: ChronicIllnessWelcome, portal: ChronicIllnessPortal },
  "adolescence": { welcome: AdolescentWelcome, portal: AdolescentPortal },
};

type PreviewTab = 'welcome' | 'features' | 'dashboard';

interface PortalPreviewRendererProps {
  populationId: string;
  populationName: string;
}

const LoadingPlaceholder = () => (
  <div className="absolute inset-0 flex items-center justify-center bg-background/80">
    <Loader2 className="w-8 h-8 animate-spin text-bronze-400" />
  </div>
);

// Wrapper to render a component in preview mode (non-interactive, scaled)
const PreviewWrapper = ({ 
  children, 
  scale = 0.35 
}: { 
  children: React.ReactNode; 
  scale?: number;
}) => {
  return (
    <div 
      className="relative w-full overflow-hidden rounded-lg border border-border/50 bg-black"
      style={{ 
        height: '400px',
      }}
    >
      <div 
        className="absolute inset-0 origin-top-left overflow-hidden"
        style={{
          transform: `scale(${scale})`,
          width: `${100 / scale}%`,
          height: `${100 / scale}%`,
          pointerEvents: 'none',
        }}
      >
        <div className="w-full h-full overflow-auto">
          {children}
        </div>
      </div>
      {/* Device frame overlay */}
      <div className="absolute inset-0 pointer-events-none rounded-lg ring-1 ring-inset ring-white/10" />
    </div>
  );
};

const PortalPreviewRenderer: React.FC<PortalPreviewRendererProps> = ({ 
  populationId, 
  populationName 
}) => {
  const [activeTab, setActiveTab] = React.useState<PreviewTab>('welcome');
  
  const tabs: { key: PreviewTab; label: string; icon: React.ReactNode }[] = [
    { key: 'welcome', label: 'Welcome Screen', icon: <Monitor className="w-4 h-4" /> },
    { key: 'features', label: 'Features', icon: <Smartphone className="w-4 h-4" /> },
    { key: 'dashboard', label: 'Dashboard', icon: <Monitor className="w-4 h-4" /> },
  ];
  
  const components = portalComponentMap[populationId];
  
  // Memoize the preview content to prevent unnecessary re-renders
  const previewContent = useMemo(() => {
    if (!components) {
      return (
        <div className="flex items-center justify-center h-full bg-gradient-to-br from-bronze-500/5 to-bronze-600/10 text-muted-foreground">
          <p>Preview not available for {populationName}</p>
        </div>
      );
    }
    
    const WelcomeComponent = components.welcome;
    const PortalComponent = components.portal;
    
    // For welcome tab, show initial welcome screen
    // For features tab, show the what-to-expect screen
    // For dashboard, we render the Portal component
    if (activeTab === 'welcome') {
      return (
        <Suspense fallback={<LoadingPlaceholder />}>
          <WelcomeComponent initialState="welcome" />
        </Suspense>
      );
    } else if (activeTab === 'features') {
      return (
        <Suspense fallback={<LoadingPlaceholder />}>
          <WelcomeComponent initialState="what-to-expect" />
        </Suspense>
      );
    } else {
      return (
        <Suspense fallback={<LoadingPlaceholder />}>
          <PortalComponent />
        </Suspense>
      );
    }
  }, [components, activeTab, populationName]);
  
  return (
    <div className="space-y-4">
      {/* Tab Navigation */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setActiveTab(tab.key);
            }}
            className={cn(
              "px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all flex items-center gap-2",
              activeTab === tab.key
                ? "bg-bronze-500 text-white shadow-md"
                : "bg-card/50 text-muted-foreground hover:bg-card hover:text-foreground border border-border/50"
            )}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>
      
      {/* Preview Display */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          <PreviewWrapper scale={0.35}>
            {previewContent}
          </PreviewWrapper>
        </motion.div>
      </AnimatePresence>
      
      {/* Preview Label */}
      <p className="text-xs text-muted-foreground text-center">
        Live preview of the {populationName} portal • Click tabs to explore different screens
      </p>
    </div>
  );
};

export default PortalPreviewRenderer;
