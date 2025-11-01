import React, { useState, useMemo, useRef, useEffect } from "react"
import { 
  ChevronRight, 
  ChevronLeft, 
  Mail, 
  Bell, 
  LayoutDashboard, 
  BarChart3, 
  Eye, 
  User, 
  X,
  FileText,
  Activity,
  Clock,
  Download,
  Search,
  Filter,
  TrendingUp,
  Calendar,
  MapPin
} from "lucide-react"

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
  { id: "laporan", label: "Laporan", icon: BarChart3, href: "/laporan" },
  { id: "pemantauan", label: "Pemantauan", icon: Eye, href: "/pemantauan" },
  { id: "konten", label: "Konten", icon: FileText, href: "/konten" },
  { id: "profile", label: "Profile", icon: User, href: "/profile" },
]

const notifications = [
  { id: 1, message: "Kamera 2 mendeteksi gerakan mencurigakan", time: "5 menit lalu", type: "warning" },
  { id: 2, message: "Sistem diperbarui pada 10:30", time: "1 jam lalu", type: "info" },
  { id: 3, message: "Laporan harian tersedia", time: "2 jam lalu", type: "success" },
  { id: 4, message: "Kamera 4 offline sementara", time: "3 jam lalu", type: "error" },
  { id: 5, message: "Semua sistem berjalan normal", time: "Kemarin", type: "success" },
];

