import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Upload, Loader2 } from "lucide-react";

interface MediaUploadDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  connectionId: string;
  onUploadComplete: () => void;
}

const MediaUploadDialog: React.FC<MediaUploadDialogProps> = ({
  open,
  onOpenChange,
  connectionId,
  onUploadComplete
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [childName, setChildName] = useState("");
  const [mediaType, setMediaType] = useState<"photo" | "video" | "document">("photo");
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      
      // Auto-detect media type
      if (selectedFile.type.startsWith('image/')) {
        setMediaType('photo');
      } else if (selectedFile.type.startsWith('video/')) {
        setMediaType('video');
      } else {
        setMediaType('document');
      }
    }
  };

  const handleUpload = async () => {
    if (!file) {
      toast({
        title: "No file selected",
        description: "Please select a file to upload",
        variant: "destructive"
      });
      return;
    }

    setIsUploading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      // Generate unique file name
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}/${Date.now()}.${fileExt}`;

      // Upload file to storage
      const { error: uploadError, data: uploadData } = await supabase.storage
        .from('parent-network-media')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('parent-network-media')
        .getPublicUrl(fileName);

      // Create database record
      const { error: dbError } = await (supabase as any)
        .from('shared_media')
        .insert({
          uploader_id: user.id,
          connection_id: connectionId,
          media_type: mediaType,
          file_url: publicUrl,
          title: title || file.name,
          description: description || null,
          child_name: childName || null,
          is_favorite: false
        });

      if (dbError) throw dbError;

      toast({
        title: "Upload successful",
        description: "Your media has been shared"
      });

      // Reset form
      setFile(null);
      setTitle("");
      setDescription("");
      setChildName("");
      onUploadComplete();
      onOpenChange(false);
    } catch (error: any) {
      console.error('Upload error:', error);
      toast({
        title: "Upload failed",
        description: error.message || "Failed to upload media",
        variant: "destructive"
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Upload Media</DialogTitle>
          <DialogDescription>
            Share photos, videos, or documents with your connection
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="file">File *</Label>
            <div className="flex items-center gap-2">
              <Input
                id="file"
                type="file"
                accept="image/*,video/*,.pdf,.doc,.docx"
                onChange={handleFileChange}
                disabled={isUploading}
              />
            </div>
            {file && (
              <p className="text-sm text-muted-foreground">
                Selected: {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="media-type">Media Type</Label>
            <Select value={mediaType} onValueChange={(value: any) => setMediaType(value)}>
              <SelectTrigger id="media-type">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="photo">Photo</SelectItem>
                <SelectItem value="video">Video</SelectItem>
                <SelectItem value="document">Document</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="title">Title (Optional)</Label>
            <Input
              id="title"
              placeholder="e.g., Birthday party"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={isUploading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="child-name">Child's Name (Optional)</Label>
            <Input
              id="child-name"
              placeholder="e.g., Emma"
              value={childName}
              onChange={(e) => setChildName(e.target.value)}
              disabled={isUploading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <Textarea
              id="description"
              placeholder="Add details about this media..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={isUploading}
              rows={3}
            />
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isUploading}
          >
            Cancel
          </Button>
          <Button onClick={handleUpload} disabled={isUploading || !file}>
            {isUploading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <Upload className="w-4 h-4 mr-2" />
                Upload
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MediaUploadDialog;
