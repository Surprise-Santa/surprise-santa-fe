import Link from "next/link";
import React from "react";

const Navbar = () => {
    return (
        <header className="bg-gradient-to-r from-[#fdf4f5] to-[#fbfdfb] fixed top-0 z-50 w-screen py-1 ">
            <div className="max-w-[1280px] mx-auto py-2 flex items-center justify-between">
                <p className="text-center px-4 text-primary-red font-bold">LOGO</p>
                <div className="bg-primary-green font-bold text-white px-4 sm:px-6 py-[8px] rounded-2xl	flex items-center">
                    <Link href="/">Get Started</Link>
                </div>
            </div>
        </header>
    );
};

export default Navbar;