"use client";

import RoleLayout from "@/components/layout/RoleLayout";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <RoleLayout role="patient">{children}</RoleLayout>;
}
