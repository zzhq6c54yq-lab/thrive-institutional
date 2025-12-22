import { Link, useLocation } from "react-router-dom";
import { 
  Smartphone,
  Info,
  Briefcase,
  Play,
  Bot,
  Mail,
  X,
  Shield,
  GraduationCap,
  Siren,
  UtensilsCrossed,
  Truck,
  BookOpen,
  BadgeCheck,
  Heart,
  Baby,
  Sunset,
  Activity,
  Sparkles
} from "lucide-react";
import { cn } from "@/lib/utils";
import thriveOutlineLogoImage from "@/assets/thrivemt-outline-logo.png";
import { useDeployment } from "@/contexts/DeploymentContext";

interface SiteSidebarProps {
  collapsed?: boolean;
  isOpen?: boolean;
  onClose?: () => void;
}

const coreNavItems = [
  { icon: Smartphone, label: "The App", path: "/the-app" },
  { icon: Info, label: "About Us", path: "/about" },
  { icon: Briefcase, label: "What We Offer", path: "/what-we-offer" },
  { icon: Play, label: "Live Demo", path: "/demo" },
  { icon: Bot, label: "Meet Henry", path: "/henry" },
  { icon: Mail, label: "Contact", path: "/contact" },
];

const deploymentItems = [
  { icon: Shield, label: "Military & Veterans", id: "military-veterans" },
  { icon: GraduationCap, label: "College Experience", id: "college-experience" },
  { icon: Briefcase, label: "Small Business", id: "small-business" },
  { icon: Siren, label: "First Responders", id: "first-responders" },
  { icon: UtensilsCrossed, label: "Hospitality", id: "hospitality" },
  { icon: Truck, label: "Transport", id: "transport" },
  { icon: BookOpen, label: "Educators", id: "educators" },
  { icon: BadgeCheck, label: "Law Enforcement", id: "law-enforcement" },
  { icon: Heart, label: "Cancer Support", id: "cancer-support" },
  { icon: Baby, label: "Single Parents", id: "single-parents" },
  { icon: Sunset, label: "Golden Years", id: "golden-years" },
  { icon: Activity, label: "Chronic Illness", id: "chronic-illness" },
  { icon: Sparkles, label: "Adolescence", id: "adolescence" },
];

const SiteSidebar = ({ collapsed = false, isOpen = false, onClose }: SiteSidebarProps) => {
  const location = useLocation();
  const { activePopulation, setActivePopulationById } = useDeployment();

  const handleDeploymentClick = (deploymentId: string) => {
    // Set the active population
    setActivePopulationById(deploymentId);
    
    // Navigate to home and scroll to deployments section if not already there
    if (location.pathname !== "/home" && location.pathname !== "/") {
      window.location.href = `/home#deployment-models`;
    } else {
      const element = document.getElementById("deployment-models");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
    
    if (onClose) onClose();
  };

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 h-screen bg-background border-r border-bronze-500/20 z-40 overflow-y-auto",
        "-translate-x-full transition-transform duration-300 ease-out",
        isOpen && "translate-x-0",
        "md:translate-x-0",
        collapsed ? "w-20" : "w-64"
      )}
    >
      {/* Close button for mobile */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 md:hidden p-2 rounded-lg hover:bg-bronze-500/10 transition-colors"
        aria-label="Close menu"
      >
        <X className="w-5 h-5 text-bronze-400" />
      </button>

      <div className="p-6 pt-16 md:pt-6">
        {/* Logo */}
        <Link to="/home" className="flex items-center gap-3 mb-8">
          <img 
            src={thriveOutlineLogoImage} 
            alt="ThriveMT" 
            className="w-10 h-10"
            style={{ filter: 'drop-shadow(0 0 8px rgba(212,165,116,0.3))' }}
          />
          {!collapsed && (
            <span 
              className="text-2xl font-bold"
              style={{
                background: 'linear-gradient(135deg, #E8D4C0 0%, #D4A574 50%, #B87333 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              ThriveMT
            </span>
          )}
        </Link>

        {/* Core Navigation */}
        <div className="space-y-1 mb-6">
          {coreNavItems.map((item) => (
            <Link key={item.path} to={item.path}>
              <div
                className={cn(
                  "flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors",
                  location.pathname === item.path 
                    ? "bg-bronze-500/10 text-bronze-400" 
                    : "text-muted-foreground hover:text-bronze-400 hover:bg-bronze-500/5"
                )}
              >
                <item.icon className="w-5 h-5" />
                {!collapsed && <span className="font-medium text-sm">{item.label}</span>}
              </div>
            </Link>
          ))}
        </div>

        {/* Deployments Section - Always Visible */}
        <div className="pt-4 border-t border-border/30">
          {!collapsed && (
            <div className="text-xs font-bold text-muted-foreground/60 mb-3 px-4 uppercase tracking-wider">
              Deployments
            </div>
          )}
          
          <div className="space-y-0.5">
            {deploymentItems.map((item) => {
              const isActive = activePopulation.id === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleDeploymentClick(item.id)}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-colors",
                    isActive 
                      ? "bg-bronze-500/15 text-bronze-400 border-l-2 border-bronze-500" 
                      : "text-muted-foreground hover:text-bronze-400 hover:bg-bronze-500/5"
                  )}
                >
                  <item.icon className={cn("w-4 h-4", isActive && "text-bronze-400")} />
                  {!collapsed && <span className={cn("font-medium text-xs", isActive && "font-semibold")}>{item.label}</span>}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </aside>
  );
};

export default SiteSidebar;
