"use client";

import { useEffect, useRef, ReactNode } from "react";

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────
interface RevealProps {
    children: ReactNode;
    delay?: number;
    threshold?: number;
    className?: string;
}

interface ExpEntry {
    role: string;
    company: string;
    dates: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// Data  — edit these without touching JSX
// ─────────────────────────────────────────────────────────────────────────────
const TOOLS = [
    "React", "Next.js", "TypeScript", "Tailwind CSS",
    "HTML", "CSS", "JavaScript", "Figma",
    "Adobe Illustrator", "Framer Motion",
];

const EXPERIENCE: ExpEntry[] = [
    { role: "Website Developer", company: "@ NextArt Solutions", dates: "2023 – Present" },
];

// ─────────────────────────────────────────────────────────────────────────────
// Scroll-reveal wrapper
// Tailwind handles static styles; inline styles drive the JS animation state
// ─────────────────────────────────────────────────────────────────────────────
function Reveal({ children, delay = 0, threshold = 0.15, className = "" }: RevealProps) {
    const innerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = innerRef.current;
        if (!el) return;

        const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (reduced) {
            el.style.opacity = "1";
            el.style.transform = "translateY(0)";
            return;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        el.style.opacity = "1";
                        el.style.transform = "translateY(0)";
                    }, delay);
                    observer.disconnect();
                }
            },
            { threshold }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, [delay, threshold]);

    return (
        <div className={`overflow-hidden ${className}`}>
            <div
                ref={innerRef}
                style={{
                    opacity: 0,
                    transform: "translateY(44px)",
                    transition: "opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 0.9s cubic-bezier(0.16,1,0.3,1)",
                    willChange: "opacity, transform",
                }}
            >
                {children}
            </div>
        </div>
    );
}

// ─────────────────────────────────────────────────────────────────────────────
// Animated divider — scaleX 0 → 1 from left on scroll
// ─────────────────────────────────────────────────────────────────────────────
function Divider() {
    const lineRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = lineRef.current;
        if (!el) return;

        const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (reduced) { el.style.transform = "scaleX(1)"; return; }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    el.style.transform = "scaleX(1)";
                    observer.disconnect();
                }
            },
            { threshold: 0.4 }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    return (
        <div className="overflow-hidden w-full">
            <div
                ref={lineRef}
                className="h-px w-full bg-white/10"
                style={{
                    transform: "scaleX(0)",
                    transformOrigin: "left",
                    transition: "transform 1.2s cubic-bezier(0.16,1,0.3,1)",
                }}
            />
        </div>
    );
}

