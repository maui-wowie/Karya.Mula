import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import {
    Delete,
    Edit,
    Eye,
    Trash,
    ArrowUpDown,
    ArrowUp,
    ArrowDown,
} from "lucide-react";
import { useState, useMemo } from "react";

export default function Index({ auth, courses }) {
    const [sortConfig, setSortConfig] = useState({
        key: null,
        direction: "asc",
    });

    const handleDelete = (id) => {
        if (window.confirm("Apakah Anda yakin ingin menghapus kursus ini?")) {
            router.delete(route("admin.courses.destroy", id), {
                onSuccess: () => {
                    // Alert is handled by flash message usually, but we can keep it for now
                    // alert("Kursus berhasil dihapus!");
                },
            });
        }
    };

    const handleSort = (key) => {
        let direction = "asc";
        if (sortConfig.key === key && sortConfig.direction === "asc") {
            direction = "desc";
        }
        setSortConfig({ key, direction });
    };

    const sortedCourses = useMemo(() => {
        let sortableCourses = [...courses];
        if (sortConfig.key !== null) {
            sortableCourses.sort((a, b) => {
                let aValue = a[sortConfig.key];
                let bValue = b[sortConfig.key];

                if (typeof aValue === "string") {
                    aValue = aValue.toLowerCase();
                    bValue = bValue.toLowerCase();
                }

                if (aValue < bValue) {
                    return sortConfig.direction === "asc" ? -1 : 1;
                }
                if (aValue > bValue) {
                    return sortConfig.direction === "asc" ? 1 : -1;
                }
                return 0;
            });
        }
        return sortableCourses;
    }, [courses, sortConfig]);

    const SortIcon = ({ columnKey }) => {
        if (sortConfig.key !== columnKey) {
            return (
                <ArrowUpDown className="inline ml-1 w-4 h-4 text-gray-400" />
            );
        }
        return sortConfig.direction === "asc" ? (
            <ArrowUp className="inline ml-1 w-4 h-4 text-bluey" />
        ) : (
            <ArrowDown className="inline ml-1 w-4 h-4 text-bluey" />
        );
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Manajemen Katalog
                    </h2>
                    <Link
                        href={route("admin.courses.create")}
                        className="bg-bluey hover:bg-bluey-light text-white px-4 py-2 rounded-lg"
                    >
                        + Tambah Data
                    </Link>
                </div>
            }
        >
            <Head title="Manajemen Katalog" />

            <div className="relative">
                <div className="max-w-7xl mx-auto sm:px-6 pb-20 lg:px-8">
                    <div className=" overflow-hidden shadow-sm sm:rounded-lg">
                        <h4 className="text-4xl font-semibold mb-4 text-bluey">
                            Manajemen Katalog
                        </h4>
                        <div className="">
                            {courses.length === 0 ? (
                                <div className="text-center py-12">
                                    <p className="text-gray-500 text-lg">
                                        Belum ada kursus terdaftar
                                    </p>
                                </div>
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className="min-w-full bg-bluey-light divide-y divide-gray-500 rounded-lg">
                                        <thead className="bg-bluey-light">
                                            <tr>
                                                <th
                                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer transition-colors"
                                                    onClick={() => handleSort("title")}
                                                >
                                                    Nama Produk
                                                    <SortIcon columnKey="title" />
                                                </th>
                                                {/* Kategori and Harga omitted as per plan/model */}
                                                <th
                                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer transition-colors"
                                                    onClick={() => handleSort("created_at")}
                                                >
                                                    Diunggah Pada
                                                    <SortIcon columnKey="created_at" />
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Action
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-bluey-light divide-y divide-gray-500 rounded-lg">
                                            {sortedCourses.map((course) => (
                                                <tr key={course.id} className="">
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm font-medium text-gray-900">
                                                            {course.title}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-500">
                                                            {new Date(course.created_at).toLocaleDateString("id-ID", {
                                                                day: "numeric",
                                                                month: "long",
                                                                year: "numeric",
                                                            })}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap flex items-center text-sm font-medium">
                                                        <Link
                                                            href={route("admin.courses.show", course.id)}
                                                            className="text-bluey hover:text-blue-700 mr-3"
                                                            title="Lihat Detail"
                                                        >
                                                            <Eye />
                                                        </Link>
                                                        <Link
                                                            href={route("admin.courses.edit", course.id)}
                                                            className="text-orange-500 hover:text-orange-700 mr-3"
                                                            title="Edit"
                                                        >
                                                            <Edit />
                                                        </Link>
                                                        <button
                                                            onClick={() => handleDelete(course.id)}
                                                            className="text-red-600 hover:text-red-900"
                                                            title="Hapus"
                                                        >
                                                            <Trash />
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                {/* Floating Action Button */}
                <Link
                    href={route("admin.courses.create")}
                    className="fixed right-10 bottom-10 bg-bluey hover:text-bluey hover:bg-bluey-light text-white px-5 py-3 rounded-full shadow-lg z-50 transition duration-150"
                    style={{
                        boxShadow: "0 4px 14px 0 rgba(31,48,94,0.15)",
                        fontWeight: 600,
                        fontSize: "1.1rem",
                    }}
                >
                    + Tambah Data
                </Link>
            </div>
        </AuthenticatedLayout>
    );
}
