import type { Metadata } from "next";
import { DM_Sans, JetBrains_Mono, Geist } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const sans = DM_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const mono = JetBrains_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  weight: ["300"],
});

export const metadata: Metadata = {
  title: "Remora — Pay African Contractors in Minutes",
  description:
    "Stablecoin-powered payroll for US/EU businesses paying remote contractors in Africa. Save 80% on fees, deliver in under 1 hour.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${sans.variable} ${mono.variable} ${geist.variable} dark h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
