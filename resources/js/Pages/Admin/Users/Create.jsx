import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import {
    ArrowLeft,
    User,
    Mail,
    Lock,
    Phone,
    MapPin,
    Calendar,
    FileText,
} from "lucide-react";

export default function Create({ auth }) {
    const { data, setData, post, processing, errors } = useForm({
        name: "",
        username: "",
        email: "",
        password: "",
        password_confirmation: "",
        phone_number: "",
        birth_date: "",
        location: "",
        bio: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("admin.users.store"));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Tambah User Baru
                    </h2>
                    <Link
                        href={route("admin.users.index")}
                        className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition-colors"
                    >
                        <ArrowLeft size={18} />
                        Kembali
                    </Link>
                </div>
            }
        >
            <Head title="Tambah User" />

            <div className="">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-lg sm:rounded-2xl border border-gray-100">
                        {/* Header Card */}
                        <div className="bg-bluey p-6">
                            <h3 className="text-2xl font-bold text-white">
                                Informasi User Baru
                            </h3>
                            <p className="text-bluey-light mt-1">
                                Lengkapi form di bawah untuk menambahkan user
                                baru
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="p-8">
                            {/* Informasi Akun */}
                            <div className="mb-8">
                                <h4 className="text-lg font-semibold text-bluey mb-4 flex items-center gap-2">
                                    <div className="w-8 h-8 bg-bluey-light rounded-lg flex items-center justify-center">
                                        <User
                                            size={18}
                                            className="text-bluey"
                                        />
                                    </div>
                                    Informasi Akun
                                </h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Name */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Nama Lengkap{" "}
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                value={data.name}
                                                onChange={(e) =>
                                                    setData(
                                                        "name",
                                                        e.target.value
                                                    )
                                                }
                                                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:border-bluey focus:ring-2 focus:ring-bluey-light transition-all"
                                                placeholder="Masukkan nama lengkap"
                                                required
                                            />
                                            <User
                                                size={18}
                                                className="absolute left-3 top-3 text-gray-400"
                                            />
                                        </div>
                                        {errors.name && (
                                            <p className="mt-1.5 text-sm text-red-600">
                                                {errors.name}
                                            </p>
                                        )}
                                    </div>

                                    {/* Username */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Username{" "}
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                value={data.username}
                                                onChange={(e) =>
                                                    setData(
                                                        "username",
                                                        e.target.value
                                                    )
                                                }
                                                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:border-bluey focus:ring-2 focus:ring-bluey-light transition-all"
                                                placeholder="Masukkan username"
                                                required
                                            />
                                            <User
                                                size={18}
                                                className="absolute left-3 top-3 text-gray-400"
                                            />
                                        </div>
                                        {errors.username && (
                                            <p className="mt-1.5 text-sm text-red-600">
                                                {errors.username}
                                            </p>
                                        )}
                                    </div>

                                    {/* Email */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Email{" "}
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="email"
                                                value={data.email}
                                                onChange={(e) =>
                                                    setData(
                                                        "email",
                                                        e.target.value
                                                    )
                                                }
                                                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:border-bluey focus:ring-2 focus:ring-bluey-light transition-all"
                                                placeholder="email@example.com"
                                                required
                                            />
                                            <Mail
                                                size={18}
                                                className="absolute left-3 top-3 text-gray-400"
                                            />
                                        </div>
                                        {errors.email && (
                                            <p className="mt-1.5 text-sm text-red-600">
                                                {errors.email}
                                            </p>
                                        )}
                                    </div>

                                    {/* Phone Number */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Nomor Telepon
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                value={data.phone_number}
                                                onChange={(e) =>
                                                    setData(
                                                        "phone_number",
                                                        e.target.value
                                                    )
                                                }
                                                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:border-bluey focus:ring-2 focus:ring-bluey-light transition-all"
                                                placeholder="08xxxxxxxxxx"
                                            />
                                            <Phone
                                                size={18}
                                                className="absolute left-3 top-3 text-gray-400"
                                            />
                                        </div>
                                        {errors.phone_number && (
                                            <p className="mt-1.5 text-sm text-red-600">
                                                {errors.phone_number}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Keamanan */}
                            <div className="mb-8">
                                <h4 className="text-lg font-semibold text-bluey mb-4 flex items-center gap-2">
                                    <div className="w-8 h-8 bg-bluey-light rounded-lg flex items-center justify-center">
                                        <Lock
                                            size={18}
                                            className="text-bluey"
                                        />
                                    </div>
                                    Keamanan
                                </h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Password */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Password{" "}
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="password"
                                                value={data.password}
                                                onChange={(e) =>
                                                    setData(
                                                        "password",
                                                        e.target.value
                                                    )
                                                }
                                                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:border-bluey focus:ring-2 focus:ring-bluey-light transition-all"
                                                placeholder="Minimal 8 karakter"
                                                required
                                            />
                                            <Lock
                                                size={18}
                                                className="absolute left-3 top-3 text-gray-400"
                                            />
                                        </div>
                                        {errors.password && (
                                            <p className="mt-1.5 text-sm text-red-600">
                                                {errors.password}
                                            </p>
                                        )}
                                    </div>

                                    {/* Password Confirmation */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Konfirmasi Password{" "}
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="password"
                                                value={
                                                    data.password_confirmation
                                                }
                                                onChange={(e) =>
                                                    setData(
                                                        "password_confirmation",
                                                        e.target.value
                                                    )
                                                }
                                                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:border-bluey focus:ring-2 focus:ring-bluey-light transition-all"
                                                placeholder="Ulangi password"
                                                required
                                            />
                                            <Lock
                                                size={18}
                                                className="absolute left-3 top-3 text-gray-400"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Informasi Personal */}
                            <div className="mb-8">
                                <h4 className="text-lg font-semibold text-bluey mb-4 flex items-center gap-2">
                                    <div className="w-8 h-8 bg-bluey-light rounded-lg flex items-center justify-center">
                                        <FileText
                                            size={18}
                                            className="text-bluey"
                                        />
                                    </div>
                                    Informasi Personal
                                </h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Birth Date */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Tanggal Lahir
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="date"
                                                value={data.birth_date}
                                                onChange={(e) =>
                                                    setData(
                                                        "birth_date",
                                                        e.target.value
                                                    )
                                                }
                                                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:border-bluey focus:ring-2 focus:ring-bluey-light transition-all"
                                            />
                                            <Calendar
                                                size={18}
                                                className="absolute left-3 top-3 text-gray-400"
                                            />
                                        </div>
                                        {errors.birth_date && (
                                            <p className="mt-1.5 text-sm text-red-600">
                                                {errors.birth_date}
                                            </p>
                                        )}
                                    </div>

                                    {/* Location */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Lokasi
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                value={data.location}
                                                onChange={(e) =>
                                                    setData(
                                                        "location",
                                                        e.target.value
                                                    )
                                                }
                                                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:border-bluey focus:ring-2 focus:ring-bluey-light transition-all"
                                                placeholder="Kota, Provinsi"
                                            />
                                            <MapPin
                                                size={18}
                                                className="absolute left-3 top-3 text-gray-400"
                                            />
                                        </div>
                                        {errors.location && (
                                            <p className="mt-1.5 text-sm text-red-600">
                                                {errors.location}
                                            </p>
                                        )}
                                    </div>

                                    {/* Bio */}
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Bio
                                        </label>
                                        <textarea
                                            value={data.bio}
                                            onChange={(e) =>
                                                setData("bio", e.target.value)
                                            }
                                            rows={4}
                                            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-bluey focus:ring-2 focus:ring-bluey-light transition-all"
                                            placeholder="Ceritakan tentang user ini..."
                                        />
                                        {errors.bio && (
                                            <p className="mt-1.5 text-sm text-red-600">
                                                {errors.bio}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Submit Buttons */}
                            <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
                                <Link
                                    href={route("admin.users.index")}
                                    className="px-6 py-2.5 rounded-lg border-2 border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                                >
                                    Batal
                                </Link>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="px-6 py-2.5 rounded-lg bg-bluey hover:bg-blue-900 text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-lg shadow-bluey/30"
                                >
                                    {processing ? (
                                        <span className="flex items-center gap-2">
                                            <svg
                                                className="animate-spin h-5 w-5"
                                                viewBox="0 0 24 24"
                                            >
                                                <circle
                                                    className="opacity-25"
                                                    cx="12"
                                                    cy="12"
                                                    r="10"
                                                    stroke="currentColor"
                                                    strokeWidth="4"
                                                    fill="none"
                                                />
                                                <path
                                                    className="opacity-75"
                                                    fill="currentColor"
                                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                />
                                            </svg>
                                            Menyimpan...
                                        </span>
                                    ) : (
                                        "Simpan User"
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
