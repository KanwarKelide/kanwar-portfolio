import type { Metadata } from "next";
import type { ReactNode } from "react";
import { GeistSans } from "geist/font/sans";
import "./globals.css";
import SmoothScroll from "@/components/ui/SmoothScroll";

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

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={GeistSans.variable}>
      <head>
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=clash-display@400,500,600,700&display=swap"
        />
      </head>
      <body>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
