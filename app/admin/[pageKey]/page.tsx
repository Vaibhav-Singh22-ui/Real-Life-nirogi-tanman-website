"use client";

import { useParams } from "next/navigation";
import ModulePage from "@/components/app/ModulePage";
import { adminConfigs } from "@/data/module-configs";

export default function Page() {
  const { pageKey } = useParams();
  const key = Array.isArray(pageKey) ? pageKey[0] : pageKey;
  const config = adminConfigs[key] || {
    title: "Admin Workspace",
    description: "Access administrative modules.",
  };

  return (
    <ModulePage
      title={config.title}
      description={config.description}
      roleLabel="Admin"
    />
  );
}
