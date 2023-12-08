"use client";

import Image from "next/image";
import Link from "next/link";
import { CalendarDays } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import ChristianImage from "../../../../public/images/christian.jpg";
import ProtectedPage from "@/services/guard/ProtectedPage";
import { getRandomChristmasColors } from "@/lib/colors";
import { AppCalendar } from "@/components/ui/calendar/calendar";

const groupData = [
    {
        name: "Homeboyz",
        description: "Groove n vibes",
        participants: 24,
    },
    {
        name: "Homeboyz",
        description: "Groove n vibes",
        participants: 24,
    },
    {
        name: "Homeboyz",
        description: "Groove n vibes",
        participants: 24,
    },
    {
        name: "Homeboyz",
        description: "Groove n vibes",
        participants: 24,
    },
];

const eventData = [
    {
        name: "Thanksgiving Cruise",
        creator: "Ayotunde",
        role: "Organizer",
        startDate: "23 Nov,2023",
        endDate: "24 Dec,2023",
        eventCount: 24,
    },
    {
        name: "Santa Party",
        creator: "Ayotunde",
        role: "Organizer",
        startDate: "23 Nov,2023",
        endDate: "24 Dec,2023",
        eventCount: 24,
    },
    {
        name: "Thanksgiving Cruise",
        creator: "Ayotunde",
        role: "Organizer",
        startDate: "23 Nov,2023",
        endDate: "24 Dec,2023",
        eventCount: 24,
    },
];

const Page = () => {
    const randomChristmasColors = getRandomChristmasColors(eventData.length);

    return (
        <main className="space-y-12">
            <section className="rounded-md bg-white p-4 shadow-lg flex flex-col md:flex-row gap-8 md:divide-x-2">
                <div className="p-4 order-2 md:order-1 justify-self-center self-center">
                    <AppCalendar />
                </div>
                <div className="space-y-8 p-4 order-1 md:order-2">
                    <p>Coming Events</p>
                    <div className="flex gap-2">
                        <Checkbox />
                        <div className="-mt-1">
                            <p>Secret Santa</p>
                            <div className="border border-primary-gray1 px-4 py-2 rounded-sm text-primary-light-opaque flex items-center gap-4 max-w-fit w-full">
                                <CalendarDays size={24} color="#000" />
                                <div className="flex items-center gap-2">
                                    <p className="whitespace-nowrap">23 Nov 2023</p>
                                    <span> - </span>
                                    <p className="whitespace-nowrap">23, Dev 2023</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <Checkbox />
                        <div className="-mt-1">
                            <p>Lola’s 27th birthday bash</p>
                            <div className="border border-primary-gray1 px-4 py-2 rounded-sm text-primary-light-opaque flex items-center gap-4 max-w-fit w-full">
                                <CalendarDays size={24} color="#000" />
                                <div className="flex items-center gap-2">
                                    <p className="whitespace-nowrap">23 Nov 2023</p>
                                    <span> - </span>
                                    <p className="whitespace-nowrap">23, Dev 2023</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section>
                <div className="flex items-center gap-12 justify-between mb-8">
                    <h2 className="font-bold text-2xl">My Groups</h2>
                    <Link href="#">View all</Link>
                </div>

                <div className="flex items-center justify-center md:justify-between gap-8 flex-wrap">
                    {groupData.map((group, i) => (
                        <div
                            key={i}
                            className="bg-white py-4 px-6 rounded-lg rounded-l-none shadow-md space-y-4  border-l-4 border-l-primary-red w-[16rem]"
                        >
                            <div className="flex items-center gap-4">
                                <Image
                                    src={ChristianImage}
                                    alt="Christian Enyia"
                                    className="rounded-full h-16 w-16"
                                />
                                <div>
                                    <p className="font-semibold text-xl">{group.name}</p>
                                    <p className="text-primary-opaque">{group.description}</p>
                                </div>
                            </div>
                            <p className="text-primary-light-opaque">
                                Participants:{" "}
                                <span className="text-black">{group.participants}</span>
                            </p>
                            <div className="h-max relative flex">
                                <span className="h-10 w-10 bg-sky-500 bg-opacity-50 rounded-full flex items-center justify-center text-sky-700 font-semibold z-10">
                                    LW
                                </span>
                                <span className="h-10 w-10 bg-rose-500 bg-opacity-50 rounded-full flex items-center justify-center text-rose-700 font-semibold z-20 -ml-2">
                                    EH
                                </span>
                                <span className="h-10 w-10 bg-emerald-500 bg-opacity-50 rounded-full flex items-center justify-center text-emerald-700 font-semibold z-30 -ml-2">
                                    GW
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section>
                <div className="flex items-center gap-12 justify-between mb-8">
                    <h2 className="font-bold text-2xl">My Events</h2>
                    <Link href="#">View all</Link>
                </div>

                <div className="flex items-center justify-center md:justify-between gap-8 flex-wrap">
                    {eventData.map((event, i) => (
                        <div
                            key={i}
                            className={`bg-white py-4 px-6 rounded-lg rounded-l-none shadow-md space-y-4 border-l-4 border-l-[${randomChristmasColors[i]}] w-[24rem]`}
                        >
                            <p className="font-semibold text-2xl">{event.name}</p>
                            <div className="flex items-center gap-4">
                                <Image
                                    src={ChristianImage}
                                    alt="Christian Enyia"
                                    className="rounded-full h-12 w-12"
                                />
                                <p className="text-black flex flex-nowrap gap-1 items-center text-xl">
                                    {event?.creator}{" "}
                                    <span className="text-primary-light-opaque text-base">
                                        ({event?.role})
                                    </span>
                                </p>
                            </div>
                            <div className="border border-primary-gray1 px-4 py-2 rounded-sm text-primary-light-opaque flex items-center gap-4 max-w-fit w-full">
                                <CalendarDays size={24} color="#000" />
                                <div className="flex items-center gap-2">
                                    <p className="whitespace-nowrap">{event?.startDate}</p>
                                    <span> - </span>
                                    <p className="whitespace-nowrap">{event?.endDate}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="flex">
                                    <span className="h-10 w-10 bg-sky-500 bg-opacity-50 rounded-full flex items-center justify-center text-sky-700 font-semibold z-10">
                                        LW
                                    </span>
                                    <span className="h-10 w-10 bg-rose-500 bg-opacity-50 rounded-full flex items-center justify-center text-rose-700 font-semibold z-20 -ml-2">
                                        EH
                                    </span>
                                    <span className="h-10 w-10 bg-emerald-500 bg-opacity-50 rounded-full flex items-center justify-center text-emerald-700 font-semibold z-30 -ml-2">
                                        GW
                                    </span>
                                </div>
                                <p>+{event?.eventCount}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    );
};

export default ProtectedPage(Page);
