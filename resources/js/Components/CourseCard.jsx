import React from "react";

const getYoutubeVideoId = (url) => {
    const regExp =
        /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
};
const getYoutubeThumbnail = (url) => {
    const videoId = getYoutubeVideoId(url);
    return videoId
        ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
        : "https://via.placeholder.com/320x180?text=No+Video";
};

export default function CourseCard({ youtubeUrl }) {
    const thumbnailUrl = getYoutubeThumbnail(youtubeUrl);

    return (
        <div className="group block w-full rounded-lg overflow-hidden shadow-sm transition duration-300 ease-in-out hover:shadow-lg transform hover:-translate-y-0.5 cursor-pointer">
            <div className="relative pt-[56.25%] bg-gray-300">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${thumbnailUrl})` }}
                ></div>

                <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-50 transition duration-300"></div>

                <div className="absolute inset-0 flex justify-center items-center backdrop-blur-sm">
                    <svg
                        className="w-16 h-16 text-white opacity-90 transition duration-300 transform group-hover:scale-110 group-hover:opacity-100"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path d="M6 18V6l12 6-12 6z" />
                    </svg>
                </div>
            </div>
        </div>
    );
}
