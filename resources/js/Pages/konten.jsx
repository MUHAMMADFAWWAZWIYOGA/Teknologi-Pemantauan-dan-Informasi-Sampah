import { ChevronRight, ChevronLeft, Bell, LayoutDashboard, BarChart3, Eye, FileText, User, X, Upload, Trash2, Activity, Clock, Edit, Image as ImageIcon } from "lucide-react"
import React, { useState, useRef, useEffect } from "react"
import { Head, router, useForm } from "@inertiajs/react"

const notifications = [
  { id: 1, message: "Kamera 2 mendeteksi gerakan mencurigakan", time: "5 menit lalu", type: "warning" },
  { id: 2, message: "Sistem diperbarui pada 10:30", time: "1 jam lalu", type: "info" },
  { id: 3, message: "Laporan harian tersedia", time: "2 jam lalu", type: "success" },
  { id: 4, message: "Kamera 4 offline sementara", time: "3 jam lalu", type: "error" },
  { id: 5, message: "Semua sistem berjalan normal", time: "Kemarin", type: "success" },
];

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
  { id: "laporan", label: "Laporan", icon: BarChart3, href: "/laporan" },
  { id: "pemantauan", label: "Pemantauan", icon: Eye, href: "/pemantauan" },
  { id: "konten", label: "Konten", icon: FileText, href: "/konten" },
  { id: "profile", label: "Profile", icon: User, href: "/profile" },
]

