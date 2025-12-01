import React from "react";
import { Link } from "@inertiajs/react";
import SiteLogo from "@/Components/SiteLogo";

const GRADIENT_SIDEBAR = "linear-gradient(to bottom, #3B84FF, #6271FF)";

// Menu untuk USER biasa
const userMenuItems = [
    { name: "Dashboard", route: "dashboard", hidden: false, group: "main" },
    {
        name: "Katalog & Belajar",
        route: "courses.index",
        hidden: false,
        group: "main",
    },
    {
        name: "Penilaian & Sertifikasi",
        route: "assessment.index",
        hidden: false,
        group: "main",
    },
    {
        name: "Konsultasi Mentor",
        route: "consult.index",
        hidden: false,
        group: "main",
    },
    {
        name: "Studio Kreasi",
        route: "studio.index",
        hidden: false,
        group: "main",
    },
    { name: "Toko Saya", route: "shop.index", hidden: false, group: "main" },
    {
        name: "Pendanaan Mikro",
        route: "finance.index",
        hidden: false,
        group: "main",
    },
    {
        name: "Analitik Pasar",
        route: "analytics.index",
        hidden: false,
        group: "main",
    },
    {
        name: "Profil Saya",
        route: "profile.me",
        hidden: false,
        group: "footer",
    },
];

// Menu untuk ADMIN
const adminMenuItems = [
    {
        name: "Dashboard",
        route: "admin.dashboard",
        hidden: false,
        group: "main",
    },
    {
        name: "Manajemen Anggota",
        route: "admin.users.index",
        hidden: false,
        group: "main",
    },
    {
        name: "Manajemen Katalog",
        route: "admin.courses.index",
        hidden: false,
        group: "main",
    },
    {
        name: "Analitik Platform",
        route: "admin.analytics",
        hidden: false,
        group: "main",
    },
];

const SidebarItem = ({ name, url, currentUrl }) => {
    const isActive = currentUrl.startsWith(url) && url !== "/";

    const ACTIVE_BG_COLOR = "#9CA5FF";

    const finalStyle = {
        background: isActive ? ACTIVE_BG_COLOR : "transparent",
        color: "white",
        boxShadow: "none",
        fontWeight: "600",
        transition: "background-color 150ms ease-in-out",
    };

    return (
        <Link
            href={url}
            className={`
                block px-6 py-3 my-2 text-sm rounded-xl font-semibold w-full text-center
                ${isActive ? "" : "sidebar-menu-hover"} 
            `}
            style={finalStyle}
        >
            {name}
        </Link>
    );
};

export default function Sidebar({ currentUrl, user }) {
    const isGuest = !user;
    const isAdmin = user?.role === "admin";
    // Pilih menu berdasarkan role
    const menuItems = isAdmin ? adminMenuItems : userMenuItems;

    const mainNavItems = menuItems.filter((item) => {
        if (item.name === "Dashboard" && isGuest) return false;
        return item.group === "main" && !item.hidden;
    });

    const footerNavItems = menuItems.filter(
        (item) => item.group === "footer" && !item.hidden
    );

    return (
        <div
            className="h-full w-full p-4 text-white"
            style={{
                background: GRADIENT_SIDEBAR,
                borderRadius: "0 20px 20px 0",
            }}
        >
            <div className="flex flex-col h-full justify-between">
                <div className="p-4 -mb-4 -mt-8 flex justify-center items-center flex-shrink-0">
                    <SiteLogo width="w-24" height="h-24" />
                </div>

                {/* Badge Admin */}
                {isAdmin && (
                    <div className="text-center mb-2">
                        <span className="bg-white text-gray-900 px-3 py-1 rounded-full text-xs font-bold">
                            ADMIN
                        </span>
                    </div>
                )}

                <nav className="flex-grow flex flex-col justify-center items-center space-y-0">
                    {mainNavItems.map((item) => (
                        <SidebarItem
                            key={item.name}
                            name={item.name}
                            url={route(item.route)}
                            currentUrl={currentUrl}
                        />
                    ))}
                </nav>

                <div className="flex flex-col flex-shrink-0 mt-auto mb-4 items-center">
                    {!isGuest &&
                        footerNavItems.map((item) => (
                            <SidebarItem
                                key={item.name}
                                name={item.name}
                                url={route(item.route)}
                                currentUrl={currentUrl}
                            />
                        ))}

                    {isGuest ? (
                        <>
                            <SidebarItem
                                name="Login"
                                url={route("login")}
                                currentUrl={currentUrl}
                            />
                            <SidebarItem
                                name="Register"
                                url={route("register")}
                                currentUrl={currentUrl}
                            />
                        </>
                    ) : (
                        <Link
                            href={route("logout")}
                            method="post"
                            as="button"
                            className="block px-6 py-3 my-2 text-sm text-white hover:bg-red-600 rounded-xl w-full font-semibold"
                        >
                            Logout
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
}
