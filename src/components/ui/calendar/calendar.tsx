"use client";

import { useState, useCallback } from "react";
import Calendar, { CalendarProps } from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { EventType } from "@/types/events";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];
interface TileContentProp {
    date: Date;
    view: string;
}
interface CalendarPropsType extends CalendarProps {
    props?: any;
    events?: EventType[];
}

export const AppCalendar = ({ props, events }: CalendarPropsType) => {
    const [value, setValue] = useState<Value>(new Date());

    console.log("ev", events);

    // const tileContent = useCallback(
    //     ({ date, view }: TileContentProp) => {
    //         if (view === "month") {
    //             const day = date.getDate();
    //             const month = date.getMonth();
    //             const year = date.getFullYear();
    //             const event = events?.find((event) => {
    //                 const eventDate = new Date(event?.node?.startDate);
    //                 const eventDay = eventDate.getDate();
    //                 const eventMonth = eventDate.getMonth();
    //                 const eventYear = eventDate.getFullYear();
    //                 return day === eventDay && month === eventMonth && year === eventYear;
    //             });
    //             return (
    //                 <span className="text-xs w-full min-w-fit max-w-max">{event?.node?.title}</span>
    //             );
    //         }
    //         return null;
    //     },
    //     [events],
    // );

    const tileContent = useCallback(
        ({ date, view }: TileContentProp) => {
            if (view === "month") {
                const day = date.getDate();
                const month = date.getMonth();
                const year = date.getFullYear();
                const dayEvents = events?.filter((event) => {
                    const eventDate = new Date(event?.node?.startDate);
                    const eventDay = eventDate.getDate();
                    const eventMonth = eventDate.getMonth();
                    const eventYear = eventDate.getFullYear();
                    return day === eventDay && month === eventMonth && year === eventYear;
                });
                if (dayEvents?.length && dayEvents?.length > 0) {
                    return (
                        <div className="text-xs w-full min-w-fit max-w-max flex flex-col gap-1">
                            {dayEvents
                                ?.slice(0, 1)
                                .map((event) => (
                                    <span key={event?.node?.id}>{event?.node?.title}</span>
                                ))}
                            {dayEvents?.length > 1 && (
                                <span className="text-xs text-neutral-400">
                                    + {dayEvents?.length - 1} more
                                </span>
                            )}
                        </div>
                    );
                }
            }
            return null;
        },
        [events],
    );

    return (
        <Calendar
            onChange={setValue}
            value={value}
            tileContent={tileContent}
            tileClassName="w-full grid place-items-center gap-1"
            className="w-full h-full px-2 text-ellipsis"
            {...props}
        />
    );
};
