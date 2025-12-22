import { motion } from "framer-motion";
import { Layers, Network, Building2, Users } from "lucide-react";

const deploymentTypes = [
  {
    icon: Layers,
    label: "A first-line mental health access layer",
  },
  {
    icon: Network,
    label: "A workforce resilience and retention solution",
  },
  {
    icon: Building2,
    label: "A clinical support extension",
  },
  {
    icon: Users,
    label: "A population-level mental health infrastructure",
  },
];

const PlatformOverview = () => {
  return (
    <section className="py-20 px-6 bg-gradient-to-b from-background to-card/50">
      <div className="container mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-bronze-400 to-bronze-600 bg-clip-text text-transparent">
            More Than an App. A Deployable Mental Health Platform.
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="prose prose-lg prose-invert mx-auto text-muted-foreground mb-12"
        >
          <p className="text-center text-lg leading-relaxed">
            ThriveMT is a behavioral health platform designed to integrate AI-guided engagement, 
            human support, and licensed clinical care into a single accountable system. Unlike 
            single-use wellness tools, ThriveMT is built to adapt across institutions, workforces, 
            and communities—while maintaining a consistent clinical, compliance, and reporting backbone.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center mb-8"
        >
          <p className="text-lg text-foreground/80 font-medium">
            Institutions deploy ThriveMT as:
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
          {deploymentTypes.map((type, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * idx }}
              className="flex items-center gap-4 p-4 rounded-lg border border-border/50 bg-card/30 hover:border-bronze-500/30 transition-colors"
            >
              <div className="w-10 h-10 rounded-lg bg-bronze-500/10 flex items-center justify-center flex-shrink-0">
                <type.icon className="w-5 h-5 text-bronze-400" />
              </div>
              <span className="text-foreground/90">{type.label}</span>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center text-muted-foreground mt-10 max-w-2xl mx-auto"
        >
          All deployments operate on the same core system—configured to meet the 
          needs of different populations.
        </motion.p>
      </div>
    </section>
  );
};

export default PlatformOverview;
