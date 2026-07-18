import type { LucideIcon } from "lucide-react";

export type AppRole = "patient" | "doctor" | "yoga" | "admin";

export type NavItem = {
  label: string;
  path: string;
  icon: LucideIcon;
};
