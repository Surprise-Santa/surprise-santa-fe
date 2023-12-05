import React from "react";
import SideNav from "@/components/dashboard/side-nav";
import Header from "@/components/dashboard/header";

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <main className="flex">
            <div className="h-full fixed px-0 mx-0 transition-all duration-150 ease-in-out">
                <SideNav />
            </div>
            <div className="absolute right-0 min-h-[100vh] left-0 md:left-[13rem] lg:left-[17rem] transition-all duration-150 ease-in-out ">
                <Header />
                <div className="px-6 lg:px-8 py-4">{children}</div>
            </div>
        </main>
    );
};

export default Layout;
