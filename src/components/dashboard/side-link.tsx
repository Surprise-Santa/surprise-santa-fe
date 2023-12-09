"use client";

import Link from "next/link";
import { usePathname, useParams } from "next/navigation";

type SideLinkPropType = {
    name: string | null;
    icon: React.ReactNode;
    href: string;
    isNavOpen?: boolean;
};

const SideLink = ({ name, icon, href, isNavOpen }: SideLinkPropType) => {
    const params = useParams();
    const pathname = usePathname();
    const id = params.id;
    const hrefModule = href.split("/").pop();
    const isActive = pathname.includes(hrefModule as string) && hrefModule !== "";

    const modifiedHref = `/dashboard/${id}/${href}`;

    return (
        <Link
            href={modifiedHref}
            className={`w-full self-start flex items-center gap-4 p-2 text-lg hover:bg-primary-light rounded ${
                isActive ? "bg-primary-light" : ""
            } ${isNavOpen ? "justify-start" : "justify-center"}`}
        >
            {icon}
            {name && <span>{name}</span>}
        </Link>
    );
};

export default SideLink;
