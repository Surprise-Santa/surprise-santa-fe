"use client";

import LoadingSpinner from "@/components/ui/spinner";
import { extractInitials } from "@/lib/utils";
import ProtectedPage from "@/services/guard/ProtectedPage";
import { useGetAllGroups, useGetOtherGroups } from "@/services/queries/groups";
import Image from "next/image";
import NoDataImage from "public/images/no-data-icon.png";
import { useState } from "react";
import GroupCard from "../../../../components/groups/group-card";
import { useParams } from "next/navigation";
import { Dialog } from "@radix-ui/react-dialog";
import { DialogTrigger } from "@/components/ui/dialog";
import InviteMembers from "../../../../components/groups/invite-members";
import { Button } from "@/components/ui/button";
import CreateGroup from "../../../../components/groups/create-group";

const Groups = () => {
    const [displayScrollbar, setDisplayScrollbar] = useState(false);
    const [open, setOpen] = useState(false)
    const { data: myGroups, isLoading: myGroupsLoading } = useGetAllGroups();
    const { data: otherGroups, isLoading: otherGroupsLoading } = useGetOtherGroups();
    const { id } = useParams();

    if (myGroupsLoading || otherGroupsLoading)
        return (
            <div className="flex items-center justify-center h-[calc(100vh-10rem)]">
                <LoadingSpinner />
            </div>
        );

    return (
        <section>
            <Dialog open={open} onOpenChange={setOpen} >
                <DialogTrigger asChild>
                    <div className="flex justify-end align-end mb-4">
                        <Button type="button">Create Group</Button>
                    </div>
                </DialogTrigger>
                <CreateGroup setOpen={setOpen}/>
            </Dialog>
            <div className="flex flex-col lg:flex-row gap-2 justify-between transition-all duration-300 ease-in-out">
                <div
                    className={`w-[100%] lg:w-[47%] h-[28rem] relative border-2 border-primary-gray mt-4 rounded-xl p-6 overflow-y-auto ${
                        displayScrollbar ? "scrollBar" : "scroll"
                    }`}
                    onMouseEnter={() => setDisplayScrollbar(true)}
                    onMouseLeave={() => setDisplayScrollbar(false)}
                >
                    <h2 className="font-bold text-[1.4rem] ">My Groups</h2>
                    {myGroups?.length ? (
                        myGroups?.map((list: any) => {
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
                        displayScrollbar ? "scrollBar" : "scroll"
                    }`}
                    onMouseEnter={() => setDisplayScrollbar(true)}
                    onMouseLeave={() => setDisplayScrollbar(false)}
                >
                    <h2 className="font-bold text-[1.4rem]">Other Groups</h2>
                    {otherGroups?.length ? (
                        otherGroups?.map((list: any) => {
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
