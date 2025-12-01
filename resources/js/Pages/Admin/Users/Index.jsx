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

export default function Index({ auth, users }) {
    const [deleteId, setDeleteId] = useState(null);
    const [sortConfig, setSortConfig] = useState({
        key: null,
        direction: "asc",
    });

    const handleDelete = (id) => {
        if (window.confirm("Apakah Anda yakin ingin menghapus user ini?")) {
            router.delete(route("admin.users.destroy", id), {
                onSuccess: () => {
                    alert("User berhasil dihapus!");
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

    const sortedUsers = useMemo(() => {
        let sortableUsers = [...users];
        if (sortConfig.key !== null) {
            sortableUsers.sort((a, b) => {
                let aValue = a[sortConfig.key];
                let bValue = b[sortConfig.key];

                // Handle sorting untuk completed_modules
                if (sortConfig.key === "completed_modules") {
                    aValue = a.completed_modules || 0;
                    bValue = b.completed_modules || 0;
                }

                // Convert ke string untuk perbandingan jika diperlukan
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
        return sortableUsers;
    }, [users, sortConfig]);

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
                        Kelola User
                    </h2>
                    <Link
                        href={route("admin.users.create")}
                        className="bg-bluey hover:bg-bluey-light text-white px-4 py-2 rounded-lg"
                    >
                        + Tambah User
                    </Link>
                </div>
            }
        >
            <Head title="Kelola User" />

            <div className="relative">
                <div className="max-w-7xl mx-auto sm:px-6 pb-20 lg:px-8">
                    <div className=" overflow-hidden shadow-sm sm:rounded-lg">
                        <h4 className="text-4xl font-semibold mb-4 text-bluey">
                            Manajemen Anggota
                        </h4>
                        <div className="">
                            {users.length === 0 ? (
                                <div className="text-center py-12">
                                    <p className="text-gray-500 text-lg">
                                        Belum ada user terdaftar
                                    </p>
                                </div>
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className="min-w-full bg-bluey-light divide-y divide-gray-500 rounded-lg">
                                        <thead className="bg-bluey-light">
                                            <tr>
                                                <th
                                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer transition-colors"
                                                    onClick={() =>
                                                        handleSort("id")
                                                    }
                                                >
                                                    ID Anggota
                                                    <SortIcon columnKey="id" />
                                                </th>
                                                <th
                                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer transition-colors"
                                                    onClick={() =>
                                                        handleSort("name")
                                                    }
                                                >
                                                    Nama Anggota
                                                    <SortIcon columnKey="name" />
                                                </th>
                                                <th
                                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer transition-colors"
                                                    onClick={() =>
                                                        handleSort("email")
                                                    }
                                                >
                                                    Email
                                                    <SortIcon columnKey="email" />
                                                </th>
                                                <th
                                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer transition-colors"
                                                    onClick={() =>
                                                        handleSort(
                                                            "completed_modules"
                                                        )
                                                    }
                                                >
                                                    Modul Selesai
                                                    <SortIcon columnKey="completed_modules" />
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Action
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-bluey-light divide-y divide-gray-500 rounded-lg">
                                            {sortedUsers.map((user) => (
                                                <tr key={user.id} className="">
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm font-medium text-gray-900">
                                                            #{user.id}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-900">
                                                            {user.name}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-900">
                                                            {user.email}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-500">
                                                            {user.completed_modules ||
                                                                0}{" "}
                                                            /{" "}
                                                            {user.total_modules ||
                                                                0}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap flex items-center justify-center text-sm font-medium text-right">
                                                        <Link
                                                            href={route(
                                                                "admin.users.show",
                                                                user.id
                                                            )}
                                                            className="text-bluey hover:text-blue-700 mr-3"
                                                            title="Lihat Detail"
                                                        >
                                                            <Eye />
                                                        </Link>
                                                        <Link
                                                            href={route(
                                                                "admin.users.edit",
                                                                user.id
                                                            )}
                                                            className="text-orange-500 hover:text-orange-700 mr-3"
                                                            title="Edit"
                                                        >
                                                            <Edit />
                                                        </Link>
                                                        <button
                                                            onClick={() =>
                                                                handleDelete(
                                                                    user.id
                                                                )
                                                            }
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
                {/* Tombol tambah data di kanan bawah */}
                <Link
                    href={route("admin.users.create")}
                    className="fixed right-10 bottom-10 bg-bluey hover:text-bluey hover:bg-bluey-light text-white px-5 py-3 rounded-full shadow-lg z-50 transition duration-150"
                    style={{
                        boxShadow: "0 4px 14px 0 rgba(31,48,94,0.15)",
                        fontWeight: 600,
                        fontSize: "1.1rem",
                    }}
                >
                    + Tambah User
                </Link>
            </div>
        </AuthenticatedLayout>
    );
}
