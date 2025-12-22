import { Sparkles, Heart, Brain, Users, TrendingUp } from "lucide-react";

export interface QuickStartStep {
  title: string;
  description: string;
  image?: string;
  highlights: Array<{
    icon: any;
    label: string;
    description: string;
  }>;
}

export const getQuickStartSteps = (isSpanish: boolean): QuickStartStep[] => {
  if (isSpanish) {
    return [
      {
        title: "¡Bienvenido a Thrive MT!",
        description: "Tu plataforma integral de bienestar mental basada en la filosofía H.E.N.R.Y. Estamos aquí para apoyarte en cada paso de tu viaje.",
        image: "/lovable-uploads/f2c6ac08-6331-4884-950d-7f94d68ff15f.png",
        highlights: [
          {
            icon: Heart,
            label: "Horizontes Esperanzadores",
            description: "Establece y alcanza tus metas de bienestar"
          },
          {
            icon: Brain,
            label: "Empoderamiento a través de la Educación",
            description: "Aprende herramientas y estrategias de salud mental"
          },
          {
            icon: Users,
            label: "Conexiones Nutridas",
            description: "Conecta con otros en tu viaje"
          }
        ]
      },
      {
        title: "Explora Tus Recursos",
        description: "Accede a talleres, juegos, herramientas y contenido personalizado diseñado para apoyar tu viaje de bienestar mental.",
        highlights: [
          {
            icon: Sparkles,
            label: "Talleres",
            description: "Sesiones en vivo y grabadas facilitadas por profesionales"
          },
          {
            icon: Brain,
            label: "Herramientas de Bienestar",
            description: "Diario en video, mindfulness, ritmos binaurales y más"
          },
          {
            icon: TrendingUp,
            label: "Seguimiento de Progreso",
            description: "Visualiza tu crecimiento con informes personalizados"
          }
        ]
      },
      {
        title: "Obtén Ayuda en Cualquier Momento",
        description: "Nunca estarás solo en tu viaje. Accede a ayuda de múltiples formas siempre que la necesites.",
        image: "/lovable-uploads/f3c84972-8f58-42d7-b86f-82ff2d823b30.png",
        highlights: [
          {
            icon: Heart,
            label: "Henry - Tu Compañero de IA",
            description: "Haz clic en el botón flotante de Henry para chatear en cualquier momento"
          },
          {
            icon: Sparkles,
            label: "Botón Thrive MT",
            description: "Haz clic en el botón Thrive MT (arriba a la derecha) para tutoriales"
          },
          {
            icon: Users,
            label: "Apoyo Comunitario",
            description: "Conecta con otros en nuestras comunidades moderadas"
          }
        ]
      }
    ];
  }

  return [
    {
      title: "Welcome to Thrive MT!",
      description: "Your comprehensive mental wellness platform based on the H.E.N.R.Y. philosophy. We're here to support you every step of your journey.",
      image: "/lovable-uploads/f2c6ac08-6331-4884-950d-7f94d68ff15f.png",
      highlights: [
        {
          icon: Heart,
          label: "Hopeful Horizons",
          description: "Set and achieve your wellness goals"
        },
        {
          icon: Brain,
          label: "Empowerment through Education",
          description: "Learn mental health tools and strategies"
        },
        {
          icon: Users,
          label: "Nurtured Connections",
          description: "Connect with others on their journey"
        }
      ]
    },
    {
      title: "Explore Your Resources",
      description: "Access workshops, games, tools, and personalized content designed to support your mental wellness journey.",
      highlights: [
        {
          icon: Sparkles,
          label: "Workshops",
          description: "Live and recorded sessions facilitated by professionals"
        },
        {
          icon: Brain,
          label: "Wellness Tools",
          description: "Video diary, mindfulness, binaural beats, and more"
        },
        {
          icon: TrendingUp,
          label: "Progress Tracking",
          description: "Visualize your growth with personalized reports"
        }
      ]
    },
    {
      title: "Get Help Anytime",
      description: "You're never alone on your journey. Access help in multiple ways whenever you need it.",
      image: "/lovable-uploads/f3c84972-8f58-42d7-b86f-82ff2d823b30.png",
      highlights: [
        {
          icon: Heart,
          label: "Henry - Your AI Companion",
          description: "Click the floating Henry button to chat anytime"
        },
        {
          icon: Sparkles,
          label: "Thrive MT Button",
          description: "Click the Thrive MT button (top right) for tutorials"
        },
        {
          icon: Users,
          label: "Community Support",
          description: "Connect with others in our moderated communities"
        }
      ]
    }
  ];
};