// ─────────────────────────────────────────────────────────────────────────────
// Page component
// ─────────────────────────────────────────────────────────────────────────────
export default function AboutPage() {
    return (
        <>
            {/* Font import — move to layout.tsx <head> for best performance */}
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap');
        .font-display { font-family: 'Barlow Condensed', 'Arial Narrow', sans-serif; }
        body { font-family: 'DM Sans', system-ui, sans-serif; }
      `}</style>

            <main className="min-h-screen bg-[#090909] text-[#f0ede8] antialiased overflow-x-hidden">

                {/* ══════════════════════════════════════════════════════
            S1 — Full-width hero title
        ══════════════════════════════════════════════════════ */}
                <section className="px-6 md:px-12 lg:px-20 pt-20 md:pt-28 max-w-[1400px] mx-auto">
                    <Reveal threshold={0.05}>
                        <h1
                            className="font-display font-extrabold uppercase tracking-[-0.045em] leading-[0.88]
                         bg-gradient-to-b from-[#f0ede8] to-[#f0ede8]/60
                         bg-clip-text text-transparent"
                            style={{ fontSize: "clamp(88px, 17vw, 260px)" }}
                        >
                            About
                        </h1>
                    </Reveal>
                </section>

                {/* ══════════════════════════════════════════════════════
            S2 — Two-column intro (text left / portrait right)
        ══════════════════════════════════════════════════════ */}
                <section className="grid grid-cols-1 md:grid-cols-[55fr_45fr] gap-8 lg:gap-16
                            px-6 md:px-12 lg:px-20 py-10 md:py-16 max-w-[1400px] mx-auto">

                    {/* Left — two text blocks */}
                    <div className="flex flex-col gap-6 md:gap-8 pt-3">
                        <Reveal delay={0}>
                            <p className="text-xs uppercase tracking-[0.2em] text-[#f0ede8]/40 font-light">
                                Based in Pakistan &nbsp;·&nbsp; Available worldwide
                            </p>
                        </Reveal>
                        <Reveal delay={120}>
                            <p className="text-[clamp(19px,2vw,26px)] text-[#f0ede8] leading-[1.5] font-light max-w-[480px]">
                                I&apos;m Muhammad Ali — a website developer who crafts{" "}
                                <em className="not-italic text-[#f55200]">refined digital experiences</em>{" "}
                                that feel as good as they look.
                            </p>
                        </Reveal>
                    </div>

                    {/* Right — portrait */}
                    <Reveal delay={60} threshold={0.1}>
                        <div
                            className="relative aspect-[4/5] overflow-hidden bg-[#0e0e0e]"
                            role="img"
                            aria-label="Portrait of Muhammad Ali"
                        >
                            <img
                                src="/portrait.jpg"
                                alt="Muhammad Ali"
                                className="w-full h-full object-cover brightness-[0.85] saturate-90 block"
                                onError={(e) => {
                                    (e.target as HTMLImageElement).style.display = "none";
                                }}
                            />
                            {/* Fallback gradient if image fails */}
                            <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a] via-[#111] to-[#0d0d0d]
                              flex items-center justify-center -z-10
                              text-[#f0ede8]/15 text-[11px] tracking-[0.15em] uppercase">
                                Portrait
                            </div>
                            {/* Vignette */}
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent
                              to-[#090909]/60 pointer-events-none" />
                            {/* Grain */}
                            <div
                                className="absolute inset-0 opacity-[0.035] pointer-events-none"
                                style={{
                                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)'/%3E%3C/svg%3E")`,
                                    backgroundRepeat: "repeat",
                                }}
                            />
                        </div>
                    </Reveal>
                </section>

                {/* ══════════════════════════════════════════════════════
            S3 — Full-width statement paragraph
        ══════════════════════════════════════════════════════ */}
                <section className="px-6 md:px-12 lg:px-20 pb-14 md:pb-20 max-w-[1400px] mx-auto">
                    <Reveal threshold={0.2}>
                        <p className="text-[clamp(15px,1.4vw,18px)] text-[#f0ede8]/40 leading-[1.9]
                          font-light italic max-w-[860px]">
                            &ldquo;I focus on understanding your goals to create visually stunning,
                            user-friendly websites that perform flawlessly. Combining creative design and
                            cutting-edge technology, I deliver results that make an impact from day
                            one.&rdquo;
                        </p>
                    </Reveal>
                </section>

                {/* ── Divider 1 ── */}
                <div className="px-6 md:px-12 lg:px-20 max-w-[1400px] mx-auto">
                    <Divider />
                </div>

                {/* ══════════════════════════════════════════════════════
            S4 — Tools
        ══════════════════════════════════════════════════════ */}
                <section
                    className="px-6 md:px-12 lg:px-20 py-10 md:py-16 max-w-[1400px] mx-auto"
                    aria-label="Tools and skills"
                >
                    <div className="grid grid-cols-1 md:grid-cols-[40fr_60fr] gap-4 md:gap-12 items-start">
                        <Reveal delay={0} threshold={0.2}>
                            <span className="text-[11px] tracking-[0.22em] uppercase text-[#f55200]
                               font-medium block pt-1">
                                Tools
                            </span>
                        </Reveal>
                        <Reveal delay={100} threshold={0.2}>
                            <p
                                className="text-[clamp(14px,1.3vw,16px)] text-[#f0ede8] leading-[2.1] font-light"
                                aria-label={`Technologies: ${TOOLS.join(", ")}`}
                            >
                                {TOOLS.map((tool, i) => (
                                    <span key={tool}>
                                        {tool}
                                        {i < TOOLS.length - 1 && (
                                            <span
                                                className="text-[#f55200] mx-2.5 text-[0.8em] align-middle"
                                                aria-hidden="true"
                                            >
                                                ·
                                            </span>
                                        )}
                                    </span>
                                ))}
                            </p>
                        </Reveal>
                    </div>
                </section>

                {/* ── Divider 2 ── */}
                <div className="px-6 md:px-12 lg:px-20 max-w-[1400px] mx-auto">
                    <Divider />
                </div>

                {/* ══════════════════════════════════════════════════════
            S5 — Experience
        ══════════════════════════════════════════════════════ */}
                <section
                    className="px-6 md:px-12 lg:px-20 py-10 md:py-16 max-w-[1400px] mx-auto"
                    aria-label="Work experience"
                >
                    <div className="grid grid-cols-1 md:grid-cols-[40fr_60fr] gap-4 md:gap-12 items-start">
                        <Reveal delay={0} threshold={0.2}>
                            <span className="text-[11px] tracking-[0.22em] uppercase text-[#f55200]
                               font-medium block pt-1">
                                Experience
                            </span>
                        </Reveal>
                        <div>
                            {EXPERIENCE.map((exp, i) => (
                                <Reveal key={i} delay={i * 100} threshold={0.2}>
                                    <div
                                        className={i > 0 ? "mt-9 pt-9 border-t border-white/[0.08]" : ""}
                                    >
                                        <p className="text-[clamp(17px,1.6vw,20px)] font-medium text-[#f0ede8]
                                  mb-2 tracking-[-0.01em]">
                                            {exp.role}
                                        </p>
                                        <p className="text-[13px] text-[#f0ede8]/40 tracking-[0.04em] mb-1">
                                            {exp.company}
                                        </p>
                                        <p className="text-[12px] text-[#f0ede8]/25 tracking-[0.06em]">
                                            {exp.dates}
                                        </p>
                                    </div>
                                </Reveal>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── Divider 3 ── */}
                <div className="px-6 md:px-12 lg:px-20 max-w-[1400px] mx-auto">
                    <Divider />
                </div>

                {/* ══════════════════════════════════════════════════════
            S6 — CTA glass banner
        ══════════════════════════════════════════════════════ */}
                <section
                    className="relative w-full flex items-center justify-center overflow-hidden
                     min-h-[560px] px-6 md:px-12 lg:px-20
                     py-[clamp(60px,8vw,120px)] mt-6 md:mt-10"
                    aria-label="Contact call to action"
                >
                    {/* Background layers */}
                    <div className="absolute inset-0 bg-[#0e0e0e]" />
                    <div
                        className="absolute inset-0"
                        style={{
                            background:
                                "radial-gradient(ellipse 70% 60% at 20% 60%, rgba(245,82,0,0.1) 0%, transparent 70%)",
                        }}
                    />
                    <div
                        className="absolute inset-0"
                        style={{
                            background:
                                "radial-gradient(ellipse 50% 50% at 85% 25%, rgba(245,82,0,0.06) 0%, transparent 65%)",
                        }}
                    />
                    <div
                        className="absolute inset-0"
                        style={{
                            backgroundImage:
                                "radial-gradient(circle, rgba(240,237,232,0.07) 1px, transparent 1px)",
                            backgroundSize: "28px 28px",
                        }}
                    />

                    {/* Glass card */}
                    <div
                        className="relative z-10 w-full max-w-[800px] text-center flex flex-col
                       items-center gap-6 px-8 md:px-16 lg:px-24 py-12 md:py-20
                       border border-white/[0.11]
                       shadow-[0_40px_100px_rgba(0,0,0,0.55),inset_0_1px_0_rgba(255,255,255,0.07)]"
                        style={{
                            backdropFilter: "blur(28px) saturate(1.2)",
                            WebkitBackdropFilter: "blur(28px) saturate(1.2)",
                            background: "rgba(255,255,255,0.05)",
                        }}
                    >
                        <Reveal delay={0} threshold={0.2}>
                            <span className="text-[10px] tracking-[0.28em] uppercase text-[#f55200] font-medium">
                                Contact Us
                            </span>
                        </Reveal>

                        <Reveal delay={100} threshold={0.2}>
                            <h2
                                className="font-display font-extrabold uppercase tracking-[-0.03em]
                           leading-none text-[#f0ede8]"
                                style={{ fontSize: "clamp(38px,5.5vw,64px)" }}
                            >
                                Ready to Transform
                                <br />
                                Your Vision?
                            </h2>
                        </Reveal>

                        <Reveal delay={200} threshold={0.2}>
                            <p className="text-[clamp(14px,1.2vw,15px)] text-[#f0ede8]/40 leading-[1.8]
                            font-light max-w-[440px]">
                                Let&apos;s build something extraordinary together. Share your idea and I&apos;ll
                                get back to you within 24 hours to discuss next steps.
                            </p>
                        </Reveal>

                        <Reveal delay={300} threshold={0.2}>
                            <a
                                href="/contact"
                                className="inline-flex items-center gap-2.5 px-10 py-[15px]
                           bg-transparent border border-[#f55200] text-[#f0ede8]
                           text-[12px] font-medium tracking-[0.14em] uppercase
                           transition-all duration-300 ease-out
                           hover:bg-[#f55200] hover:text-white
                           hover:shadow-[0_0_40px_rgba(245,82,0,0.35),0_0_80px_rgba(245,82,0,0.15)]
                           focus-visible:outline focus-visible:outline-2
                           focus-visible:outline-[#f55200] focus-visible:outline-offset-4"
                            >
                                Get In Touch <span aria-hidden="true">→</span>
                            </a>
                        </Reveal>
                    </div>
                </section>

            </main>
        </>
    );
} 9