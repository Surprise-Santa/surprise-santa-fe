import { Dispatch } from "react";
import { ChevronsLeft, ChevronsRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import SignOutBtn from "../ui/shared/signOutBtn";
import ClientWrapper from "../wrapper/client";
import { sideNavLinks } from "./links";
import SideLink from "./side-link";
import Logo from "public/images/logo-white.svg";

export type SideNavPropType = {
    isNavOpen: boolean;
    setIsNavOpen: Dispatch<React.SetStateAction<boolean>>;
};

export default function SideNav({ isNavOpen, setIsNavOpen }: SideNavPropType) {
    return (
        <aside
            className={`w-full hidden md:block font-light py-6 shadow-lg relative h-full z-50 transition-all duration-300 ease-in-out bg-primary-green text-white ${
                isNavOpen ? "w-[15rem] px-2" : "w-[0rem] md:w-[5rem] px-2"
            }`}
        >
            <button
                className="absolute right-4 top-2 outline-none border-none"
                onClick={() => {
                    setIsNavOpen(!isNavOpen);
                }}
            >
                {isNavOpen ? <ChevronsLeft /> : <ChevronsRight />}
            </button>
            <div className="w-[6rem] ml-[-.4rem]">
                <Link href="/">
                    <Image src={Logo} alt="logo" />
                </Link>
            </div>
            <nav className="flex flex-col gap-6 text-center">
                {sideNavLinks.map((link) => (
                    <SideLink
                        key={link.name}
                        href={link.href}
                        icon={link.icon}
                        name={isNavOpen ? link.name : null}
                        isNavOpenStyle="justify-center"
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
