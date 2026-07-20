import Link from "next/link";
import { usePathname } from "next/navigation";
import BrandMark from "@/components/app/BrandMark";
import type { AppRole } from "@/types/navigation";
import { roleSidebars } from "@/data/app-navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

type RoleSidebarProps = {
  role: AppRole;
};

const RoleSidebar = ({ role }: RoleSidebarProps) => {
  const { state, isHovered } = useSidebar();
  const collapsed = state === "collapsed";
  const isCollapsed = collapsed && !isHovered;
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon" variant="sidebar">
      <SidebarHeader className="border-b border-sidebar-border p-3">
        <BrandMark compact={isCollapsed} />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>{role.toUpperCase()} WORKSPACE</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {roleSidebars[role].map((item) => {
                const isActive = pathname === item.path;
                return (
                  <SidebarMenuItem key={item.path}>
                    <SidebarMenuButton asChild tooltip={item.label} isActive={isActive}>
                      <Link href={item.path} className="flex items-center gap-2">
                        <item.icon className="h-4 w-4" />
                        {!isCollapsed && <span>{item.label}</span>}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t border-sidebar-border p-3">
        {!isCollapsed && <p className="text-xs text-sidebar-foreground/70">Nirogi Tanman Platform</p>}
      </SidebarFooter>
    </Sidebar>
  );
};

export default RoleSidebar;
