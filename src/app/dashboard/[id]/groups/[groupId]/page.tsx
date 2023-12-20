"use client";
import LoadingSpinner from "@/components/ui/spinner";
import { convertDateFormat, reformData } from "@/lib/utils";
import { useGetGroupById } from "@/services/queries/groups";
import { MoveLeft } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useMemo } from "react";
import GroupTable from "../../../../../components/groups/group-table";

const GroupDetails = () => {
    const router = useRouter();
    const { groupId } = useParams();
    const { data, isLoading, isSuccess } = useGetGroupById(groupId as string);

    const memoizedData = useMemo(() => {
        if (isSuccess) return reformData(data?.members);
        return [];
    }, [data, isSuccess]);

    const dataA = [
        {
            id: "1",
            title: "Group name:",
            value: data?.name ?? 'N/A',
        },
        {
            id: "2",
            title: "Description:",
            value: data?.description ?? 'N/A',
        },

        {
            id: "3",
            title: "Group Code:",
            value: data?.groupCode ?? 'N/A',
        },
    ];
    const dataB = [
        {
            id: "1",
            title: "Members:",
            value: memoizedData?.length ?? 0,
        },
        {
            id: "2",
            title: "Group Type:",
            value: data?.isPublic ? "Public" : "Private",
        },

        {
            id: "3",
            title: "Date Created:",
            value: convertDateFormat(data?.createdAt) ?? 'N/A',
        },
    ];

    return (
        <>
            {isLoading ? (
                <div className="flex items-center justify-center h-[50vh] mt-20">
                    <LoadingSpinner />
                </div>
            ) : (
                <section className="mt-4">
                    <button
                        className="flex items-center gap-6 text-xl font-bold -mt-4 mb-8"
                        onClick={() => router.back()}
                    >
                        <MoveLeft />
                        <h1 className="font-bold text-[1.4rem]">Group Details</h1>
                    </button>
                    <div className="flex flex-col xl:flex-row gap-x-12 gap-y-8 xl:gap-40 mt-8 text-[1.08rem]">
                        <div className="flex flex-col gap-8">
                            {dataA.map((item) => {
                                return (
                                    <p className="font-medium" key={item.id}>
                                        <span className="text-neutral-400 font-normal mr-1 sm:mr-4">
                                            {item.title}{" "}
                                        </span>
                                        {item.value}
                                    </p>
                                );
                            })}
                        </div>
                        <div className="flex flex-col gap-8">
                            {dataB.map((item) => {
                                return (
                                    <p className="font-medium" key={item.id}>
                                        <span className="text-neutral-400 font-normal mr-1 sm:mr-4">
                                            {item.title}{" "}
                                        </span>
                                        {item.value}
                                    </p>
                                );
                            })}
                        </div>
                    </div>
                    <div className="mt-20">
                        <GroupTable groupId={groupId} />
                    </div>
                </section>
            )}
        </>
    );
};

export default GroupDetails;
