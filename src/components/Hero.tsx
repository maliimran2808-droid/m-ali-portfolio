"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const line1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);
  const line3Ref = useRef<HTMLDivElement>(null);
  const line4Ref = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      gsap.set(video, { opacity: 0, scale: 1 });
    }

    const startAnimations = () => {
      const lines = [
        { ref: line1Ref, direction: "up" },
        { ref: line2Ref, direction: "up" },
        { ref: line3Ref, direction: "up" },
        { ref: line4Ref, direction: "up" },
      ];

      // Fade in and zoom video
      if (video) {
        gsap.to(video, { opacity: 1, duration: 1, ease: "power2.out" });
        gsap.to(video, { scale: 1, duration: 8, ease: "power1.out", delay: 0.5 });
      }

      // Animate text lines
      lines.forEach(({ ref, direction }, index) => {
        const el = ref.current;
        if (!el) return;

        const fromY = direction === "up" ? "110%" : "-110%";

        gsap.fromTo(
          el,
          { y: fromY },
          {
            y: "0%",
            duration: 1.2,
            delay: 0.5 + index * 0.15,
            ease: "power4.out",
          }
        );
      });

      // Scroll indicator
      if (scrollIndicatorRef.current) {
        gsap.fromTo(
          scrollIndicatorRef.current,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            delay: 1.8,
            ease: "power3.out",
          }
        );
      }
    };

    // Wait for preloader to finish
    window.addEventListener("preloaderDone", startAnimations);

    return () => {
      window.removeEventListener("preloaderDone", startAnimations);
    };
  }, []);

  const lines = [

    { ref: line1Ref, text: "Muhammad Ali", direction: "up", align: "left" },
    { ref: line2Ref, text: "YOUR FULL STACK", direction: "up", align: "right" },
    { ref: line3Ref, text: "AI DRIVEN WEB", direction: "up", align: "left" },
    { ref: line4Ref, text: "DESIGNER & DEV", direction: "up", align: "right" },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative flex h-screen w-full items-center justify-center overflow-hidden"
      id="hero"
    >
      {/* Video Background */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src="/videos/bgvideo.mp4" type="video/mp4" />
      </video>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-black/20" />

      {/* Main Text Container */}

      <div className="relative z-10 flex w-full flex-col px-8 md:px-16 lg:px-24" style={{ paddingTop: '50px' }}>

        {lines.map(({ ref, text, direction, align }, index) => (
          <div
            key={index}
            className={`overflow-hidden py-1 w-full flex ${align === "left" ? "justify-start" : "justify-end"
              }`}
          >
            <div
              ref={ref}
              data-cursor-text
              className="font-[family-name:var(--font-montserrat)] font-black uppercase leading-[1.1] tracking-tight text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl select-none flex items-baseline gap-2 md:gap-3 lg:gap-4"
              style={{
                transform: direction === "up" ? "translateY(110%)" : "translateY(-110%)",
                fontWeight: "600"
              }}
            >
              {/* Add "Hi I'm" only on first line */}
              {index === 0 && (
                <span className="font-[family-name:var(--font-poppins)] font-italic tracking-wide text-white/95 md:text-lg lg:text-xl" style={{ textTransform: "lowercase", fontStyle: "italic", marginRight: "-10px" }}>
                  Hi I'm
                </span>
              )}
              <span>{text}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Scroll Indicator */}

    </section>
  );
}