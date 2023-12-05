"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";

const Navbar = () => {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const user =
        typeof window !== "undefined" &&
        JSON.parse(window.sessionStorage.getItem("user") as string);

    return (
        <header className="bg-gradient-to-r from-[#fdf4f5] to-[#fbfdfb] fixed top-0 z-50 w-screen py-1 ">
            {isClient && (
                <div className="max-w-[1280px] mx-auto py-2 flex items-center justify-between">
                    <div className="text-center px-4 text-primary-red font-bold text-[1.25rem]">
                        <Link href="/">LOGO</Link>
                    </div>
                    {user ? (
                        <Link href={`/dashboard/${user.user.id}`}>
                            <div className="bg-primary-green font-bold text-white px-4 sm:px-6 py-[8px] rounded-2xl	flex items-center mr-4">
                                Dashboard
                            </div>
                        </Link>
                    ) : (
                        <Link href="/auth/signup">
                            <div className="bg-primary-green font-bold text-white px-4 sm:px-6 py-[8px] rounded-2xl	flex items-center mr-4">
                                Get Started
                            </div>
                        </Link>
                    )}
                </div>
            )}
        </header>
    );
};

export default Navbar;
