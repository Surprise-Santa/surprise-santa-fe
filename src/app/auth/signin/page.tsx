"use client";

import React, { useState } from "react";
import Link from "next/link";
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
import { signInSchema } from "@/schema";
import { Input } from "@/components/ui/input";
import InputEyeIcon from "../../../../public/icons/input-eye-icon";
import { Button } from "@/components/ui/button";
import { SignInFormValues } from "@/types";
import GoogleIcon from "../../../../public/icons/google-icon";

function SignIn() {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const formHook = useForm<SignInFormValues>({
        resolver: yupResolver(signInSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    } as { resolver: Resolver<SignInFormValues> });
    const {
        handleSubmit,
        control,
        formState: { isSubmitting },
    } = formHook;

    const submit = async (values: any) => {};

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
                            <FormField
                                control={control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem className="mb-6">
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

                            <FormField
                                control={control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel> Password</FormLabel>
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

                        <p className="text-right mt-4">
                            <Link href="/auth/forgot-password">Forgot Password?</Link>
                        </p>
                    </form>
                </Form>
            </div>
        </div>
    );
}

export default SignIn;
