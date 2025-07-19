import videosData from "@/services/mockData/videos.json";

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Extract all products from videos
const getAllProducts = () => {
  const products = [];
  videosData.forEach(video => {
    video.products.forEach(product => {
      products.push({
        ...product,
        videoId: video.Id,
        videoTitle: video.title
      });
    });
  });
  return products;
};

export const getProducts = async () => {
  await delay(300);
  return getAllProducts();
};

export const getProductById = async (Id) => {
  await delay(200);
  const products = getAllProducts();
  const product = products.find(p => p.Id === parseInt(Id));
  if (!product) {
    throw new Error("Product not found");
  }
  return { ...product };
};

export const getProductsByCategory = async (category) => {
  await delay(300);
  const products = getAllProducts();
  return products.filter(product => 
    product.category.toLowerCase() === category.toLowerCase()
  );
};

export const searchProducts = async (query) => {
  await delay(400);
  if (!query) return getAllProducts();
  
  const products = getAllProducts();
  const searchTerm = query.toLowerCase();
  
  return products.filter(product =>
    product.name.toLowerCase().includes(searchTerm) ||
    product.category.toLowerCase().includes(searchTerm) ||
    product.retailer.toLowerCase().includes(searchTerm)
  );
};

export const getProductsByVideo = async (videoId) => {
  await delay(200);
  const video = videosData.find(v => v.Id === parseInt(videoId));
  if (!video) {
    throw new Error("Video not found");
  }
  return [...video.products];
};

export const getFeaturedProducts = async () => {
  await delay(300);
  const products = getAllProducts();
  // Return random selection of products as "featured"
  const shuffled = [...products].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 8);
};