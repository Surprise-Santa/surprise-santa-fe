import { useMutation } from "@tanstack/react-query";

import axios from "@/services/axios";
import { urls } from "../urls";
import { SignUpType } from "@/types/auth";

export const useSignupMutation = () =>
    useMutation(["signUp"], async (data: SignUpType) => {
        const res = await axios.post(urls.signUpUrl, data);
        return res;
    });
