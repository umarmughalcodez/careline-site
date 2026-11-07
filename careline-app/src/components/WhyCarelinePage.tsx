import {
  ArrowRight,
  BellRing,
  Building2,
  CalendarCheck2,
  CalendarClock,
  Check,
  CheckCircle2,
  ClipboardList,
  Clock3,
  Headset,
  LockKeyhole,
  MessageSquareText,
  Phone,
  PhoneIncoming,
  PhoneMissed,
  ShieldCheck,
  Stethoscope,
  UserRound,
  UsersRound,
} from "lucide-react";
import styles from "./WhyCarelinePage.module.css";

const trustPoints = ["Flexible coverage options", "Clinic-approved workflows", "Dedicated communication support"];

const challenges = [
  {
    icon: PhoneMissed,
    title: "Missed patient calls",
    description: "Patients may struggle to reach your clinic when your team is occupied.",
  },
  {
    icon: UsersRound,
    title: "Busy front desks",
    description: "Staff members balance phone calls, visitors, and administrative work.",
  },
  {
    icon: CalendarClock,
    title: "Scheduling pressure",
    description: "Appointments, cancellations, and rescheduling all need consistent attention.",
  },
  {
    icon: MessageSquareText,
    title: "Inconsistent follow-ups",
    description: "Reminders and patient callbacks can be difficult to coordinate during a busy day.",
  },
];

const comparisons = [
  {
    topic: "Incoming calls",
    traditional: "Your in-house team handles every incoming call.",
    careline: "Add virtual reception support for agreed coverage hours.",
  },
  {
    topic: "Busy periods",
    traditional: "Calls may wait while staff are helping patients in person.",
    careline: "Calls can be handled using agreed coverage and routing procedures.",
  },
  {
    topic: "Scheduling",
    traditional: "Staff manage appointment requests alongside other duties.",
    careline: "Delegate agreed booking, rescheduling, and cancellation tasks.",
  },
  {
    topic: "Follow-ups",
    traditional: "Reminders and callbacks depend on available staff time.",
    careline: "Use structured follow-up workflows approved by your clinic.",
  },
  {
    topic: "Growing capacity",
    traditional: "More reception capacity may require internal hiring.",
    careline: "Discuss flexible external support as your workload changes.",
  },
];

const benefits = [
  {
    icon: PhoneIncoming,
    number: "01",
    title: "Better call management",
    description: "Give incoming patient calls a dedicated point of attention during your agreed coverage hours.",
    tone: "teal",
  },
  {
    icon: CalendarCheck2,
    number: "02",
    title: "Organized appointment scheduling",
    description: "Support booking, rescheduling, and cancellations according to your clinic's scheduling rules.",
    tone: "blue",
  },
  {
    icon: Clock3,
    number: "03",
    title: "Flexible coverage",
    description: "Choose coverage arrangements that fit your practice's operating hours and workload.",
    tone: "amber",
  },
  {
    icon: Headset,
    number: "04",
    title: "More time for your staff",
    description: "Reduce routine communication responsibilities so in-house staff can focus on other clinic duties.",
    tone: "blue",
  },
  {
    icon: BellRing,
    number: "05",
    title: "Consistent patient communication",
    description: "Handle reminders, callbacks, and follow-ups through agreed communication procedures.",
    tone: "amber",
  },
  {
    icon: ClipboardList,
    number: "06",
    title: "Clinic-specific workflows",
    description: "Follow your preferred communication guidelines, scheduling procedures, and escalation instructions.",
    tone: "teal",
  },
];

const practices = [
  {
    icon: UserRound,
    title: "Independent doctors",
    description: "Support for practitioners managing their own appointments and patient calls.",
  },
  {
    icon: Stethoscope,
    title: "Small medical clinics",
    description: "Additional help for practices with limited reception capacity.",
  },
  {
    icon: Building2,
    title: "Growing practices",
    description: "Flexible support as call volumes and administrative requirements increase.",
  },
  {
    icon: UsersRound,
    title: "Multi-provider clinics",
    description: "Coordinated communication and scheduling support across multiple providers.",
  },
];

const trustPractices = [
  "Access limited to authorized responsibilities.",
  "Communication procedures approved by your clinic.",
  "Clear escalation instructions for calls that need staff attention.",
  "Responsible handling of patient and practice information.",
  "Agreed workflows for scheduling and patient communication.",
];

