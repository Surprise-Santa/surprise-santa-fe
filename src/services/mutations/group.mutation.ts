import axios from "@/services/axios";
import { GroupType, MemberType } from "@/types/groups";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { urls } from "../urls";

export const useCreateGroupMutation = () => {
    const queryClient = useQueryClient();

    return useMutation(
        ["createGroup"],
        async (data: GroupType) => {
            const res = await axios.post(urls.createGroupsUrl, data);
            return res;
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries(["getMyGroups"]);
            },
        },
    );
};

export const useInviteMembersMutation = (id: any) =>
    useMutation(["inviteMember"], async (data: any) => {
        const res = await axios.post(urls.inviteGroupMembesrUrl(id), data);
        return res;
    });
