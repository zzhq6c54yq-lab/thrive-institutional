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

export interface Statistic {
  value: string;
  suffix?: string;
  context: string;
}

export interface DeploymentPopulation {
  id: string;
  name: string;
  icon: typeof Shield;
  headline: string;
  image: string;
  statistics: Statistic[];
  industryOverview: string;
  valueProposition: string;
  benefits: string[];
  challenges: string[];
  deployment: string[];
  callToAction: string;
  pilotStructure?: string[];
}

export const deploymentPopulations: DeploymentPopulation[] = [
  {
    id: "military-veterans",
    name: "Military & Veterans",
    icon: Shield,
    headline: "Mental health infrastructure for those who serve and have served.",
    image: "https://images.unsplash.com/photo-1579912437766-7896df6d3cd3?w=800&q=80",
    statistics: [
      { value: "17", suffix: "/day", context: "Average veteran suicides daily in the U.S." },
      { value: "50", suffix: "%", context: "Veterans needing care who don't receive it" },
      { value: "6+", suffix: " months", context: "Average wait for VA mental health appointments" }
    ],
    industryOverview: "The veteran mental health crisis demands immediate, scalable solutions. Traditional VA systems are overwhelmed, cultural stigma prevents help-seeking, and the 24/7 nature of trauma means support must be available around the clock. Service members and veterans deserve care that understands their unique experiences.",
    valueProposition: "ThriveMT integrates seamlessly with existing military and VA infrastructure, providing immediate access to AI-guided support, culturally-competent coaching, and licensed clinical care—all without increasing administrative burden or compromising confidentiality.",
    benefits: [
      "Reduce wait times from months to minutes with AI triage",
      "Combat stigma with private, confidential access",
      "Measurable outcomes for leadership reporting",
      "Veteran-specific protocols and cultural competency"
    ],
    challenges: [
      "Delayed access to care",
      "Cultural stigma around mental health",
      "System capacity strain",
    ],
    deployment: [
      "AI-guided intake aligned to military context",
      "Coach-led early engagement",
      "Licensed therapist escalation",
      "Administrative reporting for leadership",
    ],
    callToAction: "Schedule a Military Deployment Demo",
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
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&q=80",
    statistics: [
      { value: "41", suffix: "%", context: "College students with depression or anxiety" },
      { value: "3x", context: "Increase in counseling demand since 2010" },
      { value: "60", suffix: "%", context: "Students who don't seek help when needed" }
    ],
    industryOverview: "Campus counseling centers are at a breaking point. Student mental health needs have tripled in the past decade while resources remain stagnant. Academic pressure, social isolation, and life transitions create a perfect storm that traditional counseling models cannot address at scale.",
    valueProposition: "ThriveMT provides 24/7 digital-first support that meets students where they are—on their phones, at 2 AM, during finals week. Our tiered model ensures no student falls through the cracks while protecting institutional resources for those who need them most.",
    benefits: [
      "Extend counseling capacity without adding headcount",
      "FERPA-compliant data governance",
      "Real-time crisis detection and escalation",
      "Aggregate analytics for student affairs reporting"
    ],
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
    callToAction: "Request a Campus Wellness Demo",
  },
  {
    id: "small-business",
    name: "Small Business",
    icon: Briefcase,
    headline: "Enterprise-grade mental health without enterprise complexity.",
    image: "https://images.unsplash.com/photo-1556761175-4b46a572b786?w=800&q=80",
    statistics: [
      { value: "$500B", context: "Annual U.S. cost of workplace mental health issues" },
      { value: "76", suffix: "%", context: "Workers reporting burnout symptoms" },
      { value: "4x", context: "ROI on workplace mental health investment" }
    ],
    industryOverview: "Small businesses face the same mental health challenges as large enterprises but without dedicated HR infrastructure. Employee burnout, retention struggles, and productivity losses compound when there's no systematic support. Traditional EAPs are underutilized and impersonal.",
    valueProposition: "ThriveMT delivers Fortune 500-level mental health infrastructure at small business scale. Zero administrative burden, confidential employee access, and aggregate insights that help you understand workforce wellness without individual surveillance.",
    benefits: [
      "Reduce turnover with proactive wellness support",
      "No HR bandwidth required for administration",
      "Confidential—employees trust the system",
      "Employer dashboard without individual data exposure"
    ],
    challenges: [
      "Burnout and retention risk",
      "Limited internal HR infrastructure",
      "Budget constraints for wellness programs",
    ],
    deployment: [
      "Workforce-wide access",
      "Confidential engagement",
      "Employer-level insights without individual data exposure",
    ],
    callToAction: "Get a Small Business Quote",
  },
  {
    id: "first-responders",
    name: "First Responders",
    icon: Siren,
    headline: "Shift-friendly support for high-trauma roles.",
    image: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=800&q=80",
    statistics: [
      { value: "30", suffix: "%", context: "First responders with PTSD symptoms" },
      { value: "2x", context: "Suicide rate compared to general population" },
      { value: "85", suffix: "%", context: "Who don't seek help due to stigma" }
    ],
    industryOverview: "First responders experience trauma that accumulates over years of service. Irregular schedules, department culture, and fear of career consequences prevent help-seeking. By the time symptoms are visible, intervention is often too late. Prevention requires accessible, confidential, always-available support.",
    valueProposition: "ThriveMT provides 24/7 confidential access that fits between shifts, after difficult calls, and during the quiet moments when trauma surfaces. Our system is completely separate from departmental records—what happens in ThriveMT stays in ThriveMT.",
    benefits: [
      "Available between shifts and after critical incidents",
      "Complete separation from department HR systems",
      "Trauma-informed coaching and clinical protocols",
      "Aggregate wellness metrics for department leadership"
    ],
    challenges: [
      "Irregular schedules and shift work",
      "Cumulative trauma exposure",
      "Cultural barriers and stigma",
    ],
    deployment: [
      "Immediate, discreet access",
      "Coach-led early support",
      "Clear clinical escalation pathways",
    ],
    callToAction: "Explore First Responder Programs",
  },
  {
    id: "hospitality",
    name: "Hospitality Industry",
    icon: UtensilsCrossed,
    headline: "Mental health access for high-pressure, people-facing environments.",
    image: "https://images.unsplash.com/photo-1466721591366-2d5fba72006d?w=800&q=80",
    statistics: [
      { value: "84", suffix: "%", context: "Hospitality workers reporting high stress" },
      { value: "73", suffix: "%", context: "Industry turnover rate" },
      { value: "12", suffix: "%", context: "Who access mental health support" }
    ],
    industryOverview: "Hospitality workers perform constant emotional labor while managing difficult customers, irregular hours, and physical demands. High turnover makes traditional benefits investments seem futile, creating a cycle where workers never receive adequate support and churn continues.",
    valueProposition: "ThriveMT breaks the turnover cycle by providing immediate, mobile-first support that travels with your workforce. No waiting periods, no complex enrollment—just support available from day one that shows employees you're invested in their wellbeing.",
    benefits: [
      "Reduce turnover with day-one mental health access",
      "Mobile-first for a mobile workforce",
      "Flexible support windows for non-traditional hours",
      "Multi-location engagement dashboards"
    ],
    challenges: [
      "Emotional labor and customer-facing stress",
      "High turnover rates",
      "Nontraditional work hours",
    ],
    deployment: [
      "Mobile-first engagement",
      "Flexible support windows",
      "Organization-level engagement reporting",
    ],
    callToAction: "See Hospitality Solutions",
  },
  {
    id: "transport",
    name: "Transport Industry",
    icon: Truck,
    headline: "Support for safety-critical, mobile, and isolated workers.",
    image: "https://images.unsplash.com/photo-1576267423048-15c0040fec78?w=800&q=80",
    statistics: [
      { value: "27", suffix: "%", context: "Truckers with clinical depression" },
      { value: "13", suffix: "%", context: "Reporting substance abuse issues" },
      { value: "60", suffix: "%", context: "Experiencing irregular sleep patterns" }
    ],
    industryOverview: "Transportation workers face unique challenges: long hours of isolation, irregular sleep, separation from family, and the constant stress of safety-critical decisions. Traditional healthcare access is nearly impossible given their mobile lifestyle. Mental health deterioration directly impacts road safety.",
    valueProposition: "ThriveMT goes wherever your drivers go. Asynchronous support means help is available during rest stops, after deliveries, or during long hauls. Our system is designed for limited connectivity and variable schedules—meeting drivers in their reality, not an office.",
    benefits: [
      "Asynchronous access for on-the-road support",
      "Reduce safety incidents through early intervention",
      "Confidential—no DOT reporting concerns for coaching",
      "Fleet-wide wellness visibility for operations"
    ],
    challenges: [
      "Fatigue and cumulative stress",
      "Limited access windows and connectivity",
      "Isolation and family separation",
    ],
    deployment: [
      "Asynchronous access",
      "Confidential support",
      "Escalation when clinically necessary",
    ],
    callToAction: "Discuss Fleet Wellness Solutions",
  },
  {
    id: "educators",
    name: "Esteemed Educators",
    icon: BookOpen,
    headline: "Sustaining those who sustain others.",
    image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&q=80",
    statistics: [
      { value: "78", suffix: "%", context: "Teachers reporting frequent burnout" },
      { value: "50", suffix: "%", context: "Who leave within first 5 years" },
      { value: "$2.2B", context: "Annual cost of teacher turnover in U.S." }
    ],
    industryOverview: "Educators pour themselves into students while their own mental health erodes. Compassion fatigue, administrative burden, classroom challenges, and societal pressures create unsustainable working conditions. Districts lose experienced teachers to burnout while struggling to recruit replacements.",
    valueProposition: "ThriveMT gives educators dedicated support that understands the unique pressures of teaching. From the first-year teacher struggling with classroom management to the veteran dealing with compassion fatigue, our tiered model meets educators at their point of need.",
    benefits: [
      "Reduce teacher turnover and retention costs",
      "Support during high-stress periods (testing, year-end)",
      "Confidential access separate from district HR",
      "Aggregate insights for district wellness initiatives"
    ],
    challenges: [
      "Chronic burnout and exhaustion",
      "Compassion fatigue",
      "Administrative overload",
    ],
    deployment: [
      "Early intervention support",
      "Flexible access models",
      "Administrative insight without surveillance",
    ],
    callToAction: "Request an Education Sector Demo",
  },
  {
    id: "law-enforcement",
    name: "Law Enforcement",
    icon: BadgeCheck,
    headline: "Mental health support designed for trust and confidentiality.",
    image: "https://images.unsplash.com/photo-1589578527966-fdac0f44566c?w=800&q=80",
    statistics: [
      { value: "4x", context: "Suicide rate compared to line-of-duty deaths" },
      { value: "90", suffix: "%", context: "Don't seek help due to stigma/career fear" },
      { value: "23", suffix: "%", context: "Officers with PTSD symptoms" }
    ],
    industryOverview: "Law enforcement officers face compounding trauma, hypervigilance, and a culture that stigmatizes vulnerability. Fear of fitness-for-duty evaluations prevents help-seeking until crisis points. Officers protect communities while their own mental health deteriorates in silence.",
    valueProposition: "ThriveMT provides completely confidential support with absolute separation from department disciplinary systems. Officers can access help without fear of career consequences, building resilience before crisis points while maintaining the trust essential to their work.",
    benefits: [
      "Complete separation from fitness-for-duty processes",
      "Confidential access that officers actually trust",
      "Trauma-informed protocols for law enforcement",
      "Department-level wellness metrics (no individual data)"
    ],
    challenges: [
      "High-stress exposure and hypervigilance",
      "Confidentiality and career concerns",
      "Cultural stigma around mental health",
    ],
    deployment: [
      "Discreet engagement",
      "Separation from disciplinary systems",
      "Licensed clinical escalation",
    ],
    callToAction: "Explore Law Enforcement Programs",
  },
  {
    id: "cancer-support",
    name: "Cancer Support",
    icon: Heart,
    headline: "Emotional and psychological support alongside medical care.",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=800&q=80",
    statistics: [
      { value: "40", suffix: "%", context: "Cancer patients with anxiety or depression" },
      { value: "25", suffix: "%", context: "Caregivers experiencing burnout" },
      { value: "70", suffix: "%", context: "Patients who need psychosocial support" }
    ],
    industryOverview: "Cancer treatment focuses on the physical disease while emotional and psychological needs often go unaddressed. Patients navigate fear, grief, and uncertainty while caregivers silently exhaust themselves. Mental health support is essential to treatment adherence and quality of life.",
    valueProposition: "ThriveMT extends oncology care to include comprehensive emotional support for both patients and caregivers. Our platform integrates with treatment journeys, providing support during diagnosis shock, treatment fatigue, survivorship anxiety, and caregiver burnout.",
    benefits: [
      "Improve treatment adherence through emotional support",
      "Support for patients AND caregivers",
      "Available during treatment cycles and recovery",
      "Integration with care coordination teams"
    ],
    challenges: [
      "Anxiety, depression, and emotional fatigue",
      "Caregiver burnout and strain",
      "Gaps in psychosocial oncology care",
    ],
    deployment: [
      "Patient and caregiver access",
      "Coach-led emotional support",
      "Therapist escalation when needed",
    ],
    callToAction: "Learn About Oncology Support Programs",
  },
  {
    id: "single-parents",
    name: "Single Parents",
    icon: Baby,
    headline: "Support for resilience under constant pressure.",
    image: "https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=800&q=80",
    statistics: [
      { value: "38", suffix: "%", context: "Single parents with mental health concerns" },
      { value: "2x", context: "Stress levels compared to partnered parents" },
      { value: "15", suffix: "%", context: "Who access professional support" }
    ],
    industryOverview: "Single parents carry the full weight of parenting, working, and household management without a partner to share the load. Time scarcity makes traditional therapy nearly impossible to access. Stress compounds daily while support systems feel out of reach.",
    valueProposition: "ThriveMT meets single parents in their reality—available at 11 PM after kids are asleep, during lunch breaks, or whenever a moment of space appears. Practical coaching and clinical support that doesn't require scheduling weeks in advance or finding childcare.",
    benefits: [
      "Access whenever time permits—no scheduling barriers",
      "Practical coaching for daily challenges",
      "Clinical support when needed, not just crisis",
      "Affordable access through organizational partnerships"
    ],
    challenges: [
      "Severe time scarcity",
      "Emotional and physical overload",
      "Limited access to traditional therapy",
    ],
    deployment: [
      "On-demand access",
      "Practical coaching",
      "Clinical care when appropriate",
    ],
    callToAction: "Explore Family Support Programs",
  },
  {
    id: "golden-years",
    name: "The Golden Years",
    icon: Sunset,
    headline: "Accessible mental health support for aging populations.",
    image: "https://images.unsplash.com/photo-1447710441604-5bdc41bc6517?w=800&q=80",
    statistics: [
      { value: "20", suffix: "%", context: "Seniors experiencing depression" },
      { value: "60", suffix: "%", context: "Cases that go untreated" },
      { value: "7M+", context: "Americans 65+ affected by depression" }
    ],
    industryOverview: "Aging brings unique mental health challenges: loss of loved ones, health decline, isolation, and major life transitions. Yet seniors are the least likely demographic to seek mental health support due to generational stigma and access barriers. Depression in seniors often goes unrecognized and untreated.",
    valueProposition: "ThriveMT provides senior-friendly access with simplified interfaces, patient support, and care coordination awareness. Our coaches understand aging-specific challenges while our clinical team specializes in geriatric mental health when escalation is needed.",
    benefits: [
      "Simplified, accessible user experience",
      "Combat isolation with consistent support connection",
      "Coordination with existing healthcare providers",
      "Family and caregiver involvement options"
    ],
    challenges: [
      "Social isolation and loneliness",
      "Life transitions and loss",
      "Generational stigma around mental health",
    ],
    deployment: [
      "Simplified user experience",
      "Support-led engagement",
      "Care coordination awareness",
    ],
    callToAction: "Discuss Senior Living Partnerships",
  },
  {
    id: "chronic-illness",
    name: "Chronic Illness",
    icon: Activity,
    headline: "Mental health as a long-term companion to care.",
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&q=80",
    statistics: [
      { value: "50", suffix: "%", context: "Chronic illness patients with depression" },
      { value: "3x", context: "Higher anxiety risk than general population" },
      { value: "30", suffix: "%", context: "Reduction in treatment adherence due to depression" }
    ],
    industryOverview: "Living with chronic illness is a marathon, not a sprint. The emotional weight of ongoing health management, medication routines, lifestyle restrictions, and uncertain futures takes a profound toll. Mental health directly impacts physical health outcomes and treatment adherence.",
    valueProposition: "ThriveMT provides ongoing mental health support that evolves with the chronic illness journey. From initial diagnosis adjustment to long-term management fatigue, our platform offers consistent support that understands the interplay between physical and mental health.",
    benefits: [
      "Improve treatment adherence through mental health support",
      "Ongoing support that adapts to health journey",
      "Integration with chronic care management programs",
      "Reduce healthcare costs through early intervention"
    ],
    challenges: [
      "Emotional fatigue and adjustment",
      "High depression and anxiety comorbidity",
      "Impact on treatment adherence",
    ],
    deployment: [
      "Ongoing support pathways",
      "Adaptive care escalation",
      "Health journey integration",
    ],
    callToAction: "Explore Chronic Care Integration",
  },
  {
    id: "adolescence",
    name: "Adolescence Experience",
    icon: Sparkles,
    headline: "Early mental health access during critical developmental years.",
    image: "https://images.unsplash.com/photo-1529390079861-591de354faf5?w=800&q=80",
    statistics: [
      { value: "1 in 5", context: "Adolescents with a mental health disorder" },
      { value: "60", suffix: "%", context: "Youth who don't receive treatment" },
      { value: "75", suffix: "%", context: "Mental illness onset before age 24" }
    ],
    industryOverview: "Adolescence is the critical window for mental health intervention—75% of lifetime mental illness begins before age 24. Yet the majority of young people don't receive care during this crucial period. Early intervention can alter life trajectories and prevent adult mental health crises.",
    valueProposition: "ThriveMT provides age-appropriate engagement with built-in guardrails and escalation protocols. Parents and institutions maintain appropriate oversight while adolescents receive support that feels relevant and accessible. Early intervention that changes outcomes.",
    benefits: [
      "Developmentally-appropriate engagement design",
      "Built-in safety guardrails and crisis protocols",
      "Parent/guardian visibility and escalation options",
      "Prevention-focused approach for better outcomes"
    ],
    challenges: [
      "Emotional regulation challenges",
      "Early intervention urgency",
      "Balance of autonomy and oversight",
    ],
    deployment: [
      "Age-appropriate engagement",
      "Guardrails and escalation protocols",
      "Institutional oversight",
    ],
    callToAction: "Request Youth Program Information",
  },
];
