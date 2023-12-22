import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

interface PropType {
    src?: any;
    href?: string;
    id?: any;
    initials?: string;
    name?: string;
    description?: string;
    participants?: number;
    members?: any;
    member?: any;
}

const GroupCard = ({
    src,
    initials,
    name,
    description,
    participants,
    members,
    href,
    id,
}: PropType) => {
    return (
        <Link href={`/dashboard/${id}/groups/${href}`}>
            <div className="shadow-custom py-4 px-8 w-[100%] xl:w-[80%] flex flex-col items-start mt-6 border-l-4 border-l-primary-red">
                <div className="flex items-center gap-4">
                    <Avatar className="h-20 w-20">
                        <AvatarImage src={src} />
                        <AvatarFallback>{initials}</AvatarFallback>
                    </Avatar>
                    <div className="">
                        <h2 className=" font-semibold text-[1.2rem]">{name}</h2>
                        <p className="opacity-50 text-[1rem]">{description}</p>
                    </div>
                </div>
                <div className="mt-2">
                    <div className="flex gap-2">
                        <p className="opacity-50 text-[1rem]">Participants:</p>
                        <p className="opacity-75 text-[1rem] font-semibold">{participants}</p>
                    </div>
                    {members && members.length > 0 && (
                        <div className="flex mt-2">
                            {members.slice(0, 4).map((member: any, index: any) => (
                                <div key={index} className="flex">
                                    <Avatar className="h-10 w-10" style={{ margin: "-3px" }}>
                                        <AvatarImage src={member.src} />
                                        <AvatarFallback>{member.member}</AvatarFallback>
                                    </Avatar>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </Link>
    );
};

export default GroupCard;
