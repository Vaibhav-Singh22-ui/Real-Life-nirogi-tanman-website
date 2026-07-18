import type { Metadata } from "next";
import "../src/index.css";
import "@fontsource/manrope/400.css";
import "@fontsource/manrope/500.css";
import "@fontsource/manrope/600.css";
import "@fontsource/manrope/700.css";
import "@fontsource/inter/300.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";

import Providers from "./providers";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { NavigationTransition } from "@/components/layout/NavigationTransition";
import { LoadingScreen } from "@/components/layout/LoadingScreen";

export const metadata: Metadata = {
  title: "Nirogi Tanman | AI Integrative Healthcare",
  description: "Move from reactive care to proactive wellness. Personalized care journeys across clinical medicine, nutrition, yoga therapy, and AI assistant.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Providers>
          <LoadingScreen />
          <NavigationTransition>
            {children}
          </NavigationTransition>
          <Toaster />
          <Sonner />
        </Providers>
      </body>
    </html>
  );
}
