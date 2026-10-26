import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Baloo_2, Nunito } from "next/font/google";
import { BeachFooter } from "@/components/ui";
import "./globals.css";

const baloo = Baloo_2({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-baloo",
});

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
});

export const metadata: Metadata = {
  title: "Sunny Beach English",
  description: "Belajar bahasa Inggris kelas 2 SD lewat materi dan game bertema pantai.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#d6f1fb",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="id" className={`${baloo.variable} ${nunito.variable}`}>
      <body className="flex min-h-dvh flex-col">
        <main className="flex-1">{children}</main>
        <BeachFooter />
      </body>
    </html>
  );
}
