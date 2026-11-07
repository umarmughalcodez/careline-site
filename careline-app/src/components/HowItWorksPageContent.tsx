import Link from "next/link";
import { ArrowRight, Check, Clock3, Workflow, Clock4, ClipboardCheck } from "lucide-react";
import DiscoveryScheduler from "@/components/contact/DiscoveryScheduler";
import { ReceptionIllustration } from "@/components/WhyCarelinePage";
import HowTimeline from "@/components/HowTimeline";
import styles from "./HowItWorksPageContent.module.css";

const benefits = [
  {
    title: "Your Workflow",
    description: "Support follows the call and scheduling procedures your clinic approves.",
    icon: Workflow,
    tone: "blue",
  },
  {
    title: "Flexible Coverage",
    description: "Discuss coverage hours and responsibilities around your clinic's workload.",
    icon: Clock4,
    tone: "teal",
  },
  {
    title: "Clear Procedures",
    description: "Agree on call handling, escalation, and authorized access before getting started.",
    icon: ClipboardCheck,
    tone: "amber",
  },
];

const checklist = [
  "Basic clinic information",
  "Preferred coverage hours",
  "Call and scheduling instructions",
  "Approved escalation contacts",
  "Clinic greetings and common questions",
  "Software and authorized access requirements",
];

function SectionHeading({
  id,
  kicker,
  title,
  description,
}: {
  id: string;
  kicker: string;
  title: string;
  description?: string;
}) {
  return (
    <header className={styles.sectionHeading}>
      <span className={styles.kicker}>{kicker}</span>
      <h2 id={id}>{title}</h2>
      {description ? <p>{description}</p> : null}
    </header>
  );
}

export default function HowItWorksPageContent() {
  return (
    <main className={styles.page}>
      <section className={styles.hero} aria-labelledby="how-title">
        <div className={`container ${styles.heroGrid}`}>
          <div className={styles.heroCopy}>
            <span className={styles.heroKicker}><span /> How it works</span>
            <h1 id="how-title">Getting Started With CareLine Is Simple.</h1>
            <p>
              We learn how your clinic communicates, agree on the workflows, then prepare for coverage with minimal disruption to your team.
            </p>
            <div className={styles.heroActions}>
              <a className="btn" href="#discovery">
                Book a discovery call <ArrowRight size={16} aria-hidden="true" />
              </a>
              <Link className="btn secondary" href="/services">Explore our services</Link>
            </div>
          </div>
          <div className={styles.heroIllustration}>
            <ReceptionIllustration />
          </div>
        </div>
      </section>

      <HowTimeline />

      <section className={styles.benefitSection} aria-labelledby="benefits-title">
        <div className="container">
          <SectionHeading
            id="benefits-title"
            kicker="Built around your practice"
            title="A Clearer Way to Share the Front-Desk Load."
          />
          <div className={styles.benefitGrid}>
            {benefits.map(({ title, description, icon: Icon, tone }) => (
              <article className={styles.benefitCard} key={title}>
                <span className={`${styles.benefitIcon} ${styles[tone]}`}><Icon size={21} aria-hidden="true" /></span>
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.checklistSection} aria-labelledby="checklist-title">
        <div className={`container ${styles.checklistLayout}`}>
          <SectionHeading
            id="checklist-title"
            kicker="What you need to get started"
            title="A Few Details Help Us Prepare."
            description="Bring what you have. We can clarify the rest together."
          />
          <ul className={styles.checklist}>
            {checklist.map((item) => (
              <li key={item}><span><Check size={15} aria-hidden="true" /></span>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className={styles.finalCta} id="discovery" aria-labelledby="final-cta-title">
        <div className={`container ${styles.finalCtaGrid}`}>
          <div className={styles.finalCtaCopy}>
            <span className={styles.finalKicker}>Ready to get started?</span>
            <h2 id="final-cta-title">Your Next Step Is One Conversation Away.</h2>
            <p>Let&apos;s discuss your clinic&apos;s needs and the support that could fit your existing operations.</p>
            <div className={styles.callNote}><Clock3 size={16} aria-hidden="true" /> Choose a time for a short introductory call.</div>
          </div>
          <div className={styles.schedulerPanel}>
            <DiscoveryScheduler />
          </div>
        </div>
      </section>
    </main>
  );
}