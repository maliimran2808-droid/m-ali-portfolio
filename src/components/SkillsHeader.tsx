"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ProjectsHeader() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const separatorRef = useRef<HTMLDivElement>(null);
  const wordsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const separator = separatorRef.current;
    const words = wordsRef.current;
   

    if (!section || !title || !separator || !words) return;

    const wordEls = words.querySelectorAll(".word-item");

    // Set initial states
    gsap.set(title, { yPercent: 100, opacity: 0 });
    gsap.set(separator, { scaleX: 0, transformOrigin: "left center" });
    gsap.set(wordEls, { yPercent: 100, opacity: 0 });


    ScrollTrigger.create({
      trigger: section,
      start: "top 75%",
      once: true,
      onEnter: () => {
        const tl = gsap.timeline();

        // Title slides up
        tl.to(title, {
          yPercent: 0,
          opacity: 1,
          duration: 1,
          ease: "power4.out",
        });

        // Separator grows left to right
       
        // Words slide up with wavy stagger
        tl.to(
          wordEls,
          {
            yPercent: 0,
            opacity: 1,
            duration: 0.6,
            stagger: {
              each: 0.08,
              ease: "power2.out",
            },
            ease: "back.out(1.8)",
          },
          "-=0.3"
        );
 tl.to(
          separator,
          {
            scaleX: 1,
            duration: 0.8,
            ease: "power3.inOut",
          },
          "-=0.4"
        );

        // Button slides up
    
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  const subtitleWords = "Tailored Solutions for Your Unique Vision ".split(" ");

  return (
    <div
      ref={sectionRef}
      className="flex flex-col items-start gap-6 px-6 md:px-16 lg:px-24 bg-[#000] pt-17 pb-10"
    >
      {/* Title */}
      <div className="overflow-hidden">
        <h2
          ref={titleRef}
          className="font-[family-name:var(--font-poppins)] text-[13px] uppercase leading-none tracking-[7px] text-[#fa6c00]"
        >
          SkillS SET
        </h2>
      </div>

      {/* Separator Line */}
   

      {/* Subtitle - word by word */}
      <div ref={wordsRef} className="flex flex-wrap gap-x-2 gap-y-1 overflow-hidden">
        {subtitleWords.map((word, i) => (
          <div key={i} className="overflow-visible">
            <span
              className="word-item inline-block font-[family-name:var(--font-montserrat)] text-base tracking-normal uppercase font-normal text-[#fff] md:text-[3rem] lg:text-[4rem]"
            >
              {word}
            </span>
          </div>
        ))}
      </div>

      {/* CTA Button */}
      <div className="overflow-hidden">
       
      </div>
         <div
        ref={separatorRef}
        className="h-px w-[100%] bg-gradient-to-r from-white/40 via-white/100 to-white/40"
        style={{ transformOrigin: "left center" }}
      />
    </div>
  );
}