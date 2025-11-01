"use client"
import React, { useState, useMemo, useRef, useEffect } from "react"
import { Head, Link } from "@inertiajs/react"
import { 
  ChevronRight, 
  ChevronLeft, 
  Mail, 
  Bell, 
  LayoutDashboard, 
  BarChart3, 
  Eye, 
  User, 
  X 
} from "lucide-react"

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
  { id: "laporan", label: "Laporan", icon: BarChart3, href: "/laporan" },
  { id: "pemantauan", label: "Pemantauan", icon: Eye, href: "/pemantauan" },
  { id: "profile", label: "Profile", icon: User, href: "/profile" },
]

const notifications = [
  { id: 1, message: " Kamera 2 mendeteksi gerakan mencurigakan", time: "5 menit lalu" },
  { id: 2, message: " Sistem diperbarui pada 10:30", time: "1 jam lalu" },
  { id: 3, message: " Laporan harian tersedia", time: "2 jam lalu" },
  { id: 4, message: " Kamera 4 offline sementara", time: "3 jam lalu" },
  { id: 5, message: " Semua sistem berjalan normal", time: "Kemarin" },
];

export default function Laporan({ reports = null }) {
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("newest")
  const [currentPage, setCurrentPage] = useState(1)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [activeMenu, setActiveMenu] = useState("laporan")
  const [showNotif, setShowNotif] = useState(false);
  const [showAllNotif, setShowAllNotif] = useState(false);

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
    { id: 3, tanggal: "2025-10-20", deviceId: "D3", lokasi: "Pasar Raya", jumlahDeteksi: 5, akurasi: "76.9%" },
    { id: 4, tanggal: "2025-10-20", deviceId: "D4", lokasi: "Pasar Raya", jumlahDeteksi: 7, akurasi: "91.7%" },
    { id: 5, tanggal: "2025-10-20", deviceId: "D5", lokasi: "Pasar Raya", jumlahDeteksi: 8, akurasi: "84.2%" },
    { id: 6, tanggal: "2025-10-20", deviceId: "D6", lokasi: "Pasar Raya", jumlahDeteksi: 12, akurasi: "94.5%" },
    { id: 7, tanggal: "2025-10-20", deviceId: "D7", lokasi: "Pasar Raya", jumlahDeteksi: 13, akurasi: "88.3%" },
    { id: 8, tanggal: "2025-10-20", deviceId: "D8", lokasi: "Pasar Raya", jumlahDeteksi: 5, akurasi: "76.9%" },
    { id: 9, tanggal: "2025-10-20", deviceId: "D9", lokasi: "Pasar Raya", jumlahDeteksi: 7, akurasi: "91.7%" },
    { id: 10, tanggal: "2025-10-20", deviceId: "D10", lokasi: "Pasar Raya", jumlahDeteksi: 8, akurasi: "84.2%" },
  ]

  const reportData = useMemo(() => {
    if (reports && Array.isArray(reports.data)) return reports.data
    if (reports && Array.isArray(reports)) return reports
    return sampleData
  }, [reports])

  const filteredSortedData = useMemo(() => {
    let data = [...reportData]

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
  }, [reportData, searchQuery, sortBy])

  const itemsPerPage = 10
  const totalPages = Math.max(1, Math.ceil(filteredSortedData.length / itemsPerPage))
  const pagedData = filteredSortedData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

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

  React.useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery, sortBy])

  return (
    <>
      <Head title="Laporan" />
      <div className="flex h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <div
          className={`${sidebarOpen ? "w-64" : "w-20"} bg-white border-r border-slate-200 flex flex-col shadow-lg transition-all duration-300`}
        >
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <div className={`flex items-center gap-3 ${!sidebarOpen && "justify-center w-full"}`}>
              <img
                src="/assets/logo_tapis.png"
                alt="Logo Hijau.ID"
                className="w-20 h-20 object-contain"
              />

              {sidebarOpen && (
                <span className="font-bold text-2xl bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
                  Tapis.id
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
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${activeMenu === item.id ? "text-blue-600 bg-blue-50 shadow-sm" : "text-slate-600 hover:bg-slate-50"
                  }`}
                onClick={() => setActiveMenu(item.id)}
              >
                <item.icon className="w-5 h-5" />
                {sidebarOpen && <span className="text-xl font-semibold">{item.label}</span>}
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
                  className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  <ChevronRight className="w-5 h-5 text-slate-600" />
                </button>
              )}
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent">
                  Laporan
                </h1>
                <p className="text-sm text-slate-500 mt-1">Kelola dan analisis data laporan perangkat</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button className="p-2.5 hover:bg-slate-100 rounded-lg transition-colors">
                <Mail className="w-5 h-5 text-slate-600" />
              </button>

              <div className="relative">
                <button
                  onClick={() => setShowNotif(!showNotif)}
                  className="p-2.5 hover:bg-slate-100 rounded-lg transition-colors relative"
                >
                  <Bell className="w-5 h-5 text-slate-600" />
                  <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full shadow-lg"></span>
                </button>

                {showNotif && (
                  <div className="absolute right-0 mt-2 w-72 bg-white shadow-xl rounded-lg border border-slate-200 z-50">
                    <div className="px-4 py-3 border-b border-slate-100 font-semibold text-slate-700">
                      Notifikasi
                    </div>
                    <ul className="max-h-60 overflow-y-auto">
                      {notifications.slice(0, 3).map((notif) => (
                        <li
                          key={notif.id}
                          className="px-4 py-2 text-sm text-slate-600 hover:bg-slate-50"
                        >
                          {notif.message}
                          <div className="text-xs text-slate-400">
                            {notif.time}
                          </div>
                        </li>
                      ))}
                    </ul>
                    <div className="px-4 py-2 text-center border-t border-slate-100">
                      <button
                        onClick={() => {
                          setShowAllNotif(true);
                          setShowNotif(false);
                        }}
                        className="text-blue-600 text-sm font-medium hover:underline"
                      >
                        Lihat Semua
                      </button>
                    </div>
                  </div>
                )}
              </div>

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

          {showAllNotif && (
            <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
              <div className="bg-white w-[90%] md:w-[70%] rounded-xl shadow-2xl">
                <div className="flex justify-between items-center border-b px-6 py-4">
                  <h2 className="text-lg font-semibold text-slate-800">Semua Notifikasi</h2>
                  <button
                    onClick={() => setShowAllNotif(false)}
                    className="p-2 hover:bg-slate-100 rounded-full"
                  >
                    <X className="w-5 h-5 text-slate-600" />
                  </button>
                </div>
                <div className="max-h-[800px] overflow-y-auto">
                  {notifications.map((notif) => (
                    <div
                      key={notif.id}
                      className="px-6 py-3 border-b hover:bg-slate-50 transition text-slate-700 text-sm"
                    >
                      {notif.message}
                      <div className="text-xs text-slate-400 mt-0.5">{notif.time}</div>
                    </div>
                  ))}
                </div>
                <div className="p-4 text-center">
                  <button
                    onClick={() => setShowAllNotif(false)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700"
                  >
                    Tutup
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="flex-1 overflow-auto p-8">
            <div className="flex items-center justify-between mb-6 bg-white rounded-lg p-4 shadow-sm border border-slate-100">
              <div className="flex-1 max-w-md">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Cari device ID, lokasi, atau tanggal..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 ml-6">
                <span className="text-sm text-slate-600 font-medium">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="newest">Newest</option>
                  <option value="oldest">Oldest</option>
                </select>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-slate-100 hover:shadow-lg transition-all duration-300 overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-blue-50 to-slate-50 border-b border-slate-200">
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Tanggal</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Device ID</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Lokasi</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Jumlah Deteksi</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Akurasi Rata-rata</th>
                  </tr>
                </thead>
                <tbody>
                  {pagedData.map((row, index) => (
                    <tr
                      key={row.id ?? index}
                      className={`border-b border-slate-200 transition-colors ${index % 2 === 0 ? "bg-white" : "bg-slate-50"} hover:bg-blue-50`}
                    >
                      <td className="px-6 py-4 text-sm text-slate-900">{row.tanggal}</td>
                      <td className="px-6 py-4 text-sm text-slate-900">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {row.deviceId}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-900">{row.lokasi}</td>
                      <td className="px-6 py-4 text-sm text-slate-900 font-medium">{row.jumlahDeteksi}</td>
                      <td className="px-6 py-4 text-sm text-slate-900">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                          {row.akurasi}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex items-center justify-between mt-8">
              <div className="flex gap-3">
                <button
                  onClick={handleExportCSV}
                  className="px-4 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-lg transition-colors shadow-sm"
                >
                  Export to CSV
                </button>
                <button
                  onClick={handleExportPDF}
                  className="px-4 py-2.5 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg transition-colors shadow-sm"
                >
                  Export to PDF
                </button>
                <button
                  onClick={handleExportExcel}
                  className="px-4 py-2.5 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-colors shadow-sm"
                >
                  Export to Excel
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  className="px-3 py-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  {"<"}
                </button>

                {[...Array(Math.min(totalPages, 4)).keys()].map((i) => {
                  const page = i + 1
                  return (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-3 py-2 rounded-lg transition-all ${currentPage === page ? "bg-blue-600 text-white shadow-md" : "text-slate-600 hover:bg-slate-100"}`}
                    >
                      {page}
                    </button>
                  )
                })}

                {totalPages > 4 && <span className="px-2 text-slate-600">...</span>}

                {totalPages > 4 && (
                  <button
                    onClick={() => setCurrentPage(totalPages)}
                    className="px-3 py-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                  >
                    {totalPages}
                  </button>
                )}

                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  className="px-3 py-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  {">"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}