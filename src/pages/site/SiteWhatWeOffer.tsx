import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { 
  Stethoscope, 
  Heart, 
  Bot, 
  Building2, 
  TrendingDown, 
  Shield, 
  Clock, 
  BarChart3,
  Users,
  CheckCircle2
} from "lucide-react";
import { Card } from "@/components/ui/card";

const portals = [
  {
    icon: Stethoscope,
    title: "Licensed Therapy Portal",
    description: "Clinical treatment with credentialed, licensable professionals.",
    features: [
      "Licensed therapists across all 50 states",
      "CBT, DBT, EMDR, trauma-informed care",
      "Crisis-ready escalation protocols",
      "Diagnosis and treatment planning",
      "Insurance-compatible documentation",
    ],
    benefits: [
      {
        icon: Building2,
        title: "Reduced Clinical Burden",
        description: "Offload clinical care from internal resources while maintaining oversight.",
      },
      {
        icon: Shield,
        title: "Compliance-Ready Providers",
        description: "Credentialed professionals meeting institutional licensing requirements.",
      },
      {
        icon: BarChart3,
        title: "Outcome Tracking",
        description: "Measurable clinical outcomes with centralized reporting.",
      },
    ],
  },
  {
    icon: Heart,
    title: "Coaching Portal",
    description: "Goal-focused support and accountability for everyday challenges.",
    features: [
      "Certified mental wellness coaches",
      "Daily check-ins and accountability",
      "Goal setting and progress tracking",
      "Stigma-free early intervention",
      "Seamless therapist handoff when needed",
    ],
    benefits: [
      {
        icon: TrendingDown,
        title: "Reduced Downstream Costs",
        description: "Early intervention prevents escalation to costly clinical care.",
      },
      {
        icon: Users,
        title: "Scalable Support Layer",
        description: "Expand access without adding clinical overhead.",
      },
      {
        icon: BarChart3,
        title: "Engagement Metrics",
        description: "Program evaluation data to demonstrate ROI.",
      },
    ],
  },
  {
    icon: Bot,
    title: "AI Layer (Henry)",
    description: "24/7 AI-guided engagement and immediate support access.",
    features: [
      "Always-available conversational support",
      "Intelligent intake and triage",
      "Automated mood tracking",
      "Crisis detection and escalation",
      "Personalized resource recommendations",
    ],
    benefits: [
      {
        icon: Clock,
        title: "24/7 Availability",
        description: "Immediate access without staffing costs or wait times.",
      },
      {
        icon: TrendingDown,
        title: "Reduced Administrative Load",
        description: "Automated triage handles volume, freeing human resources.",
      },
      {
        icon: BarChart3,
        title: "Population Insights",
        description: "Aggregate data reveals mental health patterns across your population.",
      },
    ],
  },
];

const SiteWhatWeOffer = () => {
  return (
    <>
      <Helmet>
        <title>What We Offer | ThriveMT - Integrated Mental Health Solutions</title>
        <meta 
          name="description" 
          content="ThriveMT delivers licensed therapy, mental wellness coaching, and AI-guided support through a single integrated platform designed for institutional deployment." 
        />
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="pt-24 pb-16 px-6 bg-gradient-to-b from-card/50 to-background">
          <div className="container mx-auto max-w-5xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-bronze-400 to-bronze-600 bg-clip-text text-transparent">
                Integrated Mental Health Solutions
              </h1>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Three interconnected service layers—licensed therapy, coaching, and AI support—operating 
                on a single platform with unified oversight, reporting, and compliance infrastructure.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Portals Grid */}
        <section className="py-16 px-6">
          <div className="container mx-auto max-w-7xl">
            <div className="space-y-20">
              {portals.map((portal, portalIdx) => (
                <motion.div
                  key={portal.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 * portalIdx }}
                >
                  {/* Portal Header */}
                  <div className="flex items-start gap-4 mb-8">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-bronze-500/20 to-bronze-600/10 flex items-center justify-center flex-shrink-0">
                      <portal.icon className="w-7 h-7 text-bronze-400" />
                    </div>
                    <div>
                      <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                        {portal.title}
                      </h2>
                      <p className="text-muted-foreground text-lg">
                        {portal.description}
                      </p>
                    </div>
                  </div>

                  <div className="grid lg:grid-cols-2 gap-8">
                    {/* Features */}
                    <Card className="p-6 bg-card border-border/50">
                      <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-4">
                        What's Included
                      </h3>
                      <ul className="space-y-3">
                        {portal.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            <CheckCircle2 className="w-5 h-5 text-bronze-400 mt-0.5 flex-shrink-0" />
                            <span className="text-foreground/90">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </Card>

                    {/* Institutional Benefits */}
                    <div className="space-y-4">
                      <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-4">
                        Institutional Benefits
                      </h3>
                      {portal.benefits.map((benefit, idx) => (
                        <Card 
                          key={idx} 
                          className="p-4 bg-card/50 border-border/30 hover:border-bronze-500/30 transition-colors"
                        >
                          <div className="flex items-start gap-3">
                            <div className="w-10 h-10 rounded-lg bg-bronze-500/10 flex items-center justify-center flex-shrink-0">
                              <benefit.icon className="w-5 h-5 text-bronze-400" />
                            </div>
                            <div>
                              <h4 className="font-semibold text-foreground mb-1">
                                {benefit.title}
                              </h4>
                              <p className="text-sm text-muted-foreground">
                                {benefit.description}
                              </p>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </div>

                  {portalIdx < portals.length - 1 && (
                    <div className="mt-16 border-b border-border/30" />
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Integration Note */}
        <section className="py-16 px-6 bg-card/30">
          <div className="container mx-auto max-w-4xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">
                One Platform. Unified Oversight.
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                All three service layers operate on the same infrastructure—shared data, 
                seamless handoffs between providers, and centralized reporting for administrators. 
                Users experience continuity; institutions maintain visibility.
              </p>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default SiteWhatWeOffer;
