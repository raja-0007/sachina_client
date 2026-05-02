import React from "react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

const variants = {
  primary:
    "bg-linear-to-r from-primary-500 to-primary-600 text-white hover:from-primary-600 hover:to-primary-700 active:from-primary-700 active:to-primary-800 shadow-lg shadow-primary hover:shadow-primary-lg",
  secondary:
    "bg-slate-100 text-slate-800 hover:bg-slate-200 active:bg-slate-300 shadow-sm hover:shadow-md",
  danger:
    "bg-linear-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 active:from-red-700 active:to-red-800 shadow-lg shadow-danger hover:shadow-danger-lg",
  ghost:
    "text-slate-600 hover:bg-slate-100 hover:text-slate-900 active:bg-slate-200",
  outline:
    "border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 hover:border-slate-400 active:bg-slate-100 shadow-sm hover:shadow-md",
};

const sizes = {
  sm: "h-8 px-3 text-xs gap-1.5 rounded-lg",
  md: "h-10 px-4 text-sm gap-2 rounded-xl",
  lg: "h-12 px-6 text-base gap-2.5 rounded-xl",
  icon: "h-9 w-9 rounded-xl",
};

export const Button = React.forwardRef(function Button(
  { className, variant = "primary", size = "md", loading = false, leftIcon, rightIcon, disabled, children, ...props },
  ref
) {
  return (
    <button
      ref={ref}
      disabled={disabled || loading}
      className={cn(
        "inline-flex items-center justify-center font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 select-none",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : leftIcon}
      {children && <span>{children}</span>}
      {!loading && rightIcon}
    </button>
  );
});
