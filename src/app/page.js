"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { StatCards } from "@/components/StatCards";
import { EmployeesClient } from "@/components/EmployeesClient";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const DEFAULT_FILTERS = {
  search: "",
  department: "All",
  status: "All",
};

const INITIAL_PAGE = 1;
const INITIAL_PAGE_SIZE = 5;

export default function DashboardPage() {
  
  const [stats, setStats] = useState({
    total: 0,
    totalDepartments: 0,
    totalLocations: 0,
    byDepartment: {},
    byLocation: {},
  });
  
  const [employees, setEmployees] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(INITIAL_PAGE);
  const [pageSize, setPageSize] = useState(INITIAL_PAGE_SIZE);
  const [totalPages, setTotalPages] = useState(0);
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [loading, setLoading] = useState(true);
  const [employeesLoading, setEmployeesLoading] = useState(true);
  
  const debounceRef = useRef();

  const fetchStats = useCallback(async () => {
    try {
      const statsRes = await fetch(`${API_URL}/employees/stats`, {
        cache: 'no-store',
      });
      
      if (statsRes.ok) {
        const statsData = await statsRes.json();
        setStats(statsData);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  }, []);

  const fetchEmployees = useCallback(async (currentFilters, currentPage, currentPageSize) => {
    setEmployeesLoading(true);

    const params = new URLSearchParams({
      page: String(currentPage),
      limit: String(currentPageSize),
      department: currentFilters.department,
      status: currentFilters.status,
      search: currentFilters.search,
    });

    try {
      const res = await fetch(`${API_URL}/employees?${params}`);
      if (!res.ok) throw new Error("Failed to fetch");
      const json = await res.json();
      
      setEmployees(json.data || []);
      setTotal(json.total || 0);
      setPage(json.page || 1);
      setPageSize(currentPageSize);
      setTotalPages(json.pages || 0);
      setEmployeesLoading(false);
    } catch (err) {
      console.error('Error fetching employees:', err);
      setEmployeesLoading(false);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await fetchStats();
      setLoading(false);
    };
    
    fetchData();
  }, [fetchStats]);

  useEffect(() => {
    clearTimeout(debounceRef.current);
    const delay = filters.search !== "" ? 300 : 0;
    debounceRef.current = setTimeout(() => {
      fetchEmployees(filters, page, pageSize);
    }, delay);
    return () => clearTimeout(debounceRef.current);
  }, [filters, page, pageSize, fetchEmployees]);

  const handleFilterChange = useCallback((newFilters) => {
    setFilters(newFilters);
    setPage(1);
  }, []);

  const handlePageChange = useCallback((newPage) => {
    setPage(newPage);
  }, []);

  const handlePageSizeChange = useCallback((newPageSize) => {
    setPageSize(newPageSize);
    setPage(1);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-slate-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <StatCards stats={stats} />

      <div>
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-slate-900">Employees</h2>
          <p className="text-sm text-slate-600 mt-0.5">
            Manage your team — add, edit or remove members.
          </p>
        </div>
        <EmployeesClient
          employees={employees}
          total={total}
          page={page}
          pageSize={pageSize}
          totalPages={totalPages}
          filters={filters}
          loading={employeesLoading}
          onFilterChange={handleFilterChange}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
          onDataChange={() => {
            fetchStats();
            fetchEmployees(filters, page, pageSize);
          }}
        />
      </div>
    </div>
  );
}
