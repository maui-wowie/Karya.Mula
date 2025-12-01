import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import ShopNav from './Partials/ShopNav';

export default function ShopDashboard({ auth, stats, orders }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Toko Saya</h2>}
        >
            <Head title="Toko Saya" />

            <ShopNav />

            <div className="py-6">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {/* Header Shop Info */}
                    <div className="bg-blue-600 rounded-lg p-6 mb-6 text-white flex justify-between items-center shadow-lg">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-white/20 rounded-full">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                                </svg>
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold">Toko SGE</h1>
                                <p className="text-sm opacity-90">status: <span className="text-green-300 font-bold">buka</span></p>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <button className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </button>
                            <button className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Statistics */}
                    <h3 className="text-xl font-bold text-blue-600 mb-4">Statistik Penting (Hari Ini):</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        {/* Pendapatan */}
                        <div className="bg-blue-500 text-white p-6 rounded-xl shadow-md">
                            <h4 className="text-lg font-semibold mb-2">Pendapatan</h4>
                            <div className="flex items-center gap-2 mb-1">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span className="text-2xl font-bold">Rp. {stats.revenue.toLocaleString('id-ID')}</span>
                            </div>
                            <div className="flex items-center text-sm opacity-90">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                </svg>
                                +15% dari kemarin
                            </div>
                        </div>

                        {/* Pesanan Baru */}
                        <div className="bg-blue-500 text-white p-6 rounded-xl shadow-md">
                            <h4 className="text-lg font-semibold mb-2">Pesanan Baru</h4>
                            <div className="flex items-center gap-2 mb-1">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                </svg>
                                <span className="text-2xl font-bold">{stats.newOrders} pesanan</span>
                            </div>
                            <div className="flex items-center text-sm opacity-90">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                Perlu Dikirim
                            </div>
                        </div>

                        {/* Produk Dilihat */}
                        <div className="bg-blue-500 text-white p-6 rounded-xl shadow-md">
                            <h4 className="text-lg font-semibold mb-2">Produk Dilihat</h4>
                            <div className="flex items-center gap-2 mb-1">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                                <span className="text-2xl font-bold">{stats.views}x</span>
                            </div>
                            <div className="flex items-center text-sm opacity-90">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                                </svg>
                                -5% dari kemarin
                            </div>
                        </div>
                    </div>

                    {/* Orders to Process */}
                    <h3 className="text-xl font-bold text-blue-600 mb-4">Pesanan Perlu Diproses (Prioritas):</h3>
                    <div className="space-y-4">
                        {orders.map((order) => (
                            <div key={order.id} className="bg-blue-500 text-white p-6 rounded-xl shadow-md flex justify-between items-center">
                                <div>
                                    <h4 className="text-xl font-bold">ID #{order.id} - {order.buyer_name}</h4>
                                    <p className="text-sm opacity-90 mt-1">{order.items_summary} • Rp {order.total_price.toLocaleString('id-ID')}</p>
                                    <p className="text-sm mt-1">Status: <span className="text-yellow-300 font-bold">[ {order.status} ]</span></p>
                                </div>
                                <button 
                                    onClick={() => router.post(route('shop.orders.accept', order.id))}
                                    className="bg-white text-blue-600 px-6 py-2 rounded-lg font-bold hover:bg-gray-100 transition"
                                >
                                    Terima Pesanan
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
