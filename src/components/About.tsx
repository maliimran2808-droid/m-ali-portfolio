"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const leftItemsRef = useRef<HTMLDivElement>(null);
  const rightItemsRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const cardInnerRef = useRef<HTMLDivElement>(null);
  const centreRef = useRef<HTMLDivElement>(null);

  // Cursor follow + tilt + speed blur
useEffect(() => {
  const section = sectionRef.current;
  const card = cardRef.current;
  const cardInner = cardInnerRef.current;
  const centre = centreRef.current;
  if (!section || !card || !cardInner || !centre) return;

  // Create ghost trail elements
  const NUM_GHOSTS = 5;
  const ghosts: HTMLDivElement[] = [];

  for (let i = 0; i < NUM_GHOSTS; i++) {
    const ghost = cardInner.cloneNode(true) as HTMLDivElement;
    const opacity = (1 - (i + 1) / (NUM_GHOSTS + 1)) * 0.7;
    const scale = 1 - i * 0.01;
    ghost.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: ${opacity};
      transform: scale(${scale});
      border-radius: inherit;
      pointer-events: none;
      z-index: ${-i - 1};
      filter: blur(${i * 0.5}px);
    `;
    card.appendChild(ghost);
    ghosts.push(ghost);
  }

  let targetX = 0;
  let targetY = 0;
  let isInSection = false;

  // Position history for trail
  const posHistory: { x: number; y: number }[] = Array(NUM_GHOSTS * 3).fill({ x: 0, y: 0 });

  let currentX = 0;
  let currentY = 0;
  let rafId: number;

  const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

  const onMouseMove = (e: MouseEvent) => {
    const sectionRect = section.getBoundingClientRect();
    const centreRect = centre.getBoundingClientRect();

    if (e.clientY < sectionRect.top || e.clientY > sectionRect.bottom) {
      isInSection = false;
      return;
    }
    isInSection = true;

    const maxX = centreRect.width * 0.18;
    const maxY = centreRect.height * 0.05;

    const relX = e.clientX - centreRect.left - centreRect.width / 2;
    const relY = e.clientY - centreRect.top - centreRect.height / 2;

    targetX = Math.max(-maxX, Math.min(maxX, relX * 0.18));
    targetY = Math.max(-maxY, Math.min(maxY, relY * 0.05));
  };

  const tick = () => {
  currentX = lerp(currentX, isInSection ? targetX : 0, 0.32);
currentY = lerp(currentY, isInSection ? targetY : 0, 0.32);

    // Update position history
    posHistory.unshift({ x: currentX, y: currentY });
    posHistory.pop();

    // Speed for trail visibility
    const dx = posHistory[0].x - posHistory[1].x;
    const dy = posHistory[0].y - posHistory[1].y;
    const speed = Math.sqrt(dx * dx + dy * dy);
    const trailStrength = Math.min(speed * 0.8, 1);

    // Move main card
   // Slight left/right tilt only based on X position
// Z rotation — right side dips when moving right
const tiltZ = (currentX / 150) * 6; // max 6 degrees

gsap.set(card, {
  x: currentX,
  y: currentY,
  rotateZ: tiltZ,
  rotateY: 0,
  rotateX: 0,
});
    // Move ghosts with lag using position history
    ghosts.forEach((ghost, i) => {
      const histIndex = (i + 1) * 3;
      const hist = posHistory[Math.min(histIndex, posHistory.length - 1)];

      // Direction of movement for trail offset
  const offsetMultiplier = (i + 1) * 0.20;
      const trailX = hist.x - currentX;
      const trailY = hist.y - currentY;

      gsap.set(ghost, {
        x: trailX * offsetMultiplier,
        y: trailY * offsetMultiplier,
      opacity: ((1 - (i + 1) / (NUM_GHOSTS + 1)) * 0.35) * trailStrength,
      });
    });

    // Orange glow based on speed
   gsap.set(cardInner, {
  boxShadow: "0 20px 60px rgba(0,0,0,0.6)",
});

    rafId = requestAnimationFrame(tick);
  };

  // Subtle idle float
  gsap.to(card, {
    y: -8,
    duration: 3,
    ease: "power1.inOut",
    yoyo: true,
    repeat: -1,
  });

  window.addEventListener("mousemove", onMouseMove);
  rafId = requestAnimationFrame(tick);

  return () => {
    window.removeEventListener("mousemove", onMouseMove);
    cancelAnimationFrame(rafId);
    ghosts.forEach((g) => g.remove());
  };
}, []);
  // Scroll-triggered entrance animations
useEffect(() => {
  const section = sectionRef.current;
  const marquee = marqueeRef.current;
  const leftItems = leftItemsRef.current;
  const rightItems = rightItemsRef.current;
  const card = cardRef.current;

  if (!section || !marquee || !leftItems || !rightItems || !card) return;

  const leftChildren = leftItems.querySelectorAll(".slide-up");
  const rightChildren = rightItems.querySelectorAll(".slide-up");

  // Hide everything initially
  gsap.set(card, { opacity: 0, scale: 0.8 });
  gsap.set(marquee, { yPercent: 100 });
  gsap.set(leftChildren, { yPercent: 100 });
  gsap.set(rightChildren, { yPercent: 100 });

  ScrollTrigger.create({
    trigger: section,
    start: "top center",
    once: true,
    onEnter: () => {
      const tl = gsap.timeline();

      // Card animates IN
      tl.to(card, {
        opacity: 1,
        scale: 1,
        duration: 1.2,
        ease: "power3.out",
      });

      // Marquee slides UP
      tl.to(
        marquee,
        {
          yPercent: 0,
          duration: 1,
          ease: "power3.out",
        },
        "-=0.6"
      );

      // Left column slides UP
      tl.to(
        leftChildren,
        {
          yPercent: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
        },
        "-=0.4"
      );

      // Right column slides UP
      tl.to(
        rightChildren,
        {
          yPercent: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
        },
        "-=0.6"
      );
    },
  });

  return () => {
    ScrollTrigger.getAll().forEach((t) => t.kill());
  };
}, []);
  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative min-h-screen w-full overflow-hidden bg-[#000] pt-30 pb-20"
    >
      {/* Background Marquee */}
 {/* Background Marquee */}
<div className="pointer-events-none absolute inset-0 z-0 flex items-center">
  <div className="w-full overflow-hidden">
    <div ref={marqueeRef} className="flex whitespace-nowrap">
  <div className="animate-marquee-left flex shrink-0 whitespace-nowrap">
    {[...Array(6)].map((_, i) => (
      <span
        key={i}
        className="font-[family-name:var(--font-montserrat)] px-8 text-[12vw] font-[700] uppercase leading-none text-neutral-100/5 md:text-[24vw]"
      >
        MUHAMMAD ALI
      </span>
    ))}
  </div>
  <div className="animate-marquee-left flex shrink-0 whitespace-nowrap" aria-hidden="true">
    {[...Array(6)].map((_, i) => (
      <span
        key={i}
        className="font-[family-name:var(--font-montserrat)] px-8 text-[12vw] font-black uppercase leading-none tracking-tighter text-neutral-100/5 md:text-[10vw]"
      >
        MUHAMMAD ALI ◆
      </span>
    ))}
  </div>
</div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-12">
        <div className="flex flex-col items-center gap-16 lg:flex-row lg:items-center lg:justify-between">

          {/* LEFT COLUMN */}
          <div ref={leftItemsRef} className="w-full space-y-6 lg:w-[28%]">
            <div className="overflow-hidden">
              <div className="slide-up flex items-center gap-3">
                <div className="h-1.5 w-1.5 rounded-full bg-orange-500" />
                <span className="font-[family-name:var(--font-montserrat)] text-[9px] font-bold uppercase tracking-[0.35em] text-neutral-400">
                  ORIGIN // 01
                </span>
              </div>
            </div>

            <div className="overflow-hidden">
              <h3 className="slide-up font-[family-name:var(--font-montserrat)] text-xl font-bold leading-tight tracking-tight text-white md:text-2xl">
                Personal
                <br />
                Narrative
              </h3>
            </div>

            <div className="overflow-hidden">
              <p className="slide-up font-[family-name:var(--font-poppins)] text-xs leading-relaxed text-neutral-400 md:text-sm">
                Based in Lahore, Pakistan, I'm a Full-Stack Developer
                specializing in AI-powered web applications. With 2+ years of
                experience building scalable systems using the MERN stack and
                Next.js, I transform complex problems into elegant digital
                solutions.
              </p>
            </div>

            
          </div>

          {/* CENTER: Floating Card */}
<div
  ref={centreRef}
  className="relative flex w-full items-center justify-center lg:w-[40%]"
  style={{ minHeight: "550px", perspective: "800px" }}
>
  <div
    ref={cardRef}
    className="relative will-change-transform"
    style={{ transformStyle: "preserve-3d" }}
  >
    <div
      ref={cardInnerRef}
      className="relative overflow-hidden rounded-2xl"
      style={{
        width: "390px",
        boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
        background: "linear-gradient(160deg, #fa6e00 0%, #fa6e00 100%)",
      }}
    >
      {/* Orange Card Background */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(160deg, #fa6e00 0%, #fa6e00 100%)",
        }}
      />

      {/* Card Image */}
      <img
        src="./images/myself.png"
        alt="Muhammad Ali"
        className="relative z-10 w-full object-cover grayscale-100"
        style={{ height: "490px", objectPosition: "center",   filter: "contrast(1.1) saturate(1.3) brightness(1.1) grayscale(100%)" }}
      />

      {/* Card Overlay */}
      <div className="absolute inset-0 z-20 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

      {/* Card Label */}
     

      {/* Top right accent */}
      
    </div>
  </div>
</div>
          {/* RIGHT COLUMN */}
          <div ref={rightItemsRef} className="w-full space-y-6 lg:w-[28%]">
            <div className="overflow-hidden">
              <div className="slide-up flex items-center gap-3">
                <div className="h-1.5 w-1.5 rounded-full bg-orange-500" />
                <span className="font-[family-name:var(--font-montserrat)] text-[9px] font-bold uppercase tracking-[0.35em] text-neutral-400">
                  PHILOSOPHY // 02
                </span>
              </div>
            </div>

            <div className="overflow-hidden">
              <h3 className="slide-up font-[family-name:var(--font-montserrat)] text-xl font-bold leading-tight tracking-tight text-white md:text-2xl">
                Development
                <br />
                Philosophy
              </h3>
            </div>

            <div className="overflow-hidden">
              <p className="slide-up font-[family-name:var(--font-poppins)] text-xs leading-relaxed text-neutral-400 md:text-sm">
                I believe great software isn't just about writing code — it's
                about engineering experiences that solve real problems. Every
                project is an opportunity to blend cutting-edge technology with
                thoughtful design and human-centered thinking.
              </p>
            </div>

      
          </div>
        </div>

        {/* Bottom CTA */}
       
      </div>
    </section>
  );
}