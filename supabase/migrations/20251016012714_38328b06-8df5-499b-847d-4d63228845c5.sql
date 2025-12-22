-- Create enum for user roles
CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');

-- Create user_roles table
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE (user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Allow users to view their own roles
CREATE POLICY "Users can view own roles"
ON public.user_roles
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- Only admins can insert/update/delete roles
CREATE POLICY "Only admins can manage roles"
ON public.user_roles
FOR ALL
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = auth.uid() AND role = 'admin'
  )
);

-- Create security definer function to check user roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Add UPDATE policy to henry_questions (only admins)
CREATE POLICY "Only admins can update question status"
ON public.henry_questions
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Add DELETE policy to henry_questions (only admins)
CREATE POLICY "Only admins can delete questions"
ON public.henry_questions
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Fix henry_qa_feed view to use SECURITY INVOKER
DROP VIEW IF EXISTS public.henry_qa_feed CASCADE;

CREATE VIEW public.henry_qa_feed
WITH (security_invoker=true)
AS
SELECT 
  q.id,
  q.question_text,
  q.category,
  q.is_anonymous,
  q.created_at,
  a.id as answer_id,
  a.answer_text,
  a.author,
  a.published_at,
  COUNT(h.id)::integer as appreciation_count
FROM public.henry_questions q
LEFT JOIN public.henry_answers a ON a.question_id = q.id
LEFT JOIN public.henry_appreciations h ON h.question_id = q.id
WHERE q.status = 'answered'
GROUP BY q.id, a.id, a.answer_text, a.author, a.published_at;

-- Enable RLS on the view
ALTER VIEW public.henry_qa_feed SET (security_invoker=true);

-- Add comment explaining the security model
COMMENT ON TABLE public.user_roles IS 'Stores user roles for access control. Use has_role() function in RLS policies to check permissions.';
COMMENT ON FUNCTION public.has_role IS 'Security definer function to check if a user has a specific role. Use in RLS policies to avoid recursion.';