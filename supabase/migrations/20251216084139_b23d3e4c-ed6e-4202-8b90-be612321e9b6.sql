-- Add license tracking and CAQH fields to therapists table
ALTER TABLE public.therapists 
ADD COLUMN IF NOT EXISTS license_number text,
ADD COLUMN IF NOT EXISTS license_state text,
ADD COLUMN IF NOT EXISTS license_expiry_date date,
ADD COLUMN IF NOT EXISTS license_type text,
ADD COLUMN IF NOT EXISTS caqh_id text,
ADD COLUMN IF NOT EXISTS caqh_status text DEFAULT 'pending',
ADD COLUMN IF NOT EXISTS caqh_last_verified timestamptz,
ADD COLUMN IF NOT EXISTS dea_number text,
ADD COLUMN IF NOT EXISTS dea_expiry_date date,
ADD COLUMN IF NOT EXISTS malpractice_policy_number text,
ADD COLUMN IF NOT EXISTS malpractice_expiry_date date,
ADD COLUMN IF NOT EXISTS compliance_status text DEFAULT 'compliant',
ADD COLUMN IF NOT EXISTS compliance_notes text,
ADD COLUMN IF NOT EXISTS last_compliance_check timestamptz;

-- Create compliance alerts table
CREATE TABLE IF NOT EXISTS public.compliance_alerts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  therapist_id uuid REFERENCES public.therapists(id) ON DELETE CASCADE,
  alert_type text NOT NULL,
  severity text NOT NULL DEFAULT 'warning',
  title text NOT NULL,
  message text NOT NULL,
  expiry_date date,
  days_until_expiry integer,
  is_resolved boolean DEFAULT false,
  resolved_at timestamptz,
  resolved_by uuid REFERENCES auth.users(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create CAQH verification logs table
CREATE TABLE IF NOT EXISTS public.caqh_verification_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  therapist_id uuid REFERENCES public.therapists(id) ON DELETE CASCADE,
  verification_status text NOT NULL,
  insurance_panel text,
  verification_date timestamptz DEFAULT now(),
  expiry_date date,
  notes text,
  verified_by uuid REFERENCES auth.users(id),
  created_at timestamptz DEFAULT now()
);

-- Create therapist license history table
CREATE TABLE IF NOT EXISTS public.therapist_license_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  therapist_id uuid REFERENCES public.therapists(id) ON DELETE CASCADE,
  license_number text NOT NULL,
  license_state text NOT NULL,
  license_type text,
  issue_date date,
  expiry_date date NOT NULL,
  verification_status text DEFAULT 'pending',
  verification_url text,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.compliance_alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.caqh_verification_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.therapist_license_history ENABLE ROW LEVEL SECURITY;

-- RLS policies - allow authenticated users (admin check in application layer)
CREATE POLICY "Authenticated users can view compliance alerts"
  ON public.compliance_alerts FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can manage compliance alerts"
  ON public.compliance_alerts FOR ALL
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can view CAQH logs"
  ON public.caqh_verification_logs FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can manage CAQH logs"
  ON public.caqh_verification_logs FOR ALL
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can view license history"
  ON public.therapist_license_history FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can manage license history"
  ON public.therapist_license_history FOR ALL
  TO authenticated
  USING (true);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_compliance_alerts_therapist ON public.compliance_alerts(therapist_id);
CREATE INDEX IF NOT EXISTS idx_compliance_alerts_resolved ON public.compliance_alerts(is_resolved);
CREATE INDEX IF NOT EXISTS idx_compliance_alerts_severity ON public.compliance_alerts(severity);
CREATE INDEX IF NOT EXISTS idx_caqh_logs_therapist ON public.caqh_verification_logs(therapist_id);
CREATE INDEX IF NOT EXISTS idx_license_history_therapist ON public.therapist_license_history(therapist_id);