import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, router, Link, usePage } from "@inertiajs/react";
import CourseCard from "@/Components/CourseCard";
import React, { useState } from "react";

const LoginModal = ({ show, onClose }) => {
    if (!show) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-2xl max-w-sm text-center">
                <h3 className="text-xl font-bold mb-4 text-red-600">
                    Akses Dibatasi
                </h3>
                <p className="text-gray-700 mb-6">
                    Anda harus Login untuk mengakses detail video dan memulai
                    pelatihan.
                </p>
                <div className="flex justify-around">
                    <Link
                        href={route("login")}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                        Login Sekarang
                    </Link>
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400"
                    >
                        Batal
                    </button>
                </div>
            </div>
        </div>
    );
};

export default function KatalogIndex({ auth }) {
    const { courses } = usePage().props;
    const [showLoginModal, setShowLoginModal] = useState(false);

    const isAuthenticated = auth?.user !== null && auth?.user !== undefined;

    const beginnerCourses = courses.filter((c) => c.id >= 1 && c.id <= 4);
    const intermediateCourses = courses.filter((c) => c.id > 4 && c.id <= 8);

    const handleCardClick = (courseId) => {
        if (!isAuthenticated) {
            setShowLoginModal(true);
        } else {
            router.visit(route("course.video", { id: courseId }));
        }
    };

    const CourseItem = ({ course, handleCardClick }) => (
        <div
            className="flex flex-col items-start space-y-2 cursor-pointer"
            onClick={() => handleCardClick(course.id)}
        >
            <CourseCard youtubeUrl={course.youtube_url} />
            <p className="text-lg text-[#1F305E]">{course.title}</p>
        </div>
    );

    // Choose layout based on authentication
    const Layout = isAuthenticated ? AuthenticatedLayout : GuestLayout;
    const layoutProps = isAuthenticated
        ? {
              user: auth.user,
              header: (
                  <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                      Katalog & Belajar
                  </h2>
              ),
          }
        : {};

    return (
        <Layout {...layoutProps}>
            <Head title="Katalog & Belajar" />

            <div className="px-10 py-8">
                <h1 className="text-3xl font-extrabold text-[#1F305E] mb-10">
                    Jalur Wirausaha
                </h1>

                {/* Guest Notice - Only show if not authenticated */}
                {!isAuthenticated && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
                        <div className="flex items-start">
                            <div className="flex-1">
                                <h3 className="text-lg font-semibold text-blue-900 mb-2">
                                    Jelajahi Katalog Kursus
                                </h3>
                                <p className="text-blue-800 mb-4">
                                    Lihat semua kursus yang tersedia. Login
                                    untuk mulai belajar dan dapatkan akses penuh
                                    ke video, quiz, dan sertifikat.
                                </p>
                                <div className="flex gap-3">
                                    <Link
                                        href={route("login")}
                                        className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                                    >
                                        Login untuk Mulai
                                    </Link>
                                    <Link
                                        href={route("register")}
                                        className="inline-flex items-center px-4 py-2 bg-white text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition"
                                    >
                                        Daftar Gratis
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                <div className="mb-12">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">
                        Beginner
                    </h2>
                    <div className="grid grid-cols-2 gap-x-10 gap-y-10">
                        {beginnerCourses.length === 0 ? (
                            <p className="text-gray-500">
                                Tidak ada kursus Beginner yang tersedia.
                            </p>
                        ) : (
                            beginnerCourses.map((course) => (
                                <CourseItem
                                    key={course.id}
                                    course={course}
                                    handleCardClick={handleCardClick}
                                />
                            ))
                        )}
                    </div>
                </div>

                <div className="mb-12">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">
                        Intermediate
                    </h2>
                    <div className="grid grid-cols-2 gap-x-10 gap-y-10">
                        {intermediateCourses.length === 0 ? (
                            <p className="text-gray-500">
                                Tidak ada kursus Intermediate yang tersedia.
                            </p>
                        ) : (
                            intermediateCourses.map((course) => (
                                <CourseItem
                                    key={course.id}
                                    course={course}
                                    handleCardClick={handleCardClick}
                                />
                            ))
                        )}
                    </div>
                </div>
            </div>

            <LoginModal
                show={showLoginModal}
                onClose={() => setShowLoginModal(false)}
            />
        </Layout>
    );
}
