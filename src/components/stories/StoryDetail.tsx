import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Heart } from "lucide-react";

interface StoryDetailProps {
  story: any;
  onClose: () => void;
}

const StoryDetail = ({ story, onClose }: StoryDetailProps) => {
  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <Heart className="w-6 h-6 text-primary" />
            {story.title}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {story.is_anonymous && (
            <Badge variant="secondary">Shared Anonymously</Badge>
          )}

          <div className="flex flex-wrap gap-2">
            {story.challenge_type?.map((challenge: string) => (
              <Badge key={challenge} variant="outline">
                {challenge}
              </Badge>
            ))}
          </div>

          <div className="prose prose-sm dark:prose-invert max-w-none">
            <p className="whitespace-pre-wrap">{story.story}</p>
          </div>

          <div className="text-sm text-muted-foreground border-t border-border pt-4">
            Shared on {new Date(story.created_at).toLocaleDateString()}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default StoryDetail;
