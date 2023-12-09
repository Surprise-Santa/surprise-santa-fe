"use client";

import { ReactNode, useState, useEffect } from "react";
import SideNav from "@/components/dashboard/side-nav";
import Header from "@/components/dashboard/header";

const Layout = ({ children }: { children: ReactNode }) => {
    const [isNavOpen, setIsNavOpen] = useState(true);

    useEffect(() => {
        if (window.innerWidth < 768) {
            setIsNavOpen(false);
        } else {
            setIsNavOpen(true);
        }
    }, []);
    return (
        <main className="flex">
            <div className="h-full w-full fixed p-0 m-0 transition-all duration-300 ease-in-out">
                <SideNav isNavOpen={isNavOpen} setIsNavOpen={setIsNavOpen} />
            </div>
            <div
                className={`absolute grow right-0 min-h-[100vh] transition-all duration-300 ease-in-out ${
                    isNavOpen ? "left-[13rem]" : "left-[5rem]"
                }`}
            >
                <Header />
                <div className="px-4 lg:px-8 py-4 m-0">{children}</div>
            </div>
        </main>
    );
};

export default Layout;
