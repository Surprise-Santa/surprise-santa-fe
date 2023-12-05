"use client";

import Image from "next/image";
import Link from "next/link";
import { CalendarDays } from "lucide-react";
import ChristianImage from "/public/images/christian.jpg";
import ProtectedPage from "@/services/guard/ProtectedPage";

const groupData = [
    {
        name: "Homeboyz",
        description: "Groove n vibes",
        participants: 24,
        participantsImages: [ChristianImage, ChristianImage, ChristianImage],
    },
    {
        name: "Homeboyz",
        description: "Groove n vibes",
        participants: 24,
        participantsImages: [ChristianImage, ChristianImage, ChristianImage],
    },
    {
        name: "Homeboyz",
        description: "Groove n vibes",
        participants: 24,
        participantsImages: [ChristianImage, ChristianImage, ChristianImage],
    },
    {
        name: "Homeboyz",
        description: "Groove n vibes",
        participants: 24,
        participantsImages: [ChristianImage, ChristianImage, ChristianImage],
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
        participantsImages: [ChristianImage, ChristianImage, ChristianImage],
    },
    {
        name: "Santa Party",
        creator: "Ayotunde",
        role: "Organizer",
        startDate: "23 Nov,2023",
        endDate: "24 Dec,2023",
        eventCount: 24,
        participantsImages: [ChristianImage, ChristianImage, ChristianImage],
    },
    {
        name: "Thanksgiving Cruise",
        creator: "Ayotunde",
        role: "Organizer",
        startDate: "23 Nov,2023",
        endDate: "24 Dec,2023",
        eventCount: 24,
        participantsImages: [ChristianImage, ChristianImage, ChristianImage],
    },
];

const Page = () => {
    return (
        <main className="space-y-12">
            <h1>DashBoard Contents</h1>
            <section className="">
                <div className="flex items-center gap-12 justify-between mb-8">
                    <h2 className="font-bold text-2xl">My Groups</h2>
                    <Link href="#">View all</Link>
                </div>

                <div className="flex items-center justify-between gap-8 flex-wrap">
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
                            <div className="flex items-center gap-4 pl-6">
                                {group.participantsImages.map((image, i) => (
                                    <Image
                                        key={i}
                                        src={image}
                                        alt="Christian Enyia"
                                        className="rounded-full h-10 w-10 -ml-6"
                                    />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section className="">
                <div className="flex items-center gap-12 justify-between mb-8">
                    <h2 className="font-bold text-2xl">My Events</h2>
                    <Link href="#">View all</Link>
                </div>

                <div className="flex items-center justify-between gap-8 flex-wrap">
                    {eventData.map((event, i) => (
                        <div
                            key={i}
                            className="bg-white py-4 px-6 rounded-lg rounded-l-none shadow-md space-y-4  border-l-4 border-l-primary-red w-[24rem]"
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
                            <div className="border border-primary-gray1 px-4 py-2 rounded-sm text-primary-gray1 flex items-center gap-4 max-w-fit w-full">
                                <CalendarDays size={24} color="#000" />
                                <div className="flex items-center gap-2">
                                    <p className="whitespace-nowrap">{event?.startDate}</p>
                                    <span> - </span>
                                    <p className="whitespace-nowrap">{event?.endDate}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 pl-6">
                                {event.participantsImages.map((image, i) => (
                                    <Image
                                        key={i}
                                        src={image}
                                        alt="Christian Enyia"
                                        className="rounded-full h-8 w-8 -ml-6"
                                    />
                                ))}
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
