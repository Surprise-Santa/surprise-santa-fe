"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";

import AuthNavbar from "@/components/ui/shared/auth-navbar";
import { Resolver, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signUpSchema } from "@/schema";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Form } from "@/components/ui/form";
import AppInput from "@/components/ui/app-input";
import { SignUpType } from "@/types/auth";
import { useSignupMutation } from "@/services/mutations/auth.mutation";
import LoadingSpinner from "@/components/ui/spinner";
import ProtectedPage from "@/services/guard/ProtectedPage";
import { genderList } from "@/lib/dummyData";

function SignUp() {
    const [checked, setChecked] = useState(false);
    const { mutateAsync: signup, isError } = useSignupMutation();
    const router = useRouter();

    const formHook = useForm<SignUpType>({
        resolver: yupResolver(signUpSchema),
    } as { resolver: Resolver<SignUpType> });

    const {
        handleSubmit,
        control,
        formState: { isSubmitting },
    } = formHook;

    const submit = async (data: any) => {
        const { firstName, lastName, email, password, middleName, gender, phone } = data;
        const result = await signup({
            firstName,
            lastName,
            middleName,
            email,
            password,
            gender,
            phone,
        });

        try {
            if (!result) return;

            if (result.status === 200 || result.status === 201) {
                toast.success("Sign Up Successful!" || result.data.message);
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
                            <AppInput
                                label="First Name"
                                type="text"
                                control={control}
                                name="firstName"
                                placeholder="Enter your firstName"
                                isRequired
                            />

                            <AppInput
                                label="Last Name"
                                type="text"
                                control={control}
                                name="lastName"
                                placeholder="Enter your lastName"
                                isRequired
                            />
                        </div>

                        <div className="mb-2 flex flex-col md:flex-row items-center justify-between gap-4">
                            <AppInput
                                label="Middle Name"
                                type="text"
                                control={control}
                                name="middleName"
                                placeholder="Enter your middleName"
                            />

                            <AppInput
                                label="Gender"
                                type="text"
                                control={control}
                                name="gender"
                                placeholder="Enter your gender"
                                isRequired
                                isSelect
                                options={genderList}
                            />
                        </div>

                        <div className="mb-2 flex flex-col md:flex-row items-center justify-between gap-4">
                            <AppInput
                                label="Email"
                                type="email"
                                control={control}
                                name="email"
                                placeholder="Enter your email"
                                isRequired
                            />

                            <AppInput
                                label="Phone Number"
                                type="text"
                                control={control}
                                name="phone"
                                placeholder="Enter your phoneNumber"
                            />
                        </div>

                        <div className="mb-2 flex flex-col md:flex-row items-center justify-between gap-4">
                            <AppInput
                                label="New Password"
                                type="password"
                                control={control}
                                name="password"
                                placeholder="Enter your password"
                                isRequired
                            />

                            <AppInput
                                label="Confirm Password"
                                type="password"
                                control={control}
                                name="confirmPassword"
                                placeholder="Confirm your password"
                                isRequired
                            />
                        </div>

                        <div className="flex items-center space-x-1 mb-8 gap-2 text-xs">
                            <Checkbox
                                id="terms"
                                checked={checked}
                                onCheckedChange={setChecked as any}
                            />
                            <label htmlFor="terms">
                                By clicking this box, I agree and acknowledge to the terms of{" "}
                                <Link href={"/"} className="text-primary-green">
                                    SecretSanta Platform agreement.
                                </Link>
                            </label>
                        </div>

                        <div className="flex justify-center w-full">
                            <Button
                                type="submit"
                                disabled={(isSubmitting && !isError) || !checked}
                                size={"formMd"}
                            >
                                {isSubmitting && !isError ? <LoadingSpinner /> : "Sign Up"}
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    );
}

export default ProtectedPage(SignUp);
