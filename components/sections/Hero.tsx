"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";

const HeroCanvas = dynamic(() => import("@/components/three/HeroCanvas"), {
  ssr: false,
});

const clients = ["Mastercard", "AstraZeneca", "Clarivate", "Olectra"];

export default function Hero() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* 3D canvas or mobile fallback */}
      {!isMobile ? (
        <HeroCanvas />
      ) : (
        <div className="absolute inset-0 bg-gradient-radial from-indigo-500/10 via-transparent to-transparent" />
      )}

      {/* Radial glow behind text */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(99,102,241,0.08) 0%, transparent 70%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span
            className="text-xs tracking-[0.3em] uppercase mb-8 block"
            style={{ color: "var(--text-secondary)" }}
          >
            AI Product Engineer · Co-founder & CTO
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.35 }}
          className="font-display font-bold leading-none tracking-tight mb-6"
          style={{
            fontSize: "clamp(3.5rem, 10vw, 9rem)",
            color: "var(--text-primary)",
          }}
        >
          Kanwar{" "}
          <span className="gradient-text">Kelide</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="font-body text-xl md:text-2xl mb-10"
          style={{ color: "var(--text-secondary)", maxWidth: "480px" }}
        >
          I build AI products that ship.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.65 }}
          className="flex gap-4 mb-16 flex-wrap justify-center"
        >
          <MagneticButton
            onClick={() => scrollTo("products")}
            variant="primary"
          >
            View Work
          </MagneticButton>
          <MagneticButton
            onClick={() => scrollTo("contact")}
            variant="ghost"
          >
            Get in Touch
          </MagneticButton>
        </motion.div>

        {/* Client strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="flex flex-col items-center gap-5"
        >
          <div
            className="w-24 h-px"
            style={{ background: "var(--border)" }}
          />
          <span
            className="text-xs tracking-[0.25em] uppercase"
            style={{ color: "var(--text-secondary)" }}
          >
            Delivered for
          </span>
          <div className="flex flex-wrap justify-center gap-8">
            {clients.map((c) => (
              <span
                key={c}
                className="font-display font-semibold text-sm tracking-wide"
                style={{ color: "rgba(248,250,252,0.25)" }}
              >
                {c}
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span
          className="text-xs tracking-[0.2em] uppercase"
          style={{ color: "var(--text-secondary)" }}
        >
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          className="w-px h-8"
          style={{ background: "linear-gradient(to bottom, #6366f1, transparent)" }}
        />
      </motion.div>
    </section>
  );
}

function MagneticButton({
  children,
  onClick,
  variant,
}: {
  children: React.ReactNode;
  onClick: () => void;
  variant: "primary" | "ghost";
}) {
  const ref = useRef<HTMLButtonElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    const btn = ref.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
  };

  const handleMouseLeave = () => {
    if (ref.current) ref.current.style.transform = "translate(0,0)";
  };

  return (
    <button
      ref={ref}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative px-8 py-3.5 rounded-full font-display font-medium text-sm tracking-wide transition-all duration-300"
      style={
        variant === "primary"
          ? {
              background: "linear-gradient(135deg, #6366f1, #06b6d4)",
              color: "#fff",
              boxShadow: "0 0 32px rgba(99,102,241,0.25)",
            }
          : {
              background: "transparent",
              color: "var(--text-primary)",
              border: "1px solid rgba(255,255,255,0.12)",
            }
      }
    >
      {children}
    </button>
  );
}
