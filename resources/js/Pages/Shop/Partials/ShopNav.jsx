import React from 'react';
import { Link, usePage } from '@inertiajs/react';

export default function ShopNav() {
    const { url } = usePage();

    const navItems = [
        { name: 'Dashboard', route: 'shop.index', url: '/toko-saya' },
        { name: 'Produk', route: 'shop.products', url: '/toko-saya/produk' },
        { name: 'Pesanan', route: 'shop.orders', url: '/toko-saya/pesanan' },
    ];

    return (
        <div className="bg-white border-b border-gray-200 mb-6 mt-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex space-x-8">
                    {navItems.map((item) => (
                        <Link
                            key={item.name}
                            href={route(item.route)}
                            className={`
                                inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium leading-5 transition duration-150 ease-in-out py-4
                                ${url === item.url || url.startsWith(item.url + '/') 
                                    ? 'border-blue-500 text-gray-900 focus:outline-none focus:border-blue-700' 
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300'}
                            `}
                        >
                            {item.name}
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
