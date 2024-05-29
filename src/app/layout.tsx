import type {Metadata} from "next";
import {Inter as FontSans} from "next/font/google"
import "./globals.css";
import {cn} from "@/lib/utils";
import {ReactNode} from "react";
import {GlobalContext} from "@/components/GlobalContext";
import Script from "next/script";

const fontSans = FontSans({
    subsets: ["latin"],
    variable: "--font-sans",
})

export const metadata: Metadata = {
    title: "Jobs Interview",
    description: "This WebAp will help you to prepare for your next job interview",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: ReactNode;
}>) {
    return (
        <html lang="fr" suppressHydrationWarning>
        <body className={cn(
            "min-h-screen bg-background font-sans antialiased",
            fontSans.variable
        )}>
        <GlobalContext>
            {children}
        </GlobalContext>
        </body>
        <Script
            defer
            src="https://cloud.umami.is/script.js"
            data-website-id="7700196b-0e3a-4442-9c8e-39ae9d64dfe4"
        />
        </html>
    );
}
