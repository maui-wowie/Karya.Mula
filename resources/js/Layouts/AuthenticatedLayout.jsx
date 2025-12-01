import React from "react";
import { Head, usePage } from "@inertiajs/react";
import Sidebar from "@/Components/Sidebar";
import Header from "@/Components/Header";
import FlashMessage from "@/Components/FlashMessage";

const GRADIENT_HEADER = "linear-gradient(to right, #3B84FF, #6271FF)";
const GRADIENT_SIDEBAR = "linear-gradient(to bottom, #3B84FF, #6271FF)";

export default function AuthenticatedLayout({ user, headerContent, children }) {
    const { url } = usePage();
    const currentUrl = url;
    const sidebarWidthClass = "w-64";
    const contentOffsetClass = "ml-64";

    // Check if user is authenticated
    const isAuthenticated = user !== null && user !== undefined;
    const isAdmin = isAuthenticated && user.role === "admin";

    return (
        <>
            <Head title="KaryaMula Dashboard" />

            <div className="min-h-screen flex bg-gray overflow-x-hidden relative">
                {/* Sidebar - Only show if authenticated */}
                {isAuthenticated && (
                    <aside
                        className={`fixed h-screen ${sidebarWidthClass} z-20 flex-shrink-0 shadow-2xl`}
                        style={{
                            background: GRADIENT_SIDEBAR,
                            borderRadius: "0 20px 0 0",
                        }}
                    >
                        <Sidebar currentUrl={currentUrl} user={user} />
                    </aside>
                )}

                {/* Header - Only show if authenticated and not admin */}
                {isAuthenticated && !isAdmin && (
                    <header
                        className="fixed top-0 left-0 w-full p-4 flex-shrink-0 z-10"
                        style={{
                            background: GRADIENT_HEADER,
                            height: "7rem",
                            borderRadius: "0 0 20px 20px",
                        }}
                    >
                        <div className={contentOffsetClass}>
                            <Header user={user} content={headerContent} />
                        </div>
                    </header>
                )}

                {/* Main Content */}
                <div
                    className={`flex flex-col flex-grow ${
                        isAuthenticated ? contentOffsetClass : "w-full"
                    }`}
                >
                    <main
                        className="p-8 flex-grow"
                        style={{
                            paddingTop:
                                isAuthenticated && !isAdmin ? "6rem" : "2rem",
                        }}
                    >
                        {children}
                    </main>
                </div>
            </div>

            {/* Flash Messages */}
            <FlashMessage />
        </>
    );
}
