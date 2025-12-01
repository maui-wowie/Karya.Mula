import React from "react";
import { Link, usePage } from "@inertiajs/react";

export default function Header({ user, content }) {
    const { url } = usePage();
    const isDashboard =
        url === route("dashboard", undefined, false) || url === "/dashboard";

    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return "Good Morning";
        if (hour < 18) return "Good Afternoon";
        return "Good Evening";
    };

    const fullName = user ? user.name : "Guest";
    const firstName = fullName.split(" ")[0];

    const greetingContent =
        isDashboard && user ? (
            <h1 className="text-2xl font-semibold">
                {getGreeting()}, {firstName}!
            </h1>
        ) : null;

    const mainContent = content ? content : greetingContent;

    return (
        <div className="flex justify-between items-center text-white h-20">
            <div>{mainContent}</div>

            {user && (
                <Link href={route("profile.me")}>
                    <div className="flex items-center space-x-3 cursor-pointer">
                        <span className="text-lg hidden md:inline">
                            {fullName}
                        </span>
                        <img
                            className="w-12 h-12 rounded-full border-2 border-white "
                            src={`https://i.pravatar.cc/150?u=${user.email}`}
                            alt="Profile Avatar"
                        />
                    </div>
                </Link>
            )}
        </div>
    );
}
