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

if (window.innerWidth < 768) {
  document.querySelectorAll(".mobile-card").forEach((card) => {
    // Card fades up
    gsap.fromTo(
      card,
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
        },
      }
    );

    // Each text item slides up from inside its overflow hidden wrapper
    const textItems = card.querySelectorAll(".slide-up-text");
    gsap.fromTo(
      textItems,
      { y: "100%" },           // starts from bottom of its wrapper
      {
        y: "0%",
        duration: 0.6,
        ease: "power2.out",
        stagger: 0.08,         // each text item one after another
        delay: 0.3,
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
        },
      }
    );
  });

  return () => {
    ScrollTrigger.getAll().forEach((t) => t.kill());
  };
}
    const cardEls = cardsRef.current.filter(Boolean) as HTMLDivElement[];
    const cardInners = cardInnerRef.current.filter(Boolean) as HTMLDivElement[];
    const floatEls = floatRef.current.filter(Boolean) as HTMLDivElement[];

    const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;

    const finalX = isTablet
      ? [-290, 0, 290]
      : [-375, 0, 375];

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

    cardEls.forEach((card, i) => {
      gsap.set(card, { x: i * 3, y: i * 3 });
    });

    gsap.set(cardInners, { rotateY: 0 });

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

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
            start: "top 7%",
        end: "+=280%",
        pin: true,
        scrub: 2.5,
        anticipatePin: 1,
      },
    });

    const tiltAngles = [-12, 0, 12];

    cardEls.forEach((card, i) => {
      tl.to(
        card,
        { x: finalX[i], duration: 1, ease: "power1.inOut" },
        0
      );
    });

    cardInners.forEach((inner, i) => {
      tl.to(
        inner,
        { rotateZ: tiltAngles[i], duration: 1, ease: "power1.inOut" },
        0
      );
    });

    cardInners.forEach((inner, i) => {
      tl.to(
        inner,
        {
          rotateY: 180,
          rotateZ: 0,
          duration: 0.75,
          ease: "power3.inOut",
        },
        1.1 + i * 0.35
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <>
      {/* ── MOBILE STATIC VIEW ── */}
     <div className="mobile-cards-container block md:hidden w-full bg-[#000] py-16 px-5">
  <div className="flex flex-col items-center gap-6">
    {cards.map((card) => (
      <div
        key={card.id}
        className="mobile-card w-full max-w-sm rounded-2xl flex flex-col justify-between"
        style={{
          background: "#111111",
          border: "1px solid rgba(255,255,255,0.08)",
          padding: "28px 24px",
          minHeight: "280px",
          opacity: 0,
        }}
      >
        {/* Title — overflow hidden wrapper */}
        <div className="overflow-hidden">
          <h3
            className="slide-up-text font-[family-name:var(--font-montserrat)] font-black uppercase tracking-tight text-white"
            style={{ fontSize: "22px" }}
          >
            {card.title}
          </h3>
        </div>

        {/* Skills — each skill in its own overflow hidden wrapper */}
        <div className="flex flex-col mt-4">
          {card.skills.map((skill, i) => (
            <div key={i}>
              <div className="overflow-hidden">
                <p
                  className="slide-up-text font-[family-name:var(--font-montserrat)] font-medium uppercase tracking-widest text-white/60 py-3"
                  style={{ fontSize: "11px" }}
                >
                  {skill}
                </p>
              </div>
              {i < card.skills.length - 1 && (
                <div className="h-px w-full bg-white/10" />
              )}
            </div>
          ))}
        </div>

        {/* Number — overflow hidden wrapper */}
        <div className="flex justify-end mt-4 overflow-hidden">
          <span
            className="slide-up-text font-[family-name:var(--font-montserrat)] font-black"
            style={{ fontSize: "64px", color: "#FF6D00" }}
          >
            {card.number}
          </span>
        </div>
      </div>
    ))}
  </div>
</div>

      {/* ── DESKTOP ANIMATED VIEW ── */}
      <div
        ref={sectionRef}
        className="relative h-screen w-full overflow-hidden bg-[#000] hidden md:block"
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
                width: "clamp(340px, 18vw, 340px)",
                height: "clamp(470px, 27vw, 470px)",
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
                      src="./images/card.webp"
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
                    <h3 className="font-[family-name:var(--font-montserrat)] md:text-xl font-[500] uppercase tracking-normal text-white md:text-2xl lg:text-3xl">
                      {card.title}
                    </h3>

                    <div className="flex flex-col gap-0">
                      {card.skills.map((skill, i) => (
                        <div key={i}>
                          <p className="font-[family-name:var(--font-montserrat)] py-3 text-xs font-medium uppercase tracking-widest text-white/60 md:text-sm" style={{borderBottom:'1px dashed rgba(255,255,255,0.08)'}}>
                            {skill}
                          </p>
                          
                        </div>
                      ))}
                    </div>

                    <div className="flex justify-end">
                      <span
                        className="font-[family-name:var(--font-montserrat)] text-5xl font-[600] md:text-6xl lg:text-7xl"
                        style={{ color: "#f45100" }}
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
    </>
  );
}