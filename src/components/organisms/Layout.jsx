import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";

const Layout = ({ children, cartItemCount, onOpenCart }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: "Discover", href: "/", icon: "Home" },
    { name: "Trending", href: "/trending", icon: "TrendingUp" },
    { name: "Categories", href: "/categories", icon: "Grid3X3" },
    { name: "Creator Hub", href: "/creator", icon: "Users" },
    { name: "Saved", href: "/saved", icon: "Heart" },
  ];

  const isActive = (href) => {
    if (href === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(href);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-primary to-purple-secondary rounded-xl flex items-center justify-center">
                <ApperIcon name="ShoppingBag" size={24} className="text-white" />
              </div>
              <span className="text-2xl font-bold gradient-text font-display">
                ShopStream
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive(item.href)
                      ? "bg-purple-primary text-white shadow-lg"
                      : "text-gray-600 hover:text-purple-primary hover:bg-purple-50"
                  }`}
                >
                  <ApperIcon name={item.icon} size={18} />
                  <span>{item.name}</span>
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center space-x-3">
              {/* Search */}
              <button className="hidden md:flex w-10 h-10 items-center justify-center text-gray-400 hover:text-purple-primary transition-colors rounded-lg hover:bg-purple-50">
                <ApperIcon name="Search" size={20} />
              </button>

              {/* Notifications */}
              <button className="relative w-10 h-10 flex items-center justify-center text-gray-400 hover:text-purple-primary transition-colors rounded-lg hover:bg-purple-50">
                <ApperIcon name="Bell" size={20} />
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-xs text-white font-bold">3</span>
                </div>
              </button>

              {/* Cart */}
              <button
                onClick={onOpenCart}
                className="relative w-10 h-10 flex items-center justify-center text-gray-400 hover:text-purple-primary transition-colors rounded-lg hover:bg-purple-50"
              >
                <ApperIcon name="ShoppingCart" size={20} />
                {cartItemCount > 0 && (
                  <Badge
                    variant="primary"
                    size="sm"
                    className="absolute -top-2 -right-2 min-w-[20px] h-5 flex items-center justify-center bg-purple-primary text-white text-xs font-bold"
                  >
                    {cartItemCount}
                  </Badge>
                )}
              </button>

              {/* Mobile menu button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden w-10 h-10 flex items-center justify-center text-gray-400 hover:text-purple-primary transition-colors rounded-lg hover:bg-purple-50"
              >
                <ApperIcon name={mobileMenuOpen ? "X" : "Menu"} size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden border-t border-gray-200 bg-white overflow-hidden"
            >
              <div className="px-4 py-3 space-y-1">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActive(item.href)
                        ? "bg-purple-primary text-white shadow-lg"
                        : "text-gray-600 hover:text-purple-primary hover:bg-purple-50"
                    }`}
                  >
                    <ApperIcon name={item.icon} size={18} />
                    <span>{item.name}</span>
                  </Link>
                ))}
                
                {/* Mobile Search */}
                <button className="flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium text-gray-600 hover:text-purple-primary hover:bg-purple-50 w-full">
                  <ApperIcon name="Search" size={18} />
                  <span>Search</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Floating Action Button for Mobile */}
      <div className="lg:hidden fixed bottom-6 right-6 z-40">
        <Button
          onClick={onOpenCart}
          className="w-14 h-14 rounded-full shadow-2xl relative"
        >
          <ApperIcon name="ShoppingCart" size={24} />
          {cartItemCount > 0 && (
            <Badge
              variant="warning"
              size="sm"
              className="absolute -top-2 -right-2 min-w-[24px] h-6 flex items-center justify-center bg-amber-primary text-white text-xs font-bold"
            >
              {cartItemCount}
            </Badge>
          )}
        </Button>
      </div>

      {/* AI Status Indicator */}
      <div className="fixed bottom-6 left-6 z-30">
        <div className="bg-white/90 backdrop-blur-sm rounded-full shadow-lg px-4 py-2 flex items-center space-x-2 border border-gray-200">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-sm font-medium text-gray-700 font-body">AI Active</span>
        </div>
      </div>
    </div>
  );
};

export default Layout;