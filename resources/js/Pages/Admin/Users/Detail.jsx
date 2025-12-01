import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import {
    ArrowLeft,
    Mail,
    Phone,
    MapPin,
    Calendar,
    User,
    BookOpen,
    CheckCircle,
    Eye,
} from "lucide-react";

export default function Detail({ auth, user, userModules }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Detail User
                    </h2>
                    <Link
                        href={route("admin.users.index")}
                        className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                    >
                        <ArrowLeft size={18} />
                        Kembali
                    </Link>
                </div>
            }
        >
            <Head title={`Detail User - ${user.name}`} />

            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                {/* Profile Card */}
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg mb-6">
                    <div className="p-6">
                        <div className="flex items-start justify-between mb-6">
                            <div className="flex items-center gap-4">
                                <div className="w-20 h-20 bg-bluey text-white rounded-full flex items-center justify-center text-3xl font-bold">
                                    {user.name.charAt(0).toUpperCase()}
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-gray-900">
                                        {user.name}
                                    </h3>
                                    <p className="text-gray-500">
                                        @{user.username}
                                    </p>
                                    <span className="inline-block mt-2 px-3 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full">
                                        ID: #{user.id}
                                    </span>
                                </div>
                            </div>
                            <Link
                                href={route("admin.users.edit", user.id)}
                                className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg"
                            >
                                Edit User
                            </Link>
                        </div>

                        {/* Contact Information */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                                <Mail className="text-bluey" size={20} />
                                <div>
                                    <p className="text-xs text-gray-500 uppercase">
                                        Email
                                    </p>
                                    <p className="text-gray-900">
                                        {user.email}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                                <Phone className="text-bluey" size={20} />
                                <div>
                                    <p className="text-xs text-gray-500 uppercase">
                                        No. Telepon
                                    </p>
                                    <p className="text-gray-900">
                                        {user.phone_number || "-"}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                                <MapPin className="text-bluey" size={20} />
                                <div>
                                    <p className="text-xs text-gray-500 uppercase">
                                        Lokasi
                                    </p>
                                    <p className="text-gray-900">
                                        {user.location || "-"}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                                <Calendar className="text-bluey" size={20} />
                                <div>
                                    <p className="text-xs text-gray-500 uppercase">
                                        Tanggal Lahir
                                    </p>
                                    <p className="text-gray-900">
                                        {user.birth_date
                                            ? new Date(
                                                  user.birth_date
                                              ).toLocaleDateString("id-ID", {
                                                  day: "numeric",
                                                  month: "long",
                                                  year: "numeric",
                                              })
                                            : "-"}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Bio */}
                        {user.bio && (
                            <div className="p-4 bg-gray-50 rounded-lg">
                                <div className="flex items-center gap-2 mb-2">
                                    <User className="text-bluey" size={20} />
                                    <p className="text-xs text-gray-500 uppercase font-semibold">
                                        Bio
                                    </p>
                                </div>
                                <p className="text-gray-900">{user.bio}</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Progress Card */}
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg mb-6">
                    <div className="p-6">
                        <div className="flex items-center gap-2 mb-4">
                            <BookOpen className="text-bluey" size={24} />
                            <h4 className="text-xl font-bold text-gray-900">
                                Progress Pembelajaran
                            </h4>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                            <div className="p-4 bg-blue-50 rounded-lg">
                                <p className="text-sm text-gray-600 mb-1">
                                    Total Modul
                                </p>
                                <p className="text-3xl font-bold text-bluey">
                                    {user.total_modules || 0}
                                </p>
                            </div>
                            <div className="p-4 bg-green-50 rounded-lg">
                                <p className="text-sm text-gray-600 mb-1">
                                    Modul Selesai
                                </p>
                                <p className="text-3xl font-bold text-green-600">
                                    {user.completed_modules || 0}
                                </p>
                            </div>
                            <div className="p-4 bg-purple-50 rounded-lg">
                                <p className="text-sm text-gray-600 mb-1">
                                    Persentase
                                </p>
                                <p className="text-3xl font-bold text-purple-600">
                                    {user.total_modules > 0
                                        ? Math.round(
                                              (user.completed_modules /
                                                  user.total_modules) *
                                                  100
                                          )
                                        : 0}
                                    %
                                </p>
                            </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="mb-6">
                            <div className="w-full bg-gray-200 rounded-full h-4">
                                <div
                                    className="bg-bluey h-4 rounded-full transition-all duration-300"
                                    style={{
                                        width: `${
                                            user.total_modules > 0
                                                ? (user.completed_modules /
                                                      user.total_modules) *
                                                  100
                                                : 0
                                        }%`,
                                    }}
                                ></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Modules List */}
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-6">
                        <h4 className="text-xl font-bold text-gray-900 mb-4">
                            Daftar Modul
                        </h4>

                        {userModules && userModules.length > 0 ? (
                            <div className="space-y-3">
                                {userModules.map((module, index) => (
                                    <div
                                        key={module.id}
                                        className={`p-4 rounded-lg border-2 ${
                                            module.is_completed
                                                ? "bg-green-50 border-green-200"
                                                : "bg-gray-50 border-gray-200"
                                        }`}
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div
                                                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                                                        module.is_completed
                                                            ? "bg-green-500 text-white"
                                                            : "bg-gray-300 text-gray-600"
                                                    }`}
                                                >
                                                    {index + 1}
                                                </div>
                                                <div>
                                                    <h5 className="font-semibold text-gray-900">
                                                        {module.title}
                                                    </h5>
                                                    {module.completed_at && (
                                                        <p className="text-xs text-gray-500">
                                                            Selesai pada:{" "}
                                                            {new Date(
                                                                module.completed_at
                                                            ).toLocaleDateString(
                                                                "id-ID",
                                                                {
                                                                    day: "numeric",
                                                                    month: "long",
                                                                    year: "numeric",
                                                                }
                                                            )}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                            {module.is_completed && (
                                                <CheckCircle
                                                    className="text-green-500"
                                                    size={24}
                                                />
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12">
                                <BookOpen
                                    className="mx-auto text-gray-400 mb-3"
                                    size={48}
                                />
                                <p className="text-gray-500">
                                    Belum ada data modul
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
