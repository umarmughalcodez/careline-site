"use client";

import React, { useState, useEffect } from "react";
import styles from "./Navbar.module.css";
import { Menu, X, ArrowRight, Phone, ChevronRight } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && drawerOpen) {
        setDrawerOpen(false);
      }
    };

    if (drawerOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [drawerOpen]);

  const navItems = [
    { label: "Services", href: "#services" },
    { label: "Why CareLine", href: "#about" },
    { label: "Coverage Estimator", href: "#calculator" },
    { label: "How it works", href: "#how" },
    { label: "Contact", href: "/contact" },
  ];

  const handleLinkClick = () => {
    setDrawerOpen(false);
  };

  return (
    <>
      <header className={`${styles.navWrapper} ${scrolled ? styles.scrolled : ""}`}>
        <div className={`container ${styles.nav}`}>
          <a className={styles.brand} href="#home" aria-label="CareLine Home">
            <span className={styles.logo} aria-hidden="true">✚</span>
            <span>
              CareLine <span className={styles.brandSub}>Medical Reception</span>
            </span>
          </a>

          <nav className={styles.navlinks} aria-label="Main Navigation">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`${styles.navLink} ${item.href === "/contact" ? styles.active : ""}`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className={styles.navActions}>
            <a className="btn" href="/contact">
              <span>Book a discovery call</span>
              <ArrowRight size={16} aria-hidden="true" />
            </a>

            <button
              className={styles.mobileToggle}
              onClick={() => setDrawerOpen(true)}
              aria-label="Open mobile navigation menu"
              aria-expanded={drawerOpen}
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Backdrop */}
      <div
        className={`${styles.drawerOverlay} ${drawerOpen ? styles.open : ""}`}
        onClick={() => setDrawerOpen(false)}
        aria-hidden="true"
      />

      {/* Mobile Drawer Menu */}
      <div
        className={`${styles.drawerContent} ${drawerOpen ? styles.open : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile Navigation Menu"
      >
        <div className={styles.drawerHeader}>
          <div className={styles.brand}>
            <span className={styles.logo} aria-hidden="true">✚</span>
            <span>CareLine</span>
          </div>
          <button
            className={styles.mobileToggle}
            onClick={() => setDrawerOpen(false)}
            aria-label="Close navigation menu"
            style={{ display: "flex" }}
          >
            <X size={22} />
          </button>
        </div>

        <nav className={styles.drawerLinks}>
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={styles.drawerLink}
              onClick={handleLinkClick}
            >
              <span>{item.label}</span>
              <ChevronRight size={18} color="#8392a1" />
            </a>
          ))}
        </nav>

        <div className={styles.drawerFooter}>
          <a href="tel:18005550199" className={styles.drawerPhone}>
            <Phone size={16} color="var(--blue)" />
            <span>(800) 555-0199</span>
          </a>
          <a
            className="btn"
            href="/contact"
            onClick={handleLinkClick}
            style={{ width: "100%" }}
          >
            <span>Book a discovery call</span>
            <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </>
  );
}
