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

// Simulate enhanced AI analysis with brand recognition
  useEffect(() => {
    if (videoData) {
      setIsAnalyzing(true);
      
      // Multi-stage brand-aware AI analysis
      const analysisStages = [
        { message: "Scanning video frames...", delay: 800 },
        { message: "Detecting product shapes...", delay: 600 },
        { message: "Analyzing brand logos and text...", delay: 700 },
        { message: "Cross-referencing brand database...", delay: 500 },
        { message: "Calculating confidence scores...", delay: 400 }
      ];
      
      let currentStage = 0;
      const stageTimer = setInterval(() => {
        if (currentStage < analysisStages.length - 1) {
          currentStage++;
        } else {
          clearInterval(stageTimer);
          setDetectedProducts(videoData.products || []);
          setIsAnalyzing(false);
          
          if (videoData.products?.length > 0) {
            const brands = [...new Set(videoData.products.map(p => p.brand))];
            const avgConfidence = (videoData.products.reduce((sum, p) => sum + (p.brandConfidence || 0), 0) / videoData.products.length).toFixed(1);
            
            toast.success(`Detected ${videoData.products.length} products from ${brands.length} brands with ${avgConfidence}% confidence!`, {
              icon: "🔍"
            });
          }
        }
      }, analysisStages[currentStage]?.delay || 500);

      return () => {
        clearInterval(stageTimer);
      };
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

{/* Enhanced AI Analysis Status */}
        <AnimatePresence>
          {isAnalyzing && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute bottom-4 left-4 bg-black/80 backdrop-blur-sm text-white rounded-xl p-4 flex items-center space-x-3 min-w-[300px]"
            >
              <div className="relative">
                <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <div className="absolute inset-0 w-8 h-8 border border-purple-400 rounded-full animate-pulse"></div>
              </div>
              <div className="flex-1">
                <p className="font-semibold font-display text-sm">Brand-Aware AI Analysis</p>
                <p className="text-xs text-gray-300 font-body">Advanced product & brand recognition...</p>
                <div className="mt-2 w-full bg-gray-700 rounded-full h-1.5">
                  <div className="bg-gradient-to-r from-purple-400 to-purple-600 h-1.5 rounded-full animate-pulse" style={{width: '65%'}}></div>
                </div>
              </div>
              <Badge variant="primary" size="sm">
                <ApperIcon name="Zap" size={12} className="mr-1" />
                AI+
              </Badge>
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