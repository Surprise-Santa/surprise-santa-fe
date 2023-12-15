"use client";

import { extractInitials } from "@/lib/utils";
import { AlignJustify } from "lucide-react";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import MobileSideNav from "./mobile-sidenav";

const Header = () => {
    const [openMenu, setOpenMenu] = useState(false);

    const userDetails =
        typeof window !== "undefined" &&
        JSON.parse(window.sessionStorage.getItem("user") as string)?.user;
    const fullName = userDetails?.firstName + " " + userDetails?.lastName;

    const handleOpenMenu = () => {
        setOpenMenu(!openMenu);
    };

    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    return (
        <>
            {isClient && (
                <header className="flex justify-between md:justify-end items-center gap-4 mb-8 border-b-2 border-primary-gray px-4 lg:pr-8 py-2 ">
                    <button
                        className="outline-none border-none block md:hidden"
                        onClick={() => {
                            handleOpenMenu();
                        }}
                    >
                        <AlignJustify />
                    </button>
                    <div className="flex  items-center gap-4 font-bold ">
                        <p>
                            Hello,
                            <span className="text-xl ml-2">{userDetails?.firstName}</span>
                        </p>

                        <Avatar className="h-12 w-12">
                            <AvatarImage src={userDetails?.profileImgUrl} />
                            <AvatarFallback>{extractInitials(fullName)}</AvatarFallback>
                        </Avatar>
                    </div>
                    {openMenu && <MobileSideNav setOpenMenu={setOpenMenu} />}
                </header>
            )}
        </>
    );
};

export default Header;
