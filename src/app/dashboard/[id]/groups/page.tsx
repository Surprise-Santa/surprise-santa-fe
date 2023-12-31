"use client";

import { Dialog } from "@radix-ui/react-dialog";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { DialogTrigger } from "@/components/ui/dialog";
import LoadingSpinner from "@/components/ui/spinner";
import { extractInitials, reformData } from "@/lib/utils";
import ProtectedPage from "@/services/guard/ProtectedPage";
import { useGetAllGroups, useGetOwnGroups } from "@/services/queries/groups";
import NoDataImage from "public/images/no-data-icon.png";
import CreateGroup from "../../../../components/groups/create-group-modal";
import GroupCard from "../../../../components/groups/group-card";
import JoinGroupWithCode from "../../../../components/groups/join-group-with-code";

const Groups = () => {
    const { id } = useParams();
    const [displayAllGroupScrollbar, setDisplayAllGroupScrollbar] = useState(false);
    const [displayOtherGroupScrollbar, setDisplayOtherGroupScrollbar] = useState(false);
    const [open, setOpen] = useState(false);
    const [openJoinGroup, setOpenJoinGroup] = useState(false);
    const {
        data: allGroups,
        isLoading: allGroupsLoading,
        isSuccess: allGroupsSuccess,
    } = useGetAllGroups();

    const {
        data: ownGroups,
        isLoading: ownGroupsLoading,
        isSuccess: ownGroupsSuccess,
    } = useGetOwnGroups();

    const memoizedAllGroups = useMemo(() => {
        if (allGroupsSuccess) return reformData(allGroups);
        return [];
    }, [allGroups, allGroupsSuccess]);

    const memoizedOwnGroups = useMemo(() => {
        if (ownGroupsSuccess) return reformData(ownGroups);
        return [];
    }, [ownGroups, ownGroupsSuccess]);

    if (allGroupsLoading || ownGroupsLoading)
        return (
            <div className="flex items-center justify-center h-[calc(100vh-10rem)]">
                <LoadingSpinner />
            </div>
        );

    return (
        <section>
            <div className="flex gap-4 justify-end">
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                        <div className="flex justify-end align-end mb-4">
                            <Button type="button">Create Group</Button>
                        </div>
                    </DialogTrigger>
                    <CreateGroup setOpen={setOpen} />
                </Dialog>

                <Dialog open={openJoinGroup} onOpenChange={setOpenJoinGroup}>
                    <DialogTrigger asChild>
                        <div className="flex justify-end align-end mb-4">
                            <Button type="button">Join Group</Button>
                        </div>
                    </DialogTrigger>
                    <JoinGroupWithCode setOpen={setOpenJoinGroup} />
                </Dialog>
            </div>
            <div className="flex flex-col lg:flex-row gap-2 justify-between transition-all duration-300 ease-in-out">
                <div
                    className={`w-[100%] lg:w-[47%] h-[28rem] relative border-2 border-primary-gray mt-4 rounded-xl p-6 overflow-y-auto ${
                        displayOtherGroupScrollbar ? "scrollBar" : "scroll"
                    }`}
                    onMouseEnter={() => setDisplayOtherGroupScrollbar(true)}
                    onMouseLeave={() => setDisplayOtherGroupScrollbar(false)}
                >
                    <h2 className="font-bold text-[1.4rem]">My Groups</h2>
                    {memoizedOwnGroups?.length ? (
                        memoizedOwnGroups?.map((list: any) => {
                            return (
                                <div key={list.id} className="mt-8 ">
                                    <GroupCard
                                        href={list.id}
                                        id={id}
                                        src={list.logoUrl}
                                        initials={extractInitials(list.name)}
                                        name={list.name}
                                        description={list.description}
                                        participants={list.members?.length}
                                        members={list.members?.map((member: any) => ({
                                            src: member?.user?.profileImgUrl,
                                            member: `${member?.user?.firstName?.charAt(0) ?? ""} ${
                                                member?.user?.lastName?.charAt(0) ?? ""
                                            }`,
                                        }))}
                                    />
                                </div>
                            );
                        })
                    ) : (
                        <div className="flex flex-col items-center justify-center mt-10 sm:mt-24">
                            <Image src={NoDataImage} alt="no data" />
                            <p className="opacity-50 text-[1rem] font-bold mt-2">No active group</p>
                        </div>
                    )}
                </div>
                <div
                    className={`w-[100%] lg:w-[47%] h-[28rem] relative border-2 border-primary-gray mt-4 rounded-xl p-6 overflow-y-auto ${
                        displayAllGroupScrollbar ? "scrollBar" : "scroll"
                    }`}
                    onMouseEnter={() => setDisplayAllGroupScrollbar(true)}
                    onMouseLeave={() => setDisplayAllGroupScrollbar(false)}
                >
                    <h2 className="font-bold text-[1.4rem] ">Other Groups</h2>
                    {memoizedAllGroups?.length ? (
                        memoizedAllGroups?.map((list: any) => {
                            return (
                                <div key={list.id} className="mt-8 ">
                                    <GroupCard
                                        href={list.id}
                                        id={id}
                                        src={list.logoUrl}
                                        initials={extractInitials(list.name)}
                                        name={list.name}
                                        description={list.description}
                                        participants={list.members?.length}
                                        members={list.members?.map((member: any) => ({
                                            src: member?.user?.profileImgUrl,
                                            member: `${member?.user?.firstName?.charAt(0) ?? ""} ${
                                                member?.user?.lastName?.charAt(0) ?? ""
                                            }`,
                                        }))}
                                    />
                                </div>
                            );
                        })
                    ) : (
                        <div className="flex flex-col items-center justify-center mt-10 sm:mt-24">
                            <Image src={NoDataImage} alt="no data" />
                            <p className="opacity-50 text-[1rem] font-bold mt-2">No active group</p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default ProtectedPage(Groups);
