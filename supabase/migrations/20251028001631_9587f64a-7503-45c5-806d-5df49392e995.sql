-- Create whispers table for anonymous posts
CREATE TABLE public.whispers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  content TEXT NOT NULL,
  hearts INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create replies table for anonymous comments
CREATE TABLE public.replies (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  whisper_id UUID NOT NULL REFERENCES public.whispers(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.whispers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.replies ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read whispers
CREATE POLICY "Anyone can view whispers" 
ON public.whispers 
FOR SELECT 
USING (true);

-- Allow anyone to create whispers (anonymous posting)
CREATE POLICY "Anyone can create whispers" 
ON public.whispers 
FOR INSERT 
WITH CHECK (true);

-- Allow anyone to update whisper hearts
CREATE POLICY "Anyone can update whisper hearts" 
ON public.whispers 
FOR UPDATE 
USING (true);

-- Allow anyone to read replies
CREATE POLICY "Anyone can view replies" 
ON public.replies 
FOR SELECT 
USING (true);

-- Allow anyone to create replies (anonymous commenting)
CREATE POLICY "Anyone can create replies" 
ON public.replies 
FOR INSERT 
WITH CHECK (true);

-- Create indexes for better performance
CREATE INDEX idx_whispers_created_at ON public.whispers(created_at DESC);
CREATE INDEX idx_replies_whisper_id ON public.replies(whisper_id);