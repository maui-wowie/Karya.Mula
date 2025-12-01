import React from "react";
import { Link } from "@inertiajs/react";

export default function SiteLogo({
    width = "w-24",
    height = "h-24",
    className = "",
}) {
    const logoSrc = "/images/KaryaMulaLogo.svg";

    return (
        <Link href="/">
            <img
                src={logoSrc}
                alt="Logo KaryaMula"
                className={`${width} ${height} ${className} transition-transform transform hover:scale-105`}
            />
        </Link>
    );
}
