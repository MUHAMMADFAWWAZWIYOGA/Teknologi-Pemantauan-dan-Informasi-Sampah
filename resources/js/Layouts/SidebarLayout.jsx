import React, { useState } from 'react'
import { Link, usePage } from '@inertiajs/react'
import { ChevronRight, ChevronLeft, Mail, Bell, LayoutDashboard, BarChart3, Eye, FileText, User } from 'lucide-react'

export default function SidebarLayout({ title, rightActions = null, children, active = 'konten' }) {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const user = usePage().props.auth.user;

    const navItems = [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
        { id: 'laporan', label: 'Laporan', icon: BarChart3, href: '/laporan' },
        { id: 'pemantauan', label: 'Pemantauan', icon: Eye, href: '/pemantauan' },
        { id: 'konten', label: 'Konten', icon: FileText, href: '/konten' },
        { id: 'profile', label: 'Profile', icon: User, href: '/profile' },
    ];

    return (
        <div className="flex h-screen bg-gradient-to-br from-slate-50 to-slate-100">
            <div className={`${sidebarOpen ? "w-64" : "w-20"} bg-white border-r border-slate-200 flex flex-col shadow-lg transition-all duration-300`}>
                <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                    <div className={`flex items-center gap-3 ${!sidebarOpen && "justify-center w-full"}`}>
                        <img
                            src="/assets/logo_tapis.png"
                            alt="Logo Tapis.ID"
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
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        return (
                            <Link
                                key={item.id}
                                href={item.href}
                                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                                    active === item.id ? "text-blue-600 bg-blue-50 shadow-sm" : "text-slate-600 hover:bg-slate-50"
                                }`}
                            >
                                <Icon className="w-5 h-5" />
                                {sidebarOpen && <span className="text-sm font-medium">{item.label}</span>}
                            </Link>
                        );
                    })}
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
                                {title}
                            </h1>
                            <p className="text-sm text-slate-500 mt-1">Kelola konten edukasi dan bahan informasi</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        {rightActions}
                        
                        <button className="p-2.5 hover:bg-slate-100 rounded-lg transition-colors">
                            <Mail className="w-5 h-5 text-slate-600" />
                        </button>
                        <button className="p-2.5 hover:bg-slate-100 rounded-lg transition-colors relative">
                            <Bell className="w-5 h-5 text-slate-600" />
                            <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full shadow-lg"></span>
                        </button>

                        <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
                                <span className="text-white font-semibold text-sm">
                                    {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                                </span>
                            </div>
                            <div className="hidden sm:block">
                                <p className="text-sm font-semibold text-slate-900">{user?.name ?? 'User'}</p>
                                <p className="text-xs text-slate-500">{user?.email ?? ''}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex-1 overflow-auto p-8">{children}</div>
            </div>
        </div>
    );
}
