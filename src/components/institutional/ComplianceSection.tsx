import { motion } from "framer-motion";
import { Shield, UserCheck, Eye, Handshake } from "lucide-react";

const complianceItems = [
  {
    icon: Shield,
    label: "HIPAA-aligned architecture",
  },
  {
    icon: UserCheck,
    label: "Credentialable provider model",
  },
  {
    icon: Eye,
    label: "Centralized clinical oversight",
  },
  {
    icon: Handshake,
    label: "Pilot-friendly procurement posture",
  },
];

const ComplianceSection = () => {
  return (
    <section className="py-20 px-6 bg-gradient-to-b from-card/50 to-background">
      <div className="container mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-bronze-400 to-bronze-600 bg-clip-text text-transparent">
            Built for Accountability, Governance, and Scale
          </h2>
          <p className="text-muted-foreground max-w-3xl mx-auto text-lg leading-relaxed">
            ThriveMT operates as a registered healthcare entity with infrastructure designed 
            to support institutional governance, privacy standards, and reimbursable clinical workflows.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {complianceItems.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 * idx }}
              className="flex flex-col items-center p-6 rounded-xl border border-border/50 bg-card/30 hover:border-bronze-500/30 transition-colors text-center"
            >
              <div className="w-12 h-12 rounded-lg bg-bronze-500/10 flex items-center justify-center mb-4">
                <item.icon className="w-6 h-6 text-bronze-400" />
              </div>
              <span className="text-foreground/90 font-medium text-sm">{item.label}</span>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center text-muted-foreground text-sm"
        >
          Additional compliance, security, and governance documentation is available during institutional review.
        </motion.p>
      </div>
    </section>
  );
};

export default ComplianceSection;
