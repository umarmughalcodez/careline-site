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
import styles from "./page.module.css";

export default function Home() {
  return (
    <>
      <TopBar />
      <Navbar />
      <main id="main-content">
        <Reveal as="div">
          <Hero />
        </Reveal>
        <section className={styles.marqueeSection} aria-label="CareLine patient-first promise">
          <CurvedLoop
            marqueeText="EVERY CALL MATTERS ✦ EVERY PATIENT COUNTS ✦ RECEPTION SUPPORT THAT CARES ✦ CARELINE MEDICAL RECEPTION ✦"
            speed={1.5}
            curveAmount={30}
            direction="left"
            interactive
            pauseOnHover={false}
          />
        </section>
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
