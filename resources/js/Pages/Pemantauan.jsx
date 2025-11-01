import React, { useState } from "react";
import { ChevronRight, ChevronLeft, Mail, Bell, LayoutDashboard, BarChart3, Eye, User, } from "lucide-react";
import { Head, Link } from "@inertiajs/react";

const cameras = [
  { id: 1, name: "KAMERA 1", location: "Area Pasar Baru" },
  { id: 2, name: "KAMERA 2", location: "Area Pasar Baru" },
  { id: 3, name: "KAMERA 3", location: "Area Pasar Baru" },
  { id: 4, name: "KAMERA 4", location: "Area Pasar Baru" },
];

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
  { id: "laporan", label: "Laporan", icon: BarChart3, href: "/laporan" },
  { id: "pemantauan", label: "Pemantauan", icon: Eye, href: "/pemantauan" },
  { id: "profile", label: "Profile", icon: User, href: "/profile" },
]

export default function Pemantauan() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeMenu, setActiveMenu] = useState(3);
  const [notifCount] = useState(3);

  return (
    <>
      <Head title="Pemantauan" />
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
            <button
              onClick={() => setSidebarOpen(false)}
              className="p-1 hover:bg-slate-100 rounded-lg transition"
            >
              <ChevronLeft className="w-5 h-5 text-slate-400" />
            </button>
          )}
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${activeMenu === item.id
                  ? "text-blue-600 bg-blue-50 shadow-sm"
                  : "text-slate-600 hover:bg-slate-50"
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
              <p className="text-sm text-slate-500 mt-1">
                Kelola dan analisis data laporan perangkat
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
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
        </div>

        <main className="flex-1 p-10 overflow-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {cameras.map((cam) => (
              <article
                key={cam.id}
                className="relative bg-white rounded-2xl shadow-md overflow-hidden"
              >
                <img
                  src="/cctv-sample.jpg"
                  alt={cam.name}
                  className="w-full h-44 md:h-52 object-cover grayscale"
                />
                <div className="p-4">
                  <div className="flex items-center justify-end">
                    <Link href={`/pemantauan/${cam.id}`} className="ml-4">
                      <div className="bg-white rounded-full shadow p-2 hover:bg-gray-50">
                        <ChevronRight className="text-green-600 w-5 h-5" />
                      </div>
                    </Link>
                  </div>
                  <div className="flex items-center justify-center">
                    <div>
                      <div className="text-xs font-bold text-gray-800 p-3">
                        {cam.name}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {cam.location}
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 flex items-center justify-center gap-3 text-sm text-gray-600">
                    <span className="inline-block px-2 py-1 bg-green-50 text-green-700 rounded-full text-xs">
                      Online
                    </span>
                    <span className="text-xs">Last seen 2h ago</span>
                  </div>

                  <div className="mt-4 flex items-center justify-center gap-2">
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
        </main>
      </div>
    </div>
    </>
  );
}
