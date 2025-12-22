import { motion } from "framer-motion";
import { Brain, Users, BarChart3 } from "lucide-react";
import { Card } from "@/components/ui/card";

const pillars = [
  {
    icon: Brain,
    title: "Guided Access",
    features: [
      "AI-supported intake and triage",
      "Reduced wait times",
      "Stigma-free entry into care",
    ],
  },
  {
    icon: Users,
    title: "Layered Support",
    features: [
      "Coaches for early intervention",
      "Licensed therapists for clinical escalation",
      "Continuity across the care journey",
    ],
  },
  {
    icon: BarChart3,
    title: "Institutional Oversight",
    features: [
      "Centralized reporting",
      "Outcome visibility",
      "Administrative transparency",
    ],
  },
];

const HowItWorks = () => {
  return (
    <section className="py-20 px-6 bg-background">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-bronze-400 to-bronze-600 bg-clip-text text-transparent">
            How the Platform Works
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A three-pillar approach that ensures clinical quality, operational efficiency, and measurable outcomes.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pillars.map((pillar, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * idx }}
            >
              <Card className="h-full p-8 bg-card border-border/50 hover:border-bronze-500/30 transition-all duration-300 group">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-bronze-500/20 to-bronze-600/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <pillar.icon className="w-7 h-7 text-bronze-400" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-4">{pillar.title}</h3>
                <ul className="space-y-3">
                  {pillar.features.map((feature, featureIdx) => (
                    <li key={featureIdx} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-bronze-500 mt-2 flex-shrink-0" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
