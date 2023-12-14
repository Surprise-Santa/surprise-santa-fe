"use client";
import LoadingSpinner from "@/components/ui/spinner";
import { convertDateFormat } from "@/lib/utils";
import { useGetEventById, useGetMatch } from "@/services/queries/events";
import { useParams } from "next/navigation";
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

const EventDetails = () => {
    const { eventId } = useParams();
    const { data, isLoading } = useGetEventById(eventId as string);
    // const { data: matchData, isLoading: isMatchDataLoading } = useGetMatch(eventId as string);

    if (isLoading)
        return (
            <main className="flex items-center justify-center h-[calc(100vh-10rem)]">
                <LoadingSpinner />
            </main>
        );

    return (
        <main>
            <h1 className="font-bold text-2xl">Event Detail</h1>
            <div className="flex gap-12 mt-8 text-lg">
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
                <Button
                    className="mx-auto"
                    // onClick={handleMatch}
                >
                    Click here to be matched!
                </Button>
            </div>

            <div className="mt-16 flex justify-between items-center">
                <h2 className="font-bold text-xl">Event Participants</h2>
                <div className="flex">
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button className="mr-4">Add Participant</Button>
                        </DialogTrigger>
                        <AddParticipants groupId={data?.groupId} eventData={data} />
                    </Dialog>
                    <Input type="text" placeholder="Search participants" />
                </div>
            </div>

            <Table className="mt-8">
                <TableHeader>
                    <TableRow className="font-bold text-base mt-8 bg-[#C7E8CA]">
                        <TableHead>Participant Name</TableHead>

                        <TableHead>Email Address</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data?.participants.map((participant: ParticipantType) => (
                        <TableRow key={participant.id}>
                            <TableCell>{participant?.id}</TableCell>
                            <TableCell>{participant?.email}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </main>
    );
};

export default EventDetails;
