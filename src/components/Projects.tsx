"use client";

import { useEffect, useRef, useState } from "react";
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
    client: "Tesla Inc.",
    date: "2024",
    services: "Branding, UI/UX",
    duration: "3 Months",
    budget: "$5,000",
    liveLink: "https://example.com",
    overview: "This project was about creating a premium brand identity for an electric car startup. The goal was to create a modern, clean and premium looking brand identity.",
    objective: "The objective was to create a brand identity that would resonate with the target audience and create a premium feel for the brand.",
    process: "We started with a discovery phase where we researched the market and the target audience. We then created a mood board and a color palette. We then created a logo and a brand identity.",
    impact: "The impact was that the client was very happy with the result and the brand identity was very well received by the target audience.",
  },
  {
    id: 2,
    name: "Immersive VR",
    skills: ["Product", "Branding"],
    image: "./images/project2.jpeg",
    number: "02",
    client: "VR Labs",
    date: "2024",
    services: "Product Design, Branding",
    duration: "2 Months",
    budget: "$8,000",
    liveLink: "https://example.com",
    overview: "This project was about creating a premium brand identity for a VR startup. The goal was to create a modern, clean and premium looking brand identity.",
    objective: "The objective was to create a brand identity that would resonate with the target audience and create a premium feel for the brand.",
    process: "We started with a discovery phase where we researched the market and the target audience. We then created a mood board and a color palette.",
    impact: "The impact was that the client was very happy with the result and the brand identity was very well received by the target audience.",
  },
  {
    id: 3,
    name: "Vault X",
    skills: ["UI", "Framework Development"],
    image: "./images/project3.png",
    number: "03",
    client: "Vault Inc.",
    date: "2023",
    services: "UI/UX, Development",
    duration: "4 Months",
    budget: "$12,000",
    liveLink: "https://example.com",
    overview: "This project was about creating a premium UI for a fintech startup.",
    objective: "The objective was to create a UI that would resonate with the target audience.",
    process: "We started with a discovery phase where we researched the market and the target audience.",
    impact: "The impact was that the client was very happy with the result.",
  },
  {
    id: 4,
    name: "Glide X",
    skills: ["UI/UX", "Framework Development"],
    image: "./images/project4.png",
    number: "04",
    client: "Glide Corp.",
    date: "2023",
    services: "UI/UX, Development",
    duration: "5 Months",
    budget: "$15,000",
    liveLink: "https://example.com",
    overview: "This project was about creating a premium UI for a mobility startup.",
    objective: "The objective was to create a UI that would resonate with the target audience.",
    process: "We started with a discovery phase where we researched the market and the target audience.",
    impact: "The impact was that the client was very happy with the result.",
  },
  {
    id: 5,
    name: "Radiant Blooms",
    skills: ["Illustration"],
    image: "./images/project5.jpeg",
    number: "05",
    client: "Radiant Co.",
    date: "2023",
    services: "Illustration",
    duration: "1 Month",
    budget: "$2,000",
    liveLink: "https://example.com",
    overview: "This project was about creating a premium illustration for a lifestyle brand.",
    objective: "The objective was to create an illustration that would resonate with the target audience.",
    process: "We started with a discovery phase where we researched the market and the target audience.",
    impact: "The impact was that the client was very happy with the result.",
  },
];

type Project = (typeof projects)[0];

