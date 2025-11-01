import React, { useState, useMemo } from 'react';
import { Head, Link } from '@inertiajs/react';
import { ChevronRight, ChevronLeft, Mail, Bell } from "lucide-react";

export default function Laporan({ reports = null }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [currentPage, setCurrentPage] = useState(1);

  const sampleData = [
    { id: 1, tanggal: '2025-10-20', deviceId: 'D1', lokasi: 'Pasar Raya', jumlahDeteksi: 12, akurasi: '94.5%' },
    { id: 2, tanggal: '2025-10-20', deviceId: 'D2', lokasi: 'Pasar Raya', jumlahDeteksi: 13, akurasi: '88.3%' },
    { id: 3, tanggal: '2025-10-20', deviceId: 'D3', lokasi: 'Pasar Raya', jumlahDeteksi: 5, akurasi: '76.9%' },
    { id: 4, tanggal: '2025-10-20', deviceId: 'D4', lokasi: 'Pasar Raya', jumlahDeteksi: 7, akurasi: '91.7%' },
    { id: 5, tanggal: '2025-10-20', deviceId: 'D5', lokasi: 'Pasar Raya', jumlahDeteksi: 8, akurasi: '84.2%' },
    { id: 6, tanggal: '2025-10-20', deviceId: 'D6', lokasi: 'Pasar Raya', jumlahDeteksi: 12, akurasi: '94.5%' },
    { id: 7, tanggal: '2025-10-20', deviceId: 'D7', lokasi: 'Pasar Raya', jumlahDeteksi: 13, akurasi: '88.3%' },
    { id: 8, tanggal: '2025-10-20', deviceId: 'D8', lokasi: 'Pasar Raya', jumlahDeteksi: 5, akurasi: '76.9%' },
    { id: 9, tanggal: '2025-10-20', deviceId: 'D9', lokasi: 'Pasar Raya', jumlahDeteksi: 7, akurasi: '91.7%' },
    { id: 10, tanggal: '2025-10-20', deviceId: 'D10', lokasi: 'Pasar Raya', jumlahDeteksi: 8, akurasi: '84.2%' },
  ];

  const reportData = useMemo(() => {
    if (reports && Array.isArray(reports.data)) return reports.data;
    if (reports && Array.isArray(reports)) return reports;
    return sampleData;
  }, [reports]);

  const itemsPerPage = 10;
  const totalPages = Math.max(1, Math.ceil(reportData.length / itemsPerPage));

  const handleExportCSV = () => {
    const csv = [
      ['Tanggal', 'Device ID', 'Lokasi', 'Jumlah Deteksi', 'Akurasi Rata-rata'],
      ...reportData.map(row => [row.tanggal, row.deviceId, row.lokasi, row.jumlahDeteksi, row.akurasi])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'laporan.csv';
    a.click();
  };

  const handleExportPDF = () => {
    alert('Export to PDF functionality would be implemented here');
  };

  const handleExportExcel = () => {
    alert('Export to Excel functionality would be implemented here');
  };

  return (
    <>
      <Head title="Laporan" />

      <div className="flex h-screen bg-gray-50">
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
            <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-lg transition">DASHBOARD</Link>
            <Link href="/laporan" className="flex items-center gap-3 px-4 py-3 text-blue-600 bg-blue-50 rounded-lg transition">LAPORAN</Link>
            <Link href="/pemantauan" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-lg transition">PEMANTAUAN</Link>
            <Link href="/profile" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-lg transition">PROFILE</Link>
          </nav>
        </div>

        <div className="flex-1 flex flex-col">
          <div className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-900">Laporan</h1>
            <div className="flex items-center gap-6">
              <button className="p-4 hover:bg-gray-100 rounded-lg">
              <Mail className="w-6 h-6 text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg relative">
              <Bell className="w-6 h-6 text-gray-600" />
              <span className="absolute top-1 right-1 w-3 h-3 bg-red-500 rounded-full"></span>
            </button>
              <div className="flex items-center gap-2 pl-4 border-l border-gray-200">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-user-icon lucide-circle-user"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="10" r="3"/><path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662"/></svg>
              <div>
                <p className="text-sm font-medium text-gray-900">Admin</p>
                <p className="text-xs text-gray-500">Admin account</p>
              </div>
            </div>
            </div>
          </div>

          <div className="flex-1 overflow-auto p-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex-1 max-w-md">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                >
                  <option value="newest">Newest</option>
                  <option value="oldest">Oldest</option>
                </select>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-100 border-b border-gray-200">
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Tanggal</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Device ID</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Lokasi</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Jumlah Deteksi</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Akurasi Rata-rata</th>
                  </tr>
                </thead>
                <tbody>
                  {reportData.map((row, index) => (
                    <tr key={row.id ?? index} className={`border-b border-gray-200 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-gray-100`}>
                      <td className="px-6 py-4 text-sm text-gray-900">{row.tanggal}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{row.deviceId}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{row.lokasi}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{row.jumlahDeteksi}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{row.akurasi}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex items-center justify-between mt-8">
              <div className="flex gap-3">
                <button onClick={handleExportCSV} className="px-4 py-2 bg-teal-500 hover:bg-teal-600 text-white font-semibold rounded-lg">Export to CSV</button>
                <button onClick={handleExportPDF} className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg">Export to PDF</button>
                <button onClick={handleExportExcel} className="px-4 py-2 bg-teal-500 hover:bg-teal-600 text-white font-semibold rounded-lg">Export to Excel (XLSX)</button>            
              </div>

              <div className="flex items-center gap-2">
                <button className="px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">&lt;</button>
                {[...Array(Math.min(totalPages, 4)).keys()].map(i => {
                  const page = i + 1;
                  return (
                    <button key={page} onClick={() => setCurrentPage(page)} className={`px-3 py-2 rounded-lg ${currentPage === page ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}>
                      {page}
                    </button>
                  );
                })}
                <span className="px-2 text-gray-600">...</span>
                <button className="px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">40</button>
                <button className="px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">&gt;</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}