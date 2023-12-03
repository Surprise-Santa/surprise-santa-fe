import React from "react";
import Link from "next/link";

type SideLinkPropType = {
    name: string | null;
    icon: React.ReactNode;
    href: string;
};

const SideLink = ({ name, icon, href }: SideLinkPropType) => {
    return (
        <Link
            href={href}
            className="flex items-center gap-4 text-lg hover:bg-primary-light active:bg-primary-light p-2"
        >
            {icon}
            {name && <span>{name}</span>}
        </Link>
    );
};

export default SideLink;
