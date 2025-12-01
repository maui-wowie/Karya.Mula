import React from "react";
import { Head, Link, usePage } from "@inertiajs/react";
import SiteLogo from "@/Components/SiteLogo";
import { LogIn, UserPlus, BookOpen, Home } from "lucide-react";

const GRADIENT_HEADER = "linear-gradient(to right, #3B84FF, #6271FF)";
const GRADIENT_SIDEBAR = "linear-gradient(to bottom, #3B84FF, #6271FF)";

export default function GuestLayout({ children }) {
    const { url } = usePage();
    const currentUrl = url;
    const sidebarWidthClass = "w-64";
    const contentOffsetClass = "ml-64";

    return (
        <>
            <Head title="KaryaMula - Platform Pembelajaran" />

            <div className="min-h-screen flex bg-gray overflow-x-hidden relative">
                {/* Guest Sidebar */}
                <aside
                    className={`fixed h-screen ${sidebarWidthClass} z-20 flex-shrink-0 shadow-2xl`}
                    style={{
                        background: GRADIENT_SIDEBAR,
                        borderRadius: "0 20px 0 0",
                    }}
                >
                    <div className="h-full w-full p-4 text-white">
                        <div className="flex flex-col h-full justify-between">
                            {/* Logo - Same as Sidebar component */}
                            <div className="p-4 -mb-4 -mt-8 flex justify-center items-center flex-shrink-0">
                                <SiteLogo width="w-24" height="h-24" />
                            </div>

                            {/* Navigation */}
                            <nav className="flex-grow flex flex-col justify-center items-center space-y-0">
                                <Link
                                    href={route("dashboard")}
                                    className={`block px-6 py-3 my-2 text-sm rounded-xl font-semibold w-full text-center ${
                                        currentUrl === route("dashboard")
                                            ? "bg-[#9CA5FF]"
                                            : "sidebar-menu-hover"
                                    }`}
                                >
                                    Beranda
                                </Link>
                                <Link
                                    href={route("courses.index")}
                                    className={`block px-6 py-3 my-2 text-sm rounded-xl font-semibold w-full text-center ${
                                        currentUrl === route("courses.index")
                                            ? "bg-[#9CA5FF]"
                                            : "sidebar-menu-hover"
                                    }`}
                                >
                                    Katalog Kursus
                                </Link>
                            </nav>

                            {/* Auth Buttons */}
                            <div className="flex flex-col flex-shrink-0 mt-auto mb-4 items-center">
                                <Link
                                    href={route("login")}
                                    className="block px-6 py-3 my-2 text-sm rounded-xl font-semibold w-full text-center sidebar-menu-hover"
                                >
                                    Login
                                </Link>
                                <Link
                                    href={route("register")}
                                    className="block px-6 py-3 my-2 text-sm rounded-xl font-semibold w-full text-center sidebar-menu-hover"
                                >
                                    Daftar
                                </Link>
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Guest Header */}
                <header
                    className="fixed top-0 left-0 w-full p-4 flex-shrink-0 z-10"
                    style={{
                        background: GRADIENT_HEADER,
                        height: "7rem",
                        borderRadius: "0 0 20px 20px",
                    }}
                >
                    <div className={contentOffsetClass}>
                        <div className="flex items-center justify-between h-full px-6">
                            <div>
                                <h2 className="text-2xl font-bold text-white">
                                    Selamat Datang di KaryaMula
                                </h2>
                                <p className="text-blue-100 mt-1">
                                    Jelajahi kursus dan mulai perjalanan belajar
                                    Anda
                                </p>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Main Content */}
                <div
                    className={`flex flex-col flex-grow ${contentOffsetClass} w-full`}
                >
                    <main
                        className="p-8 flex-grow"
                        style={{ paddingTop: "6rem" }}
                    >
                        {children}
                    </main>
                </div>
            </div>
        </>
    );
}
