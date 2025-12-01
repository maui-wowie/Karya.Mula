import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import AuthSplitLayout from "@/Layouts/AuthSplitLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import SocialAuthButtons from "@/Components/SocialAuthButtons";

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    const submit = (e) => {
        e.preventDefault();
        setData("password_confirmation", data.password);

        post(route("register"), {
            onFinish: () => reset("password", "password_confirmation"),
        });
    };

    return (
        <AuthSplitLayout title="Register">
            <h1
                className="text-4xl font-bold mb-8 text-center text-transparent bg-clip-text"
                style={{
                    backgroundImage:
                        "linear-gradient(to right, #4C9AFF, #1E50FF)",
                }}
            >
                Create an Account
            </h1>

            <SocialAuthButtons />

            <p className="text-center text-gray-500 my-6">
                Or Use Your Email Account
            </p>

            <form
                onSubmit={submit}
                className="flex flex-col items-center gap-4"
            >
                <div className="w-full">
                    <div className="mb-4 w-full">
                        <TextInput
                            id="name"
                            name="name"
                            value={data.name}
                            className="mt-1 block w-full bg-gray-100 border-none rounded-xl h-14"
                            autoComplete="name"
                            isFocused={true}
                            onChange={(e) => setData("name", e.target.value)}
                            placeholder="Name"
                        />
                        <InputError message={errors.name} className="mt-2" />
                    </div>

                    <div className="mb-4 w-full">
                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="mt-1 block w-full bg-gray-100 border-none rounded-xl h-14"
                            autoComplete="username"
                            onChange={(e) => setData("email", e.target.value)}
                            placeholder="Email"
                        />
                        <InputError message={errors.email} className="mt-2" />
                    </div>

                    <div className="mb-4 w-full">
                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            className="mt-1 block w-full bg-gray-100 border-none rounded-xl h-14"
                            autoComplete="new-password"
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                            placeholder="Password"
                        />
                        <InputError
                            message={errors.password}
                            className="mt-2"
                        />
                    </div>

                    <input
                        type="hidden"
                        name="password_confirmation"
                        value={data.password}
                    />
                </div>

                <PrimaryButton
                    className="w-[70%] h-14 rounded-xl text-2xl flex justify-center items-center"
                    style={{
                        background:
                            "linear-gradient(to right, #4C9AFF, #1E50FF)",
                        border: "none",
                        boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.2)",
                    }}
                    disabled={processing}
                >
                    Sign Up
                </PrimaryButton>

                <div className="flex justify-center mt-6 text-sm">
                    <p className="text-gray-600">Already Have an Account?</p>
                    <Link
                        href={route("login")}
                        className="ml-1 font-semibold text-red-500 hover:text-red-700"
                    >
                        Sign in
                    </Link>
                </div>
            </form>
        </AuthSplitLayout>
    );
}
