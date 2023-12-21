"use client";

import React, { InputHTMLAttributes, useState } from "react";
import { FieldValues, FieldPath } from "react-hook-form";
import PhoneInput from "react-phone-number-input";

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "../input";
import InputEyeIcon from "../../../../public/icons/input-eye-icon";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import "react-phone-number-input/style.css";

interface AppInputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    type: string;
    control: any;
    name: FieldPath<FieldValues>;
    placeholder?: string;
    isRequired?: boolean;
    isSelect?: boolean;
    options?: OptionType[];
    isPhone?: boolean;
}

interface OptionType {
    value: string;
    label: string;
}

function AppInput({
    label,
    type,
    control,
    name,
    placeholder,
    isRequired,
    isSelect,
    options,
    isPhone,
    ...inputProps
}: AppInputProps) {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    return (
        <>
            <FormField
                control={control}
                name={name}
                render={({ field }) => (
                    <FormItem className="mb-6 w-full">
                        {label && (
                            <FormLabel>
                                {label}{" "}
                                {isRequired && <span className="text-destructive text-sm">*</span>}
                            </FormLabel>
                        )}

                        <FormControl>
                            {isSelect ? (
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <SelectTrigger>
                                        <SelectValue placeholder={placeholder} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>{label}</SelectLabel>
                                            {options?.map((option) => (
                                                <SelectItem
                                                    key={option.value}
                                                    value={option.value}
                                                    style={{ cursor: "pointer" }}
                                                >
                                                    {option.label}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            ) : isPhone ? (
                                <PhoneInput
                                    placeholder="Enter phone number"
                                    value={field.value}
                                    onChange={field.onChange}
                                    defaultCountry="NG"
                                    type="tel"
                                />
                            ) : (
                                <div className="relative">
                                    <Input
                                        type={showPassword && type === "password" ? "text" : type}
                                        placeholder={placeholder}
                                        {...field}
                                        {...inputProps}
                                    />

                                    {type === "password" && (
                                        <div className="absolute pr-3 top-2 right-0 flex items-center">
                                            <InputEyeIcon
                                                onClick={togglePasswordVisibility}
                                                fill={showPassword ? "#5d9c59" : "none"}
                                            />
                                        </div>
                                    )}
                                </div>
                            )}
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </>
    );
}

export default AppInput;
