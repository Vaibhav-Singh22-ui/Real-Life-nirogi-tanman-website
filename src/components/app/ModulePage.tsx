import { usePathname } from "next/navigation";
import RoleModulePage from "@/components/app/RoleModulePage";
import { getModuleContent } from "@/data/role-module-content";
import SharedSettingsView from "@/components/app/SharedSettingsView";
import SharedNotificationsView from "@/components/app/SharedNotificationsView";

type ModulePageProps = {
  title: string;
  description: string;
  roleLabel: string;
};

const ModulePage = ({ title, description, roleLabel }: ModulePageProps) => {
  const pathname = usePathname() || "";
  
  if (pathname.endsWith("/settings")) {
    return <SharedSettingsView roleLabel={roleLabel} />;
  }

  if (pathname.endsWith("/notifications")) {
    return <SharedNotificationsView />;
  }

  const content = getModuleContent(pathname);

  return (
    <RoleModulePage
      title={title}
      description={description}
      roleLabel={roleLabel}
      metrics={content.metrics}
      tableColumns={content.tableColumns}
      tableRows={content.tableRows}
    />
  );
};

export default ModulePage;
