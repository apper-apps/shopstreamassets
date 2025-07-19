import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import VideoPlayer from "@/components/molecules/VideoPlayer";
import ProductModal from "@/components/organisms/ProductModal";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";
import ApperIcon from "@/components/ApperIcon";
import { toast } from "react-toastify";

const VideoOverlay = ({ 
  videoData,
  onAddToCart,
  onSaveForLater,
  onBuyNow 
}) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showProductModal, setShowProductModal] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(true);
  const [detectedProducts, setDetectedProducts] = useState([]);

  // Simulate AI analysis
  useEffect(() => {
    if (videoData) {
      setIsAnalyzing(true);
      const timer = setTimeout(() => {
        setDetectedProducts(videoData.products || []);
        setIsAnalyzing(false);
        if (videoData.products?.length > 0) {
          toast.success(`Found ${videoData.products.length} products in this video!`, {
            icon: "🎯"
          });
        }
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [videoData]);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setShowProductModal(true);
  };

  const handleAddToCart = (product) => {
    onAddToCart(product);
    toast.success(`${product.name} added to cart!`, {
      icon: "🛒"
    });
  };

  const handleSaveForLater = (product) => {
    onSaveForLater(product);
    toast.success(`${product.name} saved for later!`, {
      icon: "❤️"
    });
  };

  const handleBuyNow = (product) => {
    onBuyNow(product);
    toast.success("Redirecting to checkout...", {
      icon: "⚡"
    });
  };

  if (!videoData) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 font-body">No video selected</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Video Player with Overlay */}
      <div className="relative">
        <VideoPlayer
          videoUrl={videoData.videoUrl}
          products={detectedProducts}
          onProductClick={handleProductClick}
          onVideoLoad={() => console.log("Video loaded")}
          platform={videoData.platform}
        />

        {/* AI Analysis Status */}
        <AnimatePresence>
          {isAnalyzing && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-sm text-white rounded-xl p-4 flex items-center space-x-3"
            >
              <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <div>
                <p className="font-semibold font-display">AI Analysis in Progress</p>
                <p className="text-sm text-gray-300 font-body">Detecting products in video...</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Video Info */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h2 className="text-xl font-bold text-gray-900 font-display mb-2">
              {videoData.title || "Video Content"}
            </h2>
            <p className="text-gray-600 font-body mb-3">
              {videoData.description || "AI-powered product detection in real-time video content."}
            </p>
            <div className="flex items-center space-x-4">
              <Badge variant="primary">
                <ApperIcon name="User" size={14} className="mr-1" />
                {videoData.creatorName || "Content Creator"}
              </Badge>
              <Badge variant="secondary">
                <ApperIcon name="Eye" size={14} className="mr-1" />
                {videoData.views || "1.2M"} views
              </Badge>
              <Badge variant="success">
                <ApperIcon name="Package" size={14} className="mr-1" />
                {detectedProducts.length} products detected
              </Badge>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex items-center space-x-3 pt-4 border-t border-gray-200">
          <Button variant="outline" size="sm">
            <ApperIcon name="Share" size={16} className="mr-2" />
            Share Video
          </Button>
          <Button variant="outline" size="sm">
            <ApperIcon name="Bookmark" size={16} className="mr-2" />
            Save Video
          </Button>
          <Button variant="outline" size="sm">
            <ApperIcon name="Download" size={16} className="mr-2" />
            Download
          </Button>
        </div>
      </div>

      {/* Detected Products Summary */}
      {detectedProducts.length > 0 && !isAnalyzing && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-6 border border-purple-100"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900 font-display">
              Products in this Video
            </h3>
            <Badge variant="primary">
              {detectedProducts.length} found
            </Badge>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {detectedProducts.slice(0, 4).map((product) => (
              <button
                key={product.Id}
                onClick={() => handleProductClick(product)}
                className="bg-white rounded-lg p-3 shadow-sm hover:shadow-md transition-all duration-200 text-left group"
              >
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-24 object-cover rounded-lg mb-2 group-hover:scale-105 transition-transform duration-200"
                />
                <h4 className="font-semibold text-sm text-gray-900 font-display truncate">
                  {product.name}
                </h4>
                <p className="text-sm text-purple-primary font-bold font-display">
                  ${product.price}
                </p>
              </button>
            ))}
          </div>
          
          {detectedProducts.length > 4 && (
            <div className="mt-4 text-center">
              <Button variant="outline" size="sm">
                View All {detectedProducts.length} Products
                <ApperIcon name="ArrowRight" size={16} className="ml-2" />
              </Button>
            </div>
          )}
        </motion.div>
      )}

      {/* Product Modal */}
      <ProductModal
        product={selectedProduct}
        isOpen={showProductModal}
        onClose={() => setShowProductModal(false)}
        onAddToCart={handleAddToCart}
        onSaveForLater={handleSaveForLater}
        onBuyNow={handleBuyNow}
      />
    </div>
  );
};

export default VideoOverlay;