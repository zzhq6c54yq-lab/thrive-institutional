import { Button } from "@/components/ui/button";

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

interface StoryFiltersProps {
  selectedFilter: string | null;
  onFilterChange: (filter: string | null) => void;
}

const StoryFilters = ({ selectedFilter, onFilterChange }: StoryFiltersProps) => {
  return (
    <div className="flex flex-wrap gap-2 justify-center">
      <Button
        variant={selectedFilter === null ? "default" : "outline"}
        size="sm"
        onClick={() => onFilterChange(null)}
      >
        All Stories
      </Button>
      {challengeTypes.map((type) => (
        <Button
          key={type}
          variant={selectedFilter === type ? "default" : "outline"}
          size="sm"
          onClick={() => onFilterChange(type)}
        >
          {type}
        </Button>
      ))}
    </div>
  );
};

export default StoryFilters;
