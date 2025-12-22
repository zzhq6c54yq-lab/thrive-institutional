
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { toolCategories } from "@/data/toolCategories";

interface ToolsListProps {
  filteredTools: typeof toolCategories;
  categoryFilter: string;
  setCategoryFilter: (filter: string) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  recommendations: string[];
  onToolSelect: (toolTitle: string) => void;
}

const ToolsList: React.FC<ToolsListProps> = ({
  filteredTools,
  categoryFilter,
  setCategoryFilter,
  searchTerm,
  setSearchTerm,
  recommendations,
  onToolSelect
}) => {
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);
  
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

  const categories = [
    { id: "all", label: "All Tools" },
    { id: "recommended", label: "Recommended For You" }
  ];

  return (
    <>
      <div className="mb-8 flex flex-col sm:flex-row gap-4 items-center">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search tools..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B87333]/50"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          {categories.map((category) => (
            <Button
              key={category.id}
              onClick={() => setCategoryFilter(category.id)}
              variant={categoryFilter === category.id ? "default" : "outline"}
              className={categoryFilter === category.id ? "bg-[#B87333] hover:bg-[#B87333]/90" : ""}
              disabled={category.id === "recommended" && recommendations.length === 0}
            >
              {category.label}
            </Button>
          ))}
        </div>
      </div>

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {filteredTools.map((tool, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            onMouseEnter={() => setHoveredCardId(tool.title)}
            onMouseLeave={() => setHoveredCardId(null)}
            whileHover={{ y: -5 }}
          >
            <Card 
              className={`feature-card overflow-hidden border-border/50 hover:border-[#B87333]/50 transition-all hover:shadow-lg ${
                recommendations.includes(tool.title) ? "ring-2 ring-[#B87333]/30" : ""
              }`}
            >
              <CardHeader className={`pb-4 transition-colors duration-500 ${
                hoveredCardId === tool.title ? 'bg-gradient-to-r from-white to-[#B87333]/5' : ''
              }`}>
                <div className="rounded-full bg-[#B87333]/10 w-12 h-12 flex items-center justify-center mb-4">
                  <tool.icon className={`h-6 w-6 text-[#B87333] ${
                    hoveredCardId === tool.title ? 'animate-bounce' : ''
                  }`} />
                </div>
                <CardTitle className="text-2xl">{tool.title}</CardTitle>
                <CardDescription className="text-base">{tool.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-6">
                  {tool.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <span className="text-[#B87333] mr-2 text-lg">•</span>
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button 
                  className="w-full bg-[#B87333] hover:bg-[#B87333]/90 hero-button"
                  onClick={() => onToolSelect(tool.title)}
                >
                  {tool.cta}
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {filteredTools.length === 0 && (
        <div className="text-center py-16">
          <p className="text-xl text-muted-foreground">No matching tools found. Try adjusting your search.</p>
        </div>
      )}
    </>
  );
};

export default ToolsList;