export default function Laporan({ reports = null }) {
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("newest")
  const [currentPage, setCurrentPage] = useState(1)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [activeMenu, setActiveMenu] = useState("laporan")
  const [showNotif, setShowNotif] = useState(false);
  const [showAllNotif, setShowAllNotif] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [filterLokasi, setFilterLokasi] = useState("all");

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

  const sampleData = [
    { id: 1, tanggal: "2025-10-20", deviceId: "D1", lokasi: "Pasar Raya", jumlahDeteksi: 12, akurasi: "94.5%" },
    { id: 2, tanggal: "2025-10-20", deviceId: "D2", lokasi: "Pasar Raya", jumlahDeteksi: 13, akurasi: "88.3%" },
    { id: 3, tanggal: "2025-10-20", deviceId: "D3", lokasi: "Mall Plaza", jumlahDeteksi: 5, akurasi: "76.9%" },
    { id: 4, tanggal: "2025-10-20", deviceId: "D4", lokasi: "Toko Serba Ada", jumlahDeteksi: 7, akurasi: "91.7%" },
    { id: 5, tanggal: "2025-10-19", deviceId: "D5", lokasi: "Pasar Raya", jumlahDeteksi: 8, akurasi: "84.2%" },
    { id: 6, tanggal: "2025-10-19", deviceId: "D6", lokasi: "Mall Plaza", jumlahDeteksi: 12, akurasi: "94.5%" },
    { id: 7, tanggal: "2025-10-19", deviceId: "D7", lokasi: "Toko Serba Ada", jumlahDeteksi: 13, akurasi: "88.3%" },
    { id: 8, tanggal: "2025-10-18", deviceId: "D8", lokasi: "Pasar Raya", jumlahDeteksi: 5, akurasi: "76.9%" },
    { id: 9, tanggal: "2025-10-18", deviceId: "D9", lokasi: "Mall Plaza", jumlahDeteksi: 7, akurasi: "91.7%" },
    { id: 10, tanggal: "2025-10-18", deviceId: "D10", lokasi: "Toko Serba Ada", jumlahDeteksi: 8, akurasi: "84.2%" },
  ]

  const reportData = useMemo(() => {
    if (reports && Array.isArray(reports.data)) return reports.data
    if (reports && Array.isArray(reports)) return reports
    return sampleData
  }, [reports])

  const uniqueLocations = useMemo(() => {
    const locations = [...new Set(reportData.map(r => r.lokasi))];
    return locations;
  }, [reportData]);

  const filteredSortedData = useMemo(() => {
    let data = [...reportData]

    if (filterLokasi !== "all") {
      data = data.filter(r => r.lokasi === filterLokasi);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      data = data.filter(
        (r) =>
          String(r.deviceId).toLowerCase().includes(q) ||
          String(r.lokasi).toLowerCase().includes(q) ||
          String(r.tanggal).toLowerCase().includes(q),
      )
    }

    if (sortBy === "newest") {
      data.sort((a, b) => (a.tanggal < b.tanggal ? 1 : a.tanggal > b.tanggal ? -1 : 0))
    } else {
      data.sort((a, b) => (a.tanggal > b.tanggal ? 1 : a.tanggal < b.tanggal ? -1 : 0))
    }

    return data
  }, [reportData, searchQuery, sortBy, filterLokasi])

  const itemsPerPage = 10
  const totalPages = Math.max(1, Math.ceil(filteredSortedData.length / itemsPerPage))
  const pagedData = filteredSortedData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const stats = useMemo(() => {
    const totalDeteksi = filteredSortedData.reduce((sum, r) => sum + r.jumlahDeteksi, 0);
    const avgAkurasi = filteredSortedData.length > 0 
      ? (filteredSortedData.reduce((sum, r) => sum + parseFloat(r.akurasi), 0) / filteredSortedData.length).toFixed(1) 
      : 0;
    return {
      totalLaporan: filteredSortedData.length,
      totalDeteksi,
      avgAkurasi: avgAkurasi + "%",
      activeDevices: new Set(filteredSortedData.map(r => r.deviceId)).size
    };
  }, [filteredSortedData]);

  const handleExportCSV = () => {
    const csv = [
      ["Tanggal", "Device ID", "Lokasi", "Jumlah Deteksi", "Akurasi Rata-rata"],
      ...filteredSortedData.map((row) => [row.tanggal, row.deviceId, row.lokasi, row.jumlahDeteksi, row.akurasi]),
    ]
      .map((row) => row.join(","))
      .join("\n")

    const blob = new Blob([csv], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "laporan.csv"
    a.click()
  }

  const handleExportPDF = () => {
    alert("Export to PDF functionality would be implemented here")
  }

  const handleExportExcel = () => {
    alert("Export to Excel functionality would be implemented here")
  }

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

  React.useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery, sortBy, filterLokasi])

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
          <div className="bg-white/80 backdrop-blur-lg border-b border-slate-200/50 px-8 py-4 flex justify-between items-center shadow-sm">
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
                  Laporan
                </h1>
                <p className="text-sm text-slate-500 mt-1 flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Kelola dan analisis data laporan perangkat secara real-time
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

          <div className="flex-1 overflow-auto p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { label: "Total Laporan", value: stats.totalLaporan, icon: FileText, color: "from-blue-500 to-blue-600", bg: "from-blue-50 to-blue-100" },
                { label: "Total Deteksi", value: stats.totalDeteksi, icon: TrendingUp, color: "from-emerald-500 to-emerald-600", bg: "from-emerald-50 to-emerald-100" },
                { label: "Akurasi Rata-rata", value: stats.avgAkurasi, icon: BarChart3, color: "from-purple-500 to-purple-600", bg: "from-purple-50 to-purple-100" },
                { label: "Device Aktif", value: stats.activeDevices, icon: Activity, color: "from-orange-500 to-orange-600", bg: "from-orange-50 to-orange-100" },
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
                      placeholder="Cari device ID, lokasi, atau tanggal..."
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
                      value={filterLokasi}
                      onChange={(e) => setFilterLokasi(e.target.value)}
                      className="px-4 py-2.5 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white hover:bg-slate-50 transition-all"
                    >
                      <option value="all">Semua Lokasi</option>
                      {uniqueLocations.map(loc => (
                        <option key={loc} value={loc}>{loc}</option>
                      ))}
                    </select>
                  </div>

                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-slate-600" />
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="px-4 py-2.5 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white hover:bg-slate-50 transition-all"
                    >
                      <option value="newest">Terbaru</option>
                      <option value="oldest">Terlama</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="overflow-hidden rounded-xl border border-slate-200 shadow-lg">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gradient-to-r from-blue-500 to-purple-600">
                        <th className="px-6 py-4 text-left text-sm font-bold text-white">Tanggal</th>
                        <th className="px-6 py-4 text-left text-sm font-bold text-white">Device ID</th>
                        <th className="px-6 py-4 text-left text-sm font-bold text-white">Lokasi</th>
                        <th className="px-6 py-4 text-left text-sm font-bold text-white">Jumlah Deteksi</th>
                        <th className="px-6 py-4 text-left text-sm font-bold text-white">Akurasi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pagedData.map((row, index) => (
                        <tr
                          key={row.id ?? index}
                          onClick={() => setSelectedRow(selectedRow === row.id ? null : row.id)}
                          className={`border-b border-slate-200 transition-all duration-200 cursor-pointer ${
                            selectedRow === row.id 
                              ? "bg-gradient-to-r from-blue-100 to-purple-100" 
                              : index % 2 === 0 
                              ? "bg-white hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50" 
                              : "bg-slate-50/50 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50"
                          }`}
                        >
                          <td className="px-6 py-4 text-sm text-slate-900 font-medium flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-blue-500" />
                            {row.tanggal}
                          </td>
                          <td className="px-6 py-4 text-sm text-slate-900">
                            <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md">
                              {row.deviceId}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-slate-900">
                            <span className="flex items-center gap-2">
                              <MapPin className="w-4 h-4 text-purple-500" />
                              {row.lokasi}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-slate-900">
                            <span className="inline-flex items-center gap-1 font-bold text-lg">
                              <TrendingUp className="w-4 h-4 text-emerald-500" />
                              {row.jumlahDeteksi}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-slate-900">
                            <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold shadow-md ${
                              parseFloat(row.akurasi) >= 90 
                                ? "bg-gradient-to-r from-emerald-500 to-emerald-600 text-white" 
                                : parseFloat(row.akurasi) >= 80 
                                ? "bg-gradient-to-r from-amber-500 to-amber-600 text-white"
                                : "bg-gradient-to-r from-red-500 to-red-600 text-white"
                            }`}>
                              {row.akurasi}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={handleExportCSV}
                  className="group px-5 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-semibold rounded-xl transition-all shadow-lg hover:shadow-xl hover:scale-105 flex items-center gap-2"
                >
                  <Download className="w-5 h-5 group-hover:animate-bounce" />
                  Export CSV
                </button>
                <button
                  onClick={handleExportPDF}
                  className="group px-5 py-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold rounded-xl transition-all shadow-lg hover:shadow-xl hover:scale-105 flex items-center gap-2"
                >
                  <Download className="w-5 h-5 group-hover:animate-bounce" />
                  Export PDF
                </button>
                <button
                  onClick={handleExportExcel}
                  className="group px-5 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold rounded-xl transition-all shadow-lg hover:shadow-xl hover:scale-105 flex items-center gap-2"
                >
                  <Download className="w-5 h-5 group-hover:animate-bounce" />
                  Export Excel
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2.5 text-slate-600 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 rounded-xl transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                {[...Array(Math.min(totalPages, 5)).keys()].map((i) => {
                  const page = i + 1
                  return (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-4 py-2.5 rounded-xl transition-all font-semibold ${
                        currentPage === page 
                          ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg scale-110" 
                          : "text-slate-600 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:scale-105"
                      }`}
                    >
                      {page}
                    </button>
                  )
                })}

                {totalPages > 5 && <span className="px-2 text-slate-600 font-semibold">...</span>}

                {totalPages > 5 && (
                  <button
                    onClick={() => setCurrentPage(totalPages)}
                    className={`px-4 py-2.5 rounded-xl transition-all font-semibold ${
                      currentPage === totalPages 
                        ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg scale-110" 
                        : "text-slate-600 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:scale-105"
                    }`}
                  >
                    {totalPages}
                  </button>
                )}

                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2.5 text-slate-600 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 rounded-xl transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}