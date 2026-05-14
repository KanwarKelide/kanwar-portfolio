import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Syne, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/ui/SmoothScroll";

const display = Syne({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700", "800"],
});

const body = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Kanwar Kelide — AI Product Engineer",
  description:
    "AI Product Engineer & Co-founder at CodeClowns. Building production AI systems — RAG pipelines, LLM integrations, full-stack SaaS.",
  openGraph: {
    title: "Kanwar Kelide — AI Product Engineer",
    description:
      "Building AI products that ship. 5+ years in healthcare, fintech, and manufacturing.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
