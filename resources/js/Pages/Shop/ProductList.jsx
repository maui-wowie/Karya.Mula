import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import ShopNav from './Partials/ShopNav';
import ProductFormModal from './Partials/ProductFormModal';

export default function ShopProductList({ auth, products }) {
    const [showModal, setShowModal] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');

    const handleAddProduct = () => {
        setEditingProduct(null);
        setShowModal(true);
    };

    const handleEditProduct = (product) => {
        setEditingProduct(product);
        setShowModal(true);
    };

    const handleDeleteProduct = (productId, productName) => {
        if (confirm(`Apakah Anda yakin ingin menghapus produk "${productName}"?`)) {
            router.delete(route('shop.products.delete', productId));
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(route('shop.products'), { search: searchTerm, status: statusFilter }, {
            preserveState: true,
            preserveScroll: true
        });
    };

    const handleFilterChange = (status) => {
        setStatusFilter(status);
        router.get(route('shop.products'), { search: searchTerm, status }, {
            preserveState: true,
            preserveScroll: true
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Daftar Produk Saya</h2>}
        >
            <Head title="Daftar Produk" />

            <ShopNav />

            <div className="py-6">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {/* Search and Filter */}
                    <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                        <form onSubmit={handleSearch} className="flex gap-2 w-full md:w-1/3">
                            <div className="relative flex-1">
                                <input 
                                    type="text" 
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    placeholder="Cari nama produk..." 
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:ring-blue-500 focus:border-blue-500"
                                />
                              
                            </div>
                            <button 
                                type="submit"
                                className="px-6 py-2 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition whitespace-nowrap"
                            >
                                Cari
                            </button>
                        </form>
                        <div className="flex gap-2 w-full md:w-auto overflow-x-auto">
                            <button 
                                onClick={() => handleFilterChange('all')}
                                className={`px-6 py-2 rounded-full font-medium whitespace-nowrap ${statusFilter === 'all' ? 'bg-white border border-blue-500 text-blue-500' : 'bg-blue-600 text-white'}`}
                            >
                                Semua
                            </button>
                            <button 
                                onClick={() => handleFilterChange('active')}
                                className={`px-6 py-2 rounded-full font-medium shadow-md whitespace-nowrap ${statusFilter === 'active' ? 'bg-white border border-blue-500 text-blue-500' : 'bg-blue-600 text-white'}`}
                            >
                                Aktif
                            </button>
                            <button 
                                onClick={() => handleFilterChange('out_of_stock')}
                                className={`px-6 py-2 rounded-full font-medium shadow-md whitespace-nowrap ${statusFilter === 'out_of_stock' ? 'bg-white border border-blue-500 text-blue-500' : 'bg-blue-600 text-white'}`}
                            >
                                Habis
                            </button>
                        </div>
                    </div>

                    <div className="flex justify-end mb-4">
                        <button 
                            onClick={handleAddProduct}
                            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 shadow-md transition"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            Tambah Produk
                        </button>
                    </div>

                    {/* Product Table */}
                    <div className="bg-blue-50 rounded-xl overflow-hidden shadow-sm">
                        <table className="min-w-full divide-y divide-blue-100">
                            <thead className="bg-blue-100">
                                <tr>
                                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">Info Produk</th>
                                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">Harga</th>
                                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">Stok</th>
                                    <th className="px-6 py-4 text-right text-sm font-bold text-gray-700 uppercase tracking-wider">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="bg-blue-50 divide-y divide-blue-100">
                                {products.length > 0 ? products.map((product) => (
                                    <tr key={product.id} className="hover:bg-blue-100/50 transition">
                                        <td className="px-6 py-4">
                                            <div className="text-sm font-medium text-gray-900">{product.name}</div>
                                            <div className="text-sm text-gray-500">SKU: {product.sku || '-'}</div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-700">
                                            Rp {product.price.toLocaleString('id-ID')}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-700">
                                            <div className="flex items-center gap-2">
                                                {product.stock}
                                                {product.stock_alert && (
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                                                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                                    </svg>
                                                )}
                                                {product.stock === 0 && (
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                                                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                                    </svg>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right text-sm font-medium">
                                            <button 
                                                onClick={() => handleEditProduct(product)}
                                                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded-md mr-2 transition"
                                            >
                                                Edit
                                            </button>
                                            <button 
                                                onClick={() => handleDeleteProduct(product.id, product.name)}
                                                className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-md transition"
                                            >
                                                Hapus
                                            </button>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan="4" className="px-6 py-8 text-center text-gray-500">
                                            Tidak ada produk ditemukan
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <ProductFormModal 
                show={showModal}
                onClose={() => setShowModal(false)}
                product={editingProduct}
            />
        </AuthenticatedLayout>
    );
}
