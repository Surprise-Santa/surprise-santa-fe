import { useQuery } from "@tanstack/react-query";
import axios from "@/services/axios";
import { urls } from "../urls";

export const useGetAllGroups = () => {
    return useQuery(["getAllGroups"], async () => {
        const res = await axios.get(urls.getAllGroupsUrl);
        return res.data.data;
    });
};
