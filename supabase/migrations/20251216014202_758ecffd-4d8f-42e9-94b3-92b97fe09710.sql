-- Fix RLS policies for Apple App Store compliance
-- Therapists and coaches tables should require authentication for viewing

-- Drop existing overly permissive policies on therapists
DROP POLICY IF EXISTS "Anyone can view active therapists" ON public.therapists;
DROP POLICY IF EXISTS "Public can view therapist directory" ON public.therapists;
DROP POLICY IF EXISTS "Therapists are publicly viewable" ON public.therapists;

-- Create secure policies for therapists
CREATE POLICY "Authenticated users can view active therapists"
ON public.therapists
FOR SELECT
TO authenticated
USING (is_active = true);

CREATE POLICY "Therapists can view and update their own profile"
ON public.therapists
FOR ALL
TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

-- Drop existing overly permissive policies on coaches
DROP POLICY IF EXISTS "Anyone can view active coaches" ON public.coaches;
DROP POLICY IF EXISTS "Public can view coaches" ON public.coaches;
DROP POLICY IF EXISTS "Coaches are publicly viewable" ON public.coaches;

-- Create secure policies for coaches
CREATE POLICY "Authenticated users can view active coaches"
ON public.coaches
FOR SELECT
TO authenticated
USING (is_active = true);

CREATE POLICY "Coaches can view and update their own profile"
ON public.coaches
FOR ALL
TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());