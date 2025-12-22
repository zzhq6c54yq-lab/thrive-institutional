-- Create enum for module types
CREATE TYPE public.career_module_type AS ENUM ('career_development', 'leadership_skills', 'resume_building', 'goal_setting');

-- Create enum for course types
CREATE TYPE public.career_course_type AS ENUM ('leadership_fundamentals', 'strategic_communication', 'remote_team_management');

-- Create enum for resource types
CREATE TYPE public.career_resource_type AS ENUM ('career_assessment', 'template_library', 'interview_simulator', 'goal_planner');

-- Track user progress through career modules
CREATE TABLE public.career_module_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  module_type career_module_type NOT NULL,
  progress INTEGER DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
  completed BOOLEAN DEFAULT false,
  last_accessed_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(user_id, module_type)
);

-- Track course enrollments
CREATE TABLE public.course_enrollments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  course_type career_course_type NOT NULL,
  enrolled_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  progress INTEGER DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
  completed BOOLEAN DEFAULT false,
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(user_id, course_type)
);

-- Track 1:1 coaching sessions
CREATE TABLE public.coaching_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  preferred_date DATE NOT NULL,
  preferred_time TEXT NOT NULL,
  focus_area TEXT NOT NULL,
  additional_notes TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Track event registrations
CREATE TABLE public.event_registrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  event_title TEXT NOT NULL,
  event_date TEXT NOT NULL,
  event_type TEXT NOT NULL,
  registered_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(user_id, event_title, event_date)
);

-- Track career assessment results
CREATE TABLE public.career_assessments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  resource_type career_resource_type NOT NULL,
  responses JSONB,
  results JSONB,
  completed_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.career_module_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.course_enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.coaching_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.event_registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.career_assessments ENABLE ROW LEVEL SECURITY;

-- RLS Policies for career_module_progress
CREATE POLICY "Users can view own module progress"
  ON public.career_module_progress FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own module progress"
  ON public.career_module_progress FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own module progress"
  ON public.career_module_progress FOR UPDATE
  USING (auth.uid() = user_id);

-- RLS Policies for course_enrollments
CREATE POLICY "Users can view own course enrollments"
  ON public.course_enrollments FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own course enrollments"
  ON public.course_enrollments FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own course enrollments"
  ON public.course_enrollments FOR UPDATE
  USING (auth.uid() = user_id);

-- RLS Policies for coaching_sessions
CREATE POLICY "Users can view own coaching sessions"
  ON public.coaching_sessions FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own coaching sessions"
  ON public.coaching_sessions FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own coaching sessions"
  ON public.coaching_sessions FOR UPDATE
  USING (auth.uid() = user_id);

-- RLS Policies for event_registrations
CREATE POLICY "Users can view own event registrations"
  ON public.event_registrations FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own event registrations"
  ON public.event_registrations FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- RLS Policies for career_assessments
CREATE POLICY "Users can view own career assessments"
  ON public.career_assessments FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own career assessments"
  ON public.career_assessments FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Create updated_at trigger function if it doesn't exist
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add triggers for updated_at
CREATE TRIGGER set_career_module_progress_updated_at
  BEFORE UPDATE ON public.career_module_progress
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER set_course_enrollments_updated_at
  BEFORE UPDATE ON public.course_enrollments
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER set_coaching_sessions_updated_at
  BEFORE UPDATE ON public.coaching_sessions
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();