"use client";

import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { cn } from "@/lib/utils";

const colors = [
    {
        color: "rgb(26, 194, 125)",
        bg: "rgb(26, 194, 125, 0.3)",
    },
    {
        color: "rgb(162, 173, 6)",
        bg: "rgba(245, 255, 99, 0.2)",
    },
    {
        color: "rgb(230, 66, 208)",
        bg: "rgba(230, 66, 208, 0.30)",
    },
    {
        color: "rgb(255, 99, 99)",
        bg: "rgba(255, 99, 99, 0.30)",
    },
    {
        color: "rgb(38, 177, 202)",
        bg: "rgba(99, 232, 255, 0.30)",
    },
    {
        color: "rgb(84, 112, 255)",
        bg: "rgba(84, 112, 255, 0.30)",
    },
];

const getRandomColor = () => {
    return colors[Math.floor(Math.random() * colors.length)];
};

const Avatar = React.forwardRef<
    React.ElementRef<typeof AvatarPrimitive.Root>,
    React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>
>(({ className, ...props }, ref) => (
    <AvatarPrimitive.Root
        ref={ref}
        className={cn("relative flex h-20 w-20 shrink-0 overflow-hidden rounded-full", className)}
        {...props}
    />
));
Avatar.displayName = AvatarPrimitive.Root.displayName;

const AvatarImage = React.forwardRef<
    React.ElementRef<typeof AvatarPrimitive.Image>,
    React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
    <AvatarPrimitive.Image
        ref={ref}
        className={cn("aspect-square h-full w-full", className)}
        {...props}
    />
));
AvatarImage.displayName = AvatarPrimitive.Image.displayName;

const AvatarFallback = React.forwardRef<
    React.ElementRef<typeof AvatarPrimitive.Fallback>,
    React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => {
    const randomColor = getRandomColor();

    return (
        <AvatarPrimitive.Fallback
            ref={ref}
            style={{
                backgroundColor: randomColor.bg,
                color: randomColor.color,
            }}
            className={cn("flex h-full w-full items-center justify-center rounded-full", className)}
            {...props}
        />
    );
});

AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;

export { Avatar, AvatarImage, AvatarFallback };
