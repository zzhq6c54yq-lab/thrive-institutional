import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

// This matches the actual journal_entries table schema
export interface JournalEntry {
  id: string;
  user_id: string;
  mood: string;
  notes: string | null;
  mood_score: number | null;
  created_at: string | null;
  deleted_at: string | null;
}

export const useJournaling = () => {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [streakCount, setStreakCount] = useState(0);
  const { toast } = useToast();

  const fetchEntries = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setIsLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('journal_entries')
        .select('*')
        .eq('user_id', user.id)
        .is('deleted_at', null)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setEntries(data || []);
      calculateStreak(data || []);
    } catch (error) {
      console.error('Error fetching journal entries:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const calculateStreak = (entriesList: JournalEntry[]) => {
    if (entriesList.length === 0) {
      setStreakCount(0);
      return;
    }

    const sortedEntries = [...entriesList].sort((a, b) => 
      new Date(b.created_at || '').getTime() - new Date(a.created_at || '').getTime()
    );

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (!sortedEntries[0].created_at) {
      setStreakCount(0);
      return;
    }

    const latestEntryDate = new Date(sortedEntries[0].created_at);
    latestEntryDate.setHours(0, 0, 0, 0);

    const diffDays = Math.floor((today.getTime() - latestEntryDate.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffDays > 1) {
      setStreakCount(0);
      return;
    }

    let streak = 1;
    let currentDate = new Date(latestEntryDate);

    for (let i = 1; i < sortedEntries.length; i++) {
      if (!sortedEntries[i].created_at) continue;
      
      const prevDate = new Date(sortedEntries[i].created_at);
      prevDate.setHours(0, 0, 0, 0);
      
      const dayDiff = Math.floor((currentDate.getTime() - prevDate.getTime()) / (1000 * 60 * 60 * 24));
      
      if (dayDiff === 1) {
        streak++;
        currentDate = prevDate;
      } else if (dayDiff === 0) {
        continue;
      } else {
        break;
      }
    }

    setStreakCount(streak);
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  const createEntry = async (
    mood: string,
    notes?: string,
    moodScore?: number
  ): Promise<JournalEntry | null> => {
    setIsSaving(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('journal_entries')
        .insert({
          user_id: user.id,
          mood,
          notes,
          mood_score: moodScore
        })
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Journal Entry Saved",
        description: "Your thoughts have been captured and saved."
      });

      await fetchEntries();
      return data;
    } catch (error) {
      console.error('Error creating journal entry:', error);
      toast({
        title: "Save Failed",
        description: "Failed to save your entry. Please try again.",
        variant: "destructive"
      });
      return null;
    } finally {
      setIsSaving(false);
    }
  };

  const updateEntry = async (
    entryId: string,
    updates: Partial<Pick<JournalEntry, 'mood' | 'notes' | 'mood_score'>>
  ) => {
    try {
      const { error } = await supabase
        .from('journal_entries')
        .update(updates)
        .eq('id', entryId);

      if (error) throw error;

      toast({
        title: "Entry Updated",
        description: "Your changes have been saved."
      });

      await fetchEntries();
    } catch (error) {
      console.error('Error updating entry:', error);
      toast({
        title: "Update Failed",
        description: "Failed to update the entry. Please try again.",
        variant: "destructive"
      });
    }
  };

  const deleteEntry = async (entryId: string) => {
    try {
      // Soft delete
      const { error } = await supabase
        .from('journal_entries')
        .update({ deleted_at: new Date().toISOString() })
        .eq('id', entryId);

      if (error) throw error;

      toast({
        title: "Entry Deleted",
        description: "Your journal entry has been removed."
      });

      await fetchEntries();
    } catch (error) {
      console.error('Error deleting entry:', error);
      toast({
        title: "Delete Failed",
        description: "Failed to delete the entry. Please try again.",
        variant: "destructive"
      });
    }
  };

  const getMostCommonMood = () => {
    const moodCount: Record<string, number> = {};
    entries.filter(e => e.mood).forEach(e => {
      moodCount[e.mood] = (moodCount[e.mood] || 0) + 1;
    });
    const sorted = Object.entries(moodCount).sort((a, b) => b[1] - a[1]);
    return sorted.length > 0 ? sorted[0][0] : null;
  };

  return {
    entries,
    isLoading,
    isSaving,
    streakCount,
    createEntry,
    updateEntry,
    deleteEntry,
    getMostCommonMood,
    refetch: fetchEntries
  };
};
