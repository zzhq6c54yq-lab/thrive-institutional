-- =====================================================
-- PHASE 1: COMPREHENSIVE ENGAGEMENT & BARTER SYSTEM
-- All 15 tables for gamification, social, and financial accessibility
-- =====================================================

-- ============ ACHIEVEMENT/BADGES SYSTEM ============
CREATE TABLE IF NOT EXISTS user_badges (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  icon_name text,
  category text CHECK (category IN ('streak', 'achievement', 'milestone', 'community', 'therapy', 'wellness')),
  points_value int DEFAULT 0,
  requirements jsonb,
  image_url text,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS user_earned_badges (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  badge_id uuid REFERENCES user_badges(id) ON DELETE CASCADE NOT NULL,
  earned_at timestamptz DEFAULT now(),
  metadata jsonb,
  UNIQUE(user_id, badge_id)
);

-- RLS for badges
ALTER TABLE user_badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_earned_badges ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view badges" ON user_badges FOR SELECT USING (true);
CREATE POLICY "Users can view own earned badges" ON user_earned_badges FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Service can award badges" ON user_earned_badges FOR INSERT WITH CHECK (true);

-- ============ BUDDY/ACCOUNTABILITY SYSTEM ============
CREATE TABLE IF NOT EXISTS buddy_matches (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_1_id uuid NOT NULL,
  user_2_id uuid NOT NULL,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'active', 'ended')),
  matched_at timestamptz DEFAULT now(),
  goals_shared jsonb,
  created_at timestamptz DEFAULT now(),
  ended_at timestamptz,
  CHECK (user_1_id != user_2_id)
);

CREATE TABLE IF NOT EXISTS buddy_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  match_id uuid REFERENCES buddy_matches(id) ON DELETE CASCADE NOT NULL,
  sender_id uuid NOT NULL,
  message text NOT NULL,
  read boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- RLS for buddy system
ALTER TABLE buddy_matches ENABLE ROW LEVEL SECURITY;
ALTER TABLE buddy_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own buddy matches" ON buddy_matches 
  FOR SELECT USING (auth.uid() = user_1_id OR auth.uid() = user_2_id);
CREATE POLICY "Users can create buddy matches" ON buddy_matches 
  FOR INSERT WITH CHECK (auth.uid() = user_1_id OR auth.uid() = user_2_id);
CREATE POLICY "Users can update own matches" ON buddy_matches 
  FOR UPDATE USING (auth.uid() = user_1_id OR auth.uid() = user_2_id);

CREATE POLICY "Users can view messages in their matches" ON buddy_messages
  FOR SELECT USING (
    match_id IN (
      SELECT id FROM buddy_matches 
      WHERE user_1_id = auth.uid() OR user_2_id = auth.uid()
    )
  );
CREATE POLICY "Users can send messages" ON buddy_messages
  FOR INSERT WITH CHECK (auth.uid() = sender_id);

-- ============ COMMUNITY GROUPS ============
CREATE TABLE IF NOT EXISTS community_groups (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  category text,
  icon_name text,
  member_count int DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS group_memberships (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  group_id uuid REFERENCES community_groups(id) ON DELETE CASCADE NOT NULL,
  user_id uuid NOT NULL,
  joined_at timestamptz DEFAULT now(),
  role text DEFAULT 'member' CHECK (role IN ('member', 'moderator', 'admin')),
  UNIQUE(group_id, user_id)
);

-- RLS for groups
ALTER TABLE community_groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE group_memberships ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active groups" ON community_groups 
  FOR SELECT USING (is_active = true);
CREATE POLICY "Users can view own memberships" ON group_memberships 
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can join groups" ON group_memberships 
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- ============ SMS CHECK-INS ============
CREATE TABLE IF NOT EXISTS sms_subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  phone_number text NOT NULL,
  phone_verified boolean DEFAULT false,
  frequency text DEFAULT 'daily' CHECK (frequency IN ('daily', 'weekly', 'custom')),
  preferred_time time,
  timezone text DEFAULT 'America/New_York',
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS sms_checkin_responses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  subscription_id uuid REFERENCES sms_subscriptions(id) ON DELETE CASCADE NOT NULL,
  message_sent text,
  user_response text,
  mood_extracted int CHECK (mood_extracted BETWEEN 1 AND 10),
  sent_at timestamptz,
  responded_at timestamptz
);

