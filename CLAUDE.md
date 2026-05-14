# Kanwar Kelide — Portfolio

Personal portfolio website. Used for job applications and investor introductions.

## Project goal
Modern, 3D animated portfolio showcasing Kanwar as an AI Product Engineer and Co-founder. Target audience: hiring managers, technical leads, investors.

## Stack
- Next.js 14 App Router + TypeScript (strict)
- Tailwind CSS
- React Three Fiber (@react-three/fiber + @react-three/drei) for 3D
- Framer Motion for scroll/entry animations
- GSAP + ScrollTrigger for timeline pinning
- Lenis for smooth scroll
- pnpm

## Design system
- Background: #050508
- Accent gradient: #6366f1 (indigo) → #06b6d4 (cyan)
- Text primary: #f8fafc
- Text secondary: #64748b
- Surface: rgba(255,255,255,0.04) glassmorphism
- Font headings: Clash Display
- Font body: Geist

## Sections (in order)
1. Hero — particle field + floating geometry (R3F), magnetic CTA buttons
2. What I Do — 4 pillars, 3D tilt cards on hover
3. Career Arc — horizontal scroll tunnel, 3 beats (Olectra → EvaluServe → CodeClowns)
4. Products — dwij.io, Ecom Shakti, ApnaMaali (own products only, no EvaluServe NDA work)
5. Impact Numbers — animated counters with ring geometry
6. Tech Stack — split into Build stack and AI Tools, orbiting chip cloud
7. About — word-by-word text reveal on scroll
8. Contact — 3D orb, email + LinkedIn + GitHub links

## Content locked
- Name: Kanwar Kelide
- Title: AI Product Engineer · Co-founder & CTO
- Hero one-liner: "I build AI products that ship."
- No headshot — typographic hero with 3D canvas
- Client logos (no product details, NDA): Mastercard, AstraZeneca, Clarivate, Olectra
- Contact: kelide1996@gmail.com · linkedin.com/in/kanwar-kelide · github.com/KanwarKelide

## Impact numbers
- 30% decision latency cut (Mastercard)
- 15,000 kWh/month saved (Olectra)
- 40% operational efficiency gain (Olectra)
- 1,000+ electric buses monitored
- 1,000+ users waitlisted (dwij.io)
- 3 products live (CodeClowns)

## Tech stack content
Build: Python · SQL · JavaScript · Dart · Next.js · Nest.js · Django · Flutter · Tailwind · PostgreSQL · MongoDB · Docker · GCP · AWS · Power BI · Tableau
AI Tools: Claude · Cursor · GitHub Copilot · NotebookLM · Lovable · Vercel v0 · Perplexity · Windsurf

## Hard rules
- No EvaluServe product names or details anywhere (NDA)
- Client logos only — no project descriptions for enterprise work
- No placeholder/fake metrics — only use numbers from resume and screenshots
- No stock photos or generic illustrations
- All animations must be performant — use will-change and GPU-composited properties only
- Mobile responsive — animations gracefully degrade on mobile
