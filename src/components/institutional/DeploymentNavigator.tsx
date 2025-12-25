import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { deploymentPopulations, DeploymentPopulation } from "@/data/deploymentPopulations";
import { cn } from "@/lib/utils";
import { Check, ArrowRight, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDeployment } from "@/contexts/DeploymentContext";

const StatCard = ({ stat }: { stat: { value: string; suffix?: string; context: string } }) => (
  <div className="bg-gradient-to-br from-bronze-500/10 to-bronze-600/5 border border-bronze-500/20 rounded-xl p-4 text-center">
    <div className="text-2xl md:text-3xl font-bold text-bronze-400">
      {stat.value}
      {stat.suffix && <span className="text-lg md:text-xl">{stat.suffix}</span>}
    </div>
    <p className="text-xs md:text-sm text-muted-foreground mt-1 leading-tight">{stat.context}</p>
  </div>
);

const ScreenshotGallery = ({ screenshots, populationName }: { screenshots: DeploymentPopulation['portalScreenshots']; populationName: string }) => {
  const [activeTab, setActiveTab] = useState<'welcome' | 'features' | 'dashboard'>('welcome');
  
  const tabs = [
    { key: 'welcome' as const, label: 'Welcome Screen' },
    { key: 'features' as const, label: 'Features' },
    { key: 'dashboard' as const, label: 'Dashboard' },
  ];
  
  const hasScreenshots = screenshots.welcome || screenshots.features || screenshots.dashboard;
  
  if (!hasScreenshots) {
    // Placeholder state
    return (
      <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-gradient-to-br from-bronze-500/5 to-bronze-600/10 border border-bronze-500/20">
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-8">
          <div className="w-16 h-16 rounded-full bg-bronze-500/10 flex items-center justify-center">
            <ImageIcon className="w-8 h-8 text-bronze-400/60" />
          </div>
          <div className="text-center">
            <h4 className="text-lg font-semibold text-foreground/70">Portal Screenshots Coming Soon</h4>
            <p className="text-sm text-muted-foreground mt-1 max-w-md">
              Screenshots of the {populationName} portal will be added here to showcase the Welcome Screen, Features, and Dashboard.
            </p>
          </div>
        </div>
      </div>
    );
  }
  
  const currentImage = screenshots[activeTab];
  
  return (
    <div className="space-y-4">
      {/* Tab Navigation */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={cn(
              "px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all",
              activeTab === tab.key
                ? "bg-bronze-500 text-white shadow-md"
                : "bg-card/50 text-muted-foreground hover:bg-card hover:text-foreground border border-border/50"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>
      
      {/* Screenshot Display */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="relative w-full rounded-xl overflow-hidden border border-border/50 bg-black/5"
        >
          {currentImage ? (
            <img 
              src={currentImage} 
              alt={`${populationName} ${activeTab} screen`}
              className="w-full h-auto object-contain"
            />
          ) : (
            <div className="aspect-video flex items-center justify-center bg-gradient-to-br from-bronze-500/5 to-bronze-600/10">
              <div className="text-center p-8">
                <ImageIcon className="w-12 h-12 text-bronze-400/40 mx-auto mb-3" />
                <p className="text-sm text-muted-foreground">
                  {tabs.find(t => t.key === activeTab)?.label} screenshot pending
                </p>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

const PopulationContent = ({ population }: { population: DeploymentPopulation }) => (
  <div className="space-y-8">
    {/* Population Header */}
    <div className="flex items-center gap-4 pb-4 border-b border-border/50">
      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-bronze-500/20 to-bronze-600/10 flex items-center justify-center border border-bronze-500/30">
        <population.icon className="w-7 h-7 text-bronze-400" />
      </div>
      <div>
        <h3 className="text-xl md:text-2xl font-bold text-foreground">
          {population.name}
        </h3>
        <p className="text-muted-foreground text-sm md:text-base">
          {population.headline}
        </p>
      </div>
    </div>

    {/* Portal Screenshots Gallery */}
    <div>
      <h4 className="text-sm font-bold text-bronze-400 uppercase tracking-wider mb-4">
        Portal Experience
      </h4>
      <ScreenshotGallery screenshots={population.portalScreenshots} populationName={population.name} />
    </div>

    {/* Statistics Grid */}
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
      {population.statistics.map((stat, idx) => (
        <StatCard key={idx} stat={stat} />
      ))}
    </div>

    {/* Industry Overview */}
    <div className="bg-card/50 border border-border/50 rounded-xl p-5 md:p-6">
      <h4 className="text-sm font-bold text-bronze-400 uppercase tracking-wider mb-3">
        The Challenge
      </h4>
      <p className="text-foreground/80 leading-relaxed">
        {population.industryOverview}
      </p>
    </div>

    {/* Challenges & Solutions Grid */}
    <div className="grid md:grid-cols-2 gap-6">
      {/* System Challenges */}
      <div className="bg-destructive/5 border border-destructive/20 rounded-xl p-5">
        <h4 className="text-sm font-bold text-destructive uppercase tracking-wider mb-4">
          System Challenges
        </h4>
        <ul className="space-y-3">
          {population.challenges.map((challenge, idx) => (
            <li key={idx} className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-destructive/60 mt-2 flex-shrink-0" />
              <span className="text-foreground/80">{challenge}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* ThriveMT Deployment */}
      <div className="bg-bronze-500/5 border border-bronze-500/20 rounded-xl p-5">
        <h4 className="text-sm font-bold text-bronze-400 uppercase tracking-wider mb-4">
          How ThriveMT Helps
        </h4>
        <ul className="space-y-3">
          {population.deployment.map((item, idx) => (
            <li key={idx} className="flex items-start gap-3">
              <Check className="w-4 h-4 text-bronze-400 mt-0.5 flex-shrink-0" />
              <span className="text-foreground/80">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>

    {/* Value Proposition */}
    <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-bronze-500/10 via-bronze-600/5 to-transparent border border-bronze-500/20 p-6 md:p-8">
      <div className="absolute top-0 right-0 w-32 h-32 bg-bronze-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <h4 className="text-sm font-bold text-bronze-400 uppercase tracking-wider mb-3 relative">
        Why Institutions Choose ThriveMT
      </h4>
      <p className="text-foreground/90 leading-relaxed relative">
        {population.valueProposition}
      </p>
    </div>

    {/* Benefits */}
    <div>
      <h4 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-4">
        Key Benefits for Your Organization
      </h4>
      <div className="grid sm:grid-cols-2 gap-3">
        {population.benefits.map((benefit, idx) => (
          <div 
            key={idx} 
            className="flex items-start gap-3 bg-card/30 border border-border/50 rounded-lg p-4"
          >
            <div className="w-6 h-6 rounded-full bg-bronze-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
              <Check className="w-3.5 h-3.5 text-bronze-400" />
            </div>
            <span className="text-foreground/80 text-sm">{benefit}</span>
          </div>
        ))}
      </div>
    </div>

    {/* CTA */}
    <div className="pt-4">
      <Button 
        size="lg"
        className="w-full sm:w-auto bg-gradient-to-r from-bronze-500 to-bronze-600 hover:from-bronze-600 hover:to-bronze-700 text-white shadow-lg shadow-bronze-500/20"
      >
        {population.callToAction}
        <ArrowRight className="w-4 h-4 ml-2" />
      </Button>
    </div>
  </div>
);

const DeploymentNavigator = () => {
  const { activePopulation } = useDeployment();

  return (
    <section id="deployment-models" className="py-16 md:py-20 px-4 md:px-6 bg-background">
      <div className="container mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 md:mb-14"
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 bg-gradient-to-r from-bronze-400 to-bronze-600 bg-clip-text text-transparent">
            One Platform. Multiple Institutional Deployments.
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm md:text-base">
            ThriveMT adapts to the unique mental health challenges of every population. 
            Select a deployment from the sidebar to see how we deliver measurable outcomes for your specific institutional context.
          </p>
        </motion.div>

        {/* Content Pane - No more left sidebar here, controlled by main site sidebar */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activePopulation.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="p-6 md:p-8 rounded-xl border border-border/50 bg-card/30"
          >
            <PopulationContent population={activePopulation} />
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default DeploymentNavigator;
