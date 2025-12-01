import { Head, Link, useForm, usePage, router } from "@inertiajs/react";
import UpdateProfileInformationForm from "./Partials/UpdateProfileInformationForm";
import ProfileSummaryCard from "@/Components/ProfileSummaryCard";
import PrimaryButton from "@/Components/PrimaryButton";

const BLANK_LAYOUT_STYLE = "min-h-screen bg-white flex";
const CARD_CONTAINER_STYLE = "w-full max-w-full mx-auto";

export default function Edit({ auth }) {
    const user = auth.user;

    const { data, setData, patch, errors, processing } = useForm({
        name: user.name,
        email: user.email,
        username: user.username || "",
        phone_number: user.phone_number || "",
        birth_date: user.birth_date || "",
        location: user.location || "",
        bio: user.bio || "",
    });

    const backUrl = route("dashboard");

    const handleSubmit = (e) => {
        e.preventDefault();

        patch(route("profile.update"), {
            onSuccess: () => {
                router.visit(backUrl);
            },
        });
    };

    const handleLogout = (e) => {
        e.preventDefault();
        router.post(route("logout"));
    };

    return (
        <div className={BLANK_LAYOUT_STYLE}>
            <Head title="Pengaturan Akun" />

            <div className={CARD_CONTAINER_STYLE}>
                <div className="flex w-screen h-screen">
                    <div className="w-1/3">
                        <ProfileSummaryCard user={user} />
                    </div>

                    <div className="w-2/3 flex items-center justify-center bg-white p-16">
                        <div className="w-full max-w-3xl">
                            <h1 className="text-3xl font-bold mb-8 text-gray-900">
                                Pengaturan Akun
                            </h1>

                            <form onSubmit={handleSubmit}>
                                <UpdateProfileInformationForm
                                    // Melewatkan state dan setter ke komponen anak
                                    data={data}
                                    setData={setData}
                                    errors={errors}
                                />

                                <div className="flex justify-between mt-12">
                                    <PrimaryButton
                                        onClick={handleLogout}
                                        type="button"
                                        className="bg-red-500 hover:bg-red-600 rounded-xl px-12 py-3"
                                    >
                                        Log out
                                    </PrimaryButton>

                                    <PrimaryButton
                                        disabled={processing}
                                        type="submit"
                                        className="bg-blue-600 hover:bg-blue-700 rounded-xl px-12 py-3"
                                    >
                                        Save
                                    </PrimaryButton>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
