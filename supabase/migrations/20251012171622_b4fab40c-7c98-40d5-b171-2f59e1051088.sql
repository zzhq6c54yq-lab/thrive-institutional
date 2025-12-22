-- Create profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  user_type TEXT,
  onboarding_completed BOOLEAN DEFAULT false,
  goals TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Create trigger function for auto-creating profiles
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id)
  VALUES (new.id);
  RETURN new;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create journal_entries table
CREATE TABLE public.journal_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  mood TEXT NOT NULL,
  notes TEXT,
  mood_score INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.journal_entries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own journal entries"
  ON public.journal_entries FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own journal entries"
  ON public.journal_entries FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own journal entries"
  ON public.journal_entries FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own journal entries"
  ON public.journal_entries FOR DELETE
  USING (auth.uid() = user_id);

-- Create feedback table
CREATE TABLE public.feedback (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  message TEXT NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 10),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.feedback ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can insert own feedback"
  ON public.feedback FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Create crisis_events table
CREATE TABLE public.crisis_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  event_type TEXT NOT NULL,
  source TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.crisis_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can insert own crisis events"
  ON public.crisis_events FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Create support_wall table
CREATE TABLE public.support_wall (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  content TEXT NOT NULL,
  hearts INTEGER DEFAULT 0,
  is_flagged BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.support_wall ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view non-flagged posts"
  ON public.support_wall FOR SELECT
  USING (is_flagged = false);

CREATE POLICY "Authenticated users can create posts"
  ON public.support_wall FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Create support_wall_hearts table
CREATE TABLE public.support_wall_hearts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID REFERENCES public.support_wall(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(post_id, user_id)
);

ALTER TABLE public.support_wall_hearts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view all hearts"
  ON public.support_wall_hearts FOR SELECT
  USING (true);

CREATE POLICY "Users can add own hearts"
  ON public.support_wall_hearts FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can remove own hearts"
  ON public.support_wall_hearts FOR DELETE
  USING (auth.uid() = user_id);

-- Create increment_hearts function
CREATE OR REPLACE FUNCTION public.increment_hearts(post_id UUID)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE public.support_wall
  SET hearts = hearts + 1
  WHERE id = post_id;
END;
$$;

-- Create decrement_hearts function
CREATE OR REPLACE FUNCTION public.decrement_hearts(post_id UUID)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE public.support_wall
  SET hearts = GREATEST(hearts - 1, 0)
  WHERE id = post_id;
END;
$$;

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Add updated_at trigger to profiles
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();