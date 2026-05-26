"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import dynamic from "next/dynamic";
import { ErrorBoundary } from "@/components/ui/ErrorBoundary";
import {
  SiPython, SiJavascript, SiDart, SiNextdotjs, SiNestjs,
  SiDjango, SiFlutter, SiTailwindcss, SiPostgresql, SiMongodb,
  SiDocker, SiGooglecloud,
  SiAnthropic, SiGithub, SiVercel, SiPerplexity,
} from "react-icons/si";
import { FaAws } from "react-icons/fa";
import { VscDatabase } from "react-icons/vsc";
import { MdStackedBarChart, MdPivotTableChart } from "react-icons/md";
import { BsCursorFill } from "react-icons/bs";
import { RiRobot2Line } from "react-icons/ri";
import type { IconType } from "react-icons";

const OrbitCloud = dynamic(() => import("@/components/three/OrbitCloud"), { ssr: false });

type Tool = { name: string; Icon: IconType; color: string };

const buildStack: Tool[] = [
  { name: "Python",     Icon: SiPython,         color: "#3776AB" },
  { name: "SQL",        Icon: VscDatabase,       color: "#f59e0b" },
  { name: "JavaScript", Icon: SiJavascript,      color: "#F7DF1E" },
  { name: "Dart",       Icon: SiDart,            color: "#0175C2" },
  { name: "Next.js",    Icon: SiNextdotjs,       color: "#ffffff" },
  { name: "Nest.js",    Icon: SiNestjs,          color: "#E0234E" },
  { name: "Django",     Icon: SiDjango,          color: "#092E20" },
  { name: "Flutter",    Icon: SiFlutter,         color: "#02569B" },
  { name: "Tailwind",   Icon: SiTailwindcss,     color: "#06B6D4" },
  { name: "PostgreSQL", Icon: SiPostgresql,      color: "#4169E1" },
  { name: "MongoDB",    Icon: SiMongodb,         color: "#47A248" },
  { name: "Docker",     Icon: SiDocker,          color: "#2496ED" },
  { name: "GCP",        Icon: SiGooglecloud,     color: "#4285F4" },
  { name: "AWS",        Icon: FaAws,             color: "#FF9900" },
  { name: "Power BI",   Icon: MdStackedBarChart, color: "#F2C811" },
  { name: "Tableau",    Icon: MdPivotTableChart, color: "#E97627" },
];

const aiTools: Tool[] = [
  { name: "Claude",         Icon: SiAnthropic,  color: "#D4A574" },
  { name: "Cursor",         Icon: BsCursorFill, color: "#ffffff" },
  { name: "GitHub Copilot", Icon: SiGithub,     color: "#ffffff" },
  { name: "NotebookLM",     Icon: RiRobot2Line, color: "#4285F4" },
  { name: "Lovable",        Icon: RiRobot2Line, color: "#e879f9" },
  { name: "Vercel v0",      Icon: SiVercel,     color: "#ffffff" },
  { name: "Perplexity",     Icon: SiPerplexity, color: "#20B2AA" },
  { name: "Windsurf",       Icon: BsCursorFill, color: "#06b6d4" },
];

function LogoChip({ tool, delay, inView, accent }: { tool: Tool; delay: number; inView: boolean; accent: "indigo" | "cyan" }) {
  const glowColor = accent === "indigo" ? "#6366f1" : "#06b6d4";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 12 }}
      animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
      transition={{ duration: 0.35, delay }}
      whileHover={{ y: -5, scale: 1.1 }}
      className="flex flex-col items-center gap-2 cursor-default"
      style={{ willChange: "transform" }}
    >
      <div
        className="w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300"
        style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
        onMouseEnter={(e) => {
          const el = e.currentTarget as HTMLDivElement;
          el.style.borderColor = `${glowColor}60`;
          el.style.boxShadow = `0 0 24px ${glowColor}30, 0 0 48px ${glowColor}12`;
          el.style.background = `${glowColor}12`;
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget as HTMLDivElement;
          el.style.borderColor = "rgba(255,255,255,0.08)";
          el.style.boxShadow = "none";
          el.style.background = "rgba(255,255,255,0.04)";
        }}
      >
        <tool.Icon size={26} style={{ color: tool.color }} />
      </div>
      <span className="font-body text-center leading-tight" style={{ color: "rgba(248,250,252,0.35)", fontSize: "10px", maxWidth: "56px" }}>
        {tool.name}
      </span>
    </motion.div>
  );
}

export default function TechStack() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  return (
    <section id="stack" className="section-pad px-6 max-w-5xl mx-auto">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
        className="mb-10"
      >
        <span className="text-xs tracking-[0.3em] uppercase block mb-4" style={{ color: "var(--text-secondary)" }}>
          Tools
        </span>
        <h2 className="font-display font-bold text-4xl md:text-5xl" style={{ color: "var(--text-primary)" }}>
          How I Build
        </h2>
      </motion.div>

      {/* 3D Orbit Cloud — desktop only */}
      {!isMobile && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.3 }}
          style={{ height: "460px", width: "100%", position: "relative" }}
        >
          <ErrorBoundary>
            <OrbitCloud />
          </ErrorBoundary>
        </motion.div>
      )}

      {/* Legend labels */}
      <div className="flex gap-6 mb-10 mt-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-px" style={{ background: "#a5b4fc" }} />
          <span className="font-body text-xs tracking-[0.2em] uppercase" style={{ color: "var(--text-secondary)" }}>Build Stack</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-px" style={{ background: "#67e8f9" }} />
          <span className="font-body text-xs tracking-[0.2em] uppercase" style={{ color: "var(--text-secondary)" }}>AI Tools</span>
        </div>
      </div>

      {/* Chip grid — always visible as reference */}
      <div className="space-y-12">
        <div>
          <motion.span
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xs tracking-[0.25em] uppercase block mb-8"
            style={{ color: "var(--text-secondary)" }}
          >
            Build Stack
          </motion.span>
          <div className="flex flex-wrap gap-6">
            {buildStack.map((tool, i) => (
              <LogoChip key={tool.name} tool={tool} accent="indigo" delay={0.25 + i * 0.04} inView={inView} />
            ))}
          </div>
        </div>

        <div className="w-full h-px" style={{ background: "var(--border)" }} />

        <div>
          <motion.span
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.9 }}
            className="text-xs tracking-[0.25em] uppercase block mb-8"
            style={{ color: "var(--text-secondary)" }}
          >
            AI Tools · Daily Workflow
          </motion.span>
          <div className="flex flex-wrap gap-6">
            {aiTools.map((tool, i) => (
              <LogoChip key={tool.name} tool={tool} accent="cyan" delay={0.95 + i * 0.07} inView={inView} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
