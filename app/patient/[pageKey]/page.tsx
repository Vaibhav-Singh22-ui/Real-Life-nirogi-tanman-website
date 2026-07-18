"use client";

import { useParams } from "next/navigation";
import PatientDetailPage from "@/views/patient/PatientDetailPage";

export default function Page() {
  const { pageKey } = useParams();
  const pageKeyString = Array.isArray(pageKey) ? pageKey[0] : pageKey;
  return <PatientDetailPage pageKey={pageKeyString} />;
}
