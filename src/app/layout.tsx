import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import HomeFooter from "@/components/homePage/home-footer";
import Navbar from "@/components/homePage/navbar";
import { Suspense } from "react";

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
        className={`${inter.className} flex flex-col text-sm min-h-screen text-zinc-900 bg-[#E5E8EC]`}
      >
        <Navbar />
        <SessionProvider>
          <Suspense fallback={<p>Loading profile...</p>}>
            <main className="flex-1">{children}</main>
          </Suspense>
        </SessionProvider>
        <HomeFooter />
      </body>
    </html>
  );
}
