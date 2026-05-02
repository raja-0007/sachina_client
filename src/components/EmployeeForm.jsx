"use client";

import React, { useEffect, useState } from "react";
import { calcAge, DEPARTMENTS, STATUSES, ROLES, LOCATIONS } from "@/lib/utils";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import { Avatar } from "@/components/ui/Avatar";

const departmentOptions = DEPARTMENTS.map((d) => ({ value: d, label: d }));
const statusOptions = STATUSES.map((s) => ({ value: s, label: s }));
const locationOptions = LOCATIONS.map((l) => ({ value: l, label: l }));

function formatDateForInput(dateString) {
  if (!dateString) return "";
  try {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  } catch {
    return "";
  }
}

export function EmployeeForm({ initial = {}, onSubmit, onCancel, loading }) {
  const [form, setForm] = useState({
    name: "", email: "", phone: "", dob: "", age: 0,
    department: "Engineering", role: "", about: "",
    overallExperience: "", joinDate: "", status: "Active",
    salary: "", location: "Remote",
    ...initial,
    dob: formatDateForInput(initial.dob),
    joinDate: formatDateForInput(initial.joinDate),
    endDate: formatDateForInput(initial.endDate),
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (form.dob) setForm((prev) => ({ ...prev, age: calcAge(form.dob) }));
  }, [form.dob]);

  const roleOptions = form.department
    ? (ROLES[form.department] ?? []).map((r) => ({ value: r, label: r }))
    : [];

  const set = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => { const e = { ...prev }; delete e[field]; return e; });
  };

  const validate = () => {
    const e = {};
    if (!form.name?.trim()) e.name = "Name is required";
    if (!form.email?.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Invalid email address";
    if (!form.dob) e.dob = "Date of birth is required";
    if (!form.department) e.department = "Department is required";
    if (!form.role) e.role = "Role is required";
    if (!form.joinDate) e.joinDate = "Join date is required";
    if (!form.status) e.status = "Status is required";
    if (form.overallExperience === undefined || form.overallExperience === null || form.overallExperience === "") e.overallExperience = "Experience is required";
    if ((form.overallExperience ?? 0) < 0) e.overallExperience = "Must be 0 or more";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    
    // Convert empty strings to appropriate values before submitting
    const submitData = {
      ...form,
      overallExperience: form.overallExperience === "" ? 0 : form.overallExperience,
      salary: form.salary === "" ? undefined : form.salary,
    };
    
    await onSubmit(submitData);
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="p-6 space-y-6">
        {form.name && (
          <div className="flex items-center gap-4 p-4 rounded-xl bg-linear-to-r from-slate-50 to-primary-50/30 border border-slate-200/60 shadow-sm">
            <Avatar name={form.name} size="xl" />
            <div>
              <p className="font-semibold text-slate-900">{form.name}</p>
              <p className="text-sm text-slate-600">{form.role || "—"} · {form.department || "—"}</p>
            </div>
          </div>
        )}

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-4">Personal Information</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="Full Name" value={form.name ?? ""} onChange={(e) => set("name", e.target.value)} error={errors.name} required placeholder="e.g. Rahul Sharma" />
            <Input label="Email" type="email" value={form.email ?? ""} onChange={(e) => set("email", e.target.value)} error={errors.email} required placeholder="name@company.com" />
            <Input label="Phone" type="tel" value={form.phone ?? ""} onChange={(e) => set("phone", e.target.value)} placeholder="+1-555-000-0000" />
            <div className="grid grid-cols-2 gap-3">
              <Input label="Date of Birth" type="date" value={form.dob ?? ""} onChange={(e) => set("dob", e.target.value)} error={errors.dob} required max={new Date().toISOString().split("T")[0]} />
              <Input label="Age" type="number" value={form.age ?? ""} readOnly hint="Auto-calculated" className="bg-slate-50 cursor-not-allowed" />
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-4">Work Details</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Select label="Department" value={form.department ?? ""} onChange={(e) => { set("department", e.target.value); set("role", ""); }} options={departmentOptions} error={errors.department} required />
            <Select label="Role / Position" value={form.role ?? ""} onChange={(e) => set("role", e.target.value)} options={roleOptions} placeholder="Select role" error={errors.role} required disabled={!form.department} />
            <Select label="Status" value={form.status ?? "Active"} onChange={(e) => set("status", e.target.value)} options={statusOptions} error={errors.status} required />
            <Select label="Location" value={form.location ?? "Remote"} onChange={(e) => set("location", e.target.value)} options={locationOptions} />
            <Input label="Overall Experience (years)" type="number" value={form.overallExperience ?? ""} onChange={(e) => set("overallExperience", e.target.value === "" ? "" : parseInt(e.target.value, 10))} error={errors.overallExperience} required min={0} max={50} placeholder="e.g. 5" />
            <Input label="Annual Salary (USD)" type="number" value={form.salary ?? ""} onChange={(e) => set("salary", e.target.value === "" ? "" : parseInt(e.target.value, 10))} placeholder="e.g. 80000" min={0} />
            <Input label="Join Date" type="date" value={form.joinDate ?? ""} onChange={(e) => set("joinDate", e.target.value)} error={errors.joinDate} required max={new Date().toISOString().split("T")[0]} />
            {form.status === "Resigned" && (
              <Input label="End Date" type="date" value={form.endDate ?? ""} onChange={(e) => set("endDate", e.target.value)} max={new Date().toISOString().split("T")[0]} />
            )}
          </div>
        </div>

        <Textarea label="About" value={form.about ?? ""} onChange={(e) => set("about", e.target.value)} rows={3} placeholder="A brief description about the employee..." hint="Optional. Max 500 characters." maxLength={500} />
      </div>

      <div className="flex items-center justify-end gap-2 border-t border-slate-100 px-6 py-4 bg-linear-to-r from-slate-50/50 to-primary-50/20">
        <Button type="button" variant="outline" onClick={onCancel} disabled={loading}>Cancel</Button>
        <Button type="submit" variant="primary" loading={loading}>
          {initial.id ? "Save Changes" : "Add Employee"}
        </Button>
      </div>
    </form>
  );
}
