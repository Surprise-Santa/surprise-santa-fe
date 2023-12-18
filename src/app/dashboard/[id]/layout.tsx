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
        <main className="flex w-full h-full">
            <div
                className={`h-full hidden md:block fixed p-0 m-0 transition-all duration-300 ease-in-out ${
                    isNavOpen ? "w-[15rem]" : "w-[5rem]"
                }`}
            >
                <SideNav isNavOpen={isNavOpen} setIsNavOpen={setIsNavOpen} />
            </div>

            <div
                className={`grow min-h-[100vh] transition-all duration-300 ease-in-out w-full h-full ${
                    isNavOpen
                        ? "ml-0 md:ml-[15rem] max-w-[calc(100% - 15rem)]"
                        : "ml-0 md:ml-[5rem] max-w-[calc(100% - 5rem)]"
                }`}
            >
                <Header />
                <div className="px-4 lg:px-8 py-4 -mt-8 m-0 w-full h-full overflow-x-auto">
                    {children}
                </div>
            </div>
        </main>
    );
};

export default Layout;
