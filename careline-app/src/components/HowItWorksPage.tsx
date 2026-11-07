import {
  ArrowDown,
  ArrowRight,
  BellRing,
  CalendarDays,
  Check,
  ChevronDown,
  ClipboardList,
  Clock3,
  Headset,
  LockKeyhole,
  MessageCircleMore,
  PhoneCall,
  Settings2,
  ShieldCheck,
  UsersRound,
} from "lucide-react";
import DiscoveryScheduler from "@/components/contact/DiscoveryScheduler";
import styles from "./HowItWorksPage.module.css";

const steps = [
  {
    title: "Book a Discovery Call",
    description: "We start with a conversation about your medical practice, current front-desk operations, and communication challenges.",
    listTitle: "What we discuss",
    points: [
      "Your clinic's size and specialty",
      "Incoming call volume",
      "Existing receptionist arrangements",
      "Preferred coverage hours",
      "Your current scheduling process",
    ],
    outcome: "A clear understanding of your requirements.",
    icon: MessageCircleMore,
  },
  {
    title: "Build Your Coverage Plan",
    description: "Based on your requirements, we prepare a suitable coverage arrangement for your practice to review.",
    listTitle: "What we determine",
    points: [
      "Weekly coverage hours",
      "Types of calls to handle",
      "Appointment responsibilities",
      "Follow-up requirements",
      "Pricing and service scope",
    ],
    outcome: "A clearly defined proposal tailored to your practice.",
    icon: ClipboardList,
  },
  {
    title: "Set Up Your Workflows",
    description: "We organize the communication procedures your virtual receptionist will follow, with your clinic defining the rules and boundaries.",
    listTitle: "What gets configured",
    points: [
      "Call-handling instructions and clinic greetings",
      "Appointment scheduling rules",
      "Escalation procedures and FAQs",
      "Authorized software access, where applicable",
    ],
    outcome: "A structured workflow aligned with your clinic's operations.",
    icon: Settings2,
  },
  {
    title: "Prepare and Train Your Reception Support",
    description: "Preparation is scoped to the agreed service. Where included, CareLine briefs the assigned team on your clinic's guidelines and responsibilities.",
    listTitle: "Preparation may include",
    points: [
      "Understanding your services",
      "Learning appointment procedures",
      "Reviewing approved scripts",
      "Practicing escalation scenarios",
      "Understanding communication boundaries",
    ],
    outcome: "A team prepared to follow your approved procedures.",
    icon: Headset,
  },
  {
    title: "Begin Your Coverage",
    description: "Once the workflows and arrangements are approved, virtual reception support begins according to the agreed schedule.",
    listTitle: "Daily responsibilities may include",
    points: [
      "Answering incoming calls",
      "Managing appointment requests and cancellations",
      "Coordinating callbacks",
      "Recording relevant call information",
      "Following escalation instructions",
    ],
    outcome: "Additional communication support integrated into your practice.",
    icon: PhoneCall,
  },
  {
    title: "Monitor, Review and Improve",
    description: "As part of the agreed arrangement, discuss how the workflow is working and whether your coverage needs have changed.",
    listTitle: "Ongoing activities may include",
    points: [
      "Reviewing communication performance",
      "Identifying recurring issues",
      "Discussing clinic feedback",
      "Updating approved procedures",
      "Adjusting coverage when requirements change",
    ],
    outcome: "Reception support that can evolve alongside your practice.",
    icon: BellRing,
  },
];

const integrationItems = [
  { title: "Patient Calls", detail: "Incoming and outbound communication", icon: PhoneCall, position: "patient" },
  { title: "Scheduling", detail: "Appointments and cancellations", icon: CalendarDays, position: "scheduling" },
  { title: "Follow-ups", detail: "Reminders and callbacks", icon: BellRing, position: "followups" },
  { title: "Clinic Systems", detail: "Approved scheduling and EHR access", icon: LockKeyhole, position: "systems" },
];

const gettingStarted = [
  "Basic clinic information",
  "Your preferred coverage hours",
  "Existing appointment scheduling procedures",
  "Call-handling instructions",
  "Approved escalation contacts",
  "Relevant software and authorized access arrangements",
];

const principles = [
  {
    title: "Clear communication",
    description: "Defined responsibilities and communication procedures.",
    icon: MessageCircleMore,
  },
  {
    title: "Flexible arrangements",
    description: "Coverage based on your actual operational requirements.",
    icon: Settings2,
  },
  {
    title: "Responsible access",
    description: "Permissions limited to approved responsibilities.",
    icon: ShieldCheck,
  },
  {
    title: "Continuous improvement",
    description: "Feedback and workflow reviews to improve the service.",
    icon: ArrowDown,
  },
];

