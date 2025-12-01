import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link } from "@inertiajs/react";
import { PlayCircle, BookOpen, CheckCircle, ArrowRight } from "lucide-react";

export default function Dashboard({
    auth,
    enrolledCourses = [],
    recommendedCourses = [],
}) {
    const isAuthenticated = auth?.user !== null && auth?.user !== undefined;
    const userName = isAuthenticated ? auth.user.name : "Pengunjung";

    // Choose layout based on authentication
    const Layout = isAuthenticated ? AuthenticatedLayout : GuestLayout;
    const layoutProps = isAuthenticated
        ? {
              user: auth.user,
              header: (
                  <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                      Dashboard
                  </h2>
              ),
          }
        : {};

    return (
        <Layout {...layoutProps}>
            <Head title="Dashboard" />

            <div className="py-8">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    {/* Welcome Section */}
                    <div className="bg-gradient-to-r from-blue-500 to-purple-600 overflow-hidden shadow-sm sm:rounded-lg p-8">
                        <h1 className="text-3xl font-bold text-white mb-2">
                            Selamat Datang, {userName}!
                        </h1>
                        <p className="text-blue-100">
                            {isAuthenticated
                                ? "Mari lanjutkan pembelajaran Anda hari ini"
                                : "Silakan login untuk mengakses fitur lengkap"}
                        </p>
                    </div>

                    {/* Guest Notice - Only show if not authenticated */}
                    {!isAuthenticated && (
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                            <div className="flex items-start">
                                <BookOpen className="h-6 w-6 text-yellow-600 mr-3 mt-1" />
                                <div className="flex-1">
                                    <h3 className="text-lg font-semibold text-yellow-900 mb-2">
                                        Mode Pengunjung
                                    </h3>
                                    <p className="text-yellow-800 mb-4">
                                        Anda sedang menjelajah sebagai
                                        pengunjung. Login untuk mengakses kursus
                                        lengkap, menyimpan progress, dan
                                        mendapatkan sertifikat.
                                    </p>
                                    <div className="flex gap-3">
                                        <Link
                                            href={route("login")}
                                            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                                        >
                                            Login
                                        </Link>
                                        <Link
                                            href={route("register")}
                                            className="inline-flex items-center px-4 py-2 bg-white text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition"
                                        >
                                            Daftar Sekarang
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* My Courses Table - Only show if authenticated */}
                    {isAuthenticated && (
                        <div className="overflow-hidden shadow-sm sm:rounded-lg">
                            <div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                                    Kursus Saya
                                </h3>

                                {enrolledCourses &&
                                enrolledCourses.length > 0 ? (
                                    <div className="overflow-x-auto">
                                        <table className="min-w-full divide-y divide-gray-200">
                                            <thead className="bg-bluey-light">
                                                <tr>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Nama Kursus
                                                    </th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Mentor Comment
                                                    </th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Progress
                                                    </th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Status
                                                    </th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Aksi
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-bluey-light divide-y divide-gray-200">
                                                {enrolledCourses.map(
                                                    (course) => (
                                                        <tr
                                                            key={course.id}
                                                            className="hover:bg-gray-50"
                                                        >
                                                            <td className="px-6 py-4">
                                                                <div className="flex items-center">
                                                                    <BookOpen className="h-5 w-5 text-blue-500 mr-3" />
                                                                    <div>
                                                                        <div className="text-sm font-medium text-gray-900">
                                                                            {
                                                                                course.title
                                                                            }
                                                                        </div>
                                                                        <div className="text-sm text-gray-500">
                                                                            {course.description.substring(
                                                                                0,
                                                                                60
                                                                            )}
                                                                            ...
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td className="px-6 py-4 text-sm text-gray-900">
                                                                {course.mentor_comment
                                                                    ? course.mentor_comment
                                                                          .split(
                                                                              " "
                                                                          )
                                                                          .slice(
                                                                              0,
                                                                              2
                                                                          )
                                                                          .join(
                                                                              " "
                                                                          )
                                                                    : "Instruktur"}
                                                            </td>
                                                            <td className="px-6 py-4">
                                                                <div className="flex items-center">
                                                                    <div className="w-full bg-gray-200 rounded-full h-2 mr-2">
                                                                        <div
                                                                            className="bg-blue-600 h-2 rounded-full"
                                                                            style={{
                                                                                width: `${course.progress}%`,
                                                                            }}
                                                                        ></div>
                                                                    </div>
                                                                    <span className="text-sm font-medium text-gray-700">
                                                                        {
                                                                            course.progress
                                                                        }
                                                                        %
                                                                    </span>
                                                                </div>
                                                            </td>
                                                            <td className="px-6 py-4">
                                                                {course.is_completed ? (
                                                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                                        <CheckCircle className="h-4 w-4 mr-1" />
                                                                        Selesai
                                                                    </span>
                                                                ) : (
                                                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                                                        Berlangsung
                                                                    </span>
                                                                )}
                                                            </td>
                                                            <td className="px-6 py-4 text-sm font-medium">
                                                                <Link
                                                                    href={route(
                                                                        "course.video",
                                                                        course.id
                                                                    )}
                                                                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                                                                >
                                                                    {course.is_completed
                                                                        ? "Review"
                                                                        : "Lanjutkan"}
                                                                    <ArrowRight className="ml-2 h-4 w-4" />
                                                                </Link>
                                                            </td>
                                                        </tr>
                                                    )
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                ) : (
                                    <div className="text-center py-12">
                                        <BookOpen className="mx-auto h-12 w-12 text-gray-400" />
                                        <h3 className="mt-2 text-sm font-medium text-gray-900">
                                            Belum ada kursus
                                        </h3>
                                        <p className="mt-1 text-sm text-gray-500">
                                            Mulai dengan memilih kursus dari
                                            katalog
                                        </p>
                                        <div className="mt-6">
                                            <Link
                                                href={route("courses.index")}
                                                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                                            >
                                                <BookOpen className="mr-2 h-5 w-5" />
                                                Jelajahi Katalog
                                            </Link>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Recommended Courses */}
                    <div className="bg-bluey-light overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">
                                {isAuthenticated
                                    ? "Rekomendasi Kursus"
                                    : "Kursus Populer"}
                            </h3>

                            {recommendedCourses &&
                            recommendedCourses.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {recommendedCourses.map((course) => (
                                        <div
                                            key={course.id}
                                            className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition"
                                        >
                                            {course.youtube_url ? (
                                                <img
                                                    src={`https://img.youtube.com/vi/${
                                                        (course.youtube_url.match(
                                                            /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/|shorts\/))([A-Za-z0-9_-]{11})/
                                                        ) || [])[1]
                                                    }/hqdefault.jpg`}
                                                    alt={course.title}
                                                    className="w-full h-48 object-cover"
                                                />
                                            ) : (
                                                <div className="w-full h-48 bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                                                    <PlayCircle className="h-16 w-16 text-white" />
                                                </div>
                                            )}
                                            <div className="p-4">
                                                <h4 className="font-semibold text-gray-900 mb-2">
                                                    {course.title}
                                                </h4>
                                                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                                                    {course.description}
                                                </p>
                                                {isAuthenticated ? (
                                                    <Link
                                                        href={route(
                                                            "course.video",
                                                            course.id
                                                        )}
                                                        className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
                                                    >
                                                        Lihat Detail
                                                        <ArrowRight className="ml-2 h-4 w-4" />
                                                    </Link>
                                                ) : (
                                                    <Link
                                                        href={route("login")}
                                                        className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
                                                    >
                                                        Login untuk Mulai
                                                        <ArrowRight className="ml-2 h-4 w-4" />
                                                    </Link>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-500 text-center py-8">
                                    Tidak ada rekomendasi kursus saat ini
                                </p>
                            )}

                            {recommendedCourses &&
                                recommendedCourses.length > 0 && (
                                    <div className="mt-6 text-center">
                                        <Link
                                            href={route("courses.index")}
                                            className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
                                        >
                                            Lihat Semua Kursus
                                            <ArrowRight className="ml-2 h-4 w-4" />
                                        </Link>
                                    </div>
                                )}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
