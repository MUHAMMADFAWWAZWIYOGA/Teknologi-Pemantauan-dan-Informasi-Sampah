import React, { useState, useEffect, useRef } from "react";
import { Head, Link } from "@inertiajs/react";
import {
  ChevronRight,
  ChevronLeft,
  Bell,
  LayoutDashboard,
  BarChart3,
  Eye,
  User,
  X,
  FileText,
  Activity,
  Clock,
  Video,
  MapPin,
  Wifi,
  WifiOff,
  Play,
  History,
  Info,
  Search,
  Filter,
  Grid3x3,
  List
} from "lucide-react";

const cameras = [
  { id: 1, name: "KAMERA 1", location: "Area Pasar Baru", status: "online", lastSeen: "2h ago", resolution: "1080p", fps: 30 },
  { id: 2, name: "KAMERA 2", location: "Area Pasar Baru", status: "online", lastSeen: "1h ago", resolution: "1080p", fps: 30 },
  { id: 3, name: "KAMERA 3", location: "Area Mall Plaza", status: "offline", lastSeen: "5h ago", resolution: "720p", fps: 25 },
  { id: 4, name: "KAMERA 4", location: "Toko Serba Ada", status: "online", lastSeen: "30m ago", resolution: "4K", fps: 60 },
];

const notifications = [
  { id: 1, message: "Kamera 2 mendeteksi gerakan mencurigakan", time: "5 menit lalu", type: "warning" },
  { id: 2, message: "Sistem diperbarui pada 10:30", time: "1 jam lalu", type: "info" },
  { id: 3, message: "Laporan harian tersedia", time: "2 jam lalu", type: "success" },
  { id: 4, message: "Kamera 4 offline sementara", time: "3 jam lalu", type: "error" },
  { id: 5, message: "Semua sistem berjalan normal", time: "Kemarin", type: "success" },
];

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
  { id: "laporan", label: "Laporan", icon: BarChart3, href: "/laporan" },
  { id: "pemantauan", label: "Pemantauan", icon: Eye, href: "/pemantauan" },
  { id: "konten", label: "Konten", icon: FileText, href: "/konten" },
  { id: "profile", label: "Profile", icon: User, href: "/profile" },
];

