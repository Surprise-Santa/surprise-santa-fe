"use client";

import { Button } from "@/components/ui/button";
import { useGetGroupById } from "@/services/queries/groups";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import MessageIcon from "public/images/invite-icon.svg";

const GroupInviteModal = () => {
    const router = useRouter();

    const userId =
        typeof window !== "undefined" &&
        JSON.parse(window.sessionStorage.getItem("user") as string)?.user?.id;

    const groupCodeParams = useSearchParams();
    const groupCode = groupCodeParams.get("group");
    const { data } = useGetGroupById(groupCode as string);

    const handleJoinGroup = () => {
        if (sessionStorage.getItem("user")) {
            router.push(`/dashboard/${userId}/groups/${groupCode}`);
        } else {
            router.push(`/auth/signup`);
        }
        groupCode !== null && sessionStorage.setItem("groupCode", groupCode);
    };

    return (
        <div className="max-w-[100%] w-full sm:max-w-[30rem] absolute top-[180px] left-0 right-0 bg-white shadow-custom  mx-auto py-6">
            <div className="mt-6 flex flex-col items-center justify-center gap-8 pb-4">
                <div className="flex items-center gap-4">
                    <Image src={MessageIcon} alt="invite image" />
                </div>
                <div className="flex flex-col items-center justify-center gap-2">
                    <p className="font-medium">You have been invited to join</p>
                    <p className="font-bold text-[1.2rem]">{data?.name} </p>
                    <p className="font-medium mb-4">{data?.members?.length} members </p>
                    <div className="">
                        <Button type="button" onClick={handleJoinGroup}>
                            <p>Proceed</p>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GroupInviteModal;
