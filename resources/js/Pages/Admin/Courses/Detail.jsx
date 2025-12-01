import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import {
    ArrowLeft,
    BookOpen,
    Youtube,
    FileText,
    HelpCircle,
    Edit,
    Trash,
    Plus,
} from "lucide-react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import { useState } from "react";

export default function Detail({ auth, course }) {
    const [showQuizForm, setShowQuizForm] = useState(false);
    const { data, setData, post, processing, errors, reset } = useForm({
        question: "",
        correct_answer: "A",
        options: {
            A: "",
            B: "",
            C: "",
            D: "",
        },
    });

    const submitQuiz = (e) => {
        e.preventDefault();
        post(route("admin.courses.quizzes.store", course.id), {
            onSuccess: () => {
                reset();
                setShowQuizForm(false);
            },
        });
    };

    const handleOptionChange = (key, value) => {
        setData("options", {
            ...data.options,
            [key]: value,
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Detail Kursus
                    </h2>
                    <Link
                        href={route("admin.courses.index")}
                        className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                    >
                        <ArrowLeft size={18} />
                        Kembali
                    </Link>
                </div>
            }
        >
            <Head title={`Detail Kursus - ${course.title}`} />

            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                {/* Course Header Card */}
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg mb-6">
                    <div className="p-6">
                        <div className="flex items-start justify-between mb-6">
                            <div className="flex items-center gap-4">
                                {course.thumbnail_url ? (
                                    <img
                                        src={course.thumbnail_url}
                                        alt={course.title}
                                        className="w-32 h-20 object-cover rounded-lg"
                                    />
                                ) : (
                                    <div className="w-32 h-20 bg-bluey text-white rounded-lg flex items-center justify-center text-3xl font-bold">
                                        <BookOpen />
                                    </div>
                                )}
                                <div>
                                    <h3 className="text-2xl font-bold text-gray-900">
                                        {course.title}
                                    </h3>
                                    <span className="inline-block mt-2 px-3 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full">
                                        ID: #{course.id}
                                    </span>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <Link
                                    href={route("admin.courses.edit", course.id)}
                                    className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                                >
                                    <Edit size={18} />
                                    Edit
                                </Link>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="mb-6">
                            <h4 className="text-lg font-semibold text-gray-900 mb-2">
                                Deskripsi
                            </h4>
                            <p className="text-gray-700 whitespace-pre-line">
                                {course.description}
                            </p>
                        </div>

                        {/* Details Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="p-4 bg-gray-50 rounded-lg">
                                <div className="flex items-center gap-2 mb-2">
                                    <Youtube className="text-red-600" size={20} />
                                    <h5 className="font-semibold text-gray-900">
                                        Video Youtube
                                    </h5>
                                </div>
                                <a
                                    href={course.youtube_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:underline break-all"
                                >
                                    {course.youtube_url}
                                </a>
                            </div>

                            <div className="p-4 bg-gray-50 rounded-lg">
                                <div className="flex items-center gap-2 mb-2">
                                    <FileText className="text-bluey" size={20} />
                                    <h5 className="font-semibold text-gray-900">
                                        Komentar Mentor
                                    </h5>
                                </div>
                                <p className="text-gray-700">
                                    {course.mentor_comment || "-"}
                                </p>
                            </div>

                            <div className="p-4 bg-gray-50 rounded-lg">
                                <div className="flex items-center gap-2 mb-2">
                                    <HelpCircle className="text-bluey" size={20} />
                                    <h5 className="font-semibold text-gray-900">
                                        Deskripsi Kuis
                                    </h5>
                                </div>
                                <p className="text-gray-700">
                                    {course.quiz_description || "-"}
                                </p>
                            </div>

                            <div className="p-4 bg-gray-50 rounded-lg">
                                <div className="flex items-center gap-2 mb-2">
                                    <BookOpen className="text-bluey" size={20} />
                                    <h5 className="font-semibold text-gray-900">
                                        Deskripsi Tugas
                                    </h5>
                                </div>
                                <p className="text-gray-700">
                                    {course.task_description || "-"}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quizzes Section */}
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg mb-6">
                    <div className="p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h4 className="text-xl font-bold text-gray-900">
                                Daftar Kuis
                            </h4>
                            <button
                                onClick={() => setShowQuizForm(!showQuizForm)}
                                className="bg-bluey hover:bg-bluey-light text-white px-4 py-2 rounded-lg flex items-center gap-2"
                            >
                                <Plus size={18} />
                                {showQuizForm ? "Batal" : "Tambah Kuis"}
                            </button>
                        </div>

                        {/* Add Quiz Form */}
                        {showQuizForm && (
                            <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                                <h5 className="text-lg font-semibold mb-4">
                                    Tambah Kuis Baru
                                </h5>
                                <form onSubmit={submitQuiz} className="space-y-4">
                                    <div>
                                        <InputLabel htmlFor="question" value="Pertanyaan" />
                                        <textarea
                                            id="question"
                                            className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                            value={data.question}
                                            onChange={(e) => setData("question", e.target.value)}
                                            required
                                            rows="2"
                                        />
                                        <InputError message={errors.question} className="mt-2" />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {["A", "B", "C", "D"].map((key) => (
                                            <div key={key}>
                                                <InputLabel
                                                    htmlFor={`option_${key}`}
                                                    value={`Opsi ${key}`}
                                                />
                                                <TextInput
                                                    id={`option_${key}`}
                                                    type="text"
                                                    className="mt-1 block w-full"
                                                    value={data.options[key]}
                                                    onChange={(e) =>
                                                        handleOptionChange(key, e.target.value)
                                                    }
                                                    required
                                                />
                                                <InputError
                                                    message={errors[`options.${key}`]}
                                                    className="mt-2"
                                                />
                                            </div>
                                        ))}
                                    </div>

                                    <div>
                                        <InputLabel
                                            htmlFor="correct_answer"
                                            value="Jawaban Benar"
                                        />
                                        <select
                                            id="correct_answer"
                                            className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                            value={data.correct_answer}
                                            onChange={(e) =>
                                                setData("correct_answer", e.target.value)
                                            }
                                            required
                                        >
                                            <option value="A">Opsi A</option>
                                            <option value="B">Opsi B</option>
                                            <option value="C">Opsi C</option>
                                            <option value="D">Opsi D</option>
                                        </select>
                                        <InputError
                                            message={errors.correct_answer}
                                            className="mt-2"
                                        />
                                    </div>

                                    <div className="flex justify-end">
                                        <PrimaryButton disabled={processing}>
                                            Simpan Kuis
                                        </PrimaryButton>
                                    </div>
                                </form>
                            </div>
                        )}

                        {/* Quiz List */}
                        {course.quizzes && course.quizzes.length > 0 ? (
                            <div className="space-y-4">
                                {course.quizzes.map((quiz, index) => (
                                    <div
                                        key={quiz.id}
                                        className="p-4 bg-gray-50 rounded-lg border border-gray-200"
                                    >
                                        <div className="flex items-start gap-3">
                                            <div className="w-8 h-8 bg-bluey text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                                                {index + 1}
                                            </div>
                                            <div className="flex-1">
                                                <p className="font-semibold text-gray-900 mb-2">
                                                    {quiz.question}
                                                </p>
                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                                    {quiz.options.map((option) => (
                                                        <div
                                                            key={option.id}
                                                            className={`p-2 rounded text-sm ${
                                                                option.option_key ===
                                                                quiz.correct_answer
                                                                    ? "bg-green-100 text-green-800 border border-green-200"
                                                                    : "bg-white border border-gray-200"
                                                            }`}
                                                        >
                                                            <span className="font-bold mr-2">
                                                                {option.option_key}.
                                                            </span>
                                                            {option.option_text}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-8 text-gray-500">
                                Belum ada kuis untuk kursus ini.
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
