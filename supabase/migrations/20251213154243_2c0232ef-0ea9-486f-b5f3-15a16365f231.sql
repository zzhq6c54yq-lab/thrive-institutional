-- Apply PHI audit triggers to all sensitive tables (using DROP IF EXISTS pattern)
-- This ensures all changes to PHI data are automatically logged for HIPAA compliance

-- Drop existing triggers first to avoid conflicts
DROP TRIGGER IF EXISTS audit_profiles_changes ON public.profiles;
DROP TRIGGER IF EXISTS audit_henry_conversations_changes ON public.henry_conversations;
DROP TRIGGER IF EXISTS audit_henry_messages_changes ON public.henry_messages;
DROP TRIGGER IF EXISTS audit_journal_entries_changes ON public.journal_entries;
DROP TRIGGER IF EXISTS audit_mood_entries_changes ON public.mood_entries;
DROP TRIGGER IF EXISTS audit_daily_check_ins_changes ON public.daily_check_ins;
DROP TRIGGER IF EXISTS audit_assessment_results_changes ON public.assessment_results;
DROP TRIGGER IF EXISTS audit_crisis_escalations_changes ON public.crisis_escalations;
DROP TRIGGER IF EXISTS audit_crisis_escalations_v2_changes ON public.crisis_escalations_v2;
DROP TRIGGER IF EXISTS audit_therapist_client_notes_changes ON public.therapist_client_notes;
DROP TRIGGER IF EXISTS audit_video_session_notes_changes ON public.video_session_notes;
DROP TRIGGER IF EXISTS audit_therapy_bookings_changes ON public.therapy_bookings;
DROP TRIGGER IF EXISTS audit_ai_session_summaries_changes ON public.ai_session_summaries;
DROP TRIGGER IF EXISTS audit_breathing_sessions_changes ON public.breathing_sessions;
DROP TRIGGER IF EXISTS audit_binaural_sessions_changes ON public.binaural_sessions;
DROP TRIGGER IF EXISTS audit_art_therapy_gallery_changes ON public.art_therapy_gallery;
DROP TRIGGER IF EXISTS audit_video_diary_entries_changes ON public.video_diary_entries;
DROP TRIGGER IF EXISTS audit_therapist_requests_changes ON public.therapist_requests;

-- Create triggers for all PHI tables
CREATE TRIGGER audit_profiles_changes
AFTER INSERT OR UPDATE OR DELETE ON public.profiles
FOR EACH ROW EXECUTE FUNCTION public.log_phi_changes();

CREATE TRIGGER audit_henry_conversations_changes
AFTER INSERT OR UPDATE OR DELETE ON public.henry_conversations
FOR EACH ROW EXECUTE FUNCTION public.log_phi_changes();

CREATE TRIGGER audit_henry_messages_changes
AFTER INSERT OR UPDATE OR DELETE ON public.henry_messages
FOR EACH ROW EXECUTE FUNCTION public.log_phi_changes();

CREATE TRIGGER audit_journal_entries_changes
AFTER INSERT OR UPDATE OR DELETE ON public.journal_entries
FOR EACH ROW EXECUTE FUNCTION public.log_phi_changes();

CREATE TRIGGER audit_mood_entries_changes
AFTER INSERT OR UPDATE OR DELETE ON public.mood_entries
FOR EACH ROW EXECUTE FUNCTION public.log_phi_changes();

CREATE TRIGGER audit_daily_check_ins_changes
AFTER INSERT OR UPDATE OR DELETE ON public.daily_check_ins
FOR EACH ROW EXECUTE FUNCTION public.log_phi_changes();

CREATE TRIGGER audit_assessment_results_changes
AFTER INSERT OR UPDATE OR DELETE ON public.assessment_results
FOR EACH ROW EXECUTE FUNCTION public.log_phi_changes();

CREATE TRIGGER audit_crisis_escalations_changes
AFTER INSERT OR UPDATE OR DELETE ON public.crisis_escalations
FOR EACH ROW EXECUTE FUNCTION public.log_phi_changes();

CREATE TRIGGER audit_crisis_escalations_v2_changes
AFTER INSERT OR UPDATE OR DELETE ON public.crisis_escalations_v2
FOR EACH ROW EXECUTE FUNCTION public.log_phi_changes();

CREATE TRIGGER audit_therapist_client_notes_changes
AFTER INSERT OR UPDATE OR DELETE ON public.therapist_client_notes
FOR EACH ROW EXECUTE FUNCTION public.log_phi_changes();

CREATE TRIGGER audit_video_session_notes_changes
AFTER INSERT OR UPDATE OR DELETE ON public.video_session_notes
FOR EACH ROW EXECUTE FUNCTION public.log_phi_changes();

CREATE TRIGGER audit_therapy_bookings_changes
AFTER INSERT OR UPDATE OR DELETE ON public.therapy_bookings
FOR EACH ROW EXECUTE FUNCTION public.log_phi_changes();

CREATE TRIGGER audit_ai_session_summaries_changes
AFTER INSERT OR UPDATE OR DELETE ON public.ai_session_summaries
FOR EACH ROW EXECUTE FUNCTION public.log_phi_changes();

CREATE TRIGGER audit_breathing_sessions_changes
AFTER INSERT OR UPDATE OR DELETE ON public.breathing_sessions
FOR EACH ROW EXECUTE FUNCTION public.log_phi_changes();

CREATE TRIGGER audit_binaural_sessions_changes
AFTER INSERT OR UPDATE OR DELETE ON public.binaural_sessions
FOR EACH ROW EXECUTE FUNCTION public.log_phi_changes();

CREATE TRIGGER audit_art_therapy_gallery_changes
AFTER INSERT OR UPDATE OR DELETE ON public.art_therapy_gallery
FOR EACH ROW EXECUTE FUNCTION public.log_phi_changes();

CREATE TRIGGER audit_video_diary_entries_changes
AFTER INSERT OR UPDATE OR DELETE ON public.video_diary_entries
FOR EACH ROW EXECUTE FUNCTION public.log_phi_changes();

CREATE TRIGGER audit_therapist_requests_changes
AFTER INSERT OR UPDATE OR DELETE ON public.therapist_requests
FOR EACH ROW EXECUTE FUNCTION public.log_phi_changes();