import React from "react";
import Link from "next/link";

type SideLinkPropType = {
    name: string | null;
    icon: React.ReactNode;
    href: string;
};

const SideLink = ({ name, icon, href }: SideLinkPropType) => {
    return (
        <Link href={href} className="flex items-center gap-2 text-xl font-semibold">
            {icon}
            {name && <span>{name}</span>}
        </Link>
    );
};

export default SideLink;
