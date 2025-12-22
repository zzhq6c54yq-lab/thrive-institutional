
-- Create enhanced profiles table with user roles and metadata
CREATE TABLE IF NOT EXISTS public.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text,
  full_name text,
  role text DEFAULT 'default',
  user_type text, -- veteran, adolescent, first_responder, etc.
  onboarding_completed boolean DEFAULT false,
  goals text[],
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Create appointments table for therapist scheduling
CREATE TABLE IF NOT EXISTS public.appointments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  therapist_id uuid,
  appointment_date timestamp with time zone,
  duration_minutes integer DEFAULT 60,
  status text DEFAULT 'scheduled', -- scheduled, completed, cancelled
  notes text,
  created_at timestamp with time zone DEFAULT now()
);

-- Create messages table for therapist chat
CREATE TABLE IF NOT EXISTS public.messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id uuid,
  sender_id uuid REFERENCES auth.users(id),
  recipient_id uuid REFERENCES auth.users(id),
  content text NOT NULL,
  message_type text DEFAULT 'text', -- text, system, appointment
  read_at timestamp with time zone,
  created_at timestamp with time zone DEFAULT now()
);

-- Create crisis_events table for emergency logging
CREATE TABLE IF NOT EXISTS public.crisis_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id),
  event_type text DEFAULT 'panic_button', -- panic_button, emergency_contact, etc.
  source text, -- where the crisis was triggered from
  resolved_at timestamp with time zone,
  created_at timestamp with time zone DEFAULT now()
);

-- Enhance existing journal_entries table
ALTER TABLE public.journal_entries 
ADD COLUMN IF NOT EXISTS mood_score integer CHECK (mood_score >= 1 AND mood_score <= 5),
ADD COLUMN IF NOT EXISTS ai_sentiment text,
ADD COLUMN IF NOT EXISTS ai_response text;

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.crisis_events ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for profiles
CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Create RLS policies for appointments
CREATE POLICY "Users can view their own appointments" ON public.appointments
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own appointments" ON public.appointments
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create RLS policies for messages
CREATE POLICY "Users can view their own messages" ON public.messages
  FOR SELECT USING (auth.uid() = sender_id OR auth.uid() = recipient_id);

CREATE POLICY "Users can send messages" ON public.messages
  FOR INSERT WITH CHECK (auth.uid() = sender_id);

-- Create RLS policies for crisis_events
CREATE POLICY "Users can view their own crisis events" ON public.crisis_events
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can log their own crisis events" ON public.crisis_events
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create function to handle new user profile creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    new.id,
    new.email,
    COALESCE(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name', split_part(new.email, '@', 1))
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user profile creation
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
