"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import dynamic from "next/dynamic";
import { ErrorBoundary } from "@/components/ui/ErrorBoundary";

const ContactOrb = dynamic(() => import("@/components/three/ContactOrb"), { ssr: false });

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="contact"
      className="relative section-pad px-6 overflow-hidden"
      style={{ minHeight: "80vh", display: "flex", alignItems: "center" }}
    >
      <div className="absolute inset-0 pointer-events-none">
        <ErrorBoundary>
          <ContactOrb />
        </ErrorBoundary>
      </div>

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 50% 60% at 50% 50%, rgba(6,182,212,0.05) 0%, transparent 70%)",
        }}
      />

      <div ref={ref} className="relative z-10 max-w-3xl mx-auto w-full text-center">
        <motion.span
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-xs tracking-[0.3em] uppercase block mb-6"
          style={{ color: "var(--text-secondary)" }}
        >
          Contact
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-display font-bold mb-8"
          style={{ fontSize: "clamp(2.5rem, 7vw, 6rem)", color: "var(--text-primary)", lineHeight: 1 }}
        >
          Let&apos;s Talk
        </motion.h2>

        {/* Large email — the hero element */}
        <motion.a
          href="mailto:kelide1996@gmail.com"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          whileHover={{ letterSpacing: "0.06em" }}
          className="inline-block font-display font-semibold mb-12 transition-all duration-300"
          style={{
            fontSize: "clamp(1.1rem, 3.5vw, 2.5rem)",
            background: "linear-gradient(135deg, #6366f1, #06b6d4)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            textDecoration: "none",
          }}
        >
          kelide1996@gmail.com
        </motion.a>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="flex justify-center gap-8 mb-16"
        >
          <SocialLink href="https://linkedin.com/in/kanwar-kelide" label="LinkedIn" />
          <SocialLink href="https://github.com/KanwarKelide" label="GitHub" />
          <SocialLink href="mailto:kelide1996@gmail.com" label="Email" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="w-full h-px mb-8" style={{ background: "var(--border)" }} />
          <p className="font-body text-xs tracking-[0.2em]" style={{ color: "var(--text-secondary)" }}>
            Kanwar Kelide · 2026
          </p>
        </motion.div>
      </div>
    </section>
  );
}

function SocialLink({ href, label }: { href: string; label: string }) {
  return (
    <motion.a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel="noopener noreferrer"
      whileHover={{ x: 4, color: "#a5b4fc" }}
      transition={{ duration: 0.2 }}
      className="font-display font-medium text-sm tracking-widest uppercase"
      style={{ color: "var(--text-secondary)", textDecoration: "none" }}
    >
      {label} →
    </motion.a>
  );
}
