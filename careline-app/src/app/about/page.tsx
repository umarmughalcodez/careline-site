import type { Metadata } from "next";
import TopBar from "@/components/TopBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhyCarelinePage from "@/components/WhyCarelinePage";

export const metadata: Metadata = {
  title: "Why CareLine | Medical Reception Support",
  description:
    "Learn how CareLine supports medical practice teams with flexible virtual reception, clinic-approved workflows, and consistent patient communication.",
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  return (
    <>
      <TopBar />
      <Navbar />
      <WhyCarelinePage />
      <Footer />
    </>
  );
}