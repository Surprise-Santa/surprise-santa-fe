"use client";
import { Input } from "@/components/ui/input";
import { useGetAllEvents } from "@/services/queries/events";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import CalendarIcon from "../../../../../public/icons/calendar-icon";
import { EventType } from "@/types/events";
import { convertDateFormat } from "@/lib/utils";
import LoadingSpinner from "@/components/ui/spinner";
import NoEventImg from "../../../../../public/images/no-event.png";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

const Events = () => {
    const { data, isLoading } = useGetAllEvents();
    const { id: groupId } = useParams();

    if (isLoading)
        return (
            <div className="flex items-center justify-center h-[calc(100vh-10rem)]">
                <LoadingSpinner />
            </div>
        );

    return (
        <main className="flex flex-col ">
            <div className="w-1/4">
                <Input type="text" placeholder="Search events" />
            </div>

            {data.length ? (
                <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 gap-8">
                    {data?.map(({ id, title, startDate, endDate }: EventType) => {
                        return (
                            <Link href={`/dashboard/${groupId}/events/${id}`} key={id}>
                                <div className="w-[100%] border-l-4 border-l-red-500 rounded px-8 py-4 shadow-md flex flex-col gap-2">
                                    <h2 className="font-semibold text-xl">{title}</h2>
                                    <div className="flex items-center gap-2">
                                        <Avatar className="h-10 w-10">
                                            <AvatarImage src="../../../../../public/images/Christian.jpg" />
                                            <AvatarFallback>AI</AvatarFallback>
                                        </Avatar>
                                        <p className="text-lg font-medium">
                                            Ayotunde
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
                                        <div className="h-max relative flex">
                                            <span className="inline-block h-10 w-10 bg-sky-500 bg-opacity-50 rounded-full flex items-center justify-center text-sky-700 font-semibold z-10">
                                                LW
                                            </span>
                                            <span className="inline-block h-10 w-10 bg-rose-500 bg-opacity-50 rounded-full flex items-center justify-center text-rose-700 font-semibold z-20 -ml-2">
                                                EH
                                            </span>
                                            <span className="inline-block h-10 w-10 bg-emerald-500 bg-opacity-50 rounded-full flex items-center justify-center text-emerald-700 font-semibold z-30 -ml-2">
                                                GW
                                            </span>
                                        </div>
                                        <p className="text-lg font-medium">+12</p>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
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
