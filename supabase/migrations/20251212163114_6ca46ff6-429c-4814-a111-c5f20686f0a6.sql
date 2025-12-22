-- Drop and recreate the view with SECURITY INVOKER (default, but explicitly set)
DROP VIEW IF EXISTS public.therapists_directory;

CREATE VIEW public.therapists_directory 
WITH (security_invoker = true) AS
SELECT 
  id,
  name,
  title,
  bio,
  specialties,
  approach,
  experience_years,
  image_url,
  hourly_rate,
  rating,
  total_reviews,
  is_active,
  video_url,
  created_at
FROM public.therapists
WHERE is_active = true;

-- Grant access to the view
GRANT SELECT ON public.therapists_directory TO authenticated, anon;

-- Add comment explaining the view
COMMENT ON VIEW public.therapists_directory IS 'Public therapist directory view that excludes sensitive fields';