"use client";
import { MoveLeft } from "lucide-react";
import LoadingSpinner from "@/components/ui/spinner";
import { convertDateFormat } from "@/lib/utils";
import { useGetEventById } from "@/services/queries/events";
import { useParams, useRouter } from "next/navigation";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ParticipantType } from "@/types/events";
import toast from "react-hot-toast";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import AddParticipants from "@/components/events/add-participants-popup";
import { usePostMatchMutation } from "@/services/mutations/events.mutation";
import { useQuery } from "@tanstack/react-query";
import axios from "@/services/axios";
import { urls } from "@/services/urls";
import { isAfter } from "date-fns";

const EventDetails = () => {
    const { eventId } = useParams();
    const { data, isLoading } = useGetEventById(eventId as string);

    const router = useRouter();

    const { data: matchData, isLoading: isMatchDataLoading } = useQuery(
        ["getMatch", eventId],
        async () => {
            const res = await axios.get(urls.getMatchUrl(eventId as string));
            return res.data.data;
        },
        {
            enabled: isAfter(new Date(), new Date(data?.startDate)),
        },
    );

    const { mutateAsync: handleMatch, isLoading: isMatchLoading } = usePostMatchMutation(
        eventId as string,
    );

    if (isLoading)
        return (
            <main className="flex items-center justify-center h-[calc(100vh-10rem)]">
                <LoadingSpinner />
            </main>
        );

    return (
        <main>
            <div className="mt-4">
                <button
                    className="flex items-center gap-6 text-xl font-bold -mt-4 mb-8"
                    onClick={() => router.back()}
                >
                    <MoveLeft />
                    <h1 className="font-bold text-[1.4rem]">Event Detail</h1>
                </button>
            </div>
            <div className="flex flex-col md:flex-row sm:gap-12 gap-8 mt-8 text-lg">
                <div className="flex flex-col gap-8">
                    <p className="font-medium">
                        <span className="text-neutral-400 font-normal">Event Title: </span>
                        {data?.title}
                    </p>
                    <p className="font-medium">
                        <span className="text-neutral-400 font-normal">Description: </span>
                        {data?.description}
                    </p>
                    <p className="font-medium">
                        <span className="text-neutral-400 font-normal">Group Name: </span>
                        Bedrock Community
                    </p>
                </div>
                <div className="flex flex-col gap-8">
                    <p className="font-medium">
                        <span className="text-neutral-400 font-normal">Start Date: </span>
                        {convertDateFormat(data?.startDate)}
                    </p>
                    <p className="font-medium">
                        <span className="text-neutral-400 font-normal">End Date: </span>
                        {convertDateFormat(data?.endDate)}
                    </p>
                </div>
            </div>

            <div className="w-full flex align-center mt-8">
                {matchData ? (
                    <div className="flex flex-col gap-8 bg-[#C7E8CA] w-full p-4 rounded-md">
                        <p className="font-medium text-lg text-center">
                            <span className="text-neutral-400 font-normal">
                                You have been matched with{" "}
                            </span>
                            {matchData?.beneficiary?.firstName} {matchData?.beneficiary?.lastName}!
                        </p>
                    </div>
                ) : (
                    <Button
                        className="mx-auto min-w-[10rem]"
                        onClick={
                            isAfter(new Date(), new Date(data?.startDate))
                                ? () => handleMatch()
                                : () => toast.error("Event has not started yet!")
                        }
                    >
                        {isMatchLoading ? <LoadingSpinner /> : "Get Matched!"}
                    </Button>
                )}
            </div>

            <div className="mt-16 flex flex-col gap-4">
                <div className="flex flex-row w-full justify-between items-center">
                    <h2 className="font-bold text-xl">Event Participants</h2>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button>Add Participant</Button>
                        </DialogTrigger>
                        <AddParticipants groupId={data?.groupId} eventData={data} />
                    </Dialog>
                </div>
                <div className="flex flex-row w-full justify-between items-center gap-4">
                    <Input type="text" placeholder="Search participants" /> <Button>Search</Button>
                </div>
            </div>

            <Table className="mt-8">
                <TableHeader>
                    <TableRow className="font-bold text-base mt-8 bg-[#C7E8CA]">
                        <TableHead>Name</TableHead>
                        <TableHead>Email Address</TableHead>
                        <TableHead>Gender</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data?.participants.map((participant: ParticipantType) => {
                        const { user } = participant;
                        return (
                            <TableRow key={participant?.id}>
                                <TableCell>
                                    {user?.firstName} {user?.lastName}
                                </TableCell>
                                <TableCell>{user?.email}</TableCell>
                                <TableCell>{user?.gender}</TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </main>
    );
};

export default EventDetails;
