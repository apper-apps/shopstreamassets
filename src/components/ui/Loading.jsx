import React from "react";

const Loading = ({ type = "video" }) => {
  if (type === "video") {
    return (
      <div className="relative w-full h-[400px] bg-gray-100 rounded-xl overflow-hidden">
        <div className="shimmer w-full h-full"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 flex items-center space-x-3">
            <div className="w-6 h-6 border-2 border-purple-primary border-t-transparent rounded-full animate-spin"></div>
            <span className="text-gray-700 font-medium">Analyzing video content...</span>
          </div>
        </div>
        
        {/* Simulated hotspot placeholders */}
        <div className="absolute top-1/4 left-1/3 w-6 h-6 bg-gray-300 rounded-full animate-pulse"></div>
        <div className="absolute top-2/3 right-1/4 w-6 h-6 bg-gray-300 rounded-full animate-pulse"></div>
        <div className="absolute bottom-1/3 left-1/2 w-6 h-6 bg-gray-300 rounded-full animate-pulse"></div>
      </div>
    );
  }

  if (type === "products") {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(8)].map((_, index) => (
          <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="shimmer w-full h-48"></div>
            <div className="p-4 space-y-3">
              <div className="shimmer h-4 w-3/4 rounded"></div>
              <div className="shimmer h-3 w-1/2 rounded"></div>
              <div className="shimmer h-6 w-1/3 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (type === "dashboard") {
    return (
      <div className="space-y-6">
        {/* Stats cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg p-6">
              <div className="shimmer h-8 w-8 rounded mb-4"></div>
              <div className="shimmer h-6 w-16 rounded mb-2"></div>
              <div className="shimmer h-4 w-24 rounded"></div>
            </div>
          ))}
        </div>
        
        {/* Chart placeholder */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="shimmer h-6 w-32 rounded mb-6"></div>
          <div className="shimmer h-64 w-full rounded"></div>
        </div>
        
        {/* Table placeholder */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="shimmer h-6 w-40 rounded mb-6"></div>
          <div className="space-y-4">
            {[...Array(5)].map((_, index) => (
              <div key={index} className="flex items-center space-x-4">
                <div className="shimmer h-12 w-12 rounded"></div>
                <div className="flex-1 space-y-2">
                  <div className="shimmer h-4 w-3/4 rounded"></div>
                  <div className="shimmer h-3 w-1/2 rounded"></div>
                </div>
                <div className="shimmer h-4 w-16 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center p-8">
      <div className="w-8 h-8 border-2 border-purple-primary border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
};

export default Loading;