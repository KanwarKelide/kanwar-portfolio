"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const words =
  "I'm Kanwar — AI Product Engineer and Co-founder of CodeClowns. I've spent five years inside enterprise data systems at global companies, and the last three building AI-native products from scratch. I care about systems that create measurable outcomes, not demos.".split(" ");

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="section-pad px-6 max-w-4xl mx-auto" style={{ position: "relative" }}>
      {/* Diagonal gradient accent */}
      <div
        className="absolute inset-0 pointer-events-none -z-10"
        style={{
          background: "linear-gradient(135deg, rgba(99,102,241,0.05) 0%, transparent 40%, rgba(6,182,212,0.03) 100%)",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
        className="mb-16"
      >
        <span className="text-xs tracking-[0.3em] uppercase block mb-4" style={{ color: "var(--text-secondary)" }}>
          Background
        </span>
        <h2 className="font-display font-bold text-4xl md:text-5xl" style={{ color: "var(--text-primary)" }}>
          About
        </h2>
      </motion.div>

      <div ref={ref}>
        <p
          className="font-display font-medium leading-relaxed mb-8"
          style={{ fontSize: "clamp(1.3rem, 2.8vw, 2rem)" }}
          aria-label={words.join(" ")}
        >
          {words.map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 14 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, delay: i * 0.022 }}
              className="inline-block mr-[0.35em]"
              style={{
                color: i < 5 ? "var(--text-primary)" : "rgba(248,250,252,0.68)",
              }}
            >
              {word}
            </motion.span>
          ))}
        </p>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="flex items-center gap-4"
        >
          <div className="w-8 h-px" style={{ background: "#6366f1" }} />
          <p className="font-body text-sm" style={{ color: "var(--text-secondary)" }}>
            Currently open to senior AI engineering roles and founding team opportunities.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1.4 }}
          className="mt-10"
        >
          <a
            href="mailto:kelide1996@gmail.com"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-display font-medium text-sm tracking-wide transition-all duration-300"
            style={{
              background: "linear-gradient(135deg, #6366f1, #06b6d4)",
              color: "#fff",
              boxShadow: "0 0 40px rgba(99,102,241,0.25), 0 0 80px rgba(99,102,241,0.1)",
            }}
          >
            Let&apos;s Talk
            <span>→</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
