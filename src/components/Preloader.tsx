"use client";

import { useEffect, useState, useRef } from "react";
import gsap from "gsap";

export default function Preloader() {
  const [counter, setCounter] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef(0);
  const animationDone = useRef(false);

  useEffect(() => {
    // Clear session so preloader always shows (remove this line after testing)


    const interval = setInterval(() => {
      counterRef.current += 1;
      setCounter(counterRef.current);

      if (counterRef.current >= 100) {
        clearInterval(interval);

        if (!animationDone.current) {
          animationDone.current = true;

          // Wait a moment at 100% then slide up
          setTimeout(() => {
            gsap.to(containerRef.current, {
              yPercent: -100,
              duration: 1,
              ease: "power4.inOut",
              onComplete: () => {
                setIsVisible(false);
                window.dispatchEvent(new CustomEvent("preloaderDone"));
              },
            });
          }, 400);
        }
      }
    }, 18);

    return () => clearInterval(interval);
  }, []);

  if (!isVisible) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[10000]  flex flex-col items-end justify-end bg-[#f45100] text-[#000]"
    >
      <div className="font-[family-name:var(--font-montserrat)] text-5xl font-[600] sm:text-7xl md:text-[10rem]">
        {counter}
      </div>
      
    </div>
  );
}