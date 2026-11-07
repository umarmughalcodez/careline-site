import type { Metadata } from "next";
import TopBar from "@/components/TopBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CtaBanner from "@/components/CtaBanner";
import CoverageEstimator from "@/components/CoverageEstimator";

export const metadata: Metadata = {
  title: "Coverage Estimator | CareLine Medical Reception",
  description:
    "Estimate medical receptionist call coverage costs in PKR using your call volume, coverage period, and per-call rate.",
  alternates: {
    canonical: "/calculator",
  },
};

export default function CalculatorPage() {
  return (
    <>
      <TopBar />
      <Navbar />
      <main>
        <CoverageEstimator />
        <CtaBanner />
      </main>
      <Footer />
    </>
  );
}