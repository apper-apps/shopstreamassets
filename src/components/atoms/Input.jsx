import React from "react";
import { cn } from "@/utils/cn";

const Input = React.forwardRef(({ 
  className,
  type = "text",
  label,
  error,
  helper,
  ...props 
}, ref) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2 font-body">
          {label}
        </label>
      )}
      <input
        type={type}
        className={cn(
          "flex h-11 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-body placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-primary focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200",
          error && "border-red-300 focus:ring-red-500",
          className
        )}
        ref={ref}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-600 font-body">{error}</p>
      )}
      {helper && !error && (
        <p className="mt-1 text-sm text-gray-500 font-body">{helper}</p>
      )}
    </div>
  );
});

Input.displayName = "Input";

export default Input;