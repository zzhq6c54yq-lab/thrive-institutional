import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart } from "lucide-react";
import { useState } from "react";
import StoryDetail from "./StoryDetail";

interface StoryCardProps {
  story: any;
}

const StoryCard = ({ story }: StoryCardProps) => {
  const [showDetail, setShowDetail] = useState(false);

  return (
    <>
      <Card
        className="p-6 glass-card hover:scale-[1.02] transition-all cursor-pointer"
        onClick={() => setShowDetail(true)}
      >
        <div className="flex items-start justify-between mb-3">
          <Heart className="w-5 h-5 text-primary" />
          {story.is_anonymous && (
            <Badge variant="secondary" className="text-xs">
              Anonymous
            </Badge>
          )}
        </div>

        <h3 className="font-semibold text-lg mb-2 line-clamp-2">{story.title}</h3>

        <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
          {story.story}
        </p>

        <div className="flex flex-wrap gap-2">
          {story.challenge_type?.map((challenge: string) => (
            <Badge key={challenge} variant="outline" className="text-xs">
              {challenge}
            </Badge>
          ))}
        </div>
      </Card>

      {showDetail && (
        <StoryDetail story={story} onClose={() => setShowDetail(false)} />
      )}
    </>
  );
};

export default StoryCard;
