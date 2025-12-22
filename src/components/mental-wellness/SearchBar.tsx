import React from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ 
  value, 
  onChange, 
  placeholder = "Search tools, resources, and assessments..." 
}) => {
  return (
    <div className="relative w-full group">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground transition-colors group-focus-within:text-primary" />
      <Input
        type="search"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-12 pr-4 h-14 rounded-2xl border-2 bg-card/50 backdrop-blur-sm focus:bg-card transition-all text-base"
      />
    </div>
  );
};

export default SearchBar;
