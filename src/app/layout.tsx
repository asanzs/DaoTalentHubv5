import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains" });

export const metadata: Metadata = {
  title: "DAO Talent Hub - The Top 1% Global Tech Talent",
  description: "Hire vetted global talent with zero risk. Or get hired and keep 100% of your earnings.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={cn(inter.className, jetbrains.variable, "bg-[#0B0C10] text-white antialiased")}>
        {children}
      </body>
    </html>
  );
}
