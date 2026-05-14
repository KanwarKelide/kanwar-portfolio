"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

const beats = [
  {
    year: "2019",
    company: "Olectra Greentech",
    location: "Hyderabad",
    role: "Analyst",
    description:
      "Built real-time monitoring for 1,000+ electric buses nationwide. Route optimization saved 15,000 kWh/month. Django portal cut manual data entry by 40%. Promoted to lead a team of 3 directly after graduation.",
    tags: ["Python", "Django", "Data Analysis"],
    accent: "#06b6d4",
  },
  {
    year: "2021",
    company: "EvaluServe",
    location: "Gurugram",
    role: "Senior Analyst",
    description:
      "Delivered analytics platforms reducing decision latency by 30% for Mastercard. End-to-end BI ecosystem for Clarivate. EUCAN & WESE pipeline ownership for AstraZeneca. Promoted to Senior Analyst driven by impact.",
    clients: ["Mastercard", "AstraZeneca", "Clarivate"],
    tags: ["SQL", "Power BI", "Tableau", "Python"],
    accent: "#6366f1",
  },
  {
    year: "2023",
    company: "CodeClowns",
    location: "Remote",
    role: "Co-Founder & CTO",
    description:
      "Co-founded an AI-native studio. Building production AI products — RAG pipelines, LLM integrations, full-stack SaaS. Managing a cross-functional team of 5. Ships to real users.",
    tags: ["LLMs", "RAG", "Next.js", "Supabase"],
    accent: "#6366f1",
    current: true,
  },
];

export default function CareerArc() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="arc" className="section-pad px-6 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
        ref={ref}
        className="mb-16"
      >
        <span
          className="text-xs tracking-[0.3em] uppercase block mb-4"
          style={{ color: "var(--text-secondary)" }}
        >
          Journey
        </span>
        <h2
          className="font-display font-bold text-4xl md:text-5xl"
          style={{ color: "var(--text-primary)" }}
        >
          The Arc
        </h2>
      </motion.div>

      <div className="relative">
        {/* Timeline line */}
        <div
          className="absolute left-6 top-0 bottom-0 w-px"
          style={{ background: "var(--border)" }}
        />

        <div className="flex flex-col gap-12">
          {beats.map((beat, i) => (
            <BeatCard key={beat.year} beat={beat} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function BeatCard({
  beat,
  index,
}: {
  beat: (typeof beats)[0];
  index: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -32 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.15 }}
      className="flex gap-8 pl-16 relative"
    >
      {/* Timeline dot */}
      <motion.div
        initial={{ scale: 0 }}
        animate={inView ? { scale: 1 } : {}}
        transition={{ duration: 0.4, delay: index * 0.15 + 0.2 }}
        className="absolute left-0 top-6 w-12 h-12 rounded-full flex items-center justify-center"
        style={{
          background: "var(--bg)",
          border: `1px solid ${beat.accent}`,
          boxShadow: `0 0 20px ${beat.accent}30`,
        }}
      >
        <span
          className="font-display font-bold text-xs"
          style={{ color: beat.accent }}
        >
          {beat.year.slice(2)}
        </span>
      </motion.div>

      <div
        className="glow-border rounded-2xl p-8 flex-1"
        style={{ background: "var(--surface)", backdropFilter: "blur(12px)" }}
      >
        <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <span
                className="font-display font-bold text-2xl"
                style={{ color: "var(--text-primary)" }}
              >
                {beat.company}
              </span>
              {beat.current && (
                <span
                  className="text-xs px-2 py-0.5 rounded-full font-medium"
                  style={{
                    background: "rgba(6,182,212,0.12)",
                    color: "#06b6d4",
                    border: "1px solid rgba(6,182,212,0.2)",
                  }}
                >
                  Now
                </span>
              )}
            </div>
            <span
              className="text-sm font-body"
              style={{ color: "var(--text-secondary)" }}
            >
              {beat.role} · {beat.location} · {beat.year}
            </span>
          </div>
        </div>

        <p
          className="font-body text-base leading-relaxed mb-6"
          style={{ color: "rgba(248,250,252,0.7)" }}
        >
          {beat.description}
        </p>

        {beat.clients && (
          <div className="flex flex-wrap gap-2 mb-4">
            {beat.clients.map((c) => (
              <span
                key={c}
                className="text-xs px-3 py-1 rounded-full font-display font-medium"
                style={{
                  background: "rgba(99,102,241,0.1)",
                  color: "#a5b4fc",
                  border: "1px solid rgba(99,102,241,0.2)",
                }}
              >
                {c}
              </span>
            ))}
          </div>
        )}

        <div className="flex flex-wrap gap-2">
          {beat.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-3 py-1 rounded-full font-body"
              style={{
                background: "rgba(255,255,255,0.04)",
                color: "var(--text-secondary)",
                border: "1px solid var(--border)",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
