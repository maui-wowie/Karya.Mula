import React from "react";
import { Link, Head, usePage } from "@inertiajs/react";

const TAB_COLOR = "linear-gradient(to right, #3B84FF, #6271FF)";

export default function CourseDetailLayout({ course, activeTab, children }) {
    const { auth } = usePage().props;
    const user = auth.user;

    const tabs = [
        { name: "Video", key: "video", routeName: "course.video" },
        { name: "Quiz", key: "quiz", routeName: "course.quiz" },
        { name: "Task", key: "task", routeName: "course.task" },
    ];

    return (
        <div className="min-h-screen bg-gray-100">
            <Head title={`Detail Course: ${course.title}`} />

            <header className="w-full shadow-md bg-white">
                <div
                    className="flex justify-between items-center h-20 p-4"
                    style={{ background: TAB_COLOR }}
                >
                    <div className="flex h-full items-center space-x-6 px-4">
                        {tabs.map((tab) => (
                            <Link
                                key={tab.key}
                                href={route(tab.routeName, course.id)}
                                className={`text-lg font-semibold h-full flex items-center transition duration-200 
                                            ${
                                                activeTab === tab.key
                                                    ? "text-white border-b-4 border-white"
                                                    : "text-white text-opacity-70 hover:text-opacity-100"
                                            }`}
                            >
                                {tab.name}
                            </Link>
                        ))}
                    </div>

                    <div className="flex items-center space-x-4 pr-4">
                        <Link
                            href={route("courses.index")}
                            className="text-white font-semibold hover:underline"
                        >
                            Kembali
                        </Link>
                        <img
                            className="w-10 h-10 rounded-full border-2 border-white object-cover"
                            src={`https://i.pravatar.cc/150?u=${user.email}`}
                            alt={user.name}
                        />
                    </div>
                </div>
            </header>

            <main className="p-8">{children}</main>
        </div>
    );
}
