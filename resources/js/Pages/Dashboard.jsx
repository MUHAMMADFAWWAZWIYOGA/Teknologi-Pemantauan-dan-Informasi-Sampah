"use client"

import { useState } from "react"
import { Link } from "@inertiajs/react"
import { ChevronRight, ChevronLeft, Mail, Bell, LayoutDashboard, BarChart3, Eye, User } from "lucide-react"
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const lineChartData = [
  { name: "hari 1", ccx1: 20, ccx2: 30, ccx3: 25 },
  { name: "hari 2", ccx1: 25, ccx2: 35, ccx3: 30 },
  { name: "hari 3", ccx1: 30, ccx2: 40, ccx3: 35 },
  { name: "hari 4", ccx1: 35, ccx2: 45, ccx3: 40 },
]

const eventsData = [
  { name: "2025-10-12", events: 4 },
  { name: "2025-10-13", events: 6 },
  { name: "2025-10-14", events: 8 },
  { name: "2025-10-15", events: 10 },
  { name: "2025-10-16", events: 11 },
]

const uptimeData = [
  { name: "D1", uptime: 40 },
  { name: "D2", uptime: 65 },
  { name: "D3", uptime: 75 },
  { name: "D4", uptime: 90 },
  { name: "D5", uptime: 95 },
]

const falsePositiveData = [
  { name: "D1", count: 3 },
  { name: "D2", count: 5 },
  { name: "D3", count: 12 },
  { name: "D4", count: 3 },
  { name: "D5", count: 9 },
]

const devices = [
  { id: "D1", time: "1h ago", confidence: 0.7, status: "active" },
  { id: "D2", time: "4h ago", confidence: 0.65, status: "active" },
  { id: "D3", time: "2h ago", confidence: 0.5, status: "idle" },
  { id: "D4", time: "5h ago", confidence: 0.85, status: "active" },
]

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, href: "/" },
  { id: "laporan", label: "Laporan", icon: BarChart3, href: "/laporan" },
  { id: "pemantauan", label: "Pemantauan", icon: Eye, href: "/pemantauan" },
  { id: "profile", label: "Profile", icon: User, href: "/profile" },
]

