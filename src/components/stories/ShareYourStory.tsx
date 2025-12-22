import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useSuccessStories } from "@/hooks/useSuccessStories";
import { useUser } from "@/contexts/UserContext";
import { X } from "lucide-react";

const challengeTypes = [
  "Anxiety",
  "Depression",
  "PTSD",
  "Grief",
  "Addiction",
  "Eating Disorders",
  "Sleep",
  "Stress",
  "Relationships",
];

interface ShareYourStoryProps {
  onClose: () => void;
}

const ShareYourStory = ({ onClose }: ShareYourStoryProps) => {
  const { user } = useUser();
  const { submitStory } = useSuccessStories();
  const [title, setTitle] = useState("");
  const [story, setStory] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [selectedChallenges, setSelectedChallenges] = useState<string[]>([]);

  const handleSubmit = () => {
    submitStory.mutate(
      {
        title,
        story,
        challenge_type: selectedChallenges,
        is_anonymous: isAnonymous,
        user_id: !isAnonymous ? user?.id : undefined,
      },
      {
        onSuccess: () => {
          onClose();
        },
      }
    );
  };

  return (
    <Card className="p-8 glass-card relative">
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-4 right-4"
        onClick={onClose}
      >
        <X className="w-4 h-4" />
      </Button>

      <h2 className="text-2xl font-bold gradient-heading mb-6">Share Your Story</h2>

      <div className="space-y-6">
        <div>
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            placeholder="Give your story a title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="story">Your Story</Label>
          <Textarea
            id="story"
            placeholder="Share your journey, challenges, and what helped you..."
            value={story}
            onChange={(e) => setStory(e.target.value)}
            className="mt-1 min-h-[200px]"
          />
        </div>

        <div>
          <Label>Challenge Types (Select all that apply)</Label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-2">
            {challengeTypes.map((type) => (
              <div key={type} className="flex items-center space-x-2">
                <Checkbox
                  id={type}
                  checked={selectedChallenges.includes(type)}
                  onCheckedChange={(checked) => {
                    setSelectedChallenges(
                      checked
                        ? [...selectedChallenges, type]
                        : selectedChallenges.filter((t) => t !== type)
                    );
                  }}
                />
                <label htmlFor={type} className="text-sm">
                  {type}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="anonymous"
            checked={isAnonymous}
            onCheckedChange={(checked) => setIsAnonymous(checked as boolean)}
          />
          <label htmlFor="anonymous" className="text-sm">
            Share anonymously
          </label>
        </div>

        <Button
          onClick={handleSubmit}
          className="w-full"
          disabled={!title || !story || selectedChallenges.length === 0 || submitStory.isPending}
        >
          {submitStory.isPending ? "Submitting..." : "Submit Story"}
        </Button>

        <p className="text-xs text-muted-foreground text-center">
          Your story will be reviewed before being published to ensure community safety.
        </p>
      </div>
    </Card>
  );
};

export default ShareYourStory;
