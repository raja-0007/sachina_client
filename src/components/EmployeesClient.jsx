"use client";

import React, { useState, useTransition } from "react";
import { FilterBar } from "@/components/FilterBar";
import { EmployeeRow } from "@/components/EmployeeRow";
import { EmployeeDetail } from "@/components/EmployeeDetail";
import { Pagination } from "@/components/Pagination";
import { Modal } from "@/components/ui/Modal";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { EmployeeForm } from "@/components/EmployeeForm";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import { Loader2, Plus, Users } from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

const DEFAULT_FILTERS = {
  search: "",
  department: "All",
  status: "All",
};

export function EmployeesClient({
  employees,
  total,
  page,
  pageSize,
  totalPages,
  filters,
  loading,
  onFilterChange,
  onPageChange,
  onPageSizeChange,
  onDataChange,
}) {
  const toast = useToast();
  
  const [viewEmployee, setViewEmployee] = useState(null);
  const [addOpen, setAddOpen] = useState(false);
  const [editEmployee, setEditEmployee] = useState(null);
  const [deleteEmployee, setDeleteEmployee] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [, startTransition] = useTransition();

  const handleAdd = async (data) => {
    setSubmitting(true);
    try {
      const res = await fetch(`${API_URL}/employees`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed to add employee");
      setAddOpen(false);
      toast.success("Employee added", `${data.name} has been added to the team.`);
      startTransition(() => onDataChange());
    } catch (e) {
      toast.error("Failed to add employee", e.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = async (data) => {
    if (!editEmployee) return;
    setSubmitting(true);
    try {
      const res = await fetch(`${API_URL}/employees/${editEmployee._id || editEmployee.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed to update employee");
      setEditEmployee(null);
      toast.success("Employee updated", `${data.name}'s details have been saved.`);
      startTransition(() => onDataChange());
    } catch (e) {
      toast.error("Failed to update employee", e.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteEmployee) return;
    setDeleting(true);
    try {
      const res = await fetch(`${API_URL}/employees/${deleteEmployee._id || deleteEmployee.id}`, { 
        method: "DELETE" 
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed to delete employee");
      setDeleteEmployee(null);
      toast.success("Employee removed", `${deleteEmployee.name} has been removed.`);
      startTransition(() => onDataChange());
    } catch (e) {
      toast.error("Failed to delete employee", e.message);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-2">
        <FilterBar filters={filters} onChange={onFilterChange} />
        <Button variant="primary" size="md" leftIcon={<Plus className="h-4 w-4" />} onClick={() => setAddOpen(true)} className="shrink-0">
          Add Employee
        </Button>
      </div>

      <div className="rounded-2xl border border-slate-200/60 bg-white/80 backdrop-blur-sm shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="h-6 w-6 animate-spin text-primary-500" />
            </div>
          ) : employees.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 gap-3">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-linear-to-br from-slate-100 to-slate-200 shadow-md">
                <Users className="h-6 w-6 text-slate-500" />
              </div>
              <div className="text-center">
                <p className="font-medium text-slate-700">No employees found</p>
                <p className="text-sm text-slate-500">Try adjusting your filters</p>
              </div>
              <Button variant="outline" onClick={() => onFilterChange(DEFAULT_FILTERS)}>Clear Filters</Button>
            </div>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-100 bg-linear-to-r from-slate-50 to-primary-50/30">
                  {["Employee", "Role & Department", "Status", "Experience", "Location", "Salary", ""].map((col) => (
                    <th
                      key={col}
                      className={[
                        "px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600",
                        col === "Role & Department" ? "hidden md:table-cell" : "",
                        col === "Status" ? "hidden sm:table-cell" : "",
                        col === "Experience" || col === "Salary" ? "hidden lg:table-cell" : "",
                        col === "Location" ? "hidden xl:table-cell" : "",
                      ].join(" ")}
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {employees.map((emp) => (
                  <EmployeeRow
                    key={emp._id || emp.id}
                    employee={emp}
                    onView={setViewEmployee}
                    onEdit={setEditEmployee}
                    onDelete={setDeleteEmployee}
                  />
                ))}
              </tbody>
            </table>
          )}
        </div>

        {!loading && total > 0 && (
          <div className="border-t border-slate-100 bg-linear-to-r from-slate-50/50 to-primary-50/20">
            <Pagination
              page={page}
              totalPages={totalPages}
              total={total}
              pageSize={pageSize}
              onPageChange={onPageChange}
              onPageSizeChange={onPageSizeChange}
            />
          </div>
        )}
      </div>

      <EmployeeDetail
        employee={viewEmployee}
        open={!!viewEmployee}
        onClose={() => setViewEmployee(null)}
        onEdit={(emp) => setEditEmployee(emp)}
      />

      <Modal open={addOpen} onClose={() => !submitting && setAddOpen(false)} title="Add Employee" description="Fill in the details below to add a new team member." size="lg">
        <EmployeeForm onSubmit={handleAdd} onCancel={() => setAddOpen(false)} loading={submitting} />
      </Modal>

      <Modal open={!!editEmployee} onClose={() => !submitting && setEditEmployee(null)} title="Edit Employee" description="Update employee information below." size="lg">
        {editEmployee && (
          <EmployeeForm initial={editEmployee} onSubmit={handleEdit} onCancel={() => setEditEmployee(null)} loading={submitting} />
        )}
      </Modal>

      <ConfirmDialog
        open={!!deleteEmployee}
        onClose={() => !deleting && setDeleteEmployee(null)}
        onConfirm={handleDelete}
        title="Delete Employee?"
        description={`Are you sure you want to remove ${deleteEmployee?.name}? This action cannot be undone.`}
        confirmLabel="Delete"
        loading={deleting}
      />
    </>
  );
}
