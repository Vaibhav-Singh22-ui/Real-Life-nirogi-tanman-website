"use client";

import { useParams } from "next/navigation";
import ModulePage from "@/components/app/ModulePage";
import { doctorConfigs } from "@/data/module-configs";

export default function Page() {
  const { pageKey } = useParams();
  const key = Array.isArray(pageKey) ? pageKey[0] : pageKey;
  const config = doctorConfigs[key] || {
    title: "Doctor Workspace",
    description: "Access doctor clinical modules.",
  };

  return (
    <ModulePage
      title={config.title}
      description={config.description}
      roleLabel="Doctor"
    />
  );
}
