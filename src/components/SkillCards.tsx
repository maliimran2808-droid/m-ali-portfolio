"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const cards = [
  {
    id: 1,
    number: "01",
    title: "STRATEGY",
    skills: ["Discovery", "Research", "Analysis", "Consultation", "Optimization"],
  },
  {
    id: 2,
    number: "02",
    title: "DESIGN",
    skills: ["Branding", "UI/UX", "Visual Identity", "Graphics", "Illustration"],
  },
  {
    id: 3,
    number: "03",
    title: "DEVELOPMENT",
    skills: ["Frontend", "Next.js", "API Integration", "Testing", "Deployment"],
  },
];

export default function SkillCards() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const cardInnerRef = useRef<(HTMLDivElement | null)[]>([]);
  const floatRef = useRef<(HTMLDivElement | null)[]>([]);

  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    if (!mounted || isMobile) return;

    const section = sectionRef.current;
    const container = containerRef.current;
    if (!section || !container) return;

    const cardEls = cardsRef.current.filter(Boolean) as HTMLDivElement[];
    const cardInners = cardInnerRef.current.filter(Boolean) as HTMLDivElement[];
    const floatEls = floatRef.current.filter(Boolean) as HTMLDivElement[];

    const getResponsiveValues = () => {
      const w = window.innerWidth;
      if (w < 1024) {
        // tablet
        return { finalX: [-290, 0, 290] };
      } else {
        // desktop
        return { finalX: [-380, 0, 380] };
      }
    };

    const { finalX } = getResponsiveValues();

    ScrollTrigger.getAll().forEach((t) => t.kill());

    // ── Initial State ──
    gsap.set(cardEls, {
      x: 0,
      y: 0,
      transformStyle: "preserve-3d",
      transformOrigin: "center center",
    });

    cardEls.forEach((card, i) => {
      gsap.set(card, {
        x: i * 2,
        y: i * 2,
        zIndex: cards.length - i,
      });
    });

    gsap.set(cardInners, {
      rotateY: 0,
      rotateZ: 0,
      transformStyle: "preserve-3d",
    });

    // ── Floating animation ──
    floatEls.forEach((el, i) => {
      gsap.to(el, {
        y: -10,
        duration: 2,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: i * 0.4,
      });
    });

    // ── Master Timeline ──
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "+=280%",
        pin: true,
        scrub: 2,
        anticipatePin: 1,
      },
    });

    const tiltAngles = [-12, 0, 12];

    // Phase 1: Cards spread to final X position
    cardEls.forEach((card, i) => {
      tl.to(
        card,
        {
          x: finalX[i],
          duration: 1,
          ease: "power1.inOut",
        },
        0
      );
    });

    // Phase 1b: Tilt during spread
    cardInners.forEach((inner, i) => {
      tl.to(
        inner,
        {
          rotateZ: tiltAngles[i],
          duration: 1,
          ease: "power1.inOut",
        },
        0
      );
    });

    // Phase 2: Flip + straighten at same time — one smooth arc
    cardInners.forEach((inner, i) => {
      tl.to(
        inner,
        {
          rotateY: 180,
          rotateZ: 0, // straightens as it flips
          duration: 0.75,
          ease: "power2.inOut",
        },
        0.9 + i * 0.2
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
      gsap.killTweensOf([...cardEls, ...cardInners, ...floatEls]);
    };
  }, [mounted, isMobile]);

  if (!mounted) return null;

  // ── Mobile View — static flipped cards ──
  if (isMobile) {
    return (
      <div className="w-full bg-[#000] py-16 px-5">
        <div className="flex flex-col items-center gap-6">
          {cards.map((card) => (
            <div
              key={card.id}
              className="w-full max-w-sm rounded-2xl flex flex-col justify-between"
              style={{
                background: "#111111",
                border: "1px solid rgba(255,255,255,0.08)",
                padding: "28px 24px",
                minHeight: "260px",
              }}
            >
              <h3
                className="font-[family-name:var(--font-montserrat)] font-black uppercase tracking-tight text-white"
                style={{ fontSize: "22px" }}
              >
                {card.title}
              </h3>

              <div className="flex flex-col mt-4">
                {card.skills.map((skill, i) => (
                  <div key={i}>
                    <p
                      className="font-[family-name:var(--font-montserrat)] font-medium uppercase tracking-widest text-white/60 py-3"
                      style={{ fontSize: "11px" }}
                    >
                      {skill}
                    </p>
                    {i < card.skills.length - 1 && (
                      <div className="h-px w-full bg-white/10" />
                    )}
                  </div>
                ))}
              </div>

              <div className="flex justify-end mt-4">
                <span
                  className="font-[family-name:var(--font-montserrat)] font-black"
                  style={{ fontSize: "64px", color: "#FF6D00" }}
                >
                  {card.number}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ── Desktop View — animated ──
  return (
    <div
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden bg-[#000]"
    >
      <div
        ref={containerRef}
        className="flex h-full w-full items-center justify-center"
        style={{ perspective: "1400px" }}
      >
        {cards.map((card, index) => (
          <div
            key={card.id}
            ref={(el) => {
              cardsRef.current[index] = el;
            }}
            className="absolute"
            style={{
              // 350px desktop, scales down for tablet
              width: "clamp(200px, 24vw, 350px)",
              // 486px desktop, scales down for tablet
              height: "clamp(300px, 34vw, 486px)",
              transformStyle: "preserve-3d",
            }}
          >
            {/* Float layer */}
            <div
              ref={(el) => {
                floatRef.current[index] = el;
              }}
              className="relative h-full w-full"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Flip + Tilt layer */}
              <div
                ref={(el) => {
                  cardInnerRef.current[index] = el;
                }}
                className="relative h-full w-full"
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* FRONT FACE */}
                <div
                  className="absolute inset-0 overflow-hidden rounded-2xl"
                  style={{ backfaceVisibility: "hidden" }}
                >
                  <img
                    src="./images/card.png"
                    alt="Card Front"
                    className="h-full w-full object-cover"
                  />
                </div>

                {/* BACK FACE */}
                <div
                  className="absolute inset-0 flex flex-col justify-between overflow-hidden rounded-2xl"
                  style={{
                    backfaceVisibility: "hidden",
                    transform: "rotateY(180deg)",
                    background: "#111111",
                    border: "1px solid rgba(255,255,255,0.08)",
                    padding: "clamp(20px, 2.5vw, 40px)",
                  }}
                >
                  {/* Title */}
                  <h3
                    className="font-[family-name:var(--font-montserrat)] font-black uppercase tracking-tight text-white"
                    style={{ fontSize: "clamp(16px, 2vw, 30px)" }}
                  >
                    {card.title}
                  </h3>

                  {/* Skills */}
                  <div className="flex flex-col gap-0">
                    {card.skills.map((skill, i) => (
                      <div key={i}>
                        <p
                          className="font-[family-name:var(--font-montserrat)] font-medium uppercase tracking-widest text-white/60"
                          style={{
                            fontSize: "clamp(9px, 0.9vw, 13px)",
                            paddingTop: "clamp(8px, 1vw, 14px)",
                            paddingBottom: "clamp(8px, 1vw, 14px)",
                          }}
                        >
                          {skill}
                        </p>
                        {i < card.skills.length - 1 && (
                          <div className="h-px w-full bg-white/10" />
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Number */}
                  <div className="flex justify-end">
                    <span
                      className="font-[family-name:var(--font-montserrat)] font-black"
                      style={{
                        fontSize: "clamp(40px, 6vw, 90px)",
                        color: "#FF6D00",
                      }}
                    >
                      {card.number}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}