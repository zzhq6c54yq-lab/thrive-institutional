-- Step 1: Create missing profile for logged-in user
INSERT INTO public.profiles (id, email, display_name, onboarding_completed, created_at, updated_at)
VALUES (
  'fc9fcf74-833a-4688-9844-2846a5cbb3f7',
  'damnpena01@icloud.com',
  'Damien Pena',
  true,
  NOW(),
  NOW()
)
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  onboarding_completed = EXCLUDED.onboarding_completed,
  updated_at = NOW();

-- Step 2: Improve handle_new_user function to populate email
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, display_name, created_at, updated_at)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(
      NEW.raw_user_meta_data->>'name',
      NEW.raw_user_meta_data->>'full_name',
      split_part(NEW.email, '@', 1)
    ),
    NOW(),
    NOW()
  );
  RETURN NEW;
END;
$$;

-- Step 3: Create trigger to auto-create profiles on signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();