export default function Dashboard() {
  const [activeMenu, setActiveMenu] = useState("dashboard")
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div
        className={`${sidebarOpen ? "w-64" : "w-20"} bg-white border-r border-slate-200 flex flex-col shadow-lg transition-all duration-300`}
      >
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div className={`flex items-center gap-3 ${!sidebarOpen && "justify-center w-full"}`}>
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3 3h18v2H3V3zm0 4h18v2H3V7zm0 4h18v2H3v-2zm0 4h18v2H3v-2z" />
              </svg>
            </div>
            {sidebarOpen && (
              <span className="font-bold text-lg bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
                Hijau.ID
              </span>
            )}
          </div>
          {sidebarOpen && (
            <button onClick={() => setSidebarOpen(false)} className="p-1 hover:bg-slate-100 rounded-lg transition">
              <ChevronLeft className="w-5 h-5 text-slate-400" />
            </button>
          )}
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                activeMenu === item.id ? "text-blue-600 bg-blue-50 shadow-sm" : "text-slate-600 hover:bg-slate-50"
              }`}
              onClick={() => setActiveMenu(item.id)}
            >
              <item.icon className="w-5 h-5" />
              {sidebarOpen && <span className="text-sm font-medium">{item.label}</span>}
            </Link>
          ))}
        </nav>

        {!sidebarOpen && (
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-4 mx-2 mb-4 hover:bg-slate-100 rounded-lg transition"
          >
            <ChevronRight className="w-5 h-5 text-slate-400" />
          </button>
        )}
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="bg-white border-b border-slate-200 px-8 py-4 flex justify-between items-center shadow-sm">
          <div className="flex items-center gap-4">
            {!sidebarOpen && (
              <button
                onClick={() => setSidebarOpen(true)}
                className="p-2.5 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <ChevronRight className="w-5 h-5 text-slate-600" />
              </button>
            )}
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent">
                Dashboard
              </h1>
              <p className="text-sm text-slate-500 mt-1">Pantau status dan performa sistem Anda</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2.5 hover:bg-slate-100 rounded-lg transition-colors">
              <Mail className="w-5 h-5 text-slate-600" />
            </button>
            <button className="p-2.5 hover:bg-slate-100 rounded-lg transition-colors relative">
              <Bell className="w-5 h-5 text-slate-600" />
              <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full shadow-lg"></span>
            </button>
            <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-white font-semibold text-sm">A</span>
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900">Admin</p>
                <p className="text-xs text-slate-500">Admin account</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-auto p-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: "Active Devices", value: "10", icon: "📱", color: "from-blue-500 to-blue-600" },
              { label: "Events (24h)", value: "30", icon: "📊", color: "from-emerald-500 to-emerald-600" },
              { label: "Alerts Today", value: "7", icon: "🚨", color: "from-orange-500 to-orange-600" },
              { label: "Offline Devices", value: "5", icon: "⚠️", color: "from-red-500 to-red-600" },
            ].map((stat, idx) => (
              <div
                key={idx}
                className={`bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-slate-100 bg-gradient-to-br ${stat.color} bg-opacity-5`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-600 text-sm font-medium">{stat.label}</p>
                    <p className="text-4xl font-bold text-white mt-2">{stat.value}</p>
                  </div>
                  <div className="text-4xl opacity-20">{stat.icon}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-lg transition-all duration-300">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-slate-900">Trend Analisis</h3>
                <div className="flex gap-2">
                  <button className="p-2 hover:bg-slate-100 rounded-lg transition">
                    <ChevronLeft className="w-5 h-5 text-slate-400" />
                  </button>
                  <button className="p-2 hover:bg-slate-100 rounded-lg transition">
                    <ChevronRight className="w-5 h-5 text-slate-400" />
                  </button>
                </div>
              </div>
              <div style={{ width: "100%", height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={lineChartData}>
                    <defs>
                      <linearGradient id="colorCcx1" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#a78bfa" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#a78bfa" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="name" stroke="#94a3b8" style={{ fontSize: "12px" }} />
                    <YAxis stroke="#94a3b8" style={{ fontSize: "12px" }} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1e293b",
                        border: "1px solid #475569",
                        borderRadius: "8px",
                        color: "#f1f5f9",
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="ccx1"
                      stroke="#a78bfa"
                      strokeWidth={2.5}
                      isAnimationActive={false}
                      dot={false}
                    />
                    <Line
                      type="monotone"
                      dataKey="ccx2"
                      stroke="#60a5fa"
                      strokeWidth={2.5}
                      isAnimationActive={false}
                      dot={false}
                    />
                    <Line
                      type="monotone"
                      dataKey="ccx3"
                      stroke="#fbbf24"
                      strokeWidth={2.5}
                      isAnimationActive={false}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="flex gap-6 mt-6 pt-6 border-t border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                  <span className="text-sm text-slate-600">Channel 1</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  <span className="text-sm text-slate-600">Channel 2</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                  <span className="text-sm text-slate-600">Channel 3</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-lg transition-all duration-300">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Status Perangkat</h3>
              <div className="space-y-3">
                {devices.map((device) => (
                  <div
                    key={device.id}
                    className="bg-gradient-to-r from-slate-50 to-slate-100 rounded-xl p-4 hover:from-slate-100 hover:to-slate-200 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-2.5 h-2.5 rounded-full ${device.status === "active" ? "bg-emerald-500" : "bg-amber-500"}`}
                        ></div>
                        <p className="text-sm font-semibold text-slate-900">{device.id}</p>
                      </div>
                      <span className="text-xs text-slate-500">{device.time}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-600">Confidence</span>
                      <div className="w-20 h-1.5 bg-slate-300 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"
                          style={{ width: `${device.confidence * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-xs font-semibold text-slate-900">
                        {(device.confidence * 100).toFixed(0)}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "Events", data: eventsData, dataKey: "events", color: "#3b82f6" },
              { title: "Device Uptime", data: uptimeData, dataKey: "uptime", color: "#10b981" },
              { title: "False Positive", data: falsePositiveData, dataKey: "count", color: "#f59e0b" },
            ].map((chart, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-lg transition-all duration-300"
              >
                <h3 className="text-lg font-semibold text-slate-900 mb-4">{chart.title}</h3>
                <div style={{ width: "100%", height: 240 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    {chart.title === "Events" ? (
                      <LineChart data={chart.data}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis dataKey="name" stroke="#94a3b8" style={{ fontSize: "12px" }} />
                        <YAxis stroke="#94a3b8" style={{ fontSize: "12px" }} />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "#1e293b",
                            border: "1px solid #475569",
                            borderRadius: "8px",
                            color: "#f1f5f9",
                          }}
                        />
                        <Line
                          type="monotone"
                          dataKey={chart.dataKey}
                          stroke={chart.color}
                          strokeWidth={2.5}
                          isAnimationActive={false}
                          dot={false}
                        />
                      </LineChart>
                    ) : (
                      <BarChart data={chart.data}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis dataKey="name" stroke="#94a3b8" style={{ fontSize: "12px" }} />
                        <YAxis stroke="#94a3b8" style={{ fontSize: "12px" }} />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "#1e293b",
                            border: "1px solid #475569",
                            borderRadius: "8px",
                            color: "#f1f5f9",
                          }}
                        />
                        <Bar dataKey={chart.dataKey} fill={chart.color} radius={[8, 8, 0, 0]} />
                      </BarChart>
                    )}
                  </ResponsiveContainer>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
