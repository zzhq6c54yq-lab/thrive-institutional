
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Brain, Heart, Moon, MessageCircle, Calendar, Sparkles } from "lucide-react";

interface CategorySelectorProps {
  activeCategory: string | null;
  onCategorySelect: (categoryName: string) => void;
}

const CategorySelector: React.FC<CategorySelectorProps> = ({ 
  activeCategory, 
  onCategorySelect 
}) => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  const wellnessCategories = [
    { name: "Mindfulness & Meditation", icon: Brain },
    { name: "Anxiety Relief", icon: Heart },
    { name: "Better Sleep", icon: Moon },
    { name: "Healthy Relationships", icon: MessageCircle },
    { name: "Daily Wellness Practices", icon: Calendar },
    { name: "Self-Discovery", icon: Sparkles }
  ];

  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold mb-6 text-[#1a1a1f] flex items-center">
        <Heart className="w-6 h-6 mr-2 text-[#B87333]" />
        Wellness Categories
      </h2>
      
      <motion.div 
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {wellnessCategories.map((category, index) => {
          const CategoryIcon = category.icon;
          return (
            <motion.div
              key={index}
              variants={itemVariants}
            >
              <Button
                variant="outline"
                className={`h-auto py-6 w-full flex flex-col items-center justify-center border transition-all duration-300 ${
                  activeCategory === category.name 
                    ? 'border-[#B87333] bg-[#B87333]/5 transform scale-105' 
                    : 'hover:border-[#B87333]/50 hover:scale-105'
                }`}
                onClick={() => onCategorySelect(category.name)}
              >
                <CategoryIcon className={`h-8 w-8 mb-2 ${
                  activeCategory === category.name ? 'text-[#B87333]' : 'text-gray-600'
                }`} />
                <span className="text-center text-sm">{category.name}</span>
              </Button>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};

export default CategorySelector;