-- RLS for SMS
ALTER TABLE sms_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE sms_checkin_responses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own SMS subscriptions" ON sms_subscriptions 
  FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can view own SMS responses" ON sms_checkin_responses
  FOR SELECT USING (
    subscription_id IN (SELECT id FROM sms_subscriptions WHERE user_id = auth.uid())
  );

-- ============ SUCCESS STORIES ============
CREATE TABLE IF NOT EXISTS success_stories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid,
  title text NOT NULL,
  story text NOT NULL,
  challenge_type text[],
  is_anonymous boolean DEFAULT true,
  is_approved boolean DEFAULT false,
  featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- RLS for success stories
ALTER TABLE success_stories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view approved stories" ON success_stories 
  FOR SELECT USING (is_approved = true);
CREATE POLICY "Users can submit own stories" ON success_stories 
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Admins can manage stories" ON success_stories 
  FOR ALL USING (is_admin());

-- ============ LIFE TRANSITION PROGRAMS ============
CREATE TABLE IF NOT EXISTS life_transition_programs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text,
  duration_weeks int,
  content jsonb,
  resources jsonb,
  icon_name text,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS user_transition_enrollments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  program_id uuid REFERENCES life_transition_programs(id) ON DELETE CASCADE NOT NULL,
  enrolled_at timestamptz DEFAULT now(),
  current_week int DEFAULT 1,
  completed_at timestamptz,
  progress jsonb
);

-- RLS for transitions
ALTER TABLE life_transition_programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_transition_enrollments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view programs" ON life_transition_programs 
  FOR SELECT USING (true);
CREATE POLICY "Users can manage own enrollments" ON user_transition_enrollments 
  FOR ALL USING (auth.uid() = user_id);

-- ============ SUPPORT CIRCLE (FAMILY/CAREGIVER) ============
CREATE TABLE IF NOT EXISTS support_circles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  name text DEFAULT 'My Support Circle',
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS support_circle_members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  circle_id uuid REFERENCES support_circles(id) ON DELETE CASCADE NOT NULL,
  email text NOT NULL,
  name text,
  relationship text,
  invite_status text DEFAULT 'pending' CHECK (invite_status IN ('pending', 'accepted', 'declined')),
  can_view_mood boolean DEFAULT true,
  can_view_progress boolean DEFAULT true,
  can_view_appointments boolean DEFAULT false,
  emergency_contact boolean DEFAULT false,
  invited_at timestamptz DEFAULT now(),
  accepted_at timestamptz
);

-- RLS for support circles
ALTER TABLE support_circles ENABLE ROW LEVEL SECURITY;
ALTER TABLE support_circle_members ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own circles" ON support_circles 
  FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage circle members" ON support_circle_members
  FOR ALL USING (
    circle_id IN (SELECT id FROM support_circles WHERE user_id = auth.uid())
  );

-- ============ BARTER SYSTEM ============
CREATE TABLE IF NOT EXISTS barter_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  full_name text NOT NULL,
  email text NOT NULL,
  phone text,
  income_range text,
  session_cost numeric DEFAULT 200,
  can_contribute numeric,
  reason text,
  preferred_service text,
  availability text[],
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'declined', 'under_review')),
  reviewed_by uuid,
  reviewed_at timestamptz,
  notes text,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS community_service_hours (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  barter_application_id uuid REFERENCES barter_applications(id) ON DELETE CASCADE,
  hours_logged numeric NOT NULL CHECK (hours_logged > 0),
  service_description text NOT NULL,
  service_date date NOT NULL,
  verified boolean DEFAULT false,
  verified_by uuid,
  verified_at timestamptz,
  credit_value numeric,
  created_at timestamptz DEFAULT now()
);

