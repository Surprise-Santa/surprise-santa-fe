"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import AuthNavbar from "@/components/ui/shared/auth-navbar";
import { forgotPasswordSchema } from "@/schema";
import { Input } from "@/components/ui/input";
import InputEyeIcon from "../../../../public/icons/input-eye-icon";
import { Button } from "@/components/ui/button";

function ForgotPassword() {
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

    const submit = async (values: any) => {
        console.log(values);
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
                            <FormField
                                control={control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Kindly Enter your email"
                                                type="email"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <Button type="submit" disabled={isSubmitting} size={"formLg"}>
                            {isSubmitting ? "Requesting..." : "Request Link"}
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    );
}

export default ForgotPassword;
