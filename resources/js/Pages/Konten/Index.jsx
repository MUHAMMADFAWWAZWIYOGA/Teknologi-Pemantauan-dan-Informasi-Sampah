import { useState } from "react";
import { Head, useForm, router } from "@inertiajs/react";
import { Upload, Trash2 } from "lucide-react";
import SidebarLayout from "@/Layouts/SidebarLayout";

export default function Index({ contents = [], auth }) {
    const [showForm, setShowForm] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteTarget, setDeleteTarget] = useState({ id: null, title: null });
    const { data, setData, post, processing, reset, errors } = useForm({
        title: "",
        type: "infografis",
        image: null,
        description: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('konten.store'), {
            onSuccess: () => {
                setShowForm(false);
                reset();
            },
        });
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
                onFinish: () => closeDeleteModal(),
            });
        }
    };

    return (
        <SidebarLayout
            title="Konten Edukasi"
            active="konten"
            rightActions={
                <button
                    onClick={() => setShowForm(true)}
                    className="bg-emerald-500 text-white px-4 py-2 rounded-lg hover:bg-emerald-600 flex items-center gap-2"
                >
                    <Upload className="w-4 h-4" />
                    Tambah Konten
                </button>
            }
        >
            <Head title="Manajemen Konten Edukasi" />

            <div className="max-w-7xl mx-auto space-y-8">
                {/* Form Modal */}
                {showForm && (
                                <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                                    <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl">
                                        <h3 className="text-xl font-semibold text-slate-900 mb-4">Tambah Konten Edukasi</h3>
                                        <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700">
                                                    Judul
                                                </label>
                                                <input
                                                    type="text"
                                                    className="mt-1 block w-full rounded-lg border-slate-200 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-slate-900 placeholder:text-slate-400"
                                                    value={data.title}
                                                    onChange={(e) => setData('title', e.target.value)}
                                                    placeholder="Masukkan judul konten"
                                                    required
                                                />
                                                {errors.title && (
                                                    <div className="text-red-600 text-sm mt-1 font-medium">{errors.title}</div>
                                                )}
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-slate-700">
                                                    Tipe Konten
                                                </label>
                                                <select
                                                    className="mt-1 block w-full rounded-lg border-slate-200 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-slate-900"
                                                    value={data.type}
                                                    onChange={(e) => setData('type', e.target.value)}
                                                >
                                                    <option value="infografis">Infografis</option>
                                                    <option value="poster">Poster</option>
                                                </select>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-slate-700">
                                                    Upload Gambar
                                                </label>
                                                <div className="mt-1">
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                                        onChange={(e) => setData('image', e.target.files[0])}
                                                        required
                                                    />
                                                </div>
                                                {errors.image && (
                                                    <div className="text-red-600 text-sm mt-1 font-medium">{errors.image}</div>
                                                )}
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-slate-700">
                                                    Deskripsi
                                                </label>
                                                <div className="mt-1">
                                                    <textarea
                                                        className="block w-full rounded-lg border-slate-200 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-slate-900 placeholder:text-slate-400"
                                                        rows="3"
                                                        value={data.description}
                                                        onChange={(e) => setData('description', e.target.value)}
                                                        placeholder="Masukkan deskripsi konten"
                                                        required
                                                    ></textarea>
                                                </div>
                                                {errors.description && (
                                                    <div className="text-red-600 text-sm mt-1 font-medium">{errors.description}</div>
                                                )}
                                            </div>

                                            <div className="flex justify-end gap-3">
                                                <button
                                                    type="button"
                                                    onClick={() => setShowForm(false)}
                                                    className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors font-medium"
                                                >
                                                    Batal
                                                </button>
                                                <button
                                                    type="submit"
                                                    disabled={processing}
                                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                                                >
                                                    {processing ? 'Menyimpan...' : 'Simpan Konten'}
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            )}

                            {/* Content Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {contents.map((content) => (
                                    <div
                                        key={content.id}
                                        className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-slate-100"
                                    >
                                        <div className="aspect-w-16 aspect-h-9 bg-slate-100 rounded-xl overflow-hidden mb-4">
                                            <img
                                                src={content.imageUrl}
                                                alt={content.title}
                                                className="object-cover w-full h-full"
                                            />
                                        </div>
                                        <div className="space-y-4">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <h3 className="font-semibold text-lg text-slate-900">
                                                        {content.title}
                                                    </h3>
                                                    <span className="inline-block bg-blue-50 text-blue-600 text-xs px-2.5 py-1 rounded-full mt-1 font-medium">
                                                        {content.type}
                                                    </span>
                                                </div>
                                                <button
                                                    onClick={() => openDeleteModal(content.id, content.title)}
                                                    className="p-2 text-slate-400 hover:text-red-500 hover:bg-slate-50 rounded-lg transition-all"
                                                >
                                                    <Trash2 className="w-5 h-5" />
                                                </button>
                                            </div>
                                            <p className="text-slate-600 text-sm">
                                                {content.description}
                                            </p>
                                            <div className="flex justify-between items-center pt-2 border-t border-slate-100">
                                                <span className="text-xs text-slate-500">
                                                    {content.createdAt}
                                                </span>
                                                <div className="flex items-center">
                                                    <span
                                                        className={`inline-block w-2 h-2 rounded-full mr-2 ${
                                                            content.active
                                                                ? "bg-emerald-500 shadow-lg"
                                                                : "bg-slate-300"
                                                        }`}
                                                    ></span>
                                                    <span className="text-xs font-medium text-slate-700">
                                                        {content.active ? "Aktif" : "Nonaktif"}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                {/* Delete Confirmation Modal */}
                {showDeleteModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
                        <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl">
                            <h3 className="text-xl font-semibold text-slate-900">Hapus Konten</h3>
                            <p className="text-slate-600 mt-2">
                                Apakah Anda yakin ingin menghapus konten: <strong className="text-slate-900">{deleteTarget.title}</strong>?
                                Tindakan ini tidak dapat dibatalkan.
                            </p>
                            <div className="mt-6 flex justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={closeDeleteModal}
                                    className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors font-medium"
                                >
                                    Batal
                                </button>
                                <button
                                    type="button"
                                    onClick={confirmDelete}
                                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium shadow-sm"
                                >
                                    Hapus Konten
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </SidebarLayout>
    );
}