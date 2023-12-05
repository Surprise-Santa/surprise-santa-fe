"use client";

import Image from "next/image";
import NoDataImage from "public/images/no-data-icon.png";
import ProtectedPage from "@/services/guard/ProtectedPage";
import GroupCard from "./components/group-card";

const Groups = () => {
    const cardData = [
        {
            id: "1",
            src: "",
            initials: "EM",
            name: "Mark James",
            status: "Team work",
        },
        {
            id: "2",
            src: "",
            initials: "OM",
            name: "Henry James",
            status: "Great work",
        },
        {
            id: "2",
            src: "",
            initials: "OM",
            name: "Henry James",
            status: "Great work",
        },
    ];

    return (
        <div className="flex flex-col lg:flex-row gap-2 justify-between ">
            <div className="w-[100%] lg:w-[47%] h-[33rem]  relative border-2 border-primary-gray mt-4 rounded-xl p-6 overflow-y-auto scrollBar">
                <h2 className="font-bold text-[1.4rem] ">My Groups</h2>
                {!cardData.length ? (
                    <div className="flex flex-col items-center justify-center mt-10 sm:mt-16">
                        <Image src={NoDataImage} alt="no data" />
                        <p className="opacity-50 text-[1rem] font-bold mt-2">No active group</p>
                    </div>
                ) : (
                    cardData.map((list) => {
                        return (
                            <div key={list.id} className="mt-8 ">
                                <GroupCard
                                    src={list.src}
                                    initials={list.initials}
                                    name={list.name}
                                    status={list.status}
                                />
                            </div>
                        );
                    })
                )}
            </div>
            <div className="w-[100%] lg:w-[47%] h-[33rem] border-2 border-primary-gray mt-4 p-6 rounded-xl">
                <h2 className="font-bold text-[1.4rem]">Other Groups</h2>
                <div className="flex flex-col items-center justify-center mt-10 sm:mt-20 mb-14 sm:mb-16">
                    <Image src={NoDataImage} alt="no data" />
                    <p className="opacity-50 text-[1rem] font-bold mt-2">No active group</p>
                </div>
            </div>
        </div>
    );
};

export default ProtectedPage(Groups);
