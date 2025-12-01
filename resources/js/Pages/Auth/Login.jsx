import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import AuthSplitLayout from "@/Layouts/AuthSplitLayout";
import { Link, useForm } from "@inertiajs/react";
import SocialAuthButtons from "@/Components/SocialAuthButtons";

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route("login"), {
            onFinish: () => reset("password"),
        });
    };

    return (
        <AuthSplitLayout title="Login">
            <h1
                className="text-4xl font-semibold mb-8 text-center text-transparent bg-clip-text"
                style={{
                    backgroundImage:
                        "linear-gradient(to right, #4C9AFF, #1E50FF)",
                }}
            >
                Login to KaryaMula
            </h1>

            <SocialAuthButtons />

            <p className="text-center font-semibold text-gray-400 my-6">
                Or Use Your Email Account
            </p>

            <form onSubmit={submit} className="flex flex-col items-center gap-4">
                <div className="w-full">
                    <div className="mb-4">
                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="mt-1 block w-full bg-gray-100 border-none rounded-xl h-14" 
                            autoComplete="username"
                            isFocused={true}
                            onChange={(e) => setData("email", e.target.value)}
                            placeholder="Email"
                        />

                        <InputError message={errors.email} className="mt-2" />
                    </div>

                    <div className="mb-6">
                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            className="mt-1 block w-full bg-gray-100 border-none rounded-xl h-14" 
                            autoComplete="current-password"
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
                    Sign In
                </PrimaryButton>

                <div className="flex justify-center mt-6 text-sm">
                    <p className="text-gray-600">Not have an Account?</p>
                    <Link
                        href={route("register")}
                        className="ml-1 font-semibold text-red-500 hover:text-red-700" 
                    >
                        Sign up
                    </Link>
                </div>
            </form>
        </AuthSplitLayout>
    );
}
