import { Dispatch } from "react";
import Link from "next/link";
import SideLink from "./side-link";
import ClientWrapper from "../wrapper/client";
import SignOutBtn from "../ui/shared/signOutBtn";
import { sideNavLinks } from "./links";
import { AlignJustify } from "lucide-react";

type SideNavPropType = {
    isNavOpen: boolean;
    setIsNavOpen: Dispatch<React.SetStateAction<boolean>>;
};

export default function SideNav({ isNavOpen, setIsNavOpen }: SideNavPropType) {
    return (
        <aside
            className={`w-full font-light py-6 shadow-lg relative h-full z-50 transition-all duration-300 ease-in-out bg-primary-green text-white ${
                isNavOpen ? "w-[15rem] px-2" : "w-[5rem] px-2"
            }`}
        >
            <button
                className="absolute right-4 top-2 outline-none border-none"
                onClick={() => {
                    setIsNavOpen(!isNavOpen);
                }}
            >
                <AlignJustify />
            </button>
            <div className="text-primary-red font-bold text-[1.3rem] mb-14 mt-2">
                <Link href="/">LOGO</Link>
            </div>
            <nav className="flex flex-col gap-6">
                {sideNavLinks.map((link) => (
                    <SideLink
                        key={link.name}
                        href={link.href}
                        icon={link.icon}
                        name={isNavOpen ? link.name : null}
                        isNavOpen={isNavOpen}
                    />
                ))}
            </nav>
            <div className="absolute bottom-10 right-1/2 left-0 w-full grid px-6">
                <ClientWrapper>
                    <SignOutBtn isNavOpen={isNavOpen} />
                </ClientWrapper>
            </div>
        </aside>
    );
}
