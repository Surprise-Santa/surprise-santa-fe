"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { extractInitials } from "@/lib/utils";
import { useJoinGroupMutation } from "@/services/mutations/group.mutation";
import { useGetGroupCodeDetails } from "@/services/queries/groups";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import LoadingSpinner from "../ui/spinner";

const JoinGroupModal = () => {
    const router = useRouter();
    const { id } = useParams();
    const groupCode = sessionStorage.getItem("groupCode");

    const { data, isLoading } = useGetGroupCodeDetails(groupCode as string);
    const { mutateAsync: joinGroup } = useJoinGroupMutation(groupCode as string);

    const handleJoinGroup = async (data: any) => {
        const result = await joinGroup(data);

        try {
            if (!result) return;
            if (result.status === 200 || result.status === 201) {
                toast.success(result.data.message || `You are now a member of ${data?.name}`);
            }
        } catch (error: any) {
            toast.error(error?.response?.data?.message || "An error occurred");
        } finally {
            router.push(`/dashboard/${id}/groups`);
            sessionStorage.removeItem("groupCode");
        }
    };

    return (
        <div className="w-full h-full fixed top-[-48px] left-0 bg-linear">
            {isLoading ? (
                <LoadingSpinner />
            ) : (
                <div className="max-w-[100%]  sm:max-w-[30rem] absolute top-[150px] left-0 bg-white right-0 shadow-custom  mx-auto py-6">
                    <div className="mt-6 flex flex-col items-center justify-center gap-8 pb-4">
                        <div className="flex items-center">
                            <Avatar className="h-20 w-20">
                                <AvatarImage src={data?.logoUrl} />
                                <AvatarFallback>{extractInitials(data?.name)}</AvatarFallback>
                            </Avatar>
                        </div>
                        <div className="flex flex-col items-center justify-center gap-1">
                            <p className="font-bold text-[1.4rem]">Welcome to {data?.name} </p>
                            <p className="font-medium mb-6">
                                {" "}
                                By {data?.owner?.firstName} {data?.owner?.lastName}{" "}
                            </p>
                            <Button type="button" onClick={handleJoinGroup}>
                                <p>Join Group</p>
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default JoinGroupModal;
