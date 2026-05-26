"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { gsap } from "@/lib/gsap";
import { ErrorBoundary } from "@/components/ui/ErrorBoundary";

const HeroCanvas = dynamic(() => import("@/components/three/HeroCanvas"), {
  ssr: false,
});

const clients = ["Mastercard", "AstraZeneca", "Clarivate", "Olectra"];

export default function Hero() {
  const [isMobile, setIsMobile] = useState(false);
  const [headlineDone, setHeadlineDone] = useState(false);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  useEffect(() => {
    if (!nameRef.current) return;

    const letters = nameRef.current.querySelectorAll(".letter");
    gsap.fromTo(
      letters,
      { y: 90, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.9,
        stagger: 0.035,
        ease: "power4.out",
        delay: 0.3,
        onComplete: () => setHeadlineDone(true),
      }
    );
  }, []);

  useEffect(() => {
    if (!headlineDone || !taglineRef.current) return;
    const words = taglineRef.current.querySelectorAll(".word");
    gsap.fromTo(
      words,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.07, ease: "power3.out" }
    );
  }, [headlineDone]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const nameText = "Kanwar Kelide";
  const taglineText = "I build AI products that ship.";

  return (
    <section
      id="hero-section"
      className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {!isMobile ? (
        <ErrorBoundary>
          <HeroCanvas />
        </ErrorBoundary>
      ) : (
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 60% 40%, rgba(99,102,241,0.12) 0%, transparent 70%)",
          }}
        />
      )}

      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 55% 45% at 50% 50%, rgba(99,102,241,0.07) 0%, transparent 70%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-5xl mx-auto">
        {/* Title label */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <span
            className="text-xs tracking-[0.35em] uppercase mb-8 block"
            style={{ color: "var(--text-secondary)" }}
          >
            AI Product Engineer · Co-founder & CTO
          </span>
        </motion.div>

        {/* Name — letter-by-letter */}
        <h1
          ref={nameRef}
          className="font-display font-bold leading-none tracking-tight mb-6"
          style={{
            fontSize: "clamp(3.5rem, 11vw, 10rem)",
            color: "var(--text-primary)",
          }}
        >
          {"Kanwar ".split("").map((char, i) => (
            <span key={`k-${i}`} className="letter-wrap">
              <span className="letter inline-block" aria-hidden="true">
                {char === " " ? " " : char}
              </span>
            </span>
          ))}
          {" ".split("").map((char, i) => (
            <span key={`sp-${i}`} className="letter-wrap">
              <span className="letter inline-block" aria-hidden="true">&nbsp;</span>
            </span>
          ))}
          <span className="gradient-text">
            {"Kelide".split("").map((char, i) => (
              <span key={`kl-${i}`} className="letter-wrap">
                <span className="letter inline-block" aria-hidden="true">{char}</span>
              </span>
            ))}
          </span>
        </h1>

        {/* Tagline — word-by-word after headline */}
        <div
          ref={taglineRef}
          className="font-body text-xl md:text-2xl mb-10"
          style={{ color: "var(--text-secondary)", maxWidth: "520px", minHeight: "2em" }}
          aria-label={taglineText}
        >
          {taglineText.split(" ").map((word, i) => (
            <span key={i} className="word-wrap" style={{ display: "inline-block", overflow: "hidden", marginRight: "0.35em" }}>
              <span className="word inline-block" aria-hidden="true">{word}</span>
            </span>
          ))}
        </div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={headlineDone ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="flex gap-4 mb-16 flex-wrap justify-center"
        >
          <MagneticButton onClick={() => scrollTo("products")} variant="primary">
            View Work
          </MagneticButton>
          <MagneticButton onClick={() => scrollTo("contact")} variant="ghost">
            Get in Touch
          </MagneticButton>
        </motion.div>

        {/* Client strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={headlineDone ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.2 }}
          className="flex flex-col items-center gap-5"
        >
          <div className="w-24 h-px" style={{ background: "var(--border)" }} />
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
                style={{ color: "rgba(248,250,252,0.22)" }}
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
        transition={{ delay: 2.2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span
          className="text-xs tracking-[0.2em] uppercase"
          style={{ color: "var(--text-secondary)" }}
        >
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
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
    btn.style.transform = `translate(${x * 0.22}px, ${y * 0.22}px)`;
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
              boxShadow: "0 0 40px rgba(99,102,241,0.3), 0 0 80px rgba(99,102,241,0.1)",
            }
          : {
              background: "transparent",
              color: "var(--text-primary)",
              border: "1px solid rgba(255,255,255,0.14)",
            }
      }
    >
      {children}
    </button>
  );
}
