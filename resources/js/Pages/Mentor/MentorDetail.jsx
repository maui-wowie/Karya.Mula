import React, { useState } from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function MentorDetail({ auth, mentor }) {
    const [selectedDate, setSelectedDate] = useState("");
    const { data, setData, post, processing, errors } = useForm({
        scheduled_at: "",
        notes: "",
    });

    const handleBooking = () => {
        if (!selectedDate) {
            alert("Pilih tanggal dan waktu konsultasi terlebih dahulu!");
            return;
        }
        setData("scheduled_at", selectedDate);
        setTimeout(() => {
            post(route("mentors.book", mentor.id));
        }, 0);
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
            <Head title={`Mentor - ${mentor.name}`} />

            <div className="min-h-screen bg-gradient-to-br  py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-5xl mx-auto">
                    {/* Back Button */}
                    <Link
                        href={route("mentors.index")}
                        className="text-indigo-600 hover:text-indigo-800 font-semibold mb-4 inline-block"
                    >
                        ← Kembali
                    </Link>

                    <h1 className="text-3xl font-bold text-gray-900 mb-8">
                        Daftar Konsultan Mentor
                    </h1>

                    {/* Mentor Profile Card */}
                    <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
                        <div className="flex gap-8 mb-6">
                            {/* Avatar */}
                            <div className="flex-shrink-0">
                                <div className="w-32 h-32 rounded-full bg-gray-300 flex items-center justify-center">
                                    <span className="text-5xl font-bold text-gray-600">
                                        {mentor.name.charAt(0)}
                                    </span>
                                </div>
                            </div>

                            {/* Info */}
                            <div className="flex-1">
                                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                                    {mentor.name}
                                </h2>
                                <div className="flex items-center gap-4 mb-3">
                                    <span className="text-sm text-gray-600">{mentor.category}</span>
                                    <span className="text-sm text-gray-600">Rating</span>
                                    <div className="flex items-center">
                                        <span className="text-yellow-500 mr-1">★★★★★</span>
                                        <span className="font-semibold">{mentor.rating}</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-6 text-sm text-gray-700">
                                    <span className="font-semibold">
                                        {formatPrice(mentor.price_per_session)} per sesi
                                    </span>
                                    <span>Durasi {mentor.duration_minutes} menit</span>
                                </div>

                                {/* Date Picker */}
                                <div className="mt-4">
                                    <input
                                        type="datetime-local"
                                        value={selectedDate}
                                        onChange={(e) => setSelectedDate(e.target.value)}
                                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Profile Section */}
                        <div className="border-t pt-6">
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Profil</h3>
                            <p className="text-gray-700 leading-relaxed">
                                {mentor.bio || "Tidak ada deskripsi tersedia."}
                            </p>
                        </div>

                        {/* Testimonials */}
                        {mentor.testimonials && mentor.testimonials.length > 0 && (
                            <div className="border-t pt-6 mt-6">
                                <h3 className="text-xl font-bold text-gray-900 mb-4">
                                    Testimoni Peserta
                                </h3>
                                <div className="space-y-4">
                                    {mentor.testimonials.map((testimonial) => (
                                        <div
                                            key={testimonial.id}
                                            className="bg-gray-50 rounded-lg p-4"
                                        >
                                            <p className="text-gray-700 italic">
                                                "{testimonial.comment}" - {testimonial.user?.name || "User"}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Book Button */}
                        <button
                            onClick={handleBooking}
                            disabled={processing}
                            className="mt-6 px-8 py-3 bg-green-500 text-white font-semibold rounded-xl hover:bg-green-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {processing ? "Memproses..." : "Pesan Sesi"}
                        </button>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
