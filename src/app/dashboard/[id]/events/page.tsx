"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { useGetAllEvents } from "@/services/queries/events";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import CalendarIcon from "../../../../../public/icons/calendar-icon";
import { EventType } from "@/types/events";
import { convertDateFormat, extractInitials, reformData } from "@/lib/utils";
import LoadingSpinner from "@/components/ui/spinner";
import NoEventImg from "../../../../../public/images/no-event.png";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import CreateEvent from "@/components/events/create-event-popup";
import { useMemo } from "react";

const Events = () => {
    const { id: groupId } = useParams();
    const { data: allEvents, isLoading, isSuccess } = useGetAllEvents();

    const memoizedAllEvents = useMemo(() => {
        if (isSuccess) return reformData(allEvents);
        return [];
    }, [allEvents, isSuccess]);

    if (isLoading)
        return (
            <div className="flex items-center justify-center h-[calc(100vh-10rem)]">
                <LoadingSpinner />
            </div>
        );

    return (
        <main className="flex flex-col">
            <div className="flex flex-col sm:flex-row items-center justify-between">
                <Input className="w-full sm:w-1/4" type="text" placeholder="Search events" />
                <Dialog>
                    <DialogTrigger asChild>
                        <Button className="mt-4 sm:mt-0 sm:mr-4 sm:w-max w-full">
                            Create Event
                        </Button>
                    </DialogTrigger>
                    <CreateEvent />
                </Dialog>
            </div>

            {memoizedAllEvents.length ? (
                <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 overflow-x-auto whitespace-nowrap">
                    {memoizedAllEvents?.map(
                        //@ts-ignore
                        ({ id, title, startDate, endDate, participants, ...event }: EventType) => {
                            return (
                                <Link href={`/dashboard/${groupId}/events/${id}`} key={id}>
                                    <div className="min-w-[18rem] w-full border-l-4 border-l-red-500 rounded px-8 py-4 shadow-md flex flex-col gap-2 hover:shadow-lg mr-8">
                                        <h2 className="font-semibold text-xl">{title}</h2>
                                        <div className="flex items-center gap-2">
                                            <Avatar className="h-10 w-10">
                                                <AvatarImage src="./images/Christian.jpg" />
                                                <AvatarFallback>AI</AvatarFallback>
                                            </Avatar>
                                            <p className="text-lg font-medium">
                                                {event?.organizer?.firstName}{" "}
                                                {event?.organizer?.lastName}
                                                <span className="text-neutral-400 text-md ml-2 font-normal">
                                                    (organizer)
                                                </span>
                                            </p>
                                        </div>
                                        <div className="p-0.5 border-2 flex gap-2 w-max">
                                            <CalendarIcon />
                                            <p className="text-neutral-400">
                                                {convertDateFormat(startDate)} -{" "}
                                                {convertDateFormat(endDate)}
                                            </p>
                                        </div>
                                        <div className="flex gap-2 items-center">
                                            <div className="flex">
                                                {participants?.length > 0 && (
                                                    <span className="h-10 w-10 bg-sky-500 bg-opacity-50 rounded-full flex items-center justify-center text-sky-700 font-semibold z-10">
                                                        {extractInitials(
                                                            participants[0].user.firstName +
                                                                " " +
                                                                participants[0].user.lastName,
                                                        )}
                                                    </span>
                                                )}
                                                {participants?.length > 1 && (
                                                    <span className="h-10 w-10 bg-rose-500 bg-opacity-50 rounded-full flex items-center justify-center text-rose-700 font-semibold z-20 -ml-2">
                                                        {extractInitials(
                                                            participants[1].user.firstName +
                                                                " " +
                                                                participants[1].user.lastName,
                                                        )}
                                                    </span>
                                                )}
                                                {participants?.length > 2 && (
                                                    <span className="h-10 w-10 bg-emerald-500 bg-opacity-50 rounded-full flex items-center justify-center text-emerald-700 font-semibold z-30 -ml-2">
                                                        {extractInitials(
                                                            participants[2].user.firstName +
                                                                " " +
                                                                participants[2].user.lastName,
                                                        )}
                                                    </span>
                                                )}
                                            </div>
                                            {participants.length > 3 && (
                                                <p className="text-lg font-medium">
                                                    + {participants?.length - 3}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </Link>
                            );
                        },
                    )}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center h-[calc(100vh-10rem)] mx-auto w-full">
                    <Image src={NoEventImg} alt="No event found" />
                    <p className="text-3xl font-semibold text-neutral-400 text-center">No event</p>
                </div>
            )}
        </main>
    );
};

export default Events;
