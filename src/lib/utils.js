import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function calcAge(dob) {
  const birth = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
  return age;
}

export function getInitials(name) {
  if (!name) return "??";
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export function getAvatarColor(name) {
  if (!name) return "bg-slate-200 text-slate-600";
  
  const colors = [
    "bg-blue-100 text-blue-700",
    "bg-emerald-100 text-emerald-700",
    "bg-violet-100 text-violet-700",
    "bg-amber-100 text-amber-700",
    "bg-rose-100 text-rose-700",
    "bg-cyan-100 text-cyan-700",
    "bg-pink-100 text-pink-700",
    "bg-indigo-100 text-indigo-700",
  ];
  
  const hash = name.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return colors[hash % colors.length];
}

export function formatSalary(amount) {
  if (!amount) return "—";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(dateString) {
  if (!dateString) return "—";
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function calcTenure(joinDate, endDate) {
  if (!joinDate) return 0;
  const start = new Date(joinDate);
  const end = endDate ? new Date(endDate) : new Date();
  const years = (end - start) / (1000 * 60 * 60 * 24 * 365.25);
  return Math.max(0, Math.round(years * 10) / 10);
}

export const DEPARTMENT_COLORS = {
  Engineering: "bg-blue-100 text-blue-700 border-blue-200",
  Design: "bg-purple-100 text-purple-700 border-purple-200",
  Product: "bg-violet-100 text-violet-700 border-violet-200",
  Marketing: "bg-pink-100 text-pink-700 border-pink-200",
  Sales: "bg-green-100 text-green-700 border-green-200",
  HR: "bg-amber-100 text-amber-700 border-amber-200",
  Finance: "bg-emerald-100 text-emerald-700 border-emerald-200",
  Operations: "bg-cyan-100 text-cyan-700 border-cyan-200",
  Legal: "bg-slate-100 text-slate-700 border-slate-200",
  "Customer Support": "bg-orange-100 text-orange-700 border-orange-200",
};

export const STATUS_COLORS = {
  Active: "bg-emerald-100 text-emerald-700 border-emerald-200",
  "On Leave": "bg-amber-100 text-amber-700 border-amber-200",
  Probation: "bg-blue-100 text-blue-700 border-blue-200",
  Resigned: "bg-slate-100 text-slate-700 border-slate-200",
};

export const DEPARTMENTS = [
  "Engineering",
  "Design",
  "Product",
  "Marketing",
  "Sales",
  "HR",
  "Finance",
  "Operations",
  "Legal",
  "Customer Support",
];

export const STATUSES = ["Active", "On Leave", "Probation", "Resigned"];

export const ROLES = {
  Engineering: [
    "Senior Engineer",
    "Junior Engineer",
    "Tech Lead",
    "Staff Engineer",
    "Principal Engineer",
  ],
  Design: [
    "UI Designer",
    "UX Designer",
    "Product Designer",
    "Design Lead",
    "Visual Designer",
  ],
  Product: [
    "Product Manager",
    "Senior PM",
    "Associate PM",
    "VP of Product",
    "Product Analyst",
  ],
  Marketing: [
    "Marketing Manager",
    "SEO Specialist",
    "Content Writer",
    "Brand Strategist",
    "Growth Hacker",
  ],
  Sales: [
    "Sales Executive",
    "Account Manager",
    "Sales Lead",
    "Business Dev Manager",
    "SDR",
  ],
  HR: [
    "HR Manager",
    "Recruiter",
    "People Ops",
    "HR Business Partner",
    "L&D Specialist",
  ],
  Finance: [
    "Financial Analyst",
    "Accountant",
    "CFO",
    "Finance Manager",
    "Controller",
  ],
  Operations: [
    "Operations Manager",
    "Program Manager",
    "Analyst",
    "COO",
    "Process Engineer",
  ],
  Legal: [
    "Legal Counsel",
    "Paralegal",
    "Compliance Officer",
    "General Counsel",
    "IP Specialist",
  ],
  "Customer Support": [
    "Support Agent",
    "Support Lead",
    "CX Manager",
    "QA Specialist",
    "Escalation Lead",
  ],
};

export const LOCATIONS = [
  "New York",
  "San Francisco",
  "Austin",
  "London",
  "Remote",
  "Berlin",
  "Singapore",
  "Bengaluru",
];
