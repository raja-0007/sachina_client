"use client";

import React from "react";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const PAGE_SIZES = [5, 10, 20, 50];

export function Pagination({ page, totalPages, total, pageSize, onPageChange, onPageSizeChange }) {
  const from = total === 0 ? 0 : (page - 1) * pageSize + 1;
  const to = Math.min(page * pageSize, total);

  const getPages = () => {
    if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);
    const pages = [1];
    if (page > 3) pages.push("...");
    for (let i = Math.max(2, page - 1); i <= Math.min(totalPages - 1, page + 1); i++) pages.push(i);
    if (page < totalPages - 2) pages.push("...");
    pages.push(totalPages);
    return pages;
  };

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 px-4 py-3">
      <div className="flex items-center gap-2 text-sm text-slate-600">
        <span>{from}–{to} of {total} employees</span>
        <span className="text-slate-300">|</span>
        <span>Rows:</span>
        <select
          value={pageSize}
          onChange={(e) => { onPageSizeChange(Number(e.target.value)); onPageChange(1); }}
          className="rounded-lg border border-slate-200 bg-white px-2 py-1 text-sm text-slate-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-500"
        >
          {PAGE_SIZES.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      <div className="flex items-center gap-1">
        <Button variant="ghost" size="icon" onClick={() => onPageChange(1)} disabled={page === 1} title="First page">
          <ChevronsLeft className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" onClick={() => onPageChange(page - 1)} disabled={page === 1} title="Previous page">
          <ChevronLeft className="h-4 w-4" />
        </Button>

        {getPages().map((p, i) =>
          p === "..." ? (
            <span key={`ellipsis-${i}`} className="px-1 text-sm text-slate-400">…</span>
          ) : (
            <button
              key={p}
              onClick={() => onPageChange(p)}
              className={cn(
                "h-9 w-9 rounded-xl text-sm font-medium transition-all duration-200",
                page === p
                  ? "bg-linear-to-r from-primary-500 to-primary-600 text-white shadow-lg shadow-primary"
                  : "text-slate-600 hover:bg-slate-100 hover:shadow-sm"
              )}
            >
              {p}
            </button>
          )
        )}

        <Button variant="ghost" size="icon" onClick={() => onPageChange(page + 1)} disabled={page === totalPages} title="Next page">
          <ChevronRight className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" onClick={() => onPageChange(totalPages)} disabled={page === totalPages} title="Last page">
          <ChevronsRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
