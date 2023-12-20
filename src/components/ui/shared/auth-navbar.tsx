import Link from "next/link";
import React from "react";
import Image from "next/image";

import Logo from "public/images/logo.svg";

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
                <div className=" w-[5rem]">
                    <Link href="/">
                        <Image src={Logo} alt="logo" />
                    </Link>
                </div>

                <div className="flex items-center">
                    <p className="mr-4 hidden sm:block">{haveAccountText}</p>

                    <Link href={linkRoute}>
                        <div className="bg-primary-green font-bold text-white px-4 sm:px-6 py-[8px] rounded-2xl	flex items-center justify-center w-[6rem] sm:w-[7rem]">
                            {linkText}
                        </div>
                    </Link>
                </div>
            </div>
        </header>
    );
}

export default AuthNavbar;
