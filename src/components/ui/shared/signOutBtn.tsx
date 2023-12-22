"use client";

import { LogOut } from "lucide-react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

type PropType = {
    isNavOpen?: boolean;
};

const SignOutBtn = ({ isNavOpen }: PropType) => {
    const router = useRouter();

    const handleSignOut = () => {
        sessionStorage.removeItem("user");
        sessionStorage.removeItem("groupCode");
        router.push("/auth/signin");
        return toast.success("You have Successfully signed out!");
    };
    return (
        <button className="flex items-center gap-2 text-lg" onClick={handleSignOut}>
            <LogOut />
            {isNavOpen && <span>Sign Out</span>}
        </button>
    );
};

export default SignOutBtn;
