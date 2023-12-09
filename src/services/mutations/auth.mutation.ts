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

export const useSignInWithGoogleMutation = (accessToken: string) =>
    useMutation(["googleLogin", accessToken], async (data: { accessToken: string }) => {
        const res = await axios.post(urls.googleLoginUrl, data);
        return res;
    });

export const useForgotPasswordMutation = () =>
    useMutation(["forgotPassword"], async (data: { email: string }) => {
        const res = await axios.post(urls.forgotPasswordUrl, data);
        return res;
    });

export const useResetPasswordMutation = (token: string) => {
    return useMutation(["resetPassword"], async (data: { newPassword: string }) => {
        const res = await axios.post(urls.resetPasswordUrl(token), data);
        return res;
    });
};
