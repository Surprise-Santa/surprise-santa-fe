"use client";

import { Button } from "@/components/ui/button";
import { useGetGroupCodeDetails } from "@/services/queries/groups";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import MessageIcon from "public/images/invite-icon.svg";
import LoadingSpinner from "../ui/spinner";

const GroupInviteModal = () => {
    const router = useRouter();

    const userId =
        typeof window !== "undefined" &&
        JSON.parse(window.sessionStorage.getItem("user") as string)?.user?.id;

    const groupCodeParams = useSearchParams();
    const groupCode = groupCodeParams.get("group");
    const { data, isLoading } = useGetGroupCodeDetails(groupCode as string);

    const handleJoinGroup = () => {
        if (sessionStorage.getItem("user")) {
            router.push(`/dashboard/${userId}`);
        } else {
            router.push(`/auth/signup`);
        }
        groupCode !== null && sessionStorage.setItem("groupCode", groupCode);
    };

    return (
        <>
            {isLoading ? (
                <div className="flex items-center justify-center mt-[20rem]">
                    <LoadingSpinner />
                </div>
            ) : (
                <div className="h-[100vh] bg-group relative to-red-50">
                    <div className="max-w-[100%] w-full sm:max-w-[40rem] absolute top-[180px] left-0 right-0 bg-white shadow-custom  mx-auto py-6 ">
                        <div className="mt-6 flex flex-col items-center justify-center gap-8 pb-4">
                            <div className="flex items-center gap-4">
                                <Image src={MessageIcon} alt="invite image" />
                            </div>
                            <div className="flex flex-col items-center justify-center gap-1">
                                <p className="font-medium">You have been invited to join</p>
                                <p className="font-bold text-[1.4rem] mt-1">{data?.name} </p>
                                <p className="font-medium mb-6">
                                    {" "}
                                    By {data?.owner?.firstName} {data?.owner?.lastName}{" "}
                                </p>
                                <Button type="button" onClick={handleJoinGroup}>
                                    <p>Proceed</p>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default GroupInviteModal;
