
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
import { useUpdateMatchMutation } from "@/services/mutations/events.mutation";
import toast from "react-hot-toast";

const EventDetails = () => {
    const { eventId } = useParams();
    const { data, isLoading } = useGetEventById(eventId as string);
    const { mutateAsync: updateMatch, isLoading: isUpdateMatchLoading } = useUpdateMatchMutation(
        eventId as string,
    );
    const { data: matchData, isLoading: isMatchDataLoading } = useGetMatch(eventId as string);

    const handleMatch = async () => {
        const result = await updateMatch();
        try {
            if (!result) return;
            if (result.status === 200 || result.status === 201) {
                toast.success(result.data.message || "Matched successfully");
            }
        } catch (error: any) {
            toast.error(error?.response?.data?.message || "An error occurred");
        }
    };

    if (isLoading || isMatchDataLoading)
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
                {matchData ? (
                    <div>
                        <p className="font-medium">
                            <span className="text-neutral-400 font-normal">Matched: </span>
                            {matchData?.name}
                        </p>
                        <p className="font-medium">
                            <span className="text-neutral-400 font-normal">Email: </span>
                            {matchData?.email}
                        </p>
                    </div>
                ) : (
                    <Button
                        className="mx-auto"
                        disabled={isUpdateMatchLoading}
                        onClick={handleMatch}
                    >
                        {isUpdateMatchLoading ? <LoadingSpinner /> : " Click here to be matched!"}
                    </Button>
                )}
            </div>

            <div className="mt-16 flex justify-between items-center">
                <h2 className="font-bold text-xl">Event Participants</h2>
                <div className="flex">
                    <Input type="text" placeholder="Search participants" />
                </div>
            </div>

            <Table className="mt-8">
                <TableHeader>
                    <TableRow className="font-bold text-base mt-8 bg-[#C7E8CA]">
                        <TableHead>Participant Name</TableHead>
                        <TableHead>Email</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data?.participants.map((participant: ParticipantType) => (
                        <TableRow key={participant.id}>
                            <TableCell>{participant?.name}</TableCell>
                            <TableCell>{participant?.email}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </main>
    );
};

export default EventDetails;
