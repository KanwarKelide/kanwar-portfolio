"use client";

import { useRef } from "react";
import { motion, useInView, useMotionValue, useTransform, useSpring } from "framer-motion";

const pillars = [
  {
    icon: "◈",
    title: "AI Engineering",
    desc: "LLM integrations, RAG pipelines, production inference. Not demos.",
    accent: "#6366f1",
  },
  {
    icon: "◉",
    title: "Product Building",
    desc: "Zero to deployed. Full-stack ownership from architecture to launch.",
    accent: "#06b6d4",
  },
  {
    icon: "◇",
    title: "Analytics & BI",
    desc: "ETL to executive insight. Built for scale, not for slides.",
    accent: "#6366f1",
  },
  {
    icon: "◎",
    title: "Technical Leadership",
    desc: "Team of 5 at CodeClowns. Cross-functional delivery across global clients.",
    accent: "#06b6d4",
  },
];

export default function WhatIDo() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="what-i-do" className="section-pad px-6 max-w-6xl mx-auto">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
        className="mb-16"
      >
        <span className="text-xs tracking-[0.3em] uppercase block mb-4" style={{ color: "var(--text-secondary)" }}>
          Capabilities
        </span>
        <h2 className="font-display font-bold text-4xl md:text-5xl" style={{ color: "var(--text-primary)" }}>
          What I Do
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {pillars.map((p, i) => (
          <TiltCard key={p.title} pillar={p} delay={i * 0.12} inView={inView} />
        ))}
      </div>
    </section>
  );
}

function TiltCard({ pillar, delay, inView }: { pillar: (typeof pillars)[0]; delay: number; inView: boolean }) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const rotateX = useTransform(my, [-0.5, 0.5], [14, -14]);
  const rotateY = useTransform(mx, [-0.5, 0.5], [-14, 14]);
  const rotateXSpring = useSpring(rotateX, { stiffness: 280, damping: 28 });
  const rotateYSpring = useSpring(rotateY, { stiffness: 280, damping: 28 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    mx.set(0);
    my.set(0);
    if (cardRef.current) {
      cardRef.current.style.borderColor = "rgba(255,255,255,0.08)";
      cardRef.current.style.boxShadow = "none";
    }
  };

  const handleMouseEnter = () => {
    if (cardRef.current) {
      cardRef.current.style.borderColor = `${pillar.accent}50`;
      cardRef.current.style.boxShadow = `0 0 32px ${pillar.accent}18, inset 0 0 32px ${pillar.accent}06`;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay }}
      style={{ perspective: 1200 }}
    >
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={handleMouseEnter}
        style={{ rotateX: rotateXSpring, rotateY: rotateYSpring, willChange: "transform" }}
      >
        <div
          ref={cardRef}
          className="rounded-2xl p-8 h-full cursor-default transition-all duration-300"
          style={{ background: "var(--surface)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.08)" }}
        >
          <div className="text-3xl mb-6" style={{ color: pillar.accent }}>
            {pillar.icon}
          </div>
          <h3 className="font-display font-semibold text-xl mb-3" style={{ color: "var(--text-primary)" }}>
            {pillar.title}
          </h3>
          <p className="font-body text-base leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            {pillar.desc}
          </p>
          <div className="mt-6 h-px w-16" style={{ background: `linear-gradient(to right, ${pillar.accent}, transparent)` }} />
        </div>
      </motion.div>
    </motion.div>
  );
}
