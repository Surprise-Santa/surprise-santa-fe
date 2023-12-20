"use client";

import Image from "next/image";
import Link from "next/link";
import { CalendarDays } from "lucide-react";
import { useParams } from "next/navigation";
import { isFuture, isPast } from "date-fns";
import { Checkbox } from "@/components/ui/checkbox";
import ProtectedPage from "@/services/guard/ProtectedPage";
import { getRandomChristmasColors } from "@/lib/colors";
import { AppCalendar } from "@/components/ui/calendar/calendar";
import { useGetAllEvents } from "@/services/queries/events";
import { EventType } from "@/types/events";
import { convertDateFormat, extractInitials } from "@/lib/utils";
import LoadingSpinner from "@/components/ui/spinner";
import { useGetOwnGroups } from "@/services/queries/groups";

const Page = () => {
    const { id } = useParams();
    const { data: events, isLoading } = useGetAllEvents();
    const { data: groups } = useGetOwnGroups();
    const randomChristmasColors = getRandomChristmasColors(events?.length);

    const { totalCount: totalGroupsCount, pageEdges: ownGroups } = groups || {};
    const { pageEdges: ownEvents } = events || {};

    let upcomingEvents: EventType[] = [];
    let activeEvents: EventType[] = [];

    ownEvents?.forEach((event: EventType) => {
        let startDate = new Date(event.startDate);
        let endDate = new Date(event.endDate);

        if (isFuture(startDate)) {
            upcomingEvents.push(event);
        } else if (isPast(startDate) && isFuture(endDate)) {
            activeEvents.push(event);
        }
    });
    upcomingEvents = upcomingEvents.slice(0, 2);
    activeEvents = activeEvents.slice(0, 2);

    const combinedEvents = [...upcomingEvents, ...activeEvents];

    if (isLoading)
        return (
            <div className="flex items-center justify-center h-[calc(100vh-10rem)]">
                <LoadingSpinner />
            </div>
        );

    return (
        <main className="space-y-12">
            <section className="rounded-md w-full bg-white py-4 shadow-lg flex flex-col md:flex-row gap-2 md:gap-8 md:divide-x-2">
                <div className="p-4 order-3 md:order-1 w-full h-full flex items-center justify-center">
                    <AppCalendar events={combinedEvents} />
                </div>
                <div className="space-y-4 p-4 order-1 md:order-2 w-full">
                    <p>Active Events</p>
                    <div className="flex flex-col gap-6">
                        {activeEvents.length > 0 ? (
                            activeEvents.map((event) => (
                                <Link href={`/dashboard/${id}/events/${event.id}`} key={event.id}>
                                    <div className="flex gap-2">
                                        <Checkbox />
                                        <div className="-mt-1">
                                            <p className="text-sm">{event.title}</p>
                                            <div className="border border-primary-gray1 px-4 py-2 rounded-sm text-primary-light-opaque flex items-center gap-4">
                                                <CalendarDays size={24} color="#000" />
                                                <div className="flex items-center gap-2">
                                                    <p className="whitespace-nowrap">
                                                        {convertDateFormat(event.startDate)}
                                                    </p>
                                                    <span> - </span>
                                                    <p className="whitespace-nowrap">
                                                        {convertDateFormat(event.endDate)}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))
                        ) : (
                            <p>No Upcoming Events</p>
                        )}
                    </div>
                </div>
                <div className="space-y-4 p-4 order-2 md:order-3 w-full">
                    <p>Upcoming Events</p>
                    <div className="flex flex-col gap-6">
                        {upcomingEvents.length > 0 ? (
                            upcomingEvents.map((event) => (
                                <Link href={`/dashboard/${id}/events/${event.id}`} key={event.id}>
                                    <div className="flex gap-2">
                                        <Checkbox />
                                        <div className="-mt-1">
                                            <p className="text-sm">{event.title}</p>
                                            <div className="border border-primary-gray1 px-4 py-2 rounded-sm text-primary-light-opaque flex items-center gap-4">
                                                <CalendarDays size={20} color="#000" />
                                                <div className="flex items-center gap-2">
                                                    <p className="whitespace-nowrap">
                                                        {convertDateFormat(event.startDate)}
                                                    </p>
                                                    <span> - </span>
                                                    <p className="whitespace-nowrap">
                                                        {convertDateFormat(event.endDate)}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))
                        ) : (
                            <p>No Upcoming Events</p>
                        )}
                    </div>
                </div>
            </section>

            <section>
                <div className="flex items-center gap-12 justify-between mb-8">
                    <h2 className="font-bold text-2xl">My Groups</h2>
                    {totalGroupsCount && totalGroupsCount > 0 ? (
                        <Link href="#">View all</Link>
                    ) : null}
                </div>

                <div className="flex items-center justify-center md:justify-between gap-8 flex-wrap">
                    {ownGroups &&
                        ownGroups?.map((item) => {
                            const group = item?.node;
                            return (
                                <Link
                                    href={`/dashboard/${id}}/groups/${group.id}`}
                                    key={group.id}
                                    className="bg-white py-4 px-6 rounded-lg rounded-l-none shadow-md space-y-4  border-l-4 border-l-primary-red w-[20rem]"
                                >
                                    <div className="flex items-center gap-4">
                                        <Image
                                            src={group.logoUrl || "/images/Christian.jpg"}
                                            alt={group.description}
                                            className="rounded-full h-16 w-16"
                                            width={64}
                                            height={64}
                                        />
                                        <div>
                                            <p className="font-semibold text-xl">{group.name}</p>
                                            <p className="text-primary-opaque">
                                                {group.description}
                                            </p>
                                        </div>
                                    </div>
                                    <p className="text-primary-light-opaque">
                                        Participants:{" "}
                                        <span className="text-black">{group.members?.length}</span>
                                    </p>
                                    <div className="h-max relative flex">
                                        {group.members?.length > 0 && (
                                            <span className="h-10 w-10 bg-sky-500 bg-opacity-50 rounded-full flex items-center justify-center text-sky-700 font-semibold z-10">
                                                {extractInitials(
                                                    group.members[0].user.firstName +
                                                        " " +
                                                        group.members[0].user.lastName,
                                                )}
                                            </span>
                                        )}
                                        {group.members?.length > 1 && (
                                            <span className="h-10 w-10 bg-rose-500 bg-opacity-50 rounded-full flex items-center justify-center text-rose-700 font-semibold z-20 -ml-2">
                                                {extractInitials(
                                                    group.members[1].user.firstName +
                                                        " " +
                                                        group.members[1].user.lastName,
                                                )}
                                            </span>
                                        )}
                                        {group.members?.length > 2 && (
                                            <span className="h-10 w-10 bg-emerald-500 bg-opacity-50 rounded-full flex items-center justify-center text-emerald-700 font-semibold z-30 -ml-2">
                                                {extractInitials(
                                                    group.members[2].user.firstName +
                                                        " " +
                                                        group.members[2].user.lastName,
                                                )}
                                            </span>
                                        )}
                                        {group.members?.length > 3 && (
                                            <p>+{group.members?.length - 3}</p>
                                        )}
                                    </div>
                                </Link>
                            );
                        })}
                </div>
            </section>

            <section>
                <div className="flex items-center gap-12 justify-between mb-8">
                    <h2 className="font-bold text-2xl">My Events</h2>
                    {combinedEvents.length > 0 && <Link href="#">View all</Link>}
                </div>

                <div className="flex items-center justify-center md:justify-between gap-8 flex-wrap">
                    {combinedEvents.length > 0 &&
                        combinedEvents.map((event, index) => (
                            <div
                                key={event.id}
                                className="bg-white py-4 px-6 rounded-lg rounded-l-none shadow-md space-y-4 border-l-4 w-[24rem]"
                                style={{
                                    borderLeftColor: `${randomChristmasColors[index]}`,
                                }}
                            >
                                <p className="font-semibold text-2xl">{event.title}</p>
                                <div className="flex items-center gap-4">
                                    <Image
                                        src="/images/Christian.jpg"
                                        alt="Christian Enyia"
                                        className="rounded-full h-12 w-12"
                                        width={48}
                                        height={48}
                                    />
                                    <p className="text-black flex flex-nowrap gap-1 items-center text-xl">
                                        {event?.createdBy}{" "}
                                        <span className="text-primary-light-opaque text-base">
                                            (organizer)
                                        </span>
                                    </p>
                                </div>
                                <div className="border border-primary-gray1 px-4 py-2 rounded-sm text-primary-light-opaque flex items-center gap-4 max-w-fit w-full">
                                    <CalendarDays size={24} color="#000" />
                                    <div className="flex items-center gap-2">
                                        <p className="whitespace-nowrap">
                                            {convertDateFormat(event.startDate)}
                                        </p>
                                        <span> - </span>
                                        <p className="whitespace-nowrap">
                                            {convertDateFormat(event.endDate)}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="flex">
                                        {event.participants?.length > 0 && (
                                            <span className="h-10 w-10 bg-sky-500 bg-opacity-50 rounded-full flex items-center justify-center text-sky-700 font-semibold z-10">
                                                {extractInitials(
                                                    event.participants[0].user.firstName +
                                                        " " +
                                                        event.participants[0].user.lastName,
                                                )}
                                            </span>
                                        )}
                                        {event.participants?.length > 1 && (
                                            <span className="h-10 w-10 bg-rose-500 bg-opacity-50 rounded-full flex items-center justify-center text-rose-700 font-semibold z-20 -ml-2">
                                                {extractInitials(
                                                    event.participants[1].user.firstName +
                                                        " " +
                                                        event.participants[1].user.lastName,
                                                )}
                                            </span>
                                        )}
                                        {event.participants?.length > 2 && (
                                            <span className="h-10 w-10 bg-emerald-500 bg-opacity-50 rounded-full flex items-center justify-center text-emerald-700 font-semibold z-30 -ml-2">
                                                {extractInitials(
                                                    event.participants[2].user.firstName +
                                                        " " +
                                                        event.participants[2].user.lastName,
                                                )}
                                            </span>
                                        )}
                                    </div>
                                    {event?.participants?.length > 3 && (
                                        <p>+{event?.participants?.length - 3}</p>
                                    )}
                                </div>
                            </div>
                        ))}
                </div>
            </section>
        </main>
    );
};

export default ProtectedPage(Page);
