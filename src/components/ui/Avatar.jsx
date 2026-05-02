import React from "react";
import { cn, getInitials, getAvatarColor } from "@/lib/utils";

const sizes = {
  sm: "h-8 w-8 text-xs",
  md: "h-10 w-10 text-sm",
  lg: "h-12 w-12 text-base",
  xl: "h-16 w-16 text-xl",
};

export function Avatar({ name, size = "md", className }) {
  const initials = getInitials(name);
  const color = getAvatarColor(name);
  return (
    <div
      className={cn(
        "flex items-center justify-center rounded-full font-semibold text-white shrink-0 select-none shadow-md",
        color,
        sizes[size],
        className
      )}
      aria-label={name}
    >
      {initials}
    </div>
  );
}
