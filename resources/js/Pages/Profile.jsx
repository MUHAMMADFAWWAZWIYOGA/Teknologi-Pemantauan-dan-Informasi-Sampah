"use client"

import { useState } from "react"
import { Link } from "@inertiajs/react"
import { Mail, Bell, ChevronLeft, ChevronRight, LayoutDashboard, BarChart3, Eye, User } from "lucide-react"

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
  { id: "laporan", label: "Laporan", icon: BarChart3, href: "/laporan" },
  { id: "pemantauan", label: "Pemantauan", icon: Eye, href: "/pemantauan" },
  { id: "profile", label: "Profile", icon: User, href: "/profile" },
]

// Data pengguna default
const defaultUser = {
  name: "KING ZHUKUR #92132",
  fullName: "IRFAN TRIANDA PUTRA",
  phone: "0813-7838-3969",
  email: "irfantrianda1213@gmail.com",
  role: "ADMIN",
  avatar: "https://via.placeholder.com/200/5B7CFA/FFFFFF?text=Profile",
}

export default function Profile({ user: propUser = null }) {
  const initialUser = propUser ?? defaultUser

  const [user, setUser] = useState(initialUser)
  const [isEditing, setIsEditing] = useState(false)
  const [editedUser, setEditedUser] = useState(initialUser)

  const [notifCount] = useState(2)
  const [activeMenu, setActiveMenu] = useState("profile")
  const [sidebarOpen, setSidebarOpen] = useState(true)

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

  return (
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
                className="p-2.5 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <ChevronRight className="w-5 h-5 text-slate-600" />
              </button>
            )}
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent">
                PROFILE
              </h1>
              <p className="text-sm text-slate-500 mt-1">Kelola informasi akun Anda</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2.5 hover:bg-slate-100 rounded-lg transition-colors">
              <Mail className="w-5 h-5 text-slate-600" />
            </button>
            <button className="p-2.5 hover:bg-slate-100 rounded-lg transition-colors relative">
              <Bell className="w-5 h-5 text-slate-600" />
              {notifCount > 0 && <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full shadow-lg"></span>}
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
          <div className="flex items-center justify-center">
            <div className="bg-white rounded-lg shadow-xl p-12 max-w-2xl w-full border border-slate-100">
              <div className="flex justify-center mb-8 relative">
                <img
                  src={user.avatar || "/placeholder.svg"}
                  alt="Profile"
                  className="w-48 h-48 rounded-full object-cover border-4 border-blue-500 shadow-md"
                />
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-emerald-500 text-white px-4 py-1 rounded-full text-sm font-semibold shadow-lg">
                  {user.role}
                </div>
              </div>

              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-slate-900 mb-2">{user.name}</h2>
                <p className="text-slate-600 text-lg mb-4">{user.fullName}</p>
                <div className="space-y-3 bg-slate-50 p-4 rounded-lg border border-slate-100">
                  <p className="text-slate-700">
                    <span className="font-semibold text-slate-900">Phone:</span> {user.phone}
                  </p>
                  <p className="text-slate-700">
                    <span className="font-semibold text-slate-900">Email:</span>{" "}
                    <a href={`mailto:${user.email}`} className="text-blue-600 hover:underline">
                      {user.email}
                    </a>
                  </p>
                </div>
              </div>

              <div className="flex justify-center">
                <button
                  onClick={handleEditClick}
                  className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full transition transform hover:scale-105 shadow-lg"
                >
                  EDIT PROFILE
                </button>
              </div>

              {isEditing && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                  <div className="bg-white rounded-xl p-8 max-w-md w-full shadow-2xl">
                    <h3 className="text-2xl font-bold text-slate-900 mb-6 border-b pb-3">Edit Profile</h3>
                    <form className="space-y-5" onSubmit={handleSave}>
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Full Name</label>
                        <input
                          type="text"
                          name="fullName"
                          value={editedUser.fullName}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Phone</label>
                        <input
                          type="tel"
                          name="phone"
                          value={editedUser.phone}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Email</label>
                        <input
                          type="email"
                          name="email"
                          value={editedUser.email}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                        />
                      </div>
                      <div className="flex gap-3 pt-4">
                        <button
                          type="button"
                          onClick={handleCancel}
                          className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 font-semibold rounded-lg hover:bg-slate-100 transition shadow-sm"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition shadow-md"
                        >
                          Save Changes
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
