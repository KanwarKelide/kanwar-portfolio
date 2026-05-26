"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
    });

    let stopDriving: (() => void) | undefined;

    // Try to drive Lenis via GSAP ticker for proper ScrollTrigger sync
    import("@/lib/gsap")
      .then(({ gsap, ScrollTrigger }) => {
        const tickerCb = (time: number) => lenis.raf(time * 1000);
        gsap.ticker.add(tickerCb);
        gsap.ticker.lagSmoothing(0);

        const scrollCb = () => ScrollTrigger.update();
        lenis.on("scroll", scrollCb);

        stopDriving = () => {
          gsap.ticker.remove(tickerCb);
          lenis.off("scroll", scrollCb);
        };
      })
      .catch(() => {
        // GSAP unavailable — use native RAF loop
        let animFrameId: number;
        const raf = (time: number) => {
          lenis.raf(time);
          animFrameId = requestAnimationFrame(raf);
        };
        animFrameId = requestAnimationFrame(raf);
        stopDriving = () => cancelAnimationFrame(animFrameId);
      });

    return () => {
      stopDriving?.();
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
