"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useLoading } from "@/context/LoadingContext";
import { BrandLogo } from "@/components/app/BrandLogo";

export const LoadingScreen = () => {
  const { isLoading, isDocking, setIsDocking, setShowNavbarLogo, setIsLoading } = useLoading();
  const shouldReduceMotion = useReducedMotion();
  
  const [startDock, setStartDock] = useState(false);
  const [dockCoords, setDockCoords] = useState({ x: 0, y: 0, scale: 1 });
  const logoRef = useRef<SVGSVGElement>(null);

  // Generate slow floating particles on client mount to prevent SSR hydration mismatch
  const [particles, setParticles] = useState<any[]>([]);

  useEffect(() => {
    setParticles(
      Array.from({ length: 10 }).map((_, i) => ({
        id: i,
        x: Math.random() * 80 + 10, // x percentage
        y: Math.random() * 40 + 60, // start in lower half
        size: Math.random() * 2 + 1, // 1px - 3px (very small)
        duration: Math.random() * 6 + 8, // 8s - 14s (very slow and calm)
        delay: Math.random() * 3,
        peakOpacity: Math.random() * 0.08 + 0.10, // 10% - 18% opacity
      }))
    );
  }, []);

  // Lock body scroll when loader is active to ensure premium overlay containment
  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isLoading]);

  useEffect(() => {
    if (!isLoading) return;

    // Timeline mapping:
    // Normal: drawing (0s to 1.95s) -> sweep (1.95s to 2.2s) -> dock (2.2s to 3.2s)
    // Reduced motion: fade in (0.8s) -> wait (0.4s) -> dock (1.2s to 2.2s)
    const dockingDelay = shouldReduceMotion ? 1200 : 3400;
    const finishDelay = shouldReduceMotion ? 2000 : 4200;

    const dockingTimer = setTimeout(() => {
      const target = document.getElementById("navbar-logo");
      const source = logoRef.current;

      if (target && source) {
        const targetRect = target.getBoundingClientRect();
        const sourceRect = source.getBoundingClientRect();

        // Calculate scale factor and center offset deltas
        const targetCenterX = targetRect.left + targetRect.width / 2;
        const targetCenterY = targetRect.top + targetRect.height / 2;
        const sourceCenterX = sourceRect.left + sourceRect.width / 2;
        const sourceCenterY = sourceRect.top + sourceRect.height / 2;

        const dx = targetCenterX - sourceCenterX;
        const dy = targetCenterY - sourceCenterY;
        const scale = targetRect.width / sourceRect.width;

        setDockCoords({ x: dx, y: dy, scale });
        setIsDocking(true);
        setStartDock(true);
      } else {
        // Fallback if elements aren't mounted (e.g. non-homepage routes or direct layout renders)
        setShowNavbarLogo(true);
        setIsLoading(false);
      }
    }, dockingDelay);

    const finishTimer = setTimeout(() => {
      setShowNavbarLogo(true);
      setIsLoading(false);
      setIsDocking(false);
    }, finishDelay);

    return () => {
      clearTimeout(dockingTimer);
      clearTimeout(finishTimer);
    };
  }, [isLoading, setIsLoading, setIsDocking, setShowNavbarLogo, shouldReduceMotion]);

  if (!isLoading) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden w-screen h-screen"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Solid Background that fades to transparent during docking to reveal the navbar/page */}
        <motion.div
          className="absolute inset-0 bg-[#F7F5EF]"
          style={{
            backgroundImage: "radial-gradient(circle, transparent 40%, rgba(0, 0, 0, 0.03) 100%)",
          }}
          initial={{ opacity: 1 }}
          animate={startDock ? { opacity: 0 } : { opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        />

        {/* Soft Olive Glow */}
        <motion.div
          className="absolute h-96 w-96 rounded-full pointer-events-none"
          style={{
            backgroundColor: "rgba(85, 107, 47, 0.18)",
            filter: "blur(18px)",
          }}
          initial={{ opacity: 0 }}
          animate={startDock ? { opacity: 0 } : { opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        />

        {/* Slow-Drifting Particles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {particles.map((p) => (
            <motion.div
              key={p.id}
              className="absolute bg-[#556B2F] rounded-full"
              style={{
                left: `${p.x}%`,
                top: `${p.y}%`,
                width: p.size,
                height: p.size,
              }}
              initial={{ y: 0, opacity: 0 }}
              animate={
                startDock 
                  ? { opacity: 0 } 
                  : {
                      y: "-120vh",
                      opacity: [0, p.peakOpacity, p.peakOpacity, 0],
                    }
              }
              transition={
                startDock
                  ? { duration: 0.4 }
                  : {
                      duration: p.duration,
                      repeat: Infinity,
                      delay: p.delay,
                      ease: "linear",
                    }
              }
            />
          ))}
        </div>

        {/* Centered Logo Container */}
        <motion.div
          id="loader-logo-container"
          className="relative z-10 w-[300px] h-[300px] md:w-[400px] md:h-[400px] flex items-center justify-center"
          initial={
            shouldReduceMotion
              ? { opacity: 0, scale: 1 }
              : { opacity: 0, scale: 0.92 }
          }
          animate={
            startDock
              ? {
                  x: dockCoords.x,
                  y: dockCoords.y,
                  scale: dockCoords.scale,
                  transition: {
                    x: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
                    y: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
                    scale: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
                  },
                }
              : {
                  opacity: 1,
                  scale: 1,
                  transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
                }
          }
        >
          {/* Faded-in background circle that matches BrandMark styling */}
          <motion.div
            className="absolute inset-0 bg-white rounded-full border border-border/40 shadow-sm"
            initial={{ opacity: 0 }}
            animate={startDock ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />

          {/* Logo artwork wrapper that shrinks slightly to match the navbar padding */}
          <motion.div
            className="w-full h-full flex items-center justify-center z-10"
            animate={startDock ? { scale: 0.75 } : { scale: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <BrandLogo ref={logoRef} className="w-full h-full object-contain" isDocking={isDocking} />
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
