import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function convertDateFormat(inputDate: string): string {
    const options: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "short",
        day: "numeric",
    };

    const date = new Date(inputDate);
    const formattedDate = date.toLocaleDateString("en-US", options);

    return formattedDate;
}

export const extractInitials = (inputString: string) => {
    return inputString
        .split(" ")
        .map((word) => word.charAt(0))
        .join("");
};
