"use client";
import { useEffect, useRef } from "react";
import styles from "./CursorFollower.module.css";

export default function CursorFollower() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const dot = dotRef.current!;
    const ring = ringRef.current!;

    let mx = 0, my = 0, dx = 0, dy = 0, rx = 0, ry = 0;
    let started = false, raf = 0, last = performance.now();

    document.documentElement.classList.add("has-custom-cursor");

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (!started) {
        started = true;
        dx = rx = mx;
        dy = ry = my;
        dot.style.opacity = "1";
        ring.style.opacity = "1";
      }
      const t = e.target as HTMLElement;
      ring.classList.toggle(
        styles.hover,
        !!t.closest("a, button, [role='button'], input, textarea, select, label")
      );
    };
    const onDown = () => ring.classList.add(styles.down);
    const onUp = () => ring.classList.remove(styles.down);
    const onLeave = () => { dot.style.opacity = "0"; ring.style.opacity = "0"; };
    const onEnter = () => { if (started) { dot.style.opacity = "1"; ring.style.opacity = "1"; } };

    // frame-rate independent smoothing
    const ease = (f: number, dt: number) => 1 - Math.pow(1 - f, dt / 16.67);

    const loop = (now: number) => {
      const dt = Math.min(now - last, 50);
      last = now;
      dx += (mx - dx) * ease(0.5, dt);
      dy += (my - dy) * ease(0.5, dt);
      rx += (mx - rx) * ease(0.16, dt);
      ry += (my - ry) * ease(0.16, dt);
      dot.style.transform = `translate3d(${dx}px, ${dy}px, 0)`;
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.documentElement.addEventListener("mouseleave", onLeave);
    document.documentElement.addEventListener("mouseenter", onEnter);

    return () => {
      cancelAnimationFrame(raf);
      document.documentElement.classList.remove("has-custom-cursor");
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.removeEventListener("mouseenter", onEnter);
    };
  }, []);

  return (
    <>
      <div ref={ringRef} className={styles.ring} aria-hidden="true">
        <div className={styles.ringInner} />
      </div>
      <div ref={dotRef} className={styles.dot} aria-hidden="true" />
    </>
  );
}