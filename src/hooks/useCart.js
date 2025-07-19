import { useState, useEffect } from "react";
import * as cartService from "@/services/api/cartService";
import { toast } from "react-toastify";

export const useCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [savedItems, setSavedItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load initial data
  useEffect(() => {
    loadCartData();
  }, []);

  const loadCartData = async () => {
    try {
      const [cart, saved] = await Promise.all([
        cartService.getCartItems(),
        cartService.getSavedItems()
      ]);
      setCartItems(cart);
      setSavedItems(saved);
    } catch (error) {
      console.error("Error loading cart data:", error);
      toast.error("Failed to load cart data");
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (product, quantity = 1) => {
    try {
      const updatedCart = await cartService.addToCart(product, quantity);
      setCartItems(updatedCart);
      return true;
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("Failed to add item to cart");
      return false;
    }
  };

  const updateQuantity = async (productId, newQuantity) => {
    try {
      const updatedCart = await cartService.updateCartItemQuantity(productId, newQuantity);
      setCartItems(updatedCart);
      return true;
    } catch (error) {
      console.error("Error updating quantity:", error);
      toast.error("Failed to update item quantity");
      return false;
    }
  };

  const removeItem = async (productId) => {
    try {
      const updatedCart = await cartService.removeFromCart(productId);
      setCartItems(updatedCart);
      toast.success("Item removed from cart");
      return true;
    } catch (error) {
      console.error("Error removing item:", error);
      toast.error("Failed to remove item");
      return false;
    }
  };

  const saveForLater = async (product) => {
    try {
      const updatedSaved = await cartService.saveForLater(product);
      setSavedItems(updatedSaved);
      
      // Also remove from cart if it's there
      const updatedCart = await cartService.removeFromCart(product.Id);
      setCartItems(updatedCart);
      
      return true;
    } catch (error) {
      console.error("Error saving for later:", error);
      toast.error("Failed to save item");
      return false;
    }
  };

  const moveToCart = async (product, quantity = 1) => {
    try {
      const result = await cartService.moveToCart(product, quantity);
      setCartItems(result.cart);
      setSavedItems(result.saved);
      toast.success("Item moved to cart");
      return true;
    } catch (error) {
      console.error("Error moving to cart:", error);
      toast.error("Failed to move item to cart");
      return false;
    }
  };

  const clearCart = async () => {
    try {
      await cartService.clearCart();
      setCartItems([]);
      toast.success("Cart cleared");
      return true;
    } catch (error) {
      console.error("Error clearing cart:", error);
      toast.error("Failed to clear cart");
      return false;
    }
  };

  const checkout = async (paymentMethod, shippingInfo) => {
    try {
      const result = await cartService.checkout(cartItems, paymentMethod, shippingInfo);
      if (result.success) {
        setCartItems([]);
        toast.success(`Order ${result.orderId} placed successfully!`);
        return result;
      }
      throw new Error("Checkout failed");
    } catch (error) {
      console.error("Error during checkout:", error);
      toast.error("Failed to complete checkout");
      return null;
    }
  };

  // Computed values
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return {
    cartItems,
    savedItems,
    loading,
    totalItems,
    totalPrice,
    addToCart,
    updateQuantity,
    removeItem,
    saveForLater,
    moveToCart,
    clearCart,
    checkout,
    refresh: loadCartData
  };
};