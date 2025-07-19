import React, { useState } from "react";
import { motion } from "framer-motion";
import Input from "@/components/atoms/Input";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const SearchBar = ({ 
  onSearch, 
  placeholder = "Search products in videos...",
  filters = [],
  onFilterChange,
  className = ""
}) => {
  const [query, setQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(query, activeFilters);
  };

  const toggleFilter = (filter) => {
    const newFilters = activeFilters.includes(filter)
      ? activeFilters.filter(f => f !== filter)
      : [...activeFilters, filter];
    
    setActiveFilters(newFilters);
    onFilterChange && onFilterChange(newFilters);
  };

  return (
    <div className={`w-full ${className}`}>
      <form onSubmit={handleSearch} className="relative">
        <div className="flex items-center space-x-2">
          <div className="flex-1 relative">
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={placeholder}
              className="pl-10 pr-4 h-12 text-base border-2 border-gray-200 focus:border-purple-primary"
            />
            <ApperIcon 
              name="Search" 
              size={20} 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
            />
          </div>
          
          <Button
            type="submit"
            size="lg"
            className="h-12 px-6"
          >
            <ApperIcon name="Search" size={20} />
          </Button>
          
          {filters.length > 0 && (
            <Button
              type="button"
              variant="outline"
              size="lg"
              className="h-12"
              onClick={() => setShowFilters(!showFilters)}
            >
              <ApperIcon name="Filter" size={20} />
            </Button>
          )}
        </div>
      </form>

      {/* Filters */}
      <motion.div
        initial={false}
        animate={{ height: showFilters ? "auto" : 0, opacity: showFilters ? 1 : 0 }}
        className="overflow-hidden"
      >
        <div className="pt-4">
          <p className="text-sm font-medium text-gray-700 mb-3">Filter by category:</p>
          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => toggleFilter(filter)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 border ${
                  activeFilters.includes(filter)
                    ? "bg-purple-primary text-white border-purple-primary"
                    : "bg-white text-gray-600 border-gray-300 hover:border-purple-primary hover:text-purple-primary"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Active Filters */}
      {activeFilters.length > 0 && (
        <div className="flex items-center space-x-2 mt-3">
          <span className="text-sm text-gray-600">Active filters:</span>
          {activeFilters.map((filter) => (
            <div
              key={filter}
              className="flex items-center space-x-1 bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-sm"
            >
              <span>{filter}</span>
              <button
                onClick={() => toggleFilter(filter)}
                className="hover:bg-purple-200 rounded-full p-0.5"
              >
                <ApperIcon name="X" size={12} />
              </button>
            </div>
          ))}
          <button
            onClick={() => {
              setActiveFilters([]);
              onFilterChange && onFilterChange([]);
            }}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            Clear all
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchBar;