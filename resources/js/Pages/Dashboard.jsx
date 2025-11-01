import { ChevronRight, ChevronLeft, Mail, Bell, LayoutDashboard, BarChart3, Eye, FileText, User, X, TrendingUp, Activity, Zap, Clock } from "lucide-react"
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts"
import React, { useState, useMemo, useRef, useEffect } from "react"

const lineChartData = [
    { name: "hari 1", ccx1: 20, ccx2: 30, ccx3: 25 },
    { name: "hari 2", ccx1: 25, ccx2: 35, ccx3: 30 },
    { name: "hari 3", ccx1: 30, ccx2: 40, ccx3: 35 },
    { name: "hari 4", ccx1: 35, ccx2: 45, ccx3: 40 },
];

const notifications = [
    { id: 1, message: "Kamera 2 mendeteksi gerakan mencurigakan", time: "5 menit lalu", type: "warning" },
    { id: 2, message: "Sistem diperbarui pada 10:30", time: "1 jam lalu", type: "info" },
    { id: 3, message: "Laporan harian tersedia", time: "2 jam lalu", type: "success" },
    { id: 4, message: "Kamera 4 offline sementara", time: "3 jam lalu", type: "error" },
    { id: 5, message: "Semua sistem berjalan normal", time: "Kemarin", type: "success" },
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
    { id: "D1", time: "1h ago", confidence: 0.7, status: "active", location: "Entrance" },
    { id: "D2", time: "4h ago", confidence: 0.65, status: "active", location: "Parking" },
    { id: "D3", time: "2h ago", confidence: 0.5, status: "idle", location: "Lobby" },
    { id: "D4", time: "5h ago", confidence: 0.85, status: "active", location: "Exit" },
];

const navItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
    { id: "laporan", label: "Laporan", icon: BarChart3, href: "/laporan" },
    { id: "pemantauan", label: "Pemantauan", icon: Eye, href: "/pemantauan" },
    { id: "konten", label: "Konten", icon: FileText, href: "/konten" },
    { id: "profile", label: "Profile", icon: User, href: "/profile" },
]

