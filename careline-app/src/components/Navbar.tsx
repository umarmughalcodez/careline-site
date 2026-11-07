"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Navbar.module.css";
import { Menu, X, ArrowRight, ChevronRight } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
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
    { label: "Services", href: "/services" },
    { label: "Why CareLine", href: "/about" },
    { label: "Coverage Estimator", href: "/calculator" },
    { label: "How It Works", href: "/how" },
    { label: "Contact", href: "/contact" },
  ];

  const handleLinkClick = () => {
    setDrawerOpen(false);
  };

  return (
    <>
      <header className={`${styles.navWrapper} ${scrolled ? styles.scrolled : ""}`}>
        <div className={`container ${styles.nav}`}>
          <Link className={styles.brand} href="/" aria-label="CareLine Home">
            <span className={styles.logo} aria-hidden="true">✚</span>
            <span>
              CareLine <span className={styles.brandSub}>Medical Reception</span>
            </span>
          </Link>

          <nav className={styles.navlinks} aria-label="Main Navigation">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`${styles.navLink} ${item.href === pathname ? styles.active : ""}`}
                aria-current={item.href === pathname ? "page" : undefined}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className={styles.navActions}>
            <Link className="btn" href="/contact#scheduler">
              <span>Book a discovery call</span>
              <ArrowRight size={16} aria-hidden="true" />
            </Link>

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
        aria-modal={drawerOpen || undefined}
        aria-hidden={!drawerOpen}
        inert={!drawerOpen}
        aria-label="Mobile Navigation Menu"
      >
        <div className={styles.drawerHeader}>
          <Link className={styles.brand} href="/" aria-label="CareLine Home" onClick={handleLinkClick}>
            <span className={styles.logo} aria-hidden="true">✚</span>
            <span>CareLine</span>
          </Link>
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
            <Link
              key={item.href}
              href={item.href}
              className={`${styles.drawerLink} ${item.href === pathname ? styles.active : ""}`}
              aria-current={item.href === pathname ? "page" : undefined}
              onClick={handleLinkClick}
            >
              <span>{item.label}</span>
              <ChevronRight size={18} color="#8392a1" />
            </Link>
          ))}
        </nav>

        <div className={styles.drawerFooter}>
          <Link
            className="btn"
            href="/contact#scheduler"
            onClick={handleLinkClick}
            style={{ width: "100%" }}
          >
            <span>Book a discovery call</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </>
  );
}
