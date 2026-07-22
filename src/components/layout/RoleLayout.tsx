import type { AppRole } from "@/types/navigation";
import RoleSidebar from "@/components/layout/RoleSidebar";
import RoleTopbar from "@/components/layout/RoleTopbar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

type RoleLayoutProps = {
  role: AppRole;
  children: React.ReactNode;
};

const RoleLayout = ({ role, children }: RoleLayoutProps) => {
  return (
    <SidebarProvider defaultOpen>
      <div className="flex h-screen w-full bg-background overflow-hidden">
        <RoleSidebar role={role} />
        <SidebarInset className="min-w-0 flex-1 h-screen overflow-y-auto flex flex-col">
          <RoleTopbar role={role} />
          <div className="flex-1 w-full max-w-full px-4 py-5 md:px-6">
            {children}
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default RoleLayout;
