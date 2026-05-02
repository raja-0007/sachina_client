"use client";

import React, { createContext, useCallback, useContext, useState } from "react";
import { cn } from "@/lib/utils";
import { CheckCircle2, XCircle, AlertCircle, X } from "lucide-react";

const ToastContext = createContext(null);

const icons = {
  success: <CheckCircle2 className="h-5 w-5 text-emerald-500" />,
  error: <XCircle className="h-5 w-5 text-red-500" />,
  info: <AlertCircle className="h-5 w-5 text-blue-500" />,
};

const styles = {
  success: "border-l-4 border-emerald-500",
  error: "border-l-4 border-red-500",
  info: "border-l-4 border-blue-500",
};

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const dismiss = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toast = useCallback((opts) => {
    const id = Math.random().toString(36).slice(2);
    setToasts((prev) => [...prev.slice(-3), { ...opts, id }]);
    setTimeout(() => dismiss(id), 4000);
  }, [dismiss]);

  const success = useCallback((title, message) => toast({ type: "success", title, message }), [toast]);
  const error = useCallback((title, message) => toast({ type: "error", title, message }), [toast]);
  const info = useCallback((title, message) => toast({ type: "info", title, message }), [toast]);

  return (
    <ToastContext.Provider value={{ toast, success, error, info }}>
      {children}
      <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2 w-80">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={cn(
              "flex items-start gap-3 rounded-xl bg-white/95 backdrop-blur-sm px-4 py-3 shadow-xl border border-slate-200/60",
              "animate-in slide-in-from-right-full duration-300",
              styles[t.type]
            )}
          >
            <div className="mt-0.5 shrink-0">{icons[t.type]}</div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-slate-900">{t.title}</p>
              {t.message && (
                <p className="mt-0.5 text-xs text-slate-600">{t.message}</p>
              )}
            </div>
            <button
              onClick={() => dismiss(t.id)}
              className="shrink-0 text-slate-400 hover:text-slate-600 transition-colors duration-150"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}
