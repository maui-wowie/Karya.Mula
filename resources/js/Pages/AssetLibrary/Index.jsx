import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import { Trash2, Eye, Download } from 'lucide-react';

export default function Index({ auth, assets }) {
    const handleDelete = (assetId) => {
        if (confirm('Apakah Anda yakin ingin menghapus asset ini?')) {
            router.delete(route('api.assets.destroy', assetId));
        }
    };

    const handleView = (assetId) => {
        router.get(route('studio.create', { asset_id: assetId }));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Perpustakaan Aset
                </h2>
            }
        >
            <Head title="Perpustakaan Aset" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-xl sm:rounded-lg p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-gray-800">Perpustakaan Aset</h2>
                            <Link
                                href={route('studio.index')}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                            >
                                Kembali ke Studio
                            </Link>
                        </div>

                        {assets.length === 0 ? (
                            <div className="text-center py-12">
                                <p className="text-gray-500 mb-4">Belum ada asset yang disimpan</p>
                                <Link
                                    href={route('studio.create')}
                                    className="text-blue-600 hover:underline"
                                >
                                    Buat desain baru
                                </Link>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {assets.map((asset) => (
                                    <div
                                        key={asset.id}
                                        className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition"
                                    >
                                        <div className="aspect-video bg-gray-100 flex items-center justify-center">
                                            {asset.thumbnail_url ? (
                                                <img
                                                    src={asset.thumbnail_url}
                                                    alt={asset.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <div className="text-gray-400 text-4xl">📄</div>
                                            )}
                                        </div>
                                        <div className="p-4">
                                            <h3 className="font-semibold text-gray-800 mb-1 truncate">
                                                {asset.name}
                                            </h3>
                                            <p className="text-sm text-gray-500 mb-3">
                                                Disimpan: {new Date(asset.created_at).toLocaleDateString('id-ID')}
                                            </p>
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => handleView(asset.id)}
                                                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm"
                                                >
                                                    <Eye size={16} />
                                                    Lihat
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(asset.id)}
                                                    className="flex items-center justify-center gap-2 px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition text-sm"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
