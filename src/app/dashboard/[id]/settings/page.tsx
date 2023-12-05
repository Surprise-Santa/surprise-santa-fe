import Link from "next/link";
import { CalendarClock, ListChecks, User, Users } from "lucide-react";

const settingsData = [
    {
        id: "1",
        title: "Profile Settings",
        icon: <User />,
    },
    {
        id: "2",
        title: "Group Settings",
        icon: <Users />,
    },
    {
        id: "3",
        title: "Event Settings",
        icon: <CalendarClock />,
    },
    {
        id: "4",
        title: "Wishlist Settings",
        icon: <ListChecks />,
    },
];

const Settings = () => {
    return (
        <main className="flex flex-wrap items-center gap-12 justify-between">
            {settingsData.map((item) => {
                return (
                    <Link
                        key={item.id}
                        className="w-[15rem] h-[10rem] p-4 text-center rounded-md bg-white shadow-md flex flex-col items-center justify-center gap-4 text-xl font-semibold"
                        href={item.title.toLowerCase().replace(" ", "-")}
                    >
                        {item.icon}
                        <p>{item.title}</p>
                    </Link>
                );
            })}
        </main>
    );
};

export default Settings;
