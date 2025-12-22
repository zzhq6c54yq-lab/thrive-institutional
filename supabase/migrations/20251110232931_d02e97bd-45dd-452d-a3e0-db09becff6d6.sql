-- Create analytics tables for progress tracking

-- User activity tracking
CREATE TABLE IF NOT EXISTS public.user_activities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  activity_type TEXT NOT NULL,
  activity_name TEXT NOT NULL,
  duration_minutes INTEGER,
  completed_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Mood tracking
CREATE TABLE IF NOT EXISTS public.mood_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  mood_score INTEGER NOT NULL CHECK (mood_score >= 1 AND mood_score <= 10),
  mood_label TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Wellness metrics
CREATE TABLE IF NOT EXISTS public.wellness_metrics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  metric_type TEXT NOT NULL,
  metric_value NUMERIC NOT NULL,
  metric_unit TEXT,
  recorded_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.user_activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mood_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wellness_metrics ENABLE ROW LEVEL SECURITY;

-- RLS Policies for user_activities
CREATE POLICY "Users can view own activities"
  ON public.user_activities FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own activities"
  ON public.user_activities FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- RLS Policies for mood_entries
CREATE POLICY "Users can view own mood entries"
  ON public.mood_entries FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own mood entries"
  ON public.mood_entries FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own mood entries"
  ON public.mood_entries FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own mood entries"
  ON public.mood_entries FOR DELETE
  USING (auth.uid() = user_id);

-- RLS Policies for wellness_metrics
CREATE POLICY "Users can view own wellness metrics"
  ON public.wellness_metrics FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own wellness metrics"
  ON public.wellness_metrics FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_user_activities_user_id ON public.user_activities(user_id);
CREATE INDEX IF NOT EXISTS idx_user_activities_completed_at ON public.user_activities(completed_at);
CREATE INDEX IF NOT EXISTS idx_mood_entries_user_id ON public.mood_entries(user_id);
CREATE INDEX IF NOT EXISTS idx_mood_entries_created_at ON public.mood_entries(created_at);
CREATE INDEX IF NOT EXISTS idx_wellness_metrics_user_id ON public.wellness_metrics(user_id);
CREATE INDEX IF NOT EXISTS idx_wellness_metrics_recorded_at ON public.wellness_metrics(recorded_at);