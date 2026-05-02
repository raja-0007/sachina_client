"use client";

import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { Button } from "./Button";

const sizes = {
  sm: "max-w-sm",
  md: "max-w-lg",
  lg: "max-w-2xl",
  xl: "max-w-3xl",
};

export function Modal({ open, onClose, title, description, children, size = "md", className }) {
  const overlayRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const handleKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div ref={overlayRef} className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" onClick={onClose} />
      <div
        className={cn(
          "relative z-10 w-full rounded-2xl bg-white shadow-2xl overflow-hidden border border-slate-200/60",
          "animate-in fade-in-0 zoom-in-95 duration-200",
          sizes[size],
          className
        )}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? "modal-title" : undefined}
      >
        {(title || description) && (
          <div className="flex items-start justify-between border-b border-slate-100 px-6 py-4 bg-linear-to-r from-slate-50 to-primary-50/30">
            <div>
              {title && (
                <h2 id="modal-title" className="text-lg font-semibold text-slate-900">
                  {title}
                </h2>
              )}
              {description && (
                <p className="mt-0.5 text-sm text-slate-500">{description}</p>
              )}
            </div>
            <Button variant="ghost" size="icon" onClick={onClose} className="ml-4 shrink-0 -mr-1 -mt-0.5" aria-label="Close">
              <X className="h-4 w-4" />
            </Button>
          </div>
        )}
        <div className="overflow-y-auto max-h-[80vh]">{children}</div>
      </div>
    </div>
  );
}
