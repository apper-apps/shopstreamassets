import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Badge from "@/components/atoms/Badge";
const VideoPlayer = ({ 
  videoUrl, 
  products = [], 
  onProductClick,
  onVideoLoad,
  platform = "youtube" 
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const videoRef = useRef(null);
  const controlsTimeoutRef = useRef(null);

  // Get products visible at current time
  const visibleProducts = products.filter(product => {
    const showTime = product.videoTimestamp || 0;
    return currentTime >= showTime && currentTime <= showTime + 10; // Show for 10 seconds
  });

  const handlePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
      onVideoLoad && onVideoLoad();
    }
  };

  const handleMouseMove = () => {
    setShowControls(true);
    clearTimeout(controlsTimeoutRef.current);
    controlsTimeoutRef.current = setTimeout(() => {
      setShowControls(false);
    }, 3000);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const handleSeek = (e) => {
    if (videoRef.current) {
      const rect = e.currentTarget.getBoundingClientRect();
      const pos = (e.clientX - rect.left) / rect.width;
      videoRef.current.currentTime = pos * duration;
    }
  };

  return (
    <div 
      className="relative w-full h-[500px] bg-black rounded-xl overflow-hidden video-container group"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setShowControls(false)}
    >
      {/* Video Element */}
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        src={videoUrl}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        poster="/api/placeholder/800/500"
      >
        Your browser does not support the video tag.
      </video>

      {/* Product Hotspots */}
      <div className="video-overlay">
        <AnimatePresence>
          {visibleProducts.map((product, index) => (
            <motion.button
              key={`${product.Id}-${product.videoTimestamp}`}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              whileHover={{ scale: 1.2 }}
              className="product-hotspot hotspot-pulse"
              style={{
                top: `${20 + (index * 15)}%`,
                left: `${30 + (index * 20)}%`,
              }}
              onClick={() => onProductClick(product)}
            >
              <ApperIcon name="ShoppingBag" size={12} />
            </motion.button>
          ))}
        </AnimatePresence>
      </div>

      {/* Video Controls */}
      <AnimatePresence>
        {showControls && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4"
          >
            {/* Progress Bar */}
            <div 
              className="w-full h-1 bg-white/30 rounded-full mb-4 cursor-pointer"
              onClick={handleSeek}
            >
              <div 
                className="h-full bg-gradient-to-r from-purple-primary to-purple-secondary rounded-full transition-all duration-200"
                style={{ width: `${(currentTime / duration) * 100}%` }}
              />
            </div>

            {/* Control Buttons */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button
                  onClick={handlePlay}
                  className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-200"
                >
                  <ApperIcon name={isPlaying ? "Pause" : "Play"} size={20} />
                </button>
                
                <span className="text-white text-sm font-medium">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </span>
              </div>

              <div className="flex items-center space-x-2">
                <Badge variant="primary" size="sm" className="bg-white/20 backdrop-blur-sm text-white border-white/30">
                  {visibleProducts.length} Products
                </Badge>
                
                <button className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-200">
                  <ApperIcon name="Volume2" size={16} />
                </button>
                
                <button className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-200">
                  <ApperIcon name="Maximize" size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Platform Badge */}
      <div className="absolute top-4 left-4">
        <Badge variant="primary" size="sm" className="bg-black/50 backdrop-blur-sm text-white border-white/30">
          <ApperIcon 
            name={platform === "youtube" ? "Youtube" : platform === "instagram" ? "Instagram" : "Video"} 
            size={14} 
            className="mr-1" 
          />
          {platform.charAt(0).toUpperCase() + platform.slice(1)}
        </Badge>
      </div>

      {/* AI Analysis Indicator */}
      <div className="absolute top-4 right-4">
        <div className="bg-black/50 backdrop-blur-sm rounded-lg px-3 py-2 flex items-center space-x-2 text-white text-sm">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span>AI Analyzing</span>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;