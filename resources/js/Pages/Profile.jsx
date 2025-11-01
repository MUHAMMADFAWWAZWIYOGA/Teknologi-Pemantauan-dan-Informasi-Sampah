import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import { Mail, Bell } from 'lucide-react';

export default function Profile({ user: propUser = null }) {
  const [isEditing, setIsEditing] = useState(false);
  const [notifCount] = useState(2);
  const [activeMenu, setActiveMenu] = useState('profile');

  const user = propUser ?? {
    name: 'KING ZHUKUR #92132',
    fullName: 'IRFAN TRIANDA PUTRA',
    phone: '0813-7838-3969',
    email: 'irfantrianda1213@gmail.com',
    role: 'ADMIN',
    avatar: 'https://via.placeholder.com/200/5B7CFA/FFFFFF?text=Profile',
  };

  return (
    <>
      <Head title="Profile" />

      <div className="flex h-screen bg-gray-50">
        {/* Sidebar */}
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
            <Link
              href="/dashboard"
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                activeMenu === 'dashboard'
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
              onClick={() => setActiveMenu('dashboard')}
            >
              DASHBOARD
            </Link>
            <Link
              href="/laporan"
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                activeMenu === 'laporan'
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
              onClick={() => setActiveMenu('laporan')}
            >
              LAPORAN
            </Link>
            <Link
              href="/pemantauan"
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                activeMenu === 'pemantauan'
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
              onClick={() => setActiveMenu('pemantauan')}
            >
              PEMANTAUAN
            </Link>
            <Link
              href="/profile"
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                activeMenu === 'profile'
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
              onClick={() => setActiveMenu('profile')}
            >
              PROFILE
            </Link>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Top Bar */}
          <div className="bg-white border-b border-gray-200 px-8 py-4 flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">PROFILE</h1>

            <div className="flex items-center gap-4">
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <Mail className="w-6 h-6 text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg relative">
                <Bell className="w-6 h-6 text-gray-600" />
                {notifCount > 0 && (
                  <span className="absolute top-1 right-1 w-3 h-3 bg-red-500 rounded-full"></span>
                )}
              </button>
              <div className="flex items-center gap-2 pl-4 border-l border-gray-200">
                <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center text-white font-semibold">
                  U
                </div>
                <div className="hidden sm:block">
                  <p className="text-sm font-medium text-gray-900">Admin</p>
                  <p className="text-xs text-gray-500">Admin account</p>
                </div>
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-auto flex items-center justify-center p-8">
            <div className="bg-white rounded-lg shadow-lg p-12 max-w-2xl w-full">
              <div className="flex justify-center mb-8 relative">
                <img
                  src={user.avatar}
                  alt="Profile"
                  className="w-48 h-48 rounded-full object-cover border-4 border-blue-500"
                />
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-green-400 text-white px-4 py-1 rounded-full text-sm font-semibold">
                  {user.role}
                </div>
              </div>

              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">{user.name}</h2>
                <p className="text-gray-600 text-lg mb-4">{user.fullName}</p>
                <div className="space-y-2 mb-6">
                  <p className="text-gray-700">
                    <span className="font-semibold">Phone:</span> {user.phone}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-semibold">Email:</span>{' '}
                    <a href={`mailto:${user.email}`} className="text-blue-600 hover:underline">
                      {user.email}
                    </a>
                  </p>
                </div>
              </div>

              <div className="flex justify-center">
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full transition transform hover:scale-105"
                >
                  EDIT PROFILE
                </button>
              </div>

              {isEditing && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                  <div className="bg-white rounded-lg p-8 max-w-md w-full">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">Edit Profile</h3>
                    <form className="space-y-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Full Name
                        </label>
                        <input
                          type="text"
                          defaultValue={user.fullName}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Phone
                        </label>
                        <input
                          type="tel"
                          defaultValue={user.phone}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Email
                        </label>
                        <input
                          type="email"
                          defaultValue={user.email}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div className="flex gap-3 mt-6">
                        <button
                          type="button"
                          onClick={() => setIsEditing(false)}
                          className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition"
                        >
                          Save
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
    </>
  );
}
