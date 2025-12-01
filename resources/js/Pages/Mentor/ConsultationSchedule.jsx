import React, { useState } from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function ConsultationSchedule({ auth, consultations }) {
    const [editingNotes, setEditingNotes] = useState({});
    const { post } = useForm();

    const formatDateTime = (dateString) => {
        const date = new Date(dateString);
        const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
        const months = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
        
        const dayName = days[date.getDay()];
        const day = date.getDate();
        const month = months[date.getMonth()];
        const year = date.getFullYear();
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        
        return `${dayName}, ${day} ${month} ${year} Pukul ${hours}:${minutes} WIB`;
    };

    const handleCancel = (id) => {
        if (confirm("Apakah Anda yakin ingin membatalkan konsultasi ini?")) {
            post(route("consultations.cancel", id));
        }
    };

    const handleSaveNotes = (id) => {
        const notes = editingNotes[id];
        if (notes) {
            post(route("consultations.notes", id), {
                data: { notes },
            });
        }
    };

    const updateNotes = (id, value) => {
        setEditingNotes({
            ...editingNotes,
            [id]: value,
        });
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Jadwal Konsultasi Saya" />

            <div className="min-h-screen  py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-5xl mx-auto">
                    {/* Header */}
                    <Link
                        href={route("mentors.index")}
                        className="text-indigo-600 hover:text-indigo-800 font-semibold mb-4 inline-block"
                    >
                        ← Kembali
                    </Link>

                    <h1 className="text-3xl font-bold text-gray-900 mb-8">
                        Jadwal Konsultasi Saya
                    </h1>

                    {/* Consultations List */}
                    {consultations.length === 0 ? (
                        <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
                            <p className="text-gray-600 text-lg mb-4">
                                Belum ada jadwal konsultasi.
                            </p>
                            <Link
                                href={route("mentors.index")}
                                className="inline-block px-6 py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-all"
                            >
                                Cari Mentor
                            </Link>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {consultations.map((consultation) => (
                                <div
                                    key={consultation.id}
                                    className="bg-white rounded-2xl shadow-lg p-6"
                                >
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-900 mb-1">
                                                {consultation.mentor.name}
                                            </h3>
                                            <p className="text-sm text-gray-600 mb-2">
                                                {formatDateTime(consultation.scheduled_at)}
                                            </p>
                                            <p className="text-sm text-gray-500">
                                                Bergabung ke meet konsultasi dengan menekan tombol Gabung...
                                            </p>
                                        </div>
                                        <div className="flex gap-2">
                                            {consultation.status === "confirmed" && (
                                                <button className="px-4 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition-all">
                                                    Gabung
                                                </button>
                                            )}
                                            {consultation.status !== "cancelled" && (
                                                <button
                                                    onClick={() => handleCancel(consultation.id)}
                                                    className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition-all"
                                                >
                                                    Batal
                                                </button>
                                            )}
                                        </div>
                                    </div>

                                    {/* Notes Section */}
                                    <div className="border-t pt-4">
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            {consultation.notes ? "Catatan untuk Mentor" : "Masukkan catatan untuk mentor (termasuk jika hendak meminta reschedule)..."}
                                        </label>
                                        <textarea
                                            value={editingNotes[consultation.id] ?? consultation.notes ?? ""}
                                            onChange={(e) => updateNotes(consultation.id, e.target.value)}
                                            rows={3}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
                                            placeholder="Masukkan catatan untuk mentor (termasuk jika hendak meminta reschedule)..."
                                        />
                                        <button
                                            onClick={() => handleSaveNotes(consultation.id)}
                                            className="mt-2 px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-all"
                                        >
                                            Kirim Catatan
                                        </button>
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
