import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import ToasterProvider from "../components/ToastProvider";
import "./globals.css";
import "lenis/dist/lenis.css";
import SmoothScroll from "../components/SmoothScroll";
import CursorFollower from "../components/CursorFollower";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "CareLine | Virtual Reception for Medical Practices",
  description:
    "Virtual receptionist support for independent medical practices: call answering, appointment scheduling, follow-ups and overflow coverage.",
  keywords: [
    "virtual medical receptionist",
    "clinic call answering",
    "medical practice scheduling",
    "patient follow up service",
    "doctor office overflow support",
    "HIPAA compliant receptionist",
  ],
  authors: [{ name: "CareLine Medical Reception" }],
  openGraph: {
    title: "CareLine | Virtual Reception for Medical Practices",
    description:
      "Virtual receptionist support for independent medical practices: call answering, appointment scheduling, follow-ups and overflow coverage.",
    url: "https://careline-reception.com",
    siteName: "CareLine Medical Reception",
    locale: "en_US",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#102a43",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body>
        <SmoothScroll >
        <CursorFollower />

        {children}
        <ToasterProvider />
        </SmoothScroll>
      </body>
    </html>
  );
}
