import Link from "next/link";
import React from "react";
import Image from "next/image";

import Logo from "public/images/logo.png";

interface NavbarProps {
    isSignInPage?: boolean;
    isSignUpPage?: boolean;
    isResetPasswordPage?: boolean;
}

function AuthNavbar({ isSignInPage, isSignUpPage, isResetPasswordPage }: NavbarProps) {
    const linkText =
        isSignInPage || isResetPasswordPage ? "Sign Up" : isSignUpPage ? "Sign In" : "";
    const linkRoute =
        isSignInPage || isResetPasswordPage ? "/auth/signup" : isSignUpPage ? "/auth/signin" : "";
    const haveAccountText = isSignUpPage
        ? "Have an Account?"
        : isSignInPage || isResetPasswordPage
          ? "Don't have an Account?"
          : "";

    return (
        <header className="bg-gradient-to-r from-[#fdf4f5] to-[#fbfdfb] w-screen p-1">
            <div className="max-w-[1280px] w-[98%] mx-auto flex items-center justify-between">
                <p className="text-center px-0 sm:px-4 text-primary-red font-bold">
                    <Link href="/">
                        <Image src={Logo} alt="logo" className="h-16 w-full object-contain" />
                    </Link>
                </p>

                <div className="flex items-center">
                    <p className="mr-1 sm:mr-4 text-sm sm:text-base">{haveAccountText}</p>

                    <Link
                        href={linkRoute}
                        className="bg-primary-green font-bold text-white px-2 sm:px-6 py-2 sm:py-[8px] rounded-2xl text-sm sm:text-base"
                    >
                        {linkText}
                    </Link>
                </div>
            </div>
        </header>
    );
}

export default AuthNavbar;
