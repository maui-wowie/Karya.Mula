import React from "react";

export default function ProfileSummaryCard({ user }) {
    const MAIN_BG_COLOR = "linear-gradient(to top right, #3B84FF, #6271FF)";
    const TRANSLUCENT_CARD_COLOR = "rgba(105, 116, 217, 0.38)";

    return (
        <div
            className="w-full h-screen text-white relative flex flex-col items-center pt-8"
            style={{ background: MAIN_BG_COLOR }}
        >
            <div className="absolute top-4 left-4 text-xl font-bold">
                Karya Mula
            </div>

            <div
                className="w-4/5 py-12 px-8 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                           flex flex-col items-center justify-start rounded-2xl"
                style={{ background: TRANSLUCENT_CARD_COLOR }}
            >
                <div className="relative mb-6 flex-shrink-0">
                    <img
                        className="w-32 h-32 rounded-full border-4 border-white object-cover shadow-lg"
                        src={`https://i.pravatar.cc/150?u=${user.email}`}
                        alt={user.name}
                    />
                    <button
                        type="button"
                        className="absolute bottom-0 right-0 p-3 bg-white text-gray-700 rounded-full shadow-lg"
                        style={{ transform: "translate(10%, 10%)" }}
                        onClick={(e) => {
                            e.preventDefault();
                            console.log("Edit Foto Dinonaktifkan");
                        }}
                    >
                        <svg
                            className="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path
                                fillRule="evenodd"
                                d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A.5.5 0 0011.379 3H8.621a.5.5 0 00-.354.146L7.293 4.707A1 1 0 016.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </button>
                </div>

                {/* Fullname dan Username */}
                <div className="flex flex-col w-full justify-center text-center">
                    <h2 className="text-3xl font-bold">{user.name}</h2>
                    <p className="text-lg font-light text-gray-200 mb-6">
                        @{user.username || "user19873"}
                    </p>

                    {/* Bio */}
                    <p className="text-sm italic px-2 leading-relaxed">
                        {user.bio ||
                            `"Through every generation of the human race there has been a constant war, a war with fear. Those who have the courage to conquer it are made free and those who are conquered by it are made to suffer until they have the courage to defeat it, or death takes them."`}
                    </p>
                </div>
            </div>
        </div>
    );
}
