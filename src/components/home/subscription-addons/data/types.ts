
import { LucideIcon } from "lucide-react";

export interface AddOn {
  id: string;
  title: string;
  titleSpanish: string;
  description: string;
  descriptionSpanish: string;
  basePrice: number;
  imagePath: string;
  icon: LucideIcon;
  targetAudience: string;
  features: string[];
  gradient: string;
  borderColor: string;
}

export interface SubscriptionAddOnsProps {
  selectedPlan: string | null;
  selectedAddOns: string[];
  onAddOnToggle: (id: string) => void;
  onContinue: () => void;
  onPrevious: () => void;
  onSkip: () => void;
}
