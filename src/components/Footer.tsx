"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const footer = footerRef.current;
    const divider = dividerRef.current;
    const name = nameRef.current;
    if (!footer || !divider || !name) return;

    // ── Divider line animates from left to right ──
    gsap.set(divider, { scaleX: 0, transformOrigin: "left center" });

ScrollTrigger.create({
  trigger: name,
  start: "top 95%",
  onEnter: () => {
    gsap.to(name, {
      y: 0,
      opacity: 1,
      duration: 1.1,
      ease: "power3.out",
    });
  },
  onEnterBack: () => {
    gsap.to(name, {
      y: 0,
      opacity: 1,
      duration: 1.1,
      ease: "power3.out",
    });
  },
});

    // ── Reveal elements slide up ──
    const revealEls = footer.querySelectorAll(".footer-reveal");
    gsap.set(revealEls, { y: "100%", opacity: 0 });

    ScrollTrigger.create({
      trigger: footer,
      start: "top 85%",
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

    // ── Name banner slides up ──
    gsap.set(name, { y: 80, opacity: 0 });
if (ScrollTrigger.isInViewport(name)) {
  gsap.to(name, {
    y: 0,
    opacity: 1,
    duration: 1,
    ease: "power3.out",
  });
}
gsap.set(name, { y: 80, opacity: 0 });

ScrollTrigger.create({
  trigger: name,
  start: "top 90%",
  onEnter: () => {
    gsap.to(name, {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: "power3.out",
    });
  },
  once: true,
});

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  const currentYear = new Date().getFullYear();

  const navLinks = [
    { label: "Home", href: "#hero" },
    { label: "About", href: "#about" },
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contact" },
  ];

  const socialLinks = [
    { label: "Instagram", href: "https://instagram.com" },
    { label: "LinkedIn", href: "https://linkedin.com" },
    { label: "WhatsApp", href: "https://wa.me/your-number" },
    { label: "Twitter", href: "https://twitter.com" },
  ];

  return (
    <footer
      ref={footerRef}
      className="relative w-full overflow-hidden"
      style={{ background: "#000" }}
    >
      {/* ── Top Padding ── */}
      <div className="px-8 pb-0 pt-20 md:px-16 lg:px-24">

        {/* ── ROW 1: Address + Nav Links ── */}
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">

          {/* Left: Address + Email */}
          <div className="flex flex-col gap-1">
            <div className="overflow-hidden">
              <p
                className="footer-reveal font-[family-name:var(--font-montserrat)] font-light"
                style={{ fontSize: "14px", color: "rgba(255,255,255,0.5)" }}
              >
                123 Creative Street, Karachi, Pakistan
              </p>
            </div>
            <div className="overflow-hidden">
              <a
                href="mailto:hello@muhammadali.com"
                className="footer-reveal font-[family-name:var(--font-montserrat)] font-light transition-colors duration-300 hover:text-white"
                style={{ fontSize: "14px", color: "rgba(255,255,255,0.5)" }}
              >
                hello@muhammadali.com
              </a>
            </div>
          </div>

          {/* Right: Nav Links */}
          <div className="flex items-center gap-8 md:justify-end">
            {navLinks.map((link, i) => (
              <div key={i} className="overflow-hidden">
                <a
                  href={link.href}
                  className="footer-reveal group relative font-[family-name:var(--font-montserrat)] text-sm font-medium uppercase tracking-widest text-white/70 transition-colors duration-300 hover:text-[#f45100]"
                >
                  {link.label}
                  {/* Underline hover effect */}
                  <span
                    className="absolute -bottom-0.5 left-0 h-px w-0 bg-[#f45100] transition-all duration-300 group-hover:w-full"
                  />
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* ── ANIMATED DIVIDER LINE ── */}
        <div className="my-10">
          <div
            ref={dividerRef}
            className="h-px w-full"
            style={{ background: "rgba(255,255,255,0.12)" }}
          />
        </div>

        {/* ── ROW 2: Copyright + Social Links ── */}
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

          {/* Left: Copyright */}
          <div className="overflow-hidden">
            <p
              className="footer-reveal font-[family-name:var(--font-montserrat)] font-light"
              style={{ fontSize: "13px", color: "rgba(255,255,255,0.4)" }}
            >
              © {currentYear} — All Rights Reserved
            </p>
          </div>

          {/* Right: Social Links */}
          <div className="flex items-center gap-8">
            {socialLinks.map((link, i) => (
              <div key={i} className="overflow-hidden">
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-reveal group relative font-[family-name:var(--font-montserrat)] text-sm font-medium uppercase tracking-widest text-white/50 transition-colors duration-300 hover:text-[#f45100]"
                >
                  {link.label}
                  <span
                    className="absolute -bottom-0.5 left-0 h-px w-0 bg-[#f45100] transition-all duration-300 group-hover:w-full"
                  />
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* ── SECOND DIVIDER ── */}
        <div className="my-10">
     <div
            ref={dividerRef}
            className="h-px w-full"
            style={{ background: "rgba(255,255,255,0.12)" }}
          />
        </div>
</div>
      {/* ── ROW 3: Full Width Name Banner ── */}
      <div className=" relative overflow-visible w-full">
        <div ref={nameRef} className="w-full px-1  pb-0 pt-3 md:px-1 opacity-1 translate-0">
          <h1
            className="w-full text-center font-[family-name:var(--font-poppins)] font-[400] mb-[-25px] uppercase leading-none"
            style={{
          fontSize: "clamp(60px, 14.4vw, 460px)",
              letterSpacing: "-0.07em",
   
              // ── Top to bottom gradient on the text ──
              background: "linear-gradient(180deg, #f55200 0%, #fa7200 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              transform: "translate(0px, 0px)",
              backgroundClip: "text",
                         opacity: "1",
            }}
          >
            Muhammad Ali
          </h1>
        </div>
      </div>
    </footer>
  );
}