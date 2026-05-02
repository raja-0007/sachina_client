"use client";

import React from "react";
import { Modal } from "@/components/ui/Modal";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  DEPARTMENT_COLORS, STATUS_COLORS,
  formatDate, formatSalary, calcTenure,
} from "@/lib/utils";
import {
  Mail, Phone, MapPin, Calendar, Briefcase,
  Building2, DollarSign, User, Pencil, X,
} from "lucide-react";

function DetailRow({ icon, label, value }) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-linear-to-br from-slate-100 to-slate-200 text-slate-600 shadow-sm">
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-xs text-slate-500 font-medium">{label}</p>
        <p className="text-sm font-medium text-slate-900 break-words">{value || "—"}</p>
      </div>
    </div>
  );
}

export function EmployeeDetail({ employee, open, onClose, onEdit }) {
  if (!employee) return null;

  return (
    <Modal open={open} onClose={onClose} size="lg">
      <div className="p-6 space-y-6">
        <div className="flex items-start gap-4">
          <Avatar name={employee.name} size="xl" />
          <div className="flex-1 min-w-0">
            <h2 className="text-xl font-bold text-slate-900">{employee.name}</h2>
            <p className="text-sm text-slate-600 mt-0.5">{employee.role}</p>
            <div className="flex flex-wrap gap-2 mt-2">
              <Badge className={DEPARTMENT_COLORS[employee.department]}>{employee.department}</Badge>
              <Badge className={STATUS_COLORS[employee.status]}>{employee.status}</Badge>
            </div>
          </div>
          <div className="flex gap-1 shrink-0">
            <Button variant="outline" size="sm" leftIcon={<Pencil className="h-3.5 w-3.5" />} onClick={() => { onClose(); onEdit(employee); }}>
              Edit
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="hover:text-slate-900 hover:bg-slate-100"
              title="Close"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="h-px bg-linear-to-r from-transparent via-slate-200 to-transparent" />

        {employee.about && (
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-2">About</p>
            <p className="text-sm text-slate-700 leading-relaxed">{employee.about}</p>
          </div>
        )}

        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-4">Contact & Personal</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <DetailRow icon={<Mail className="h-4 w-4" />} label="Email" value={employee.email} />
            <DetailRow icon={<Phone className="h-4 w-4" />} label="Phone" value={employee.phone} />
            <DetailRow icon={<User className="h-4 w-4" />} label="Date of Birth" value={`${formatDate(employee.dob)} (Age ${employee.age})`} />
            <DetailRow icon={<MapPin className="h-4 w-4" />} label="Location" value={employee.location} />
          </div>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-4">Work Details</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <DetailRow icon={<Building2 className="h-4 w-4" />} label="Department" value={employee.department} />
            <DetailRow icon={<Briefcase className="h-4 w-4" />} label="Overall Experience" value={`${employee.overallExperience} year${employee.overallExperience !== 1 ? "s" : ""}`} />
            <DetailRow icon={<Calendar className="h-4 w-4" />} label="Joined" value={`${formatDate(employee.joinDate)} · ${calcTenure(employee.joinDate, employee.endDate)} tenure`} />
            <DetailRow icon={<DollarSign className="h-4 w-4" />} label="Annual Salary" value={formatSalary(employee.salary)} />
            {employee.endDate && (
              <DetailRow icon={<Calendar className="h-4 w-4" />} label="End Date" value={formatDate(employee.endDate)} />
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
}
