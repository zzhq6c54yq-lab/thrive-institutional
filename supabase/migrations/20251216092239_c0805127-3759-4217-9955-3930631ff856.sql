-- Engagement Metrics Dashboard Database Schema
-- Create all tables for comprehensive engagement tracking

-- 1. Metrics Definitions Table (reference table)
CREATE TABLE public.engagement_metrics_definitions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  metric_name text NOT NULL UNIQUE,
  definition text NOT NULL,
  formula text,
  frequency text DEFAULT 'Weekly',
  category text DEFAULT 'Core',
  notes text,
  created_at timestamptz DEFAULT now()
);

-- 2. Weekly Engagement Logs Table
CREATE TABLE public.engagement_weekly_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  week_ending date NOT NULL,
  recorded_by uuid REFERENCES auth.users(id),
  dau integer DEFAULT 0,
  wau integer DEFAULT 0,
  mau integer DEFAULT 0,
  sessions_per_user numeric(10,2) DEFAULT 0,
  avg_session_length_minutes numeric(10,2) DEFAULT 0,
  retention_rate numeric(5,2) DEFAULT 0,
  churn_rate numeric(5,2) DEFAULT 0,
  feature_adoption numeric(5,2) DEFAULT 0,
  engagement_score numeric(5,2) DEFAULT 0,
  nps_score numeric(5,2),
  error_rate numeric(5,4) DEFAULT 0,
  phi_opt_in_rate numeric(5,2) DEFAULT 100,
  mobile_percentage numeric(5,2) DEFAULT 0,
  desktop_percentage numeric(5,2) DEFAULT 0,
  conversion_rate numeric(5,2) DEFAULT 0,
  user_growth integer DEFAULT 0,
  notes text,
  metadata jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  UNIQUE(week_ending)
);

-- 3. Feature Adoption Table
CREATE TABLE public.engagement_feature_adoption (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  week_ending date NOT NULL,
  feature_name text NOT NULL,
  feature_category text DEFAULT 'Core',
  users_count integer DEFAULT 0,
  percentage_active_users numeric(5,2) DEFAULT 0,
  avg_sessions_per_user numeric(10,2) DEFAULT 0,
  total_sessions integer DEFAULT 0,
  avg_duration_minutes numeric(10,2) DEFAULT 0,
  notes text,
  created_at timestamptz DEFAULT now(),
  UNIQUE(week_ending, feature_name)
);

-- 4. Cohort Retention Table
CREATE TABLE public.engagement_cohort_retention (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  cohort_signup_week date NOT NULL,
  cohort_name text,
  user_count integer DEFAULT 0,
  day_1_retention numeric(5,2) DEFAULT 0,
  day_7_retention numeric(5,2) DEFAULT 0,
  day_14_retention numeric(5,2),
  day_30_retention numeric(5,2) DEFAULT 0,
  day_60_retention numeric(5,2),
  day_90_retention numeric(5,2),
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(cohort_signup_week)
);

-- 5. User Segments Table
CREATE TABLE public.engagement_user_segments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  segment_name text NOT NULL,
  segment_type text NOT NULL,
  week_ending date NOT NULL,
  user_count integer DEFAULT 0,
  dau integer DEFAULT 0,
  retention_rate numeric(5,2) DEFAULT 0,
  engagement_score numeric(5,2) DEFAULT 0,
  avg_session_length numeric(10,2) DEFAULT 0,
  conversion_rate numeric(5,2) DEFAULT 0,
  notes text,
  created_at timestamptz DEFAULT now(),
  UNIQUE(segment_name, segment_type, week_ending)
);

-- 6. Engagement Change Log
CREATE TABLE public.engagement_change_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id),
  editor_name text NOT NULL,
  change_description text NOT NULL,
  reason text,
  affected_table text,
  affected_record_id uuid,
  compliance_note text,
  previous_value jsonb,
  new_value jsonb,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.engagement_metrics_definitions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.engagement_weekly_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.engagement_feature_adoption ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.engagement_cohort_retention ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.engagement_user_segments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.engagement_change_log ENABLE ROW LEVEL SECURITY;

-- RLS Policies - Admin only access (using user_type column)
CREATE POLICY "Admins can manage metrics definitions" ON public.engagement_metrics_definitions FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND user_type = 'admin')
);

CREATE POLICY "Admins can manage weekly logs" ON public.engagement_weekly_logs FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND user_type = 'admin')
);

CREATE POLICY "Admins can manage feature adoption" ON public.engagement_feature_adoption FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND user_type = 'admin')
);

CREATE POLICY "Admins can manage cohort retention" ON public.engagement_cohort_retention FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND user_type = 'admin')
);

CREATE POLICY "Admins can manage user segments" ON public.engagement_user_segments FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND user_type = 'admin')
);

CREATE POLICY "Admins can manage change log" ON public.engagement_change_log FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND user_type = 'admin')
);

