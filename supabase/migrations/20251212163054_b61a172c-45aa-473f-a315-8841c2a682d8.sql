-- Create a secure view for public therapist directory that excludes sensitive fields
CREATE OR REPLACE VIEW public.therapists_directory AS
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
COMMENT ON VIEW public.therapists_directory IS 'Public therapist directory view that excludes sensitive fields like license_number, user_id, burnout_risk_score, current_caseload, and background_check_status';