const faqs = [
  {
    question: "How long does it take to get started?",
    answer: "The setup timeline depends on your clinic's requirements, workflow complexity, and access arrangements. We'll discuss an estimated start date during your discovery call.",
  },
  {
    question: "Do I need to replace my existing receptionist?",
    answer: "No. CareLine can supplement your existing team by handling agreed communication responsibilities.",
  },
  {
    question: "Can CareLine use our existing scheduling software?",
    answer: "We can discuss your current platform and assess whether the required workflow and authorized access are supported.",
  },
  {
    question: "Can I choose the hours of coverage?",
    answer: "Coverage arrangements can be discussed according to your clinic's requirements and available staffing.",
  },
  {
    question: "Can you handle appointment cancellations and rescheduling?",
    answer: "These tasks can be included in your agreed responsibilities and handled according to your clinic's scheduling policies.",
  },
  {
    question: "Will CareLine handle medical advice?",
    answer: "Reception support is administrative. Clinical questions and medical decisions should be directed to appropriately qualified clinic personnel.",
  },
  {
    question: "How do you handle sensitive patient information?",
    answer: "Access and information handling should follow agreed clinic procedures, authorized permissions, and applicable privacy requirements.",
  },
  {
    question: "Can I change my coverage arrangement?",
    answer: "You can discuss changes to your requirements with CareLine. Any changes depend on the agreed service arrangement.",
  },
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

function ProcessTimeline() {
  return (
    <div className={styles.timeline}>
      {steps.map(({ title, description, listTitle, points, outcome, icon: Icon }, index) => (
        <article className={styles.timelineStep} key={title}>
          <div className={styles.stepMarker} aria-hidden="true">
            <Icon size={20} />
          </div>
          <div className={styles.stepCard}>
            <div className={styles.stepMeta}>
              <span>Step {String(index + 1).padStart(2, "0")}</span>
              <Icon size={18} aria-hidden="true" />
            </div>
            <h3>{title}</h3>
            <p className={styles.stepDescription}>{description}</p>
            <h4>{listTitle}</h4>
            <ul className={styles.stepList}>
              {points.map((point) => <li key={point}>{point}</li>)}
            </ul>
            <p className={styles.outcome}><strong>Outcome:</strong> {outcome}</p>
          </div>
        </article>
      ))}
    </div>
  );
}

export default function HowItWorksPage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero} aria-labelledby="how-title">
        <div className={`container ${styles.heroInner}`}>
          <div className={styles.heroCopy}>
            <span className={styles.heroKicker}><span /> How it works</span>
            <h1 id="how-title">Getting Started With CareLine Is Simple.</h1>
            <p>
              From understanding your clinic&apos;s needs to setting up your communication workflows, we make the process straightforward. Our goal is to integrate virtual receptionist support into your existing operations with minimal disruption.
            </p>
            <div className={styles.heroActions}>
              <a className="btn" href="#discovery">
                Book a discovery call <ArrowRight size={16} aria-hidden="true" />
              </a>
              <a className="btn secondary" href="/services">Explore our services</a>
            </div>
          </div>

          <div className={styles.processVisual} role="img" aria-label="Discuss your needs, configure your workflows, then begin support">
            <div className={styles.processTrack} aria-hidden="true" />
            <div className={styles.processStages}>
              <div className={styles.processStage}>
                <span className={`${styles.stageIcon} ${styles.stageBlue}`}><MessageCircleMore size={22} /></span>
                <strong>Discuss</strong>
                <span>Understand your needs</span>
              </div>
              <div className={styles.processStage}>
                <span className={`${styles.stageIcon} ${styles.stageAmber}`}><Settings2 size={22} /></span>
                <strong>Configure</strong>
                <span>Prepare your workflows</span>
              </div>
              <div className={styles.processStage}>
                <span className={`${styles.stageIcon} ${styles.stageTeal}`}><Headset size={22} /></span>
                <strong>Support</strong>
                <span>Begin agreed coverage</span>
              </div>
            </div>
            <div className={styles.processCaption}><span /> A clear path from first conversation to coverage</div>
          </div>
        </div>
      </section>

      <section className={styles.roadmapSection} aria-labelledby="roadmap-title">
        <div className="container">
          <SectionHeading
            id="roadmap-title"
            kicker="The six-step roadmap"
            title="A Clear Process, From First Call to Ongoing Support."
            description="Each step builds on the one before it. The exact timeline and responsibilities are confirmed with your clinic before coverage begins."
          />
          <ProcessTimeline />
          <p className={styles.processNote}>
            This roadmap describes the proposed customer journey. Training, reporting, review frequency, and other commitments are confirmed as part of the agreed service plan.
          </p>
        </div>
      </section>

      <section className={styles.integrationSection} aria-labelledby="integration-title">
        <div className="container">
          <SectionHeading
            id="integration-title"
            kicker="What happens behind the scenes?"
            title="A Virtual Extension of Your Existing Front Desk."
            description="CareLine is designed to complement your in-house staff, not replace the relationships and expertise already established within your practice."
          />
          <div className={styles.systemMap} aria-label="CareLine virtual reception support connects patient calls, scheduling, follow-ups, and authorized clinic systems">
            <span className={styles.mapHorizontal} aria-hidden="true" />
            <span className={styles.mapVertical} aria-hidden="true" />
            {integrationItems.map(({ title, detail, icon: Icon, position }) => (
              <article className={`${styles.systemNode} ${styles[position]}`} key={title}>
                <span><Icon size={21} aria-hidden="true" /></span>
                <div><h3>{title}</h3><p>{detail}</p></div>
              </article>
            ))}
            <div className={styles.mapCore}>
              <span><Headset size={24} aria-hidden="true" /></span>
              <strong>CareLine</strong>
              <small>Virtual Reception Support</small>
            </div>
          </div>
          <p className={styles.integrationNote}>Illustrative service relationship. Actual system integrations depend on clinic authorization and technical compatibility.</p>
        </div>
      </section>

      <section className={styles.gettingStartedSection} aria-labelledby="getting-started-title">
        <div className={`container ${styles.gettingStartedGrid}`}>
          <div>
            <SectionHeading
              id="getting-started-title"
              kicker="What you need to get started"
              title="Getting Started Doesn&apos;t Require a Complicated Process."
              description="A few details help us understand how additional reception support could fit into your clinic."
            />
            <ul className={styles.checklist}>
              {gettingStarted.map((item, index) => (
                <li key={item}><span>{String(index + 1).padStart(2, "0")}</span><Check size={16} aria-hidden="true" />{item}</li>
              ))}
            </ul>
          </div>
          <aside className={styles.existingReceptionist}>
            <span className={styles.receptionIcon}><UsersRound size={22} aria-hidden="true" /></span>
            <span className={styles.kicker}>Already have an existing receptionist?</span>
            <h3>CareLine can work alongside your team.</h3>
            <p>Support can be structured around busy periods, lunch breaks, agreed overflow windows, or after-hours coverage, depending on your needs and service arrangement.</p>
            <a href="/contact#scheduler">Talk through your coverage <ArrowRight size={16} aria-hidden="true" /></a>
          </aside>
        </div>
      </section>

      <section className={styles.principlesSection} aria-labelledby="principles-title">
        <div className="container">
          <SectionHeading
            id="principles-title"
            kicker="What you can expect"
            title="Support Built Around Clear Expectations."
            description="The working arrangement is defined with your clinic, including who handles what and how changes are discussed."
          />
          <div className={styles.principleGrid}>
            {principles.map(({ title, description, icon: Icon }, index) => (
              <article className={styles.principle} key={title}>
                <div className={styles.principleTop}><span>0{index + 1}</span><Icon size={21} aria-hidden="true" /></div>
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.faqSection} aria-labelledby="faq-title">
        <div className={`container ${styles.faqLayout}`}>
          <div className={styles.faqIntro}>
            <span className={styles.kicker}>Frequently asked questions</span>
            <h2 id="faq-title">A Few More Things You May Be Wondering.</h2>
            <p>Have a question that isn&apos;t covered here? We can talk through it during a discovery call.</p>
            <a href="#discovery" className={styles.faqLink}>Ask us directly <ArrowRight size={16} aria-hidden="true" /></a>
          </div>
          <div className={styles.faqList}>
            {faqs.map(({ question, answer }) => (
              <details className={styles.faqItem} key={question}>
                <summary><span>{question}</span><ChevronDown size={18} aria-hidden="true" /></summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.finalCta} id="discovery" aria-labelledby="final-cta-title">
        <div className={`container ${styles.finalCtaGrid}`}>
          <div className={styles.finalCtaCopy}>
            <span className={styles.finalKicker}>Ready to get started?</span>
            <h2 id="final-cta-title">Your Next Step Is Just One Conversation Away.</h2>
            <p>Let&apos;s discuss your clinic&apos;s needs and build a receptionist support arrangement that works with your existing operations.</p>
            <div className={styles.finalReassurance}><Clock3 size={16} aria-hidden="true" /> Choose a time for a short introductory call.</div>
          </div>
          <div className={styles.schedulerPanel}>
            <DiscoveryScheduler />
          </div>
        </div>
      </section>
    </main>
  );
}