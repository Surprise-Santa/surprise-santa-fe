"use client";

import { useState, useCallback } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { isSameDay } from "date-fns";
import ClientWrapper from "@/components/wrapper/client";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

interface TileContentProp {
    date: number | Date;
    view: string;
}

const ViewCalendar = () => {
    const [value, onChange] = useState<Value>(new Date());

    const tileContent = useCallback(({ date, view }: TileContentProp) => {
        const datesToAddContentTo = [new Date("23 Dec 2023"), new Date()];

        // Add class to tiles in month view only
        if (view === "month") {
            // Check if a date React-Calendar wants to check is on the list of dates to add class to
            if (datesToAddContentTo.find((dDate) => isSameDay(dDate, date))) {
                return "Secret Santa";
            }
        }
    }, []);

    return (
        <Calendar
            onChange={onChange}
            value={value}
            tileContent={tileContent}
            tileClassName="gap-2 grid place-items-center"
        />
    );
};

export const AppCalendar = () => (
    <ClientWrapper>
        <ViewCalendar />
    </ClientWrapper>
);
