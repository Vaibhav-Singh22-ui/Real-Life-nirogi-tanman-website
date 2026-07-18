"use client";

import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useLoading } from "@/context/LoadingContext";

interface NavigationTransitionProps {
  children: React.ReactNode;
}

export const NavigationTransition = ({ children }: NavigationTransitionProps) => {
  const pathname = usePathname();
  const { isLoading: isInitialLoading } = useLoading();

  const [showTransition, setShowTransition] = useState(false);

  const startTimerRef = useRef<NodeJS.Timeout | null>(null);
  const failSafeTimerRef = useRef<NodeJS.Timeout | null>(null);
  const navigationStartRef = useRef<number>(0);

  // Helper to determine if target URL is a new page (different pathname)
  const isNewPage = (targetUrl: string | URL | null | undefined) => {
    if (!targetUrl) return false;
    try {
      const currentUrl = new URL(window.location.href);
      const nextUrl = new URL(targetUrl.toString(), window.location.href);
      return currentUrl.pathname !== nextUrl.pathname;
    } catch (e) {
      return false;
    }
  };

  // Triggered on page-to-page navigation start
  const handleNavStart = () => {
    // Never run on initial visit loading screen
    if (isInitialLoading) return;

    navigationStartRef.current = Date.now();

    if (startTimerRef.current) {
      clearTimeout(startTimerRef.current);
    }
    if (failSafeTimerRef.current) {
      clearTimeout(failSafeTimerRef.current);
    }

    // Smart Trigger: Only play loader if navigation is slower than 150ms
    startTimerRef.current = setTimeout(() => {
      setShowTransition(true);

      // 6-second fail-safe to prevent endless loading in case of navigation failure or abort
      failSafeTimerRef.current = setTimeout(() => {
        setShowTransition(false);
      }, 6000);
    }, 150);
  };

  // Triggered when navigation completes (pathname or search parameters update)
  const handleNavComplete = () => {
    if (startTimerRef.current) {
      clearTimeout(startTimerRef.current);
      startTimerRef.current = null;
    }
    if (failSafeTimerRef.current) {
      clearTimeout(failSafeTimerRef.current);
      failSafeTimerRef.current = null;
    }

    const elapsed = Date.now() - navigationStartRef.current;

    // Minimum play time of 350ms to ensure the pulse, sweep and fade transitions run cleanly
    if (showTransition) {
      const minPlayTime = 350;
      const remainingTime = Math.max(0, minPlayTime - elapsed);

      setTimeout(() => {
        setShowTransition(false);
      }, remainingTime);
    }
  };

  // Route interception listeners
  useEffect(() => {
    if (typeof window === "undefined") return;

    // 1. Intercept client-side Link / Anchor tag clicks
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest("a");

      if (anchor) {
        const href = anchor.getAttribute("href");
        const currentPath = window.location.pathname;

        if (
          href &&
          href.startsWith("/") &&
          !href.startsWith("/#") &&
          anchor.target !== "_blank" &&
          !e.defaultPrevented &&
          e.button === 0 && // left clicks only
          !e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey // ignore modifier clicks
        ) {
          try {
            const targetUrl = new URL(href, window.location.href);
            if (targetUrl.pathname !== currentPath) {
              handleNavStart();
            }
          } catch (err) {
            // Ignore parsing errors
          }
        }
      }
    };

    // 2. Intercept router.push / router.replace programmatic transitions
    const originalPushState = window.history.pushState;
    window.history.pushState = function (...args) {
      const targetUrl = args[2];
      if (isNewPage(targetUrl)) {
        setTimeout(() => {
          handleNavStart();
        }, 0);
      }
      return originalPushState.apply(this, args);
    };

    const originalReplaceState = window.history.replaceState;
    window.history.replaceState = function (...args) {
      const targetUrl = args[2];
      if (isNewPage(targetUrl)) {
        setTimeout(() => {
          handleNavStart();
        }, 0);
      }
      return originalReplaceState.apply(this, args);
    };

    document.addEventListener("click", handleAnchorClick);

    return () => {
      document.removeEventListener("click", handleAnchorClick);
      window.history.pushState = originalPushState;
      window.history.replaceState = originalReplaceState;
      if (startTimerRef.current) clearTimeout(startTimerRef.current);
      if (failSafeTimerRef.current) clearTimeout(failSafeTimerRef.current);
    };
  }, [isInitialLoading]);

  // Complete navigation when routing triggers pathname updates
  useEffect(() => {
    handleNavComplete();
  }, [pathname]);

  const shouldAnimateDestination = !isInitialLoading;

  return (
    <>
      {/* Background page shell styling: dims and blurs current page layout on slow loading */}
      <motion.div
        animate={showTransition ? "animating" : "idle"}
        variants={{
          idle: {
            opacity: 1,
            filter: "blur(0px)",
            scale: 1,
          },
          animating: {
            opacity: 0.92,
            filter: "blur(3px)",
            scale: 0.99,
          },
        }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="w-full h-full min-h-screen flex flex-col"
      >
        {/* Reveal Destination Page using key path tracking to trigger slide transition */}
        <motion.div
          key={pathname}
          initial={shouldAnimateDestination ? { opacity: 0, y: 16 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex-1 flex flex-col"
        >
          {children}
        </motion.div>
      </motion.div>

      {/* Floating Transition Overlay */}
      <AnimatePresence>
        {showTransition && (
          <>
            {/* Click-blocking backdrop cover */}
            <div className="fixed inset-0 z-[9998] cursor-wait pointer-events-auto bg-black/0" />

            {/* Glassmorphism Loader Circle container */}
            <motion.div
              className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/0 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Frosted Glass Circle */}
              <motion.div
                className="relative h-24 w-24 rounded-full border border-white/35 bg-white/10 backdrop-blur-md flex items-center justify-center shadow-lg overflow-hidden"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{
                  opacity: 1,
                  scale: [0.95, 1, 1.02, 1],
                }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{
                  scale: {
                    times: [0, 0.4, 0.7, 1],
                    duration: 0.6,
                    ease: [0.22, 1, 0.36, 1],
                  },
                  opacity: { duration: 0.25 },
                }}
              >
                {/* SVG Logo */}
                <img
                  src="/Logo.svg"
                  alt="Nirogi Tanman Logo"
                  className="h-14 w-14 object-contain"
                />

                {/* 400ms Subtle Light Sweep Overlay */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none"
                  initial={{ x: "-100%" }}
                  animate={{ x: "200%" }}
                  transition={{ delay: 0.15, duration: 0.4, ease: "easeInOut" }}
                />
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
