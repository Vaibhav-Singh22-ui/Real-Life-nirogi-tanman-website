"use client";

import PublicNavbar from "@/components/layout/PublicNavbar";
import PublicFooter from "@/components/layout/PublicFooter";
import { motion } from "framer-motion";
import { useLoading } from "@/context/LoadingContext";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLoading, isDocking } = useLoading();
  const showContent = !isLoading || isDocking;

  return (
    <div className="page-shell">
      <motion.div
        initial={{ opacity: 0 }}
        animate={showContent ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="sticky top-0 z-50"
      >
        <PublicNavbar />
      </motion.div>
      <motion.main
        initial={{ opacity: 0, y: 16 }}
        animate={showContent ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.main>
      <motion.div
        initial={{ opacity: 0 }}
        animate={showContent ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <PublicFooter />
      </motion.div>
    </div>
  );
}
