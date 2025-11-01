import { useState } from "react";
import { Link } from "@inertiajs/react";
import { ChevronRight, ChevronLeft, Mail, Bell } from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const lineChartData = [
  { name: "hari 1", ccx1: 20, ccx2: 30, ccx3: 25 },
  { name: "hari 2", ccx1: 25, ccx2: 35, ccx3: 30 },
  { name: "hari 3", ccx1: 30, ccx2: 40, ccx3: 35 },
  { name: "hari 4", ccx1: 35, ccx2: 45, ccx3: 40 },
  { name: "hari 5", ccx1: 40, ccx2: 50, ccx3: 45 },
];

const eventsData = [
  { name: "2025-10-12", events: 4 },
  { name: "2025-10-13", events: 6 },
  { name: "2025-10-14", events: 8 },
  { name: "2025-10-15", events: 10 },
  { name: "2025-10-16", events: 11 },
];

const uptimeData = [
  { name: "D1", uptime: 40 },
  { name: "D2", uptime: 65 },
  { name: "D3", uptime: 75 },
  { name: "D4", uptime: 90 },
  { name: "D5", uptime: 95 },
];

const falsePositiveData = [
  { name: "D1", count: 3 },
  { name: "D2", count: 5 },
  { name: "D3", count: 12 },
  { name: "D4", count: 3 },
  { name: "D5", count: 9 },
];

const devices = [
  { id: "D1", time: "1h ago", confidence: 0.7 },
  { id: "D2", time: "4h ago", confidence: 0.65 },
  { id: "D3", time: "2h ago", confidence: 0.5 },
  { id: "D4", time: "5h ago", confidence: 0.85 },
];

export default function Dashboard() {
  const [activeMenu, setActiveMenu] = useState("dashboard");

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3 3h18v2H3V3zm0 4h18v2H3V7zm0 4h18v2H3v-2zm0 4h18v2H3v-2z"></path>
              </svg>
            </div>
            <span className="font-bold text-lg text-gray-900">Hijau.ID</span>
          </div>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2">
          <Link
            href="/"
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
              activeMenu === "dashboard" ? "text-blue-600 bg-blue-50" : "text-gray-600 hover:bg-gray-100"
            }`}
            onClick={() => setActiveMenu("dashboard")}
          >
            DASHBOARD
          </Link>
          <Link
            href="/laporan"
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
              activeMenu === "laporan" ? "text-blue-600 bg-blue-50" : "text-gray-600 hover:bg-gray-100"
            }`}
            onClick={() => setActiveMenu("laporan")}
          >
            LAPORAN
          </Link>
          <Link
            href="/pemantauan"
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
              activeMenu === "pemantauan" ? "text-blue-600 bg-blue-50" : "text-gray-600 hover:bg-gray-100"
            }`}
            onClick={() => setActiveMenu("pemantauan")}
          >
            PEMANTAUAN
          </Link>
          <Link
            href="/profile"
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
              activeMenu === "profile" ? "text-blue-600 bg-blue-50" : "text-gray-600 hover:bg-gray-100"
            }`}
            onClick={() => setActiveMenu("profile")}
          >
            PROFILE
          </Link>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <div className="bg-white border-b border-gray-200 px-8 py-4 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <Mail className="w-6 h-6 text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg relative">
              <Bell className="w-6 h-6 text-gray-600" />
              <span className="absolute top-1 right-1 w-3 h-3 bg-red-500 rounded-full"></span>
            </button>
            <div className="flex items-center gap-2 pl-4 border-l border-gray-200">
              <div className="w-10 h-10 bg-yellow-400 rounded-full"></div>
              <div>
                <p className="text-sm font-medium text-gray-900">Admin</p>
                <p className="text-xs text-gray-500">Admin account</p>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-8 space-y-8">
          {/* Stat Cards */}
          <div className="grid grid-cols-4 gap-6">
            <div className="bg-white rounded-2xl border-2 border-blue-500 p-6 text-center">
              <p className="text-gray-500 text-sm">Active Devices</p>
              <p className="text-4xl font-bold text-gray-900 mt-2">10</p>
            </div>
            <div className="bg-white rounded-2xl border-2 border-blue-500 p-6 text-center">
              <p className="text-gray-500 text-sm">Events (24h)</p>
              <p className="text-4xl font-bold text-gray-900 mt-2">30</p>
            </div>
            <div className="bg-white rounded-2xl border-2 border-blue-500 p-6 text-center">
              <p className="text-gray-500 text-sm">Alerts Today</p>
              <p className="text-4xl font-bold text-gray-900 mt-2">7</p>
            </div>
            <div className="bg-white rounded-2xl border-2 border-blue-500 p-6 text-center">
              <p className="text-gray-500 text-sm">Offline Devices</p>
              <p className="text-4xl font-bold text-gray-900 mt-2">5</p>
            </div>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-3 gap-6">
            {/* Line Chart */}
            <div className="col-span-2 bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <button className="p-2 hover:bg-gray-100 rounded-lg">
                  <ChevronLeft className="w-6 h-6 text-blue-600" />
                </button>
                <div style={{ width: "100%", height: 280 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={lineChartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="name" stroke="#9ca3af" />
                      <YAxis stroke="#9ca3af" />
                      <Line type="monotone" dataKey="ccx1" stroke="#a78bfa" isAnimationActive={false} />
                      <Line type="monotone" dataKey="ccx2" stroke="#60a5fa" isAnimationActive={false} />
                      <Line type="monotone" dataKey="ccx3" stroke="#fbbf24" isAnimationActive={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <button className="p-2 hover:bg-gray-100 rounded-lg">
                  <ChevronRight className="w-6 h-6 text-blue-600" />
                </button>
              </div>
            </div>

            {/* Device Info */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="space-y-4">
                {devices.map((device) => (
                  <div key={device.id} className="bg-gray-100 rounded-lg p-4">
                    <p className="text-sm font-medium text-gray-900">
                      Device: {device.id} • {device.time}
                    </p>
                    <p className="text-sm text-gray-500">Confidence: {device.confidence}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Charts */}
          <div className="grid grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="text-center text-gray-700 font-medium mb-4">Events</h3>
              <div style={{ width: "100%", height: 220 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={eventsData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="name" stroke="#9ca3af" />
                    <YAxis stroke="#9ca3af" />
                    <Line type="monotone" dataKey="events" stroke="#60a5fa" isAnimationActive={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="text-center text-gray-700 font-medium mb-4">Device Uptime</h3>
              <div style={{ width: "100%", height: 220 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={uptimeData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="name" stroke="#9ca3af" />
                    <YAxis stroke="#9ca3af" />
                    <Bar dataKey="uptime" fill="#60a5fa" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="text-center text-gray-700 font-medium mb-4">False Positive</h3>
              <div style={{ width: "100%", height: 220 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={falsePositiveData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="name" stroke="#9ca3af" />
                    <YAxis stroke="#9ca3af" />
                    <Bar dataKey="count" fill="#fbbf24" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
