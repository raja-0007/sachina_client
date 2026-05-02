import React from "react";
import { cn } from "@/lib/utils";

let inputIdCounter = 0;

export const Input = React.forwardRef(function Input(
  { className, wrapperClassName, label, error, hint, leftElement, rightElement, id, required, ...props },
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
      <div className="relative flex items-center">
        {leftElement && (
          <div className="pointer-events-none absolute left-3 flex items-center text-slate-400">
            {leftElement}
          </div>
        )}
        <input
          id={inputId}
          ref={ref}
          required={required}
          className={cn(
            "w-full rounded-xl border bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none ring-offset-white transition-all duration-200 placeholder:text-slate-400 shadow-sm",
            "border-slate-200 hover:border-primary-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-200",
            "disabled:cursor-not-allowed disabled:opacity-50",
            error && "border-red-400 focus:border-red-500 focus:ring-red-200",
            leftElement && "pl-10",
            rightElement && "pr-10",
            className
          )}
          {...props}
        />
        {rightElement && (
          <div className="absolute right-3 flex items-center text-slate-400">
            {rightElement}
          </div>
        )}
      </div>
      {error && <p className="text-xs text-red-500">{error}</p>}
      {hint && !error && <p className="text-xs text-slate-500">{hint}</p>}
    </div>
  );
});
