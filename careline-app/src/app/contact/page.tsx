import type { Metadata } from "next";
import TopBar from "@/components/TopBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactPageContent from "@/components/contact/ContactPageContent";

export const metadata: Metadata = {
  title: "Contact | CareLine Medical Reception",
  description:
    "Contact CareLine Medical Reception to discuss clinic call coverage, overflow support, and scheduling help for independent medical practices.",
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactPage() {
  return (
    <>
      <TopBar />
      <Navbar />
      <ContactPageContent />
      <Footer />
    </>
  );
}