-- Seed Metrics Definitions (25+ metrics)
INSERT INTO public.engagement_metrics_definitions (metric_name, definition, formula, frequency, category, notes) VALUES
('DAU', 'Daily Active Users', 'Count(unique users per day)', 'Daily', 'Core', 'Primary measure of daily engagement; target >100 for MVP'),
('WAU', 'Weekly Active Users', 'Count(unique users past 7 days)', 'Weekly', 'Core', 'Tracks weekly reach; aim for WAU/DAU ratio >3 for stickiness'),
('MAU', 'Monthly Active Users', 'Count(unique users past 30 days)', 'Monthly', 'Core', 'Measures overall adoption; monitor MAU growth for scaling'),
('Sessions/User', 'Average sessions per active user', 'Total sessions / DAU', 'Daily', 'Engagement', 'Frequency of return visits; >1.5 indicates habitual use'),
('Avg Session Length', 'Average duration per session', 'Total session duration / total sessions', 'Daily', 'Engagement', 'Target 10-15 min for mental health sessions'),
('Retention Rate', 'Percentage of users returning after first session', 'Returning users / New users', 'Weekly', 'Retention', 'Cohort-based stickiness; >70% Day 7 is strong'),
('Churn Rate', 'Percentage of users lost', 'Users not active / total users', 'Weekly', 'Retention', '<5% weekly target; ties to compliance'),
('Feature Adoption', 'Percentage using specific features', 'Users using feature / active users', 'Weekly', 'Feature', 'Aim >50% for core features'),
('User Growth', 'Net increase in users', 'New users - churned users', 'Weekly', 'Growth', 'Positive net for sustainability'),
('Conversion Rate', 'Percentage completing key actions', 'Conversions / total users', 'Weekly', 'Monetization', 'Tracks onboarding or premium upgrades; >20% target'),
('Engagement Score', 'Weighted aggregate score', '0.4*DAU + 0.2*AvgSession + 0.2*FeatureAdoption + 0.2*Retention', 'Weekly', 'Core', 'Composite KPI; scale 0-100'),
('Time of Day Activity', 'Hourly engagement distribution', 'Count(events per hour)', 'Daily', 'Behavior', 'Shows peak usage times'),
('Day of Week Activity', 'Weekly engagement distribution', 'Count(events per day)', 'Weekly', 'Behavior', 'Optimal notification times'),
('Cohort Retention', 'Users returning at day 1, 7, 30', 'Returning per cohort / cohort size', 'Weekly', 'Retention', 'Detect trends over time'),
('Drop-off Points', 'Where users stop engaging', 'Track sequence until inactivity', 'Weekly', 'UX', 'Identify friction points'),
('Path Analysis', 'Common user flows', 'Track sequences of feature usage', 'Weekly', 'UX', 'Optimize onboarding & UX'),
('Lifetime Engagement', 'Total engagement per user', 'Sum of session time + interactions', 'Monthly', 'Value', 'Identify top users'),
('Top Feature Usage', 'Most-used features', 'Count(feature events)', 'Weekly', 'Feature', 'Shows engagement drivers'),
('Mobile vs Desktop', 'Device-based usage comparison', 'Count sessions by device', 'Weekly', 'Platform', 'Mobile likely dominant'),
('Push/Email Engagement', 'Messaging interaction', 'Clicks / delivered messages', 'Weekly', 'Marketing', 'Campaign effectiveness; ensure opt-in >90%'),
('Session Recency', 'Days since last session', 'Days since last session', 'Weekly', 'Retention', 'Identify dormant users'),
('User Segmentation', 'Engagement by cohort, tier, location', 'Count metrics per segment', 'Weekly', 'Segmentation', 'Identify high-value users'),
('Net Promoter Score', 'User satisfaction', '(Promoters - Detractors) / Total * 100', 'Monthly', 'Satisfaction', '>50 target'),
('Error Rates', 'Percentage sessions with errors', 'Error events / total sessions', 'Weekly', 'Tech Health', '<1% target; SOC 2 Processing Integrity'),
('PHI Opt-in Rate', 'Users consenting to data sharing', 'Opt-ins / total users', 'Weekly', 'Compliance', '>95% for HIPAA/SOC 2 Privacy');

