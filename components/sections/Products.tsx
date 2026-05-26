"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const products = [
  {
    name: "dwij.io",
    status: "Live",
    statusColor: "#22c55e",
    desc: "RAG over 18 UPSC textbooks. Domain-specialized, not a ChatGPT wrapper. 1,000+ users waitlisted.",
    tags: ["Next.js", "pgvector", "Claude", "Supabase"],
    href: "https://dwij.io",
    accent: "#6366f1",
    url: "dwij.io",
    yOffset: 0,
  },
  {
    name: "Ecom Shakti",
    status: "Live",
    statusColor: "#22c55e",
    desc: "Seller management platform for Indian SMBs on Meesho, Amazon India, Flipkart. WhatsApp-first sales motion.",
    tags: ["Next.js", "Tailwind", "Vercel"],
    href: "https://ecomshakti.com",
    accent: "#06b6d4",
    url: "ecomshakti.com",
    yOffset: 32,
  },
  {
    name: "ApnaMaali.com",
    status: "Building",
    statusColor: "#f59e0b",
    desc: "Gardener-as-a-service. Full stack from backend to deployment. Hyperlocal service marketplace.",
    tags: ["Django", "Firebase"],
    href: undefined,
    accent: "#6366f1",
    url: "apnamaali.com",
    yOffset: -16,
  },
];

export default function Products() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="products" className="section-pad px-6 max-w-6xl mx-auto">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
        className="mb-4"
      >
        <span className="text-xs tracking-[0.3em] uppercase block mb-4" style={{ color: "var(--text-secondary)" }}>
          Own work
        </span>
        <h2 className="font-display font-bold text-4xl md:text-5xl mb-3" style={{ color: "var(--text-primary)" }}>
          What I&apos;ve Built
        </h2>
        <p className="font-body text-base" style={{ color: "var(--text-secondary)" }}>
          Own products — zero to shipped.
        </p>
      </motion.div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-5 items-start">
        {products.map((p, i) => (
          <ProductCard key={p.name} product={p} delay={i * 0.12} inView={inView} />
        ))}
      </div>
    </section>
  );
}

function ProductCard({
  product,
  delay,
  inView,
}: {
  product: (typeof products)[0];
  delay: number;
  inView: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(1000px) rotateX(${-y * 12}deg) rotateY(${x * 12}deg) translateZ(10px)`;
  };

  const handleMouseLeave = () => {
    if (cardRef.current)
      cardRef.current.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0)";
  };

  const Wrapper = product.href ? "a" : "div";

  return (
    <motion.div
      initial={{ clipPath: "inset(100% 0 0 0)", opacity: 0 }}
      animate={inView ? { clipPath: "inset(0% 0 0 0)", opacity: 1 } : {}}
      transition={{ duration: 0.75, delay, ease: [0.16, 1, 0.3, 1] }}
      style={{ marginTop: product.yOffset }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transition: "transform 0.15s ease",
          willChange: "transform",
        }}
      >
        <Wrapper
          {...(product.href ? { href: product.href, target: "_blank", rel: "noopener noreferrer" } : {})}
          className="block no-underline"
        >
          <div
            className="glow-border rounded-2xl overflow-hidden flex flex-col"
            style={{ background: "var(--surface)", backdropFilter: "blur(12px)" }}
          >
            {/* Browser chrome mockup */}
            <div
              className="flex items-center gap-3 px-4 h-10 flex-shrink-0"
              style={{
                background: "rgba(255,255,255,0.04)",
                borderBottom: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: "rgba(239,68,68,0.5)" }} />
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: "rgba(234,179,8,0.5)" }} />
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: "rgba(34,197,94,0.5)" }} />
              </div>
              <div
                className="flex-1 h-5 rounded-full flex items-center px-3"
                style={{ background: "rgba(255,255,255,0.05)" }}
              >
                <span style={{ fontSize: "9px", color: "rgba(248,250,252,0.25)", fontFamily: "var(--font-body)" }}>
                  {product.url}
                </span>
              </div>
            </div>

            {/* Card content */}
            <div className="p-8 flex flex-col flex-1">
              <div className="flex items-start justify-between mb-5">
                <h3 className="font-display font-bold text-2xl" style={{ color: "var(--text-primary)" }}>
                  {product.name}
                </h3>
                <span
                  className="text-xs px-2.5 py-1 rounded-full font-medium mt-1 flex-shrink-0"
                  style={{
                    background: `${product.statusColor}15`,
                    color: product.statusColor,
                    border: `1px solid ${product.statusColor}30`,
                  }}
                >
                  {product.status}
                </span>
              </div>

              <p className="font-body text-sm leading-relaxed flex-1 mb-6" style={{ color: "rgba(248,250,252,0.65)" }}>
                {product.desc}
              </p>

              <div className="flex flex-wrap gap-2 mb-5">
                {product.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-3 py-1 rounded-full font-body"
                    style={{
                      background: `${product.accent}12`,
                      color: product.accent === "#6366f1" ? "#a5b4fc" : "#67e8f9",
                      border: `1px solid ${product.accent}25`,
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {product.href && (
                <div
                  className="flex items-center gap-2 text-xs font-display font-medium tracking-wide"
                  style={{ color: product.accent }}
                >
                  <span>Visit</span>
                  <span>→</span>
                </div>
              )}
            </div>
          </div>
        </Wrapper>
      </div>
    </motion.div>
  );
}