export default function Projects() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  // Detail Overlay Refs
  const detailOverlayRef = useRef<HTMLDivElement>(null);
  const detailContentRef = useRef<HTMLDivElement>(null);
  const detailImageRef = useRef<HTMLDivElement>(null);
  const detailNameRef = useRef<HTMLDivElement>(null);
  const detailSkillsRef = useRef<HTMLDivElement>(null);
  const detailLeftRef = useRef<HTMLDivElement>(null);
  const detailRightRef = useRef<HTMLDivElement>(null);
  
  // Ref to hold the ScrollTriggers for the overlay so we can clean them up
  const overlayScrollCtx = useRef<gsap.Context | null>(null);

  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  // Lock Background Scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // ── Open Overlay Animation ──
  const handleProjectClick = (project: Project) => {
    setActiveProject(project);
    setIsOpen(true);

    const overlay = detailOverlayRef.current;
    if (!overlay) return;

    // Hide content initially
    gsap.set(detailContentRef.current, { opacity: 0 });

    // Expand ORANGE circle from top-right corner
    gsap.timeline({
      onComplete: () => animateContentIn(),
    })
      .set(overlay, {
        display: "block",
        clipPath: "circle(0% at 100% 0%)", // Top right corner
      })
      .to(overlay, {
        clipPath: "circle(150% at 100% 0%)", // Expand to cover screen
        duration: 0.8,
        ease: "power3.inOut",
        onStart: () => {
          overlay.scrollTop = 0;
        }
      });
  };

  // ── Content Entry Animation ──
  const animateContentIn = () => {
    const image = detailImageRef.current;
    const name = detailNameRef.current;
    const skills = detailSkillsRef.current;
    const left = detailLeftRef.current;
    const right = detailRightRef.current;
    const overlayScroller = detailOverlayRef.current;

    if (!image || !name || !skills || !overlayScroller) return;

    // Reset positions for Hero Section
    gsap.set(image, { scale: 1.08, opacity: 0 });
    gsap.set([name, skills], { y: "100%" });

    // 1. Fade in the DARK background content over the orange circle, then animate Hero
    gsap.timeline()
      .to(detailContentRef.current, { opacity: 1, duration: 0.4 }) // Reveals dark bg
      .to(image, { scale: 1, opacity: 1, duration: 0.8, ease: "power2.out" }, "-=0.1")
      .to(name, { y: "0%", duration: 0.7, ease: "power3.out" }, "-=0.5")
      .to(skills, { y: "0%", duration: 0.7, ease: "power3.out" }, "-=0.6");

    // 2. Set up ScrollTriggers for the Text Content (Slides up when scrolled into view)
    if (overlayScrollCtx.current) overlayScrollCtx.current.revert(); // clean up old ones

    overlayScrollCtx.current = gsap.context(() => {
      // Left sticky box slide up
      if (left) {
        gsap.fromTo(left,
          { y: 60, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.8, ease: "power3.out",
            scrollTrigger: {
              trigger: left,
              scroller: overlayScroller, // Must tell GSAP the overlay is scrolling, not the window!
              start: "top 85%",
            }
          }
        );
      }

      // Right text blocks slide up individually
      const rightBlocks = right?.querySelectorAll(".right-block") ?? [];
      rightBlocks.forEach((block) => {
        gsap.fromTo(block,
          { y: 50, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.8, ease: "power3.out",
            scrollTrigger: {
              trigger: block,
              scroller: overlayScroller,
              start: "top 85%",
            }
          }
        );
      });
    }, detailOverlayRef);
  };

  // ── Close Overlay Animation ──
  const handleClose = () => {
    const overlay = detailOverlayRef.current;
    if (!overlay) return;

    // Cleanup overlay scroll triggers so they don't fire incorrectly next time
    if (overlayScrollCtx.current) {
      overlayScrollCtx.current.revert();
      overlayScrollCtx.current = null;
    }

    // Fade dark content out first (revealing orange background)
    gsap.to(detailContentRef.current, {
      opacity: 0,
      duration: 0.3,
      onComplete: () => {
        // Then shrink orange circle back to top-right corner
        gsap.to(overlay, {
          clipPath: "circle(0% at 100% 0%)",
          duration: 0.7,
          ease: "power3.inOut",
          onComplete: () => {
            gsap.set(overlay, { display: "none" });
            setActiveProject(null);
            setIsOpen(false);
          },
        });
      },
    });
  };

  // ── Main Card Scroll/Hover Animations ──
  useEffect(() => {
    const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[];

    cards.forEach((card, index) => {
      const image = card.querySelector(".project-image") as HTMLElement;
      const overlay = card.querySelector(".project-overlay") as HTMLElement;
      const nameEl = card.querySelector(".project-name") as HTMLElement;
      const skillsEl = card.querySelector(".project-skills") as HTMLElement;

      if (!image || !overlay || !nameEl || !skillsEl) return;

      gsap.set(overlay, { opacity: 0 });
      gsap.set(nameEl, { y: -40, opacity: 0 });
      gsap.set(skillsEl, { y: -40, opacity: 0 });

      card.addEventListener("mouseenter", () => {
        gsap.to(image, { scale: 1.08, duration: 0.6, ease: "power2.out" });
        gsap.to(overlay, { opacity: 1, duration: 0.4, ease: "power2.out" });
        gsap.to(nameEl, { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" });
        gsap.to(skillsEl, { y: 0, opacity: 1, duration: 0.5, delay: 0.05, ease: "power3.out" });
      });

      card.addEventListener("mouseleave", () => {
        gsap.to(image, { scale: 1, duration: 0.6, ease: "power2.out" });
        gsap.to(overlay, { opacity: 0, duration: 0.4, ease: "power2.out" });
        gsap.to(nameEl, { y: -40, opacity: 0, duration: 0.4, ease: "power2.in" });
        gsap.to(skillsEl, { y: -40, opacity: 0, duration: 0.4, ease: "power2.in" });
      });

      const stickyTop = window.innerHeight / 2 - card.offsetHeight / 2.5;

      ScrollTrigger.create({
        trigger: card,
        start: `top ${stickyTop}px`,
        endTrigger: sectionRef.current!,
        end: "bottom bottom",
        pin: true,
        pinSpacing: false,
      });

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
    <>
      {/* ── Detail Overlay Panel ── */}
      <div
        ref={detailOverlayRef}
        className="fixed inset-0 z-[100] hidden overflow-y-auto"
        style={{ background: "#f45100" }} // THE ORANGE ANIMATION COLOR
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          className="fixed right-8 top-8 z-[110] flex items-center gap-2 font-[family-name:var(--font-montserrat)] text-xs uppercase tracking-widest text-white/60 hover:text-white transition-colors cursor-pointer"
        >
          Close ✕
        </button>

        {/* Content - Has Dark Background that fades in */}
        <div ref={detailContentRef} className="min-h-screen bg-[#0a0a0a]">
          {activeProject && (
            <>
              {/* ── Hero Image ── */}
              <div className="relative h-screen w-full overflow-hidden">
                <div ref={detailImageRef} className="absolute inset-0">
                  <img
                    src={activeProject.image}
                    alt={activeProject.name}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/30" />
                </div>

                {/* Bottom Left: Name */}
                <div className="absolute bottom-10 left-10 z-10 overflow-hidden">
                  <div ref={detailNameRef}>
                    <span className="font-[family-name:var(--font-montserrat)] text-xs font-medium uppercase tracking-[0.3em] text-white/60">
                      {activeProject.number}
                    </span>
                    <h1 className="font-[family-name:var(--font-montserrat)] text-5xl font-black uppercase tracking-tight text-white md:text-7xl lg:text-8xl">
                      {activeProject.name}
                    </h1>
                  </div>
                </div>

                {/* Bottom Right: Skills */}
                <div className="absolute bottom-10 right-10 z-10 overflow-hidden">
                  <div ref={detailSkillsRef} className="flex items-center gap-2">
                    {activeProject.skills.map((skill, i) => (
                      <span
                        key={i}
                        className="rounded-full border border-white/20 bg-white/10 px-4 py-2 font-[family-name:var(--font-montserrat)] text-xs font-medium uppercase tracking-wider text-white backdrop-blur-md"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* ── Detail Section ── */}
              <div className="flex gap-16 px-10 py-20 md:px-20 text-white">

                {/* LEFT sticky */}
                <div className="w-[280px] shrink-0">
                  <div
                    ref={detailLeftRef}
                    className="sticky top-10 rounded-2xl p-8"
                    style={{
                      background: "#111111",
                      border: "1px solid rgba(255,255,255,0.08)",
                    }}
                  >
                    {[
                      { label: "Client", value: activeProject.client },
                      { label: "Date", value: activeProject.date },
                      { label: "Services", value: activeProject.services },
                      { label: "Duration", value: activeProject.duration },
                      { label: "Budget", value: activeProject.budget },
                    ].map((item, i) => (
                      <div key={i} className="mb-6">
                        <p className="font-[family-name:var(--font-montserrat)] text-[10px] uppercase tracking-widest text-white/40 mb-1">
                          {item.label}
                        </p>
                        <p className="font-[family-name:var(--font-montserrat)] text-sm font-medium text-white">
                          {item.value}
                        </p>
                        {i < 4 && <div className="mt-4 h-px w-full bg-white/10" />}
                      </div>
                    ))}

                    <a
                      href={activeProject.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 flex w-full items-center justify-center gap-2 rounded-full py-3 font-[family-name:var(--font-montserrat)] text-xs font-medium uppercase tracking-widest text-white transition-opacity hover:opacity-70 cursor-pointer"
                      style={{ background: "#f45100" }}
                    >
                      View Live ↗
                    </a>
                  </div>
                </div>

                {/* RIGHT content */}
                <div ref={detailRightRef} className="flex-1 max-w-2xl">
                  {[
                    { label: "Overview", content: activeProject.overview },
                    { label: "Objective", content: activeProject.objective },
                    { label: "Process", content: activeProject.process },
                    { label: "Impact", content: activeProject.impact },
                  ].map((block, i) => (
                    <div key={i} className="right-block mb-16">
                      <h2 className="font-[family-name:var(--font-montserrat)] text-xs uppercase tracking-[0.3em] text-white/40 mb-4">
                        {block.label}
                      </h2>
                      <p className="font-[family-name:var(--font-montserrat)] text-lg font-light leading-relaxed text-white/80">
                        {block.content}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* ── Projects Section (Background) ── */}
      <div
        ref={sectionRef}
        className="relative bg-[#000] px-6 md:px-16 lg:px-24"
        style={{ paddingBottom: `${projects.length * 20}px` }}
      >
        {projects.map((project, index) => (
          <div
            key={project.id}
            ref={(el) => { cardsRef.current[index] = el; }}
            className="relative mx-auto cursor-pointer overflow-hidden rounded-2xl"
            style={{
              height: "82vh",
              width: "65vw",
              marginBottom: "24px",
              zIndex: index + 1,
            }}
            onClick={() => handleProjectClick(project)}
          >
            {/* Image */}
            <img
              src={project.image}
              alt={project.name}
              className="project-image absolute inset-0 h-full w-full object-cover"
              style={{ transformOrigin: "center center" }}
            />

            {/* Subtle Overlay */}
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
    </>
  );
}