export function ReceptionIllustration() {
  return (
    <div className={styles.visual} aria-hidden="true">
      <div className={styles.visualRule} />
      <div className={styles.workspace}>
        <div className={styles.workspaceBar}>
          <div className={styles.workspaceBrand}>
            <span className={styles.workspaceLogo}><Phone size={15} /></span>
            <span>CareLine <small>RECEPTION DESK</small></span>
          </div>
          <span className={styles.shiftStatus}><span /> On shift</span>
        </div>

        <div className={styles.workspaceBody}>
          <div className={styles.schedulePanel}>
            <div className={styles.scheduleHeading}>
              <span>Appointments</span>
              <small>Sample schedule · Wednesday</small>
            </div>
            <div className={styles.scheduleDay}>
              <strong>09</strong><span>WEDNESDAY</span><span className={styles.scheduleCount}>4 visits</span>
            </div>
            <div className={styles.appointmentRow}>
              <span className={styles.appointmentTime}>9:00</span>
              <span className={`${styles.appointmentMark} ${styles.markTeal}`} />
              <span className={styles.appointmentDetails}><b>Patient appointment</b><small>Dr. Shah · Follow-up</small></span>
            </div>
            <div className={styles.appointmentRow}>
              <span className={styles.appointmentTime}>9:30</span>
              <span className={`${styles.appointmentMark} ${styles.markBlue}`} />
              <span className={styles.appointmentDetails}><b>New patient visit</b><small>Dr. Shah · 30 minutes</small></span>
            </div>
            <div className={styles.appointmentRow}>
              <span className={styles.appointmentTime}>10:15</span>
              <span className={`${styles.appointmentMark} ${styles.markAmber}`} />
              <span className={styles.appointmentDetails}><b>Consultation</b><small>Dr. Khan · In person</small></span>
            </div>
          </div>

          <div className={styles.activityPanel}>
            <div className={styles.callNotice}>
              <span className={styles.callIcon}><PhoneIncoming size={17} /></span>
              <span><b>Incoming call</b><small>Patient line · New request</small></span>
              <span className={styles.callPulse} />
            </div>
            <div className={styles.confirmNotice}>
              <span className={styles.confirmIcon}><Check size={17} strokeWidth={3} /></span>
              <span><small>APPOINTMENT CONFIRMED</small><b>Thursday, 10:30 AM</b><em>Confirmation recorded</em></span>
            </div>
            <div className={styles.messageLine}>
              <MessageSquareText size={15} />
              <span>Call notes ready for clinic review</span>
            </div>
          </div>
        </div>
        <div className={styles.workspaceFoot}>
          <span><span className={styles.footDot} /> Call flow active</span>
          <span>Clinic-approved workflow</span>
        </div>
      </div>
      <div className={styles.visualCaption}><span /> Patient communication, handled with care</div>
    </div>
  );
}

