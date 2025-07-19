import React from "react";
import ApperIcon from "@/components/ApperIcon";

const Empty = ({ 
  type = "general",
  onAction = null,
  actionText = "Get Started"
}) => {
  const getEmptyContent = () => {
    switch (type) {
      case "video":
        return {
          icon: "Video",
          title: "Ready to Shop from Videos?",
          description: "Start watching videos on YouTube, TikTok, or Instagram and see products come to life with instant shopping.",
          actionText: "Browse Video Platforms",
          gradient: "from-purple-100 to-blue-100"
        };
      case "products":
        return {
          icon: "Package",
          title: "No Products Found",
          description: "We haven't detected any products in this video yet. Our AI is constantly improving product recognition.",
          actionText: "Try Another Video",
          gradient: "from-green-100 to-blue-100"
        };
      case "cart":
        return {
          icon: "ShoppingCart",
          title: "Your Cart is Empty",
          description: "Discover amazing products while watching your favorite videos and add them to your cart for easy checkout.",
          actionText: "Start Shopping",
          gradient: "from-amber-100 to-orange-100"
        };
      case "saved":
        return {
          icon: "Heart",
          title: "No Saved Items",
          description: "Save products you love while watching videos to purchase them later. Build your wishlist as you browse.",
          actionText: "Find Products",
          gradient: "from-pink-100 to-purple-100"
        };
      case "creator":
        return {
          icon: "TrendingUp",
          title: "Welcome to Creator Dashboard",
          description: "Start creating content with product tags to earn commissions. Track your performance and optimize your earnings.",
          actionText: "Create Content",
          gradient: "from-blue-100 to-purple-100"
        };
      default:
        return {
          icon: "Sparkles",
          title: "Nothing Here Yet",
          description: "This section is waiting for content. Start exploring to see amazing results.",
          actionText: actionText,
          gradient: "from-gray-100 to-blue-100"
        };
    }
  };

  const emptyContent = getEmptyContent();

  return (
    <div className="flex flex-col items-center justify-center p-12 text-center">
      <div className={`w-24 h-24 bg-gradient-to-br ${emptyContent.gradient} rounded-2xl flex items-center justify-center mb-8 shadow-lg`}>
        <ApperIcon 
          name={emptyContent.icon} 
          size={40} 
          className="text-purple-primary" 
        />
      </div>
      
      <h3 className="text-2xl font-bold text-gray-900 mb-4 font-display">
        {emptyContent.title}
      </h3>
      
      <p className="text-gray-600 mb-8 max-w-md font-body leading-relaxed">
        {emptyContent.description}
      </p>
      
      {onAction && (
        <button
          onClick={onAction}
          className="px-8 py-4 bg-gradient-to-r from-purple-primary to-purple-secondary text-white rounded-xl font-semibold hover:from-purple-dark hover:to-purple-primary transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center space-x-2"
        >
          <ApperIcon name="ArrowRight" size={20} />
          <span>{emptyContent.actionText}</span>
        </button>
      )}
      
      <div className="mt-8 flex items-center space-x-6 text-sm text-gray-500">
        <div className="flex items-center space-x-2">
          <ApperIcon name="Eye" size={16} className="text-purple-primary" />
          <span>AI-Powered Recognition</span>
        </div>
        <div className="flex items-center space-x-2">
          <ApperIcon name="Zap" size={16} className="text-amber-primary" />
          <span>Instant Shopping</span>
        </div>
        <div className="flex items-center space-x-2">
          <ApperIcon name="Shield" size={16} className="text-green-500" />
          <span>Secure Checkout</span>
        </div>
      </div>
    </div>
  );
};

export default Empty;