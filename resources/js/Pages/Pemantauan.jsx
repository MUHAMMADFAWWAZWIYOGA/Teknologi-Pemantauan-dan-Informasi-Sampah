import React, { useState, useEffect, useRef } from "react";
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
  FileText
} from "lucide-react";
import { Head, Link } from "@inertiajs/react";

const cameras = [
  { id: 1, name: "KAMERA 1", location: "Area Pasar Baru" },
  { id: 2, name: "KAMERA 2", location: "Area Pasar Baru" },
  { id: 3, name: "KAMERA 3", location: "Area Pasar Baru" },
  { id: 4, name: "KAMERA 4", location: "Area Pasar Baru" },
];

const notifications = [
  { id: 1, message: " Kamera 2 mendeteksi gerakan mencurigakan", time: "5 menit lalu" },
  { id: 2, message: " Sistem diperbarui pada 10:30", time: "1 jam lalu" },
  { id: 3, message: " Laporan harian tersedia", time: "2 jam lalu" },
  { id: 4, message: " Kamera 4 offline sementara", time: "3 jam lalu" },
  { id: 5, message: " Semua sistem berjalan normal", time: "Kemarin" },
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
  const [activeMenu, setActiveMenu] = useState(3);
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

  return (
    <>
      <Head title="Pemantauan" />
      <div className="flex h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <div
          className={`${
            sidebarOpen ? "w-64" : "w-20"
          } bg-white border-r border-slate-200 flex flex-col shadow-lg transition-all duration-300`}
        >
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <div
              className={`flex items-center gap-3 ${
                !sidebarOpen && "justify-center w-full"
              }`}
            >
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
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  activeMenu === item.id
                    ? "text-blue-600 bg-blue-50 shadow-sm"
                    : "text-slate-600 hover:bg-slate-50"
                }`}
                onClick={() => setActiveMenu(item.id)}
              >
                <item.icon className="w-5 h-5" />
                {sidebarOpen && (
                  <span className="text-xl font-semibold">{item.label}</span>
                )}
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
          <div className="bg-white border-b border-slate-200 px-8 py-4 flex justify-between items-center shadow-sm relative">
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

          
            <div className="flex items-center gap-4" ref={notifRef}>
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
                    <div className="text-center">
                      <div className="text-xs font-bold text-gray-800 p-3">
                        {cam.name}
                      </div>
                      <div className="text-xs text-gray-500">{cam.location}</div>
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
