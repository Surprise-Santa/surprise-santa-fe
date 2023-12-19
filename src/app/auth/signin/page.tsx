"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Resolver, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import { useGoogleLogin } from "@react-oauth/google";
import { useRouter } from "next/navigation";

import { Form } from "@/components/ui/form";
import AuthNavbar from "@/components/ui/shared/auth-navbar";
import { signInSchema } from "@/schema";
import { Button } from "@/components/ui/button";
import { SignInType } from "@/types/auth";
import GoogleIcon from "../../../../public/icons/google-icon";
import AppInput from "@/components/ui/app-input";
import { useSigninMutation, useSignInWithGoogleMutation } from "@/services/mutations/auth.mutation";
import LoadingSpinner from "@/components/ui/spinner";
import ProtectedPage from "@/services/guard/ProtectedPage";

function SignIn() {
    const { mutateAsync: signin, isError } = useSigninMutation();
    const [googleAuthToken, setGoogleAuthToken] = useState<string | null>(null);
    const {
        mutateAsync: signInWithGoogle,
        isLoading: googleLoginLoading,
        isError: googleLoginError,
    } = useSignInWithGoogleMutation(googleAuthToken as string);
    const router = useRouter();

    const formHook = useForm<SignInType>({
        resolver: yupResolver(signInSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    } as { resolver: Resolver<SignInType> });
    const {
        handleSubmit,
        control,
        formState: { isSubmitting },
    } = formHook;

    const handleSignIn = async (result: any) => {
        try {
            if (!result) return;

            const userId = result?.data?.data?.user?.id;
            const groupCode = sessionStorage.getItem("groupCode");

            if (result.status === 200 || result.status === 201) {
                toast.success("Sign In Successful!" || result.data.message);
                sessionStorage.setItem("user", JSON.stringify(result.data.data));

                if (sessionStorage.getItem("groupCode")) {
                    return router.push(`/dashboard/${userId}/groups/${groupCode}`);
                } else {
                    return router.push(`/dashboard/${userId}`);
                }

            }
        } catch (error: any) {
            toast.error(error?.response?.data?.message || "An error occurred");
            throw new Error(error);
        }
    };

    const googleLoginHandler = useGoogleLogin({
        onSuccess: (tokenResponse: any) => setGoogleAuthToken(tokenResponse?.access_token),
    });

    const submitGoogleSignin = async () => {
        if (!googleAuthToken) return;

        const result = await signInWithGoogle({
            accessToken: googleAuthToken,
        });

        handleSignIn(result);
    };
    useEffect(() => {
        submitGoogleSignin();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [googleAuthToken]);

    const submit = async (data: any) => {
        const result = await signin(data);

        handleSignIn(result);
    };

    return (
        <div className="min-h-screen bg-secondary-gray">
            <AuthNavbar isSignInPage />

            <div className="w-full min-h-[80vh] flex justify-center items-center">
                <Form {...formHook}>
                    <form
                        onSubmit={handleSubmit(submit)}
                        className="bg-white my-6 py-6 sm:py-12 px-8 sm:px-16 md:px-24 rounded-2xl shadow-lg w-[95%] max-w-[600px] mx-auto"
                    >
                        <h4 className="text-[31px] font-bold text-center mb-4">Welcome Back</h4>


                        <p className="text-center mb-8">Login into your account below</p>

                        <div
                            className={`mb-8 flex items-center justify-center rounded-lg shadow-md py-4 px-4 cursor-pointer ${
                                googleLoginLoading &&
                                !googleLoginError &&
                                "bg-gray-300 cursor-not-allowed opacity-50"
                            }`}
                            style={{
                                pointerEvents:
                                    googleLoginLoading && !googleLoginError ? "none" : "auto",
                            }}
                            onClick={() => googleLoginHandler()}
                        >
                            {googleLoginLoading && !googleLoginError ? (
                                <LoadingSpinner />
                            ) : (
                                <>
                                    <GoogleIcon />
                                    <p className="ml-4">Continue with Google</p>
                                </>
                            )}
                        </div>

                        <div className="mb-4">
                            <AppInput
                                label="Email"
                                type="email"
                                control={control}
                                name="email"
                                placeholder="Kindly Enter your email"
                                isRequired
                            />

                            <AppInput
                                label="Password"
                                type="password"
                                control={control}
                                name="password"
                                placeholder="********"
                                isRequired
                            />
                        </div>

                        <Button type="submit" disabled={isSubmitting && !isError} size={"formLg"}>
                            {isSubmitting && !isError ? <LoadingSpinner /> : "Log In"}
                        </Button>

                        <p className="text-right mt-4">
                            <Link href="/auth/forgot-password">Forgot Password?</Link>
                        </p>
                    </form>
                </Form>
            </div>
        </div>
    );
}

export default ProtectedPage(SignIn);
