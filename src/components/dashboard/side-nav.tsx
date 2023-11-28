import Image from "next/image";
import Logo from "public/images/santa.png";
import SideLink from "./side-link";
import ClientWrapper from "../wrapper/client";
import SignOutBtn from "../ui/shared/signOutBtn";
import { sideNavLinks } from "./links";

export default function SideNav() {
    const id = 2; // TODO: get id from useRouter
    const modifiedNavLinks = sideNavLinks.map((link) => ({
        ...link,
        href: `/dashboard/${id}/${link.href}`,
    }));

    return (
        <aside className="hidden md:block max-w-[13rem] p-4 shadow-lg relative h-full z-50 transition-all duration-150 ease-in-out bg-primary-green text-white">
            <Image src={Logo} alt="logo" />
            <nav className="flex flex-col gap-12 mt-6">
                {modifiedNavLinks.map((link) => (
                    <SideLink key={link.name} href={link.href} icon={link.icon} name={link.name} />
                ))}
            </nav>
            <div className="absolute bottom-10 right-1/2 left-0 w-full grid place-items-center">
                <ClientWrapper>
                    <SignOutBtn />
                </ClientWrapper>
            </div>
        </aside>
    );
}
