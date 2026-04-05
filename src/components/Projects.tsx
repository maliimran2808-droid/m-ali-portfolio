"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1,
    name: "Electric Car",
    skills: ["Red", "Branding"],
    image: "./images/project1.jpeg",
    number: "01",
  },
  {
    id: 2,
    name: "Immersive VR",
    skills: ["Product", "Branding"],
    image: "./images/project2.jpeg",
    number: "02",
  },
  {
    id: 3,
    name: "Vault X",
    skills: ["UI", "Framework Development"],
    image: "./images/project3.png",
    number: "03",
  },
  {
    id: 4,
    name: "Glide X",
    skills: ["UI/UX", "Framework Development"],
    image: "./images/project4.png",
    number: "04",
  },
  {
    id: 5,
    name: "Radiant Blooms",
    skills: ["Illustration"],
    image: "./images/project5.jpeg",
    number: "05",
  },
];

export default function Projects() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[];

    cards.forEach((card, index) => {
      const image = card.querySelector(".project-image") as HTMLElement;
      const overlay = card.querySelector(".project-overlay") as HTMLElement;
      const nameEl = card.querySelector(".project-name") as HTMLElement;
      const skillsEl = card.querySelector(".project-skills") as HTMLElement;

      if (!image || !overlay || !nameEl || !skillsEl) return;

      // Set initial overlay state
      gsap.set(overlay, { opacity: 0 });
      gsap.set(nameEl, { y: -40, opacity: 0 });
      gsap.set(skillsEl, { y: -40, opacity: 0 });

      // Hover in
      card.addEventListener("mouseenter", () => {
        gsap.to(image, {
          scale: 1.08,
          duration: 0.6,
          ease: "power2.out",
        });
        gsap.to(overlay, {
          opacity: 1,
          duration: 0.4,
          ease: "power2.out",
        });
        gsap.to(nameEl, {
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: "power3.out",
        });
        gsap.to(skillsEl, {
          y: 0,
          opacity: 1,
          duration: 0.5,
          delay: 0.05,
          ease: "power3.out",
        });
      });

      // Hover out
      card.addEventListener("mouseleave", () => {
        gsap.to(image, {
          scale: 1,
          duration: 0.6,
          ease: "power2.out",
        });
        gsap.to(overlay, {
          opacity: 0,
          duration: 0.4,
          ease: "power2.out",
        });
        gsap.to(nameEl, {
          y: -40,
          opacity: 0,
          duration: 0.4,
          ease: "power2.in",
        });
        gsap.to(skillsEl, {
          y: -40,
          opacity: 0,
          duration: 0.4,
          ease: "power2.in",
        });
      });

      // Sticky scroll behavior
      // Each card sticks at center of viewport
      const stickyTop = window.innerHeight / 2 - card.offsetHeight / 2.5;

      ScrollTrigger.create({
        trigger: card,
        start: `top ${stickyTop}px`,
        endTrigger: sectionRef.current!,
        end: "bottom bottom",
        pin: true,
        pinSpacing: false,
      });

      // When NEXT card reaches 50% → fade/scale out current card
      if (index < cards.length - 1) {
        const nextCard = cards[index + 1];

        ScrollTrigger.create({
          trigger: nextCard,
          start: "top 60%",
          end: "top 10%",
          scrub: true,
          onUpdate: (self) => {
            gsap.set(card, {
              scale: 1 - self.progress * 0.08,
              opacity: 1 - self.progress,
            });
          },
        });
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div
      ref={sectionRef}
      className="relative bg-[#000] px-6 md:px-16 lg:px-24"
      style={{
        paddingBottom: `${projects.length * 20}px`,
      }}
    >
      {projects.map((project, index) => (
        <div
          key={project.id}
          ref={(el) => {
            cardsRef.current[index] = el;
          }}
          className="relative mx-auto cursor-pointer overflow-hidden rounded-2xl"
          style={{
            height: "82vh",
            width: "65vw",
            marginBottom: "24px",
            zIndex: index + 1,
          }}
        >
          {/* Image */}
          <img
            src={project.image}
            alt={project.name}
            className="project-image absolute inset-0 h-full w-full object-cover"
            style={{ transformOrigin: "center center" }}
          />

          {/* Subtle Overlay — no dark */}
          <div
            className="project-overlay absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(0,0,0,0.15) 0%, transparent 40%, transparent 60%, rgba(0,0,0,0.1) 100%)",
            }}
          />

          {/* Top Left: Project Name */}
          <div className="absolute left-6 top-6 z-10 overflow-hidden">
            <div className="project-name">
              <div className="flex items-center gap-3">
                <span className="font-[family-name:var(--font-montserrat)] text-[10px] font-medium uppercase tracking-[0.3em] text-white/60">
                  {project.number}
                </span>
                <h3 className="font-[family-name:var(--font-montserrat)] text-2xl font-normal uppercase tracking-tight text-white md:text-3xl lg:text-3xl">
                  {project.name}
                </h3>
              </div>
            </div>
          </div>

          {/* Top Right: Skills */}
          <div className="absolute right-6 top-6 z-10 overflow-hidden">
            <div className="project-skills flex items-center gap-2">
              {project.skills.map((skill, i) => (
                <span
                  key={i}
                  className="rounded-full border border-white/20 bg-white/10 px-3 py-1.5 font-[family-name:var(--font-montserrat)] text-[10px] font-medium uppercase tracking-wider text-white backdrop-blur-md"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

       
        </div>
      ))}
    </div>
  );
}