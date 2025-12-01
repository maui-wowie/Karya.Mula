import React from "react";
import { Head, Link } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function SdgList({ auth, sdgGoals }) {
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Pelaporan Dampak SDGs" />

            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">
                                Pelaporan Dampak SDG
                            </h1>
                            <p className="text-gray-600">
                                Pilih SDG Goal untuk melaporkan dampak Anda
                            </p>
                        </div>
                        <Link
                            href={route("impact-reports.badges")}
                            className="px-6 py-3 bg-blue-500 rounded-xl text-white transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                        >
                            Perpustakaan Lencana
                        </Link>
                    </div>

                    {/* SDG Goals Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {sdgGoals.map((goal) => (
                            <Link
                                key={goal.id}
                                href={route("impact-reports.create", goal.id)}
                                className="group h-full"
                            >
                                <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer overflow-hidden h-full">
                                    <div className="flex p-6 gap-6 h-full">
                                        {/* SDG Icon */}
                                        <div className="flex-shrink-0">
                                            {goal.icon_url ? (
                                                <img
                                                    src={goal.icon_url}
                                                    alt={goal.title}
                                                    className="w-32 h-32 object-cover rounded-lg"
                                                />
                                            ) : (
                                                <div
                                                    className="w-32 h-32 rounded-lg flex items-center justify-center"
                                                    style={{ backgroundColor: goal.color }}
                                                >
                                                    <span className="text-5xl font-bold text-white">
                                                        {goal.goal_number}
                                                    </span>
                                                </div>
                                            )}
                                        </div>

                                        {/* SDG Info */}
                                        <div className="flex-1 flex flex-col">
                                            {/* Header */}
                                            <div className="mb-2">
                                                <h3 className="text-xl font-bold text-gray-900 mb-1">
                                                    SDG {goal.goal_number}
                                                </h3>
                                                <p className="text-sm text-gray-600">
                                                    {goal.targets_completed || 0} dari 8 Target Terpenuhi
                                                </p>
                                                <p className="text-sm text-gray-500">
                                                    {goal.badge_count || 0} Lencana Diklaim
                                                </p>
                                            </div>

                                            {/* Title */}
                                            <h4 className="text-lg font-bold text-gray-900 mb-2">
                                                {goal.title}
                                            </h4>

                                            {/* Description */}
                                            <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                                                {goal.description}
                                            </p>

                                            {/* Hover Effect */}
                                            <div className="mt-auto flex items-center text-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                <span className="text-sm font-semibold">Laporkan Dampak</span>
                                                <svg
                                                    className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M9 5l7 7-7 7"
                                                    />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>

                    {/* Info Section */}
                    <div className="mt-12 bg-white rounded-2xl shadow-lg p-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">
                            Tentang SDGs
                        </h2>
                        <p className="text-gray-600 leading-relaxed">
                            Sustainable Development Goals (SDGs) atau Tujuan Pembangunan Berkelanjutan adalah 17 tujuan global yang ditetapkan oleh PBB untuk mencapai masa depan yang lebih baik dan berkelanjutan bagi semua. Laporkan dampak positif Anda terhadap SDGs dan dapatkan lencana untuk setiap kontribusi Anda!
                        </p>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
