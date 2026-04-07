"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AboutPage() {
    const pageRef = useRef<HTMLDivElement>(null);
    const divider1Ref = useRef<HTMLDivElement>(null);
    const divider2Ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const page = pageRef.current;
        const divider1 = divider1Ref.current;
        const divider2 = divider2Ref.current;
        if (!page) return;

        // ── All reveal elements ──
        const revealEls = page.querySelectorAll(".reveal");
        gsap.set(revealEls, { y: 50, opacity: 0 });

        revealEls.forEach((el) => {
            ScrollTrigger.create({
                trigger: el,
                start: "top 88%",
                onEnter: () => {
                    gsap.to(el, {
                        y: 0,
                        opacity: 1,
                        duration: 0.9,
                        ease: "power3.out",
                    });
                },
                once: true,
            });
        });

        // ── Divider 1 ──
        if (divider1) {
            gsap.set(divider1, { scaleX: 0, transformOrigin: "left center" });
            ScrollTrigger.create({
                trigger: divider1,
                start: "top 85%",
                onEnter: () => {
                    gsap.to(divider1, {
                        scaleX: 1,
                        duration: 1.4,
                        ease: "power3.inOut",
                    });
                },
                once: true,
            });
        }

        // ── Divider 2 ──
        if (divider2) {
            gsap.set(divider2, { scaleX: 0, transformOrigin: "left center" });
            ScrollTrigger.create({
                trigger: divider2,
                start: "top 85%",
                onEnter: () => {
                    gsap.to(divider2, {
                        scaleX: 1,
                        duration: 1.4,
                        ease: "power3.inOut",
                    });
                },
                once: true,
            });
        }

        return () => {
            ScrollTrigger.getAll().forEach((t) => t.kill());
        };
    }, []);

    const tools = [
        "React",
        "Next.js",
        "HTML",
        "CSS",
        "JavaScript",
        "Illustrator",
        "Figma",
        "Tailwind CSS",
        "GSAP",
        "TypeScript",
        "Node.js",
        "Framer Motion",
    ];

    return (
        <div
            ref={pageRef}
            className="min-h-screen w-full"
            style={{ background: "#000" }}
        >


            {/* ════════════════════════════════
          SECTION 1 — Page Title
      ════════════════════════════════ */}
            <section className="w-full px-6 pb-0 pt-32 md:px-12 lg:px-20">
                <div className="overflow-hidden">
                    <h1
                        className="reveal block w-full font-[family-name:var(--font-montserrat)] font-[400] uppercase leading-none text-white"
                        style={{
                            fontSize: "clamp(80px, 24vw, 24vw)",
                            letterSpacing: "-0.07em",
                        }}
                    >
                        About
                    </h1>
                </div>
            </section>

            {/* ════════════════════════════════
          SECTION 2 — Two Column Intro
      ════════════════════════════════ */}
            <section className="w-full px-6 py-16 md:px-12 lg:px-20">
                <div className="flex flex-col gap-12 md:flex-row md:gap-16">

                    {/* Left Column — Text */}
                    <div className="flex flex-col justify-between gap-10 md:w-[55%]">

                        {/* Small intro */}
                        <div className="overflow-hidden">
                            <p
                                className="reveal block font-[family-name:var(--font-montserrat)] font-light leading-relaxed"
                                style={{ fontSize: "14px", color: "rgba(255,255,255,0.45)" }}
                            >
                                Based in Karachi, Pakistan — I'm a full-stack designer and
                                developer crafting digital experiences that are as functional
                                as they are beautiful.
                            </p>
                        </div>

                        {/* Large personal statement */}
                        <div className="overflow-hidden">
                            <p
                                className="reveal block font-[family-name:var(--font-montserrat)] font-medium leading-[1.3] text-white"
                                style={{ fontSize: "clamp(20px, 2.2vw, 28px)" }}
                            >
                                I bridge the gap between design and development — turning bold
                                ideas into pixel-perfect, high-performance digital products
                                that leave a lasting impression.
                            </p>
                        </div>
                    </div>

                    {/* Right Column — Portrait Image */}
                    <div className="relative md:w-[45%]">
                        <div
                            className="reveal relative w-full overflow-hidden rounded-2xl"
                            style={{ aspectRatio: "3/4" }}
                        >
                            <img
                                src="/images/portrait.jpg"
                                alt="Muhammad Ali"
                                className="h-full w-full object-cover"
                                style={{ filter: "brightness(0.85) contrast(1.05)" }}
                            />
                            {/* Subtle vignette overlay */}
                            <div
                                className="absolute inset-0"
                                style={{
                                    background:
                                        "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.5) 100%)",
                                }}
                            />
                            {/* Grain overlay */}
                            <div
                                className="absolute inset-0 opacity-20"
                                style={{
                                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
                                    backgroundSize: "128px 128px",
                                }}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* ════════════════════════════════
          SECTION 3 — Full Width Statement
      ════════════════════════════════ */}
            <section className="w-full px-6 pb-20 md:px-12 lg:px-20">
                <div className="overflow-hidden max-w-5xl">
                    <p
                        className="reveal block font-[family-name:var(--font-montserrat)] font-light leading-[1.7]"
                        style={{
                            fontSize: "clamp(16px, 1.8vw, 20px)",
                            color: "rgba(255,255,255,0.55)",
                        }}
                    >
                        I focus on understanding your goals to create visually stunning,
                        user-friendly websites that perform flawlessly. Combining creative
                        design and cutting-edge technology, I deliver results that make an
                        impact from day one.
                    </p>
                </div>
            </section>

            {/* ── DIVIDER 1 ── */}
            <div className="px-6 md:px-12 lg:px-20">
                <div
                    ref={divider1Ref}
                    className="h-px w-full"
                    style={{ background: "rgba(255,255,255,0.1)" }}
                />
            </div>

            {/* ════════════════════════════════
          SECTION 4 — Tools
      ════════════════════════════════ */}
            <section className="w-full px-6 py-20 md:px-12 lg:px-20">
                <div className="flex flex-col gap-8 md:flex-row md:gap-16">

                    {/* Left: Label */}
                    <div className="md:w-[40%]">
                        <div className="overflow-hidden">
                            <span
                                className="reveal block font-[family-name:var(--font-montserrat)] font-bold uppercase tracking-[0.3em]"
                                style={{ fontSize: "12px", color: "#f55200" }}
                            >
                                Tools
                            </span>
                        </div>
                    </div>

                    {/* Right: Tools List */}
                    <div className="md:w-[60%]">
                        <div className="overflow-hidden">
                            <p
                                className="reveal block font-[family-name:var(--font-montserrat)] font-light leading-[2]"
                                style={{
                                    fontSize: "clamp(15px, 1.5vw, 17px)",
                                    color: "rgba(255,255,255,0.85)",
                                }}
                            >
                                {tools.map((tool, i) => (
                                    <span key={i}>
                                        <span className="text-white">{tool}</span>
                                        {i < tools.length - 1 && (
                                            <span
                                                className="mx-3"
                                                style={{ color: "#f55200" }}
                                            >
                                                ·
                                            </span>
                                        )}
                                    </span>
                                ))}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── DIVIDER 2 ── */}
            <div className="px-6 md:px-12 lg:px-20">
                <div
                    ref={divider2Ref}
                    className="h-px w-full"
                    style={{ background: "rgba(255,255,255,0.1)" }}
                />
            </div>

            {/* ════════════════════════════════
          SECTION 5 — Experience
      ════════════════════════════════ */}
            <section className="w-full px-6 py-20 md:px-12 lg:px-20">
                <div className="flex flex-col gap-8 md:flex-row md:gap-16">

                    {/* Left: Label */}
                    <div className="md:w-[40%]">
                        <div className="overflow-hidden">
                            <span
                                className="reveal block font-[family-name:var(--font-montserrat)] font-bold uppercase tracking-[0.3em]"
                                style={{ fontSize: "12px", color: "#f55200" }}
                            >
                                Experience
                            </span>
                        </div>
                    </div>

                    {/* Right: Experience Entries */}
                    <div className="flex flex-col gap-10 md:w-[60%]">

                        {/* Entry 1 */}
                        <div className="flex flex-col gap-2">
                            <div className="overflow-hidden">
                                <h3
                                    className="reveal block font-[family-name:var(--font-montserrat)] font-semibold text-white"
                                    style={{ fontSize: "clamp(18px, 2vw, 22px)" }}
                                >
                                    Website Developer
                                </h3>
                            </div>
                            <div className="overflow-hidden">
                                <p
                                    className="reveal block font-[family-name:var(--font-montserrat)] font-light"
                                    style={{ fontSize: "13px", color: "rgba(255,255,255,0.45)" }}
                                >
                                    @ NextArt Solutions
                                </p>
                            </div>
                            <div className="overflow-hidden">
                                <p
                                    className="reveal block font-[family-name:var(--font-montserrat)] font-light"
                                    style={{ fontSize: "13px", color: "rgba(255,255,255,0.3)" }}
                                >
                                    2023 – Present
                                </p>
                            </div>
                        </div>

                        {/* Entry 2 — Add more as needed */}
                        <div className="flex flex-col gap-2">
                            <div className="overflow-hidden">
                                <h3
                                    className="reveal block font-[family-name:var(--font-montserrat)] font-semibold text-white"
                                    style={{ fontSize: "clamp(18px, 2vw, 22px)" }}
                                >
                                    UI/UX Designer
                                </h3>
                            </div>
                            <div className="overflow-hidden">
                                <p
                                    className="reveal block font-[family-name:var(--font-montserrat)] font-light"
                                    style={{ fontSize: "13px", color: "rgba(255,255,255,0.45)" }}
                                >
                                    @ Freelance
                                </p>
                            </div>
                            <div className="overflow-hidden">
                                <p
                                    className="reveal block font-[family-name:var(--font-montserrat)] font-light"
                                    style={{ fontSize: "13px", color: "rgba(255,255,255,0.3)" }}
                                >
                                    2021 – 2023
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ════════════════════════════════
          SECTION 6 — CTA Glass Banner
      ════════════════════════════════ */}
            <section className="relative w-full overflow-hidden px-6 py-24 md:px-12 lg:px-20">

                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="/images/cta-bg.jpg"
                        alt="CTA Background"
                        className="h-full w-full object-cover"
                        style={{ filter: "brightness(0.4)" }}
                    />
                    <div className="absolute inset-0 bg-black/40" />
                </div>

                {/* Glass Card */}
                <div
                    className="relative z-10 mx-auto flex w-full max-w-3xl flex-col items-center justify-center rounded-[2.5rem] p-10 text-center md:p-16"
                    style={{
                        background: "rgba(255,255,255,0.07)",
                        border: "1px solid rgba(255,255,255,0.12)",
                        backdropFilter: "blur(20px)",
                        WebkitBackdropFilter: "blur(20px)",
                        boxShadow: "0 8px 80px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08)",
                    }}
                >
                    {/* Label */}
                    <div className="overflow-hidden mb-5">
                        <span
                            className="reveal block font-[family-name:var(--font-montserrat)] text-[10px] font-bold uppercase tracking-[0.4em]"
                            style={{ color: "#f55200" }}
                        >
                            Contact Us
                        </span>
                    </div>

                    {/* Headline */}
                    <div className="overflow-hidden mb-6">
                        <h2
                            className="reveal block font-[family-name:var(--font-montserrat)] font-black uppercase leading-[1.05] tracking-tight text-white"
                            style={{ fontSize: "clamp(32px, 4vw, 52px)" }}
                        >
                            Ready to Transform<br />Your Vision?
                        </h2>
                    </div>

                    {/* Paragraph */}
                    <div className="overflow-hidden mb-10 max-w-md">
                        <p
                            className="reveal block font-[family-name:var(--font-montserrat)] font-light leading-relaxed"
                            style={{ fontSize: "15px", color: "rgba(255,255,255,0.6)" }}
                        >
                            Let's build something extraordinary together. Reach out and
                            let's talk about your project.
                        </p>
                    </div>

                    {/* CTA Button */}
                    <div className="overflow-hidden">
                        <a
                            href="/contact"
                            className="reveal inline-block rounded-full px-10 py-4 font-[family-name:var(--font-montserrat)] text-xs font-bold uppercase tracking-widest text-white transition-all duration-300"
                            style={{ background: "#f55200" }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.background = "#fff";
                                e.currentTarget.style.color = "#f55200";
                                e.currentTarget.style.boxShadow = "0 0 40px rgba(245,82,0,0.5)";
                                e.currentTarget.style.transform = "translateY(-2px)";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.background = "#f55200";
                                e.currentTarget.style.color = "#fff";
                                e.currentTarget.style.boxShadow = "none";
                                e.currentTarget.style.transform = "translateY(0)";
                            }}
                        >
                            Get In Touch →
                        </a>
                    </div>
                </div>
            </section>

            {/* ── Bottom Spacing ── */}
            <div className="h-24" />
        </div>
    );
}