-- Seed initial feature adoption data
INSERT INTO public.engagement_feature_adoption (week_ending, feature_name, feature_category, users_count, percentage_active_users, avg_sessions_per_user, notes) VALUES
('2025-12-16', 'Henry AI Chat', 'AI Companion', 85, 70.00, 3.2, 'High engagement; ties to retention'),
('2025-12-16', 'Guided Journals', 'Wellness', 65, 53.00, 2.1, 'Moderate adoption'),
('2025-12-16', 'Meditation Sessions', 'Wellness', 48, 39.00, 1.8, 'Growing adoption'),
('2025-12-16', 'Daily Check-ins', 'Core', 92, 76.00, 1.0, 'High compliance'),
('2025-12-16', 'Breathing Exercises', 'Wellness', 55, 45.00, 2.0, 'Steady usage'),
('2025-12-16', 'Games & Quizzes', 'Engagement', 42, 34.00, 1.5, 'Fun engagement driver'),
('2025-12-16', 'Community Groups', 'Social', 38, 31.00, 2.5, 'Building community'),
('2025-12-16', 'Video Diary', 'Expression', 25, 20.00, 1.2, 'Niche but engaged'),
('2025-12-16', 'Art Therapy', 'Wellness', 30, 24.00, 1.8, 'Creative outlet'),
('2025-12-16', 'Music Therapy', 'Wellness', 35, 28.00, 2.0, 'Relaxation focused'),
('2025-12-16', 'Binaural Beats', 'Wellness', 28, 23.00, 1.5, 'Sleep/focus support'),
('2025-12-16', 'Therapy Booking', 'Professional', 22, 18.00, 1.0, 'Core service'),
('2025-12-16', 'Workshops', 'Education', 45, 37.00, 1.3, 'Learning engagement');

-- Seed initial cohort retention data
INSERT INTO public.engagement_cohort_retention (cohort_signup_week, cohort_name, user_count, day_1_retention, day_7_retention, day_30_retention, notes) VALUES
('2025-11-18', 'November Week 3', 145, 88.00, 72.00, 58.00, 'Strong early retention'),
('2025-11-25', 'November Week 4', 162, 85.00, 70.00, 55.00, 'Holiday impact'),
('2025-12-02', 'December Week 1', 178, 90.00, 75.00, 60.00, 'Best cohort performance'),
('2025-12-09', 'December Week 2', 156, 87.00, 73.00, NULL, 'Ongoing tracking'),
('2025-12-16', 'December Week 3', 134, 89.00, NULL, NULL, 'Current cohort');

-- Seed initial weekly log data
INSERT INTO public.engagement_weekly_logs (week_ending, dau, wau, mau, sessions_per_user, avg_session_length_minutes, retention_rate, churn_rate, feature_adoption, engagement_score, nps_score, error_rate, phi_opt_in_rate, mobile_percentage, desktop_percentage, conversion_rate, user_growth, notes) VALUES
('2025-11-25', 98, 310, 850, 1.4, 12.5, 68.00, 6.20, 62.00, 72.00, 52.00, 0.80, 94.00, 72.00, 28.00, 18.00, 45, 'Thanksgiving week - lower activity'),
('2025-12-02', 115, 345, 920, 1.6, 14.2, 72.00, 5.10, 68.00, 78.00, 58.00, 0.65, 96.00, 74.00, 26.00, 21.00, 70, 'Post-holiday recovery'),
('2025-12-09', 128, 365, 985, 1.7, 15.0, 75.00, 4.80, 71.00, 82.00, 62.00, 0.55, 97.00, 75.00, 25.00, 23.00, 65, 'Strong engagement week'),
('2025-12-16', 135, 380, 1020, 1.8, 15.5, 78.00, 4.20, 74.00, 85.00, 65.00, 0.45, 98.00, 76.00, 24.00, 25.00, 35, 'Current week - trending up');

-- Seed initial user segments data
INSERT INTO public.engagement_user_segments (segment_name, segment_type, week_ending, user_count, dau, retention_rate, engagement_score, avg_session_length, conversion_rate, notes) VALUES
('Free', 'tier', '2025-12-16', 680, 85, 68.00, 72.00, 12.5, 0.00, 'Base tier users'),
('Premium', 'tier', '2025-12-16', 340, 50, 92.00, 94.00, 22.5, 100.00, 'High-value subscribers'),
('United States', 'location', '2025-12-16', 720, 98, 76.00, 84.00, 16.0, 28.00, 'Primary market'),
('Europe', 'location', '2025-12-16', 180, 22, 72.00, 78.00, 14.5, 22.00, 'Growing market'),
('Asia Pacific', 'location', '2025-12-16', 120, 15, 70.00, 75.00, 13.0, 18.00, 'Emerging market'),
('Mobile iOS', 'device', '2025-12-16', 520, 68, 78.00, 86.00, 16.5, 26.00, 'Primary platform'),
('Mobile Android', 'device', '2025-12-16', 260, 35, 74.00, 80.00, 14.0, 20.00, 'Secondary mobile'),
('Desktop', 'device', '2025-12-16', 240, 32, 72.00, 78.00, 18.0, 24.00, 'Web users');

-- Create indexes for performance
CREATE INDEX idx_engagement_weekly_logs_week ON public.engagement_weekly_logs(week_ending);
CREATE INDEX idx_engagement_feature_adoption_week ON public.engagement_feature_adoption(week_ending);
CREATE INDEX idx_engagement_cohort_retention_week ON public.engagement_cohort_retention(cohort_signup_week);
CREATE INDEX idx_engagement_user_segments_week ON public.engagement_user_segments(week_ending);