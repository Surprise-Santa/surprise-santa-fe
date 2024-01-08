import { useEffect, useState } from "react";
import { DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import Select from "react-select";
import { useGetGroupById } from "@/services/queries/groups";
import { useAddParticipantsToEventMutation } from "@/services/mutations/events.mutation";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";
import { ParticipantType } from "@/types/events";

interface ParticipantOption {
    value: string;
    label: string;
    user?: any;
}

const AddParticipants = ({ eventData }: { eventData: any }) => {
    const { eventId } = useParams();
    const { data: groupData, isLoading } = useGetGroupById(eventData?.groupId);
    const [participants, setParticipants] = useState<ParticipantType[]>([]);
    const [selectedParticipants, setSelectedParticipants] = useState<ParticipantOption[]>([]);
    const { mutateAsync: addParticipants } = useAddParticipantsToEventMutation(eventId as string);

    useEffect(() => {
        if (!groupData || !eventData) return;

        const participantUserIds = eventData.participants.pageEdges.map(
            (participant: any) => participant.node.userId,
        );
        const filteredParticipants = groupData.members.pageEdges.filter(
            (member: any) => !participantUserIds.includes(member.node.userId),
        );
        setParticipants(filteredParticipants);
    }, [groupData, eventData]);

    const onSubmit = async (event: any) => {
        event.preventDefault();
        const participantIds = selectedParticipants.map((participant) => participant.value);
        const data = {
            participants: participantIds,
            all: false,
        };

        const result = await addParticipants(data);
        try {
            if (!result) return;
            if (result.status === 200 || result.status === 201) {
                toast.success(result.data.message || "Participant(s) added successfully");
            }
        } catch (error: any) {
            toast.error(error?.response?.data?.message || "An error occurred");
        }
        document.getElementById("closeDialog")?.click();
    };

    return (
        <DialogContent className="sm:max-w-[40rem] h-auto overflow-y-auto">
            <DialogHeader>
                <DialogTitle>Add Participants</DialogTitle>
            </DialogHeader>

            <form onSubmit={onSubmit}>
                <div className="mt-8 mb-20 flex-col">
                    <Select
                        isMulti
                        name="participants"
                        isLoading={isLoading}
                        options={
                            participants &&
                            participants?.map((participant) => {
                                const { user } = participant?.node;
                                return {
                                    value: user?.id,
                                    label: user?.firstName + " " + user?.lastName,
                                };
                            })
                        }
                        className="basic-multi-select w-full"
                        classNamePrefix="select"
                        value={selectedParticipants}
                        onChange={(selectedOptions) => {
                            //@ts-ignore
                            setSelectedParticipants(selectedOptions);
                        }}
                    />
                </div>
                <DialogFooter className="w-max ml-auto my-4">
                    <DialogClose asChild id="closeDialog">
                        <Button variant="outline" type="button" className="w-max mr-4">
                            Cancel
                        </Button>
                    </DialogClose>
                    <Button type="submit" disabled={!selectedParticipants.length}>
                        {selectedParticipants.length > 1 ? "Add Participants" : "Add Participant"}
                    </Button>
                </DialogFooter>
            </form>
        </DialogContent>
    );
};

export default AddParticipants;
