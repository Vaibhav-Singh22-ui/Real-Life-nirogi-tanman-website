import type { AppRole } from "@/types/navigation";

export const roleDashboardPath: Record<AppRole, string> = {
  patient: "/patient/dashboard",
  doctor: "/doctor/dashboard",
  yoga: "/yoga/dashboard",
  admin: "/admin/dashboard",
};

export const getRoleDashboardPath = (role?: string | null) => {
  if (!role) return roleDashboardPath.patient;
  return roleDashboardPath[(role as AppRole)] ?? roleDashboardPath.patient;
};