export default function WhyCarelinePage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero} aria-labelledby="why-careline-title">
        <div className={`container ${styles.heroGrid}`}>
          <div className={styles.heroCopy}>
            <span className={styles.eyebrow}><span /> Why CareLine</span>
            <h1 id="why-careline-title">Your Patients Deserve Attention. Your Team Deserves Support.</h1>
            <p className={styles.heroLead}>
              Running a medical practice involves more than providing excellent care. Every incoming call, appointment request, and patient follow-up demands attention.
            </p>
            <p className={styles.heroDetail}>
              CareLine helps medical practices manage these everyday communication responsibilities with dependable virtual receptionist support, allowing your in-house team to focus on what matters most.
            </p>
            <div className={styles.heroActions}>
              <a className="btn" href="/contact#scheduler">
                Book a discovery call <ArrowRight size={16} aria-hidden="true" />
              </a>
              <a className="btn secondary" href="/services">Explore our services</a>
            </div>
            <ul className={styles.trustPoints}>
              {trustPoints.map((point) => (
                <li key={point}><CheckCircle2 size={16} aria-hidden="true" />{point}</li>
              ))}
            </ul>
          </div>
          <ReceptionIllustration />
        </div>
      </section>

      <section className={`${styles.section} ${styles.challengeSection}`} aria-labelledby="challenge-title">
        <div className="container">
          <div className={styles.sectionHeading}>
            <span className={styles.kicker}>The everyday challenge</span>
            <h2 id="challenge-title">Great Patient Care Starts With Better Communication.</h2>
            <p>When your front desk is busy, even routine administrative tasks can become difficult to manage. Missed calls, scheduling requests, and follow-ups can quickly accumulate.</p>
          </div>
          <div className={styles.challengeGrid}>
            {challenges.map(({ icon: Icon, title, description }) => (
              <article className={styles.challengeItem} key={title}>
                <span className={styles.challengeIcon}><Icon size={21} aria-hidden="true" /></span>
                <div><h3>{title}</h3><p>{description}</p></div>
              </article>
            ))}
          </div>
          <p className={styles.bridge}>
            Your practice shouldn&apos;t have to choose between answering every call and giving every patient the attention they deserve.
          </p>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="difference-title">
        <div className="container">
          <div className={styles.sectionHeading}>
            <span className={styles.kicker}>A practical difference</span>
            <h2 id="difference-title">A More Supported Front Desk. A Better Organized Practice.</h2>
            <p>CareLine adds flexible reception capacity around your existing team, based on the coverage and responsibilities you agree together.</p>
          </div>
          <div className={styles.comparison} role="table" aria-label="Traditional reception compared with CareLine support">
            <div className={`${styles.comparisonRow} ${styles.comparisonHeader}`} role="row">
              <span aria-hidden="true" />
              <span role="columnheader">Traditional approach</span>
              <span role="columnheader">With CareLine</span>
            </div>
            {comparisons.map((item) => (
              <div className={styles.comparisonRow} role="row" key={item.topic}>
                <strong role="rowheader">{item.topic}</strong>
                <div role="cell"><span className={styles.mobileComparisonLabel}>Traditional approach</span><p>{item.traditional}</p></div>
                <div className={styles.carelineCell} role="cell"><span className={styles.mobileComparisonLabel}>With CareLine</span><p>{item.careline}</p></div>
              </div>
            ))}
          </div>
          <p className={styles.comparisonNote}>Coverage follows your agreed hours and routing. CareLine complements your front desk; it does not guarantee that every call will be answered.</p>
        </div>
      </section>

      <section className={`${styles.section} ${styles.benefitsSection}`} aria-labelledby="benefits-title">
        <div className="container">
          <div className={styles.sectionHeading}>
            <span className={styles.kicker}>The CareLine difference</span>
            <h2 id="benefits-title">Everything Your Front Desk Needs, Without Adding More Pressure.</h2>
          </div>
          <div className={styles.benefitGrid}>
            {benefits.map(({ icon: Icon, number, title, description, tone }) => (
              <article className={styles.benefitItem} key={number}>
                <div className={styles.benefitTopline}>
                  <span className={`${styles.benefitIcon} ${styles[tone]}`}><Icon size={21} aria-hidden="true" /></span>
                  <span className={styles.benefitNumber}>{number}</span>
                </div>
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="practices-title">
        <div className="container">
          <div className={styles.sectionHeading}>
            <span className={styles.kicker}>Who we support</span>
            <h2 id="practices-title">Reception Support Designed Around Your Practice.</h2>
          </div>
          <div className={styles.practiceGrid}>
            {practices.map(({ icon: Icon, title, description }, index) => (
              <article className={styles.practiceItem} key={title}>
                <span className={styles.practiceIndex}>0{index + 1}</span>
                <Icon className={styles.practiceIcon} size={23} aria-hidden="true" />
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.trustSection} aria-labelledby="trust-title">
        <div className={`container ${styles.trustGrid}`}>
          <div className={styles.trustCopy}>
            <span className={styles.kickerLight}><ShieldCheck size={16} aria-hidden="true" /> Trust and privacy</span>
            <h2 id="trust-title">Patient Communication Deserves Responsible Handling.</h2>
            <p>CareLine follows clinic-approved procedures and works with access permissions defined by the practice. Your team sets the boundaries, workflows, and escalation instructions.</p>
            <a href="/contact#scheduler" className={styles.trustLink}>Talk through your workflow <ArrowRight size={16} aria-hidden="true" /></a>
          </div>
          <ul className={styles.trustList}>
            {trustPractices.map((practice) => (
              <li key={practice}><span><Check size={15} aria-hidden="true" /></span>{practice}</li>
            ))}
          </ul>
          <LockKeyhole className={styles.trustWatermark} size={180} strokeWidth={0.65} aria-hidden="true" />
        </div>
      </section>

      <section className={styles.finalCta} aria-labelledby="final-cta-title">
        <div className={`container ${styles.finalCtaInner}`}>
          <div>
            <span className={styles.kicker}>A thoughtful next step</span>
            <h2 id="final-cta-title">Let&apos;s Make Your Front Desk Work Better.</h2>
            <p>Tell us about your practice, your communication challenges, and the type of coverage you need. We&apos;ll discuss a support arrangement that fits your workflow.</p>
          </div>
          <div className={styles.finalCtaActions}>
            <a className="btn" href="/contact#scheduler">Book a discovery call <ArrowRight size={16} aria-hidden="true" /></a>
            <a className="btn secondary" href="/calculator">Get a coverage estimate</a>
          </div>
        </div>
      </section>
    </main>
  );
}