export default function Pemantauan() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeMenu, setActiveMenu] = useState("pemantauan");
  const [showNotif, setShowNotif] = useState(false);
  const [showAllNotif, setShowAllNotif] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [viewMode, setViewMode] = useState("grid");
  const [hoveredCamera, setHoveredCamera] = useState(null);

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

  const filteredCameras = cameras.filter(cam => {
    const matchesSearch = cam.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cam.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === "all" || cam.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const onlineCameras = cameras.filter(c => c.status === "online").length;
  const offlineCameras = cameras.filter(c => c.status === "offline").length;

  return (
    <>
      <Head>
        <title>Pemantauan | TAPIS.id</title>
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><defs><linearGradient id='grad' x1='0%25' y1='0%25' x2='100%25' y2='100%25'><stop offset='0%25' stop-color='%233b82f6'/><stop offset='50%25' stop-color='%239333ea'/><stop offset='100%25' stop-color='%231d4ed8'/></linearGradient></defs><rect width='100' height='100' rx='20' fill='url(%23grad)'/><text x='50' y='72' font-size='65' font-weight='bold' text-anchor='middle' fill='white' font-family='system-ui'>T</text></svg>" />
      </Head>
      <div className="flex h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
        <div
          className={`${sidebarOpen ? "w-64" : "w-20"} bg-white/80 backdrop-blur-lg border-r border-slate-200/50 flex flex-col shadow-xl transition-all duration-500 ease-in-out will-change-[width]`}
        >
          <div className="p-6 border-b border-slate-100 flex items-center justify-between overflow-hidden">
            <div className={`flex items-center ${sidebarOpen ? "gap-3" : "gap-0 justify-center w-full"} transition-all duration-500 ease-in-out`}>
              <div className="relative flex-shrink-0">
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
            <button
              onClick={() => setSidebarOpen(false)}
              className={`p-1 hover:bg-slate-100 rounded-lg transition-all duration-300 hover:scale-110 flex-shrink-0 ${
                sidebarOpen ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4 pointer-events-none"
              }`}
            >
              <ChevronLeft className="w-5 h-5 text-slate-400" />
            </button>
          </div>

          <nav className="flex-1 px-4 py-6 space-y-2 overflow-hidden">
            {navItems.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                preserveState
                preserveScroll
                className={`flex items-center ${sidebarOpen ? "gap-3" : "gap-0 justify-center"} px-4 py-3 rounded-xl transition-all duration-300 ease-in-out group ${
                  activeMenu === item.id
                    ? "text-blue-600 bg-gradient-to-r from-blue-50 to-purple-50 shadow-md scale-105"
                    : "text-slate-600 hover:bg-gradient-to-r hover:from-slate-50 hover:to-blue-50 hover:scale-105"
                }`}
                onClick={() => setActiveMenu(item.id)}
              >
                <item.icon className={`w-5 h-5 flex-shrink-0 transition-transform duration-300 group-hover:scale-110 ${activeMenu === item.id ? "animate-pulse" : ""}`} />
                <span className={`text-base font-semibold whitespace-nowrap overflow-hidden transition-all duration-500 ease-in-out ${
                  sidebarOpen ? "opacity-100 max-w-full ml-0" : "opacity-0 max-w-0 ml-0"
                }`}>
                  {item.label}
                </span>
              </Link>
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
          <div className="bg-white/80 backdrop-blur-lg border-b border-slate-200/50 px-8 py-4 flex justify-between items-center shadow-sm relative z-10"> {/* Added relative z-10 for header context */}
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
                  Pemantauan
                </h1>
                <p className="text-sm text-slate-500 mt-1 flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Monitor semua kamera secara real-time
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative" ref={notifRef}>
                <button
                  onClick={() => setShowNotif(!showNotif)}
                  className="p-2.5 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 rounded-xl transition-all hover:scale-110 relative group"
                >
                  <Bell className={`w-5 h-5 text-slate-600 group-hover:text-blue-600 transition-all ${showNotif ? "animate-bounce" : ""}`} />
                  <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full shadow-lg animate-pulse"></span>
                </button>

                {showNotif && (
                  // *** FIX APPLIED HERE: Added z-50 to ensure it overlays other header/content elements ***
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

          <main className="flex-1 p-8 overflow-auto space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { label: "Total Kamera", value: cameras.length, icon: Video, color: "from-blue-500 to-blue-600", bg: "from-blue-50 to-blue-100" },
                { label: "Online", value: onlineCameras, icon: Wifi, color: "from-emerald-500 to-emerald-600", bg: "from-emerald-50 to-emerald-100" },
                { label: "Offline", value: offlineCameras, icon: WifiOff, color: "from-red-500 to-red-600", bg: "from-red-50 to-red-100" },
                { label: "Recording", value: onlineCameras, icon: Activity, color: "from-purple-500 to-purple-600", bg: "from-purple-50 to-purple-100" },
              ].map((stat, idx) => (
                <div
                  key={idx}
                  className={`bg-gradient-to-br ${stat.bg} rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-white/50 cursor-pointer transform hover:scale-105 hover:-translate-y-1`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color} shadow-lg`}>
                      <stat.icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <p className="text-sm font-medium text-slate-600 mb-1">{stat.label}</p>
                  <p className={`text-4xl font-bold bg-gradient-to-br ${stat.color} bg-clip-text text-transparent`}>
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>

            <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-slate-100/50">
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-6">
                <div className="flex-1 w-full lg:w-auto">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Cari kamera berdasarkan nama atau lokasi..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <div className="flex items-center gap-2">
                    <Filter className="w-5 h-5 text-slate-600" />
                    <select
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                      className="px-4 py-2.5 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white hover:bg-slate-50 transition-all"
                    >
                      <option value="all">Semua Status</option>
                      <option value="online">Online</option>
                      <option value="offline">Offline</option>
                    </select>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => setViewMode("grid")}
                      className={`p-2.5 rounded-xl transition-all ${
                        viewMode === "grid"
                          ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
                          : "bg-white border border-slate-300 text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      <Grid3x3 className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setViewMode("list")}
                      className={`p-2.5 rounded-xl transition-all ${
                        viewMode === "list"
                          ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
                          : "bg-white border border-slate-300 text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      <List className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>

              <div className={viewMode === "grid" ? "grid md:grid-cols-2 gap-6" : "space-y-4"}>
                {filteredCameras.map((cam) => (
                  <article
                    key={cam.id}
                    onMouseEnter={() => setHoveredCamera(cam.id)}
                    onMouseLeave={() => setHoveredCamera(null)}
                    className={`relative bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 border border-slate-100 ${
                      hoveredCamera === cam.id ? "shadow-2xl scale-105" : ""
                    }`}
                  >
                    <div className="relative group">
                      {/* NOTE: You'll need an actual image file or use a placeholder service if you want a real image, 
                      but keeping your original placeholder for now. */}
                      <img
                        src="/cctv-sample.jpg" 
                        alt={cam.name}
                        className="w-full h-48 object-cover transition-all duration-300 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-all"></div>
                      
                      <div className="absolute top-3 left-3">
                        <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold shadow-lg ${
                          cam.status === "online"
                            ? "bg-gradient-to-r from-emerald-500 to-emerald-600 text-white"
                            : "bg-gradient-to-r from-red-500 to-red-600 text-white"
                        }`}>
                          {cam.status === "online" ? <Wifi className="w-3 h-3" /> : <WifiOff className="w-3 h-3" />}
                          {cam.status === "online" ? "Online" : "Offline"}
                        </span>
                      </div>

                      <div className="absolute top-3 right-3 flex gap-2">
                        <span className="px-2 py-1 bg-black/70 backdrop-blur-sm text-white rounded-lg text-xs font-bold">
                          {cam.resolution}
                        </span>
                        <span className="px-2 py-1 bg-black/70 backdrop-blur-sm text-white rounded-lg text-xs font-bold">
                          {cam.fps} FPS
                        </span>
                      </div>
                    </div>

                    <div className="p-5">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-slate-900 mb-1">{cam.name}</h3>
                          <p className="text-sm text-slate-600 flex items-center gap-1">
                            <MapPin className="w-4 h-4 text-purple-500" />
                            {cam.location}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 mb-4 text-xs text-slate-500">
                        <Clock className="w-3 h-3" />
                        <span>Last seen {cam.lastSeen}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button className="flex-1 group px-4 py-2.5 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-xl hover:scale-105 flex items-center justify-center gap-2">
                          <Play className="w-4 h-4 group-hover:scale-110 transition-transform" />
                          Live
                        </button>
                        <button className="px-4 py-2.5 border-2 border-slate-300 rounded-xl text-slate-700 font-bold hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all hover:scale-105 flex items-center gap-2">
                          <History className="w-4 h-4" />
                        </button>
                        <button className="px-4 py-2.5 border-2 border-slate-300 rounded-xl text-slate-700 font-bold hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all hover:scale-105 flex items-center gap-2">
                          <Info className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            {filteredCameras.length === 0 && (
              <div className="text-center py-16">
                <Video className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                <p className="text-slate-500 text-lg font-semibold">Tidak ada kamera ditemukan</p>
                <p className="text-slate-400 text-sm mt-2">Coba ubah filter atau kata kunci pencarian</p>
              </div>
            )}
          </main>
        </div>
      </div>
      {/* Ensure the full notification modal also stays on top, which it already does with z-50 */}
    </>
  );
}