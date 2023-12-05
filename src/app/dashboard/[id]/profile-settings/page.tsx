"use client";

import { MoveLeft, Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import { Resolver, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { Button } from "@/components/ui/button";
import AppInput from "@/components/ui/app-input";
import { editProfileSchema, updatePasswordSchema } from "@/schema";
import { EditProfileType, UpdatePasswordType } from "@/types/auth";
import { Form } from "@/components/ui/form";
import LoadingSpinner from "@/components/ui/spinner";
import ProtectedPage from "@/services/guard/ProtectedPage";
import { genderList } from "@/lib/dummyData";

const ProfileSettings = () => {
    const router = useRouter();
    const defaultValues = {
        firstName: "Gbenga",
        lastName: "Oyetade",
        middleName: "Pedro",
        gender: "Male",
        email: "chris@gmail.com",
        phone: "08123456789",
    };
    const profileFormHook = useForm<EditProfileType>({
        resolver: yupResolver(editProfileSchema),
        defaultValues: defaultValues,
    } as { resolver: Resolver<EditProfileType> });

    const passwordFormHook = useForm<UpdatePasswordType>({
        resolver: yupResolver(updatePasswordSchema),
    } as { resolver: Resolver<UpdatePasswordType> });

    const { handleSubmit, control, reset } = profileFormHook;

    const { handleSubmit: passSubmit, control: passControl, reset: passReset } = passwordFormHook;

    const profileSubmit = (data: EditProfileType) => {
        if (!data) return;

        Object.keys(data).forEach((key: string) => {
            if (!data[key as keyof EditProfileType]) {
                delete data[key as keyof EditProfileType];
            }
        });

        reset();
    };

    const passwordSubmit = (data: UpdatePasswordType) => {
        passReset();
    };

    return (
        <main>
            <button
                className="flex items-center gap-6 text-xl font-bold -mt-4 mb-8"
                onClick={() => router.back()}
            >
                <MoveLeft />
                Profile
            </button>

            <section className="bg-white py-3 sm:py-6 px-4 md:px-12 rounded-2xl shadow-lg w-[90%] mx-auto max-w-[60rem] space-y-12">
                <div></div>
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
                            <AppInput label="Email" type="email" control={control} name="email" />
                        </div>

                        <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-12">
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

                            <AppInput
                                label="Phone Number"
                                type="tel"
                                control={control}
                                name="phone"
                            />
                        </div>
                        <div className="flex justify-end w-full">
                            <Button type="submit" size={"formMd"} className="w-[9rem]">
                                {false ? (
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
                                label="Current password"
                                type="password"
                                control={passControl}
                                name="currentPassword"
                                placeholder="********"
                            />
                            <AppInput
                                label="New Password"
                                type="password"
                                control={passControl}
                                name="newPassword"
                                placeholder="********"
                            />
                        </div>
                        <div className="flex justify-end w-full">
                            <Button type="submit" size={"formMd"} className="w-[10rem]">
                                {false ? (
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
    );
};

export default ProtectedPage(ProfileSettings);
