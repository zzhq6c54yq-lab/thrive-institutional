import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Linkedin, Twitter, Mail } from "lucide-react";
import thriveOutlineLogoImage from "@/assets/thrivemt-outline-logo.png";

const CALENDLY_PLACEHOLDER = "https://calendly.com/thrivemt/demo";

const SiteFooter = () => {
  return (
    <footer className="bg-black border-t border-bronze-500/20 mt-20" role="contentinfo">
      <div className="container mx-auto px-4 md:px-6 py-12 md:py-16">
        
        {/* Top Section: Branding + CTA */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8 mb-12">
          {/* Branding */}
          <div className="max-w-sm">
            <div className="flex items-center gap-3 mb-3">
              <img 
                src={thriveOutlineLogoImage} 
                alt="ThriveMT Logo" 
                className="w-10 h-10 md:w-12 md:h-12"
                width={48}
                height={48}
                loading="lazy"
                style={{ filter: 'drop-shadow(0 0 10px rgba(212,165,116,0.35))' }}
              />
              <h3 
                className="text-xl md:text-2xl font-bold"
                style={{
                  background: 'linear-gradient(135deg, #E8D4C0 0%, #D4A574 50%, #B87333 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                ThriveMT
              </h3>
            </div>
            <p className="text-white/50 text-sm leading-relaxed mb-4">
              Institutional Mental Health Infrastructure
            </p>
            <p className="text-white/40 text-xs leading-relaxed">
              Scalable 3-layer care for organizations committed to workforce wellbeing.
            </p>
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <Button
              size="sm"
              onClick={() => window.open(CALENDLY_PLACEHOLDER, "_blank")}
              className="bg-bronze-500 hover:bg-bronze-600 text-black font-medium px-6"
            >
              Request Demo
            </Button>
            <Button
              variant="outline"
              size="sm"
              asChild
              className="border-bronze-500/30 text-bronze-400 hover:bg-bronze-500/10 hover:border-bronze-500/50 px-6"
            >
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>

        {/* Separator */}
        <div className="border-t border-bronze-500/10 mb-10" role="separator" aria-hidden="true" />
        
        {/* Links Grid */}
        <nav className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6 mb-12" aria-label="Footer navigation">
          
          {/* Platform */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm tracking-wide uppercase">Platform</h4>
            <ul className="space-y-2.5 text-sm" role="list">
              <li>
                <Link to="/the-app" className="text-white/50 hover:text-bronze-400 transition-colors focus:outline-none focus:ring-2 focus:ring-bronze-500/50 rounded-sm">
                  The App
                </Link>
              </li>
              <li>
                <Link to="/what-we-offer" className="text-white/50 hover:text-bronze-400 transition-colors focus:outline-none focus:ring-2 focus:ring-bronze-500/50 rounded-sm">
                  What We Offer
                </Link>
              </li>
              <li>
                <Link to="/demo" className="text-white/50 hover:text-bronze-400 transition-colors focus:outline-none focus:ring-2 focus:ring-bronze-500/50 rounded-sm">
                  Live Demo
                </Link>
              </li>
              <li>
                <Link to="/henry" className="text-white/50 hover:text-bronze-400 transition-colors focus:outline-none focus:ring-2 focus:ring-bronze-500/50 rounded-sm">
                  Meet Henry
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm tracking-wide uppercase">Company</h4>
            <ul className="space-y-2.5 text-sm" role="list">
              <li>
                <Link to="/about" className="text-white/50 hover:text-bronze-400 transition-colors focus:outline-none focus:ring-2 focus:ring-bronze-500/50 rounded-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-white/50 hover:text-bronze-400 transition-colors focus:outline-none focus:ring-2 focus:ring-bronze-500/50 rounded-sm">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/investors" className="text-white/50 hover:text-bronze-400 transition-colors focus:outline-none focus:ring-2 focus:ring-bronze-500/50 rounded-sm">
                  Investors
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-white/50 hover:text-bronze-400 transition-colors focus:outline-none focus:ring-2 focus:ring-bronze-500/50 rounded-sm">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Deployments */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm tracking-wide uppercase">Deployments</h4>
            <ul className="space-y-2.5 text-sm" role="list">
              <li>
                <Link to="/home#deployment-models" className="text-white/50 hover:text-bronze-400 transition-colors focus:outline-none focus:ring-2 focus:ring-bronze-500/50 rounded-sm">
                  Military & Veterans
                </Link>
              </li>
              <li>
                <Link to="/home#deployment-models" className="text-white/50 hover:text-bronze-400 transition-colors focus:outline-none focus:ring-2 focus:ring-bronze-500/50 rounded-sm">
                  College Experience
                </Link>
              </li>
              <li>
                <Link to="/home#deployment-models" className="text-white/50 hover:text-bronze-400 transition-colors focus:outline-none focus:ring-2 focus:ring-bronze-500/50 rounded-sm">
                  Small Business
                </Link>
              </li>
              <li>
                <Link to="/home#deployment-models" className="text-white/50 hover:text-bronze-400 transition-colors focus:outline-none focus:ring-2 focus:ring-bronze-500/50 rounded-sm">
                  First Responders
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm tracking-wide uppercase">Legal</h4>
            <ul className="space-y-2.5 text-sm" role="list">
              <li>
                <Link to="/privacy" className="text-white/50 hover:text-bronze-400 transition-colors focus:outline-none focus:ring-2 focus:ring-bronze-500/50 rounded-sm">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-white/50 hover:text-bronze-400 transition-colors focus:outline-none focus:ring-2 focus:ring-bronze-500/50 rounded-sm">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/hipaa" className="text-white/50 hover:text-bronze-400 transition-colors focus:outline-none focus:ring-2 focus:ring-bronze-500/50 rounded-sm">
                  HIPAA Notice
                </Link>
              </li>
              <li>
                <Link to="/home#compliance" className="text-white/50 hover:text-bronze-400 transition-colors focus:outline-none focus:ring-2 focus:ring-bronze-500/50 rounded-sm">
                  Security
                </Link>
              </li>
            </ul>
          </div>
        </nav>

        {/* Bottom Section */}
        <div className="border-t border-bronze-500/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-xs">
            © 2025 ThriveMT. All rights reserved.
          </p>
          
          {/* Social Links */}
          <div className="flex items-center gap-4">
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white/40 hover:text-bronze-400 transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a 
              href="https://twitter.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white/40 hover:text-bronze-400 transition-colors"
              aria-label="Twitter"
            >
              <Twitter className="w-5 h-5" />
            </a>
            <a 
              href="mailto:hello@thrivemt.com"
              className="text-white/40 hover:text-bronze-400 transition-colors"
              aria-label="Email"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;
