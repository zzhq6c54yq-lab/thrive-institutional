import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  Home, 
  Stethoscope, 
  Heart, 
  DollarSign, 
  Play, 
  Info, 
  Mail,
  Smartphone,
  X,
  ChevronDown,
  ChevronRight,
  Shield,
  GraduationCap,
  Briefcase,
  Siren,
  UtensilsCrossed,
  Truck,
  BookOpen,
  BadgeCheck,
  Baby,
  Sunset,
  Activity,
  Sparkles
} from "lucide-react";
import { cn } from "@/lib/utils";
import thriveOutlineLogoImage from "@/assets/thrivemt-outline-logo.png";

interface SiteSidebarProps {
  collapsed?: boolean;
  isOpen?: boolean;
  onClose?: () => void;
}

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
  const [deploymentsExpanded, setDeploymentsExpanded] = useState(false);

  const navSections = [
    {
      title: "SERVICES",
      items: [
        { icon: Stethoscope, label: "Therapy", path: "/therapy" },
        { icon: Heart, label: "Coaching", path: "/coaching" },
        { icon: Play, label: "Meet Henry", path: "/henry" },
      ]
    },
    {
      title: "PRICING",
      items: [
        { icon: DollarSign, label: "Plans", path: "/pricing" },
      ]
    },
    {
      title: "EXPLORE",
      items: [
        { icon: Smartphone, label: "The App", path: "/the-app" },
        { icon: Play, label: "Live Demo", path: "/demo" },
      ]
    },
    {
      title: "COMPANY",
      items: [
        { icon: Info, label: "About Us", path: "/about" },
        { icon: Mail, label: "Contact", path: "/contact" },
      ]
    }
  ];

  const scrollToDeployment = (deploymentId: string) => {
    // Navigate to home if not already there
    if (location.pathname !== "/home") {
      window.location.href = `/home#deployment-models`;
      return;
    }
    
    const element = document.getElementById("deployment-models");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
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

        {/* Home Link */}
        <Link to="/home">
          <div
            className={cn(
              "flex items-center gap-3 px-4 py-3 rounded-lg mb-4 transition-colors",
              location.pathname === "/home"
                ? "bg-bronze-500/10 text-bronze-400" 
                : "text-muted-foreground hover:text-bronze-400 hover:bg-bronze-500/5"
            )}
          >
            <Home className="w-5 h-5" />
            {!collapsed && <span className="font-medium">Home</span>}
          </div>
        </Link>

        {/* Navigation Sections */}
        {navSections.map((section, idx) => (
          <div key={idx} className="mb-4">
            {!collapsed && (
              <div className="text-xs font-bold text-muted-foreground/60 mb-2 px-4 uppercase tracking-wider">
                {section.title}
              </div>
            )}
            <div className="space-y-1">
              {section.items.map((item) => (
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
          </div>
        ))}

        {/* Deployments Section - Collapsible */}
        <div className="mb-4">
          {!collapsed && (
            <button
              onClick={() => setDeploymentsExpanded(!deploymentsExpanded)}
              className="w-full flex items-center justify-between text-xs font-bold text-muted-foreground/60 mb-2 px-4 uppercase tracking-wider hover:text-bronze-400 transition-colors"
            >
              <span>Deployments</span>
              {deploymentsExpanded ? (
                <ChevronDown className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
            </button>
          )}
          
          {deploymentsExpanded && !collapsed && (
            <div className="space-y-0.5 max-h-64 overflow-y-auto">
              {deploymentItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToDeployment(item.id)}
                  className="w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-colors text-muted-foreground hover:text-bronze-400 hover:bg-bronze-500/5"
                >
                  <item.icon className="w-4 h-4" />
                  <span className="font-medium text-xs">{item.label}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

export default SiteSidebar;
