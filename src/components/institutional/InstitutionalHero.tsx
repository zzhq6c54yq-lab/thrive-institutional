import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowDown, Calendar } from "lucide-react";

const CALENDLY_PLACEHOLDER = "https://calendly.com/thrivemt/demo";

const InstitutionalHero = () => {
  const scrollToDeployments = () => {
    const element = document.getElementById("deployment-models");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative py-24 md:py-32 px-6 overflow-hidden bg-background">
      {/* Subtle accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-bronze-500 to-transparent opacity-40" />
      
      {/* Background texture */}
      <div className="absolute inset-0 bronze-texture opacity-30" />

      {/* Content */}
      <div className="container mx-auto relative z-10 text-center max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-bronze-500/30 bg-bronze-500/5 mb-8"
        >
          <span className="text-bronze-400 text-sm font-medium tracking-wide uppercase">
            Institutional & Enterprise Solutions
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 pb-2 leading-tight"
        >
          <span className="bg-gradient-to-r from-bronze-300 via-bronze-500 to-bronze-600 bg-clip-text text-transparent">
            Mental Health Infrastructure
          </span>
          <br />
          <span className="text-foreground/90">
            That Adapts to Real-World Systems
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg md:text-xl text-muted-foreground mb-10 leading-relaxed max-w-3xl mx-auto"
        >
          ThriveMT partners with institutions to deploy scalable, compliant, and 
          population-specific mental health support—without adding operational burden.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a href={CALENDLY_PLACEHOLDER} target="_blank" rel="noopener noreferrer">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-bronze-500 to-bronze-600 hover:from-bronze-600 hover:to-bronze-700 text-background font-semibold text-lg px-8 gap-2"
            >
              <Calendar className="w-5 h-5" />
              Request Institutional Demo
            </Button>
          </a>
          <Button 
            size="lg" 
            variant="outline"
            onClick={scrollToDeployments}
            className="border-bronze-500/40 text-bronze-400 hover:bg-bronze-500/10 hover:text-bronze-300 font-semibold text-lg px-8 gap-2"
          >
            Explore Deployment Models
            <ArrowDown className="w-5 h-5" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default InstitutionalHero;
