import { useNavigate, NavigateOptions } from 'react-router-dom';
import { APP_ROUTES, SITE_ROUTES, isAppRoute } from '@/constants/routes';

/**
 * Custom navigation hook that ensures proper route prefixing
 * Automatically adds /app prefix for app routes if missing
 * Logs warnings for deprecated navigation patterns
 */
export const useAppNavigate = () => {
  const navigate = useNavigate();

  const appNavigate = (to: string, options?: NavigateOptions) => {
    let targetPath = to;

    // If navigating to an app route that's missing /app prefix, add it
    if (!to.startsWith('/app') && !to.startsWith('/home') && !to.startsWith('/therapy') && 
        !to.startsWith('/coaching') && !to.startsWith('/pricing') && !to.startsWith('/henry') &&
        !to.startsWith('/about') && !to.startsWith('/contact') && !to.startsWith('/privacy') && 
        !to.startsWith('/terms')) {
      
      // Check if this looks like an app route (common app paths)
      const appRoutePatterns = [
        'dashboard', 'profile', 'settings', 'video-session', 'therapy', 'messages',
        'portal', 'wellness', 'journal', 'breathing', 'meditation', 'workshop',
        'progress', 'rewards', 'achievements', 'vision-board', 'generative-video',
        'auth', 'coach', 'admin', 'check-in', 'mood-tracker', 'gratitude', 'binaural',
        'progressive-relaxation', 'constellation', 'garden', 'resources', 'crisis',
        'community', 'henry-chat', 'whisper-wall', 'booking', 'request-therapist',
        'virtual-meetings', 'games', 'quizzes', 'veterans', 'college', 'small-business',
        'golden-years', 'adolescent', 'single-parents', 'first-responders', 'hospitality',
        'healthcare', 'cancer-support', 'dod', 'employee-wellness'
      ];

      const isLikelyAppRoute = appRoutePatterns.some(pattern => 
        to.includes(pattern) || to.startsWith(`/${pattern}`)
      );

      if (isLikelyAppRoute) {
        targetPath = `/app${to.startsWith('/') ? to : `/${to}`}`;
        console.warn(`[useAppNavigate] Auto-prefixed app route: ${to} → ${targetPath}`);
      }
    }

    navigate(targetPath, options);
  };

  return appNavigate;
};
