import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface VideoDiaryEntry {
  id: string;
  user_id: string;
  title: string;
  description: string | null;
  file_path: string;
  file_url: string | null;
  duration_seconds: number | null;
  thumbnail_url: string | null;
  mood_tag: string | null;
  is_private: boolean;
  shared_with_therapist: boolean;
  created_at: string;
}

export const useVideoDiary = () => {
  const [entries, setEntries] = useState<VideoDiaryEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const fetchEntries = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('video_diary_entries')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setEntries(data || []);
    } catch (error) {
      console.error('Error fetching video diary entries:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  const uploadVideo = async (
    videoBlob: Blob,
    title: string,
    description?: string,
    moodTag?: string
  ): Promise<VideoDiaryEntry | null> => {
    setIsUploading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const fileName = `${user.id}/${Date.now()}.webm`;
      
      // Upload to storage
      const { error: uploadError } = await supabase.storage
        .from('video-diary')
        .upload(fileName, videoBlob, {
          contentType: 'video/webm',
          upsert: false
        });

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('video-diary')
        .getPublicUrl(fileName);

      // Create database entry
      const { data, error } = await supabase
        .from('video_diary_entries')
        .insert({
          user_id: user.id,
          title,
          description,
          file_path: fileName,
          file_url: publicUrl,
          mood_tag: moodTag,
          is_private: true,
          shared_with_therapist: false
        })
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Video Saved",
        description: "Your video diary entry has been saved successfully."
      });

      await fetchEntries();
      return data;
    } catch (error) {
      console.error('Error uploading video:', error);
      toast({
        title: "Upload Failed",
        description: "Failed to save your video. Please try again.",
        variant: "destructive"
      });
      return null;
    } finally {
      setIsUploading(false);
    }
  };

  const deleteEntry = async (entryId: string, filePath: string) => {
    try {
      // Delete from storage
      await supabase.storage
        .from('video-diary')
        .remove([filePath]);

      // Delete from database
      const { error } = await supabase
        .from('video_diary_entries')
        .delete()
        .eq('id', entryId);

      if (error) throw error;

      toast({
        title: "Entry Deleted",
        description: "Your video diary entry has been removed."
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

  const updateEntry = async (
    entryId: string, 
    updates: Partial<Pick<VideoDiaryEntry, 'title' | 'description' | 'mood_tag' | 'shared_with_therapist'>>
  ) => {
    try {
      const { error } = await supabase
        .from('video_diary_entries')
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

  return {
    entries,
    isLoading,
    isUploading,
    uploadVideo,
    deleteEntry,
    updateEntry,
    refetch: fetchEntries
  };
};
