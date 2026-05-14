import Nav from "@/components/ui/Nav";
import Hero from "@/components/sections/Hero";
import WhatIDo from "@/components/sections/WhatIDo";
import CareerArc from "@/components/sections/CareerArc";
import Products from "@/components/sections/Products";
import Impact from "@/components/sections/Impact";
import TechStack from "@/components/sections/TechStack";
import About from "@/components/sections/About";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <main style={{ background: "var(--bg)" }}>
      <Nav />
      <Hero />
      <WhatIDo />
      <CareerArc />
      <Products />
      <Impact />
      <TechStack />
      <About />
      <Contact />
    </main>
  );
}
