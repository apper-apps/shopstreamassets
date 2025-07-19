import React, { useState } from "react";
import VideoGallery from "@/components/organisms/VideoGallery";
import VideoOverlay from "@/components/organisms/VideoOverlay";
import { motion, AnimatePresence } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";

const HomePage = ({ 
  onAddToCart, 
  onSaveForLater,
  onBuyNow 
}) => {
  const [selectedVideo, setSelectedVideo] = useState(null);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <h1 className="text-5xl lg:text-6xl font-bold">
                <span className="gradient-text font-display">ShopStream</span>
              </h1>
              <p className="text-2xl text-gray-600 font-body max-w-3xl mx-auto">
                Watch. See. Buy. Instantly.
              </p>
              <p className="text-lg text-gray-500 font-body max-w-2xl mx-auto">
                AI-powered video shopping that identifies products in real-time across YouTube, TikTok, Instagram and more.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6"
            >
              <Button size="xl" className="min-w-[200px]">
                <ApperIcon name="Play" size={20} className="mr-2" />
                Start Shopping
              </Button>
              <Button variant="outline" size="xl" className="min-w-[200px]">
                <ApperIcon name="Video" size={20} className="mr-2" />
                How It Works
              </Button>
            </motion.div>

            {/* Feature Highlights */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12"
            >
              {[
                {
                  icon: "Eye",
                  title: "AI Recognition",
                  description: "Advanced computer vision identifies products instantly in any video"
                },
                {
                  icon: "Zap",
                  title: "One-Click Shopping",
                  description: "Purchase items directly from video overlays without leaving the content"
                },
                {
                  icon: "Shield",
                  title: "Secure Checkout",
                  description: "Safe and secure transactions with multiple payment options"
                }
              ].map((feature, index) => (
                <div key={feature.title} className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <ApperIcon name={feature.icon} size={32} className="text-purple-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 font-display mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 font-body">
                    {feature.description}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <AnimatePresence mode="wait">
          {selectedVideo ? (
            <motion.div
              key="video-overlay"
              initial={{ opacity: 0, x: 300 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -300 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
            >
              {/* Back Button */}
              <div className="mb-6">
                <Button
                  variant="outline"
                  onClick={() => setSelectedVideo(null)}
                  className="mb-4"
                >
                  <ApperIcon name="ArrowLeft" size={16} className="mr-2" />
                  Back to Videos
                </Button>
              </div>

              <VideoOverlay
                videoData={selectedVideo}
                onAddToCart={onAddToCart}
                onSaveForLater={onSaveForLater}
                onBuyNow={onBuyNow}
              />
            </motion.div>
          ) : (
            <motion.div
              key="video-gallery"
              initial={{ opacity: 0, x: -300 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 300 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
            >
              <VideoGallery onVideoSelect={setSelectedVideo} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Stats Section */}
      {!selectedVideo && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-gradient-to-r from-purple-primary to-purple-secondary py-16"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
              {[
                { number: "10M+", label: "Videos Analyzed" },
                { number: "500K+", label: "Products Detected" },
                { number: "50K+", label: "Happy Shoppers" },
                { number: "99.9%", label: "Accuracy Rate" }
              ].map((stat, index) => (
                <div key={stat.label}>
                  <h3 className="text-4xl font-bold text-white font-display mb-2">
                    {stat.number}
                  </h3>
                  <p className="text-purple-100 font-body">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default HomePage;