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

export default function SkillCardsMobile() {
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const innersRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const cardWrappers = cardsRef.current.filter(Boolean) as HTMLDivElement[];
    const inners = innersRef.current.filter(Boolean) as HTMLDivElement[];

    ScrollTrigger.getAll().forEach((t) => t.kill());

    gsap.set(inners, { rotateY: 0 });

    cardWrappers.forEach((wrapper, i) => {
      gsap.fromTo(
        inners[i],
        { rotateY: 0 },
        {
          rotateY: 180,
          duration: 0.8,
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: wrapper,
            start: "top 60%",
            end: "top 20%",
            scrub: false,
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
      gsap.killTweensOf(inners);
    };
  }, []);

  return (
    <div className="w-full bg-[#000] py-16 px-5">
      <div className="flex flex-col items-center gap-8">
        {cards.map((card, index) => (
          <div
            key={card.id}
            ref={(el) => { cardsRef.current[index] = el; }}
            className="w-full max-w-sm"
            style={{ perspective: "1000px" }}
          >
            {/* Flip layer */}
            <div
              ref={(el) => { innersRef.current[index] = el; }}
              className="relative w-full"
              style={{
                height: "320px",
                transformStyle: "preserve-3d",
              }}
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
                  padding: "28px 24px",
                }}
              >
                <h3
                  className="font-[family-name:var(--font-montserrat)] font-black uppercase tracking-tight text-white"
                  style={{ fontSize: "22px" }}
                >
                  {card.title}
                </h3>

                <div className="flex flex-col">
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

                <div className="flex justify-end">
                  <span
                    className="font-[family-name:var(--font-montserrat)] font-black"
                    style={{ fontSize: "64px", color: "#FF6D00" }}
                  >
                    {card.number}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}