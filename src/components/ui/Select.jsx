import React from "react";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

export const Select = React.forwardRef(function Select(
  { className, wrapperClassName, label, error, hint, options, placeholder, id, required, ...props },
  ref
) {
  const generatedId = React.useId();
  const selectId = id ?? generatedId;
  return (
    <div className={cn("flex flex-col gap-1.5", wrapperClassName)}>
      {label && (
        <label htmlFor={selectId} className="text-sm font-medium text-slate-900">
          {label}
          {required && <span className="ml-1 text-red-500">*</span>}
        </label>
      )}
      <div className="relative">
        <select
          id={selectId}
          ref={ref}
          required={required}
          className={cn(
            "w-full appearance-none rounded-xl border bg-white px-3.5 py-2.5 pr-9 text-sm text-slate-900 outline-none ring-offset-white transition-all duration-200 shadow-sm",
            "border-slate-200 hover:border-primary-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-200",
            "disabled:cursor-not-allowed disabled:opacity-50",
            error && "border-red-400 focus:border-red-500 focus:ring-red-200",
            className
          )}
          {...props}
        >
          {placeholder && <option value="" disabled>{placeholder}</option>}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
      </div>
      {error && <p className="text-xs text-red-500">{error}</p>}
      {hint && !error && <p className="text-xs text-slate-500">{hint}</p>}
    </div>
  );
});
