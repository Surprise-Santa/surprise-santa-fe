"use client";

import { LogOut } from "lucide-react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const SignOutBtn = () => {
    const router = useRouter();

    const handleSignOut = () => {
        sessionStorage.removeItem("user");
        router.push("/auth/signin");
        return toast.success("You have Successfully signed out!");
    };
    return (
        <button className="flex items-center gap-2 text-lg" onClick={handleSignOut}>
            <LogOut />
            Sign Out
        </button>
    );
};

export default SignOutBtn;
