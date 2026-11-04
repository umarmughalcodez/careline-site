import TopBar from "@/components/TopBar";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import CoverageCalculator from "@/components/CoverageCalculator";
import WhyUs from "@/components/WhyUs";
import HowItWorks from "@/components/HowItWorks";
import CtaBanner from "@/components/CtaBanner";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import CurvedLoop from "@/components/HomepageLoop";

export default function Home() {
  return (
    <>
      <TopBar />
      <Navbar />
      <main id="main-content">
        <Reveal as="div">
          <Hero />
        </Reveal>
        {/* <CurvedLoop /> */}
        <Reveal as="div" delay={80}>
          <Services />
        </Reveal>
        <Reveal as="div" delay={120}>
          <CoverageCalculator />
        </Reveal>
        <Reveal as="div" delay={90}>
          <WhyUs />
        </Reveal>
        <Reveal as="div" delay={110}>
          <HowItWorks />
        </Reveal>
        <Reveal as="div" delay={70}>
          <CtaBanner />
        </Reveal>
        <Reveal as="div" delay={100}>
          <ContactSection />
        </Reveal>
      </main>
      <Footer />
    </>
  );
}
