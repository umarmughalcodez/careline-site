"use client";

import { useRef } from "react";
import {
  BellRing,
  Check,
  ClipboardList,
  Headset,
  MessageCircleMore,
  PhoneCall,
  Settings2,
} from "lucide-react";
import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import styles from "./HowTimeline.module.css";

const steps = [
  {
    title: "Discovery Call",
    description: "Understand your clinic, communication challenges, and coverage requirements.",
    icon: MessageCircleMore,
  },
  {
    title: "Coverage Planning",
    description: "Recommend suitable coverage hours, service scope, and pricing.",
    icon: ClipboardList,
  },
  {
    title: "Workflow Setup",
    description: "Establish call instructions, scheduling rules, scripts, and escalation procedures.",
    icon: Settings2,
  },
  {
    title: "Team Preparation",
    description: "Where included in the agreed scope, prepare the reception team on clinic procedures and responsibilities.",
    icon: Headset,
  },
  {
    title: "Go Live",
    description: "Begin the virtual receptionist coverage outlined in your agreed schedule.",
    icon: PhoneCall,
  },
  {
    title: "Ongoing Support",
    description: "Discuss feedback, review workflows, and adjust support as requirements change.",
    icon: BellRing,
  },
];

function TimelineMarker({
  progress,
  index,
  isTimelineInView,
}: {
  progress: MotionValue<number>;
  index: number;
  isTimelineInView: boolean;
}) {
  const start = index / steps.length;
  const end = (index + 1) / steps.length;
  const completed = useTransform(progress, (value) => Number(value >= end));
  const active = useTransform(progress, (value) => Number(isTimelineInView && value >= start && value < end));
  const markerColor = useTransform(progress, (value) => {
    if (value >= end) return "#1c9b91";
    if (isTimelineInView && value >= start && value < end) return "#2864dc";
    return "#b9c7d1";
  });
  const numberOpacity = useTransform(completed, [0, 1], [1, 0]);
  const checkOpacity = completed;
  const ringScale = useTransform(active, [0, 1], [0.86, 1.24]);

  return (
    <motion.span className={styles.marker} style={{ backgroundColor: markerColor }} aria-hidden="true">
      <motion.span className={styles.markerRing} style={{ opacity: active, scale: ringScale }} />
      <motion.span className={styles.markerNumber} style={{ opacity: numberOpacity }}>
        {String(index + 1).padStart(2, "0")}
      </motion.span>
      <motion.span className={styles.markerCheck} style={{ opacity: checkOpacity }}>
        <Check size={17} strokeWidth={3} />
      </motion.span>
    </motion.span>
  );
}

function TimelineStep({
  step,
  index,
  progress,
  isTimelineInView,
  reduceMotion,
}: {
  step: (typeof steps)[number];
  index: number;
  progress: MotionValue<number>;
  isTimelineInView: boolean;
  reduceMotion: boolean;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const isInView = useInView(ref, { once: true, amount: 0.16 });
  const Icon = step.icon;

  return (
    <motion.article
      ref={ref}
      className={styles.timelineStep}
      initial={{ opacity: reduceMotion ? 1 : 0.35, y: reduceMotion ? 0 : 14 }}
      animate={{ opacity: isInView || reduceMotion ? 1 : 0.35, y: isInView || reduceMotion ? 0 : 14 }}
      transition={{ duration: reduceMotion ? 0 : 0.42, ease: "easeOut" }}
    >
      <TimelineMarker progress={progress} index={index} isTimelineInView={isTimelineInView} />
      <div className={styles.stepCard}>
        <div className={styles.stepHeader}>
          <span>Step {String(index + 1).padStart(2, "0")}</span>
          <Icon size={19} aria-hidden="true" />
        </div>
        <h3>{step.title}</h3>
        <p>{step.description}</p>
      </div>
    </motion.article>
  );
}

export default function HowTimeline() {
  const timelineRef = useRef<HTMLDivElement | null>(null);
  const isTimelineInView = useInView(timelineRef, { once: false, amount: 0.015 });
  const reduceMotion = useReducedMotion() ?? false;
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 0.78", "end 0.58"],
  });
  const springProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001,
  });
  const progress = reduceMotion ? scrollYProgress : springProgress;

  return (
    <section className={styles.section} aria-labelledby="timeline-title">
      <div className="container">
        <header className={styles.sectionHeading}>
          <span className={styles.kicker}>The process</span>
          <h2 id="timeline-title">Six Steps. One Clear Path.</h2>
          <p>From the first conversation to ongoing support, here&apos;s what to expect.</p>
        </header>

        <div className={styles.timeline} ref={timelineRef}>
          <div className={styles.track} aria-hidden="true" />
          <motion.div className={styles.progress} style={{ scaleY: progress }} aria-hidden="true" />
          {steps.map((step, index) => (
            <TimelineStep
              key={step.title}
              step={step}
              index={index}
              progress={progress}
              isTimelineInView={isTimelineInView}
              reduceMotion={reduceMotion}
            />
          ))}
        </div>

        <p className={styles.note}>Training, reporting, and review frequency are confirmed in the agreed service plan.</p>
      </div>
    </section>
  );
}