import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import { Toaster } from "react-hot-toast";

import { GoogleAuthProvider } from "@/components/ui/shared/google-oauth-provider";
import { ReactQueryProvider } from "@/components/ui/shared/react-query-provider";
import "./globals.css";

const openSans = Open_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Surprise Santa",
    description: "A surpise santa app for your friends and colleagues",
    alternates: {
        canonical: "https://www.surprisesanta.org/",
        languages: {
            "en-US": "/en-US",
        },
    },
    verification: {
        google: "2T_R5GhrkpqOkgC3cktqb9aWhJ6umlykENu1PvR6ti4",
    },
    other: {
        "theme-color": "#5D9C59",
        "og:type": "website",
        "og:description": "A surpise santa app for your friends and colleagues",
        "og:locale": "en_US",
    },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={openSans.className}>
                <Toaster
                    position="top-right"
                    toastOptions={{
                        success: {
                            style: {
                                background: "green",
                                color: "white",
                            },
                        },
                        error: {
                            style: {
                                background: "#ab0000",
                                color: "white",
                            },
                        },
                    }}
                />
                <GoogleAuthProvider>
                    <ReactQueryProvider>{children}</ReactQueryProvider>
                </GoogleAuthProvider>
            </body>
        </html>
    );
}
