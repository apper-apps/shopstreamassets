import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Layout from "@/components/organisms/Layout";
import HomePage from "@/components/pages/HomePage";
import CreatorPage from "@/components/pages/CreatorPage";
import ShoppingCart from "@/components/organisms/ShoppingCart";
import { useCart } from "@/hooks/useCart";
import { toast } from "react-toastify";

function App() {
  const [cartOpen, setCartOpen] = useState(false);
  const {
    cartItems,
    totalItems,
    addToCart,
    updateQuantity,
    removeItem,
    saveForLater,
    checkout
  } = useCart();

  const handleAddToCart = async (product) => {
    const success = await addToCart(product);
    if (success) {
      toast.success(`${product.name} added to cart!`, {
        icon: "🛒"
      });
    }
  };

  const handleSaveForLater = async (product) => {
    const success = await saveForLater(product);
    if (success) {
      toast.success(`${product.name} saved for later!`, {
        icon: "❤️"
      });
    }
  };

  const handleBuyNow = async (product) => {
    // Add to cart first
    const success = await addToCart(product, product.quantity || 1);
    if (success) {
      // Open cart for immediate checkout
      setCartOpen(true);
      toast.success("Ready for checkout!", {
        icon: "⚡"
      });
    }
  };

  const handleCheckout = async () => {
    const result = await checkout("card", {
      address: "123 Main St",
      city: "Anytown",
      zipCode: "12345"
    });
    
    if (result) {
      setCartOpen(false);
      toast.success(`Order placed! Tracking: ${result.trackingNumber}`, {
        icon: "✅"
      });
    }
  };

  return (
    <>
      <Layout
        cartItemCount={totalItems}
        onOpenCart={() => setCartOpen(true)}
      >
        <Routes>
          <Route 
            path="/" 
            element={
              <HomePage
                onAddToCart={handleAddToCart}
                onSaveForLater={handleSaveForLater}
                onBuyNow={handleBuyNow}
              />
            } 
          />
          <Route path="/creator" element={<CreatorPage />} />
          <Route 
            path="/trending" 
            element={
              <HomePage
                onAddToCart={handleAddToCart}
                onSaveForLater={handleSaveForLater}
                onBuyNow={handleBuyNow}
              />
            } 
          />
          <Route 
            path="/categories" 
            element={
              <HomePage
                onAddToCart={handleAddToCart}
                onSaveForLater={handleSaveForLater}
                onBuyNow={handleBuyNow}
              />
            } 
          />
          <Route 
            path="/saved" 
            element={
              <HomePage
                onAddToCart={handleAddToCart}
                onSaveForLater={handleSaveForLater}
                onBuyNow={handleBuyNow}
              />
            } 
          />
        </Routes>
      </Layout>

      {/* Shopping Cart Sidebar */}
      <ShoppingCart
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeItem}
        onSaveForLater={handleSaveForLater}
        onCheckout={handleCheckout}
      />

      {/* Toast Notifications */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        style={{ zIndex: 9999 }}
      />
    </>
  );
}

export default App;