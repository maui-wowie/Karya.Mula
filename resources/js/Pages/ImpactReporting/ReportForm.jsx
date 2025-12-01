import React, { useState } from "react";
import { Head, useForm, Link } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function ReportForm({ auth, sdgGoal }) {
    const { data, setData, post, processing, errors } = useForm({
        sdg_goal_id: sdgGoal.id,
        target_number: "",
        short_description: "",
        step_description: "",
        additional_notes: "",
        proof_link: "",
        action: "",
    });

    const handleSubmit = (action) => {
        // Set the action first using setData
        // Use a short delay to ensure the state update is flushed
        // so the server receives the correct `action` value.
        setData("action", action);

        setTimeout(() => {
            post(route("impact-reports.store"));
        }, 50);
    };


    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title={`Laporan Dampak - ${sdgGoal.title}`} />

            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    {/* Page Title */}
                    <div className="mb-6">
                        <Link
                            href={route("impact-reports.index")}
                            className="text-indigo-600 hover:text-indigo-800 font-semibold mb-2 inline-block"
                        >
                            ← Kembali
                        </Link>
                        <h1 className="text-3xl font-bold text-gray-900">Form Pelaporan Dampak</h1>
                        <p className="text-gray-600">Isi form berikut untuk melaporkan lencana SDG!</p>
                    </div>

                    {/* SDG Info Card */}
                    <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
                        <div className="flex gap-6">
                            {/* SDG Icon */}
                            <div className="flex-shrink-0">
                                {sdgGoal.icon_url ? (
                                    <img
                                        src={sdgGoal.icon_url}
                                        alt={sdgGoal.title}
                                        className="w-32 h-32 object-cover rounded-lg"
                                    />
                                ) : (
                                    <div
                                        className="w-32 h-32 rounded-lg flex items-center justify-center"
                                        style={{ backgroundColor: sdgGoal.color }}
                                    >
                                        <span className="text-5xl font-bold text-white">
                                            {sdgGoal.goal_number}
                                        </span>
                                    </div>
                                )}
                            </div>

                            {/* SDG Details */}
                            <div className="flex-1">
                                <div className="flex items-start justify-between mb-3">
                                    <div>
                                        <h2 className="text-2xl font-bold text-gray-900 mb-1">
                                            SDG {sdgGoal.goal_number}
                                        </h2>
                                        <p className="text-sm text-gray-600">0 dari 10 Target Terpenuhi</p>
                                    </div>
                                    <div className="text-right">
                                        <div className="flex flex-col items-end">
                                            <select
                                                value={data.target_number}
                                                onChange={(e) => setData("target_number", e.target.value)}
                                                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                                                required
                                            >
                                                <option value="">Target </option>
                                                {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                                                    <option key={num} value={num}>
                                                        Target {num}
                                                    </option>
                                                ))}
                                            </select>
                                            <p className="text-sm text-gray-500 mt-1">0 Lencana Diklaim</p>
                                        </div>
                                    </div>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">
                                    {sdgGoal.title}
                                </h3>
                                <p className="text-sm text-gray-600">
                                    {sdgGoal.description}
                                </p>
                                {errors.target_number && (
                                    <p className="mt-2 text-sm text-red-600">{errors.target_number}</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Form */}
                    <div className="bg-white rounded-2xl shadow-lg p-8">
                        <form className="space-y-6">

                            {/* Short Description */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Deskripsi Singkat <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    value={data.short_description}
                                    onChange={(e) => setData("short_description", e.target.value)}
                                    rows={3}
                                    maxLength={500}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all resize-none"
                                    placeholder="Deskripsikan secara singkat hasil yang kamu raih dalam mendukung pertumbuhan ekonomi yang inklusif dan berkelanjutan, tenaga kerja penuh dan produktif dan pekerjaan yang layak bagi semua"
                                    required
                                />
                                <div className="flex justify-between mt-1">
                                    {errors.short_description && (
                                        <p className="text-sm text-red-600">{errors.short_description}</p>
                                    )}
                                    <p className="text-sm text-gray-500 ml-auto">
                                        {data.short_description.length}/500
                                    </p>
                                </div>
                            </div>

                            {/* Step Description */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Deskripsi Langkah <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    value={data.step_description}
                                    onChange={(e) => setData("step_description", e.target.value)}
                                    rows={5}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all resize-none"
                                    placeholder="Deskripsikan langkah konkret yang kamu lakukan dalam mendukung pertumbuhan ekonomi yang inklusif dan berkelanjutan, tenaga kerja penuh dan produktif dan pekerjaan yang layak bagi semua"
                                    required
                                />
                                {errors.step_description && (
                                    <p className="mt-1 text-sm text-red-600">{errors.step_description}</p>
                                )}
                            </div>

                            {/* Result Description */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Deskripsi Hasil <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    value={data.additional_notes}
                                    onChange={(e) => setData("additional_notes", e.target.value)}
                                    rows={3}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all resize-none"
                                    placeholder="Deskripsikan secara singkat hasil yang kamu raih dalam mendukung pertumbuhan ekonomi yang inklusif dan berkelanjutan, tenaga kerja penuh dan produktif dan pekerjaan yang layak bagi semua"
                                />
                                {errors.additional_notes && (
                                    <p className="mt-1 text-sm text-red-600">{errors.additional_notes}</p>
                                )}
                            </div>

                            {/* Additional Notes */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Catatan Tambahan
                                </label>
                                <textarea
                                    rows={4}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all resize-none"
                                    placeholder="Masukkan catatan tambahan yang perlu diketahui mentor dan administrator..."
                                />
                            </div>

                            {/* Proof Link */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Link Bukti Pendukung <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="url"
                                    value={data.proof_link}
                                    onChange={(e) => setData("proof_link", e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                                    placeholder="Masukkan link google drive atau dropbox berisi bukti pendukung pengerjaan..."
                                />
                                {errors.proof_link && (
                                    <p className="mt-1 text-sm text-red-600">{errors.proof_link}</p>
                                )}
                                <p className="mt-1 text-xs text-gray-500">*wajib diisi</p>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-4 pt-6 border-t">
                                <Link
                                    href={route("impact-reports.index")}
                                    className="flex-1 px-6 py-3 bg-red-500 text-white font-semibold rounded-xl hover:bg-red-600 transition-all text-center"
                                >
                                    Batalkan
                                </Link>
                                {/* Tombol 'Simpan Draf' dihapus sesuai permintaan */}
                                <button
                                    type="button"
                                    onClick={() => handleSubmit("submit")}
                                    disabled={processing}
                                    className="flex-1 px-6 py-3 bg-blue-500 text-white font-semibold rounded-xl hover:bg-blue-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {processing ? "Mengajukan..." : "Ajukan Pelaporan"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
