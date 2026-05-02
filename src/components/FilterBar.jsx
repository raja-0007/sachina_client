"use client";

import React, { useCallback } from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { DEPARTMENTS, STATUSES } from "@/lib/utils";

const departmentOptions = [
  { value: "All", label: "All Departments" },
  ...DEPARTMENTS.map((d) => ({ value: d, label: d })),
];

const statusOptions = [
  { value: "All", label: "All Statuses" },
  ...STATUSES.map((s) => ({ value: s, label: s })),
];

export function FilterBar({ filters, onChange }) {
  const set = useCallback(
    (key, value) => onChange({ ...filters, [key]: value }),
    [filters, onChange]
  );

  const hasActiveFilters = filters.department !== "All" || filters.status !== "All";

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-2">
        <div className="flex-1 min-w-96">
          <Input
            placeholder="Search by name, role, email..."
            value={filters.search}
            onChange={(e) => set("search", e.target.value)}
            leftElement={<Search className="h-4 w-4" />}
            rightElement={
              filters.search ? (
                <button onClick={() => set("search", "")} className="hover:text-slate-900 transition-colors duration-150">
                  <X className="h-4 w-4" />
                </button>
              ) : null
            }
          />
        </div>
        <Select
          options={departmentOptions}
          value={filters.department}
          onChange={(e) => set("department", e.target.value)}
          className="min-w-40"
        />
        <Select
          options={statusOptions}
          value={filters.status}
          onChange={(e) => set("status", e.target.value)}
          className="min-w-35"
        />
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onChange({ ...filters, department: "All", status: "All" })}
            title="Clear filters"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

    </div>
  );
}
