import Link from "next/link";
import React from "react";

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
            <div className="max-w-[1280px] w-[98%] mx-auto py-2 flex items-center justify-between">
                <p className="text-center px-4 text-primary-red font-bold">
                    <Link href="/">LOGO</Link>
                </p>

                <div className="flex items-center">
                    <p className="mr-4">{haveAccountText}</p>

                    <Link href={linkRoute}>
                        <div className="bg-primary-green font-bold text-white px-4 sm:px-6 py-[8px] rounded-2xl	flex items-center">
                            {linkText}
                        </div>
                    </Link>
                </div>
            </div>
        </header>
    );
}

export default AuthNavbar;
