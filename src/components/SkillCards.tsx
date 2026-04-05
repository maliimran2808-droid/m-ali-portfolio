"use client";

import { useEffect, useRef } from "react";
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

  useEffect(() => {
    const section = sectionRef.current;
    const container = containerRef.current;
    if (!section || !container) return;

    const cardEls = cardsRef.current.filter(Boolean) as HTMLDivElement[];
    const cardInners = cardInnerRef.current.filter(Boolean) as HTMLDivElement[];
    const floatEls = floatRef.current.filter(Boolean) as HTMLDivElement[];

    const isMobile = window.innerWidth < 768;
    const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;

    // Responsive values
    const spreadX = isMobile
      ? [-70, 0, 70]
      : isTablet
      ? [-200, 0, 200]
      : [-260, 0, 260];

    const finalX = isMobile
      ? [-85, 0, 85]
      : isTablet
      ? [-260, 0, 260]
      : [-310, 0, 310];

    // Set initial states
    gsap.set(cardEls, {
      x: 0,
      y: 0,
      rotateY: 0,
      rotateZ: 0,
      transformStyle: "preserve-3d",
      transformOrigin: "center center",
      zIndex: (i) => cards.length - i,
    });

    // Slight initial stack offset
    cardEls.forEach((card, i) => {
      gsap.set(card, { x: i * 3, y: i * 3 });
    });

    gsap.set(cardInners, { rotateY: 0 });

    // Floating jiggle — independent layer
    floatEls.forEach((el, i) => {
      gsap.to(el, {
        y: -18,
        duration: 1.4,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: i * 0.3,
      });
    });

    // Master scroll timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "+=500%",
        pin: true,
        scrub: 3,
        anticipatePin: 1,
      },
    });

    // ── Phase 1: Juggle (0 → 0.5) ──────────────────────
    // All 3 cards bounce up then down, no gap after
    cardEls.forEach((card, i) => {
      tl.to(card, {
        y: -30,
        duration: 0.08,
        ease: "sine.out",
      }, i * 0.07);

      tl.to(card, {
        y: 0,
        duration: 0.08,
        ease: "sine.in",
      }, i * 0.07 + 0.08);
    });

    // ── Phase 2: Fan out (0.5 → 1.1) ───────────────────
    // Immediately after juggle, cards fan out with rotation
    cardEls.forEach((card, i) => {
      tl.to(card, {
        x: spreadX[i],
        rotateZ: i === 0 ? -14 : i === 2 ? 14 : 0,
        duration: 0.5,
        ease: "power3.inOut",
      }, 0.5);
    });

    // ── Phase 3: Straighten (0.9 → 1.4) ────────────────
    // Overlaps with fan — straighten while moving to final X
    cardEls.forEach((card, i) => {
      tl.to(card, {
        x: finalX[i],
        rotateZ: 0,
        duration: 0.5,
        ease: "power2.inOut",
      }, 0.9);
    });

    // ── Phase 4: Flip (1.3 → 2.0) ──────────────────────
    // Overlaps with straighten — flip one by one
    cardInners.forEach((inner, i) => {
      tl.to(inner, {
        rotateY: 180,
        duration: 0.55,
        ease: "power2.inOut",
      }, 1.3 + i * 0.18);
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden bg-[#000]"
    >
      <div
        ref={containerRef}
        className="flex h-full w-full items-center justify-center"
        style={{ perspective: "1200px" }}
      >
        {cards.map((card, index) => (
          <div
            key={card.id}
            ref={(el) => { cardsRef.current[index] = el; }}
            className="absolute"
            style={{
              width: "clamp(180px, 18vw, 260px)",
              height: "clamp(270px, 27vw, 400px)",
              transformStyle: "preserve-3d",
              cursor: "pointer",
            }}
          >
            {/* Float layer */}
            <div
              ref={(el) => { floatRef.current[index] = el; }}
              className="relative h-full w-full"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Flip layer */}
              <div
                ref={(el) => { cardInnerRef.current[index] = el; }}
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
                  className="absolute inset-0 flex flex-col justify-between overflow-hidden rounded-2xl p-6 md:p-8"
                  style={{
                    backfaceVisibility: "hidden",
                    transform: "rotateY(180deg)",
                    background: "#111111",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  <h3 className="font-[family-name:var(--font-montserrat)] text-xl font-black uppercase tracking-tight text-white md:text-2xl lg:text-3xl">
                    {card.title}
                  </h3>

                  <div className="flex flex-col gap-0">
                    {card.skills.map((skill, i) => (
                      <div key={i}>
                        <p className="font-[family-name:var(--font-montserrat)] py-3 text-xs font-medium uppercase tracking-widest text-white/60 md:text-sm">
                          {skill}
                        </p>
                        {i < card.skills.length - 1 && (
                          <div className="h-px w-full bg-white/10" />
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-end">
                    <span
                      className="font-[family-name:var(--font-montserrat)] text-5xl font-black md:text-6xl lg:text-7xl"
                      style={{ color: "#FF6D00" }}
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