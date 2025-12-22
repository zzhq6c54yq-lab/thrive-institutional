import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";

const CALENDLY_PLACEHOLDER = "https://calendly.com/thrivemt/demo";

const InstitutionalCTA = () => {
  return (
    <section className="py-24 px-6 bg-gradient-to-b from-background to-card/30">
      <div className="container mx-auto max-w-3xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
            Let's Design a Deployment That Fits Your System
          </h2>
          <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
            ThriveMT works with institutions to design pilot programs that are 
            measurable, minimally disruptive, and scalable.
          </p>
          <a href={CALENDLY_PLACEHOLDER} target="_blank" rel="noopener noreferrer">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-bronze-500 to-bronze-600 hover:from-bronze-600 hover:to-bronze-700 text-background font-semibold text-lg px-10 gap-2"
            >
              <Calendar className="w-5 h-5" />
              Request Institutional Demo
            </Button>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default InstitutionalCTA;
