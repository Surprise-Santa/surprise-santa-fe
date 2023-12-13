"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";

import { Form } from "@/components/ui/form";
import AuthNavbar from "@/components/ui/shared/auth-navbar";
import { forgotPasswordSchema } from "@/schema";
import { Button } from "@/components/ui/button";
import AppInput from "@/components/ui/app-input";
import { useForgotPasswordMutation } from "@/services/mutations/auth.mutation";
import LoadingSpinner from "@/components/ui/spinner";

function ForgotPassword() {
    const { mutateAsync: forgotPassword, isError } = useForgotPasswordMutation();

    const formHook = useForm({
        resolver: yupResolver(forgotPasswordSchema),
        defaultValues: {
            email: "",
        },
    });

    const {
        handleSubmit,
        control,
        reset,
        formState: { isSubmitting },
    } = formHook;

    const submit = async (values: { email: string }) => {
        const result = await forgotPassword(values);

        try {
            if (!result) return;

            if (result.status === 200 || result.status === 201) {
                reset();
                toast.success(
                    "Please check your email for further instructions on resetting your password." ||
                        result.data.message,
                    {
                        duration: 10000,
                    },
                );
            }
        } catch (error: any) {
            toast.error(error?.response?.data?.message || "An error occurred");
            throw new Error(error);
        }
    };

    return (
        <div className="min-h-screen bg-secondary-gray">
            <AuthNavbar isResetPasswordPage />

            <div className="w-full min-h-[80vh] flex justify-center items-center">
                <Form {...formHook}>
                    <form
                        onSubmit={handleSubmit(submit)}
                        className="bg-white py-6 sm:py-12 px-8 sm:px-24 rounded-2xl shadow-lg w-[320px] sm:w-[600px] mx-auto"
                    >
                        <h4 className="text-[31px] font-bold text-center mb-4">Reset Password</h4>

                        <p className="text-center mb-8">Request an email reset link</p>

                        <div className="mb-4">
                            <AppInput
                                label="Email"
                                type="email"
                                control={control}
                                name="email"
                                placeholder="Kindly Enter your email"
                                isRequired
                            />
                        </div>

                        <Button type="submit" disabled={isSubmitting && !isError} size={"formLg"}>
                            {isSubmitting && !isError ? <LoadingSpinner /> : "Request Link"}
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    );
}

export default ForgotPassword;
