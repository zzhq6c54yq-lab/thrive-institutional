-- Create beta_signups table
CREATE TABLE public.beta_signups (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  email text NOT NULL UNIQUE,
  created_at timestamptz DEFAULT now() NOT NULL
);

-- Enable RLS
ALTER TABLE public.beta_signups ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (anyone can sign up)
CREATE POLICY "Anyone can sign up for beta" ON public.beta_signups
  FOR INSERT WITH CHECK (true);

-- No SELECT policy for public - emails are private
-- Only admins can view emails via service role

-- Create count function (returns 1001 + actual count, no email exposure)
CREATE OR REPLACE FUNCTION public.get_beta_signup_count()
RETURNS integer
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT 1001 + COUNT(*)::integer FROM public.beta_signups;
$$;

-- Grant execute permission to anonymous users
GRANT EXECUTE ON FUNCTION public.get_beta_signup_count() TO anon;
GRANT EXECUTE ON FUNCTION public.get_beta_signup_count() TO authenticated;