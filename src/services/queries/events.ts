import { useQuery } from "@tanstack/react-query";
import axios from "@/services/axios";
import { urls } from "../urls";

export const useGetAllEvents = () => {
    return useQuery(["getAllEvents"], async () => {
        const res = await axios.get(urls.getAllEventsUrl);
        return res.data.data;
    });
};

export const useGetEventById = (id: string) => {
    return useQuery(["getEventById", id], async () => {
        const res = await axios.get(urls.getEventByIdUrl(id));
        return res.data.data.event;
    });
};
