-- Create tables for enhanced features

-- 1. Sobriety tracking for Substance Abuse Sponsor
CREATE TABLE public.sobriety_tracking (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  sobriety_date DATE NOT NULL,
  substance_type TEXT NOT NULL DEFAULT 'alcohol',
  current_streak_days INTEGER DEFAULT 0,
  longest_streak_days INTEGER DEFAULT 0,
  milestones_achieved JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.sobriety_tracking ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own sobriety tracking"
ON public.sobriety_tracking FOR ALL
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- 2. Sponsor connections
CREATE TABLE public.sponsor_connections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  sponsor_type TEXT NOT NULL DEFAULT 'aa',
  sponsor_name TEXT,
  sponsor_contact TEXT,
  connection_status TEXT DEFAULT 'active',
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.sponsor_connections ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own sponsor connections"
ON public.sponsor_connections FOR ALL
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- 3. Music therapy recordings
CREATE TABLE public.music_therapy_recordings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  instrument TEXT NOT NULL,
  duration_seconds INTEGER,
  file_path TEXT,
  file_url TEXT,
  mood_before TEXT,
  mood_after TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.music_therapy_recordings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own music recordings"
ON public.music_therapy_recordings FOR ALL
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- 4. Art therapy gallery
CREATE TABLE public.art_therapy_gallery (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  file_path TEXT,
  file_url TEXT,
  art_type TEXT DEFAULT 'drawing',
  mood_expressed TEXT,
  is_shared BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.art_therapy_gallery ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own art"
ON public.art_therapy_gallery FOR ALL
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Anyone can view shared art"
ON public.art_therapy_gallery FOR SELECT
USING (is_shared = true);

-- 5. Career coaching progress
CREATE TABLE public.career_coaching_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  module_id TEXT NOT NULL,
  module_name TEXT NOT NULL,
  progress_percentage INTEGER DEFAULT 0,
  completed BOOLEAN DEFAULT false,
  notes JSONB DEFAULT '{}'::jsonb,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.career_coaching_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own career progress"
ON public.career_coaching_progress FOR ALL
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- 6. Feature achievements (per-feature badges)
CREATE TABLE public.feature_achievements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  feature_name TEXT NOT NULL,
  achievement_type TEXT NOT NULL,
  achievement_data JSONB DEFAULT '{}'::jsonb,
  unlocked_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, feature_name, achievement_type)
);

ALTER TABLE public.feature_achievements ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own feature achievements"
ON public.feature_achievements FOR ALL
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- 7. Video diary entries
CREATE TABLE public.video_diary_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  file_path TEXT NOT NULL,
  file_url TEXT,
  duration_seconds INTEGER,
  thumbnail_url TEXT,
  mood_tag TEXT,
  is_private BOOLEAN DEFAULT true,
  shared_with_therapist BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.video_diary_entries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own video entries"
ON public.video_diary_entries FOR ALL
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- 8. Meditation favorites
CREATE TABLE public.meditation_favorites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  meditation_id TEXT NOT NULL,
  meditation_title TEXT NOT NULL,
  category TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, meditation_id)
);

ALTER TABLE public.meditation_favorites ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own meditation favorites"
ON public.meditation_favorites FOR ALL
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- 9. Binaural favorites
CREATE TABLE public.binaural_favorites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  frequency_type TEXT NOT NULL,
  frequency_name TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, frequency_type)
);

ALTER TABLE public.binaural_favorites ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own binaural favorites"
ON public.binaural_favorites FOR ALL
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Create storage buckets
INSERT INTO storage.buckets (id, name, public) VALUES ('video-diary', 'video-diary', false);
INSERT INTO storage.buckets (id, name, public) VALUES ('music-recordings', 'music-recordings', false);
INSERT INTO storage.buckets (id, name, public) VALUES ('art-gallery', 'art-gallery', true);

-- Storage RLS policies for video-diary
CREATE POLICY "Users can upload own videos"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'video-diary' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can view own videos"
ON storage.objects FOR SELECT
USING (bucket_id = 'video-diary' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete own videos"
ON storage.objects FOR DELETE
USING (bucket_id = 'video-diary' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Storage RLS policies for music-recordings
CREATE POLICY "Users can upload own music"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'music-recordings' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can view own music"
ON storage.objects FOR SELECT
USING (bucket_id = 'music-recordings' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete own music"
ON storage.objects FOR DELETE
USING (bucket_id = 'music-recordings' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Storage RLS policies for art-gallery (public viewing)
CREATE POLICY "Users can upload own art"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'art-gallery' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Anyone can view art"
ON storage.objects FOR SELECT
USING (bucket_id = 'art-gallery');

CREATE POLICY "Users can delete own art"
ON storage.objects FOR DELETE
USING (bucket_id = 'art-gallery' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Create updated_at triggers
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_sobriety_tracking_updated_at
BEFORE UPDATE ON public.sobriety_tracking
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_sponsor_connections_updated_at
BEFORE UPDATE ON public.sponsor_connections
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_career_coaching_progress_updated_at
BEFORE UPDATE ON public.career_coaching_progress
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();