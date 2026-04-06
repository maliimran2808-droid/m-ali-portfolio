"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function CallToAction() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const revealEls = section.querySelectorAll(".reveal");

    // Start hidden — pushed below the overflow wrapper
    gsap.set(revealEls, { y: "100%", opacity: 0 });

    ScrollTrigger.create({
      trigger: section,
      start: "top 45%",
      onEnter: () => {
        gsap.to(revealEls, {
          y: "0%",
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.08,
        });
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden px-6 py-24"
      style={{ background: "#000" }}
    >
      {/* ── Dot Grid Background ── */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.07) 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
        }}
      />

      {/* ── Glow Orbs ── */}
      <div
        className="pointer-events-none absolute left-1/4 top-1/4 z-0 h-[400px] w-[400px] rounded-full opacity-10 blur-[120px]"
        style={{ background: "#f45100" }}
      />
      <div
        className="pointer-events-none absolute bottom-1/4 right-1/4 z-0 h-[300px] w-[300px] rounded-full opacity-10 blur-[100px]"
        style={{ background: "#f45100" }}
      />

      {/* ── Glass Card ── */}
      <div
        className="relative z-10 w-full max-w-4xl rounded-[2.5rem] p-10 md:p-14 lg:p-20"
        style={{
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.1)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          boxShadow:
            "0 8px 80px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)",
        }}
      >
        {/* ── Label ── */}
        <div className="overflow-hidden mb-5">
          <span
            className="reveal block font-[family-name:var(--font-montserrat)] text-[10px] font-bold uppercase tracking-[0.4em]"
            style={{ color: "#f45100" }}
          >
            Book a Call
          </span>
        </div>

        {/* ── Headline ── */}
        <div className="overflow-hidden mb-6">
          <h2
            className="reveal block font-[family-name:var(--font-montserrat)] font-[600] uppercase leading-[1.05] tracking-tight text-[white]"
            style={{ fontSize: "clamp(36px, 5vw, 64px)" }}
          >
            Ready to Transform<br />Your Vision?
          </h2>
        </div>

        {/* ── Subtext ── */}
        <div className="overflow-hidden mb-10">
          <p
            className="reveal block font-[family-name:var(--font-montserrat)] font-light leading-relaxed text-white/60"
            style={{ fontSize: "clamp(14px, 1.5vw, 18px)", maxWidth: "520px" }}
          >
            Let's talk about your project. Share your idea, and I'll get back
            to you within 24 hours to discuss next steps.
          </p>
        </div>

        {/* ── Decorative Divider ── */}
        <div className="overflow-hidden mb-10">
          <div className="reveal flex items-center gap-4">
            <div
              className="h-px flex-1"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(244,81,0,0.6), transparent)",
              }}
            />
            <span style={{ color: "#f45100", fontSize: "18px" }}>✦</span>
            <div
              className="h-px flex-1"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(244,81,0,0.6), transparent)",
              }}
            />
          </div>
        </div>

        {/* ── Contact Form ── */}
        <form
          ref={formRef}
          className="flex flex-col gap-5"
          onSubmit={(e) => e.preventDefault()}
        >
          {/* Row 1: Name + Email */}
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            
            {/* Full Name */}
            <div className="flex flex-col gap-2">
              <div className="overflow-hidden">
                <label className="reveal block font-[family-name:var(--font-montserrat)] text-[10px] font-bold uppercase tracking-[0.3em] text-white/40">
                  Full Name
                </label>
              </div>
              <div className="overflow-hidden">
                <input
                  type="text"
                  placeholder="Your name"
                  className="reveal w-full rounded-xl px-5 py-4 font-[family-name:var(--font-montserrat)] text-sm text-white placeholder-white/20 outline-none transition-all duration-300"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                  onFocus={(e) => {
                    e.target.style.border = "1px solid rgba(244,81,0,0.7)";
                    e.target.style.boxShadow = "0 0 20px rgba(244,81,0,0.15)";
                    e.target.style.background = "rgba(255,255,255,0.07)";
                  }}
                  onBlur={(e) => {
                    e.target.style.border = "1px solid rgba(255,255,255,0.1)";
                    e.target.style.boxShadow = "none";
                    e.target.style.background = "rgba(255,255,255,0.04)";
                  }}
                />
              </div>
            </div>

            {/* Email */}
            <div className="flex flex-col gap-2">
              <div className="overflow-hidden">
                <label className="reveal block font-[family-name:var(--font-montserrat)] text-[10px] font-bold uppercase tracking-[0.3em] text-white/40">
                  Email Address
                </label>
              </div>
              <div className="overflow-hidden">
                <input
                  type="email"
                  placeholder="hello@example.com"
                  className="reveal w-full rounded-xl px-5 py-4 font-[family-name:var(--font-montserrat)] text-sm text-white placeholder-white/20 outline-none transition-all duration-300"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                  onFocus={(e) => {
                    e.target.style.border = "1px solid rgba(244,81,0,0.7)";
                    e.target.style.boxShadow = "0 0 20px rgba(244,81,0,0.15)";
                    e.target.style.background = "rgba(255,255,255,0.07)";
                  }}
                  onBlur={(e) => {
                    e.target.style.border = "1px solid rgba(255,255,255,0.1)";
                    e.target.style.boxShadow = "none";
                    e.target.style.background = "rgba(255,255,255,0.04)";
                  }}
                />
              </div>
            </div>
          </div>

          {/* Row 2: Project Type + Budget */}
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

            {/* Project Type */}
            <div className="flex flex-col gap-2">
              <div className="overflow-hidden">
                <label className="reveal block font-[family-name:var(--font-montserrat)] text-[10px] font-bold uppercase tracking-[0.3em] text-white/40">
                  Project Type
                </label>
              </div>
              <div className="overflow-hidden">
                <select
                  className="reveal w-full cursor-pointer appearance-none rounded-xl px-5 py-4 font-[family-name:var(--font-montserrat)] text-sm text-white/80 outline-none transition-all duration-300"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                  onFocus={(e) => {
                    e.target.style.border = "1px solid rgba(244,81,0,0.7)";
                    e.target.style.boxShadow = "0 0 20px rgba(244,81,0,0.15)";
                  }}
                  onBlur={(e) => {
                    e.target.style.border = "1px solid rgba(255,255,255,0.1)";
                    e.target.style.boxShadow = "none";
                  }}
                >
                  <option value="" style={{ background: "#111" }}>Select project type</option>
                  <option value="branding" style={{ background: "#111" }}>Branding & Identity</option>
                  <option value="web" style={{ background: "#111" }}>Web Design & Development</option>
                  <option value="ui" style={{ background: "#111" }}>UI/UX Design</option>
                  <option value="mobile" style={{ background: "#111" }}>Mobile App</option>
                  <option value="other" style={{ background: "#111" }}>Other</option>
                </select>
              </div>
            </div>

            {/* Budget */}
            <div className="flex flex-col gap-2">
              <div className="overflow-hidden">
                <label className="reveal block font-[family-name:var(--font-montserrat)] text-[10px] font-bold uppercase tracking-[0.3em] text-white/40">
                  Budget Range
                </label>
              </div>
              <div className="overflow-hidden">
                <select
                  className="reveal w-full cursor-pointer appearance-none rounded-xl px-5 py-4 font-[family-name:var(--font-montserrat)] text-sm text-white/80 outline-none transition-all duration-300"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                  onFocus={(e) => {
                    e.target.style.border = "1px solid rgba(244,81,0,0.7)";
                    e.target.style.boxShadow = "0 0 20px rgba(244,81,0,0.15)";
                  }}
                  onBlur={(e) => {
                    e.target.style.border = "1px solid rgba(255,255,255,0.1)";
                    e.target.style.boxShadow = "none";
                  }}
                >
                  <option value="" style={{ background: "#111" }}>Select budget range</option>
                  <option value="1k" style={{ background: "#111" }}>Under $1,000</option>
                  <option value="5k" style={{ background: "#111" }}>$1,000 – $5,000</option>
                  <option value="10k" style={{ background: "#111" }}>$5,000 – $10,000</option>
                  <option value="20k" style={{ background: "#111" }}>$10,000 – $20,000</option>
                  <option value="20k+" style={{ background: "#111" }}>$20,000+</option>
                </select>
              </div>
            </div>
          </div>

          {/* Message */}
          <div className="flex flex-col gap-2">
            <div className="overflow-hidden">
              <label className="reveal block font-[family-name:var(--font-montserrat)] text-[10px] font-bold uppercase tracking-[0.3em] text-white/40">
                Message
              </label>
            </div>
            <div className="overflow-hidden">
              <textarea
                rows={5}
                placeholder="Tell me about your project, goals, and timeline..."
                className="reveal w-full resize-none rounded-xl px-5 py-4 font-[family-name:var(--font-montserrat)] text-sm text-white placeholder-white/20 outline-none transition-all duration-300"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
                onFocus={(e) => {
                  e.target.style.border = "1px solid rgba(244,81,0,0.7)";
                  e.target.style.boxShadow = "0 0 20px rgba(244,81,0,0.15)";
                  e.target.style.background = "rgba(255,255,255,0.07)";
                }}
                onBlur={(e) => {
                  e.target.style.border = "1px solid rgba(255,255,255,0.1)";
                  e.target.style.boxShadow = "none";
                  e.target.style.background = "rgba(255,255,255,0.04)";
                }}
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="overflow-hidden pt-2">
            <button
              type="submit"
              className="reveal group inline-flex items-center gap-3 rounded-full px-10 py-5 font-[family-name:var(--font-montserrat)] text-xs font-bold uppercase tracking-widest text-white transition-all duration-500"
              style={{ background: "#f45100" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#fff";
                e.currentTarget.style.color = "#f45100";
                // e.currentTarget.style.boxShadow = "0 0 40px rgba(244,81,0,0.4)";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#f45100";
                e.currentTarget.style.color = "#fff";
                e.currentTarget.style.boxShadow = "none";
                e.currentTarget.style.transform = "translateY(0px)";
              }}
            >
              Send Message
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}