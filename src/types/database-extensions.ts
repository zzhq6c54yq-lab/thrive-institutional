// Temporary type extensions until Supabase types regenerate
// These types match the database schema but aren't in the auto-generated types yet

export interface MiniSession {
  id: string;
  user_id: string;
  focus: 'racing_thoughts' | 'conflict' | 'low_mood' | 'urge' | 'process_therapy' | 'other';
  user_text_primary: string | null;
  user_text_secondary: string | null;
  mood: number | null;
  anxiety: number | null;
  energy: number | null;
  urge_level: number | null;
  tags: string[] | null;
  coaching: string | null;
  summary: string | null;
  shared_with_therapist: boolean;
  created_at: string;
}

export interface ParentConnection {
  id: string;
  requester_id: string;
  recipient_id: string;
  connection_type: 'co-parent' | 'support-friend' | 'emergency-contact' | 'family';
  status: 'pending' | 'accepted' | 'declined' | 'blocked';
  nickname: string | null;
  notes: string | null;
  created_at: string;
  accepted_at: string | null;
}

export interface SharedCalendarEvent {
  id: string;
  creator_id: string;
  connection_id: string;
  title: string;
  description: string | null;
  event_type: 'sports' | 'school' | 'activities' | 'appointments' | 'pickup-dropoff' | 'other';
  start_time: string;
  end_time: string | null;
  location: string | null;
  child_name: string | null;
  color: string;
  is_recurring: boolean;
  recurrence_rule: string | null;
  reminder_minutes: number;
  created_at: string;
  updated_at: string;
}

export interface SharedMedia {
  id: string;
  uploader_id: string;
  connection_id: string;
  media_type: 'photo' | 'video' | 'document';
  file_url: string;
  thumbnail_url: string | null;
  title: string | null;
  description: string | null;
  child_name: string | null;
  event_date: string | null;
  tags: string[] | null;
  is_favorite: boolean;
  created_at: string;
}

export interface SharedActivity {
  id: string;
  creator_id: string;
  connection_id: string;
  activity_type: 'responsibility' | 'milestone' | 'achievement' | 'challenge' | 'boundary';
  title: string;
  description: string | null;
  assigned_to: string | null;
  due_date: string | null;
  priority: 'low' | 'medium' | 'high';
  completed: boolean;
  completed_at: string | null;
  child_name: string | null;
  tags: string[] | null;
  created_at: string;
  updated_at: string;
}
