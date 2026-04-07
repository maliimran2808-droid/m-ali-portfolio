"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import MobileMenu from "./MobileMenu";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const line3Ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const header = headerRef.current;
    const inner = innerRef.current;
    if (!header || !inner) return;

    let scrolled = false;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > 80 && !scrolled) {
        scrolled = true;
        setIsScrolled(true);

        // Shrink and center the inner container
        gsap.to(inner, {
          maxWidth: "700px",
          paddingLeft: "20px",
          paddingRight: "20px",
          paddingTop: "10px",
          paddingBottom: "10px",
          duration: 0.5,
          ease: "power3.out",
        });

      } else if (currentScrollY <= 80 && scrolled) {
        scrolled = false;
        setIsScrolled(false);

        // Expand back to full width
        gsap.to(inner, {
          maxWidth: "1280px",
          paddingLeft: "48px",
          paddingRight: "48px",
          paddingTop: "0px",
          paddingBottom: "0px",
          duration: 0.5,
          ease: "power3.out",
        });
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Hamburger morph animation
  useEffect(() => {
    const line1 = line1Ref.current;
    const line2 = line2Ref.current;
    const line3 = line3Ref.current;
    if (!line1 || !line2 || !line3) return;

    if (isOpen) {
      gsap.to(line1, { rotate: 45, y: 8, duration: 0.3, ease: "power2.inOut" });
      gsap.to(line2, { opacity: 0, duration: 0.15 });
      gsap.to(line3, { rotate: -45, y: -8, duration: 0.3, ease: "power2.inOut" });
    } else {
      gsap.to(line1, { rotate: 0, y: 0, duration: 0.3, ease: "power2.inOut" });
      gsap.to(line2, { opacity: 1, duration: 0.15, delay: 0.1 });
      gsap.to(line3, { rotate: 0, y: 0, duration: 0.3, ease: "power2.inOut" });
    }
  }, [isOpen]);

  return (
    <>
      <header
        ref={headerRef}
        className="fixed top-0 left-0 right-0 z-[100] flex justify-center pt-4 transition-all duration-500"
      >
        <div
          ref={innerRef}
          style={{
            maxWidth: "1280px",
            paddingLeft: "48px",
            paddingRight: "48px",
          }}
          className={`w-full flex items-center justify-between rounded-full transition-all duration-500 ${isScrolled
              ? "border border-white/10 bg-[#0a0a0a]/60 py-3 shadow-[0_0_30px_rgba(255,255,255,0.05)] backdrop-blur-xl"
              : "border border-transparent bg-transparent py-5"
            }`}
        >
          {/* Logo */}
          <a
            href="/"
            className="font-[family-name:var(--font-montserrat)] text-sm font-bold uppercase tracking-[0.3em] text-[var(--color-text-primary)] transition-opacity hover:opacity-70"
          >
            <img
              src="./images/logo.png"
              alt="Logo"
              className={`transition-all duration-500 ${isScrolled ? "w-[100px]" : "w-[150px]"
                }`}
            />
          </a>

          {/* Right Side */}
          <div className="flex items-center gap-4 md:gap-6">
            {/* Available dot — hidden when scrolled */}


            {/* LET'S TALK Button */}
            <a
              href="#contact"
              className={`font-[family-name:var(--font-montserrat)] rounded-full border border-[var(--color-accent-light)] font-semibold uppercase tracking-[0.15em] text-[var(--color-accent-light)] transition-all duration-300 hover:bg-[var(--color-accent-light)] hover:text-[var(--color-background)] ${isScrolled ? "px-3 py-1.5 text-[10px]" : "px-4 py-2 text-xs md:px-5"
                }`}
            >
              LET&apos;S TALK
            </a>

            {/* Hamburger */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="relative z-[9990] flex h-8 w-8 flex-col items-end justify-center gap-[6px]"
            >
              <span
                ref={line1Ref}
                className={`block h-[1.5px] origin-center transition-colors duration-300 ${isScrolled ? "w-5" : "w-7"
                  } ${isOpen
                    ? "bg-[var(--color-background)]"
                    : "bg-[var(--color-text-primary)]"
                  }`}
              />
              <span
                ref={line2Ref}
                className={`block h-[1.5px] w-4 origin-center transition-colors duration-300 ${isOpen
                    ? "bg-[var(--color-background)]"
                    : "bg-[var(--color-text-primary)]"
                  }`}
              />
              <span
                ref={line3Ref}
                className={`block h-[1.5px] origin-center transition-colors duration-300 ${isScrolled ? "w-5" : "w-7"
                  } ${isOpen
                    ? "bg-[var(--color-background)]"
                    : "bg-[var(--color-text-primary)]"
                  }`}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Full Screen Menu */}
      <MobileMenu isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
}