"use client";

import ProtectedPage from "@/services/guard/ProtectedPage";

const Page = () => {
    return (
        <main>
            <h1>DashBoard Contents</h1>
        </main>
    );
};

export default ProtectedPage(Page);