export default function Dashboard() {
    const [activeMenu, setActiveMenu] = useState("dashboard")
    const [sidebarOpen, setSidebarOpen] = useState(true)
    const [showNotif, setShowNotif] = useState(false);
    const [showAllNotif, setShowAllNotif] = useState(false);
    const [hoveredStat, setHoveredStat] = useState(null);
    const [selectedDevice, setSelectedDevice] = useState(null);
    const [timeRange, setTimeRange] = useState("24h");

    const notifRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (notifRef.current && !notifRef.current.contains(event.target)) {
                setShowNotif(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const getNotifIcon = (type) => {
        const icons = {
            warning: "⚠️",
            info: "ℹ️",
            success: "✅",
            error: "❌"
        };
        return icons[type] || "📬";
    };

    const getNotifColor = (type) => {
        const colors = {
            warning: "border-l-4 border-orange-400 bg-orange-50",
            info: "border-l-4 border-blue-400 bg-blue-50",
            success: "border-l-4 border-emerald-400 bg-emerald-50",
            error: "border-l-4 border-red-400 bg-red-50"
        };
        return colors[type] || "border-l-4 border-slate-400 bg-slate-50";
    };

    return (
        <div className="flex h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
            <div
                className={`${sidebarOpen ? "w-64" : "w-20"} bg-white/80 backdrop-blur-lg border-r border-slate-200/50 flex flex-col shadow-xl transition-all duration-300`}
            >
                <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                    <div className={`flex items-center gap-3 ${!sidebarOpen && "justify-center w-full"}`}>
                        <div className="relative">
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                                <span className="text-white font-bold text-xl">T</span>
                            </div>
                            <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></div>
                        </div>
                        {sidebarOpen && (
                            <span className="font-bold text-2xl bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 bg-clip-text text-transparent">
                                Tapis.id
                            </span>
                        )}
                    </div>
                    {sidebarOpen && (
                        <button onClick={() => setSidebarOpen(false)} className="p-1 hover:bg-slate-100 rounded-lg transition-all hover:scale-110">
                            <ChevronLeft className="w-5 h-5 text-slate-400" />
                        </button>
                    )}
                </div>

                <nav className="flex-1 px-4 py-6 space-y-2">
                    {navItems.map((item) => (
                        <a
                            key={item.id}
                            href={item.href}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                                activeMenu === item.id
                                    ? "text-blue-600 bg-gradient-to-r from-blue-50 to-purple-50 shadow-md scale-105"
                                    : "text-slate-600 hover:bg-gradient-to-r hover:from-slate-50 hover:to-blue-50 hover:scale-105"
                            }`}
                            onClick={() => setActiveMenu(item.id)}
                        >
                            <item.icon className={`w-5 h-5 transition-transform group-hover:scale-110 ${activeMenu === item.id ? "animate-pulse" : ""}`} />
                            {sidebarOpen && <span className="text-base font-semibold">{item.label}</span>}
                        </a>
                    ))}
                </nav>

                {!sidebarOpen && (
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="p-4 mx-2 mb-4 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 rounded-xl transition-all hover:scale-110"
                    >
                        <ChevronRight className="w-5 h-5 text-slate-400" />
                    </button>
                )}
            </div>

            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Z-INDEX FIX DITERAPKAN DI SINI (relative z-10) */}
                <div className="bg-white/80 backdrop-blur-lg border-b border-slate-200/50 px-8 py-4 flex justify-between items-center shadow-sm relative z-10">
                    <div className="flex items-center gap-4">
                        {!sidebarOpen && (
                            <button
                                onClick={() => setSidebarOpen(true)}
                                className="p-2.5 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 rounded-xl transition-all hover:scale-110"
                            >
                                <ChevronRight className="w-5 h-5 text-slate-600" />
                            </button>
                        )}
                        <div>
                            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 bg-clip-text text-transparent">
                                Dashboard
                            </h1>
                            <p className="text-sm text-slate-500 mt-1 flex items-center gap-2">
                                <Clock className="w-4 h-4" />
                                Pantau status dan performa sistem Anda secara real-time
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <button className="p-2.5 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 rounded-xl transition-all hover:scale-110 relative group">
                            <Mail className="w-5 h-5 text-slate-600 group-hover:text-blue-600 transition-colors" />
                            <span className="absolute -top-1 -right-1 w-2 h-2 bg-blue-500 rounded-full"></span>
                        </button>
                        <div className="relative" ref={notifRef}>
                            <button
                                onClick={() => setShowNotif(!showNotif)}
                                className="p-2.5 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 rounded-xl transition-all hover:scale-110 relative group"
                            >
                                <Bell className={`w-5 h-5 text-slate-600 group-hover:text-blue-600 transition-all ${showNotif ? "animate-bounce" : ""}`} />
                                <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full shadow-lg animate-pulse"></span>
                            </button>

                            {showNotif && (
                                <div className="absolute right-0 mt-2 w-80 bg-white/95 backdrop-blur-lg shadow-2xl rounded-2xl border border-slate-200/50 z-50"> 
                                    <div className="px-4 py-3 border-b border-slate-100 font-semibold text-slate-700 bg-gradient-to-r from-blue-50 to-purple-50 rounded-t-2xl">
                                        Notifikasi Terbaru
                                    </div>
                                    <ul className="max-h-60 overflow-y-auto">
                                        {notifications.slice(0, 3).map((notif) => (
                                            <li
                                                key={notif.id}
                                                className={`px-4 py-3 text-sm hover:bg-slate-50 transition-all cursor-pointer ${getNotifColor(notif.type)}`}
                                            >
                                                <div className="flex items-start gap-2">
                                                    <span className="text-lg">{getNotifIcon(notif.type)}</span>
                                                    <div className="flex-1">
                                                        <div className="text-slate-700 font-medium">{notif.message}</div>
                                                        <div className="text-xs text-slate-400 mt-1">{notif.time}</div>
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                    <div className="px-4 py-3 text-center border-t border-slate-100 bg-gradient-to-r from-slate-50 to-blue-50 rounded-b-2xl">
                                        <button
                                            onClick={() => {
                                                setShowAllNotif(true);
                                                setShowNotif(false);
                                            }}
                                            className="text-blue-600 text-sm font-semibold hover:underline hover:scale-105 transition-all"
                                        >
                                            Lihat Semua Notifikasi
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
                            <div className="relative">
                                <div className="w-10 h-10 bg-gradient-to-br from-blue-400 via-purple-400 to-blue-600 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform cursor-pointer">
                                    <span className="text-white font-semibold text-sm">A</span>
                                </div>
                                <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 rounded-full border-2 border-white"></div>
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-slate-900">Admin</p>
                                <p className="text-xs text-slate-500 flex items-center gap-1">
                                    <Activity className="w-3 h-3" />
                                    Online
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {showAllNotif && (
                    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
                        <div className="bg-white w-11/12 md:w-3/4 lg:w-2/3 rounded-2xl shadow-2xl">
                            <div className="flex justify-between items-center border-b px-6 py-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-t-2xl">
                                <h2 className="text-lg font-semibold text-slate-800">Semua Notifikasi</h2>
                                <button
                                    onClick={() => setShowAllNotif(false)}
                                    className="p-2 hover:bg-white rounded-full transition-all hover:scale-110"
                                >
                                    <X className="w-5 h-5 text-slate-600" />
                                </button>
                            </div>
                            <div className="max-h-96 overflow-y-auto">
                                {notifications.map((notif) => (
                                    <div
                                        key={notif.id}
                                        className={`px-6 py-4 border-b hover:bg-slate-50 transition-all cursor-pointer ${getNotifColor(notif.type)}`}
                                    >
                                        <div className="flex items-start gap-3">
                                            <span className="text-xl">{getNotifIcon(notif.type)}</span>
                                            <div className="flex-1">
                                                <div className="text-slate-700 font-medium">{notif.message}</div>
                                                <div className="text-xs text-slate-400 mt-1">{notif.time}</div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="p-4 text-center bg-gradient-to-r from-slate-50 to-blue-50 rounded-b-2xl">
                                <button
                                    onClick={() => setShowAllNotif(false)}
                                    className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl text-sm hover:from-blue-700 hover:to-purple-700 transition-all hover:scale-105 shadow-lg"
                                >
                                    Tutup
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                <div className="flex-1 overflow-auto p-8 space-y-8">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex gap-2">
                            {["24h", "7d", "30d"].map((range) => (
                                <button
                                    key={range}
                                    onClick={() => setTimeRange(range)}
                                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                                        timeRange === range
                                            ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg scale-105"
                                            : "bg-white text-slate-600 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:scale-105"
                                    }`}
                                >
                                    {range}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { label: "Active Devices", value: "10", icon: Activity, color: "from-blue-500 to-blue-600", trend: "+12%", bg: "from-blue-50 to-blue-100" },
                            { label: "Events (24h)", value: "30", icon: TrendingUp, color: "from-emerald-500 to-emerald-600", trend: "+8%", bg: "from-emerald-50 to-emerald-100" },
                            { label: "Alerts Today", value: "7", icon: Zap, color: "from-orange-500 to-orange-600", trend: "-3%", bg: "from-orange-50 to-orange-100" },
                            { label: "Offline Devices", value: "5", icon: X, color: "from-red-500 to-red-600", trend: "+2", bg: "from-red-50 to-red-100" },
                        ].map((stat, idx) => (
                            <div
                                key={idx}
                                onMouseEnter={() => setHoveredStat(idx)}
                                onMouseLeave={() => setHoveredStat(null)}
                                className={`bg-gradient-to-br ${stat.bg} rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-white/50 cursor-pointer transform ${
                                    hoveredStat === idx ? "scale-105 -translate-y-1" : ""
                                }`}
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color} shadow-lg`}>
                                        <stat.icon className="w-6 h-6 text-white" />
                                    </div>
                                    <div className={`text-xs font-semibold px-2 py-1 rounded-full ${
                                        stat.trend.startsWith("+") ? "bg-emerald-100 text-emerald-600" : "bg-red-100 text-red-600"
                                    }`}>
                                        {stat.trend}
                                    </div>
                                </div>
                                <p className="text-sm font-medium text-slate-600 mb-1">{stat.label}</p>
                                <p className={`text-4xl font-bold bg-gradient-to-br ${stat.color} bg-clip-text text-transparent`}>
                                    {stat.value}
                                </p>
                            </div>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2 bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-slate-100/50 hover:shadow-2xl transition-all duration-300">
                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <h3 className="text-lg font-semibold text-slate-900">Trend Analisis Real-Time</h3>
                                    <p className="text-sm text-slate-500 mt-1">Monitoring performa channel secara live</p>
                                </div>
                                <div className="flex gap-2">
                                    <button className="p-2 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 rounded-xl transition-all hover:scale-110">
                                        <ChevronLeft className="w-5 h-5 text-slate-400" />
                                    </button>
                                    <button className="p-2 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 rounded-xl transition-all hover:scale-110">
                                        <ChevronRight className="w-5 h-5 text-slate-400" />
                                    </button>
                                </div>
                            </div>
                            <div style={{ width: "100%", height: 300 }}>
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={lineChartData}>
                                        <defs>
                                            <linearGradient id="colorCcx1" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#a78bfa" stopOpacity={0.8} />
                                                <stop offset="95%" stopColor="#a78bfa" stopOpacity={0.1} />
                                            </linearGradient>
                                            <linearGradient id="colorCcx2" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#60a5fa" stopOpacity={0.8} />
                                                <stop offset="95%" stopColor="#60a5fa" stopOpacity={0.1} />
                                            </linearGradient>
                                            <linearGradient id="colorCcx3" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#fbbf24" stopOpacity={0.8} />
                                                <stop offset="95%" stopColor="#fbbf24" stopOpacity={0.1} />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                                        <XAxis dataKey="name" stroke="#94a3b8" style={{ fontSize: "12px" }} />
                                        <YAxis stroke="#94a3b8" style={{ fontSize: "12px" }} />
                                        <Tooltip
                                            contentStyle={{
                                                backgroundColor: "rgba(30, 41, 59, 0.95)",
                                                border: "1px solid #475569",
                                                borderRadius: "12px",
                                                color: "#f1f5f9",
                                                backdropFilter: "blur(10px)",
                                            }}
                                        />
                                        <Area
                                            type="monotone"
                                            dataKey="ccx1"
                                            stroke="#a78bfa"
                                            strokeWidth={3}
                                            fill="url(#colorCcx1)"
                                            isAnimationActive={false}
                                        />
                                        <Area
                                            type="monotone"
                                            dataKey="ccx2"
                                            stroke="#60a5fa"
                                            strokeWidth={3}
                                            fill="url(#colorCcx2)"
                                            isAnimationActive={false}
                                        />
                                        <Area
                                            type="monotone"
                                            dataKey="ccx3"
                                            stroke="#fbbf24"
                                            strokeWidth={3}
                                            fill="url(#colorCcx3)"
                                            isAnimationActive={false}
                                        />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                            <div className="flex gap-6 mt-6 pt-6 border-t border-slate-100">
                                {[
                                    { color: "bg-purple-500", label: "Channel 1", value: "35", status: "up" },
                                    { color: "bg-blue-500", label: "Channel 2", value: "45", status: "up" },
                                    { color: "bg-amber-500", label: "Channel 3", value: "40", status: "stable" }
                                ].map((channel, idx) => (
                                    <div key={idx} className="flex items-center gap-3 flex-1 p-3 rounded-xl bg-gradient-to-r from-slate-50 to-blue-50 hover:from-slate-100 hover:to-blue-100 transition-all cursor-pointer">
                                        <div className={`w-3 h-3 rounded-full ${channel.color} animate-pulse`}></div>
                                        <div className="flex-1">
                                            <span className="text-sm text-slate-600 font-medium">{channel.label}</span>
                                            <div className="flex items-center gap-2 mt-1">
                                                <span className="text-lg font-bold text-slate-900">{channel.value}</span>
                                                <TrendingUp className={`w-4 h-4 ${channel.status === "up" ? "text-emerald-500" : "text-slate-400"}`} />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-slate-100/50 hover:shadow-2xl transition-all duration-300">
                            <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                                <Activity className="w-5 h-5 text-blue-600" />
                                Status Perangkat Live
                            </h3>
                            <div className="space-y-3">
                                {devices.map((device) => (
                                    <div
                                        key={device.id}
                                        onClick={() => setSelectedDevice(device.id === selectedDevice ? null : device.id)}
                                        className={`bg-gradient-to-r from-slate-50 to-blue-50 rounded-xl p-4 hover:from-slate-100 hover:to-blue-100 transition-all cursor-pointer transform hover:scale-105 ${
                                            selectedDevice === device.id ? "ring-2 ring-blue-500 shadow-lg" : ""
                                        }`}
                                    >
                                        <div className="flex items-center justify-between mb-3">
                                            <div className="flex items-center gap-2">
                                                <div
                                                    className={`w-3 h-3 rounded-full ${device.status === "active" ? "bg-emerald-500 animate-pulse" : "bg-amber-500"} shadow-lg`}
                                                ></div>
                                                <p className="text-sm font-bold text-slate-900">{device.id}</p>
                                                <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-600 font-medium">
                                                    {device.location}
                                                </span>
                                            </div>
                                            <span className="text-xs text-slate-500 font-medium">{device.time}</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-xs text-slate-600 font-medium">Confidence</span>
                                            <div className="flex items-center gap-2 flex-1 mx-3">
                                                <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
                                                    <div
                                                        className={`h-full rounded-full transition-all duration-500 ${
                                                            device.confidence > 0.7
                                                                ? "bg-gradient-to-r from-emerald-400 to-emerald-600"
                                                                : device.confidence > 0.5
                                                                    ? "bg-gradient-to-r from-amber-400 to-amber-600"
                                                                    : "bg-gradient-to-r from-red-400 to-red-600"
                                                        }`}
                                                        style={{ width: `${device.confidence * 100}%` }}
                                                    ></div>
                                                </div>
                                            </div>
                                            <span className="text-xs font-bold text-slate-900">
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
                            { title: "Events", data: eventsData, dataKey: "events", color: "#3b82f6", gradient: "from-blue-500 to-blue-600" },
                            { title: "Device Uptime", data: uptimeData, dataKey: "uptime", color: "#10b981", gradient: "from-emerald-500 to-emerald-600" },
                            { title: "False Positive", data: falsePositiveData, dataKey: "count", color: "#f59e0b", gradient: "from-amber-500 to-amber-600" },
                        ].map((chart, idx) => (
                            <div
                                key={idx}
                                className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-slate-100/50 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
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
        </div> // Penutup untuk div className="flex h-screen..."
    ) // Penutup untuk return()
} // Penutup untuk function Dashboard()