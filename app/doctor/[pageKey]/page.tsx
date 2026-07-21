"use client";

import { useParams } from "next/navigation";
import DoctorDetailPage from "@/components/doctor/DoctorDetailPage";

export default function Page() {
  const { pageKey } = useParams();
  const key = Array.isArray(pageKey) ? pageKey[0] : pageKey;

  return <DoctorDetailPage pageKey={key || "todays-schedule"} />;
}
