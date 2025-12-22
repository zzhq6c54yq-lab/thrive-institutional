-- Create henry_conversations table
CREATE TABLE IF NOT EXISTS public.henry_conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  started_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  last_message_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  message_count INTEGER DEFAULT 0,
  current_risk_level TEXT DEFAULT 'low',
  metadata JSONB DEFAULT '{}'::jsonb
);

-- Create henry_messages table
CREATE TABLE IF NOT EXISTS public.henry_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID NOT NULL REFERENCES public.henry_conversations(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant', 'system')),
  content TEXT NOT NULL,
  agent_type TEXT CHECK (agent_type IN ('router', 'therapy', 'crisis', 'wellness', 'coaching')),
  risk_assessment JSONB,
  intent_classification JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create henry_risk_assessments table
CREATE TABLE IF NOT EXISTS public.henry_risk_assessments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID NOT NULL REFERENCES public.henry_conversations(id) ON DELETE CASCADE,
  message_id UUID REFERENCES public.henry_messages(id) ON DELETE CASCADE,
  risk_level TEXT NOT NULL CHECK (risk_level IN ('low', 'moderate', 'high', 'crisis')),
  risk_factors TEXT[],
  confidence_score NUMERIC(3,2),
  recommended_action TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create henry_mood_trends table
CREATE TABLE IF NOT EXISTS public.henry_mood_trends (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  conversation_id UUID REFERENCES public.henry_conversations(id) ON DELETE CASCADE,
  mood_score INTEGER CHECK (mood_score BETWEEN 1 AND 5),
  sentiment TEXT CHECK (sentiment IN ('positive', 'neutral', 'negative', 'crisis')),
  topics TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_henry_conversations_user_id ON public.henry_conversations(user_id);
CREATE INDEX IF NOT EXISTS idx_henry_conversations_last_message ON public.henry_conversations(last_message_at DESC);
CREATE INDEX IF NOT EXISTS idx_henry_messages_conversation_id ON public.henry_messages(conversation_id);
CREATE INDEX IF NOT EXISTS idx_henry_messages_created_at ON public.henry_messages(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_henry_risk_assessments_conversation_id ON public.henry_risk_assessments(conversation_id);
CREATE INDEX IF NOT EXISTS idx_henry_mood_trends_user_id ON public.henry_mood_trends(user_id);

-- Enable RLS
ALTER TABLE public.henry_conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.henry_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.henry_risk_assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.henry_mood_trends ENABLE ROW LEVEL SECURITY;

-- RLS Policies for henry_conversations
CREATE POLICY "Users can view own conversations"
  ON public.henry_conversations FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own conversations"
  ON public.henry_conversations FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own conversations"
  ON public.henry_conversations FOR UPDATE
  USING (auth.uid() = user_id);

-- RLS Policies for henry_messages
CREATE POLICY "Users can view messages in own conversations"
  ON public.henry_messages FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.henry_conversations
      WHERE henry_conversations.id = henry_messages.conversation_id
      AND henry_conversations.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert messages in own conversations"
  ON public.henry_messages FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.henry_conversations
      WHERE henry_conversations.id = henry_messages.conversation_id
      AND henry_conversations.user_id = auth.uid()
    )
  );

-- RLS Policies for henry_risk_assessments
CREATE POLICY "Users can view own risk assessments"
  ON public.henry_risk_assessments FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.henry_conversations
      WHERE henry_conversations.id = henry_risk_assessments.conversation_id
      AND henry_conversations.user_id = auth.uid()
    )
  );

-- RLS Policies for henry_mood_trends
CREATE POLICY "Users can view own mood trends"
  ON public.henry_mood_trends FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own mood trends"
  ON public.henry_mood_trends FOR INSERT
  WITH CHECK (auth.uid() = user_id);