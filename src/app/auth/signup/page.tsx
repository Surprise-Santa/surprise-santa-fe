"use client";

import React, { useState } from "react";
import Link from "next/link";

import AuthNavbar from "@/components/ui/shared/auth-navbar";
import { Resolver, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signUpSchema } from "@/schema";
import { Input } from "@/components/ui/input";
import InputEyeIcon from "../../../../public/icons/input-eye-icon";
import { Button } from "@/components/ui/button";
import { SignUpFormValues } from "@/types";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

function SignUp() {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const formHook = useForm<SignUpFormValues>({
        resolver: yupResolver(signUpSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            middleName: "",
            gender: "",
            email: "",
            phoneNumber: "",
            password: "",
            confirmPassword: "",
        },
    } as { resolver: Resolver<SignUpFormValues> });
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
            <AuthNavbar isSignUpPage />

            <div className="w-full py-8 min-h-[90vh] flex justify-center items-center">
                <Form {...formHook}>
                    <form
                        onSubmit={handleSubmit(submit)}
                        className="bg-white py-3 sm:py-6 px-4 md:px-12 rounded-2xl shadow-lg w-[320px] sm:w-[574px] md:w-[600px] lg:w-[772px] md:mx-auto"
                    >
                        <h4 className="text-[31px] font-bold mb-4">Get Started</h4>

                        <p className="mb-8">
                            Welcome to Secret Santa - let&apos;s create your account
                        </p>

                        <div className="mb-2 flex flex-col md:flex-row items-center justify-between gap-4">
                            <FormField
                                control={control}
                                name="firstName"
                                render={({ field }) => (
                                    <FormItem className="mb-6 w-full">
                                        <FormLabel>First Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Kindly Enter your firstName"
                                                type="text"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={control}
                                name="lastName"
                                render={({ field }) => (
                                    <FormItem className="mb-6 w-full">
                                        <FormLabel>Last Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Kindly Enter your lastName"
                                                type="text"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="mb-2 flex flex-col md:flex-row items-center justify-between gap-4">
                            <FormField
                                control={control}
                                name="middleName"
                                render={({ field }) => (
                                    <FormItem className="mb-6 w-full">
                                        <FormLabel>Middle Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Kindly Enter your middleName"
                                                type="text"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={control}
                                name="gender"
                                render={({ field }) => (
                                    <FormItem className="mb-6 w-full">
                                        <FormLabel>Gender</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Kindly Enter your gender"
                                                type="text"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="mb-2 flex flex-col md:flex-row items-center justify-between gap-4">
                            <FormField
                                control={control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem className="mb-6 w-full">
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
                                name="phoneNumber"
                                render={({ field }) => (
                                    <FormItem className="mb-6 w-full">
                                        <FormLabel>Phone Number</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Kindly Enter your Phone Number"
                                                type="text"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="mb-2 flex flex-col md:flex-row items-center justify-between gap-4">
                            <FormField
                                control={control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem className="mb-6 w-full">
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
                                    <FormItem className="mb-6 w-full">
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

                        <div className="flex items-center space-x-1 mb-6 gap-2 text-xs">
                            <Checkbox id="terms" />
                            <label htmlFor="terms">
                                By clicking this box, I agree and acknowledge to the terms of{" "}
                                <Link href={"/"} className="text-primary-green">
                                    SecretSanta Platform agreement.
                                </Link>
                            </label>
                        </div>

                        <div className="flex justify-center w-full">
                            <Button type="submit" disabled={isSubmitting} size={"formMd"}>
                                {isSubmitting ? "Signin Up..." : "Sign Up"}
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    );
}

export default SignUp;
