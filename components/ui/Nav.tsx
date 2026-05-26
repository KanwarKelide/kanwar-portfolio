"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { label: "Work", id: "what-i-do" },
  { label: "Arc", id: "arc" },
  { label: "Products", id: "products" },
  { label: "Stack", id: "stack" },
  { label: "Contact", id: "contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    const observers = links.map(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveId(id); },
        { rootMargin: "-35% 0px -35% 0px", threshold: 0 }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach((o) => o?.disconnect());
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5"
      style={{
        background: scrolled ? "rgba(5,5,8,0.88)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.05)" : "none",
        transition: "background 0.3s ease, backdrop-filter 0.3s ease",
      }}
    >
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="font-display font-bold text-sm tracking-wider"
        style={{ color: "var(--text-primary)", background: "none", border: "none", cursor: "pointer" }}
      >
        KK
      </button>

      <div className="hidden md:flex items-center gap-8">
        {links.map((link) => (
          <button
            key={link.id}
            onClick={() => scrollTo(link.id)}
            className="relative font-body text-sm transition-colors duration-200"
            style={{
              color: activeId === link.id ? "var(--text-primary)" : "var(--text-secondary)",
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
          >
            {link.label}
            <AnimatePresence>
              {activeId === link.id && (
                <motion.div
                  layoutId="nav-indicator"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute -bottom-1 left-0 right-0 h-px"
                  style={{ background: "linear-gradient(to right, #6366f1, #06b6d4)" }}
                />
              )}
            </AnimatePresence>
          </button>
        ))}
      </div>

      <a
        href="mailto:kelide1996@gmail.com"
        className="hidden md:inline-flex items-center px-5 py-2 rounded-full text-xs font-display font-medium tracking-wide transition-all duration-200"
        style={{
          background: "rgba(99,102,241,0.12)",
          color: "#a5b4fc",
          border: "1px solid rgba(99,102,241,0.25)",
          textDecoration: "none",
        }}
      >
        Hire Me
      </a>
    </motion.nav>
  );
}
