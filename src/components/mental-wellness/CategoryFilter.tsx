import React from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface CategoryFilterProps {
  categories: string[];
  activeCategory: string;
  onSelectCategory: (category: string) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  activeCategory,
  onSelectCategory,
}) => {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((category) => {
        const isActive = activeCategory === category;
        return (
          <motion.button
            key={category}
            onClick={() => onSelectCategory(category)}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium transition-all relative overflow-hidden",
              isActive
                ? "bg-primary text-primary-foreground shadow-lg"
                : "bg-card hover:bg-muted border border-border"
            )}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isActive && (
              <motion.div
                layoutId="activeCategory"
                className="absolute inset-0 bg-primary"
                initial={false}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            )}
            <span className="relative flex items-center gap-1.5">
              {isActive && <Check className="h-3.5 w-3.5" />}
              {category}
            </span>
          </motion.button>
        );
      })}
    </div>
  );
};

export default CategoryFilter;
