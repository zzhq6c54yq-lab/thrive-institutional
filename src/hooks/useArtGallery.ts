import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface ArtPiece {
  id: string;
  user_id: string;
  title: string;
  description: string | null;
  file_path: string | null;
  file_url: string | null;
  art_type: string;
  mood_expressed: string | null;
  is_shared: boolean;
  created_at: string;
}

export const useArtGallery = () => {
  const [artPieces, setArtPieces] = useState<ArtPiece[]>([]);
  const [sharedGallery, setSharedGallery] = useState<ArtPiece[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const fetchArtPieces = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      // Fetch user's own art
      if (user) {
        const { data, error } = await supabase
          .from('art_therapy_gallery')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (error) throw error;
        setArtPieces(data || []);
      }

      // Fetch shared art from community
      const { data: sharedData, error: sharedError } = await supabase
        .from('art_therapy_gallery')
        .select('*')
        .eq('is_shared', true)
        .order('created_at', { ascending: false })
        .limit(50);

      if (sharedError) throw sharedError;
      setSharedGallery(sharedData || []);

    } catch (error) {
      console.error('Error fetching art pieces:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchArtPieces();
  }, []);

  const saveArtwork = async (
    imageDataUrl: string,
    title: string,
    artType: string = 'drawing',
    description?: string,
    moodExpressed?: string,
    isShared: boolean = false
  ): Promise<ArtPiece | null> => {
    setIsUploading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      // Convert data URL to blob
      const response = await fetch(imageDataUrl);
      const blob = await response.blob();

      const fileName = `${user.id}/${Date.now()}.png`;
      
      // Upload to storage
      const { error: uploadError } = await supabase.storage
        .from('art-gallery')
        .upload(fileName, blob, {
          contentType: 'image/png',
          upsert: false
        });

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('art-gallery')
        .getPublicUrl(fileName);

      // Create database entry
      const { data, error } = await supabase
        .from('art_therapy_gallery')
        .insert({
          user_id: user.id,
          title,
          description,
          file_path: fileName,
          file_url: publicUrl,
          art_type: artType,
          mood_expressed: moodExpressed,
          is_shared: isShared
        })
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Artwork Saved",
        description: isShared 
          ? "Your artwork has been saved and shared with the community." 
          : "Your artwork has been saved to your gallery."
      });

      await fetchArtPieces();
      return data;
    } catch (error) {
      console.error('Error saving artwork:', error);
      toast({
        title: "Save Failed",
        description: "Failed to save your artwork. Please try again.",
        variant: "destructive"
      });
      return null;
    } finally {
      setIsUploading(false);
    }
  };

  const updateArtwork = async (
    artId: string,
    updates: Partial<Pick<ArtPiece, 'title' | 'description' | 'mood_expressed' | 'is_shared'>>
  ) => {
    try {
      const { error } = await supabase
        .from('art_therapy_gallery')
        .update(updates)
        .eq('id', artId);

      if (error) throw error;

      toast({
        title: "Artwork Updated",
        description: "Your changes have been saved."
      });

      await fetchArtPieces();
    } catch (error) {
      console.error('Error updating artwork:', error);
      toast({
        title: "Update Failed",
        description: "Failed to update the artwork. Please try again.",
        variant: "destructive"
      });
    }
  };

  const deleteArtwork = async (artId: string, filePath: string | null) => {
    try {
      // Delete from storage if file exists
      if (filePath) {
        await supabase.storage
          .from('art-gallery')
          .remove([filePath]);
      }

      // Delete from database
      const { error } = await supabase
        .from('art_therapy_gallery')
        .delete()
        .eq('id', artId);

      if (error) throw error;

      toast({
        title: "Artwork Deleted",
        description: "Your artwork has been removed."
      });

      await fetchArtPieces();
    } catch (error) {
      console.error('Error deleting artwork:', error);
      toast({
        title: "Delete Failed",
        description: "Failed to delete the artwork. Please try again.",
        variant: "destructive"
      });
    }
  };

  const shareArtwork = async (artId: string) => {
    await updateArtwork(artId, { is_shared: true });
  };

  const unshareArtwork = async (artId: string) => {
    await updateArtwork(artId, { is_shared: false });
  };

  return {
    artPieces,
    sharedGallery,
    isLoading,
    isUploading,
    saveArtwork,
    updateArtwork,
    deleteArtwork,
    shareArtwork,
    unshareArtwork,
    refetch: fetchArtPieces
  };
};
