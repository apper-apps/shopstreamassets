import React from "react";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Badge from "@/components/atoms/Badge";
import Button from "@/components/atoms/Button";

const ProductCard = ({ 
  product, 
  onAddToCart, 
  onSaveForLater,
  onQuickView,
  compact = false 
}) => {
  if (compact) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg shadow-md p-3 hover:shadow-lg transition-all duration-200 border border-gray-100"
      >
        <div className="flex items-center space-x-3">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-16 h-16 object-cover rounded-lg"
          />
          <div className="flex-1 min-w-0">
            <h4 className="font-medium text-gray-900 font-display truncate">
              {product.name}
            </h4>
            <p className="text-sm text-gray-500 font-body">{product.retailer}</p>
            <div className="flex items-center justify-between mt-1">
              <span className="text-lg font-bold text-purple-primary font-display">
                ${product.price}
              </span>
              <Button
                size="sm"
                onClick={() => onAddToCart(product)}
                disabled={!product.inStock}
              >
                <ApperIcon name="Plus" size={14} />
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
    initial={{
        opacity: 0,
        scale: 0.95
    }}
    animate={{
        opacity: 1,
        scale: 1
    }}
    whileHover={{
        y: -4
    }}
    className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-100 group">
    <div className="relative overflow-hidden">
        <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" />
        {!product.inStock && <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <Badge variant="danger" size="sm">Out of Stock</Badge>
        </div>}
        <button
            onClick={() => onSaveForLater(product)}
            className="absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md hover:bg-white transition-all duration-200 group/heart">
            <ApperIcon
                name="Heart"
                size={16}
                className="text-gray-600 group-hover/heart:text-red-500 transition-colors duration-200" />
        </button>
        <div className="absolute top-3 left-3 flex flex-col space-y-1">
            <Badge variant="primary" size="sm">{product.category}</Badge>
            {product.brand && product.brandConfidence && <Badge
                variant={product.brandConfidence > 80 ? "success" : "secondary"}
                size="sm">
                <ApperIcon name="Award" size={10} className="mr-1" />
                {product.brand} {product.brandConfidence}%
                            </Badge>}
        </div>
        <div className="p-4">
            <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-gray-900 font-display line-clamp-2 flex-1">
                    {product.name}
                </h3>
            </div>
            <div className="flex items-center justify-between mb-3">
                <p className="text-sm text-gray-500 font-body">{product.retailer}</p>
                {product.brandConfidence && <div className="flex items-center space-x-1">
                    <ApperIcon name="CheckCircle" size={12} className="text-green-500" />
                    <span className="text-xs text-green-600 font-medium">{product.brandConfidence}%</span>
                </div>}
            </div>
            <div className="flex items-center justify-between">
                <span className="text-2xl font-bold gradient-text font-display">${product.price}
                </span>
                <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm" onClick={() => onQuickView(product)}>
                        <ApperIcon name="Eye" size={14} />
                    </Button>
                    <Button
                        size="sm"
                        onClick={() => onAddToCart(product)}
                        disabled={!product.inStock}>
                        <ApperIcon name="ShoppingCart" size={14} />
                    </Button>
                </div>
            </div>
        </div>
    </div></motion.div>
  );
};

export default ProductCard;