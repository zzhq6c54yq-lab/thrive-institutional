-- Add email column to profiles table for parent connection lookups
ALTER TABLE public.profiles
ADD COLUMN email TEXT UNIQUE;

-- Add index for faster email lookups
CREATE INDEX idx_profiles_email ON public.profiles(email);

-- Create function to sync email from auth.users to profiles
CREATE OR REPLACE FUNCTION public.sync_profile_email()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Update profile email when user email changes
  UPDATE public.profiles
  SET email = NEW.email
  WHERE id = NEW.id;
  RETURN NEW;
END;
$$;

-- Create trigger to keep profile email in sync with auth.users
CREATE TRIGGER on_auth_user_email_updated
  AFTER UPDATE OF email ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.sync_profile_email();

-- Backfill existing emails from auth.users to profiles
UPDATE public.profiles
SET email = auth.users.email
FROM auth.users
WHERE profiles.id = auth.users.id;