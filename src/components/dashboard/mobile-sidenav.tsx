import { X } from "lucide-react";
import Link from "next/link";
import { Dispatch } from "react";
import SignOutBtn from "../ui/shared/signOutBtn";
import ClientWrapper from "../wrapper/client";
import { sideNavLinks } from "./links";
import SideLink from "./side-link";

export type PropType = {
    setOpenMenu: Dispatch<React.SetStateAction<boolean>>;
};

export default function MobileSideNav({ setOpenMenu }: PropType) {
    return (
        <aside
            className=" px-10 block md:hidden font-light py-6 shadow-lg left-0 h-[100vh] fixed top-0 z-50 transition-all duration-300 ease-in-out bg-primary-green text-white
              "
        >
            <button
                className="absolute right-4 top-2 outline-none border-none"
                onClick={() => {
                    setOpenMenu(false);
                }}
            >
                <X />
            </button>
            <div className="text-primary-red font-bold text-[1.3rem] mb-10 mt-2 px-4">
                <Link href="/">LOGO</Link>
            </div>
            <nav className="flex flex-col gap-6  ">
                {sideNavLinks.map((link) => (
                    <SideLink
                        key={link.name}
                        href={link.href}
                        icon={link.icon}
                        name={link.name}
                        onClick={() => setOpenMenu(false)}
                    />
                ))}
            </nav>
            <div className="absolute bottom-10 right-1/2 left-0 w-full grid px-6">
                <ClientWrapper>
                    <div className="flex gap-4 px-6">
                        <SignOutBtn />
                        <p className="text-[1.1rem]">Sign Out</p>
                    </div>
                </ClientWrapper>
            </div>
        </aside>
    );
}
