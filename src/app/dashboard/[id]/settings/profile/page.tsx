"use client";

import { useEffect, useState } from "react";
import { MoveLeft, Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import { Resolver, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import AppInput from "@/components/ui/app-input";
import { editProfileSchema, updatePasswordSchema } from "@/schema";
import { EditProfileType, UpdatePasswordType } from "@/types/settings";
import { Form } from "@/components/ui/form";
import LoadingSpinner from "@/components/ui/spinner";
import ProtectedPage from "@/services/guard/ProtectedPage";
import { genderList } from "@/lib/dummyData";
import {
    useChangePasswordMutation,
    useEditProfileMutation,
} from "@/services/mutations/settings.mutations";

const ProfileSettings = () => {
    const [isClient, setIsClient] = useState(false);

    let currentUser =
        typeof window !== "undefined" &&
        JSON.parse(window.sessionStorage.getItem("user") as string);

    const router = useRouter();
    const { mutateAsync: changePassword, isError: passError } = useChangePasswordMutation();
    const { mutateAsync: editProfile, isError: profileError } = useEditProfileMutation();

    const defaultValues = {
        firstName: currentUser?.user?.firstName || "",
        lastName: currentUser?.user?.lastName || "",
        middleName: currentUser?.user?.middleName || "",
        gender: currentUser?.user?.gender || "",
        phone: currentUser?.user?.phone || "",
    };
    const profileFormHook = useForm<EditProfileType>({
        resolver: yupResolver(editProfileSchema),
        defaultValues: defaultValues,
    } as { resolver: Resolver<EditProfileType> });

    const passwordFormHook = useForm<UpdatePasswordType>({
        resolver: yupResolver(updatePasswordSchema),
        defaultValues: {
            currentPassword: "",
            newPassword: "",
        },
    } as { resolver: Resolver<UpdatePasswordType> });

    const {
        handleSubmit,
        control,
        formState: { isSubmitting: isSubmittingProfile },
    } = profileFormHook;

    const {
        handleSubmit: passSubmit,
        control: passControl,
        reset: passReset,
        formState: { isSubmitting },
    } = passwordFormHook;

    const profileSubmit = async (data: EditProfileType) => {
        if (!data) return;

        Object.keys(data).forEach((key: string) => {
            if (!data[key as keyof EditProfileType]) {
                delete data[key as keyof EditProfileType];
            }
        });

        const result = await editProfile(data);

        try {
            if (!result) return;

            if (result.status === 200 || result.status === 201) {
                toast.success("Profile updated successfully!" || result.data.message);

                currentUser = {
                    token: currentUser?.token,
                    user: {
                        id: result?.data?.data?.id,
                        firstName: result?.data?.data?.firstName,
                        lastName: result?.data?.data?.lastName,
                        middleName: result?.data?.data?.middleName,
                        email: result?.data?.data?.email,
                        phone: result?.data?.data?.phone,
                        gender: result?.data?.data?.gender,
                        status: result?.data?.data?.status,
                        createdAt: result?.data?.data?.createdAt,
                        updatedAt: result?.data?.data?.updatedAt,
                        createdBy: result?.data?.data?.createdBy,
                        updatedBy: result?.data?.data?.updatedBy,
                        profileImgUrl: result?.data?.data?.profileImgUrl,
                    },
                };

                sessionStorage.setItem("user", JSON.stringify(currentUser));

                return;
            }
        } catch (error: any) {
            toast.error(error?.response?.data?.message || "An error occurred");
            throw new Error(error);
        }
    };

    const passwordSubmit = async (data: UpdatePasswordType) => {
        const result = await changePassword(data);

        try {
            if (!result) return;

            if (result.status === 200 || result.status === 201) {
                toast.success("Password changed successfully!" || result.data.message);
                passReset();
                return;
            }
        } catch (error: any) {
            toast.error(error?.response?.data?.message || "An error occurred");
            throw new Error(error);
        }
    };

    useEffect(() => {
        setIsClient(true);
    }, []);

    return (
        <>
            {isClient && (
                <main>
                    <button
                        className="flex items-center gap-6 text-xl font-bold -mt-4 mb-8"
                        onClick={() => router.back()}
                    >
                        <MoveLeft />
                        Profile
                    </button>

                    <section className="bg-white py-3 sm:py-6 px-4 md:px-12 rounded-2xl shadow-lg w-[90%] mx-auto max-w-[60rem] space-y-12">
                        <Form {...profileFormHook}>
                            <form onSubmit={handleSubmit(profileSubmit)}>
                                <div className="flex flex-col md:flex-row items-center justify-between md:gap-12">
                                    <AppInput
                                        label="First Name"
                                        type="text"
                                        control={control}
                                        name="firstName"
                                    />
                                    <AppInput
                                        label="Last Name"
                                        type="text"
                                        control={control}
                                        name="lastName"
                                    />
                                </div>

                                <div className="flex flex-col md:flex-row items-center justify-between md:gap-12">
                                    <AppInput
                                        label="Middle Name"
                                        type="text"
                                        control={control}
                                        name="middleName"
                                    />
                                    <AppInput
                                        label="Gender"
                                        type="text"
                                        control={control}
                                        name="gender"
                                        placeholder="Enter your gender"
                                        isSelect
                                        options={genderList}
                                    />
                                </div>

                                <div className="w-full md:w-1/2">
                                    <AppInput
                                        label="Phone Number"
                                        type="tel"
                                        control={control}
                                        name="phone"
                                    />
                                </div>
                                <div className="flex justify-end w-full">
                                    <Button
                                        type="submit"
                                        size={"formMd"}
                                        disabled={isSubmittingProfile && !profileError}
                                        className="w-[9rem]"
                                    >
                                        {isSubmittingProfile && !profileError ? (
                                            <LoadingSpinner />
                                        ) : (
                                            <span className="flex items-center gap-2 font-bold">
                                                Save Changes
                                                <Pencil size={16} />
                                            </span>
                                        )}
                                    </Button>
                                </div>
                            </form>
                        </Form>
                        <Form {...passwordFormHook}>
                            <form onSubmit={passSubmit(passwordSubmit)}>
                                <div className="flex flex-col md:flex-row items-center justify-between md:gap-12">
                                    <AppInput
                                        isRequired
                                        label="Current password"
                                        type="password"
                                        control={passControl}
                                        name="currentPassword"
                                        placeholder="********"
                                    />
                                    <AppInput
                                        isRequired
                                        label="New Password"
                                        type="password"
                                        control={passControl}
                                        name="newPassword"
                                        placeholder="********"
                                    />
                                </div>
                                <div className="flex justify-end w-full">
                                    <Button
                                        type="submit"
                                        size={"formMd"}
                                        disabled={isSubmitting && !passError}
                                        className="w-[10rem]"
                                    >
                                        {isSubmitting && !passError ? (
                                            <LoadingSpinner />
                                        ) : (
                                            <span className="flex items-center gap-2 font-bold">
                                                Update Password
                                                <Pencil size={16} />
                                            </span>
                                        )}
                                    </Button>
                                </div>
                            </form>
                        </Form>
                    </section>
                </main>
            )}
        </>
    );
};

export default ProtectedPage(ProfileSettings);
