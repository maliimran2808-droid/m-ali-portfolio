"use client";

import { createContext, useContext, useRef } from "react";
import gsap from "gsap";
import { useRouter } from "next/navigation";

interface TransitionContextType {
  navigate: (href: string) => void;
}

const TransitionContext = createContext<TransitionContextType>({
  navigate: () => {},
});

export function TransitionProvider({ children }: { children: React.ReactNode }) {
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  const navigate = (href: string) => {
    const overlay = overlayRef.current;
    if (!overlay) return;

    const tl = gsap.timeline({
      onComplete: () => {
        router.push(href);
      },
    });

    tl.set(overlay, { y: "100%", display: "block" })
      .to(overlay, {
        y: "0%",
        duration: 0.6,
        ease: "power3.inOut",
      })
      .to(overlay, {
        y: "0%",
        duration: 0.3, // sits in middle
      });
  };

  return (
    <TransitionContext.Provider value={{ navigate }}>
      {/* Global overlay — lives at root level */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-[9999] hidden pointer-events-none"
        style={{ background: "#f45100" }}
      />
      {children}
    </TransitionContext.Provider>
  );
}

export const useTransition = () => useContext(TransitionContext);