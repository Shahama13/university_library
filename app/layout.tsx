import type { Metadata } from "next";
import { Geist, Geist_Mono, Raleway } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toast";
import { SessionProvider } from "next-auth/react"
import { auth } from "@/auth";

const raleway = Raleway({ subsets: ['latin'], variable: '--font-sans' });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BookWise",
  description: "BookWise is a book borrowing university library management system ",
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const session = await auth()
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", geistSans.variable, geistMono.variable, "font-sans", raleway.variable)}
    >
      <SessionProvider session={session}>
        <body className="min-h-full flex flex-col">{children}</body>
        <Toaster />
      </SessionProvider>
    </html>
  );
}
