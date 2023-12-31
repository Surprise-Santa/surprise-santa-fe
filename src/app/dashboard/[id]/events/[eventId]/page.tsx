"use client";
import { MoveLeft } from "lucide-react";
import LoadingSpinner from "@/components/ui/spinner";
import { convertDateFormat, reformData } from "@/lib/utils";
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
import TablePagination from "@/components/ui/table-pagination";
import { useMemo, useState } from "react";
import { useDebounce } from "use-debounce";

const EventDetails = () => {
    const { eventId } = useParams();
    const [filters, setFilters] = useState<any>({
        size: 10,
    });
    const [debouncedTerm] = useDebounce(filters.term, 500);
    const [count, setCount] = useState(0);
    const router = useRouter();

    const { data, isLoading, isSuccess } = useGetEventById(eventId as string, {
        ...(debouncedTerm && { term: debouncedTerm }),
        ...(filters.size && { size: filters.size }),
        ...(filters.cursor && { cursor: filters.cursor }),
    });

    const participantsData = data?.participants;

    const memoizedData = useMemo(() => {
        if (isSuccess) return reformData(data?.participants);
        return [];
    }, [data, isSuccess]);

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
                        {data?.group?.name || "N/A"}
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
                        <AddParticipants eventData={data} />
                    </Dialog>
                </div>
                <div className="flex flex-row w-full justify-between items-center gap-4">
                    <Input
                        type="text"
                        placeholder="Search participants"
                        style={{
                            padding: ".45rem",
                            paddingLeft: "2rem",
                        }}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setCount(0);
                            setFilters((prevState: any) => {
                                const { cursor, ...otherPrevState } = prevState;
                                return {
                                    ...otherPrevState,
                                    term: e.target.value,
                                };
                            });
                        }}
                    />
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
                    {memoizedData?.map((participant: any) => {
                        return (
                            <TableRow key={participant.userid}>
                                <TableCell>
                                    {participant?.user?.firstName} {participant?.user?.lastName}
                                </TableCell>
                                <TableCell>{participant?.user?.email}</TableCell>
                                <TableCell>{participant?.user?.gender}</TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>

            <TablePagination
                totalCount={participantsData?.totalCount!}
                nextLoad={participantsData?.pageCursors.next?.cursor}
                previous={participantsData?.pageCursors.previous?.cursor}
                count={count}
                setCount={setCount}
                filters={filters}
                setFilters={setFilters}
                handleNextLoad={() => {
                    const next = participantsData?.pageCursors.next;
                    if (!next) return;
                    setFilters((prevState: any) => ({
                        ...prevState,
                        cursor: next.cursor,
                    }));
                }}
                handlePreviousLoad={() => {
                    const previous = participantsData?.pageCursors.previous;
                    if (!previous) return;
                    setFilters((prevState: any) => ({
                        ...prevState,
                        cursor: previous.cursor,
                    }));
                }}
            />
        </main>
    );
};

export default EventDetails;
