import {Inter as FontSans} from "next/font/google"
import "./globals.css";
import {cn} from "@/lib/utils";
import {GlobalContext} from "@/components/GlobalContext";

const fontSans = FontSans({
    subsets: ["latin"],
    variable: "--font-sans",
})

export const metadata = {
    title: "Jobs Interview",
    description: "This Web Application will help you to prepare for your next job interview",
};

export default function RootLayout({
                                       children,
                                   }) {
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
        </html>
    );
}
