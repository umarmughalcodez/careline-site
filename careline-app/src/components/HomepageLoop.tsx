"use client";

/**
 * CurvedLoop: CareLine themed marquee (straight line by default).
 * Font: Inter, extra-bold, tight tracking, matching the site's headings.
 * Light variant: navy -> blue -> teal gradient. Dark variant: white -> mint.
 */

import {
  useRef,
  useEffect,
  useState,
  useMemo,
  useId,
  FC,
  PointerEvent,
} from "react";

interface CurvedLoopProps {
  marqueeText?: string;
  speed?: number;
  className?: string;
  curveAmount?: number;
  direction?: "left" | "right";
  interactive?: boolean;
  variant?: "light" | "dark";
  pauseOnHover?: boolean;
}

const DEFAULT_TEXT =
  "Never miss a patient call ✚ Friendly human support ✚ Appointment scheduling ✚ Overflow & after-hours coverage ✚ Built around your clinic ✚ ";

const GRADIENTS = {
  light: ["#102a43", "#2864dc", "#1c9b91"],
  dark: ["#ffffff", "#c8eee9", "#81e0d0"],
} as const;

// Uses the Inter font from next/font if you exposed it as --font-inter,
// otherwise falls back to a locally installed Inter / system font.
const FONT_STACK =
  'var(--font-inter), Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif';

const CurvedLoop: FC<CurvedLoopProps> = ({
  marqueeText = DEFAULT_TEXT,
  speed = 1.2,
  className,
  curveAmount = 0,
  direction = "left",
  interactive = true,
  variant = "light",
  pauseOnHover = true,
}) => {
  const text = useMemo(() => {
    const hasTrailing = /[\s\u00A0]$/.test(marqueeText);
    return (
      (hasTrailing ? marqueeText.replace(/\s+$/, "") : marqueeText) + "\u00A0"
    );
  }, [marqueeText]);

  const measureRef = useRef<SVGTextElement | null>(null);
  const textPathRef = useRef<SVGTextPathElement | null>(null);
  const [spacing, setSpacing] = useState(0);
  const [grabbing, setGrabbing] = useState(false);

  const uid = useId().replace(/:/g, "");
  const pathId = `curve-${uid}`;
  const gradId = `grad-${uid}`;
  const pathD = `M-100,40 Q500,${40 + curveAmount} 1540,40`;

  // Tight crop around the text so there is no extra empty space.
  // Baseline sits at y=40; text is ~72 units tall.
  const dev = curveAmount / 2; // max vertical deviation of the curve
  const viewY = -18 + Math.min(0, dev);
  const viewH = 76 + Math.abs(dev);

  const offsetRef = useRef(0);
  const dragRef = useRef(false);
  const hoverRef = useRef(false);
  const lastXRef = useRef(0);
  const dirRef = useRef<"left" | "right">(direction);
  const velRef = useRef(0);
  const reducedRef = useRef(false);

  const ready = spacing > 0;
  const totalText = ready
    ? Array(Math.ceil(1800 / spacing) + 2)
        .fill(text)
        .join("")
    : text;

  const applyOffset = (value: number) => {
    offsetRef.current = value;
    textPathRef.current?.setAttribute("startOffset", value + "px");
  };

  const wrap = (value: number) => {
    let v = value;
    if (v <= -spacing) v += spacing;
    if (v > 0) v -= spacing;
    return v;
  };

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    reducedRef.current = mq.matches;
    const onChange = (e: MediaQueryListEvent) => (reducedRef.current = e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const measure = () => {
      if (measureRef.current)
        setSpacing(measureRef.current.getComputedTextLength());
    };
    measure();
    document.fonts?.ready.then(measure);
  }, [text, className]);

  useEffect(() => {
    if (ready) applyOffset(-spacing);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready, spacing]);

  useEffect(() => {
    if (!ready) return;
    let frame = 0;
    const step = () => {
      const paused =
        dragRef.current ||
        reducedRef.current ||
        (pauseOnHover && hoverRef.current);
      if (!paused) {
        const delta = dirRef.current === "right" ? speed : -speed;
        applyOffset(wrap(offsetRef.current + delta));
      }
      frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready, spacing, speed, pauseOnHover]);

  const onPointerDown = (e: PointerEvent) => {
    if (!interactive) return;
    dragRef.current = true;
    setGrabbing(true);
    lastXRef.current = e.clientX;
    velRef.current = 0;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: PointerEvent) => {
    if (!interactive || !dragRef.current) return;
    const dx = e.clientX - lastXRef.current;
    lastXRef.current = e.clientX;
    velRef.current = dx;
    applyOffset(wrap(offsetRef.current + dx));
  };

  const endDrag = () => {
    if (!interactive || !dragRef.current) return;
    dragRef.current = false;
    setGrabbing(false);
    if (velRef.current !== 0)
      dirRef.current = velRef.current > 0 ? "right" : "left";
  };

  const [c1, c2, c3] = GRADIENTS[variant];

  return (
    <div
      className="flex w-full items-center justify-center overflow-hidden py-1 sm:py-2"
      style={{
        visibility: ready ? "visible" : "hidden",
        cursor: interactive ? (grabbing ? "grabbing" : "grab") : "auto",
        touchAction: "pan-y",
      }}
      role="marquee"
      aria-label={marqueeText.replace(/✚/g, ",").trim()}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      onPointerLeave={() => {
        hoverRef.current = false;
        endDrag();
      }}
      onPointerEnter={() => (hoverRef.current = true)}
    >
      <svg
        aria-hidden="true"
        className="block w-full select-none overflow-visible text-[4.5rem] font-extrabold leading-none tracking-[-0.02em]"
        style={{
          fontFamily: FONT_STACK,
          aspectRatio: `1440 / ${viewH}`,
        }}
        viewBox={`0 ${viewY} 1440 ${viewH}`}
      >
        <defs>
          <linearGradient
            id={gradId}
            gradientUnits="userSpaceOnUse"
            x1="0"
            y1="0"
            x2="1440"
            y2="0"
          >
            <stop offset="0%" stopColor={c1} />
            <stop offset="50%" stopColor={c2} />
            <stop offset="100%" stopColor={c3} />
          </linearGradient>
          <path id={pathId} d={pathD} fill="none" stroke="transparent" />
        </defs>

        {/* hidden text used only to measure one copy of the phrase */}
        <text
          ref={measureRef}
          xmlSpace="preserve"
          style={{ visibility: "hidden", opacity: 0, pointerEvents: "none" }}
        >
          {text}
        </text>

        {ready && (
          <text
            xmlSpace="preserve"
            fill={`url(#${gradId})`}
            className={className ?? ""}
          >
            <textPath ref={textPathRef} href={`#${pathId}`} xmlSpace="preserve">
              {totalText}
            </textPath>
          </text>
        )}
      </svg>
    </div>
  );
};

export default CurvedLoop;