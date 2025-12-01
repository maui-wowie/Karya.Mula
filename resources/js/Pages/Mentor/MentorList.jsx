import React, { useState } from "react";
import { Head, Link, router } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function MentorList({ auth, mentors, categories, filters }) {
    const [selectedCategory, setSelectedCategory] = useState(filters.category || "");
    const [priceRange, setPriceRange] = useState("");

    const handleFilter = () => {
        const params = {};
        if (selectedCategory) params.category = selectedCategory;
        if (priceRange) {
            const [min, max] = priceRange.split("-");
            params.price_min = min;
            if (max) params.price_max = max;
        }
        router.get(route("mentors.index"), params);
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
        }).format(price);
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Konsultasi Mentor" />

            <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">
                                Konsultasi Mentor
                            </h1>
                            <p className="text-gray-600">
                                Temukan mentor yang tepat untuk konsultasi di Karya.Mula.
                            </p>
                        </div>
                        <Link
                            href={route("consultations.index")}
                            className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-xl hover:bg-blue-600 transition-all shadow-lg"
                        >
                            Jadwal Konsultasi
                        </Link>
                    </div>

                    {/* Filters */}
                    <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Category Filter */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Kategori:
                                </label>
                                <select
                                    value={selectedCategory}
                                    onChange={(e) => setSelectedCategory(e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                >
                                    <option value="">Semua Kategori</option>
                                    {categories.map((cat) => (
                                        <option key={cat} value={cat}>
                                            {cat}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Price Filter */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Tarif:
                                </label>
                                <select
                                    value={priceRange}
                                    onChange={(e) => setPriceRange(e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                >
                                    <option value="">Semua Tarif</option>
                                    <option value="0-100000">Di bawah Rp. 100.000</option>
                                    <option value="100000-150000">Rp. 100.000 - Rp. 150.000</option>
                                    <option value="150000">Di atas Rp. 150.000</option>
                                </select>
                            </div>
                        </div>
                        <button
                            onClick={handleFilter}
                            className="mt-4 px-6 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-all"
                        >
                            Terapkan Filter
                        </button>
                    </div>

                    {/* Mentor Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {mentors.map((mentor) => (
                            <Link
                                key={mentor.id}
                                href={route("mentors.show", mentor.id)}
                                className="group"
                            >
                                <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer overflow-hidden">
                                    <div className="flex p-6 gap-6">
                                        {/* Mentor Avatar */}
                                        <div className="flex-shrink-0">
                                            <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center">
                                                <span className="text-3xl font-bold text-gray-600">
                                                    {mentor.name.charAt(0)}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Mentor Info */}
                                        <div className="flex-1">
                                            <h3 className="text-xl font-bold text-gray-900 mb-1">
                                                {mentor.name}
                                            </h3>
                                            <div className="flex items-center mb-2">
                                                <span className="text-yellow-500 text-lg mr-1">★</span>
                                                <span className="font-semibold text-gray-900">
                                                    {mentor.rating}
                                                </span>
                                            </div>
                                            <p className="text-sm text-gray-600 mb-2">
                                                {mentor.category}
                                            </p>
                                            <p className="text-lg font-bold text-indigo-600 mb-2">
                                                {formatPrice(mentor.price_per_session)} per sesi konsultasi
                                            </p>
                                            <p className="text-sm text-gray-500">
                                                Tersedia: {mentor.availability?.join(", ") || "Lihat detail"}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>

                    {mentors.length === 0 && (
                        <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
                            <p className="text-gray-600 text-lg">
                                Tidak ada mentor yang sesuai dengan filter Anda.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
