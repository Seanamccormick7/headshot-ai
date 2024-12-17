import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import HomeFooter from "@/components/homePage/home-footer";
import Navbar from "@/components/homePage/navBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Headshot-ai | Professional AI-Generated Headshots",
  description:
    "Get professional AI-generated headshots quickly and affordably with Headshot-ai.",
  keywords:
    "AI headshots, professional headshots, AI-generated images, affordable headshots",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} text-sm min-h-screen text-zinc-900 bg-[#E5E8EC]`}
      >
        <Navbar />
        <SessionProvider> {children}</SessionProvider>
        <HomeFooter />
      </body>
    </html>
  );
}
