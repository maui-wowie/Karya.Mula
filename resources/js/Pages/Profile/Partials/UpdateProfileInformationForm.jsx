import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";

export default function UpdateProfileInformationForm({
    data,
    setData,
    errors,
    className = "",
}) {
    return (
        <section className={className}>
            <div className="grid grid-cols-2 gap-x-10 gap-y-6">
                {/* Fullname */}
                <div className="col-span-1">
                    <InputLabel
                        htmlFor="name"
                        value="Fullname"
                        className="text-sm font-light mb-1"
                    />
                    <TextInput
                        id="name"
                        className="mt-1 block w-full bg-gray-100 border-none rounded-xl"
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)} 
                        autoComplete="name"
                    />
                    <InputError className="mt-2" message={errors.name} />
                </div>

                {/* Username */}
                <div className="col-span-1">
                    <InputLabel
                        htmlFor="username"
                        value="Username"
                        className="text-sm font-light mb-1"
                    />
                    <TextInput
                        id="username"
                        className="mt-1 block w-full bg-gray-100 border-none rounded-xl"
                        value={data.username}
                        onChange={(e) => setData("username", e.target.value)}
                        autoComplete="username"
                    />
                    <InputError className="mt-2" message={errors.username} />
                </div>

                {/* Email */}
                <div className="col-span-1">
                    <InputLabel
                        htmlFor="email"
                        value="Email"
                        className="text-sm font-light mb-1"
                    />
                    <TextInput
                        id="email"
                        type="email"
                        className="mt-1 block w-full bg-gray-100 border-none rounded-xl"
                        value={data.email}
                        onChange={(e) => setData("email", e.target.value)}
                        autoComplete="email"
                    />
                    <InputError className="mt-2" message={errors.email} />
                </div>

                {/* Birth Date */}
                <div className="col-span-1">
                    <InputLabel
                        htmlFor="birth_date"
                        value="Birth date"
                        className="text-sm font-light mb-1"
                    />
                    <TextInput
                        id="birth_date"
                        type="date"
                        className="mt-1 block w-full bg-gray-100 border-none rounded-xl"
                        value={data.birth_date}
                        onChange={(e) => setData("birth_date", e.target.value)}
                    />
                    <InputError className="mt-2" message={errors.birth_date} />
                </div>

                {/* Phone Number */}
                <div className="col-span-1">
                    <InputLabel
                        htmlFor="phone_number"
                        value="Phone number"
                        className="text-sm font-light mb-1"
                    />
                    <TextInput
                        id="phone_number"
                        type="tel"
                        className="mt-1 block w-full bg-gray-100 border-none rounded-xl"
                        value={data.phone_number}
                        onChange={(e) =>
                            setData("phone_number", e.target.value)
                        }
                    />
                    <InputError
                        className="mt-2"
                        message={errors.phone_number}
                    />
                </div>

                {/* Location */}
                <div className="col-span-1">
                    <InputLabel
                        htmlFor="location"
                        value="Location"
                        className="text-sm font-light mb-1"
                    />
                    <TextInput
                        id="location"
                        className="mt-1 block w-full bg-gray-100 border-none rounded-xl"
                        value={data.location}
                        onChange={(e) => setData("location", e.target.value)}
                    />
                    <InputError className="mt-2" message={errors.location} />
                </div>

                {/* Bio */}
                <div className="col-span-full">
                    <InputLabel
                        htmlFor="bio"
                        value="Bio"
                        className="text-sm font-light mb-1"
                    />
                    <textarea
                        id="bio"
                        className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-xl shadow-sm bg-gray-100"
                        value={data.bio}
                        rows="4"
                        onChange={(e) => setData("bio", e.target.value)}
                    />
                    <InputError className="mt-2" message={errors.bio} />
                </div>
            </div>
        </section>
    );
}
