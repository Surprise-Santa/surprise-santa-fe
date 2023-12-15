"use client";

import Link from "next/link";
import { CalendarClock, ListChecks, User, Users } from "lucide-react";
import ProtectedPage from "@/services/guard/ProtectedPage";

const settingsData = [
    {
        id: "1",
        title: "Profile settings",
        icon: <User />,
    },
    {
        id: "2",
        title: "Group settings",
        icon: <Users />,
    },
    {
        id: "3",
        title: "Event settings",
        icon: <CalendarClock />,
    },
    {
        id: "4",
        title: "Wishlist settings",
        icon: <ListChecks />,
    },
];

const Settings = () => {
    return (
        <main className="flex flex-wrap items-center gap-12 justify-center md:justify-between -mt-6">
            {settingsData.map((item) => {
                return (
                    <Link
                        key={item.id}
                        className="w-[15rem] h-[10rem] p-4 text-center rounded-md bg-white shadow-md flex flex-col items-center justify-center gap-4 text-xl font-semibold"
                        href={`settings/${item.title
                            .toLowerCase()
                            .replace(/\s+/g, "-") // Replace any whitespace character with a hyphen
                            .replace("-settings", "")}`}
                    >
                        {item.icon}
                        <p>{item.title}</p>
                    </Link>
                );
            })}
        </main>
    );
};

export default ProtectedPage(Settings);
