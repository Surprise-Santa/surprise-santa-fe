import { useMutation } from "@tanstack/react-query";
import axios from "@/services/axios";
import { urls } from "../urls";
import { CreateEventType } from "@/types/events";

export const useCreateEventMutation = () =>
    useMutation(["createEvent"], async (data: CreateEventType) => {
        const res = await axios.post(urls.createEventUrl, data);
        return res;
    });
// to do: invalidate query cache after mutation

export const useAddParticipantsToEventMutation = (eventId: string) => {
    return useMutation(
        ["addParticipantsToEvent", eventId],
        async (data: { participants: string[]; all: boolean }) => {
            const res = await axios.post(urls.addParticipantsToEventUrl(eventId), data);
            return res;
        },
    );
};
