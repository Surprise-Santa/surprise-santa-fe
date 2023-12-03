import { CalendarClock, LayoutDashboard, ListChecks, Settings, Users } from "lucide-react";

export const sideNavLinks = [
    {
        name: "Dashboard",
        icon: <LayoutDashboard />,
        href: "",
    },
    {
        name: "Groups",
        icon: <Users />,
        href: "/groups",
    },
    {
        name: "Events",
        icon: <CalendarClock />,
        href: "events",
    },
    {
        name: "Wishlist",
        icon: <ListChecks />,
        href: "wishlist",
    },
    {
        name: "Settings",
        icon: <Settings />,
        href: "settings",
    },
];
