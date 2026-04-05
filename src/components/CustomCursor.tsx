"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const viewTextRef = useRef<HTMLSpanElement>(null);
  const isLocked = useRef(false);
  const isMenuOpen = useRef(false);
  const mousePos = useRef({ x: 0, y: 0 });
  const currentTextTarget = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    const glow = glowRef.current;
    const viewText = viewTextRef.current;
    if (!dot || !ring || !glow || !viewText) return;

    // Simple RAF loop - updates every frame
    const updateCursor = () => {
      // Dot always follows instantly
      gsap.set(dot, {
        x: mousePos.current.x,
        y: mousePos.current.y,
      });

      // Glow follows slowly
      gsap.to(glow, {
        x: mousePos.current.x,
        y: mousePos.current.y,
        duration: 0.6,
        ease: "power2.out",
        overwrite: "auto",
      });

      // Ring follows with delay ONLY if not locked
      if (!isLocked.current) {
        gsap.to(ring, {
          x: mousePos.current.x,
          y: mousePos.current.y,
          duration: 0.3,
          ease: "power3.out",
          overwrite: "auto",
        });
      }

      requestAnimationFrame(updateCursor);
    };

    updateCursor();

    // Menu observer
    const observer = new MutationObserver(() => {
      const menuOpen = document.body.classList.contains("menu-is-open");

      if (menuOpen && !isMenuOpen.current) {
        isMenuOpen.current = true;
        gsap.to(dot, { backgroundColor: "#0a0a0a", duration: 0.3 });
        gsap.to(ring, { borderColor: "rgba(10, 10, 10, 0.6)", duration: 0.3 });
        gsap.to(glow, { opacity: 0, duration: 0.3 });
      } else if (!menuOpen && isMenuOpen.current) {
        isMenuOpen.current = false;
        gsap.to(dot, { backgroundColor: "#f5f7ff", duration: 0.3 });
        gsap.to(ring, { borderColor: "rgba(245, 247, 255, 0.5)", duration: 0.3 });
        gsap.to(glow, { opacity: 0.6, duration: 0.3 });
      }
    });

    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["class"],
    });

    // Track mouse
    const moveCursor = (e: MouseEvent) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;
    };

    // Lock to text
    const handleMouseMove = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const textTarget = target.closest("[data-cursor-text]") as HTMLElement | null;

      if (textTarget) {
        if (currentTextTarget.current !== textTarget) {
          currentTextTarget.current = textTarget;
          isLocked.current = true;

          const rect = textTarget.getBoundingClientRect();
          const padding = 14;

          gsap.to(ring, {
            x: rect.left + rect.width / 2,
            y: rect.top + rect.height / 2,
            width: rect.width + padding * 2,
            height: rect.height + padding * 2,
            borderRadius: 0,
            borderColor: "rgba(245, 247, 255, 0.8)",
            borderWidth: 2,
            duration: 0.4,
            ease: "power3.out",
            overwrite: true,
          });

          gsap.to(dot, { backgroundColor: "#ff3232", duration: 0.2 });
        }
      } else {
        if (currentTextTarget.current) {
          currentTextTarget.current = null;
          isLocked.current = false;

          gsap.to(ring, {
            width: 40,
            height: 40,
            borderRadius: "50%",
            borderColor: isMenuOpen.current
              ? "rgba(10, 10, 10, 0.6)"
              : "rgba(245, 247, 255, 0.5)",
            borderWidth: 1,
            duration: 0.4,
            ease: "power3.out",
          });

          gsap.to(dot, {
            backgroundColor: isMenuOpen.current ? "#0a0a0a" : "#f5f7ff",
            duration: 0.3,
          });
        }
      }
    };

    // Button hover
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("[data-cursor-text]") || isLocked.current) return;

      const linkTarget = target.closest("a, button, [data-cursor-hover]");
      if (linkTarget) {
        gsap.to(ring, { width: 80, height: 80, borderWidth: 2, duration: 0.3 });
        gsap.to(dot, { scale: 0, duration: 0.2 });
        gsap.to(viewText, { opacity: 1, scale: 1, duration: 0.25 });
        gsap.to(glow, { width: 350, height: 350, opacity: 1, duration: 0.4 });
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("[data-cursor-text]") || isLocked.current) return;

      const linkTarget = target.closest("a, button, [data-cursor-hover]");
      if (linkTarget) {
        gsap.to(ring, { width: 40, height: 40, borderWidth: 1, duration: 0.3 });
        gsap.to(dot, { scale: 1, duration: 0.2 });
        gsap.to(viewText, { opacity: 0, scale: 0.5, duration: 0.2 });
        gsap.to(glow, { width: 250, height: 250, opacity: 0.6, duration: 0.4 });
      }
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div
        ref={glowRef}
        className="pointer-events-none fixed left-0 top-0 z-[9997] -translate-x-1/2 -translate-y-1/2"
        style={{
          width: 250,
          height: 250,
          background: "radial-gradient(circle, rgba(245,247,255,0.06) 0%, transparent 70%)",
          opacity: 0.6,
          borderRadius: "50%",
        }}
      />

      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] flex -translate-x-1/2 -translate-y-1/2 items-center justify-center"
        style={{
          width: 40,
          height: 40,
          borderColor: "rgba(245, 247, 255, 0.5)",
          borderWidth: 1,
          borderStyle: "solid",
          borderRadius: "50%",
        }}
      >
        <span
          ref={viewTextRef}
          style={{ opacity: 0, transform: "scale(0.5)" }}
          className="text-[10px] font-bold uppercase tracking-widest text-[#f5f7ff]"
        >
          
        </span>
      </div>

      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[9998] -translate-x-1/2 -translate-y-1/2"
        style={{
          width: 8,
          height: 8,
          backgroundColor: "#f5f7ff",
          borderRadius: "50%",
        }}
      />
    </>
  );
}