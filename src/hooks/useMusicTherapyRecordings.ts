import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface MusicRecording {
  id: string;
  user_id: string;
  title: string;
  instrument: string;
  duration_seconds: number | null;
  file_path: string | null;
  file_url: string | null;
  mood_before: string | null;
  mood_after: string | null;
  notes: string | null;
  created_at: string;
}

export const useMusicTherapyRecordings = () => {
  const [recordings, setRecordings] = useState<MusicRecording[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const fetchRecordings = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setIsLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('music_therapy_recordings')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setRecordings(data || []);
    } catch (error) {
      console.error('Error fetching music recordings:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRecordings();
  }, []);

  const saveRecording = async (
    audioBlob: Blob,
    title: string,
    instrument: string,
    durationSeconds?: number,
    moodBefore?: string,
    moodAfter?: string,
    notes?: string
  ): Promise<MusicRecording | null> => {
    setIsUploading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const fileName = `${user.id}/${Date.now()}.webm`;
      
      // Upload to storage
      const { error: uploadError } = await supabase.storage
        .from('music-recordings')
        .upload(fileName, audioBlob, {
          contentType: 'audio/webm',
          upsert: false
        });

      if (uploadError) throw uploadError;

      // Get URL
      const { data: { publicUrl } } = supabase.storage
        .from('music-recordings')
        .getPublicUrl(fileName);

      // Create database entry
      const { data, error } = await supabase
        .from('music_therapy_recordings')
        .insert({
          user_id: user.id,
          title,
          instrument,
          duration_seconds: durationSeconds,
          file_path: fileName,
          file_url: publicUrl,
          mood_before: moodBefore,
          mood_after: moodAfter,
          notes
        })
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Recording Saved",
        description: "Your music creation has been saved to your library."
      });

      await fetchRecordings();
      return data;
    } catch (error) {
      console.error('Error saving recording:', error);
      toast({
        title: "Save Failed",
        description: "Failed to save your recording. Please try again.",
        variant: "destructive"
      });
      return null;
    } finally {
      setIsUploading(false);
    }
  };

  const deleteRecording = async (recordingId: string, filePath: string | null) => {
    try {
      // Delete from storage if file exists
      if (filePath) {
        await supabase.storage
          .from('music-recordings')
          .remove([filePath]);
      }

      // Delete from database
      const { error } = await supabase
        .from('music_therapy_recordings')
        .delete()
        .eq('id', recordingId);

      if (error) throw error;

      toast({
        title: "Recording Deleted",
        description: "Your recording has been removed."
      });

      await fetchRecordings();
    } catch (error) {
      console.error('Error deleting recording:', error);
      toast({
        title: "Delete Failed",
        description: "Failed to delete the recording. Please try again.",
        variant: "destructive"
      });
    }
  };

  const getTotalRecordings = () => recordings.length;
  
  const getTotalDuration = () => {
    return recordings.reduce((sum, r) => sum + (r.duration_seconds || 0), 0);
  };

  const getMostUsedInstrument = () => {
    const instrumentCount: Record<string, number> = {};
    recordings.forEach(r => {
      instrumentCount[r.instrument] = (instrumentCount[r.instrument] || 0) + 1;
    });
    const sorted = Object.entries(instrumentCount).sort((a, b) => b[1] - a[1]);
    return sorted.length > 0 ? sorted[0][0] : null;
  };

  return {
    recordings,
    isLoading,
    isUploading,
    saveRecording,
    deleteRecording,
    getTotalRecordings,
    getTotalDuration,
    getMostUsedInstrument,
    refetch: fetchRecordings
  };
};
