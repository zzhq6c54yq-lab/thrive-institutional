import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Shield, Clock, Layers } from "lucide-react";
import headLogo from "@/assets/thrivemt-head-logo.png";

const trustIndicators = [
  { icon: Shield, label: "HIPAA Compliant" },
  { icon: Clock, label: "24/7 Availability" },
  { icon: Layers, label: "3-Layer Model" },
];

const SiteEntry = () => {
  const navigate = useNavigate();
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStage(1), 150),    // "ThriveMT" fades in - faster
      setTimeout(() => setStage(2), 600),    // Logo fades in - faster
      setTimeout(() => setStage(3), 1200),   // Headline fades in - faster
      setTimeout(() => setStage(4), 1800),   // Tagline fades in - faster
      setTimeout(() => setStage(5), 2300),   // Trust indicators + buttons - faster
    ];
    
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="min-h-screen bg-black relative overflow-hidden flex items-center justify-center">
      {/* Subtle grid background */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(212, 165, 116, 0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(212, 165, 116, 0.5) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px'
        }}
      />

      {/* Radial glow */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(184, 115, 51, 0.08) 0%, transparent 60%)'
        }}
      />

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center gap-6 px-6 max-w-4xl mx-auto">
        
        {/* ThriveMT Text Logo - Larger & More Impactful */}
        <div className="relative flex items-baseline gap-0">
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: stage >= 1 ? 1 : 0, scale: stage >= 1 ? 1 : 0.9 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight text-white"
          >
            Thrive
          </motion.span>

          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: stage >= 1 ? 1 : 0, scale: stage >= 1 ? 1 : 0.9 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight mt-glow"
            style={{
              background: 'linear-gradient(135deg, #B87333 0%, #D4A574 50%, #D4AF37 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            MT
          </motion.span>
        </div>

        {/* Logo with orbiting dots */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ 
            opacity: stage >= 2 ? 1 : 0,
            scale: stage >= 2 ? 1 : 0.9,
          }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative w-[9rem] h-[9rem] md:w-[11rem] md:h-[11rem] logo-container"
        >
          <img 
            src={headLogo}
            alt="ThriveMT Head Logo"
            className="w-full h-full object-contain logo-tracer"
          />
          
          {/* Orbiting dots */}
          <div className="orbit-dot dot-1"></div>
          <div className="orbit-dot dot-2"></div>
          <div className="orbit-dot dot-3"></div>
          <div className="orbit-dot dot-4"></div>
          <div className="orbit-dot dot-5"></div>
          <div className="orbit-dot dot-6"></div>
        </motion.div>

        {/* Institutional Headline - Larger & Bolder */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: stage >= 3 ? 1 : 0, y: stage >= 3 ? 0 : 15 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-3xl md:text-5xl lg:text-6xl font-bold text-center leading-tight tracking-tight"
          style={{
            background: 'linear-gradient(135deg, #FFFFFF 0%, #E8D4C0 40%, #D4A574 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          Institutional Mental Health Infrastructure
        </motion.h1>

        {/* Tagline - Larger */}
        <motion.p
          initial={{ opacity: 0, letterSpacing: '0.3em' }}
          animate={{ opacity: stage >= 4 ? 1 : 0, letterSpacing: stage >= 4 ? '0.25em' : '0.3em' }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-xl md:text-2xl lg:text-3xl text-white/70 font-semibold tracking-widest text-center uppercase"
        >
          Scalable. Compliant. Measurable.
        </motion.p>

        {/* Trust Indicators - Larger & Animated */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: stage >= 5 ? 1 : 0, y: stage >= 5 ? 0 : 10 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="flex flex-wrap items-center justify-center gap-6 md:gap-10 mt-4"
        >
          {trustIndicators.map((item, idx) => (
            <motion.div 
              key={idx} 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: stage >= 5 ? 1 : 0, scale: stage >= 5 ? 1 : 0.8 }}
              transition={{ duration: 0.3, delay: idx * 0.1, ease: "easeOut" }}
              className="flex items-center gap-3 text-white/60 text-base md:text-lg trust-indicator"
            >
              <div className="p-2 rounded-lg bg-bronze-500/10 border border-bronze-500/20">
                <item.icon className="w-5 h-5 md:w-6 md:h-6 text-bronze-400" />
              </div>
              <span className="font-medium">{item.label}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: stage >= 5 ? 1 : 0, y: stage >= 5 ? 0 : 10 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center gap-4 mt-4"
        >
          <Button
            size="lg"
            onClick={() => navigate("/home")}
            className="relative overflow-hidden text-black font-semibold text-base px-10 py-6 rounded-lg min-w-[180px]"
            style={{
              background: 'linear-gradient(90deg, #B87333 0%, #D4A574 15%, #FFFFFF 40%, #FFFFFF 60%, #D4A574 85%, #B87333 100%)',
              backgroundSize: '300% 100%',
              animation: 'light-sweep 8s ease-in-out infinite',
            }}
          >
            Explore Platform
          </Button>
          
          <Button
            variant="outline"
            size="lg"
            onClick={() => window.open("https://calendly.com/thrivemt/demo", "_blank")}
            className="text-bronze-400 border-bronze-500/30 hover:bg-bronze-500/10 hover:border-bronze-500/50 font-medium text-base px-10 py-6 rounded-lg min-w-[180px]"
          >
            Request Demo
          </Button>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: stage >= 5 ? 1 : 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
          className="text-sm text-white/30 text-center mt-2 max-w-md"
        >
          Partner with ThriveMT to deliver 3-layer mental health support across your organization
        </motion.p>
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes light-sweep {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }

        .mt-glow {
          animation: mt-glow-pulse 2.5s ease-in-out infinite;
        }

        @keyframes mt-glow-pulse {
          0%, 100% { 
            text-shadow: 0 0 20px #B87333, 0 0 40px #D4A574;
            filter: brightness(1);
          }
          50% { 
            text-shadow: 0 0 40px #D4AF37, 0 0 80px #D4A574, 0 0 120px #B87333;
            filter: brightness(1.15);
          }
        }

        .logo-tracer {
          filter: drop-shadow(0 0 12px rgba(212, 165, 116, 0.35));
        }

        .logo-container {
          position: relative;
        }

        .orbit-dot {
          position: absolute;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          top: 50%;
          left: 50%;
          transform-origin: center;
        }

        .orbit-dot::after {
          content: '';
          position: absolute;
          width: 24px;
          height: 3px;
          border-radius: 50%;
          top: 50%;
          left: 50%;
          transform: translateY(-50%);
          filter: blur(2px);
          opacity: 0.5;
        }

        .dot-1 {
          background: #FFFFFF;
          box-shadow: 0 0 8px #FFFFFF, 0 0 16px #FFFFFF;
          animation: orbit-1 6s linear infinite;
        }
        .dot-1::after {
          background: linear-gradient(90deg, transparent, #FFFFFF);
          animation: trail-rotate-1 6s linear infinite;
        }

        .dot-2 {
          background: #B87333;
          box-shadow: 0 0 8px #B87333, 0 0 16px #D4A574;
          animation: orbit-2 6s linear infinite;
        }
        .dot-2::after {
          background: linear-gradient(90deg, transparent, #B87333);
          animation: trail-rotate-2 6s linear infinite;
        }

        .dot-3 {
          background: #D4AF37;
          box-shadow: 0 0 6px #D4AF37, 0 0 12px #D4AF37;
          animation: orbit-3 8s linear infinite;
        }
        .dot-3::after {
          background: linear-gradient(90deg, transparent, #D4AF37);
          animation: trail-rotate-3 8s linear infinite;
        }

        .dot-4 {
          background: #E8D4C0;
          box-shadow: 0 0 6px #E8D4C0, 0 0 12px #FFFFFF;
          animation: orbit-4 8s linear infinite;
        }
        .dot-4::after {
          background: linear-gradient(90deg, transparent, #E8D4C0);
          animation: trail-rotate-4 8s linear infinite;
        }

        .dot-5 {
          background: #D4A574;
          box-shadow: 0 0 5px #D4A574, 0 0 10px #B87333;
          animation: orbit-5 4s linear infinite;
        }
        .dot-5::after {
          background: linear-gradient(90deg, transparent, #D4A574);
          animation: trail-rotate-5 4s linear infinite;
        }

        .dot-6 {
          background: #FFFFFF;
          box-shadow: 0 0 5px #FFFFFF, 0 0 10px #E8D4C0;
          animation: orbit-6 4s linear infinite;
        }
        .dot-6::after {
          background: linear-gradient(90deg, transparent, #FFFFFF);
          animation: trail-rotate-6 4s linear infinite;
        }

        @keyframes orbit-1 {
          0% { transform: rotate(0deg) translateX(85px) rotate(0deg); }
          100% { transform: rotate(360deg) translateX(85px) rotate(-360deg); }
        }
        @keyframes trail-rotate-1 {
          0% { transform: translateY(-50%) rotate(180deg); }
          100% { transform: translateY(-50%) rotate(-180deg); }
        }

        @keyframes orbit-2 {
          0% { transform: rotate(180deg) translateX(85px) rotate(-180deg); }
          100% { transform: rotate(-180deg) translateX(85px) rotate(180deg); }
        }
        @keyframes trail-rotate-2 {
          0% { transform: translateY(-50%) rotate(0deg); }
          100% { transform: translateY(-50%) rotate(360deg); }
        }

        @keyframes orbit-3 {
          0% { transform: rotate(90deg) translateX(65px) rotate(-90deg); }
          100% { transform: rotate(450deg) translateX(65px) rotate(-450deg); }
        }
        @keyframes trail-rotate-3 {
          0% { transform: translateY(-50%) rotate(180deg); }
          100% { transform: translateY(-50%) rotate(-180deg); }
        }

        @keyframes orbit-4 {
          0% { transform: rotate(270deg) translateX(65px) rotate(-270deg); }
          100% { transform: rotate(-90deg) translateX(65px) rotate(90deg); }
        }
        @keyframes trail-rotate-4 {
          0% { transform: translateY(-50%) rotate(0deg); }
          100% { transform: translateY(-50%) rotate(360deg); }
        }

        @keyframes orbit-5 {
          0% { transform: rotate(45deg) translateX(48px) rotate(-45deg); }
          100% { transform: rotate(405deg) translateX(48px) rotate(-405deg); }
        }
        @keyframes trail-rotate-5 {
          0% { transform: translateY(-50%) rotate(180deg); }
          100% { transform: translateY(-50%) rotate(-180deg); }
        }

        @keyframes orbit-6 {
          0% { transform: rotate(225deg) translateX(48px) rotate(-225deg); }
          100% { transform: rotate(-135deg) translateX(48px) rotate(135deg); }
        }
        @keyframes trail-rotate-6 {
          0% { transform: translateY(-50%) rotate(0deg); }
          100% { transform: translateY(-50%) rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default SiteEntry;
