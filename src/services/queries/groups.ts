import { useQuery } from "@tanstack/react-query";
import axios from "@/services/axios";
import { urls } from "../urls";
import { GroupTypes } from "@/types/groups";
import { DataType, QueryParamsType } from "@/types";

export const useGetAllGroups = () => {
    return useQuery(["getAllGroups"], async () => {
        const res = await axios.get(urls.getAllGroupsUrl);
        return res.data.data;
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

export const useGetGroupMembers = <T>(id: string, Params?: QueryParamsType) => {
    return useQuery(
        ["getGroupMembers", Params],
        async () => {
            const res = await axios.get(urls.getGroupMembersrUrl(id), {
                params: {
                    term: Params?.term || null,
                    size: Params?.size || 10,
                    cursor: Params?.cursor,
                    direction: Params?.direction || "desc",
                },
            });
            return res.data.data as DataType<T>;
        },
        { enabled: !!id },
    );
};

export const useGetGroupMemberDetails = (id: string) => {
    return useQuery(["getGroupMemberDetails", id], async () => {
        const res = await axios.get(urls.getGroupMemberDetailsrUrl(id));
        return res.data.data;
    });
};
export const useGetGroupCodeDetails = (groupCode: string) => {
    return useQuery(
        ["getGroupCodeDetails", groupCode],
        async () => {
            const res = await axios.get(urls.getGroupCodeDetails(groupCode));
            return res.data.data;
        },
        { enabled: !!groupCode },
    );
};
