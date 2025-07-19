import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import SearchBar from "@/components/molecules/SearchBar";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";
import ApperIcon from "@/components/ApperIcon";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import { getVideos } from "@/services/api/videoService";

const VideoGallery = ({ onVideoSelect }) => {
  const [videos, setVideos] = useState([]);
  const [filteredVideos, setFilteredVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState([]);

  const categories = ["Fashion", "Tech", "Home", "Beauty", "Sports", "Gaming"];

  useEffect(() => {
    loadVideos();
  }, []);

  useEffect(() => {
    filterVideos();
  }, [videos, searchQuery, activeFilters]);

  const loadVideos = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await getVideos();
      setVideos(data);
    } catch (err) {
      setError("Failed to load videos. Please try again.");
      console.error("Videos error:", err);
    } finally {
      setLoading(false);
    }
  };

  const filterVideos = () => {
    let filtered = videos;

    if (searchQuery) {
      filtered = filtered.filter(video =>
        video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        video.creatorName.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (activeFilters.length > 0) {
      filtered = filtered.filter(video =>
        video.products.some(product =>
          activeFilters.includes(product.category)
        )
      );
    }

    setFilteredVideos(filtered);
  };

  const handleSearch = (query, filters) => {
    setSearchQuery(query);
    setActiveFilters(filters);
  };

  const handleFilterChange = (filters) => {
    setActiveFilters(filters);
  };

  if (loading) return <Loading type="video" />;
  if (error) return <Error message={error} onRetry={loadVideos} type="network" />;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold gradient-text font-display">
          Discover Shoppable Videos
        </h1>
        <p className="text-xl text-gray-600 font-body max-w-2xl mx-auto">
          Watch amazing content and shop products instantly with AI-powered recognition
        </p>
      </div>

      {/* Search and Filters */}
      <div className="max-w-4xl mx-auto">
        <SearchBar
          onSearch={handleSearch}
          onFilterChange={handleFilterChange}
          filters={categories}
          placeholder="Search videos, creators, or products..."
        />
      </div>

      {/* Video Grid */}
      {filteredVideos.length === 0 ? (
        <Empty 
          type="video"
          onAction={() => {
            setSearchQuery("");
            setActiveFilters([]);
          }}
          actionText="Clear Filters"
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredVideos.map((video, index) => (
            <motion.div
              key={video.Id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 group cursor-pointer"
              onClick={() => onVideoSelect(video)}
            >
              {/* Video Thumbnail */}
              <div className="relative overflow-hidden">
                <img
                  src={video.thumbnailUrl}
                  alt={video.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                
                {/* Play Overlay */}
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-16 h-16 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <ApperIcon name="Play" size={24} className="text-purple-primary ml-1" />
                  </div>
                </div>
                
                {/* Platform Badge */}
                <div className="absolute top-3 left-3">
                  <Badge variant="primary" size="sm" className="bg-black/50 backdrop-blur-sm text-white border-white/30">
                    <ApperIcon 
                      name={video.platform === "youtube" ? "Youtube" : video.platform === "instagram" ? "Instagram" : "Video"} 
                      size={12} 
                      className="mr-1" 
                    />
                    {video.platform.charAt(0).toUpperCase() + video.platform.slice(1)}
                  </Badge>
                </div>
                
                {/* Product Count */}
                <div className="absolute top-3 right-3">
                  <Badge variant="success" size="sm" className="bg-black/50 backdrop-blur-sm text-white border-white/30">
                    <ApperIcon name="Package" size={12} className="mr-1" />
                    {video.products.length}
                  </Badge>
                </div>
                
                {/* Duration */}
                <div className="absolute bottom-3 right-3">
                  <Badge variant="default" size="sm" className="bg-black/70 backdrop-blur-sm text-white border-none">
                    {video.duration}
                  </Badge>
                </div>
              </div>
              
              {/* Video Info */}
              <div className="p-4">
                <h3 className="font-bold text-gray-900 font-display line-clamp-2 mb-2">
                  {video.title}
                </h3>
                
                <div className="flex items-center space-x-2 mb-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-100 to-blue-100 rounded-full flex items-center justify-center">
                    <ApperIcon name="User" size={14} className="text-purple-primary" />
                  </div>
                  <span className="text-sm text-gray-600 font-body">{video.creatorName}</span>
                </div>
                
                <div className="flex items-center justify-between text-sm text-gray-500 font-body mb-4">
                  <span>{video.views} views</span>
                  <span>{video.uploadDate}</span>
                </div>
                
                {/* Product Categories */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {[...new Set(video.products.map(p => p.category))].slice(0, 3).map((category, idx) => (
                    <Badge key={idx} variant="outline" size="sm">
                      {category}
                    </Badge>
                  ))}
                  {video.products.length > 3 && (
                    <Badge variant="outline" size="sm">
                      +{video.products.length - 3} more
                    </Badge>
                  )}
                </div>
                
                {/* Action Button */}
                <Button
                  variant="primary"
                  size="sm"
                  className="w-full"
                  onClick={(e) => {
                    e.stopPropagation();
                    onVideoSelect(video);
                  }}
                >
                  <ApperIcon name="ShoppingBag" size={16} className="mr-2" />
                  Shop This Video
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default VideoGallery;