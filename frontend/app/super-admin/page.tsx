"use client";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "../../components/ui/badge";
import {
  Users,
  Shield,
  Settings,
  BarChart3,
  Activity,
  Download,
  UserCog,
  FileText,
  Bell,
} from "lucide-react";

export default function SuperAdminDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fefafb] to-[#f9f0f2]">

      {/* Floating Action Header */}
      <div className="sticky top-0 z-10 bg-gradient-to-br from-[#5a1323] via-[#7a1c2f] to-[#9d2c42] px-6 pt-8 pb-10 rounded-b-3xl shadow-2xl shadow-[#5a1323]/20">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-8 bg-white/90 rounded-full"></div>
              <h1 className="text-2xl font-bold text-white tracking-tight">Super Admin</h1>
            </div>
            <p className="mt-1 text-sm text-white/90 font-light">System-wide control & monitoring</p>
          </div>

          <div className="relative">
            <Button size="icon" className="bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-xl border border-white/30">
              <Bell className="w-5 h-5 text-white" />
            </Button>
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-400 rounded-full border-2 border-[#7a1c2f]"></span>
          </div>
        </div>

        <Button className="w-full bg-white text-[#7a1c2f] hover:bg-white/95 hover:shadow-lg font-semibold rounded-xl shadow-md transition-all duration-300 h-12 gap-2">
          <Settings className="w-5 h-5" />
          Open System Settings
        </Button>
      </div>

      {/* Content */}
      <div className="p-5 space-y-6 -mt-4">

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-3">
          <StatCard title="Total Users" value="1,248" icon={<Users className="w-5 h-5 text-[#7a1c2f]" />} trend="+12%" />
          <StatCard title="Admins" value="12" icon={<Shield className="w-5 h-5 text-[#7a1c2f]" />} trend="+2" />
          <StatCard title="Assistants" value="34" icon={<UserCog className="w-5 h-5 text-[#7a1c2f]" />} trend="+5" />
          <StatCard title="System" value="Operational" icon={<Activity className="w-5 h-5 text-[#7a1c2f]" />} status />
        </div>

        {/* User Management */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg shadow-[#5a1323]/5 p-4 border border-white/50">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-[#5a1323] flex items-center gap-2"><Users className="w-5 h-5 text-[#7a1c2f]" />User & Role Management</h2>
            <Badge className="bg-[#f9f0f2] text-[#7a1c2f] rounded-lg">4 Actions</Badge>
          </div>
          <div className="grid grid-cols-1 gap-3">
            <ActionCard title="Manage Users" desc="Create, edit, deactivate accounts" icon={<Users className="w-5 h-5 text-[#7a1c2f]" />} />
            <ActionCard title="Admin Accounts" desc="Control admin privileges" icon={<Shield className="w-5 h-5 text-[#7a1c2f]" />} />
            <ActionCard title="Role Permissions" desc="Configure access rules" icon={<UserCog className="w-5 h-5 text-[#7a1c2f]" />} />
            <ActionCard title="Activity Logs" desc="Audit all system actions" icon={<FileText className="w-5 h-5 text-[#7a1c2f]" />} />
          </div>
        </div>

        {/* Security & Health */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg shadow-[#5a1323]/5 p-4 border border-white/50">
          <h2 className="text-lg font-bold text-[#5a1323] flex items-center gap-2 mb-4"><Shield className="w-5 h-5 text-[#7a1c2f]" />Security & Health</h2>
          <div className="space-y-4">
            <SecurityRow label="Last Backup" value="Today · 2:00 AM" status="success" />
            <SecurityRow label="Failed Logins" value="3 attempts" status="warning" />
            <SecurityRow label="Audit Logs" value="Enabled" status="success" badge />
            <SecurityRow label="System Uptime" value="99.9%" status="success" />
          </div>
          <Button variant="outline" className="w-full mt-4 border-[#7a1c2f]/30 text-[#7a1c2f] rounded-xl hover:bg-[#f9f0f2] transition-all h-12 font-medium">
            <Shield className="w-5 h-5 mr-2 text-[#7a1c2f]" />
            View Security Center
          </Button>
        </div>

        {/* Reports & Analytics */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg shadow-[#5a1323]/5 p-4 border border-white/50">
          <h2 className="text-lg font-bold text-[#5a1323] flex items-center gap-2 mb-4"><BarChart3 className="w-5 h-5 text-[#7a1c2f]" />Reports & Analytics</h2>
          <div className="grid grid-cols-1 gap-3">
            <ActionCard title="User Growth" desc="Registration & role trends" icon={<Activity className="w-5 h-5 text-[#7a1c2f]" />} />
            <ActionCard title="System Usage" desc="Platform activity overview" icon={<BarChart3 className="w-5 h-5 text-[#7a1c2f]" />} />
            <ActionCard title="Export Reports" desc="Download system data" icon={<Download className="w-5 h-5 text-[#7a1c2f]" />} />
          </div>
        </div>

        {/* Quick Actions Bottom Bar */}
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 w-[calc(100%-2.5rem)] max-w-md">
          <div className="bg-gradient-to-r from-[#5a1323] to-[#7a1c2f] rounded-2xl p-4 shadow-2xl shadow-[#5a1323]/30">
              <div className="flex items-center justify-between">
              <Button size="icon" className="bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-xl"><Settings className="w-5 h-5 text-white" /></Button>
              <Button size="icon" className="bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-xl"><Activity className="w-5 h-5 text-white" /></Button>
              <Button className="bg-white text-[#7a1c2f] hover:bg-white/95 px-6 rounded-xl font-semibold">Quick Menu</Button>
              <Button size="icon" className="bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-xl"><BarChart3 className="w-5 h-5 text-white" /></Button>
              <Button size="icon" className="bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-xl"><Users className="w-5 h-5 text-white" /></Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon, trend, status, }: { title: string; value: string; icon?: React.ReactNode; trend?: string; status?: boolean; }) {
  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-lg shadow-[#5a1323]/5 border border-white/50">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="p-2 bg-gradient-to-br from-[#f9f0f2] to-[#f2e4e8] rounded-xl">{icon}</div>
            {trend && (<Badge className="bg-green-100 text-green-700 rounded-lg text-xs">{trend}</Badge>)}
          </div>
          <p className="text-xs text-gray-500 font-medium">{title}</p>
          <h2 className="text-2xl font-bold text-[#5a1323] mt-1">{value}</h2>
        </div>
        {status && (<div className="w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50"></div>)}
      </div>
    </div>
  );
}

function ActionCard({ title, desc, icon, }: { title: string; desc: string; icon?: React.ReactNode; }) {
  return (
    <div className="group rounded-xl border border-[#f2e4e8] bg-white p-4 shadow-sm active:scale-[0.98] transition-all duration-300 cursor-pointer hover:shadow-md hover:border-[#e6d5d9] hover:bg-gradient-to-br hover:from-white hover:to-[#fefafb]">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-gradient-to-br from-[#f9f0f2] to-[#f2e4e8] rounded-lg group-hover:scale-110 transition-transform">{icon}</div>
        <div>
          <h3 className="font-semibold text-[#5a1323]">{title}</h3>
          <p className="text-sm text-gray-500">{desc}</p>
        </div>
      </div>
    </div>
  );
}

function SecurityRow({ label, value, status, badge, }: { label: string; value: string; status?: "success" | "warning" | "error"; badge?: boolean; }) {
  const statusColors = {
    success: "bg-green-100 text-green-700",
    warning: "bg-amber-100 text-amber-700",
    error: "bg-red-100 text-red-700",
  } as const;

  return (
    <div className="flex items-center justify-between py-2 border-b border-[#f2e4e8] last:border-0">
      <div className="flex items-center gap-3">
        <div className={`w-2 h-2 rounded-full ${
          status === "success" ? "bg-green-400" : status === "warning" ? "bg-amber-400" : "bg-red-400"
        }`}></div>
        <span className="text-sm text-gray-600">{label}</span>
      </div>
      {badge ? (
        <Badge className={`${statusColors[status || "success"]} rounded-lg`}>{value}</Badge>
      ) : (
        <span className="text-sm font-medium text-[#5a1323]">{value}</span>
      )}
    </div>
  );
}
