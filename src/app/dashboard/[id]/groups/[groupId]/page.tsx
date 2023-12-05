"use client";
import React from "react";
import GroupTable from "../components/group-table";
import { MoveLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const GroupDetails = () => {
    const router = useRouter();

    const dataA = [
        {
            id: "1",
            title: "Group name:",
            value: "SantaCares",
        },
        {
            id: "2",
            title: "Description:",
            value: "Fake it till you make it",
        },
        {
            id: "3",
            title: "Group Creator:",
            value: "Ayotunde",
        },
        {
            id: "4",
            title: "Group Link:",
            value: "https://secretsanta.com/56-yy/join",
        },
    ];
    const dataB = [
        {
            id: "1",
            title: "Members:",
            value: "10",
        },
        {
            id: "2",
            title: "Group Type:",
            value: "Public",
        },
        {
            id: "3",
            title: "Date Created:",
            value: "23-7-2023",
        },
    ];
    return (
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
                <GroupTable />
            </div>
        </section>
    );
};

export default GroupDetails;
