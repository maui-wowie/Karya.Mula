import React from "react";
import { Head, Link } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function BadgeCollection({ auth, reports, uniqueTargets, maxTargets, reportedGoals, allGoals, sdgProgress }) {
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("id-ID", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Koleksi Lencana" />

            <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <Link
                                href={route("impact-reports.index")}
                                className="text-indigo-600 hover:text-indigo-800 font-semibold mb-2 inline-block"
                            >
                                ← Kembali
                            </Link>
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">
                                Koleksi Lencana
                            </h1>
                            <p className="text-gray-600">
                                Yuk pamerkan ke dunia beberapa sustainable tokoh!
                            </p>
                        </div>
                    </div>

                    {/* Summary Cards */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                        {/* Ringkasan Lencana */}
                        <div className="bg-white rounded-2xl shadow-lg p-6">
                            <h2 className="text-xl font-bold text-gray-900 mb-6">
                                Ringkasan Lencana
                            </h2>
                            {sdgProgress && sdgProgress.length > 0 ? (
                                <div className="space-y-4">
                                    {sdgProgress.map((sdg) => (
                                        <div key={sdg.goalNumber}>
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="text-sm font-semibold text-gray-700">
                                                    SDG {sdg.goalNumber}
                                                </span>
                                                <span className="text-sm font-semibold text-white px-3 py-1 rounded-full" style={{ backgroundColor: sdg.color }}>
                                                    {sdg.current}/{sdg.total}
                                                </span>
                                            </div>
                                            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                                                <div
                                                    className="h-3 rounded-full transition-all duration-500"
                                                    style={{
                                                        width: `${(sdg.current / sdg.total) * 100}%`,
                                                        backgroundColor: sdg.color
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-500 text-center py-8">
                                    Belum ada progress. Mulai laporkan dampak Anda!
                                </p>
                            )}
                        </div>

                        {/* Jalan yang Panjang */}
                        <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center justify-center text-center">
                            <h2 className="text-xl font-bold text-gray-900 mb-4">
                                Jalan yang Panjang!
                            </h2>
                            <div className="text-6xl font-bold text-yellow-500 mb-2">
                                {uniqueTargets} / {maxTargets}
                            </div>
                            <p className="text-lg font-semibold text-gray-700">
                                Lencana Terkumpul
                            </p>
                        </div>
                    </div>

                    {/* Badge Grid */}
                    {reports.length === 0 ? (
                        <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
                            <div className="text-6xl mb-4">📝</div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">
                                Belum Ada Laporan
                            </h3>
                            <p className="text-gray-600 mb-6">
                                Mulai laporkan dampak Anda terhadap SDGs dan dapatkan lencana!
                            </p>
                            <Link
                                href={route("impact-reports.index")}
                                className="inline-block px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all"
                            >
                                Buat Laporan Pertama
                            </Link>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {reports.map((report) => (
                                <div
                                    key={report.id}
                                    className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                                >
                                    {/* SDG Icon */}
                                    <div className="flex justify-center p-6 bg-gray-50">
                                        {report.sdg_goal.icon_url ? (
                                            <img
                                                src={report.sdg_goal.icon_url}
                                                alt={report.sdg_goal.title}
                                                className="w-40 h-40 object-cover rounded-lg"
                                            />
                                        ) : (
                                            <div
                                                className="w-40 h-40 rounded-lg flex items-center justify-center"
                                                style={{ backgroundColor: report.sdg_goal.color }}
                                            >
                                                <span className="text-6xl font-bold text-white">
                                                    {report.sdg_goal.goal_number}
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Badge Info */}
                                    <div className="p-6 text-center">
                                        <h3 className="text-lg font-bold text-gray-900 mb-1">
                                            SDG {report.sdg_goal.goal_number}
                                        </h3>
                                        <p className="text-sm font-semibold text-gray-700">
                                            Target {report.target_number}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
