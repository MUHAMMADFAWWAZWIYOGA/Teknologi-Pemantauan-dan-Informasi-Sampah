import { useState, useRef, useEffect } from "react"
import { Head, Link } from "@inertiajs/react"
import { Bell, ChevronLeft, ChevronRight, LayoutDashboard, BarChart3, Eye, User, FileText, Activity, Clock, X, Edit, LogOut, Phone, AtSign, Shield, Camera } from "lucide-react"

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

const defaultUser = {
  name: "KING ZHUKUR #92132",
  fullName: "IRFAN TRIANDA PUTRA",
  phone: "0813-7838-3969",
  email: "irfantrianda1213@gmail.com",
  role: "ADMIN",
  avatar: "/assets/person2_placeholder.jpg",
}

export default function Profile({ user: propUser = null }) {
  const initialUser = propUser ?? defaultUser

  const [user, setUser] = useState(initialUser)
  const [isEditing, setIsEditing] = useState(false)
  const [editedUser, setEditedUser] = useState(initialUser)
  const [activeMenu, setActiveMenu] = useState("profile")
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)
  const [showNotif, setShowNotif] = useState(false);
  const [showAllNotif, setShowAllNotif] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);

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

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setEditedUser(prev => ({ ...prev, [name]: value }))
  }

  const handleEditClick = () => {
    setEditedUser(user)
    setIsEditing(true)
  }

  const handleSave = (e) => {
    e.preventDefault()
    setUser(editedUser)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setIsEditing(false)
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

  return (
    <>
      <Head>
        <title>Profile | TAPIS.id</title>
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
            <span className={`font-bold text-2xl bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 bg-clip-text text-transparent whitespace-nowrap overflow-hidden transition-all duration-500 ease-in-out ${
              sidebarOpen ? "opacity-100 max-w-[200px] ml-0" : "opacity-0 max-w-0 ml-0"
            }`}>
              TAPIS.id
            </span>
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
                Profile
              </h1>
              <p className="text-sm text-slate-500 mt-1 flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Kelola informasi akun Anda dengan mudah
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

        <div className="flex-1 overflow-auto p-8">
          <div className="max-w-5xl mx-auto space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div 
                className="lg:col-span-1 bg-white/80 backdrop-blur-lg rounded-2xl p-8 shadow-xl border border-slate-100/50 hover:shadow-2xl transition-all duration-300"
                onMouseEnter={() => setHoveredCard('profile')}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className="flex flex-col items-center">
                  <div className="relative group mb-6">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur-xl opacity-30 group-hover:opacity-50 transition-all"></div>
                    <img
                      src={user.avatar || "/placeholder.svg"}
                      alt="Profile"
                      className={`relative w-40 h-40 rounded-full object-cover border-4 border-white shadow-2xl transition-all duration-300 ${hoveredCard === 'profile' ? 'scale-110' : ''}`}
                    />
                    <button className="absolute bottom-2 right-2 p-2.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full text-white shadow-lg hover:shadow-xl transition-all hover:scale-110">
                      <Camera className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <div className="w-full space-y-3 text-center">
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      {user.name}
                    </h2>
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full shadow-lg">
                      <Shield className="w-4 h-4 text-white" />
                      <span className="text-white font-bold text-sm">{user.role}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-2 space-y-6">
                <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-8 shadow-xl border border-slate-100/50 hover:shadow-2xl transition-all duration-300">
                  <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                    <User className="w-6 h-6 text-blue-600" />
                    Informasi Personal
                  </h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl hover:from-blue-100 hover:to-purple-100 transition-all">
                      <div className="flex items-center gap-3">
                        <div className="p-2.5 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg">
                          <User className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1">
                          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Nama Lengkap</p>
                          <p className="text-base font-bold text-slate-900">{user.fullName}</p>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl hover:from-emerald-100 hover:to-teal-100 transition-all">
                      <div className="flex items-center gap-3">
                        <div className="p-2.5 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-lg">
                          <Phone className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1">
                          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Nomor Telepon</p>
                          <p className="text-base font-bold text-slate-900">{user.phone}</p>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl hover:from-purple-100 hover:to-pink-100 transition-all">
                      <div className="flex items-center gap-3">
                        <div className="p-2.5 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg">
                          <AtSign className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1">
                          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Email Address</p>
                          <a 
                            href={`mailto:${user.email}`} 
                            className="text-base font-bold text-blue-600 hover:text-blue-700 hover:underline transition-colors"
                          >
                            {user.email}
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={handleEditClick}
                    className="flex-1 group px-6 py-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-2xl hover:scale-105 flex items-center justify-center gap-3"
                  >
                    <Edit className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                    EDIT PROFILE
                  </button>

                  <button
                    onClick={() => setShowLogoutConfirm(true)}
                    className="flex-1 group px-6 py-4 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-2xl hover:scale-105 flex items-center justify-center gap-3"
                  >
                    <LogOut className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    LOG OUT
                  </button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { label: "Account Age", value: "2 Years", icon: Clock, color: "from-blue-500 to-blue-600", bg: "from-blue-50 to-blue-100" },
                { label: "Total Reports", value: "1,234", icon: BarChart3, color: "from-emerald-500 to-emerald-600", bg: "from-emerald-50 to-emerald-100" },
                { label: "Active Devices", value: "10", icon: Activity, color: "from-purple-500 to-purple-600", bg: "from-purple-50 to-purple-100" },
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
                  <p className={`text-3xl font-bold bg-gradient-to-br ${stat.color} bg-clip-text text-transparent`}>
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {isEditing && (
            <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl animate-in zoom-in-95">
                <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-200">
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Edit Profile
                  </h3>
                  <button
                    onClick={handleCancel}
                    className="p-2 hover:bg-slate-100 rounded-full transition-all hover:scale-110"
                  >
                    <X className="w-5 h-5 text-slate-600" />
                  </button>
                </div>
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
                      <User className="w-4 h-4 text-blue-600" />
                      Nama Lengkap
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={editedUser.fullName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
                      <Phone className="w-4 h-4 text-emerald-600" />
                      Nomor Telepon
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={editedUser.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
                      <AtSign className="w-4 h-4 text-purple-600" />
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={editedUser.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>
                  <div className="flex gap-3 pt-4">
                    <button
                      type="button"
                      onClick={handleCancel}
                      className="flex-1 px-4 py-3 border-2 border-slate-300 text-slate-700 font-bold rounded-xl hover:bg-slate-100 transition-all shadow-sm hover:scale-105"
                    >
                      Batal
                    </button>
                    <button
                      type="button"
                      onClick={handleSave}
                      className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-xl hover:scale-105"
                    >
                      Simpan
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {showLogoutConfirm && (
            <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
              <div className="bg-white rounded-2xl p-8 max-w-sm w-full shadow-2xl animate-in zoom-in-95">
                <div className="flex justify-center mb-4">
                  <div className="p-4 bg-gradient-to-r from-red-500 to-red-600 rounded-full">
                    <LogOut className="w-8 h-8 text-white" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-slate-900 text-center mb-3">Konfirmasi Logout</h3>
                <p className="text-sm text-slate-600 text-center mb-6">
                  Apakah Anda yakin ingin keluar dari akun?
                </p>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setShowLogoutConfirm(false)}
                    className="flex-1 px-4 py-3 border-2 border-slate-300 rounded-xl text-slate-700 font-bold hover:bg-slate-100 transition-all hover:scale-105"
                  >
                    Batal
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      alert('Logout functionality - integrate with your backend')
                    }}
                    className="flex-1 px-4 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white font-bold rounded-xl hover:from-red-700 hover:to-red-800 transition-all shadow-lg hover:scale-105"
                  >
                    Keluar
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
    </>
  )
}