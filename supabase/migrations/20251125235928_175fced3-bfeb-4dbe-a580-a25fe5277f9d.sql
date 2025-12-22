-- Phase 1: Update therapist name from Dr. Emily to Dr. Damien Pena
UPDATE therapists 
SET 
  name = 'Dr. Damien Pena',
  title = 'Licensed Clinical Psychologist',
  bio = 'Dr. Damien Pena is a licensed clinical psychologist specializing in evidence-based therapy approaches. With years of experience helping clients navigate anxiety, depression, trauma, and life transitions, Dr. Pena creates a safe, supportive environment for healing and growth.'
WHERE name LIKE '%Emily%' OR name LIKE '%Dr.%';

-- Phase 2: Create therapist_requests table
CREATE TABLE IF NOT EXISTS therapist_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  therapist_id UUID REFERENCES therapists(id) ON DELETE SET NULL,
  request_type TEXT NOT NULL CHECK (request_type IN ('initial_consultation', 'urgent', 'video_message', 'text_message', 'callback_request')),
  message TEXT,
  video_url TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'declined', 'completed')),
  priority TEXT NOT NULL DEFAULT 'normal' CHECK (priority IN ('normal', 'high', 'urgent')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  responded_at TIMESTAMP WITH TIME ZONE
);

-- Create indexes for performance
CREATE INDEX idx_therapist_requests_user_id ON therapist_requests(user_id);
CREATE INDEX idx_therapist_requests_therapist_id ON therapist_requests(therapist_id);
CREATE INDEX idx_therapist_requests_status ON therapist_requests(status);
CREATE INDEX idx_therapist_requests_created_at ON therapist_requests(created_at DESC);

-- Enable RLS
ALTER TABLE therapist_requests ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can create their own requests"
  ON therapist_requests FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own requests"
  ON therapist_requests FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Therapists can view all requests"
  ON therapist_requests FOR SELECT
  USING (
    therapist_id IN (
      SELECT id FROM therapists WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Therapists can update requests"
  ON therapist_requests FOR UPDATE
  USING (
    therapist_id IN (
      SELECT id FROM therapists WHERE user_id = auth.uid()
    )
  );

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_therapist_requests_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER therapist_requests_updated_at
  BEFORE UPDATE ON therapist_requests
  FOR EACH ROW
  EXECUTE FUNCTION update_therapist_requests_updated_at();

-- Create storage bucket for video messages if not exists
INSERT INTO storage.buckets (id, name, public)
VALUES ('therapist-video-messages', 'therapist-video-messages', false)
ON CONFLICT (id) DO NOTHING;

-- Storage policies for video messages
CREATE POLICY "Users can upload video messages"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'therapist-video-messages' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can view their own video messages"
  ON storage.objects FOR SELECT
  USING (
    bucket_id = 'therapist-video-messages' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Therapists can view all video messages"
  ON storage.objects FOR SELECT
  USING (
    bucket_id = 'therapist-video-messages' AND
    EXISTS (
      SELECT 1 FROM therapists WHERE user_id = auth.uid()
    )
  );