import InstitutionalHero from "@/components/institutional/InstitutionalHero";
import PlatformOverview from "@/components/institutional/PlatformOverview";
import HowItWorks from "@/components/institutional/HowItWorks";
import ComplianceSection from "@/components/institutional/ComplianceSection";
import DeploymentNavigator from "@/components/institutional/DeploymentNavigator";
import InstitutionalCTA from "@/components/institutional/InstitutionalCTA";
import { SEOHead } from "@/components/seo";

const SiteLanding = () => {
  return (
    <main className="bg-background">
      <SEOHead 
        title="ThriveMT | Institutional Mental Health Solutions"
        description="ThriveMT partners with institutions to deploy scalable, compliant, and population-specific mental health support. Enterprise solutions for VA, DoD, hospitals, employers, and more."
        keywords="institutional mental health, enterprise wellness, corporate mental health, VA mental health, employee wellness program, healthcare compliance, HIPAA mental health, workforce resilience"
        canonicalUrl="https://thrive-mental.com/home"
      />
      
      <InstitutionalHero />
      <PlatformOverview />
      <HowItWorks />
      <ComplianceSection />
      <DeploymentNavigator />
      <InstitutionalCTA />
    </main>
  );
};

export default SiteLanding;