-- RLS for barter system
ALTER TABLE barter_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE community_service_hours ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own barter applications" ON barter_applications 
  FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Admins can review applications" ON barter_applications 
  FOR UPDATE USING (is_admin());
CREATE POLICY "Users can manage own service hours" ON community_service_hours 
  FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Admins can verify hours" ON community_service_hours 
  FOR UPDATE USING (is_admin());

-- ============ SEED DATA: INITIAL BADGES ============
INSERT INTO user_badges (name, description, icon_name, category, points_value, requirements) VALUES
  ('First Steps', 'Completed your first daily check-in', 'Heart', 'milestone', 10, '{"type": "check_in", "count": 1}'),
  ('Week Warrior', 'Maintained a 7-day streak', 'Flame', 'streak', 50, '{"type": "streak", "days": 7}'),
  ('Two Week Champion', 'Maintained a 14-day streak', 'Zap', 'streak', 100, '{"type": "streak", "days": 14}'),
  ('Month Master', 'Maintained a 30-day streak', 'Trophy', 'streak', 250, '{"type": "streak", "days": 30}'),
  ('Self Explorer', 'Completed your first assessment', 'Brain', 'achievement', 25, '{"type": "assessment", "count": 1}'),
  ('Workshop Graduate', 'Completed your first workshop', 'GraduationCap', 'achievement', 50, '{"type": "workshop", "count": 1}'),
  ('Community Builder', 'Joined your first community group', 'Users', 'community', 20, '{"type": "group_join", "count": 1}'),
  ('Therapy Pioneer', 'Completed your first therapy session', 'Video', 'therapy', 100, '{"type": "therapy_session", "count": 1}'),
  ('Wellness Advocate', 'Completed 10 wellness activities', 'Star', 'wellness', 75, '{"type": "wellness_activity", "count": 10}'),
  ('Consistency King', 'Maintained a 60-day streak', 'Crown', 'streak', 500, '{"type": "streak", "days": 60}'),
  ('Quarter Master', 'Maintained a 90-day streak', 'Award', 'streak', 1000, '{"type": "streak", "days": 90}')
ON CONFLICT DO NOTHING;

-- ============ SEED DATA: LIFE TRANSITION PROGRAMS ============
INSERT INTO life_transition_programs (name, slug, description, duration_weeks, icon_name) VALUES
  ('Navigating Divorce', 'divorce', 'Support and guidance through separation and divorce', 12, 'Heart'),
  ('Career Transition', 'job-loss', 'Coping with job loss and career change', 8, 'Briefcase'),
  ('New Parent Support', 'new-parent', 'Adjusting to parenthood and managing stress', 10, 'Baby'),
  ('Grief & Loss', 'grief', 'Processing loss and finding meaning', 16, 'CloudRain'),
  ('Empty Nest', 'empty-nest', 'Redefining life after children leave home', 6, 'Home'),
  ('Retirement Journey', 'retirement', 'Transitioning into retirement with purpose', 8, 'Sunset'),
  ('Major Move', 'relocation', 'Adapting to a new location and community', 6, 'MapPin'),
  ('Health Diagnosis', 'health-diagnosis', 'Coping with a new health condition', 12, 'Heart')
ON CONFLICT DO NOTHING;

-- ============ SEED DATA: COMMUNITY GROUPS ============
INSERT INTO community_groups (name, description, category, icon_name) VALUES
  ('Anxiety Warriors', 'Supporting each other through anxiety challenges', 'anxiety', 'Zap'),
  ('Sleep Seekers', 'Better sleep starts here', 'sleep', 'Moon'),
  ('Mindfulness Masters', 'Daily meditation and mindfulness practice', 'mindfulness', 'Sparkles'),
  ('Depression Support', 'You are not alone in this journey', 'depression', 'Heart'),
  ('Stress Busters', 'Managing life''s pressures together', 'stress', 'Shield'),
  ('Parent Power', 'Support for parents navigating mental health', 'parenting', 'Users')
ON CONFLICT DO NOTHING;