import type { Metadata } from "next";
import TopBar from "@/components/TopBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HowItWorksPageContent from "@/components/HowItWorksPageContent";

export const metadata: Metadata = {
  title: "How It Works | CareLine Medical Reception",
  description:
    "See how CareLine learns your clinic's needs, prepares agreed communication workflows, and provides virtual receptionist support.",
  alternates: {
    canonical: "/how",
  },
};

export default function HowPage() {
  return (
    <>
      <TopBar />
      <Navbar />
      <HowItWorksPageContent />
      <Footer />
    </>
  );
}