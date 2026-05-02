import React from "react";
import { cn } from "@/lib/utils";

export const Textarea = React.forwardRef(function Textarea(
  { className, wrapperClassName, label, error, hint, id, required, ...props },
  ref
) {
  const generatedId = React.useId();
  const inputId = id ?? generatedId;
  return (
    <div className={cn("flex flex-col gap-1.5", wrapperClassName)}>
      {label && (
        <label htmlFor={inputId} className="text-sm font-medium text-slate-900">
          {label}
          {required && <span className="ml-1 text-red-500">*</span>}
        </label>
      )}
      <textarea
        id={inputId}
        ref={ref}
        rows={3}
        required={required}
        className={cn(
          "w-full resize-none rounded-xl border bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none ring-offset-white transition-all duration-200 placeholder:text-slate-400 shadow-sm",
          "border-slate-200 hover:border-primary-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-200",
          "disabled:cursor-not-allowed disabled:opacity-50",
          error && "border-red-400 focus:border-red-500 focus:ring-red-200",
          className
        )}
        {...props}
      />
      {error && <p className="text-xs text-red-500">{error}</p>}
      {hint && !error && <p className="text-xs text-slate-500">{hint}</p>}
    </div>
  );
});
