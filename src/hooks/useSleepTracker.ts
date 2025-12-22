import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

// This matches the actual sleep_tracker_entries table schema
export interface SleepEntry {
  id: string;
  user_id: string;
  date: string;
  bed_time: string;
  sleep_time: string | null;
  wake_time: string;
  quality: number;
  duration: number;
  notes: string | null;
  factors: string[] | null;
  created_at: string | null;
}

export const useSleepTracker = () => {
  const [entries, setEntries] = useState<SleepEntry[]>([]);
  const [sleepGoal, setSleepGoalState] = useState(8);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  const fetchEntries = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setIsLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('sleep_tracker_entries')
        .select('*')
        .eq('user_id', user.id)
        .order('date', { ascending: false });

      if (error) throw error;
      setEntries(data || []);
    } catch (error) {
      console.error('Error fetching sleep entries:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  const calculateDuration = (sleepTime: string, wakeTime: string): number => {
    const sleep = new Date(`2000-01-01 ${sleepTime}`);
    let wake = new Date(`2000-01-01 ${wakeTime}`);
    
    if (wake < sleep) {
      wake = new Date(`2000-01-02 ${wakeTime}`);
    }
    
    return (wake.getTime() - sleep.getTime()) / (1000 * 60 * 60);
  };

  const logSleep = async (
    bedTime: string,
    wakeTime: string,
    quality: number,
    sleepTime?: string,
    notes?: string,
    factors?: string[]
  ): Promise<SleepEntry | null> => {
    setIsSaving(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const actualSleepTime = sleepTime || bedTime;
      const duration = calculateDuration(actualSleepTime, wakeTime);

      const { data, error } = await supabase
        .from('sleep_tracker_entries')
        .insert({
          user_id: user.id,
          date: new Date().toISOString().split('T')[0],
          bed_time: bedTime,
          sleep_time: sleepTime || null,
          wake_time: wakeTime,
          quality,
          duration,
          notes,
          factors
        })
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Sleep Entry Saved",
        description: `${duration.toFixed(1)} hours of sleep logged.`
      });

      await fetchEntries();
      return data;
    } catch (error) {
      console.error('Error logging sleep:', error);
      toast({
        title: "Save Failed",
        description: "Failed to save your sleep data. Please try again.",
        variant: "destructive"
      });
      return null;
    } finally {
      setIsSaving(false);
    }
  };

  const deleteEntry = async (entryId: string) => {
    try {
      const { error } = await supabase
        .from('sleep_tracker_entries')
        .delete()
        .eq('id', entryId);

      if (error) throw error;

      toast({
        title: "Entry Deleted",
        description: "Your sleep entry has been removed."
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

  const getAverageSleep = (period: '7days' | '30days' | 'all' = 'all') => {
    const filtered = getFilteredEntries(period);
    if (filtered.length === 0) return 0;
    return filtered.reduce((sum, e) => sum + e.duration, 0) / filtered.length;
  };

  const getAverageQuality = (period: '7days' | '30days' | 'all' = 'all') => {
    const filtered = getFilteredEntries(period);
    if (filtered.length === 0) return 0;
    return filtered.reduce((sum, e) => sum + e.quality, 0) / filtered.length;
  };

  const getFilteredEntries = (period: '7days' | '30days' | 'all') => {
    const now = Date.now();
    switch (period) {
      case '7days':
        return entries.filter(e => new Date(e.date).getTime() > now - 7 * 24 * 60 * 60 * 1000);
      case '30days':
        return entries.filter(e => new Date(e.date).getTime() > now - 30 * 24 * 60 * 60 * 1000);
      default:
        return entries;
    }
  };

  const getSleepScore = () => {
    const avgDuration = getAverageSleep();
    const avgQuality = getAverageQuality();
    
    const durationScore = Math.min((avgDuration / sleepGoal) * 40, 40);
    const qualityScore = (avgQuality / 10) * 40;
    const consistencyScore = entries.length >= 7 ? 20 : (entries.length / 7) * 20;
    
    return Math.round(durationScore + qualityScore + consistencyScore);
  };

  const getBestSleepFactors = () => {
    const factorQualityMap: Record<string, number[]> = {};
    
    entries.forEach(entry => {
      (entry.factors || []).forEach(factor => {
        if (!factorQualityMap[factor]) factorQualityMap[factor] = [];
        factorQualityMap[factor].push(entry.quality);
      });
    });
    
    return Object.entries(factorQualityMap)
      .map(([factor, qualities]) => ({
        factor,
        avgQuality: qualities.reduce((a, b) => a + b, 0) / qualities.length
      }))
      .sort((a, b) => b.avgQuality - a.avgQuality)
      .slice(0, 3);
  };

  return {
    entries,
    isLoading,
    isSaving,
    sleepGoal,
    setSleepGoal: setSleepGoalState,
    logSleep,
    deleteEntry,
    getAverageSleep,
    getAverageQuality,
    getFilteredEntries,
    getSleepScore,
    getBestSleepFactors,
    refetch: fetchEntries
  };
};
