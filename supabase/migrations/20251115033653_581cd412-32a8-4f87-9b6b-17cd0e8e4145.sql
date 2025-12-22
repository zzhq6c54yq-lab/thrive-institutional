-- This migration prepares the database for the therapist demo account
-- The actual auth user must be created manually via Supabase Auth Dashboard

-- Clean up any existing therapist demo data
DELETE FROM profiles WHERE email = 'therapist@demo.com';
DELETE FROM therapists WHERE user_id IN (
  SELECT id FROM profiles WHERE email = 'therapist@demo.com'
);

-- After running this migration, create the auth user via Supabase Dashboard:
-- 1. Go to Authentication > Users
-- 2. Click "Add user" -> "Create new user"
-- 3. Email: therapist@demo.com
-- 4. Password: 0001
-- 5. Auto Confirm User: YES
-- 6. User will get a UUID assigned

-- Then run this to update the profile:
-- UPDATE profiles SET is_therapist = true, onboarding_completed = true, display_name = 'Dr. Sarah Mitchell' WHERE email = 'therapist@demo.com';