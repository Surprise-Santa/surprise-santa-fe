import { useMutation } from "@tanstack/react-query";

import axios from "@/services/axios";
import { urls } from "../urls";
import { SignUpType, SignInType } from "@/types/auth";

export const useSignupMutation = () =>
    useMutation(["signUp"], async (data: SignUpType) => {
        const res = await axios.post(urls.signUpUrl, data);
        return res;
    });

export const useSigninMutation = () =>
    useMutation(["login"], async (data: SignInType) => {
        const res = await axios.post(urls.loginUrl, data);
        return res;
    });
