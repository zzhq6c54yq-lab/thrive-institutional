import { Link } from "react-router-dom";
import thriveOutlineLogoImage from "@/assets/thrivemt-outline-logo.png";

const SiteFooter = () => {
  return (
    <footer className="bg-black border-t border-[#D4A574]/30 mt-20" role="contentinfo">
      <div className="container mx-auto px-4 md:px-6 pt-6 pb-12">
        {/* ThriveMT Branding - Full Width */}
        <div className="flex items-center gap-3 mb-2">
          <img 
            src={thriveOutlineLogoImage} 
            alt="ThriveMT Logo" 
            className="w-8 h-8 md:w-10 md:h-10"
            width={40}
            height={40}
            loading="lazy"
            style={{ filter: 'drop-shadow(0 0 8px rgba(212,165,116,0.3))' }}
          />
          <h3 
            className="text-lg md:text-xl font-bold"
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
        <p className="text-white/60 text-sm mb-6">
          Modern Mental Health & Wellness
        </p>
        
        {/* Separator Line */}
        <div className="border-t border-[#D4A574]/20 mb-8" role="separator" aria-hidden="true"></div>
        
        {/* Link Columns - 3 columns instead of 4 */}
        <nav className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8" aria-label="Footer navigation">

          <div>
            <h4 className="font-semibold text-white mb-3 md:mb-4 text-sm md:text-base">Services</h4>
            <ul className="space-y-2 text-sm" role="list">
              <li>
                <Link to="/therapy" className="text-white/60 hover:text-[#D4A574] transition-colors focus:outline-none focus:ring-2 focus:ring-bronze-500 rounded-sm">
                  Therapy
                </Link>
              </li>
              <li>
                <Link to="/coaching" className="text-white/60 hover:text-[#D4A574] transition-colors focus:outline-none focus:ring-2 focus:ring-bronze-500 rounded-sm">
                  Coaching
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-white/60 hover:text-[#D4A574] transition-colors focus:outline-none focus:ring-2 focus:ring-bronze-500 rounded-sm">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="/demo" className="text-white/60 hover:text-[#D4A574] transition-colors focus:outline-none focus:ring-2 focus:ring-bronze-500 rounded-sm">
                  Try Demo
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-3 md:mb-4 text-sm md:text-base">Company</h4>
            <ul className="space-y-2 text-sm" role="list">
              <li>
                <Link to="/about" className="text-white/60 hover:text-[#D4A574] transition-colors focus:outline-none focus:ring-2 focus:ring-bronze-500 rounded-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-white/60 hover:text-[#D4A574] transition-colors focus:outline-none focus:ring-2 focus:ring-bronze-500 rounded-sm">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/investors" className="text-white/60 hover:text-[#D4A574] transition-colors focus:outline-none focus:ring-2 focus:ring-bronze-500 rounded-sm">
                  Investors
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-white/60 hover:text-[#D4A574] transition-colors focus:outline-none focus:ring-2 focus:ring-bronze-500 rounded-sm">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-3 md:mb-4 text-sm md:text-base">Legal</h4>
            <ul className="space-y-2 text-sm" role="list">
              <li>
                <Link to="/privacy" className="text-white/60 hover:text-[#D4A574] transition-colors focus:outline-none focus:ring-2 focus:ring-bronze-500 rounded-sm">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-white/60 hover:text-[#D4A574] transition-colors focus:outline-none focus:ring-2 focus:ring-bronze-500 rounded-sm">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/hipaa" className="text-white/60 hover:text-[#D4A574] transition-colors focus:outline-none focus:ring-2 focus:ring-bronze-500 rounded-sm">
                  HIPAA Notice
                </Link>
              </li>
            </ul>
          </div>
        </nav>

        <div className="mt-8 pt-8 border-t border-[#D4A574]/30 text-center text-xs md:text-sm text-white/60">
          <p>© 2025 ThriveMT. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;
