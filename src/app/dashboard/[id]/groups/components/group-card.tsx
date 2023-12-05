import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import React from "react";

interface PropType {
    src?: string;
    initials?: string;
    name?: string;
    status?: string;
}

const GroupCard = ({ src, initials, name, status }: PropType) => {
    return (
        <Link href={`/dashboard/2/groups/2`}>
            <div className="shadow-custom p-4 w-[100%] xl:w-[80%] flex flex-col items-center justify-center mt-6 border-l-4 border-l-primary-red">
                <div className="flex items-center gap-4">
                    <Avatar className="h-20 w-20">
                        <AvatarImage src={src} />
                        <AvatarFallback>{initials}</AvatarFallback>
                    </Avatar>
                    <div className="">
                        <h2 className=" font-semibold text-[1.2rem]">{name}</h2>
                        <p className="opacity-50 text-[1rem]">{status}</p>
                    </div>
                </div>
                <div className="mt-2 ml-[-5.5rem]">
                    <div className="flex gap-2">
                        <p className="opacity-50 text-[1rem]">Participants:</p>
                        <p className="opacity-75 text-[1rem] font-semibold">24</p>
                    </div>
                    <div className="flex mt-2">
                        <Avatar className="h-10 w-10" style={{ margin: "-3px" }}>
                            <AvatarImage src={src} />
                            <AvatarFallback>RO</AvatarFallback>
                        </Avatar>
                        <Avatar className="h-10 w-10" style={{ margin: "-3px" }}>
                            <AvatarImage src={src} />
                            <AvatarFallback>MT</AvatarFallback>
                        </Avatar>
                        <Avatar className="h-10 w-10" style={{ margin: "-3px" }}>
                            <AvatarImage src={src} />
                            <AvatarFallback>EM</AvatarFallback>
                        </Avatar>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default GroupCard;
