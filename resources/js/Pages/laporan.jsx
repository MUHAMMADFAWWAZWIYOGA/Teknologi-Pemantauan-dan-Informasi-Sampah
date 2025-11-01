"use client"

import React, { useState, useMemo } from "react"
import { Link } from "@inertiajs/react"
import { ChevronRight, ChevronLeft, Mail, Bell, LayoutDashboard, BarChart3, Eye, User } from "lucide-react"

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
  { id: "laporan", label: "Laporan", icon: BarChart3, href: "/laporan" },
  { id: "pemantauan", label: "Pemantauan", icon: Eye, href: "/pemantauan" },
  { id: "profile", label: "Profile", icon: User, href: "/profile" },
]

export default function Laporan({ reports = null }) {
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("newest")
  const [currentPage, setCurrentPage] = useState(1)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [activeMenu, setActiveMenu] = useState("laporan")

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
    <div className="flex h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div
        className={`${sidebarOpen ? "w-64" : "w-20"} bg-white border-r border-slate-200 flex flex-col shadow-lg transition-all duration-300`}
      >
        {/* Logo Section */}
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
  )
}
