"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type SideLinkPropType = {
    name: string | null;
    icon: React.ReactNode;
    href: string;
};

const SideLink = ({ name, icon, href }: SideLinkPropType) => {
    const pathname = usePathname();
    const hrefModule = href.split("/").pop();
    const isActive = pathname.includes(href) && hrefModule !== "";

    return (
        <Link
            href={href}
            className={`flex items-center gap-4 text-lg hover:bg-primary-light ${
                isActive ? "bg-primary-light" : ""
            } p-2`}
        >
            {icon}
            {name && <span>{name}</span>}
        </Link>
    );
};

export default SideLink;
