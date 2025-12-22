import { useSuccessStories } from "@/hooks/useSuccessStories";
import StoryCard from "@/components/stories/StoryCard";
import StoryFilters from "@/components/stories/StoryFilters";
import ShareYourStory from "@/components/stories/ShareYourStory";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const SuccessStories = () => {
  const { stories, isLoading } = useSuccessStories();
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
  const [showShareForm, setShowShareForm] = useState(false);

  const filteredStories = selectedFilter
    ? stories?.filter(story => story.challenge_type?.includes(selectedFilter))
    : stories;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-foreground">Loading success stories...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-bold gradient-heading">
            Success Stories
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Real journeys of hope, healing, and transformation. You're not alone.
          </p>
          <Button
            onClick={() => setShowShareForm(!showShareForm)}
            className="gap-2"
          >
            <Plus className="w-4 h-4" />
            Share Your Story
          </Button>
        </div>

        {showShareForm && <ShareYourStory onClose={() => setShowShareForm(false)} />}

        {/* Filters */}
        <StoryFilters
          selectedFilter={selectedFilter}
          onFilterChange={setSelectedFilter}
        />

        {/* Stories Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStories?.map((story) => (
            <StoryCard key={story.id} story={story} />
          ))}
        </div>

        {filteredStories?.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            No stories found for this filter.
          </div>
        )}
      </div>
    </div>
  );
};

export default SuccessStories;
