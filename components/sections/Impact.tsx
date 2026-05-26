"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";

const stats = [
  { value: 30, suffix: "%", label: "Less decision latency", sub: "Mastercard analytics", span: 2 },
  { value: 15000, suffix: "", label: "kWh saved / month", sub: "Olectra route optimization", span: 2 },
  { value: 40, suffix: "%", label: "Efficiency gain", sub: "Olectra Django portal", span: 1 },
  { value: 1000, suffix: "+", label: "Electric buses monitored", sub: "Real-time, nationwide", span: 1 },
  { value: 1000, suffix: "+", label: "Users waitlisted", sub: "dwij.io", span: 1 },
  { value: 3, suffix: "", label: "Products live", sub: "CodeClowns", span: 1 },
];

function useCounter(target: number, inView: boolean, duration = 1800) {
  const [count, setCount] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (!inView || started.current) return;
    started.current = true;
    const startTime = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, target, duration]);

  return count;
}

function StatItem({
  stat,
  delay,
  large,
}: {
  stat: (typeof stats)[0];
  delay: number;
  large?: boolean;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const count = useCounter(stat.value, inView);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay }}
      className="rounded-2xl p-6 md:p-8 flex flex-col justify-between relative overflow-hidden"
      style={{
        background: "var(--surface)",
        border: "1px solid rgba(255,255,255,0.07)",
        backdropFilter: "blur(12px)",
        minHeight: large ? "180px" : "150px",
      }}
    >
      {/* Subtle accent glow */}
      <div
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
        style={{
          background: large
            ? "radial-gradient(ellipse 60% 80% at 20% 50%, rgba(99,102,241,0.07) 0%, transparent 70%)"
            : "none",
        }}
      />
      <div className="relative z-10">
        <div
          className="font-display font-bold leading-none mb-2"
          style={{
            fontSize: large ? "clamp(3.5rem, 8vw, 6.5rem)" : "clamp(2.5rem, 5vw, 4rem)",
            background: "linear-gradient(135deg, #6366f1, #06b6d4)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          {count.toLocaleString()}{stat.suffix}
        </div>
        <div className="font-display font-semibold text-sm md:text-base mb-1" style={{ color: "var(--text-primary)" }}>
          {stat.label}
        </div>
        <div className="font-body text-xs" style={{ color: "var(--text-secondary)" }}>
          {stat.sub}
        </div>
      </div>
    </motion.div>
  );
}

export default function Impact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="impact" className="section-pad px-6" style={{ position: "relative", overflow: "hidden" }}>
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(99,102,241,0.05) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16 text-center"
        >
          <span className="text-xs tracking-[0.3em] uppercase block mb-4" style={{ color: "var(--text-secondary)" }}>
            Results
          </span>
          <h2 className="font-display font-bold text-4xl md:text-5xl" style={{ color: "var(--text-primary)" }}>
            By the Numbers
          </h2>
        </motion.div>

        {/* Bento grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {/* Row 1: two 2-col hero stats */}
          <div className="col-span-2">
            <StatItem stat={stats[0]} delay={0} large />
          </div>
          <div className="col-span-2">
            <StatItem stat={stats[1]} delay={0.1} large />
          </div>
          {/* Row 2: four 1-col stats */}
          {stats.slice(2).map((stat, i) => (
            <div key={stat.label} className="col-span-1">
              <StatItem stat={stat} delay={0.2 + i * 0.07} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
