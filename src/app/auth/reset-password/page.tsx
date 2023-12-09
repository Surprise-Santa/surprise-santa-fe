"use client";

import React from "react";
import { Resolver, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import { Form } from "@/components/ui/form";
import AuthNavbar from "@/components/ui/shared/auth-navbar";
import { resetPasswordSchema } from "@/schema";
import { Button } from "@/components/ui/button";
import { ResetPasswordType } from "@/types/auth";
import ProtectedPage from "@/services/guard/ProtectedPage";
import AppInput from "@/components/ui/app-input";
import { useResetPasswordMutation } from "@/services/mutations/auth.mutation";
import LoadingSpinner from "@/components/ui/spinner";

function ResetPassword() {
    const params = useSearchParams();
    const token = params.get("token");
    const { mutateAsync: resetPassword, isError } = useResetPasswordMutation(token as string);
    const router = useRouter();

    const formHook = useForm<ResetPasswordType>({
        resolver: yupResolver(resetPasswordSchema),
        defaultValues: {
            password: "",
            confirmPassword: "",
        },
    } as { resolver: Resolver<ResetPasswordType> });
    const {
        handleSubmit,
        control,
        formState: { isSubmitting },
    } = formHook;

    const submit = async (values: ResetPasswordType) => {
        const { confirmPassword } = values;

        const result = await resetPassword({
            newPassword: confirmPassword,
        });

        try {
            if (!result) return;

            if (result.status === 200 || result.status === 201) {
                toast.success("Password reset successful!" || result.data.message);
                router.push("/auth/signin");
                return;
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

                        <p className="text-center mb-8">Create Your New Password</p>

                        <div className="mb-4">
                            <AppInput
                                label="New Password"
                                type="password"
                                control={control}
                                name="password"
                                placeholder="Enter new password"
                                isRequired
                            />

                            <AppInput
                                label="Confirm new Password"
                                type="password"
                                control={control}
                                name="confirmPassword"
                                placeholder="Confirm your new password"
                                isRequired
                            />
                        </div>

                        <Button type="submit" disabled={isSubmitting && !isError} size={"formLg"}>
                            {isSubmitting && !isError ? <LoadingSpinner /> : "Reset Password"}
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    );
}

export default ProtectedPage(ResetPassword);
