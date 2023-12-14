import { useQuery } from "@tanstack/react-query";
import axios from "@/services/axios";
import { urls } from "../urls";
import { GroupTypes } from "@/types/groups";

export const useGetAllGroups = () => {
    return useQuery(["getAllGroups"], async () => {
        const res = await axios.get(urls.getAllGroupsUrl);
        return res.data.data as GroupTypes[];
    });
};
export const useGetOwnGroups = () => {
    return useQuery(["getOwnGroups"], async () => {
        const res = await axios.get(urls.getOwnGroupsUrl);
        return res.data.data;
    });
};

export const useGetGroupById = (id: string) => {
    return useQuery(["getGroupById", id], async () => {
        const res = await axios.get(urls.getGroupByIdUrl(id));
        return res.data.data;
    });
};
