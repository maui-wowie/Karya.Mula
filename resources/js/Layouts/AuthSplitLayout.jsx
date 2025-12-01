import React from "react";
import { Head } from "@inertiajs/react";
import SiteLogo from '@/Components/SiteLogo';

export default function AuthSplitLayout({ title, children }) {
    return (
        <>
            <Head title={title} />

            <div className="flex h-screen">
                <div
                    className="hidden lg:flex w-[35%] justify-center items-center h-full text-white"
                    style={{
                        background:
                            "linear-gradient(to top right, #4C9AFF, #1E50FF)",
                    }}
                >
                    <SiteLogo 
                        width='w-48'
                        height='h-48' 
                    />
                </div>

                {/* Bagian Kanan: Form Auth */}
                <div className="w-full lg:w-[65%] flex justify-center items-center bg-white p-6 sm:p-12">
                    <div className="w-full max-w-md">{children}</div>
                </div>
            </div>
        </>
    );
}
