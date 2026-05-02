"use client";

import React from "react";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { DEPARTMENT_COLORS, STATUS_COLORS, calcTenure, formatSalary, formatDate } from "@/lib/utils";
import { Pencil, Trash2, MapPin, Calendar, Briefcase, Eye } from "lucide-react";

export function EmployeeRow({ employee, onView, onEdit, onDelete }) {
  return (
    <tr className="group border-b border-slate-100 hover:bg-linear-to-r hover:from-primary-50/30 hover:to-secondary-50/30 transition-all duration-200">
      <td className="px-4 py-3.5">
        <button
          onClick={() => onView(employee)}
          className="flex items-center gap-3 text-left w-full hover:opacity-80 transition-opacity duration-150"
        >
          <Avatar name={employee.name} size="md" />
          <div className="min-w-0">
            <p className="font-medium text-slate-900 truncate hover:underline underline-offset-2 hover:text-primary-600 transition-colors duration-150">
              {employee.name}
            </p>
            <p className="text-xs text-slate-500 truncate">{employee.email}</p>
          </div>
        </button>
      </td>

      <td className="px-4 py-3.5 hidden md:table-cell">
        <p className="text-sm text-slate-900 font-medium">{employee.role}</p>
        <Badge className={DEPARTMENT_COLORS[employee.department]}>{employee.department}</Badge>
      </td>

      <td className="px-4 py-3.5 hidden sm:table-cell">
        <Badge className={STATUS_COLORS[employee.status]}>{employee.status}</Badge>
      </td>

      <td className="px-4 py-3.5 hidden lg:table-cell">
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-xs text-slate-600">
            <Briefcase className="h-3 w-3 shrink-0" />
            <span>{employee.overallExperience}y total exp</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-slate-600">
            <Calendar className="h-3 w-3 shrink-0" />
            <span>{calcTenure(employee.joinDate, employee.endDate)} here</span>
          </div>
        </div>
      </td>

      <td className="px-4 py-3.5 hidden xl:table-cell">
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-xs text-slate-600">
            <MapPin className="h-3 w-3 shrink-0" />
            <span>{employee.location}</span>
          </div>
          <p className="text-xs text-slate-500">Joined {formatDate(employee.joinDate)}</p>
        </div>
      </td>

      <td className="px-4 py-3.5 hidden lg:table-cell">
        <p className="text-sm font-medium text-slate-900">{formatSalary(employee.salary)}</p>
        <p className="text-xs text-slate-500">/ year</p>
      </td>

      <td className="px-4 py-3.5">
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" onClick={() => onView(employee)} className={"hover:bg-cyan-50"} title="View employee">
            <Eye className="h-4 w-4 text-cyan-400" />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => onEdit(employee)} className={"hover:bg-blue-50"} title="Edit employee">
            <Pencil className="h-4 w-4 text-blue-400" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDelete(employee)}
            title="Delete employee"
            className="text-red-600 hover:text-red-600 hover:bg-red-50"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </td>
    </tr>
  );
}
