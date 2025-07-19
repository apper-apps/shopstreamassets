// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Local storage keys
const CART_STORAGE_KEY = "shopstream_cart";
const SAVED_ITEMS_STORAGE_KEY = "shopstream_saved";

// Helper functions for localStorage
const getFromStorage = (key) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : [];
  } catch (error) {
    console.error("Error reading from localStorage:", error);
    return [];
  }
};

const setToStorage = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error("Error writing to localStorage:", error);
  }
};

export const getCartItems = async () => {
  await delay(200);
  return getFromStorage(CART_STORAGE_KEY);
};

export const addToCart = async (product, quantity = 1) => {
  await delay(300);
  
  const cartItems = getFromStorage(CART_STORAGE_KEY);
  const existingItemIndex = cartItems.findIndex(item => item.Id === product.Id);
  
  if (existingItemIndex >= 0) {
    // Update quantity if item already exists
    cartItems[existingItemIndex].quantity += quantity;
  } else {
    // Add new item
    cartItems.push({
      ...product,
      quantity,
      addedAt: new Date().toISOString()
    });
  }
  
  setToStorage(CART_STORAGE_KEY, cartItems);
  return cartItems;
};

export const updateCartItemQuantity = async (productId, newQuantity) => {
  await delay(200);
  
  const cartItems = getFromStorage(CART_STORAGE_KEY);
  const updatedItems = cartItems.map(item => 
    item.Id === parseInt(productId) 
      ? { ...item, quantity: Math.max(0, newQuantity) }
      : item
  ).filter(item => item.quantity > 0); // Remove items with 0 quantity
  
  setToStorage(CART_STORAGE_KEY, updatedItems);
  return updatedItems;
};

export const removeFromCart = async (productId) => {
  await delay(200);
  
  const cartItems = getFromStorage(CART_STORAGE_KEY);
  const updatedItems = cartItems.filter(item => item.Id !== parseInt(productId));
  
  setToStorage(CART_STORAGE_KEY, updatedItems);
  return updatedItems;
};

export const clearCart = async () => {
  await delay(200);
  setToStorage(CART_STORAGE_KEY, []);
  return [];
};

export const getSavedItems = async () => {
  await delay(200);
  return getFromStorage(SAVED_ITEMS_STORAGE_KEY);
};

export const saveForLater = async (product) => {
  await delay(300);
  
  const savedItems = getFromStorage(SAVED_ITEMS_STORAGE_KEY);
  const existingItemIndex = savedItems.findIndex(item => item.Id === product.Id);
  
  if (existingItemIndex === -1) {
    savedItems.push({
      ...product,
      savedAt: new Date().toISOString()
    });
    setToStorage(SAVED_ITEMS_STORAGE_KEY, savedItems);
  }
  
  return savedItems;
};

export const removeFromSaved = async (productId) => {
  await delay(200);
  
  const savedItems = getFromStorage(SAVED_ITEMS_STORAGE_KEY);
  const updatedItems = savedItems.filter(item => item.Id !== parseInt(productId));
  
  setToStorage(SAVED_ITEMS_STORAGE_KEY, updatedItems);
  return updatedItems;
};

export const moveToCart = async (product, quantity = 1) => {
  await delay(300);
  
  // Add to cart
  await addToCart(product, quantity);
  
  // Remove from saved
  await removeFromSaved(product.Id);
  
  return {
    cart: getFromStorage(CART_STORAGE_KEY),
    saved: getFromStorage(SAVED_ITEMS_STORAGE_KEY)
  };
};

export const checkout = async (cartItems, paymentMethod, shippingInfo) => {
  await delay(1000); // Longer delay to simulate payment processing
  
  // Simulate checkout process
  const orderId = Date.now().toString();
  const orderTotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  // Clear cart after successful checkout
  await clearCart();
  
  return {
    success: true,
    orderId,
    total: orderTotal,
    estimatedDelivery: "2-3 business days",
    trackingNumber: `SS${orderId.slice(-6)}`
  };
};