"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
    });

    lenisRef.current = lenis;

    let animFrameId: number;

    function raf(time: number) {
      lenis.raf(time);
      animFrameId = requestAnimationFrame(raf);
    }

    animFrameId = requestAnimationFrame(raf);

    // Wire up GSAP ScrollTrigger if available (non-blocking)
    let cleanup: (() => void) | undefined;
    import("@/lib/gsap")
      .then(({ gsap, ScrollTrigger }) => {
        lenis.on("scroll", ScrollTrigger.update);
        cleanup = () => {
          lenis.off("scroll", ScrollTrigger.update);
          ScrollTrigger.getAll().forEach((t) => t.kill());
        };
      })
      .catch(() => {
        // GSAP not available, continue without ScrollTrigger sync
      });

    return () => {
      cancelAnimationFrame(animFrameId);
      lenis.destroy();
      cleanup?.();
    };
  }, []);

  return <>{children}</>;
}
