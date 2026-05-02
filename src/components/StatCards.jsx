import React from "react";
import { Users, Building2, MapPin, Briefcase } from "lucide-react";

function StatCard({ title, value, sub, icon, color }) {
  return (
    <div className="rounded-2xl border border-slate-200/60 bg-white/80 backdrop-blur-sm p-5 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-slate-500">{title}</p>
          <p className="mt-2 text-3xl font-bold text-slate-900">{value}</p>
          {sub && <p className="mt-0.5 text-xs text-slate-500">{sub}</p>}
        </div>
        <div className={`rounded-xl p-2.5 shadow-md ${color}`}>{icon}</div>
      </div>
    </div>
  );
}

export function StatCards({ stats }) {
  console.log('stats', stats)
  const topDept = Object.entries(stats.byDepartment || {}).sort((a, b) => b[1] - a[1])[0];
  const topLocation = Object.entries(stats.byLocation || {}).sort((a, b) => b[1] - a[1])[0];

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      <StatCard
        title="Total Employees"
        value={stats.total || 0}
        icon={<Users className="h-5 w-5 text-blue-600" />}
        color="bg-linear-to-br from-blue-50 to-blue-100"
      />
      <StatCard
        title="Departments"
        value={stats.totalDepartments || 0}
        sub={topDept ? `${topDept[0]} has most (${topDept[1]})` : ""}
        icon={<Building2 className="h-5 w-5 text-emerald-600" />}
        color="bg-linear-to-br from-emerald-50 to-emerald-100"
      />
      <StatCard
        title="Locations"
        value={stats.totalLocations || 0}
        sub={topLocation ? `${topLocation[0]} has most (${topLocation[1]})` : ""}
        icon={<MapPin className="h-5 w-5 text-violet-600" />}
        color="bg-linear-to-br from-violet-50 to-violet-100"
      />
      <StatCard
        title="Top Department"
        value={topDept?.[0] ?? "—"}
        sub={topDept ? `${topDept[1]} employees` : ""}
        icon={<Briefcase className="h-5 w-5 text-amber-600" />}
        color="bg-linear-to-br from-amber-50 to-amber-100"
      />
    </div>
  );
}
