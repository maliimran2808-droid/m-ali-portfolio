"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { MessageCircle, Send, Mail } from "lucide-react";

interface MobileMenuProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export default function MobileMenu({ isOpen, setIsOpen }: MobileMenuProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const isFirstRender = useRef(true);
  const bottomRef = useRef<HTMLDivElement>(null);
  useEffect(() => {

    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }


    const overlay = overlayRef.current;
    const content = contentRef.current;
    const links = linksRef.current;
    const bottom = bottomRef.current;

    if (!overlay || !content || !links || !bottom) return;

    if (isOpen) {
      // Prevent body scroll
      document.body.style.overflow = "hidden";

      // Tell cursor to go dark IMMEDIATELY
      document.body.classList.add("menu-is-open");

      const tl = gsap.timeline();

      tl.set(overlay, { display: "flex" });
      tl.fromTo(
        overlay,
        { clipPath: "circle(0% at 100% 0%)" },
        {
          clipPath: "circle(150% at 100% 0%)",
          duration: 0.8,
          ease: "power4.inOut",
        }
      );

      tl.fromTo(
        links.children,
        { y: 80, opacity: 0, rotateX: 40 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: "power3.out",
        },
        "-=0.3"
      );

      tl.fromTo(
        bottom,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" },
        "-=0.3"
      );

    } else {
      // Restore body scroll
      document.body.style.overflow = "";

      // Tell cursor to go light IMMEDIATELY
      document.body.classList.remove("menu-is-open");

      const tl = gsap.timeline();

      tl.to([links.children, bottom], {
        opacity: 0,
        y: -20,
        duration: 0.3,
        ease: "power2.in",
      });

      tl.to(overlay, {
        clipPath: "circle(0% at 100% 0%)",
        duration: 0.6,
        ease: "power4.inOut",
        onComplete: () => {
          gsap.set(overlay, { display: "none" });
        },
      });
    }
  }, [isOpen]);

  const navLinks = [
    { name: "WORK", href: "#work" },
    { name: "SERVICES", href: "#services" },
    { name: "ABOUT", href: "/about" },
    { name: "CONTACT", href: "#contact" },
  ];

  return (
    <div
      ref={overlayRef}
      style={{ display: "none", clipPath: "circle(0% at 100% 0%)" }}
      className="fixed inset-0 z-[998] flex flex-col bg-[#f45100]"
    >
      <div
        ref={contentRef}
        className="flex flex-1 flex-col justify-between px-8 pt-8 md:px-16"
      >
        {/* Close Button */}
        <div className="flex justify-end">
          <button
            onClick={() => setIsOpen(false)}
            className="group flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.2em] text-[var(--color-background)] transition-opacity hover:opacity-50"
          >
            CLOSE
            <span className="relative flex h-8 w-8 items-center justify-center rounded-full border border-[var(--color-background)]/20 transition-all duration-300 group-hover:rotate-90 group-hover:border-[var(--color-background)]">
              <span className="absolute h-[1.5px] w-4 rotate-45 bg-[var(--color-background)]" />
              <span className="absolute h-[1.5px] w-4 -rotate-45 bg-[var(--color-background)]" />
            </span>
          </button>
        </div>
        {/* Nav Links */}
        <div ref={linksRef} className="flex flex-col gap-4" style={{ perspective: "600px" }}>
          {navLinks.map((link, index) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="group flex items-baseline gap-4 transition-colors"
            >
              <span className="text-sm font-medium text-[var(--color-text-muted)] transition-colors group-hover:text-[var(--color-background)]">
                0{index + 1}
              </span>
              <span className="text-5xl font-black uppercase tracking-tight text-[var(--color-background)] transition-all duration-300 group-hover:tracking-wider md:text-7xl lg:text-8xl">
                {link.name}
              </span>
            </a>
          ))}
        </div>
      </div>

      {/* Bottom Section */}
      <div
        ref={bottomRef}
        className="border-t border-[var(--color-background)]/10 px-8 py-8 md:px-16"
      >
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          {/* Socials */}
          <div className="flex gap-6">

            <a
              href="#"
              className="text-[var(--color-background)] transition-opacity hover:opacity-50"
            >
              <MessageCircle size={22} />
            </a>
            <a
              href="#"
              className="text-[var(--color-background)] transition-opacity hover:opacity-50"
            >
              <Send size={22} />
            </a>
          </div>

          {/* Email */}
          <a
            href="mailto:m.aliimran2808@gmail.com"
            className="flex items-center gap-2 text-sm font-medium text-[var(--color-background)] transition-opacity hover:opacity-50"
          >
            <Mail size={18} />
            m.aliimran2808@gmail.com
          </a>

          {/* Location */}
          <span className="text-sm font-medium text-[var(--color-text-muted)]">
            Based in Lahore, Pakistan
          </span>
        </div>
      </div>
    </div>
  );
}