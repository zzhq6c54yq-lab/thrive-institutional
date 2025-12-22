import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface TherapyBooking {
  id: string;
  therapist_id: string;
  user_id: string;
  appointment_date: string;
  duration_minutes: number;
  session_type: string;
  status: string;
  payment_status: string;
  payment_amount: number;
  concerns: string[] | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export function useTherapyBookings(therapistId: string) {
  return useQuery({
    queryKey: ["therapy-bookings", therapistId],
    queryFn: async () => {
      // First get the therapist's internal ID from their user_id
      const { data: therapist, error: therapistError } = await supabase
        .from("therapists")
        .select("id")
        .eq("user_id", therapistId)
        .single();

      if (therapistError) throw therapistError;
      if (!therapist) throw new Error("Therapist not found");

      // Fetch all bookings for this therapist
      const { data: bookings, error } = await supabase
        .from("therapy_bookings")
        .select("*")
        .eq("therapist_id", therapist.id)
        .order("appointment_date", { ascending: true });

      if (error) throw error;
      if (!bookings || bookings.length === 0) return [];

      // Fetch user profiles separately
      const userIds = [...new Set(bookings.map(b => b.user_id))];
      const { data: profiles } = await supabase
        .from("profiles")
        .select("id, display_name, avatar_url")
        .in("id", userIds);

      // Map profiles to bookings
      const profileMap = new Map(profiles?.map(p => [p.id, p]) || []);

      return bookings.map(booking => ({
        ...booking,
        profiles: profileMap.get(booking.user_id) || null
      }));
    },
  });
}
