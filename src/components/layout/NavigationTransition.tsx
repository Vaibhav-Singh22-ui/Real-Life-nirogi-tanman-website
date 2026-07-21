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

  // Important landing pages that trigger navigation transition
  const LANDING_PAGES = [
    "/",
    "/services",
    "/doctors",
    "/yoga-experts",
    "/ai-health-assistant",
    "/pricing",
    "/book-consultation",
  ];

  // Helper to check if target URL is a main landing page
  const isLandingPage = (targetUrl?: string | URL | null) => {
    if (!targetUrl) return false;
    try {
      const nextUrl = new URL(targetUrl.toString(), window.location.href);
      const cleanPath = nextUrl.pathname === "/" ? "/" : nextUrl.pathname.replace(/\/$/, "");
      return LANDING_PAGES.includes(cleanPath);
    } catch (e) {
      return false;
    }
  };

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
  const handleNavStart = (targetUrl?: string | URL | null) => {
    // Never run on initial visit loading screen
    if (isInitialLoading) return;

    // Only play transition when navigating to a main landing page
    if (!isLandingPage(targetUrl)) {
      return;
    }

    navigationStartRef.current = Date.now();

    if (startTimerRef.current) {
      clearTimeout(startTimerRef.current);
    }
    if (failSafeTimerRef.current) {
      clearTimeout(failSafeTimerRef.current);
    }

    // Show transition overlay for landing page navigations
    setShowTransition(true);

    // Stays on screen for 400ms max for a super-fast quick pulse transition
    failSafeTimerRef.current = setTimeout(() => {
      setShowTransition(false);
    }, 400);
  };

  // Triggered when navigation completes (pathname or search parameters update)
  const handleNavComplete = () => {
    if (startTimerRef.current) {
      clearTimeout(startTimerRef.current);
      startTimerRef.current = null;
    }

    const elapsed = Date.now() - navigationStartRef.current;

    if (showTransition) {
      // Keep transition on screen for a very fast duration (~250ms - 300ms)
      const minPlayTime = 250;
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
              handleNavStart(href);
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
          handleNavStart(targetUrl);
        }, 0);
      }
      return originalPushState.apply(this, args);
    };

    const originalReplaceState = window.history.replaceState;
    window.history.replaceState = function (...args) {
      const targetUrl = args[2];
      if (isNewPage(targetUrl)) {
        setTimeout(() => {
          handleNavStart(targetUrl);
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
            filter: "none",
            scale: 1,
          },
          animating: {
            opacity: 0.92,
            filter: "blur(3px)",
            scale: 0.99,
          },
        }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        style={!showTransition ? { transform: "none", filter: "none" } : undefined}
        className="w-full h-full min-h-screen flex flex-col"
      >
        {/* Reveal Destination Page using key path tracking to trigger slide transition */}
        <motion.div
          key={pathname}
          initial={shouldAnimateDestination ? { opacity: 0, y: 16 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={!showTransition ? { transform: "none" } : undefined}
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
              transition={{ duration: 0.15, ease: "easeOut" }}
            >
              {/* Frosted Glass Circle */}
              <motion.div
                className="relative h-24 w-24 rounded-full border border-white/35 bg-white/10 backdrop-blur-md flex items-center justify-center shadow-lg overflow-hidden"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
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
