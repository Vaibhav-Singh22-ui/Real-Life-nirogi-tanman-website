"use client";

import { useParams } from "next/navigation";
import ModulePage from "@/components/app/ModulePage";
import { yogaConfigs } from "@/data/module-configs";

export default function Page() {
  const { pageKey } = useParams();
  const key = Array.isArray(pageKey) ? pageKey[0] : pageKey;
  const config = yogaConfigs[key] || {
    title: "Yoga Workspace",
    description: "Access yoga therapy modules.",
  };

  return (
    <ModulePage
      title={config.title}
      description={config.description}
      roleLabel="Yoga Instructor"
    />
  );
}
