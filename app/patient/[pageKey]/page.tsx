"use client";

import { useParams } from "next/navigation";
import PatientDetailPage from "@/views/patient/PatientDetailPage";
import type { PatientPageKey } from "@/data/patient-pages";

export default function Page() {
  const { pageKey } = useParams();
  const pageKeyString = (Array.isArray(pageKey) ? pageKey[0] : pageKey) || "ai-assistant";
  return <PatientDetailPage pageKey={pageKeyString as PatientPageKey} />;
}
