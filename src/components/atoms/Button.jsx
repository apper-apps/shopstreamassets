import React from "react";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";

const Button = React.forwardRef(({ 
  children, 
  variant = "primary", 
  size = "md", 
  icon = null,
  iconPosition = "left",
  loading = false,
  className,
  disabled,
  ...props 
}, ref) => {
  const baseStyles = "inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-95";
  
  const variants = {
    primary: "bg-gradient-to-r from-purple-primary to-purple-secondary text-white hover:from-purple-dark hover:to-purple-primary focus:ring-purple-primary shadow-lg hover:shadow-xl",
    secondary: "bg-white text-purple-primary border-2 border-purple-primary hover:bg-purple-primary hover:text-white focus:ring-purple-primary shadow-md hover:shadow-lg",
    outline: "border-2 border-gray-300 text-gray-700 hover:border-purple-primary hover:text-purple-primary focus:ring-purple-primary bg-white",
    ghost: "text-gray-700 hover:text-purple-primary hover:bg-purple-50 focus:ring-purple-primary",
    danger: "bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 focus:ring-red-500 shadow-lg hover:shadow-xl",
    success: "bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 focus:ring-green-500 shadow-lg hover:shadow-xl",
    warning: "bg-gradient-to-r from-amber-primary to-amber-dark text-white hover:from-amber-dark hover:to-amber-600 focus:ring-amber-primary shadow-lg hover:shadow-xl",
  };
  
  const sizes = {
    sm: "px-3 py-2 text-sm rounded-lg",
    md: "px-4 py-2.5 text-sm rounded-lg",
    lg: "px-6 py-3 text-base rounded-xl",
    xl: "px-8 py-4 text-lg rounded-xl",
  };

  return (
    <button
      ref={ref}
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        loading && "cursor-wait",
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <>
          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
          Loading...
        </>
      ) : (
        <>
          {icon && iconPosition === "left" && (
            <ApperIcon name={icon} size={16} className="mr-2" />
          )}
          {children}
          {icon && iconPosition === "right" && (
            <ApperIcon name={icon} size={16} className="ml-2" />
          )}
        </>
      )}
    </button>
  );
});

Button.displayName = "Button";

export default Button;