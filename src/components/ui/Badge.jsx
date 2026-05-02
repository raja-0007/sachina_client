import React from "react";
import { cn } from "@/lib/utils";

export function Badge({ children, className, variant = "default" }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium shadow-sm",
        variant === "outline" && "border",
        className
      )}
    >
      {children}
    </span>
  );
}
