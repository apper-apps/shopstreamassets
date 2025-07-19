import React from "react";
import ApperIcon from "@/components/ApperIcon";

const Error = ({ 
  message = "Something went wrong. Please try again.", 
  onRetry = null,
  type = "general"
}) => {
  const getErrorContent = () => {
    switch (type) {
      case "network":
        return {
          icon: "WifiOff",
          title: "Connection Problem",
          description: "Unable to connect to our servers. Please check your internet connection."
        };
      case "video":
        return {
          icon: "VideoOff",
          title: "Video Analysis Failed",
          description: "We couldn't analyze this video content. This might be due to platform restrictions or content format."
        };
      case "payment":
        return {
          icon: "CreditCard",
          title: "Payment Error",
          description: "There was an issue processing your payment. Please try again or use a different payment method."
        };
      default:
        return {
          icon: "AlertTriangle",
          title: "Oops! Something went wrong",
          description: message
        };
    }
  };

  const errorContent = getErrorContent();

  return (
    <div className="flex flex-col items-center justify-center p-8 text-center bg-white rounded-xl shadow-lg">
      <div className="w-16 h-16 bg-gradient-to-br from-red-100 to-red-200 rounded-full flex items-center justify-center mb-6">
        <ApperIcon 
          name={errorContent.icon} 
          size={32} 
          className="text-red-600" 
        />
      </div>
      
      <h3 className="text-xl font-semibold text-gray-900 mb-2 font-display">
        {errorContent.title}
      </h3>
      
      <p className="text-gray-600 mb-6 max-w-md font-body">
        {errorContent.description}
      </p>
      
      <div className="flex flex-col sm:flex-row gap-3">
        {onRetry && (
          <button
            onClick={onRetry}
            className="px-6 py-3 bg-gradient-to-r from-purple-primary to-purple-secondary text-white rounded-lg font-medium hover:from-purple-dark hover:to-purple-primary transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <ApperIcon name="RefreshCw" size={16} className="inline mr-2" />
            Try Again
          </button>
        )}
        
        <button
          onClick={() => window.location.reload()}
          className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-all duration-200 border border-gray-200"
        >
          <ApperIcon name="RotateCcw" size={16} className="inline mr-2" />
          Refresh Page
        </button>
      </div>
      
      <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-100">
        <p className="text-sm text-gray-600 font-body">
          <ApperIcon name="Info" size={16} className="inline mr-1 text-blue-500" />
          If this problem persists, please contact our support team for assistance.
        </p>
      </div>
    </div>
  );
};

export default Error;