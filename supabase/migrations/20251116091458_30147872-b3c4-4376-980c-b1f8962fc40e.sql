-- Add demo video URL to demo therapist profile
UPDATE public.therapists
SET 
  video_url = 'https://cdn.pixabay.com/video/2023/06/15/167834-837629621_large.mp4',
  updated_at = NOW()
WHERE user_id = '00000000-0000-0000-0000-000000000001'::uuid;