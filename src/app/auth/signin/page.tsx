"use client";

import React from "react";
import Link from "next/link";
import { Resolver, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";

import { useRouter } from "next/navigation";
import { Form } from "@/components/ui/form";
import AuthNavbar from "@/components/ui/shared/auth-navbar";
import { signInSchema } from "@/schema";
import { Button } from "@/components/ui/button";
import { SignInType } from "@/types/auth";
import GoogleIcon from "../../../../public/icons/google-icon";
import AppInput from "@/components/ui/app-input";
import { useSigninMutation } from "@/services/mutations/auth.mutation";
import LoadingSpinner from "@/components/ui/spinner";
import ProtectedPage from "@/services/guard/ProtectedPage";

function SignIn() {
    const { mutateAsync: signin, isError } = useSigninMutation();
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

    const userId =
        typeof window !== "undefined" &&
        JSON.parse(window.sessionStorage.getItem("user") as string)?.user.id;

    const submit = async (data: any) => {
        const result = await signin(data);

        try {
            if (!result) return;

            if (result.status === 200 || result.status === 201) {
                toast.success("Sign In Successful!" || result.data.message);
                sessionStorage.setItem("user", JSON.stringify(result.data.data));

                return router.push(`/dashboard/${userId}`);
            }
        } catch (error: any) {
            toast.error(error?.response?.data?.message || "An error occurred");
            throw new Error(error);
        }
    };

    return (
        <div className="min-h-screen bg-secondary-gray">
            <AuthNavbar isSignInPage />

            <div className="w-full min-h-[80vh] flex justify-center items-center">
                <Form {...formHook}>
                    <form
                        onSubmit={handleSubmit(submit)}
                        className="bg-white py-6 sm:py-12 px-8 sm:px-24 rounded-2xl shadow-lg w-[320px] sm:w-[600px] mx-auto"
                    >
                        <h4 className="text-[31px] font-bold text-center mb-4">Welcome Back</h4>

                        <p className=" text-center mb-2">Glad to see you again</p>

                        <p className="text-center mb-8">Login into your account below</p>

                        <div className=" mb-8 flex items-center justify-center rounded-lg shadow-md py-4 px-4 cursor-pointer">
                            <GoogleIcon />
                            <p className="ml-4">Continue with Google</p>
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
                                placeholder="Enter your password"
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
