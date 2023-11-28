"use client";

import React, { useState } from "react";
import { Resolver, useForm } from "react-hook-form";
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
import { resetPasswordSchema } from "@/schema";
import { Input } from "@/components/ui/input";
import InputEyeIcon from "../../../../public/icons/input-eye-icon";
import { Button } from "@/components/ui/button";
import { ResetPasswordFormValues } from "@/types";

function ResetPassword() {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const formHook = useForm<ResetPasswordFormValues>({
        resolver: yupResolver(resetPasswordSchema),
        defaultValues: {
            password: "",
            confirmPassword: "",
        },
    } as { resolver: Resolver<ResetPasswordFormValues> });
    const {
        handleSubmit,
        control,
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

                        <p className="text-center mb-8">Create Your New Password</p>

                        <div className="mb-4">
                            <FormField
                                control={control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem className="mb-6">
                                        <FormLabel>New Password</FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <Input
                                                    placeholder="Enter new password"
                                                    type={showPassword ? "text" : "password"}
                                                    {...field}
                                                />
                                                <div className="absolute pr-3 top-2 right-0 flex items-center">
                                                    <InputEyeIcon
                                                        onClick={togglePasswordVisibility}
                                                        fill={showPassword ? "#5d9c59" : "none"}
                                                    />
                                                </div>
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={control}
                                name="confirmPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Confirm Password</FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <Input
                                                    placeholder="Confirm new password"
                                                    type={showPassword ? "text" : "password"}
                                                    {...field}
                                                />
                                                <div className="absolute pr-3 top-2 right-0 flex items-center">
                                                    <InputEyeIcon
                                                        onClick={togglePasswordVisibility}
                                                        fill={showPassword ? "#5d9c59" : "none"}
                                                    />
                                                </div>
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <Button type="submit" disabled={isSubmitting} size={"formLg"}>
                            {isSubmitting ? "Logging In..." : "Log In"}
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    );
}

export default ResetPassword;
