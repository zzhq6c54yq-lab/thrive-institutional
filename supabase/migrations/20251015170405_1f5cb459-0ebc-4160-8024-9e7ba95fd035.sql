-- Create enum for question categories
CREATE TYPE henry_category AS ENUM (
  'anxiety',
  'relationships',
  'self-esteem',
  'depression',
  'purpose',
  'trauma',
  'motivation'
);

-- Create enum for question status
CREATE TYPE henry_status AS ENUM (
  'pending',
  'approved',
  'answered',
  'rejected'
);

-- Table: henry_questions
CREATE TABLE henry_questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  question_text TEXT NOT NULL,
  category henry_category NOT NULL,
  is_anonymous BOOLEAN DEFAULT true,
  status henry_status NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_henry_questions_status ON henry_questions(status);
CREATE INDEX idx_henry_questions_category ON henry_questions(category);
CREATE INDEX idx_henry_questions_created_at ON henry_questions(created_at DESC);

-- Table: henry_answers
CREATE TABLE henry_answers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question_id UUID NOT NULL REFERENCES henry_questions(id) ON DELETE CASCADE,
  answer_text TEXT NOT NULL,
  author TEXT DEFAULT 'Henry' NOT NULL,
  published_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for quick question-answer lookup
CREATE INDEX idx_henry_answers_question_id ON henry_answers(question_id);
CREATE INDEX idx_henry_answers_published_at ON henry_answers(published_at DESC);

-- Table: henry_appreciations
CREATE TABLE henry_appreciations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question_id UUID NOT NULL REFERENCES henry_questions(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(question_id, user_id)
);

-- Index for counting appreciations
CREATE INDEX idx_henry_appreciations_question_id ON henry_appreciations(question_id);
CREATE INDEX idx_henry_appreciations_user_id ON henry_appreciations(user_id);

-- Table: henry_bookmarks
CREATE TABLE henry_bookmarks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question_id UUID NOT NULL REFERENCES henry_questions(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(question_id, user_id)
);

-- Index for user's bookmarks
CREATE INDEX idx_henry_bookmarks_user_id ON henry_bookmarks(user_id);
CREATE INDEX idx_henry_bookmarks_question_id ON henry_bookmarks(question_id);

-- Table: insight_tokens (Gamification)
CREATE TABLE insight_tokens (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  tokens_earned INTEGER DEFAULT 0,
  total_appreciations INTEGER DEFAULT 0,
  total_bookmarks INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id)
);

-- Index for leaderboard
CREATE INDEX idx_insight_tokens_tokens_earned ON insight_tokens(tokens_earned DESC);

-- Enable RLS
ALTER TABLE henry_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE henry_answers ENABLE ROW LEVEL SECURITY;
ALTER TABLE henry_appreciations ENABLE ROW LEVEL SECURITY;
ALTER TABLE henry_bookmarks ENABLE ROW LEVEL SECURITY;
ALTER TABLE insight_tokens ENABLE ROW LEVEL SECURITY;

-- RLS Policies for henry_questions
CREATE POLICY "Anyone can view answered questions"
  ON henry_questions FOR SELECT
  USING (status = 'answered');

CREATE POLICY "Authenticated users can submit questions"
  ON henry_questions FOR INSERT
  WITH CHECK (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "Users can view own questions"
  ON henry_questions FOR SELECT
  USING (auth.uid() = user_id);

-- RLS Policies for henry_answers
CREATE POLICY "Anyone can view published answers"
  ON henry_answers FOR SELECT
  USING (true);

-- RLS Policies for henry_appreciations
CREATE POLICY "Users can view all appreciations"
  ON henry_appreciations FOR SELECT
  USING (true);

CREATE POLICY "Users can add own appreciations"
  ON henry_appreciations FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can remove own appreciations"
  ON henry_appreciations FOR DELETE
  USING (auth.uid() = user_id);

-- RLS Policies for henry_bookmarks
CREATE POLICY "Users can view own bookmarks"
  ON henry_bookmarks FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can add own bookmarks"
  ON henry_bookmarks FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can remove own bookmarks"
  ON henry_bookmarks FOR DELETE
  USING (auth.uid() = user_id);

-- RLS Policies for insight_tokens
CREATE POLICY "Users can view own tokens"
  ON insight_tokens FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can view leaderboard"
  ON insight_tokens FOR SELECT
  USING (true);

-- Triggers for updated_at
CREATE TRIGGER update_henry_questions_updated_at
  BEFORE UPDATE ON henry_questions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_henry_answers_updated_at
  BEFORE UPDATE ON henry_answers
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_insight_tokens_updated_at
  BEFORE UPDATE ON insight_tokens
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Function to award insight tokens for appreciations
CREATE OR REPLACE FUNCTION award_appreciation_token()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO insight_tokens (user_id, tokens_earned, total_appreciations)
  VALUES (NEW.user_id, 1, 1)
  ON CONFLICT (user_id)
  DO UPDATE SET
    tokens_earned = insight_tokens.tokens_earned + 1,
    total_appreciations = insight_tokens.total_appreciations + 1,
    updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Trigger to award tokens when user appreciates
CREATE TRIGGER on_appreciation_added
  AFTER INSERT ON henry_appreciations
  FOR EACH ROW
  EXECUTE FUNCTION award_appreciation_token();

-- Function to track bookmark tokens
CREATE OR REPLACE FUNCTION award_bookmark_token()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO insight_tokens (user_id, tokens_earned, total_bookmarks)
  VALUES (NEW.user_id, 1, 1)
  ON CONFLICT (user_id)
  DO UPDATE SET
    tokens_earned = insight_tokens.tokens_earned + 1,
    total_bookmarks = insight_tokens.total_bookmarks + 1,
    updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Trigger to award tokens when user bookmarks
CREATE TRIGGER on_bookmark_added
  AFTER INSERT ON henry_bookmarks
  FOR EACH ROW
  EXECUTE FUNCTION award_bookmark_token();

-- View for answered questions with metadata
CREATE OR REPLACE VIEW henry_qa_feed AS
SELECT 
  hq.id,
  hq.question_text,
  hq.category,
  hq.is_anonymous,
  hq.created_at,
  ha.id as answer_id,
  ha.answer_text,
  ha.author,
  ha.published_at,
  (SELECT COUNT(*)::INTEGER FROM henry_appreciations WHERE question_id = hq.id) as appreciation_count
FROM henry_questions hq
INNER JOIN henry_answers ha ON hq.id = ha.question_id
WHERE hq.status = 'answered'
ORDER BY ha.published_at DESC;