import videosData from "@/services/mockData/videos.json";

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const getVideos = async () => {
  await delay(300);
  return [...videosData];
};

export const getVideoById = async (Id) => {
  await delay(200);
  const video = videosData.find(v => v.Id === parseInt(Id));
  if (!video) {
    throw new Error("Video not found");
  }
  return { ...video };
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
        product.name.toLowerCase().includes(searchTerm)
      )
    );
  }
  
  if (filters.length > 0) {
    results = results.filter(video =>
      video.products.some(product =>
        filters.includes(product.category)
      )
    );
  }
  
  return results;
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