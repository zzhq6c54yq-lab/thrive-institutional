import { motion } from "framer-motion";
import { Bot, Heart, Stethoscope, Clock, Users, BarChart3, Shield } from "lucide-react";
import { Card } from "@/components/ui/card";

const portalDeliverables = [
  {
    icon: Bot,
    title: "Henry (AI Layer)",
    items: [
      "24/7 availability",
      "AI-guided check-ins",
      "Immediate engagement",
      "Crisis escalation triggers",
    ],
  },
  {
    icon: Heart,
    title: "Coaching Layer",
    items: [
      "Daily human support",
      "Goal setting & accountability",
      "Stigma-free early intervention",
      "Coach-to-therapist handoff",
    ],
  },
  {
    icon: Stethoscope,
    title: "Therapy Layer",
    items: [
      "Licensed clinical care",
      "CBT, DBT, EMDR, trauma",
      "Diagnosis & treatment",
      "Insurance accepted",
    ],
  },
];

const institutionalBenefits = [
  {
    icon: Clock,
    title: "Reduced Wait Times",
    description: "AI and coaches handle volume, therapists focus on clinical need.",
  },
  {
    icon: BarChart3,
    title: "Measurable Outcomes",
    description: "Built-in engagement and outcome tracking across all service layers.",
  },
  {
    icon: Shield,
    title: "Compliance-Ready",
    description: "HIPAA-aligned, credentialed providers, centralized oversight.",
  },
  {
    icon: Users,
    title: "Scalable Access",
    description: "Same infrastructure serves 50 or 50,000 users.",
  },
];

const PlatformOverview = () => {
  return (
    <section className="py-20 px-6 bg-gradient-to-b from-background to-card/50">
      <div className="container mx-auto max-w-6xl">
        {/* What Each Portal Delivers */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-bronze-400 to-bronze-600 bg-clip-text text-transparent">
            What Each Portal Delivers
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Three integrated service layers working together on a single platform.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {portalDeliverables.map((portal, idx) => (
            <motion.div
              key={portal.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * idx }}
            >
              <Card className="h-full p-6 bg-card border-border/50 hover:border-bronze-500/30 transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-bronze-500/20 to-bronze-600/10 flex items-center justify-center mb-5">
                  <portal.icon className="w-6 h-6 text-bronze-400" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-4">{portal.title}</h3>
                <ul className="space-y-2.5">
                  {portal.items.map((item, itemIdx) => (
                    <li key={itemIdx} className="flex items-start gap-2.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-bronze-500 mt-2 flex-shrink-0" />
                      <span className="text-muted-foreground text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Institutional Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-bronze-400 to-bronze-600 bg-clip-text text-transparent">
            Institutional Benefits
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Concrete advantages for organizations deploying ThriveMT.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {institutionalBenefits.map((benefit, idx) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * idx }}
            >
              <Card className="h-full p-5 bg-card/50 border-border/30 hover:border-bronze-500/30 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-bronze-500/10 flex items-center justify-center mb-4">
                  <benefit.icon className="w-5 h-5 text-bronze-400" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground">{benefit.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PlatformOverview;
