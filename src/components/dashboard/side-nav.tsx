import Image from "next/image";
import Logo from "public/images/santa.png";
import SideLink from "./side-link";
import ClientWrapper from "../wrapper/client";
import SignOutBtn from "../ui/shared/signOutBtn";
import { sideNavLinks } from "./links";
import Link from "next/link";

export default function SideNav() {
    const id = 2; // TODO: get id from useRouter
    const modifiedNavLinks = sideNavLinks.map((link) => ({
        ...link,
         href: `/dashboard/${id}/${link.href}`,

    }));

    return (
        <aside className="hidden md:block max-w-[17rem] w-[13rem] lg:w-[17rem] font-light p-6 shadow-lg relative h-full z-50 transition-all duration-150 ease-in-out bg-primary-green text-white">
            <div className="text-primary-red font-bold text-[1.3rem] mb-14">
                <Link href="/">LOGO</Link>
            </div>
            <nav className="flex flex-col gap-6 mt-6 ">
                {modifiedNavLinks.map((link) => (
                    <SideLink key={link.name} href={link.href} icon={link.icon} name={link.name} />
                ))}
            </nav>
            <div className="absolute bottom-10 right-1/2 left-0 w-full grid px-6">
                <ClientWrapper>
                    <SignOutBtn />
                </ClientWrapper>
            </div>
        </aside>
    );
}
