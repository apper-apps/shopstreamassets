import videosData from "@/services/mockData/videos.json";

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const getVideos = async () => {
  await delay(300);
  // Enhance videos with brand analysis metadata
  return videosData.map(video => ({
    ...video,
    brandAnalysisComplete: true,
    detectedBrands: [...new Set(video.products.map(p => p.brand))].length,
    avgBrandConfidence: video.products.length > 0 
      ? (video.products.reduce((sum, p) => sum + (p.brandConfidence || 0), 0) / video.products.length).toFixed(1)
      : 0
  }));
};

export const getVideoById = async (Id) => {
  await delay(200);
  const video = videosData.find(v => v.Id === parseInt(Id));
  if (!video) {
    throw new Error("Video not found");
  }
  
  // Simulate brand analysis enhancement
  const enhancedVideo = {
    ...video,
    brandAnalysisComplete: true,
    detectedBrands: [...new Set(video.products.map(p => p.brand))].length,
    avgBrandConfidence: video.products.length > 0 
      ? (video.products.reduce((sum, p) => sum + (p.brandConfidence || 0), 0) / video.products.length).toFixed(1)
      : 0
  };
  
  return enhancedVideo;
};

export const getVideosByCategory = async (category) => {
  await delay(300);
  return videosData.filter(video => 
    video.products.some(product => 
      product.category.toLowerCase() === category.toLowerCase()
    )
  );
};

export const searchVideos = async (query, filters = []) => {
  await delay(400);
  let results = [...videosData];
  
  if (query) {
    const searchTerm = query.toLowerCase();
    results = results.filter(video =>
      video.title.toLowerCase().includes(searchTerm) ||
      video.creatorName.toLowerCase().includes(searchTerm) ||
      video.products.some(product => 
        product.name.toLowerCase().includes(searchTerm) ||
        product.brand?.toLowerCase().includes(searchTerm) ||
        product.retailer.toLowerCase().includes(searchTerm)
      )
    );
  }
  
  if (filters.length > 0) {
    results = results.filter(video =>
      video.products.some(product =>
        filters.includes(product.category) ||
        filters.includes(product.brand)
      )
    );
  }
  
  // Add brand analysis metadata to results
  return results.map(video => ({
    ...video,
    brandAnalysisComplete: true,
    detectedBrands: [...new Set(video.products.map(p => p.brand))].length,
    avgBrandConfidence: video.products.length > 0 
      ? (video.products.reduce((sum, p) => sum + (p.brandConfidence || 0), 0) / video.products.length).toFixed(1)
      : 0
  }));
};

export const getTrendingVideos = async () => {
  await delay(300);
  // Sort by views (mock trending logic)
  return [...videosData].sort((a, b) => {
    const viewsA = parseFloat(a.views.replace(/[MK\s,views]/g, ""));
    const viewsB = parseFloat(b.views.replace(/[MK\s,views]/g, ""));
    return viewsB - viewsA;
  });
};