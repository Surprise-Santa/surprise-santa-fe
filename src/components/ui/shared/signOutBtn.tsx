"use client";

import { LogOut } from "lucide-react";

const SignOutBtn = () => {
    const handleSignOut = () => {
        alert("Sign out");
    };
    return (
        <button className="flex items-center gap-2 text-lg" onClick={handleSignOut}>
            <LogOut />
            Sign Out
        </button>
    );
};

export default SignOutBtn;
