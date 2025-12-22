/**
 * Centralized route constants for the entire application
 * All app routes MUST be prefixed with /app
 * All marketing site routes are root-level (no prefix)
 */

// Marketing Site Routes
export const SITE_ROUTES = {
  ROOT: '/',
  HOME: '/home',
  THERAPY: '/therapy',
  COACHING: '/coaching',
  PRICING: '/pricing',
  HENRY: '/henry',
  ABOUT: '/about',
  CONTACT: '/contact',
  PRIVACY: '/privacy',
  TERMS: '/terms',
} as const;

// App Routes (All prefixed with /app)
export const APP_ROUTES = {
  // Authentication
  AUTH: '/app/auth',
  
  // Core Dashboard
  DASHBOARD: '/app/dashboard',
  HOME: '/app/home',
  
  // User Profile & Settings
  PROFILE: '/app/profile',
  SETTINGS: '/app/settings',
  
  // Video Sessions
  CLIENT_VIDEO_SESSION: '/app/client-video-session',
  THERAPIST_VIDEO_SESSION: '/app/therapist-video-session',
  
  // Therapy & Coaching
  THERAPY_BOOKING: '/app/therapy-booking',
  REAL_TIME_THERAPY: '/app/real-time-therapy',
  REQUEST_THERAPIST: '/app/request-therapist',
  VIRTUAL_MEETINGS: '/app/virtual-meetings',
  COACHING: '/app/coaching',
  COACH_INTRO: '/app/coach-intro',
  COACH_QUESTIONNAIRE: '/app/coach-questionnaire',
  COACH_MATCHES: '/app/coach-matches',
  
  // Mental Wellness
  MENTAL_WELLNESS: '/app/mental-wellness',
  MENTAL_WELLNESS_TOOLS: '/app/mental-wellness-tools',
  GAMES_AND_QUIZZES: '/app/games-and-quizzes',
  
  // Specialized Portals
  VETERANS_PORTAL: '/app/veterans-portal',
  COLLEGE_EXPERIENCE: '/app/college-experience',
  SMALL_BUSINESS_PORTAL: '/app/small-business-portal',
  GOLDEN_YEARS_PORTAL: '/app/golden-years-portal',
  ADOLESCENT_PORTAL: '/app/adolescent-portal',
  SINGLE_PARENTS_PORTAL: '/app/single-parents-portal',
  FIRST_RESPONDERS_PORTAL: '/app/first-responders-portal',
  HOSPITALITY_PORTAL: '/app/hospitality-portal',
  HEALTHCARE_WORKERS_PORTAL: '/app/healthcare-workers-portal',
  CANCER_SUPPORT_PORTAL: '/app/cancer-support-portal',
  DOD_PORTAL: '/app/dod-portal',
  EMPLOYEE_WELLNESS_PORTAL: '/app/employee-wellness-portal',
  
  // Wellness Tools
  DAILY_CHECK_IN: '/app/daily-check-in',
  MOOD_TRACKER: '/app/mood-tracker',
  JOURNAL: '/app/journal',
  GRATITUDE_JOURNAL: '/app/gratitude-journal',
  BREATHING_EXERCISES: '/app/breathing-exercises',
  MEDITATION_STUDIO: '/app/meditation-studio',
  BINAURAL_BEATS: '/app/binaural-beats',
  PROGRESSIVE_RELAXATION: '/app/progressive-relaxation',
  PERSONAL_CONSTELLATION: '/app/personal-constellation',
  VIRTUAL_GARDEN: '/app/virtual-garden',
  
  // Resources & Content
  WORKSHOPS: '/app/workshops',
  WORKSHOP_DETAIL: '/app/workshop',
  RESOURCES: '/app/resources',
  CRISIS_SUPPORT: '/app/crisis-support',
  COMMUNITY: '/app/community',
  
  // Messaging & Communication
  MESSAGES: '/app/messages',
  HENRY_CHAT: '/app/henry-chat',
  WHISPER_WALL: '/app/whisper-wall',
  
  // Progress & Analytics
  PROGRESS: '/app/progress',
  REWARDS: '/app/rewards',
  ACHIEVEMENTS: '/app/achievements',
  
  // Creative Tools
  VISION_BOARD: '/app/vision-board',
  GENERATIVE_VIDEO: '/app/generative-video',
  
  // Admin & Professional Portals
  THERAPIST_PORTAL: '/app/therapist-portal',
  COACH_PORTAL: '/app/coach-portal',
  ADMIN_PORTAL: '/app/admin-portal',
} as const;

// Helper function to build route with dynamic params
export const buildRoute = (route: string, params: Record<string, string>) => {
  let builtRoute = route;
  Object.entries(params).forEach(([key, value]) => {
    builtRoute = builtRoute.replace(`:${key}`, value);
  });
  return builtRoute;
};

// Helper to check if a route is an app route
export const isAppRoute = (path: string) => path.startsWith('/app');

// Helper to check if a route is a site route
export const isSiteRoute = (path: string) => !path.startsWith('/app');
