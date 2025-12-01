import React from "react";

const SocialButton = ({ svgPath, altText }) => (
    <button
        className="w-14 h-14 rounded-xl shadow-sm flex items-center justify-center mx-1 transition duration-150 ease-in-out"
        style={{
            background: "linear-gradient(to bottom right, #6271FF, #278EFF)",
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)", 
        }}
    >
        <img
            src={svgPath} 
            alt={altText}
            className="w-6 h-6" 
        />
    </button>
);

export default function SocialAuthButtons() {
    return (
        <div className="flex justify-center mt-6 gap-6">
            <SocialButton
                svgPath="/images/icons/linkedin.svg"
                altText="LinkedIn"
            />
            <SocialButton svgPath="/images/icons/apple.svg" altText="Apple" />
            <SocialButton svgPath="/images/icons/google.svg" altText="Google" />
        </div>
    );
}
