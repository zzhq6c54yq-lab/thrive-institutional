import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Json } from '@/integrations/supabase/types';

export interface SobrietyRecord {
  id: string;
  user_id: string;
  sobriety_date: string;
  substance_type: string;
  current_streak_days: number;
  longest_streak_days: number;
  milestones_achieved: Json;
  created_at: string | null;
  updated_at: string | null;
}

export interface SponsorConnection {
  id: string;
  user_id: string;
  sponsor_type: string;
  sponsor_name: string | null;
  sponsor_contact: string | null;
  connection_status: string;
  notes: string | null;
  created_at: string | null;
}

const MILESTONES = [
  { days: 1, label: "24 Hours", badge: "first_day" },
  { days: 7, label: "1 Week", badge: "one_week" },
  { days: 14, label: "2 Weeks", badge: "two_weeks" },
  { days: 30, label: "1 Month", badge: "one_month" },
  { days: 60, label: "2 Months", badge: "two_months" },
  { days: 90, label: "3 Months", badge: "three_months" },
  { days: 180, label: "6 Months", badge: "six_months" },
  { days: 365, label: "1 Year", badge: "one_year" },
  { days: 730, label: "2 Years", badge: "two_years" },
  { days: 1825, label: "5 Years", badge: "five_years" },
];

export const useSobrietyTracker = () => {
  const [sobrietyRecord, setSobrietyRecord] = useState<SobrietyRecord | null>(null);
  const [sponsorConnection, setSponsorConnection] = useState<SponsorConnection | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  const fetchData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setIsLoading(false);
        return;
      }

      // Fetch sobriety record
      const { data: sobrietyData, error: sobrietyError } = await supabase
        .from('sobriety_tracking')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      if (sobrietyError) throw sobrietyError;
      
      if (sobrietyData) {
        // Update streak calculation
        const updatedRecord = updateStreak(sobrietyData);
        setSobrietyRecord(updatedRecord);
      }

      // Fetch sponsor connection
      const { data: sponsorData, error: sponsorError } = await supabase
        .from('sponsor_connections')
        .select('*')
        .eq('user_id', user.id)
        .eq('connection_status', 'active')
        .maybeSingle();

      if (sponsorError) throw sponsorError;
      setSponsorConnection(sponsorData);

    } catch (error) {
      console.error('Error fetching sobriety data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateStreak = (record: SobrietyRecord): SobrietyRecord => {
    const sobrietyDate = new Date(record.sobriety_date);
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - sobrietyDate.getTime());
    const currentStreak = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    const longestStreak = Math.max(currentStreak, record.longest_streak_days);
    
    // Check for new milestones
    const achievedMilestones = MILESTONES
      .filter(m => currentStreak >= m.days)
      .map(m => m.badge);
    
    return {
      ...record,
      current_streak_days: currentStreak,
      longest_streak_days: longestStreak,
      milestones_achieved: achievedMilestones
    };
  };

  useEffect(() => {
    fetchData();
  }, []);

  const setSobrietyDate = async (
    date: Date,
    substanceType: string = 'alcohol'
  ): Promise<SobrietyRecord | null> => {
    setIsSaving(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const dateString = date.toISOString().split('T')[0];
      const today = new Date();
      const diffTime = Math.abs(today.getTime() - date.getTime());
      const currentStreak = Math.floor(diffTime / (1000 * 60 * 60 * 24));

      // Check if record exists
      const { data: existing } = await supabase
        .from('sobriety_tracking')
        .select('id')
        .eq('user_id', user.id)
        .maybeSingle();

      let data: SobrietyRecord | null = null;
      let error: any = null;

      if (existing) {
        const result = await supabase
          .from('sobriety_tracking')
          .update({
            sobriety_date: dateString,
            substance_type: substanceType,
            current_streak_days: currentStreak,
            longest_streak_days: currentStreak,
            milestones_achieved: MILESTONES.filter(m => currentStreak >= m.days).map(m => m.badge)
          })
          .eq('id', existing.id)
          .select()
          .single();
        data = result.data;
        error = result.error;
      } else {
        const result = await supabase
          .from('sobriety_tracking')
          .insert({
            user_id: user.id,
            sobriety_date: dateString,
            substance_type: substanceType,
            current_streak_days: currentStreak,
            longest_streak_days: currentStreak,
            milestones_achieved: MILESTONES.filter(m => currentStreak >= m.days).map(m => m.badge)
          })
          .select()
          .single();
        data = result.data;
        error = result.error;
      }

      if (error) throw error;

      toast({
        title: "Sobriety Date Set",
        description: `Your journey started on ${date.toLocaleDateString()}.`
      });

      await fetchData();
      return data;
    } catch (error) {
      console.error('Error setting sobriety date:', error);
      toast({
        title: "Save Failed",
        description: "Failed to save your sobriety date. Please try again.",
        variant: "destructive"
      });
      return null;
    } finally {
      setIsSaving(false);
    }
  };

  const addSponsor = async (
    sponsorName: string,
    sponsorContact: string,
    sponsorType: string = 'aa',
    notes?: string
  ): Promise<SponsorConnection | null> => {
    setIsSaving(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('sponsor_connections')
        .insert({
          user_id: user.id,
          sponsor_type: sponsorType,
          sponsor_name: sponsorName,
          sponsor_contact: sponsorContact,
          connection_status: 'active',
          notes
        })
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Sponsor Added",
        description: `${sponsorName} has been added as your sponsor.`
      });

      await fetchData();
      return data;
    } catch (error) {
      console.error('Error adding sponsor:', error);
      toast({
        title: "Save Failed",
        description: "Failed to add sponsor. Please try again.",
        variant: "destructive"
      });
      return null;
    } finally {
      setIsSaving(false);
    }
  };

  const dailyCheckIn = async () => {
    if (!sobrietyRecord) return;
    
    toast({
      title: "Daily Check-In Complete",
      description: `Day ${sobrietyRecord.current_streak_days + 1} - Keep going strong!`
    });
  };

  const getDaysSober = () => {
    return sobrietyRecord?.current_streak_days || 0;
  };

  const getNextMilestone = () => {
    const currentDays = getDaysSober();
    return MILESTONES.find(m => m.days > currentDays) || null;
  };

  const getAchievedMilestones = () => {
    const currentDays = getDaysSober();
    return MILESTONES.filter(m => m.days <= currentDays);
  };

  const getUpcomingMilestones = () => {
    const currentDays = getDaysSober();
    return MILESTONES.filter(m => m.days > currentDays).slice(0, 3);
  };

  return {
    sobrietyRecord,
    sponsorConnection,
    isLoading,
    isSaving,
    setSobrietyDate,
    addSponsor,
    dailyCheckIn,
    getDaysSober,
    getNextMilestone,
    getAchievedMilestones,
    getUpcomingMilestones,
    milestones: MILESTONES,
    refetch: fetchData
  };
};
