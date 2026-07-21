"use client";

import { useParams } from "next/navigation";
import YogaDetailPage from "@/components/yoga/YogaDetailPage";

export default function Page() {
  const { pageKey } = useParams();
  const key = Array.isArray(pageKey) ? pageKey[0] : pageKey;

  return <YogaDetailPage pageKey={key || "patients"} />;
}