export default function Konten({ contents = [] }) {
  const [activeMenu, setActiveMenu] = useState("konten")
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [showNotif, setShowNotif] = useState(false);
  const [showAllNotif, setShowAllNotif] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editingContent, setEditingContent] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState({ id: null, title: null });
  const [imagePreview, setImagePreview] = useState(null);

  const notifRef = useRef(null);
  const fileInputRef = useRef(null);
  
  const { data, setData, post, put, processing, errors, reset } = useForm({
    title: "",
    type: "infografis",
    image: null,
    description: "",
    is_active: true,
  });

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setShowNotif(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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

  const formatDate = (dateString) => {
    if (!dateString) return "Tanggal tidak tersedia";
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return "Hari ini";
    if (diffDays === 1) return "Kemarin";
    if (diffDays < 7) return `${diffDays} hari lalu`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} minggu lalu`;
    return date.toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setData('image', file);
      // Preview image
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const openForm = () => {
    reset();
    setEditingContent(null);
    setImagePreview(null);
    setShowForm(true);
  };

  const openEditForm = (content) => {
    setEditingContent(content);
    setData({
      title: content.title || "",
      type: content.type || "infografis",
      image: null,
      description: content.description || "",
      is_active: content.active !== undefined ? content.active : true,
    });
    setImagePreview(content.imageUrl || null);
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingContent(null);
    setImagePreview(null);
    reset();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingContent) {
      put(route('konten.update', editingContent.id), {
        onSuccess: () => {
          closeForm();
        },
        forceFormData: true,
      });
    } else {
      post(route('konten.store'), {
        onSuccess: () => {
          closeForm();
        },
        forceFormData: true,
      });
    }
  };

  const openDeleteModal = (id, title) => {
    setDeleteTarget({ id, title });
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setDeleteTarget({ id: null, title: null });
    setShowDeleteModal(false);
  };

  const confirmDelete = () => {
    if (deleteTarget.id) {
      router.delete(route('konten.destroy', deleteTarget.id), {
        onSuccess: () => {
          closeDeleteModal();
        },
      });
    }
  };

  const toggleActive = (id, currentStatus) => {
    router.patch(route('konten.toggle-active', id), {
      is_active: !currentStatus
    }, {
      preserveState: true,
      preserveScroll: true,
    });
  };

  return (
    <>
      <Head title="Konten Edukasi" />
      <div className="flex h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
        <div
          className={`${sidebarOpen ? "w-64" : "w-20"} bg-white/80 backdrop-blur-lg border-r border-slate-200/50 flex flex-col shadow-xl transition-all duration-300`}
        >
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <div className={`flex items-center gap-3 ${!sidebarOpen && "justify-center w-full"}`}>
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-xl">T</span>
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></div>
              </div>
              {sidebarOpen && (
                <span className="font-bold text-2xl bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 bg-clip-text text-transparent">
                  Tapis.id
                </span>
              )}
            </div>
            {sidebarOpen && (
              <button onClick={() => setSidebarOpen(false)} className="p-1 hover:bg-slate-100 rounded-lg transition-all hover:scale-110">
                <ChevronLeft className="w-5 h-5 text-slate-400" />
              </button>
            )}
          </div>

          <nav className="flex-1 px-4 py-6 space-y-2">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                  activeMenu === item.id 
                    ? "text-blue-600 bg-gradient-to-r from-blue-50 to-purple-50 shadow-md scale-105" 
                    : "text-slate-600 hover:bg-gradient-to-r hover:from-slate-50 hover:to-blue-50 hover:scale-105"
                }`}
                onClick={() => setActiveMenu(item.id)}
              >
                <item.icon className={`w-5 h-5 transition-transform group-hover:scale-110 ${activeMenu === item.id ? "animate-pulse" : ""}`} />
                {sidebarOpen && <span className="text-base font-semibold">{item.label}</span>}
              </a>
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
                  Konten Edukasi
                </h1>
                <p className="text-sm text-slate-500 mt-1 flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Kelola konten edukasi dan materi pembelajaran
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={openForm}
                className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-4 py-2.5 rounded-xl hover:from-emerald-600 hover:to-emerald-700 flex items-center gap-2 shadow-lg hover:scale-105 transition-all"
              >
                <Upload className="w-4 h-4" />
                Tambah Konten
              </button>
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

          {showForm && (
            <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
              <div className="bg-white/95 backdrop-blur-lg rounded-2xl p-6 w-full max-w-md shadow-2xl max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold text-slate-900">
                    {editingContent ? "Edit Konten Edukasi" : "Tambah Konten Edukasi"}
                  </h3>
                  <button
                    onClick={closeForm}
                    className="p-2 hover:bg-slate-100 rounded-full transition-all hover:scale-110"
                  >
                    <X className="w-5 h-5 text-slate-600" />
                  </button>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Judul <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all text-slate-900 placeholder:text-slate-400"
                      value={data.title}
                      onChange={(e) => setData('title', e.target.value)}
                      placeholder="Masukkan judul konten"
                      required
                    />
                    {errors.title && (
                      <p className="text-red-500 text-xs mt-1">{errors.title}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Tipe Konten <span className="text-red-500">*</span>
                    </label>
                    <select
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all text-slate-900"
                      value={data.type}
                      onChange={(e) => setData('type', e.target.value)}
                      required
                    >
                      <option value="infografis">Infografis</option>
                      <option value="poster">Poster</option>
                    </select>
                    {errors.type && (
                      <p className="text-red-500 text-xs mt-1">{errors.type}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      {editingContent ? "Ubah Gambar (opsional)" : "Upload Gambar"} <span className="text-red-500">*</span>
                    </label>
                    {imagePreview && (
                      <div className="mb-3 relative bg-slate-50 rounded-xl border-2 border-slate-200 p-2">
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="w-full h-auto max-h-[400px] object-contain rounded-lg mx-auto"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setImagePreview(null);
                            setData('image', null);
                            if (fileInputRef.current) fileInputRef.current.value = '';
                          }}
                          className="absolute top-3 right-3 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-all shadow-lg"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                    {!imagePreview && editingContent?.imageUrl && (
                      <div className="mb-3 relative bg-slate-50 rounded-xl border-2 border-slate-200 p-2">
                        <img
                          src={editingContent.imageUrl}
                          alt="Current"
                          className="w-full h-auto max-h-[400px] object-contain rounded-lg mx-auto"
                        />
                        <div className="absolute inset-0 bg-black/30 rounded-xl flex items-center justify-center">
                          <span className="bg-white/90 px-3 py-1 rounded-full text-sm font-medium text-slate-900">Gambar Saat Ini</span>
                        </div>
                      </div>
                    )}
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      className="w-full text-sm text-slate-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-medium file:bg-gradient-to-r file:from-blue-50 file:to-purple-50 file:text-blue-700 hover:file:from-blue-100 hover:file:to-purple-100 file:transition-all"
                      onChange={handleImageChange}
                      required={!editingContent}
                    />
                    {errors.image && (
                      <p className="text-red-500 text-xs mt-1">{errors.image}</p>
                    )}
                    <p className="text-xs text-slate-500 mt-1">Format: JPEG, PNG, JPG, GIF (Maks. 2MB)</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Deskripsi <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all text-slate-900 placeholder:text-slate-400"
                      rows={4}
                      value={data.description}
                      onChange={(e) => setData('description', e.target.value)}
                      placeholder="Masukkan deskripsi konten"
                      required
                    ></textarea>
                    {errors.description && (
                      <p className="text-red-500 text-xs mt-1">{errors.description}</p>
                    )}
                  </div>

                  {editingContent && (
                    <div>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={data.is_active}
                          onChange={(e) => setData('is_active', e.target.checked)}
                          className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                        />
                        <span className="text-sm font-medium text-slate-700">Aktifkan Konten</span>
                      </label>
                    </div>
                  )}

                  <div className="flex justify-end gap-3 pt-2">
                    <button
                      type="button"
                      onClick={closeForm}
                      className="px-4 py-2.5 bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200 transition-all font-medium"
                    >
                      Batal
                    </button>
                    <button
                      type="submit"
                      disabled={processing}
                      className="px-4 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all font-medium shadow-lg hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {processing ? "Menyimpan..." : editingContent ? "Update Konten" : "Simpan Konten"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {showDeleteModal && (
            <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
              <div className="bg-white/95 backdrop-blur-lg rounded-2xl max-w-md w-full p-6 shadow-2xl">
                <h3 className="text-xl font-semibold text-slate-900">Hapus Konten</h3>
                <p className="text-slate-600 mt-2">
                  Apakah Anda yakin ingin menghapus konten: <strong className="text-slate-900">{deleteTarget.title}</strong>?
                  Tindakan ini tidak dapat dibatalkan.
                </p>
                <div className="mt-6 flex justify-end gap-3">
                  <button
                    onClick={closeDeleteModal}
                    className="px-4 py-2.5 bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200 transition-all font-medium"
                  >
                    Batal
                  </button>
                  <button
                    onClick={confirmDelete}
                    className="px-4 py-2.5 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl hover:from-red-700 hover:to-red-800 transition-all font-medium shadow-lg hover:scale-105"
                  >
                    Hapus Konten
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="flex-1 overflow-auto p-8">
            <div className="max-w-7xl mx-auto">
              {contents.length === 0 ? (
                <div className="text-center py-16">
                  <ImageIcon className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                  <p className="text-slate-500 text-lg font-semibold">Belum ada konten edukasi</p>
                  <p className="text-slate-400 text-sm mt-2">Klik tombol "Tambah Konten" untuk menambahkan konten pertama</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {contents.map((content) => (
                    <div
                      key={content.id}
                      className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-slate-100/50 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 group"
                    >
                      <div className="bg-slate-100 rounded-xl overflow-hidden mb-4 relative flex items-center justify-center min-h-[200px] max-h-[600px]">
                        {content.imageUrl ? (
                          <img
                            src={content.imageUrl}
                            alt={content.title}
                            className="w-full h-auto max-h-[600px] object-contain rounded-xl group-hover:scale-105 transition-transform duration-300"
                            onError={(e) => {
                              e.target.src = 'https://via.placeholder.com/400x300?text=Gambar+Tidak+Tersedia';
                            }}
                          />
                        ) : (
                          <div className="w-full h-[200px] flex items-center justify-center bg-gradient-to-br from-slate-200 to-slate-300">
                            <ImageIcon className="w-12 h-12 text-slate-400" />
                          </div>
                        )}
                      </div>
                      <div className="space-y-4">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <h3 className="font-semibold text-lg text-slate-900 mb-2">
                              {content.title}
                            </h3>
                            <span className="inline-block bg-gradient-to-r from-blue-50 to-purple-50 text-blue-600 text-xs px-2.5 py-1 rounded-full font-medium capitalize">
                              {content.type}
                            </span>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => openEditForm(content)}
                              className="p-2 text-slate-400 hover:text-blue-500 hover:bg-blue-50 rounded-xl transition-all hover:scale-110"
                              title="Edit konten"
                            >
                              <Edit className="w-5 h-5" />
                            </button>
                            <button
                              onClick={() => openDeleteModal(content.id, content.title)}
                              className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all hover:scale-110"
                              title="Hapus konten"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                        <p className="text-slate-600 text-sm leading-relaxed line-clamp-3">
                          {content.description}
                        </p>
                        <div className="flex justify-between items-center pt-4 border-t border-slate-100">
                          <span className="text-xs text-slate-500 font-medium">
                            {formatDate(content.createdAt)}
                          </span>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => toggleActive(content.id, content.active)}
                              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                                content.active
                                  ? "bg-emerald-500 focus:ring-emerald-500"
                                  : "bg-slate-300 focus:ring-slate-400"
                              }`}
                            >
                              <span
                                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                  content.active ? "translate-x-6" : "translate-x-1"
                                }`}
                              />
                            </button>
                            <span className="text-xs font-medium text-slate-700">
                              {content.active ? "Aktif" : "Nonaktif"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}