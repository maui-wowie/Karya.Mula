import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";

export default function Edit({ auth, course }) {
    const { data, setData, put, processing, errors } = useForm({
        title: course.title || "",
        description: course.description || "",
        thumbnail_url: course.thumbnail_url || "",
        youtube_url: course.youtube_url || "",
        mentor_comment: course.mentor_comment || "",
        quiz_description: course.quiz_description || "",
        task_description: course.task_description || "",
    });

    const submit = (e) => {
        e.preventDefault();
        put(route("admin.courses.update", course.id));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Edit Kursus: {course.title}
                </h2>
            }
        >
            <Head title="Edit Kursus" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <form onSubmit={submit} className="space-y-6">
                                <div>
                                    <InputLabel htmlFor="title" value="Nama Produk / Judul Kursus" />
                                    <TextInput
                                        id="title"
                                        type="text"
                                        className="mt-1 block w-full"
                                        value={data.title}
                                        onChange={(e) => setData("title", e.target.value)}
                                        required
                                        isFocused
                                    />
                                    <InputError message={errors.title} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="description" value="Deskripsi Kursus" />
                                    <textarea
                                        id="description"
                                        className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                        value={data.description}
                                        onChange={(e) => setData("description", e.target.value)}
                                        required
                                        rows="4"
                                    />
                                    <InputError message={errors.description} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="thumbnail_url" value="URL Thumbnail (Gambar)" />
                                    <TextInput
                                        id="thumbnail_url"
                                        type="text"
                                        className="mt-1 block w-full"
                                        value={data.thumbnail_url}
                                        onChange={(e) => setData("thumbnail_url", e.target.value)}
                                    />
                                    <InputError message={errors.thumbnail_url} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="youtube_url" value="URL Video Youtube" />
                                    <TextInput
                                        id="youtube_url"
                                        type="text"
                                        className="mt-1 block w-full"
                                        value={data.youtube_url}
                                        onChange={(e) => setData("youtube_url", e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.youtube_url} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="mentor_comment" value="Komentar Mentor" />
                                    <textarea
                                        id="mentor_comment"
                                        className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                        value={data.mentor_comment}
                                        onChange={(e) => setData("mentor_comment", e.target.value)}
                                        rows="3"
                                    />
                                    <InputError message={errors.mentor_comment} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="quiz_description" value="Deskripsi Kuis" />
                                    <textarea
                                        id="quiz_description"
                                        className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                        value={data.quiz_description}
                                        onChange={(e) => setData("quiz_description", e.target.value)}
                                        rows="3"
                                    />
                                    <InputError message={errors.quiz_description} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="task_description" value="Deskripsi Tugas" />
                                    <textarea
                                        id="task_description"
                                        className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                        value={data.task_description}
                                        onChange={(e) => setData("task_description", e.target.value)}
                                        rows="3"
                                    />
                                    <InputError message={errors.task_description} className="mt-2" />
                                </div>

                                <div className="flex items-center justify-end mt-4">
                                    <Link
                                        href={route("admin.courses.index")}
                                        className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mr-4"
                                    >
                                        Batal
                                    </Link>
                                    <PrimaryButton className="ml-4" disabled={processing}>
                                        Simpan Perubahan
                                    </PrimaryButton>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
