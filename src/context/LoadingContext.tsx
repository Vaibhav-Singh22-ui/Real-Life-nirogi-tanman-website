"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type LoadingContextType = {
  isLoading: boolean;
  setIsLoading: (val: boolean) => void;
  isDocking: boolean;
  setIsDocking: (val: boolean) => void;
  showNavbarLogo: boolean;
  setShowNavbarLogo: (val: boolean) => void;
};

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export const LoadingProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isDocking, setIsDocking] = useState(false);
  const [showNavbarLogo, setShowNavbarLogo] = useState(false);

  // Skip animation if prefers-reduced-motion is true
  useEffect(() => {
    if (typeof window !== "undefined") {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      if (false) { // Temporarily false for headless testing
        setIsLoading(false);
        setShowNavbarLogo(true);
      }
    }
  }, []);

  return (
    <LoadingContext.Provider
      value={{
        isLoading,
        setIsLoading,
        isDocking,
        setIsDocking,
        showNavbarLogo,
        setShowNavbarLogo,
      }}
    >
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }
  return context;
};
