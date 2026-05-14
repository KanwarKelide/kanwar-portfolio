"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";

const stats = [
  { value: 30, suffix: "%", label: "Less decision latency", sub: "Mastercard analytics" },
  { value: 15000, suffix: "", label: "kWh saved / month", sub: "Olectra route optimization" },
  { value: 40, suffix: "%", label: "Efficiency gain", sub: "Olectra Django portal" },
  { value: 1000, suffix: "+", label: "Electric buses monitored", sub: "Real-time, nationwide" },
  { value: 1000, suffix: "+", label: "Users waitlisted", sub: "dwij.io" },
  { value: 3, suffix: "", label: "Products live", sub: "CodeClowns" },
];

function useCounter(target: number, inView: boolean, duration = 1600) {
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

function StatItem({ stat, delay }: { stat: (typeof stats)[0]; delay: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const count = useCounter(stat.value, inView);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      className="text-center"
    >
      <div
        className="font-display font-bold mb-2"
        style={{
          fontSize: "clamp(2.5rem, 5vw, 3.5rem)",
          background: "linear-gradient(135deg, #6366f1, #06b6d4)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        {count.toLocaleString()}{stat.suffix}
      </div>
      <div
        className="font-display font-semibold text-base mb-1"
        style={{ color: "var(--text-primary)" }}
      >
        {stat.label}
      </div>
      <div
        className="font-body text-xs"
        style={{ color: "var(--text-secondary)" }}
      >
        {stat.sub}
      </div>
    </motion.div>
  );
}

export default function Impact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="impact"
      className="section-pad px-6"
      style={{ position: "relative", overflow: "hidden" }}
    >
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(99,102,241,0.06) 0%, transparent 70%)",
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
          <span
            className="text-xs tracking-[0.3em] uppercase block mb-4"
            style={{ color: "var(--text-secondary)" }}
          >
            Results
          </span>
          <h2
            className="font-display font-bold text-4xl md:text-5xl"
            style={{ color: "var(--text-primary)" }}
          >
            By the Numbers
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-12">
          {stats.map((stat, i) => (
            <StatItem key={stat.label} stat={stat} delay={i * 0.08} />
          ))}
        </div>
      </div>
    </section>
  );
}
