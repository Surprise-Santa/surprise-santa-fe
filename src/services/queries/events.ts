import { useQuery } from "@tanstack/react-query";
import axios from "@/services/axios";
import { urls } from "../urls";
import { QueryParamsType } from "@/types";

export const useGetAllEvents = () => {
    return useQuery(["getAllEvents"], async () => {
        const res = await axios.get(urls.getAllEventsUrl);
        return res.data.data;
    });
};

export const useGetEventById = (id: string, Params?: QueryParamsType) => {
    return useQuery(
        ["getEventById", id, Params],
        async () => {
            const res = await axios.get(urls.getEventByIdUrl(id), {
                params: {
                    term: Params?.term || null,
                    size: Params?.size || 10,
                    cursor: Params?.cursor,
                    direction: Params?.direction || "desc",
                },
            });
            return res.data.data;
        },
        { enabled: !!id },
    );
};

export const useGetMatch = (id: string) => {
    return useQuery(
        ["getMatch", id],
        async () => {
            const res = await axios.get(urls.getMatchUrl(id));
            return res.data.data;
        },
        { enabled: !!id },
    );
};
