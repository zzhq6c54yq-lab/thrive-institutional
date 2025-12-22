import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowDown, Calendar, Users, Clock, Shield, TrendingUp } from "lucide-react";

const CALENDLY_PLACEHOLDER = "https://calendly.com/thrivemt/demo";

const stats = [
  { icon: Users, value: "50K+", label: "Lives Supported" },
  { icon: Clock, value: "24/7", label: "Availability" },
  { icon: Shield, value: "100%", label: "HIPAA Compliant" },
  { icon: TrendingUp, value: "40%", label: "Cost Reduction" },
];

const InstitutionalHero = () => {
  const scrollToDeployments = () => {
    const element = document.getElementById("deployment-models");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative py-28 md:py-40 px-6 overflow-hidden bg-background">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-bronze-500/5 via-transparent to-transparent" />
      
      {/* Animated accent lines */}
      <motion.div 
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-bronze-500 to-transparent"
      />
      
      {/* Background texture */}
      <div className="absolute inset-0 bronze-texture opacity-20" />
      
      {/* Radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-bronze-500/5 rounded-full blur-3xl" />

      {/* Content */}
      <div className="container mx-auto relative z-10 text-center max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-bronze-500/40 bg-bronze-500/10 mb-10"
        >
          <div className="w-2 h-2 rounded-full bg-bronze-400 animate-pulse" />
          <span className="text-bronze-400 text-sm font-semibold tracking-wide uppercase">
            Enterprise Mental Health Platform
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 leading-[1.1]"
        >
          <span className="text-foreground">
            Deploy Mental Health
          </span>
          <br />
          <span className="bg-gradient-to-r from-bronze-300 via-bronze-500 to-bronze-600 bg-clip-text text-transparent">
            At Institutional Scale
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl md:text-2xl text-muted-foreground mb-12 leading-relaxed max-w-4xl mx-auto"
        >
          AI triage. Licensed therapists. Certified coaches. One integrated platform 
          with unified oversight, compliance infrastructure, and measurable outcomes.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
        >
          <a href={CALENDLY_PLACEHOLDER} target="_blank" rel="noopener noreferrer">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-bronze-500 to-bronze-600 hover:from-bronze-600 hover:to-bronze-700 text-background font-bold text-lg px-10 py-6 gap-3 shadow-lg shadow-bronze-500/20 hover:shadow-bronze-500/30 transition-shadow"
            >
              <Calendar className="w-5 h-5" />
              Schedule Demo
            </Button>
          </a>
          <Button 
            size="lg" 
            variant="outline"
            onClick={scrollToDeployments}
            className="border-bronze-500/40 text-bronze-400 hover:bg-bronze-500/10 hover:text-bronze-300 font-bold text-lg px-10 py-6 gap-3"
          >
            See Deployment Models
            <ArrowDown className="w-5 h-5" />
          </Button>
        </motion.div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-4xl mx-auto pt-8 border-t border-border/30"
        >
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 + idx * 0.1 }}
              className="flex flex-col items-center gap-2"
            >
              <div className="flex items-center gap-2">
                <stat.icon className="w-5 h-5 text-bronze-400" />
                <span className="text-2xl md:text-3xl font-bold text-foreground">
                  {stat.value}
                </span>
              </div>
              <span className="text-sm text-muted-foreground font-medium">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default InstitutionalHero;
