
-- Create support_wall table for community messages
CREATE TABLE IF NOT EXISTS public.support_wall (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  content text NOT NULL,
  hearts integer DEFAULT 0,
  is_flagged boolean DEFAULT false,
  created_at timestamp with time zone DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.support_wall ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read posts (for community sharing)
CREATE POLICY "Anyone can read support posts" 
  ON public.support_wall 
  FOR SELECT 
  USING (NOT is_flagged);

-- Users can post anonymously (but we still track user_id for moderation)
CREATE POLICY "Users can post to support wall" 
  ON public.support_wall 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- Users can update hearts on posts
CREATE POLICY "Users can update hearts" 
  ON public.support_wall 
  FOR UPDATE 
  USING (true)
  WITH CHECK (true);

-- Create hearts tracking table to prevent duplicate hearts
CREATE TABLE IF NOT EXISTS public.support_wall_hearts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id uuid REFERENCES public.support_wall(id) ON DELETE CASCADE,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at timestamp with time zone DEFAULT now(),
  UNIQUE(post_id, user_id)
);

-- Enable RLS for hearts
ALTER TABLE public.support_wall_hearts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own hearts" 
  ON public.support_wall_hearts 
  FOR ALL 
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);
