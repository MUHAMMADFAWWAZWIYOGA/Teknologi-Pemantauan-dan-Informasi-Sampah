// resources/js/Pages/Pemantauan.jsx
import React, { useState } from "react";
import { ChevronRight, Mail, Bell } from "lucide-react";
import { Link } from "@inertiajs/react";

const cameras = [
  { id: 1, name: "KAMERA 1", location: "Area Pasar Baru" },
  { id: 2, name: "KAMERA 2", location: "Area Pasar Baru" },
  { id: 3, name: "KAMERA 3", location: "Area Pasar Baru" },
  { id: 4, name: "KAMERA 4", location: "Area Pasar Baru" },
];

export default function Pemantauan() {
  // contoh state notifikasi (buat badge dinamis)
  const [notifCount] = useState(3);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
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
          <Link href="/laporan" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-lg transition">LAPORAN</Link>
          <Link href="/pemantauan" className="flex items-center gap-3 px-4 py-3 text-blue-600 bg-blue-50 rounded-lg transition">PEMANTAUAN</Link>
          <Link href="/profile" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-lg transition">PROFILE</Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {/* Top Bar */}
        <div className="bg-white border-b border-gray-200 px-8 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">DAFTAR PEMANTAUAN KAMERA</h1>
            <p className="text-sm text-gray-400">kamera pantauan di kota padang</p>
          </div>

          <div className="flex items-center gap-4">
            <button
              aria-label="messages"
              className="p-2 hover:bg-gray-100 rounded-lg"
              type="button"
            >
              <Mail className="w-6 h-6 text-gray-600" />
            </button>

            <button
              aria-label="notifications"
              className="p-2 hover:bg-gray-100 rounded-lg relative"
              type="button"
            >
              <Bell className="w-6 h-6 text-gray-600" />
              {notifCount > 0 && (
                <span className="absolute top-1 right-1 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center text-white text-[10px]">
                  {/* small dot; if you want number, replace with notifCount */}
                </span>
              )}
            </button>

            <div className="flex items-center gap-2 pl-4 border-l border-gray-200">
              <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-white font-bold">
                U
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-medium text-gray-900">Admin</p>
                <p className="text-xs text-gray-500">Admin account</p>
              </div>
            </div>
          </div>
        </div>

        {/* Content area */}
        <div className="flex-1 p-10 overflow-auto">
          {/* Kamera Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {cameras.map((cam) => (
              <article
                key={cam.id}
                className="relative bg-white rounded-2xl shadow-md overflow-hidden"
              >
                {/* placeholder image (ganti src sesuai asset project) */}
                <img
                  src="/cctv-sample.jpg"
                  alt={cam.name}
                  className="w-full h-44 md:h-52 object-cover grayscale"
                />

                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-gray-800">{cam.name}</div>
                      <div className="text-xs text-gray-500 mt-1">{cam.location}</div>
                    </div>

                    <Link href={`/pemantauan/${cam.id}`} className="ml-4">
                      <div className="bg-white rounded-full shadow p-2 hover:bg-gray-50">
                        <ChevronRight className="text-green-600 w-5 h-5" />
                      </div>
                    </Link>
                  </div>

                  <div className="mt-3 flex items-center gap-3 text-sm text-gray-600">
                    <span className="inline-block px-2 py-1 bg-green-50 text-green-700 rounded-full text-xs">Online</span>
                    <span className="text-xs">Last seen 2h ago</span>
                  </div>

                  <div className="mt-4 flex items-center gap-2">
                    <button className="px-3 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700">
                      Live View
                    </button>
                    <button className="px-3 py-2 border border-gray-200 rounded-lg text-sm hover:bg-gray-50">
                      History
                    </button>
                    <button className="px-3 py-2 border border-gray-200 rounded-lg text-sm hover:bg-gray-50">
                      Details
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
