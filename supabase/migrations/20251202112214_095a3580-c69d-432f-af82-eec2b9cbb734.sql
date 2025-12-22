-- Create user_health_connections table for Apple Health, Google Fit, Fitbit integration
CREATE TABLE IF NOT EXISTS public.user_health_connections (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  provider TEXT NOT NULL CHECK (provider IN ('apple_health', 'google_fit', 'fitbit')),
  access_token TEXT,
  refresh_token TEXT,
  last_sync_at TIMESTAMPTZ,
  enabled BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, provider)
);

-- Enable RLS
ALTER TABLE public.user_health_connections ENABLE ROW LEVEL SECURITY;

-- RLS Policies: Users can only access their own connections
CREATE POLICY "Users can view their own health connections"
  ON public.user_health_connections
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own health connections"
  ON public.user_health_connections
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own health connections"
  ON public.user_health_connections
  FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own health connections"
  ON public.user_health_connections
  FOR DELETE
  USING (auth.uid() = user_id);

-- Create updated_at trigger
CREATE TRIGGER update_user_health_connections_updated_at
  BEFORE UPDATE ON public.user_health_connections
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- Create index for faster queries
CREATE INDEX idx_user_health_connections_user_id ON public.user_health_connections(user_id);
CREATE INDEX idx_user_health_connections_provider ON public.user_health_connections(provider);