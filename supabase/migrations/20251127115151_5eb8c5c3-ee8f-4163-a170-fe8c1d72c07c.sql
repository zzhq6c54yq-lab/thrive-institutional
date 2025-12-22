-- Create video_call_invites table for signaling incoming calls
CREATE TABLE IF NOT EXISTS public.video_call_invites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID NOT NULL,
  therapist_id UUID NOT NULL,
  client_id UUID NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'declined', 'expired')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.video_call_invites ENABLE ROW LEVEL SECURITY;

-- Therapists can create invites
CREATE POLICY "Therapists can create call invites"
  ON public.video_call_invites
  FOR INSERT
  WITH CHECK (auth.uid() = therapist_id);

-- Therapists can view invites they created
CREATE POLICY "Therapists can view their invites"
  ON public.video_call_invites
  FOR SELECT
  USING (auth.uid() = therapist_id);

-- Clients can view invites sent to them
CREATE POLICY "Clients can view their invites"
  ON public.video_call_invites
  FOR SELECT
  USING (auth.uid() = client_id);

-- Clients can update their invites (accept/decline)
CREATE POLICY "Clients can update their invites"
  ON public.video_call_invites
  FOR UPDATE
  USING (auth.uid() = client_id);

-- Add updated_at trigger
CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON public.video_call_invites
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- Add to realtime publication
ALTER PUBLICATION supabase_realtime ADD TABLE public.video_call_invites;