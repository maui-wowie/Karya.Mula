import React from 'react';
import { useForm } from '@inertiajs/react';

export default function ShippingModal({ show, onClose, order }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        shipping_receipt: '',
        shipping_courier: order?.courier || 'JNE - Reguler'
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        
        post(route('shop.orders.shipping', order.id), {
            onSuccess: () => {
                reset();
                onClose();
            }
        });
    };

    if (!show || !order) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl max-w-md w-full">
                <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-gray-900">
                            Input Nomor Resi
                        </h2>
                        <button 
                            onClick={onClose}
                            className="text-gray-400 hover:text-gray-600 transition"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <div className="mb-4 p-4 bg-blue-50 rounded-lg">
                        <p className="text-sm text-gray-600">Pesanan #{order.id}</p>
                        <p className="font-semibold">{order.buyer_name}</p>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="space-y-4">
                            {/* Courier */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Kurir
                                </label>
                                <input
                                    type="text"
                                    value={data.shipping_courier}
                                    onChange={e => setData('shipping_courier', e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="JNE - Reguler"
                                />
                                {errors.shipping_courier && <p className="text-red-500 text-sm mt-1">{errors.shipping_courier}</p>}
                            </div>

                            {/* Receipt Number */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Nomor Resi <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={data.shipping_receipt}
                                    onChange={e => setData('shipping_receipt', e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Masukkan nomor resi..."
                                    required
                                />
                                {errors.shipping_receipt && <p className="text-red-500 text-sm mt-1">{errors.shipping_receipt}</p>}
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-3 mt-6">
                            <button
                                type="button"
                                onClick={onClose}
                                className="flex-1 px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium"
                                disabled={processing}
                            >
                                Batal
                            </button>
                            <button
                                type="submit"
                                className="flex-1 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium disabled:opacity-50"
                                disabled={processing}
                            >
                                {processing ? 'Menyimpan...' : 'Simpan'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
