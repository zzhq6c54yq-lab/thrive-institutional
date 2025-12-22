import { 
  Shield, 
  GraduationCap, 
  Briefcase, 
  Siren, 
  UtensilsCrossed, 
  Truck, 
  BookOpen, 
  BadgeCheck, 
  Heart, 
  Baby, 
  Sunset, 
  Activity, 
  Sparkles 
} from "lucide-react";

export interface DeploymentPopulation {
  id: string;
  name: string;
  icon: typeof Shield;
  headline: string;
  challenges: string[];
  deployment: string[];
  pilotStructure?: string[];
}

export const deploymentPopulations: DeploymentPopulation[] = [
  {
    id: "military-veterans",
    name: "Military & Veterans",
    icon: Shield,
    headline: "Mental health infrastructure for those who serve and have served.",
    challenges: [
      "Delayed access to care",
      "Cultural stigma",
      "System capacity strain",
    ],
    deployment: [
      "AI-guided intake aligned to military context",
      "Coach-led early engagement",
      "Licensed therapist escalation",
      "Administrative reporting for leadership",
    ],
    pilotStructure: [
      "Population-based rollout",
      "Minimal internal lift",
      "Measurable engagement and outcomes",
    ],
  },
  {
    id: "college-experience",
    name: "The College Experience",
    icon: GraduationCap,
    headline: "Supporting student mental health at institutional scale.",
    challenges: [
      "Counseling center overflow",
      "Academic and social stress",
      "Increasing demand with limited resources",
    ],
    deployment: [
      "Digital-first access for students",
      "Early intervention through coaching",
      "Clinical escalation pathways",
      "FERPA-aware governance language",
    ],
  },
  {
    id: "small-business",
    name: "Small Business",
    icon: Briefcase,
    headline: "Enterprise-grade mental health without enterprise complexity.",
    challenges: [
      "Burnout and retention risk",
      "Limited internal HR infrastructure",
    ],
    deployment: [
      "Workforce-wide access",
      "Confidential engagement",
      "Employer-level insights without individual data exposure",
    ],
  },
  {
    id: "first-responders",
    name: "First Responders",
    icon: Siren,
    headline: "Shift-friendly support for high-trauma roles.",
    challenges: [
      "Irregular schedules",
      "Trauma exposure",
      "Cultural barriers to care",
    ],
    deployment: [
      "Immediate, discreet access",
      "Coach-led early support",
      "Clear clinical escalation pathways",
    ],
  },
  {
    id: "hospitality",
    name: "Hospitality Industry",
    icon: UtensilsCrossed,
    headline: "Mental health access for high-pressure, people-facing environments.",
    challenges: [
      "Emotional labor",
      "High turnover",
      "Nontraditional work hours",
    ],
    deployment: [
      "Mobile-first engagement",
      "Flexible support windows",
      "Organization-level engagement reporting",
    ],
  },
  {
    id: "transport",
    name: "Transport Industry",
    icon: Truck,
    headline: "Support for safety-critical, mobile, and isolated workers.",
    challenges: [
      "Fatigue and stress",
      "Limited access windows",
    ],
    deployment: [
      "Asynchronous access",
      "Confidential support",
      "Escalation when clinically necessary",
    ],
  },
  {
    id: "educators",
    name: "Esteemed Educators",
    icon: BookOpen,
    headline: "Sustaining those who sustain others.",
    challenges: [
      "Burnout",
      "Compassion fatigue",
    ],
    deployment: [
      "Early intervention support",
      "Flexible access models",
      "Administrative insight without surveillance",
    ],
  },
  {
    id: "law-enforcement",
    name: "Law Enforcement",
    icon: BadgeCheck,
    headline: "Mental health support designed for trust and confidentiality.",
    challenges: [
      "High-stress exposure",
      "Confidentiality concerns",
    ],
    deployment: [
      "Discreet engagement",
      "Separation from disciplinary systems",
      "Licensed clinical escalation",
    ],
  },
  {
    id: "cancer-support",
    name: "Cancer Support",
    icon: Heart,
    headline: "Emotional and psychological support alongside medical care.",
    challenges: [
      "Anxiety and emotional fatigue",
      "Caregiver strain",
    ],
    deployment: [
      "Patient and caregiver access",
      "Coach-led emotional support",
      "Therapist escalation when needed",
    ],
  },
  {
    id: "single-parents",
    name: "Single Parents",
    icon: Baby,
    headline: "Support for resilience under constant pressure.",
    challenges: [
      "Time scarcity",
      "Emotional overload",
    ],
    deployment: [
      "On-demand access",
      "Practical coaching",
      "Clinical care when appropriate",
    ],
  },
  {
    id: "golden-years",
    name: "The Golden Years",
    icon: Sunset,
    headline: "Accessible mental health support for aging populations.",
    challenges: [
      "Isolation",
      "Life transitions",
    ],
    deployment: [
      "Simplified user experience",
      "Support-led engagement",
      "Care coordination awareness",
    ],
  },
  {
    id: "chronic-illness",
    name: "Chronic Illness",
    icon: Activity,
    headline: "Mental health as a long-term companion to care.",
    challenges: [
      "Emotional fatigue",
      "Depression risk",
    ],
    deployment: [
      "Ongoing support pathways",
      "Adaptive care escalation",
    ],
  },
  {
    id: "adolescence",
    name: "Adolescence Experience",
    icon: Sparkles,
    headline: "Early mental health access during critical developmental years.",
    challenges: [
      "Emotional regulation challenges",
      "Early intervention needs",
    ],
    deployment: [
      "Age-appropriate engagement",
      "Guardrails and escalation protocols",
      "Institutional oversight",
    ],
  },
];
