import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";

import { GoogleAuthProvider } from "@/components/ui/shared/google-oauth-provider";
import { ReactQueryProvider } from "@/components/ui/shared/react-query-provider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Secret Santa",
    description: "A secret santa app for your family and friends",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={inter.className}>
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
