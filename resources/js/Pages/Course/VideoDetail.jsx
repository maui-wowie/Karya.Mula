import React, { useState, useEffect } from "react";
import CourseDetailLayout from "@/Layouts/CourseDetailLayout";
import { Head, Link, usePage } from "@inertiajs/react";
import axios from "axios";

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

const ProgressTracker = ({ activeTab }) => {
    const steps = [
        { id: "video", name: "Watch the Course" },
        { id: "quiz", name: "Do the Quiz" },
        { id: "task", name: "Make a Submission" },
    ];

    const activeIndex = steps.findIndex((step) => step.id === activeTab);

    const getStatus = (stepIndex) => {
        if (stepIndex < activeIndex) return "completed";
        if (stepIndex === activeIndex) return "active";
        return "pending";
    };

    const dotColor = {
        completed: "bg-green-600",
        active: "bg-blue-600",
        pending: "bg-gray-400",
    };

    const textColor = {
        completed: "text-green-600 font-semibold",
        active: "text-blue-600 font-semibold",
        pending: "text-gray-800",
    };

    const completedLineHeight = activeIndex * 40 + 6;

    return (
        <div className="bg-gray-100 p-6 rounded-xl shadow-lg mt-0">
            <h3 className="text-xl font-bold text-blue-800 mb-4">
                Progress Tracker
            </h3>

            <ul className="relative ml-2 space-y-4 text-gray-600">
                <div className="absolute left-[0.5px] top-0 bottom-0 w-0.5 bg-gray-400"></div>

                <div
                    className="absolute left-[0.5px] top-0 w-0.5 bg-green-600 transition-all duration-500"
                    style={{ height: `${completedLineHeight}px` }}
                ></div>

                {steps.map((step, index) => {
                    const status = getStatus(index);
                    return (
                        <li
                            key={step.id}
                            className="relative flex items-center h-10"
                        >
                            <div
                                className={`absolute -left-1.5 w-3.5 h-3.5 rounded-full z-10 ${dotColor[status]}`}
                            ></div>

                            <span className={`ml-4 ${textColor[status]}`}>
                                {step.name}
                            </span>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

const MentorBox = ({ mentorComment }) => (
    <div className="p-0 space-y-4 flex items-start space-x-4">
        <img
            src="https://i.pravatar.cc/150?img=4"
            alt="Mentor Avatar"
            className="w-16 h-16 rounded-full object-cover mt-1 flex-shrink-0"
        />
        <div>
            <h3 className="text-xl font-bold text-gray-800 mb-1">Mentor</h3>
            <p className="text-base text-gray-700 leading-relaxed">
                {mentorComment}
            </p>
        </div>
    </div>
);

const NextCourseLink = ({ nextCourse }) => {
    if (!nextCourse) {
        return (
            <div className="mt-8 p-4">
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                    Next Course
                </h3>
                <p className="text-sm mt-1 text-gray-500">
                    Anda sudah di video terakhir!
                </p>
            </div>
        );
    }

    const thumbnailUrl = getYoutubeThumbnail(nextCourse.youtube_url);

    return (
        <div className="mt-8">
            <h3 className="text-xl font-bold text-gray-800 mb-3">
                Next Course
            </h3>
            <Link
                href={route("course.video", nextCourse.id)}
                className="flex items-center space-x-3"
            >
                <div className="relative w-24 h-14 bg-gray-300 rounded-md overflow-hidden flex justify-center items-center">
                    <img
                        src={thumbnailUrl}
                        alt={nextCourse.title}
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                    <svg
                        className="w-8 h-8 text-white opacity-80"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path d="M6 18V6l12 6-12 6z" />
                    </svg>
                </div>
                <p className="text-lg font-semibold text-gray-700">
                    {nextCourse.title}
                </p>
            </Link>
        </div>
    );
};

const VideoTabContent = ({ course, nextCourse, activeTab }) => {
    const youtubeVideoId = getYoutubeVideoId(course.youtube_url);

    return (
        <div className="flex space-x-8">
            <div className="w-2/3">
                <div className="relative pt-[56.25%] bg-gray-300 rounded-xl overflow-hidden shadow-lg">
                    {youtubeVideoId ? (
                        <iframe
                            className="absolute inset-0 w-full h-full"
                            src={`https://www.youtube.com/embed/${youtubeVideoId}?autoplay=0&controls=1&showinfo=0&rel=0`}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            title={course.title}
                        ></iframe>
                    ) : (
                        <div className="absolute inset-0 flex justify-center items-center">
                            <svg
                                className="w-24 h-24 text-white opacity-80"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path d="M6 18V6l12 6-12 6z" />
                            </svg>
                        </div>
                    )}
                </div>

                <p className="mt-6 text-gray-700 leading-relaxed">
                    {course.description}
                </p>

                <div className="flex items-end space-x-3 mt-6 w-1/2">
                    <input
                        type="text"
                        placeholder="Add Feedback"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    />
                    <button className="p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                        <svg
                            className="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                        </svg>
                    </button>
                </div>
            </div>

            <div className="w-1/3 space-y-6">
                <MentorBox mentorComment={course.mentor_comment} />
                <ProgressTracker activeTab={activeTab} />
                <NextCourseLink nextCourse={nextCourse} />
            </div>
        </div>
    );
};

const QuizTabContent = ({ course, activeTab }) => {
    const [quizData, setQuizData] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [score, setScore] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchQuizData();
    }, []);

    const fetchQuizData = async () => {
        try {
            const response = await axios.get(`/api/course/${course.id}/quiz`);
            setQuizData(response.data.quizzes);

            // Load previous answers if exists
            if (response.data.userAnswers) {
                const answers = {};
                Object.values(response.data.userAnswers).forEach((answer) => {
                    answers[answer.quiz_id] = answer.selected_answer;
                });
                setSelectedAnswers(answers);
            }

            // Load score if exists
            if (response.data.userScore) {
                setScore(response.data.userScore);
                setIsSubmitted(true);
            }

            setLoading(false);
        } catch (error) {
            console.error("Error fetching quiz:", error);
            setLoading(false);
        }
    };

    const handleOptionClick = (quizId, optionKey) => {
        if (isSubmitted) return; // Don't allow changes after submission

        setSelectedAnswers((prev) => ({
            ...prev,
            [quizId]: optionKey,
        }));
    };

    const handleNext = () => {
        if (currentQuestionIndex < quizData.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };

    const handlePrevious = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };

    const handleSubmitQuiz = async () => {
        if (Object.keys(selectedAnswers).length !== quizData.length) {
            alert("Please answer all questions before submitting!");
            return;
        }

        try {
            const answers = quizData.map((quiz) => ({
                quiz_id: quiz.id,
                selected_answer: selectedAnswers[quiz.id],
            }));

            const response = await axios.post(
                `/api/course/${course.id}/quiz/submit`,
                { answers }
            );

            setScore(response.data);
            setIsSubmitted(true);
            alert(response.data.message);
        } catch (error) {
            console.error("Error submitting quiz:", error);
            alert("Failed to submit quiz. Please try again.");
        }
    };
    const getOptionStatus = (quiz, optionKey) => {
        if (!isSubmitted) {
            return selectedAnswers[quiz.id] === optionKey
                ? "selected"
                : "default";
        }

        const userAnswer = selectedAnswers[quiz.id];
        const correctAnswer = quiz.correct_answer;

        // Jawaban user dan benar
        if (optionKey === correctAnswer && optionKey === userAnswer) {
            return "correct-selected";
        }

        // Jawaban user tapi salah
        if (optionKey === userAnswer && optionKey !== correctAnswer) {
            return "wrong-selected";
        }

        // Jawaban yang benar (tapi user tidak pilih)
        if (optionKey === correctAnswer) {
            return "correct";
        }

        return "default";
    };

    const getOptionClass = (status) => {
        const baseClass =
            "w-full text-left p-4 rounded-lg transition-all duration-200 border font-medium";

        switch (status) {
            case "selected":
                return `${baseClass} bg-blue-100 border-blue-500 text-blue-800 shadow-inner`;
            case "correct-selected":
                return `${baseClass} bg-green-100 border-green-600 text-green-800 shadow-md`;
            case "wrong-selected":
                return `${baseClass} bg-red-100 border-red-600 text-red-800 shadow-md`;
            case "correct":
                return `${baseClass} bg-green-50 border-green-400 text-green-700`;
            default:
                return `${baseClass} bg-white border-gray-300 text-gray-700 hover:bg-gray-100`;
        }
    };
    const getOptionIcon = (status) => {
        switch (status) {
            case "correct-selected":
                return (
                    <svg
                        className="w-5 h-5 text-green-600 ml-2"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                        />
                    </svg>
                );
            case "wrong-selected":
                return (
                    <svg
                        className="w-5 h-5 text-red-600 ml-2"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                            clipRule="evenodd"
                        />
                    </svg>
                );
            case "correct":
                return (
                    <span className="ml-2 text-xs text-green-600 font-semibold">
                        (Correct Answer)
                    </span>
                );
            default:
                return null;
        }
    };
    const handleRetakeQuiz = async () => {
        if (
            confirm(
                "Are you sure you want to retake this quiz? Your current score will be deleted."
            )
        ) {
            try {
                await axios.post(`/api/course/${course.id}/quiz/reset`);
                setSelectedAnswers({});
                setIsSubmitted(false);
                setScore(null);
                setCurrentQuestionIndex(0);
            } catch (error) {
                console.error("Error resetting quiz:", error);
                alert("Failed to reset quiz. Please try again.");
            }
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <p className="text-gray-600">Loading quiz...</p>
            </div>
        );
    }

    if (quizData.length === 0) {
        return (
            <div className="text-center py-12">
                <p className="text-gray-600 text-lg">
                    No quiz available for this course yet.
                </p>
            </div>
        );
    }

    const currentQuiz = quizData[currentQuestionIndex];

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-gray-800">Quiz</h2>
                {isSubmitted && (
                    <div className="flex items-center space-x-4">
                        <div
                            className={`px-4 py-2 rounded-lg font-bold ${
                                score?.is_passed
                                    ? "bg-green-100 text-green-800"
                                    : "bg-red-100 text-red-800"
                            }`}
                        >
                            Score: {score?.score}% ({score?.correct_answers}/
                            {score?.total_questions})
                        </div>
                        <button
                            onClick={handleRetakeQuiz}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Retake Quiz
                        </button>
                    </div>
                )}
            </div>

            <div className="bg-gray-100 p-8 rounded-xl shadow-lg">
                <div className="mb-8">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-bold text-gray-800">
                            Question {currentQuestionIndex + 1} of{" "}
                            {quizData.length}
                        </h3>
                        <div className="flex space-x-2">
                            {quizData.map((quiz, index) => {
                                const isAnswered = selectedAnswers[quiz.id];
                                const isCorrect =
                                    isSubmitted &&
                                    selectedAnswers[quiz.id] ===
                                        quiz.correct_answer;

                                return (
                                    <button
                                        key={index}
                                        onClick={() =>
                                            setCurrentQuestionIndex(index)
                                        }
                                        className={`w-8 h-8 rounded-full font-semibold transition-all ${
                                            index === currentQuestionIndex
                                                ? "bg-blue-600 text-white ring-2 ring-blue-300"
                                                : isSubmitted && isCorrect
                                                ? "bg-green-500 text-white"
                                                : isSubmitted && isAnswered
                                                ? "bg-red-500 text-white"
                                                : isAnswered
                                                ? "bg-green-500 text-white"
                                                : "bg-gray-300 text-gray-700"
                                        }`}
                                    >
                                        {index + 1}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                    <p className="text-gray-700 text-lg leading-relaxed">
                        {currentQuiz.question}
                    </p>
                </div>

                <div className="flex space-x-8">
                    <div className="w-2/3 space-y-4">
                        {currentQuiz.options.map((option) => {
                            const status = getOptionStatus(
                                currentQuiz,
                                option.key
                            );

                            return (
                                <button
                                    key={option.key}
                                    onClick={() =>
                                        handleOptionClick(
                                            currentQuiz.id,
                                            option.key
                                        )
                                    }
                                    disabled={isSubmitted}
                                    className={`${getOptionClass(status)} ${
                                        isSubmitted
                                            ? "cursor-not-allowed"
                                            : "cursor-pointer"
                                    }`}
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <span className="font-bold mr-3">
                                                {option.key}.
                                            </span>
                                            <span>{option.text}</span>
                                        </div>
                                        {getOptionIcon(status)}
                                    </div>
                                </button>
                            );
                        })}

                        <div className="flex justify-between mt-6">
                            <button
                                onClick={handlePrevious}
                                disabled={currentQuestionIndex === 0}
                                className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                ← Previous
                            </button>

                            {currentQuestionIndex === quizData.length - 1 ? (
                                !isSubmitted && (
                                    <button
                                        onClick={handleSubmitQuiz}
                                        className="px-6 py-2 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition-colors"
                                    >
                                        Submit Quiz ✓
                                    </button>
                                )
                            ) : (
                                <button
                                    onClick={handleNext}
                                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                >
                                    Next →
                                </button>
                            )}
                        </div>
                    </div>

                    <div className="w-1/3 flex-shrink-0">
                        <div className="bg-white p-6 rounded-xl shadow-lg">
                            <h3 className="text-xl font-bold text-blue-800 mb-4">
                                Progress Tracker
                            </h3>
                            <div className="space-y-4">
                                <div
                                    className={`p-3 rounded-lg ${
                                        activeTab === "video"
                                            ? "bg-green-100"
                                            : "bg-gray-100"
                                    }`}
                                >
                                    <div className="flex items-center">
                                        <div
                                            className={`w-3 h-3 rounded-full mr-3 ${
                                                activeTab === "video"
                                                    ? "bg-green-600"
                                                    : "bg-gray-400"
                                            }`}
                                        ></div>
                                        <span className="font-medium">
                                            Watch the Course
                                        </span>
                                    </div>
                                </div>
                                <div
                                    className={`p-3 rounded-lg ${
                                        activeTab === "quiz"
                                            ? "bg-blue-100"
                                            : "bg-gray-100"
                                    }`}
                                >
                                    <div className="flex items-center">
                                        <div
                                            className={`w-3 h-3 rounded-full mr-3 ${
                                                activeTab === "quiz"
                                                    ? "bg-blue-600"
                                                    : "bg-gray-400"
                                            }`}
                                        ></div>
                                        <span className="font-medium">
                                            Do the Quiz
                                        </span>
                                    </div>
                                </div>
                                <div className="p-3 rounded-lg bg-gray-100">
                                    <div className="flex items-center">
                                        <div className="w-3 h-3 rounded-full mr-3 bg-gray-400"></div>
                                        <span className="font-medium">
                                            Make a Submission
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const TaskTabContent = ({ course, activeTab }) => {
    const [file, setFile] = useState(null);
    const [notes, setNotes] = useState("");
    const [submission, setSubmission] = useState(null);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [dragActive, setDragActive] = useState(false);

    useEffect(() => {
        fetchSubmission();
    }, []);

    const fetchSubmission = async () => {
        try {
            const response = await axios.get(`/api/course/${course.id}/task`);
            setSubmission(response.data.submission);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching submission:", error);
            setLoading(false);
        }
    };

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            setFile(e.dataTransfer.files[0]);
        }
    };

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const handleSubmit = async () => {
        if (!file) {
            alert("Please select a file to upload");
            return;
        }

        // Check file size (max 10MB)
        if (file.size > 10 * 1024 * 1024) {
            alert("File size must be less than 10MB");
            return;
        }

        setUploading(true);

        try {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("notes", notes);

            const response = await axios.post(
                `/api/course/${course.id}/task/submit`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            setSubmission(response.data.submission);
            setFile(null);
            setNotes("");
            alert(response.data.message);
        } catch (error) {
            console.error("Error submitting task:", error);
            alert("Failed to submit task. Please try again.");
        } finally {
            setUploading(false);
        }
    };

    const handleDelete = async () => {
        if (!confirm("Are you sure you want to delete this submission?")) {
            return;
        }

        try {
            await axios.post(`/api/course/${course.id}/task/delete`);
            setSubmission(null);
            alert("Submission deleted successfully");
        } catch (error) {
            console.error("Error deleting submission:", error);
            alert("Failed to delete submission. Please try again.");
        }
    };

    const handleDownload = () => {
        window.open(`/api/course/${course.id}/task/download`, "_blank");
    };

    const formatFileSize = (bytes) => {
        if (bytes === 0) return "0 Bytes";
        const k = 1024;
        const sizes = ["Bytes", "KB", "MB", "GB"];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return (
            Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i]
        );
    };

    const getStatusBadge = (status) => {
        const badges = {
            pending: "bg-yellow-100 text-yellow-800",
            approved: "bg-green-100 text-green-800",
            rejected: "bg-red-100 text-red-800",
        };
        return badges[status] || badges.pending;
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <p className="text-gray-600">Loading task...</p>
            </div>
        );
    }

    return (
        <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
                Task Submission
            </h2>

            <div className="bg-gray-100 p-8 rounded-xl shadow-lg">
                <p className="text-gray-700 text-lg leading-relaxed mb-8">
                    {course.task_description ||
                        "No task description available."}
                </p>

                <div className="flex space-x-8">
                    <div className="w-2/3">
                        {submission ? (
                            // Show submitted task
                            <div className="bg-white p-6 rounded-xl border-2 border-gray-300">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-xl font-bold text-gray-800">
                                        Your Submission
                                    </h3>
                                    <span
                                        className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusBadge(
                                            submission.status
                                        )}`}
                                    >
                                        {submission.status.toUpperCase()}
                                    </span>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                                        <svg
                                            className="w-10 h-10 text-blue-600 mr-4"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                        <div className="flex-1">
                                            <p className="font-semibold text-gray-800">
                                                {submission.file_name}
                                            </p>
                                            <p className="text-sm text-gray-500">
                                                {formatFileSize(
                                                    submission.file_size
                                                )}{" "}
                                                • Submitted{" "}
                                                {new Date(
                                                    submission.submitted_at
                                                ).toLocaleDateString()}
                                            </p>
                                        </div>
                                        <button
                                            onClick={handleDownload}
                                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 mr-2"
                                        >
                                            Download
                                        </button>
                                    </div>

                                    {submission.notes && (
                                        <div className="p-4 bg-blue-50 rounded-lg">
                                            <p className="text-sm font-semibold text-gray-700 mb-1">
                                                Your Notes:
                                            </p>
                                            <p className="text-gray-600">
                                                {submission.notes}
                                            </p>
                                        </div>
                                    )}

                                    {submission.mentor_feedback && (
                                        <div className="p-4 bg-green-50 rounded-lg">
                                            <p className="text-sm font-semibold text-gray-700 mb-1">
                                                Mentor Feedback:
                                            </p>
                                            <p className="text-gray-600">
                                                {submission.mentor_feedback}
                                            </p>
                                        </div>
                                    )}

                                    {submission.score !== null && (
                                        <div className="p-4 bg-purple-50 rounded-lg">
                                            <p className="text-sm font-semibold text-gray-700 mb-1">
                                                Score:
                                            </p>
                                            <p className="text-2xl font-bold text-purple-600">
                                                {submission.score}/100
                                            </p>
                                        </div>
                                    )}

                                    <button
                                        onClick={handleDelete}
                                        className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                                    >
                                        Delete & Resubmit
                                    </button>
                                </div>
                            </div>
                        ) : (
                            // Upload form
                            <>
                                <div
                                    onDragEnter={handleDrag}
                                    onDragLeave={handleDrag}
                                    onDragOver={handleDrag}
                                    onDrop={handleDrop}
                                    className={`border-4 border-dashed rounded-xl p-20 flex flex-col justify-center items-center text-center transition-colors ${
                                        dragActive
                                            ? "border-blue-500 bg-blue-50"
                                            : "border-gray-300 bg-white"
                                    }`}
                                >
                                    <svg
                                        className="w-16 h-16 text-gray-400 mb-4"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                        />
                                    </svg>

                                    {file ? (
                                        <div className="mb-4">
                                            <p className="font-semibold text-gray-800 mb-1">
                                                {file.name}
                                            </p>
                                            <p className="text-sm text-gray-500">
                                                {formatFileSize(file.size)}
                                            </p>
                                            <button
                                                onClick={() => setFile(null)}
                                                className="mt-2 text-red-600 hover:text-red-700 text-sm font-semibold"
                                            >
                                                Remove file
                                            </button>
                                        </div>
                                    ) : (
                                        <>
                                            <p className="text-gray-600 font-semibold mb-2">
                                                Drag and drop your file here, or
                                            </p>
                                            <label className="cursor-pointer px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                                                Browse Files
                                                <input
                                                    type="file"
                                                    onChange={handleFileChange}
                                                    className="hidden"
                                                    accept=".pdf,.doc,.docx,.zip,.rar,.ppt,.pptx"
                                                />
                                            </label>
                                            <p className="text-sm text-gray-500 mt-2">
                                                Max file size: 10MB
                                            </p>
                                        </>
                                    )}
                                </div>

                                <div className="mt-4">
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Notes (Optional)
                                    </label>
                                    <textarea
                                        value={notes}
                                        onChange={(e) =>
                                            setNotes(e.target.value)
                                        }
                                        placeholder="Add any notes about your submission..."
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                        rows="3"
                                        maxLength="1000"
                                    />
                                </div>

                                <div className="mt-4 flex justify-end">
                                    <button
                                        onClick={handleSubmit}
                                        disabled={!file || uploading}
                                        className="px-6 py-2 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {uploading
                                            ? "Uploading..."
                                            : "Submit Task"}
                                    </button>
                                </div>
                            </>
                        )}
                    </div>

                    <div className="w-1/3 flex-shrink-0">
                        <ProgressTracker activeTab={activeTab} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default function CourseDetailTabs({
    auth,
    course,
    nextCourse,
    activeTab,
}) {
    return (
        <CourseDetailLayout course={course} activeTab={activeTab}>
            <Head
                title={`Course: ${course.title} - ${activeTab.toUpperCase()}`}
            />

            {activeTab === "video" && (
                <VideoTabContent
                    course={course}
                    nextCourse={nextCourse}
                    activeTab={activeTab}
                />
            )}
            {activeTab === "quiz" && (
                <QuizTabContent course={course} activeTab={activeTab} />
            )}
            {activeTab === "task" && (
                <TaskTabContent course={course} activeTab={activeTab} />
            )}
        </CourseDetailLayout>
    );
}
