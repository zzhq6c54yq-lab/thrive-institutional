import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { deploymentPopulations, DeploymentPopulation } from "@/data/deploymentPopulations";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

const DeploymentNavigator = () => {
  const [activePopulation, setActivePopulation] = useState<DeploymentPopulation>(
    deploymentPopulations[0]
  );

  return (
    <section id="deployment-models" className="py-20 px-6 bg-background">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-bronze-400 to-bronze-600 bg-clip-text text-transparent">
            One Platform. Multiple Institutional Deployments.
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Select a population to see how ThriveMT adapts to meet their specific needs.
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Navigation */}
          <div className="lg:w-80 flex-shrink-0">
            <div className="sticky top-24 space-y-1 p-4 rounded-xl border border-border/50 bg-card/30 max-h-[70vh] overflow-y-auto">
              <div className="text-xs font-bold text-muted-foreground mb-3 px-3 uppercase tracking-wider">
                Deployments by Population
              </div>
              {deploymentPopulations.map((population) => {
                const isActive = activePopulation.id === population.id;
                return (
                  <button
                    key={population.id}
                    onClick={() => setActivePopulation(population)}
                    className={cn(
                      "w-full flex items-center gap-3 px-3 py-3 rounded-lg text-left transition-all duration-200",
                      isActive
                        ? "bg-bronze-500/15 text-bronze-400 border-l-2 border-bronze-500"
                        : "text-muted-foreground hover:text-foreground hover:bg-card/50"
                    )}
                  >
                    <population.icon className={cn("w-5 h-5 flex-shrink-0", isActive ? "text-bronze-400" : "")} />
                    <span className="font-medium text-sm">{population.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Content Pane */}
          <div className="flex-1 min-w-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={activePopulation.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="p-8 rounded-xl border border-border/50 bg-card/30"
              >
                {/* Header */}
                <div className="flex items-start gap-4 mb-8">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-bronze-500/20 to-bronze-600/10 flex items-center justify-center flex-shrink-0">
                    <activePopulation.icon className="w-7 h-7 text-bronze-400" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-foreground mb-2">
                      {activePopulation.name}
                    </h3>
                    <p className="text-muted-foreground text-lg">
                      {activePopulation.headline}
                    </p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  {/* System Challenges */}
                  <div>
                    <h4 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-4">
                      System Challenges
                    </h4>
                    <ul className="space-y-3">
                      {activePopulation.challenges.map((challenge, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <div className="w-1.5 h-1.5 rounded-full bg-destructive/60 mt-2 flex-shrink-0" />
                          <span className="text-foreground/80">{challenge}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* ThriveMT Deployment */}
                  <div>
                    <h4 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-4">
                      ThriveMT Deployment
                    </h4>
                    <ul className="space-y-3">
                      {activePopulation.deployment.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <Check className="w-4 h-4 text-bronze-400 mt-0.5 flex-shrink-0" />
                          <span className="text-foreground/80">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Pilot Structure (if available) */}
                {activePopulation.pilotStructure && (
                  <div className="mt-8 pt-6 border-t border-border/30">
                    <h4 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-4">
                      Pilot Structure
                    </h4>
                    <div className="flex flex-wrap gap-3">
                      {activePopulation.pilotStructure.map((item, idx) => (
                        <span
                          key={idx}
                          className="px-4 py-2 rounded-full bg-bronze-500/10 text-bronze-400 text-sm font-medium border border-bronze-500/20"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DeploymentNavigator;
