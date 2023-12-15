import { useMutation } from "@tanstack/react-query";

import axios from "@/services/axios";
import { urls } from "../urls";
import { EditProfileType, UpdatePasswordType } from "@/types/settings";

export const useChangePasswordMutation = () => {
    return useMutation(["changePassword"], async (data: UpdatePasswordType) => {
        const res = await axios.patch(urls.changePasswordUrl, data);
        return res;
    });
};

export const useEditProfileMutation = () => {
    return useMutation(["editProfile"], async (data: EditProfileType) => {
        const res = await axios.patch(urls.editProfileUrl, data);
        return res;
    });
};
