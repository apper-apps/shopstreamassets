import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";
import ApperIcon from "@/components/ApperIcon";

const ProductModal = ({ 
  product, 
  isOpen, 
  onClose, 
  onAddToCart,
  onSaveForLater,
  onBuyNow 
}) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  // Mock additional images
  const images = [
    product?.imageUrl,
    "/api/placeholder/400/400",
    "/api/placeholder/400/400",
    "/api/placeholder/400/400"
  ].filter(Boolean);

  if (!isOpen || !product) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 modal-backdrop"
            onClick={handleBackdropClick}
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-all duration-200"
            >
              <ApperIcon name="X" size={20} className="text-gray-600" />
            </button>

            <div className="flex flex-col lg:flex-row h-full">
              {/* Image Section */}
              <div className="lg:w-1/2 p-6">
                <div className="space-y-4">
                  {/* Main Image */}
                  <div className="aspect-square bg-gray-100 rounded-xl overflow-hidden">
                    <img
                      src={images[selectedImage]}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* Thumbnail Images */}
                  <div className="flex space-x-2">
                    {images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                          selectedImage === index 
                            ? "border-purple-primary" 
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <img
                          src={image}
                          alt={`${product.name} ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Product Info Section */}
              <div className="lg:w-1/2 p-6 lg:border-l border-gray-200 overflow-y-auto">
                <div className="space-y-6">
                  {/* Header */}
                  <div>
                    <div className="flex items-center space-x-2 mb-3">
                      <Badge variant="primary">{product.category}</Badge>
                      <Badge variant={product.inStock ? "success" : "danger"}>
                        {product.inStock ? "In Stock" : "Out of Stock"}
                      </Badge>
                    </div>
                    
                    <h1 className="text-2xl font-bold text-gray-900 font-display mb-2">
                      {product.name}
                    </h1>
                    
                    <p className="text-gray-600 font-body">{product.retailer}</p>
                  </div>

                  {/* Price */}
                  <div className="flex items-center space-x-4">
                    <span className="text-3xl font-bold gradient-text font-display">
                      ${product.price}
                    </span>
                    <span className="text-lg text-gray-500 line-through">
                      ${(product.price * 1.2).toFixed(2)}
                    </span>
                    <Badge variant="warning">20% OFF</Badge>
                  </div>

                  {/* Description */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2 font-display">Description</h3>
                    <p className="text-gray-600 font-body leading-relaxed">
                      This is a high-quality {product.name.toLowerCase()} that offers excellent 
                      value and performance. Perfect for your needs with premium materials and 
                      modern design aesthetics.
                    </p>
                  </div>

                  {/* Features */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3 font-display">Features</h3>
                    <ul className="space-y-2">
                      {[
                        "Premium quality materials",
                        "Modern design aesthetic",
                        "Excellent value for money",
                        "Fast shipping available"
                      ].map((feature, index) => (
                        <li key={index} className="flex items-center space-x-2 font-body">
                          <ApperIcon name="Check" size={16} className="text-green-500" />
                          <span className="text-gray-600">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Quantity Selector */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3 font-display">Quantity</h3>
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
                      >
                        <ApperIcon name="Minus" size={16} />
                      </button>
                      <span className="w-16 text-center font-semibold">{quantity}</span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
                      >
                        <ApperIcon name="Plus" size={16} />
                      </button>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-3">
                    <Button
                      variant="primary"
                      size="lg"
                      className="w-full"
                      onClick={() => onBuyNow({ ...product, quantity })}
                      disabled={!product.inStock}
                    >
                      <ApperIcon name="Zap" size={20} className="mr-2" />
                      Buy Now - ${(product.price * quantity).toFixed(2)}
                    </Button>
                    
                    <div className="flex space-x-3">
                      <Button
                        variant="secondary"
                        size="lg"
                        className="flex-1"
                        onClick={() => onAddToCart({ ...product, quantity })}
                        disabled={!product.inStock}
                      >
                        <ApperIcon name="ShoppingCart" size={20} className="mr-2" />
                        Add to Cart
                      </Button>
                      
                      <Button
                        variant="outline"
                        size="lg"
                        onClick={() => onSaveForLater(product)}
                      >
                        <ApperIcon name="Heart" size={20} />
                      </Button>
                    </div>
                  </div>

                  {/* Shipping Info */}
                  <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-4 border border-green-100">
                    <div className="flex items-center space-x-3">
                      <ApperIcon name="Truck" size={20} className="text-green-600" />
                      <div>
                        <p className="font-semibold text-green-800 font-display">Free Shipping</p>
                        <p className="text-sm text-green-600 font-body">Estimated delivery: 2-3 business days</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ProductModal;