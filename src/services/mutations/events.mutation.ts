import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "@/services/axios";
import { urls } from "../urls";
import { CreateEventType } from "@/types/events";

export const useCreateEventMutation = () => {
    const queryClient = useQueryClient();

    return useMutation(
        ["createEvent"],
        async (data: CreateEventType) => {
            const res = await axios.post(urls.createEventUrl, data);
            return res;
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries({
                    queryKey: ["getAllEvents"],
                });
            },
        },
    );
};

export const useAddParticipantsToEventMutation = (eventId: string) => {
    return useMutation(
        ["addParticipantsToEvent", eventId],
        async (data: { participants: string[]; all: boolean }) => {
            const res = await axios.post(urls.addParticipantsToEventUrl(eventId), data);
            return res;
        },
    );
};

export const usePostMatchMutation = (eventId: string) => {
    const queryClient = useQueryClient();

    return useMutation(
        ["postMatch", eventId],
        async () => {
            const res = await axios.post(urls.getMatchUrl(eventId));
            return res;
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries({
                    queryKey: ["getMatch"],
                });
                queryClient.invalidateQueries({
                    queryKey: ["getEventById"],
                });
            },
        },
    );
};
