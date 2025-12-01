import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import ShopNav from './Partials/ShopNav';
import ShippingModal from './Partials/ShippingModal';

export default function ShopOrderHistory({ auth, orders }) {
    const [showShippingModal, setShowShippingModal] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [statusFilter, setStatusFilter] = useState('all');

    const handleAddShipping = (order) => {
        setSelectedOrder(order);
        setShowShippingModal(true);
    };

    const handleFilterChange = (status) => {
        setStatusFilter(status);
        router.get(route('shop.orders'), { status }, {
            preserveState: true,
            preserveScroll: true
        });
    };

    const getFilteredOrders = () => {
        if (statusFilter === 'all') return orders;
        return orders.filter(order => order.status_raw === statusFilter);
    };

    const filteredOrders = getFilteredOrders();
    const processingCount = orders.filter(o => o.status_raw === 'processing').length;

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Riwayat Pesanan</h2>}
        >
            <Head title="Riwayat Pesanan" />

            <ShopNav />

            <div className="py-6">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {/* Filter Tabs */}
                    <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                        <button 
                            onClick={() => handleFilterChange('all')}
                            className={`px-6 py-2 rounded-full font-medium whitespace-nowrap ${statusFilter === 'all' ? 'bg-white border border-blue-500 text-blue-500' : 'bg-blue-600 text-white shadow-md'}`}
                        >
                            Semua
                        </button>
                        <button 
                            onClick={() => handleFilterChange('pending')}
                            className={`px-6 py-2 rounded-full font-medium whitespace-nowrap ${statusFilter === 'pending' ? 'bg-white border border-blue-500 text-blue-500' : 'bg-blue-600 text-white shadow-md'}`}
                        >
                            Menunggu Konfirmasi
                        </button>
                        <button 
                            onClick={() => handleFilterChange('processing')}
                            className={`px-6 py-2 rounded-full font-medium whitespace-nowrap ${statusFilter === 'processing' ? 'bg-white border border-blue-500 text-blue-500' : 'bg-blue-600 text-white shadow-md'}`}
                        >
                            Perlu Dikirim ({processingCount})
                        </button>
                        <button 
                            onClick={() => handleFilterChange('shipped')}
                            className={`px-6 py-2 rounded-full font-medium whitespace-nowrap ${statusFilter === 'shipped' ? 'bg-white border border-blue-500 text-blue-500' : 'bg-blue-600 text-white shadow-md'}`}
                        >
                            Dikirim
                        </button>
                        <button 
                            onClick={() => handleFilterChange('completed')}
                            className={`px-6 py-2 rounded-full font-medium whitespace-nowrap ${statusFilter === 'completed' ? 'bg-white border border-blue-500 text-blue-500' : 'bg-blue-600 text-white shadow-md'}`}
                        >
                            Selesai
                        </button>
                    </div>

                    {/* Order List */}
                    <div className="space-y-6">
                        {filteredOrders.length > 0 ? filteredOrders.map((order) => (
                            <div key={order.id} className="bg-blue-500 text-white rounded-xl overflow-hidden shadow-lg">
                                <div className="p-6">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <h3 className="text-2xl font-bold">Pesanan #{order.id}</h3>
                                            <p className="text-blue-100">Pemesan: {order.buyer_name} ({order.courier})</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-blue-100">Waktu: {order.date}</p>
                                            {order.shipping_receipt && (
                                                <p className="text-sm text-blue-100 mt-1">Resi: {order.shipping_receipt}</p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex gap-4 mb-4 bg-blue-600/30 p-4 rounded-lg">
                                        {/* Placeholder Image */}
                                        <div className="w-32 h-32 bg-gray-300 rounded-lg flex-shrink-0 bg-cover bg-center" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1627123424574-724758594e93?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60')` }}></div>
                                        <div>
                                            {order.items.map((item, index) => (
                                                <div key={index} className="mb-1">
                                                    <p className="font-semibold text-lg">{item.quantity}x {item.name}</p>
                                                </div>
                                            ))}
                                            <p className="mt-2 text-sm opacity-90">Total: Rp {order.total_price.toLocaleString('id-ID')} (termasuk ongkir)</p>
                                        </div>
                                    </div>

                                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm">Status:</span>
                                            <span className="flex items-center gap-1 font-bold text-yellow-300">
                                                <span className="w-3 h-3 bg-yellow-300 rounded-full"></span>
                                                {order.status}
                                            </span>
                                        </div>
                                        <div className="flex gap-2 w-full md:w-auto">
                                            <a 
                                                href={`mailto:${order.buyer_name.toLowerCase().replace(' ', '')}@example.com`}
                                                className="flex-1 md:flex-none bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg font-bold transition text-center"
                                            >
                                                Hubungi Pembeli
                                            </a>
                                            {order.status_raw === 'processing' && !order.shipping_receipt && (
                                                <button 
                                                    onClick={() => handleAddShipping(order)}
                                                    className="flex-1 md:flex-none bg-blue-300 hover:bg-blue-400 text-blue-900 px-6 py-2 rounded-lg font-bold transition"
                                                >
                                                    Input Resi
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )) : (
                            <div className="text-center py-12 bg-white rounded-xl shadow">
                                <p className="text-gray-500">Tidak ada pesanan ditemukan</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <ShippingModal 
                show={showShippingModal}
                onClose={() => setShowShippingModal(false)}
                order={selectedOrder}
            />
        </AuthenticatedLayout>
    );
}
